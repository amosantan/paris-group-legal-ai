import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";
import { invokeUnifiedLLM, getCurrentProvider, getAvailableProviders, getProviderInfo, LLMProvider } from "./_core/unifiedLLM";
import { storagePut } from "./storage";
import { buildLegalContext, searchLegalKnowledge as searchKB } from "./legalKnowledgeBase";
import { getSystemPrompt } from "./enhancedLegalPrompts";
import { extractTextFromPDF, cleanExtractedText, validatePDFSize, extractContractInfo } from "./pdfExtractor";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  consultations: router({
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        category: z.enum(["rental_dispute", "real_estate_transaction", "contract_review", "general_inquiry"]),
        language: z.enum(["en", "ar"]).default("en"),
      }))
      .mutation(async ({ ctx, input }) => {
        const consultationId = await db.createConsultation({
          userId: ctx.user.id,
          title: input.title,
          category: input.category,
          language: input.language,
          status: "active",
        });

        // Create initial system message
        await db.createMessage({
          consultationId,
          role: "system",
          content: input.language === "ar" 
            ? "مرحباً بك في مستشار باريس جروب القانوني. أنا متخصص في قانون الإيجار في دبي والمعاملات العقارية. كيف يمكنني مساعدتك اليوم؟"
            : "Welcome to Paris Group Legal Consultant. I specialize in Dubai rental law and real estate transactions. How may I assist you today?",
        });

        return { consultationId };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserConsultations(ctx.user.id);
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getConsultationById(input.id);
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["active", "completed", "archived"]),
      }))
      .mutation(async ({ input }) => {
        await db.updateConsultationStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  messages: router({
    list: protectedProcedure
      .input(z.object({ consultationId: z.number() }))
      .query(async ({ input }) => {
        return db.getConsultationMessages(input.consultationId);
      }),

    send: protectedProcedure
      .input(z.object({
        consultationId: z.number(),
        content: z.string(),
        language: z.enum(["en", "ar"]).default("en"),
      }))
      .mutation(async ({ ctx, input }) => {
        // Save user message
        await db.createMessage({
          consultationId: input.consultationId,
          role: "user",
          content: input.content,
        });

        // Get consultation context
        const consultation = await db.getConsultationById(input.consultationId);
        if (!consultation) {
          throw new Error("Consultation not found");
        }

        // Get message history
        const messageHistory = await db.getConsultationMessages(input.consultationId);
        
        // Get relevant legal context
        const legalContext = buildLegalContext(
          consultation.category === "rental_dispute" ? "rental_law" : 
          consultation.category === "real_estate_transaction" ? "real_estate_law" : 
          undefined
        );

        // Build comprehensive system prompt
        const consultationType = consultation.category === "rental_dispute" ? "rental" 
          : consultation.category === "real_estate_transaction" ? "real_estate" 
          : "general";
        const systemPrompt = getSystemPrompt("consultation", consultationType);

        // Prepare messages for LLM
        const llmMessages = [
          { role: "system" as const, content: systemPrompt },
          ...messageHistory.slice(-10).map(msg => ({
            role: msg.role === "system" ? "assistant" as const : msg.role as "user" | "assistant",
            content: msg.content,
          })),
        ];

        // Get AI response
        const response = await invokeUnifiedLLM({
          messages: llmMessages,
        });

        const assistantMessage = (typeof response.choices[0]?.message?.content === 'string' 
          ? response.choices[0]?.message?.content 
          : "I apologize, but I couldn't generate a response.");

        // Save assistant message
        await db.createMessage({
          consultationId: input.consultationId,
          role: "assistant",
          content: assistantMessage,
        });

        return { message: assistantMessage };
      }),
  }),

  documents: router({
    upload: protectedProcedure
      .input(z.object({
        consultationId: z.number(),
        filename: z.string(),
        fileData: z.string(), // base64
        mimeType: z.string(),
        documentType: z.enum(["contract", "lease", "agreement", "notice", "other"]),
      }))
      .mutation(async ({ ctx, input }) => {
        // Decode base64 and upload to S3
        const buffer = Buffer.from(input.fileData, 'base64');
        
        // Extract text from PDF if applicable
        let extractedText: string | null = null;
        let pdfMetadata: any = null;
        
        if (input.mimeType === 'application/pdf') {
          try {
            // Validate PDF size (max 10MB)
            validatePDFSize(buffer, 10);
            
            // Extract text from PDF
            const pdfResult = await extractTextFromPDF(buffer);
            extractedText = cleanExtractedText(pdfResult.text);
            
            // Extract contract info
            const contractInfo = extractContractInfo(extractedText);
            pdfMetadata = {
              numPages: pdfResult.numPages,
              contractInfo,
              info: pdfResult.info,
            };
            
            console.log(`[PDF Upload] Extracted ${extractedText.length} characters from ${input.filename}`);
          } catch (error) {
            console.error('[PDF Upload] Text extraction failed:', error);
            // Continue with upload even if extraction fails
          }
        }
        
        const fileKey = `legal-documents/${ctx.user.id}/${input.consultationId}/${nanoid()}-${input.filename}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        // Save document record with extracted text
        const documentId = await db.createDocument({
          consultationId: input.consultationId,
          userId: ctx.user.id,
          filename: input.filename,
          fileKey,
          fileUrl: url,
          mimeType: input.mimeType,
          fileSize: buffer.length,
          documentType: input.documentType,
          extractedText,
        });

        return { 
          documentId, 
          url,
          extractedText: extractedText ? extractedText.substring(0, 500) + '...' : null, // Return preview
          pdfMetadata 
        };
      }),

    list: protectedProcedure
      .input(z.object({ consultationId: z.number() }))
      .query(async ({ input }) => {
        return db.getConsultationDocuments(input.consultationId);
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getDocumentById(input.id);
      }),
  }),

  contractReview: router({
    analyze: protectedProcedure
      .input(z.object({
        documentId: z.number(),
        consultationId: z.number(),
        language: z.enum(["en", "ar"]).default("en"),
      }))
      .mutation(async ({ ctx, input }) => {
        // Get document
        const document = await db.getDocumentById(input.documentId);
        if (!document) {
          throw new Error("Document not found");
        }

        // Get legal context
        const legalContext = buildLegalContext();

        // Build comprehensive contract review system prompt
        const systemPrompt = getSystemPrompt("contract_review");

        // Build analysis prompt
        const analysisPrompt = input.language === "ar"
          ? `قم بإجراء مراجعة قانونية شاملة للعقد التالي بناءً على قانون دبي/الإمارات.

**السياق القانوني:**
${legalContext}

**تعليمات التحليل:**
1. حدد البنود المفقودة أو الإشكالية
2. قيّم قابلية التنفيذ والمخاطر القانونية
3. اقترح تحسينات وبنود بديلة
4. قدم درجة مخاطر إجمالية (0-100)
5. استشهد بالمواد والقوانين ذات الصلة

**نص العقد:**
${document.extractedText || "لم يتم استخراج النص بعد"}

قدم تحليلاً مفصلاً بتنسيق JSON مع الحقول التالية:
- overallRiskScore (رقم 0-100)
- summary (ملخص موجز)
- findings (مصفوفة من النتائج)
- recommendations (مصفوفة من التوصيات)
- missingClauses (مصفوفة من البنود المفقودة)
- problematicClauses (مصفوفة من البنود الإشكالية)
- legalReferences (مصفوفة من المراجع القانونية)`
          : `Conduct a comprehensive legal review of the following contract based on Dubai/UAE law.

**Legal Context:**
${legalContext}

**Analysis Instructions:**
1. Identify missing or problematic clauses
2. Assess enforceability and legal risks
3. Suggest improvements and alternative clauses
4. Provide overall risk score (0-100)
5. Cite relevant articles and laws

**Contract Text:**
${document.extractedText || "Text not extracted yet"}

Provide detailed analysis in JSON format with the following fields:
- overallRiskScore (number 0-100)
- summary (brief summary)
- findings (array of findings)
- recommendations (array of recommendations)
- missingClauses (array of missing clauses)
- problematicClauses (array of problematic clauses)
- legalReferences (array of legal citations)`;

        // Get AI analysis
        const response = await invokeUnifiedLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: analysisPrompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "contract_review",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  overallRiskScore: { type: "number" },
                  summary: { type: "string" },
                  findings: { type: "array", items: { type: "string" } },
                  recommendations: { type: "array", items: { type: "string" } },
                  missingClauses: { type: "array", items: { type: "string" } },
                  problematicClauses: { type: "array", items: { type: "string" } },
                  legalReferences: { type: "array", items: { type: "string" } },
                },
                required: ["overallRiskScore", "summary", "findings", "recommendations", "missingClauses", "problematicClauses", "legalReferences"],
                additionalProperties: false,
              },
            },
          },
        });

        const analysisContent = typeof response.choices[0]?.message?.content === 'string' 
          ? response.choices[0]?.message?.content 
          : "{}";
        const analysis = JSON.parse(analysisContent);

        // Save contract review
        const reviewId = await db.createContractReview({
          documentId: input.documentId,
          consultationId: input.consultationId,
          userId: ctx.user.id,
          overallRiskScore: analysis.overallRiskScore,
          summary: analysis.summary,
          findings: JSON.stringify(analysis.findings),
          recommendations: JSON.stringify(analysis.recommendations),
          missingClauses: JSON.stringify(analysis.missingClauses),
          problematicClauses: JSON.stringify(analysis.problematicClauses),
          legalReferences: JSON.stringify(analysis.legalReferences),
          language: input.language,
        });

        return { reviewId, analysis };
      }),

    getByDocumentId: protectedProcedure
      .input(z.object({ documentId: z.number() }))
      .query(async ({ input }) => {
        const review = await db.getContractReviewByDocumentId(input.documentId);
        if (!review) return null;

        return {
          ...review,
          findings: JSON.parse(review.findings),
          recommendations: JSON.parse(review.recommendations),
          missingClauses: review.missingClauses ? JSON.parse(review.missingClauses) : [],
          problematicClauses: review.problematicClauses ? JSON.parse(review.problematicClauses) : [],
          legalReferences: review.legalReferences ? JSON.parse(review.legalReferences) : [],
        };
      }),

    list: protectedProcedure
      .input(z.object({ consultationId: z.number() }))
      .query(async ({ input }) => {
        return db.getConsultationReviews(input.consultationId);
      }),
  }),

  reports: router({
    generate: protectedProcedure
      .input(z.object({
        consultationId: z.number(),
        title: z.string(),
        reportType: z.enum(["consultation_summary", "contract_review", "legal_analysis", "advisory_memo"]),
        language: z.enum(["en", "ar"]).default("en"),
      }))
      .mutation(async ({ ctx, input }) => {
        // Get consultation data
        const consultation = await db.getConsultationById(input.consultationId);
        const messages = await db.getConsultationMessages(input.consultationId);
        const documents = await db.getConsultationDocuments(input.consultationId);
        const reviews = await db.getConsultationReviews(input.consultationId);

        // Build comprehensive report generation system prompt
        const systemPrompt = getSystemPrompt("report");

        // Build report content using LLM
        const reportPrompt = input.language === "ar"
          ? `قم بإنشاء تقرير قانوني رسمي بناءً على البيانات التالية.

**نوع التقرير:** ${input.reportType}
**العنوان:** ${input.title}

**بيانات الاستشارة:**
${JSON.stringify({ consultation, messages, documents, reviews }, null, 2)}

قم بإنشاء تقرير قانوني رسمي ومهني بتنسيق Markdown يتضمن:
1. ملخص تنفيذي
2. الخلفية والسياق
3. التحليل القانوني
4. النتائج والتوصيات
5. المراجع القانونية
6. إخلاء المسؤولية

استخدم لغة قانونية رسمية واستشهد بالمواد والقوانين ذات الصلة.`
          : `Generate a formal legal report based on the following data.

**Report Type:** ${input.reportType}
**Title:** ${input.title}

**Consultation Data:**
${JSON.stringify({ consultation, messages, documents, reviews }, null, 2)}

Generate a formal, professional legal report in Markdown format including:
1. Executive Summary
2. Background and Context
3. Legal Analysis
4. Findings and Recommendations
5. Legal References
6. Disclaimer

Use formal legal language and cite relevant articles and laws.`;

        const response = await invokeUnifiedLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: reportPrompt },
          ],
        });

        const reportContent = (typeof response.choices[0]?.message?.content === 'string' 
          ? response.choices[0]?.message?.content 
          : "");

        // Save report
        const reportId = await db.createReport({
          consultationId: input.consultationId,
          userId: ctx.user.id,
          title: input.title,
          reportType: input.reportType,
          content: reportContent,
          language: input.language,
        });

        return { reportId, content: reportContent };
      }),

    list: protectedProcedure
      .input(z.object({ consultationId: z.number() }))
      .query(async ({ input }) => {
        return db.getConsultationReports(input.consultationId);
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getReportById(input.id);
      }),
  }),

  legalKnowledge: router({
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        return searchKB(input.query);
      }),
  }),

  // LLM Provider Management
  llmProvider: router({
    getCurrent: protectedProcedure.query(() => {
      return {
        provider: getCurrentProvider(),
        info: getProviderInfo(),
      };
    }),
    getAvailable: protectedProcedure.query(() => {
      return getAvailableProviders();
    }),
    getInfo: protectedProcedure
      .input(z.object({ provider: z.enum(["manus", "gemini"]) }))
      .query(({ input }) => {
        return getProviderInfo(input.provider);
      }),
  }),

  // Legal Knowledge Base
  knowledgeBase: router({
    search: protectedProcedure
      .input(z.object({
        query: z.string().optional(),
        categories: z.array(z.string()).optional(), // Multi-category selection
        category: z.enum(["rental_law", "civil_code", "rera_regulation", "escrow_law", "real_estate_law", "procedures", "other", "all"]).optional(), // Legacy single category
        language: z.enum(["en", "ar"]).default("en"),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
      }))
      .query(({ input }) => {
        const { query, categories, category, dateFrom, dateTo } = input;
        
        let results = query ? searchKB(query) : searchKB("");
        
        // Multi-category filter (new advanced filter)
        if (categories && categories.length > 0 && !categories.includes("all")) {
          results = results.filter(article => categories.includes(article.category));
        }
        // Legacy single category filter (for backward compatibility)
        else if (category && category !== "all") {
          results = results.filter(article => article.category === category);
        }
        
        // Date range filter (filter by law enactment year)
        if (dateFrom || dateTo) {
          results = results.filter(article => {
            // Extract year from law number (e.g., "26/2007" -> 2007)
            const yearMatch = article.lawNumber.match(/(\d{4})/);
            if (!yearMatch) return true; // Include if no year found
            
            const lawYear = parseInt(yearMatch[1]);
            
            if (dateFrom && dateTo) {
              return lawYear >= parseInt(dateFrom) && lawYear <= parseInt(dateTo);
            } else if (dateFrom) {
              return lawYear >= parseInt(dateFrom);
            } else if (dateTo) {
              return lawYear <= parseInt(dateTo);
            }
            
            return true;
          });
        }
        
        return results;
      }),

    getById: protectedProcedure
      .input(z.object({ articleId: z.string() }))
      .query(({ input }) => {
        const allArticles = searchKB("");
        return allArticles.find(article => 
          `${article.lawNumber}-${article.articleNumber || 'general'}` === input.articleId
        );
      }),

    getCategories: protectedProcedure.query(() => {
      return [
        { value: "all", label: "All Categories", count: searchKB("").length },
        { value: "rental_law", label: "Rental Law", count: searchKB("").filter(a => a.category === "rental_law").length },
        { value: "civil_code", label: "Civil Code", count: searchKB("").filter(a => a.category === "civil_code").length },
        { value: "escrow_law", label: "Escrow Law", count: searchKB("").filter(a => a.category === "escrow_law").length },
        { value: "strata_law", label: "Strata Law", count: searchKB("").filter(a => a.category === "strata_law").length },
        { value: "procedures", label: "Procedures", count: searchKB("").filter(a => a.category === "procedures").length },
      ];
    }),
  }),

  // Bookmarks
  bookmarks: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserBookmarks(ctx.user.id);
    }),

    create: protectedProcedure
      .input(z.object({
        articleId: z.string(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Check if bookmark already exists
        const existing = await db.getBookmarkByArticle(ctx.user.id, input.articleId);
        if (existing) {
          throw new Error("Article already bookmarked");
        }
        
        const bookmarkId = await db.createBookmark({
          userId: ctx.user.id,
          articleId: input.articleId,
          notes: input.notes || null,
        });
        
        return { bookmarkId };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteBookmark(input.id, ctx.user.id);
        return { success: true };
      }),

    updateNotes: protectedProcedure
      .input(z.object({
        id: z.number(),
        notes: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateBookmarkNotes(input.id, ctx.user.id, input.notes);
        return { success: true };
      }),

    checkBookmark: protectedProcedure
      .input(z.object({ articleId: z.string() }))
      .query(async ({ ctx, input }) => {
        const bookmark = await db.getBookmarkByArticle(ctx.user.id, input.articleId);
        return { isBookmarked: !!bookmark, bookmark };
      }),
  }),

  // Saved Searches
  savedSearches: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserSavedSearches(ctx.user.id);
    }),

    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        query: z.string().optional(),
        categories: z.array(z.string()).optional(),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
        language: z.enum(["en", "ar"]).default("en"),
      }))
      .mutation(async ({ ctx, input }) => {
        const searchId = await db.createSavedSearch({
          userId: ctx.user.id,
          name: input.name,
          query: input.query || null,
          categories: input.categories ? JSON.stringify(input.categories) : null,
          dateFrom: input.dateFrom || null,
          dateTo: input.dateTo || null,
          language: input.language,
        });
        
        return { searchId };
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const search = await db.getSavedSearchById(input.id, ctx.user.id);
        if (!search) return null;
        
        // Parse categories JSON
        return {
          ...search,
          categories: search.categories ? JSON.parse(search.categories) : [],
        };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteSavedSearch(input.id, ctx.user.id);
        return { success: true };
      }),

    updateLastUsed: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.updateSavedSearchLastUsed(input.id, ctx.user.id);
        return { success: true };
      }),

    rename: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).max(255),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateSavedSearchName(input.id, ctx.user.id, input.name);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
