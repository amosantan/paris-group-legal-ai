import { invokeLLM } from "./_core/llm";
import type { DocumentAnalysisResult } from "../shared/documentAnalysis";
import { DOCUMENT_ANALYSIS_SCHEMA } from "../shared/documentAnalysis";

/**
 * Extract structured clauses and risks from document content using AI
 * 
 * @param documentContent - The extracted text or description from the document
 * @param documentName - Name of the document file
 * @param language - Language for the analysis ("en" or "ar")
 * @returns Structured analysis with clauses and risks
 */
export async function extractClausesAndRisks(
  documentContent: string,
  documentName: string,
  language: "en" | "ar" = "en"
): Promise<DocumentAnalysisResult> {
  const systemPrompt = language === "ar"
    ? `أنت محلل قانوني خبير متخصص في قوانين دبي والإمارات. مهمتك هي تحليل المستندات القانونية واستخراج البنود الرئيسية والمخاطر المحتملة بتنسيق منظم.

عند تحليل المستند:
1. حدد نوع المستند والأطراف المعنية
2. استخرج جميع التواريخ والمبالغ المهمة
3. حدد البنود القانونية الرئيسية وصنفها حسب الأهمية
4. حدد المخاطر القانونية والمالية والتشغيلية المحتملة
5. قدم توصيات عملية للتخفيف من كل خطر
6. قيّم مستوى الخطر الإجمالي

كن دقيقاً ومحدداً. ركز على البنود والمخاطر التي لها تأثير قانوني أو مالي كبير.`
    : `You are an expert legal analyst specializing in Dubai and UAE law. Your task is to analyze legal documents and extract key clauses and potential risks in a structured format.

When analyzing the document:
1. Identify the document type and parties involved
2. Extract all important dates and amounts
3. Identify key legal clauses and categorize them by importance
4. Identify potential legal, financial, and operational risks
5. Provide actionable recommendations to mitigate each risk
6. Assess the overall risk level

Be precise and specific. Focus on clauses and risks that have significant legal or financial impact.`;

  const userPrompt = language === "ar"
    ? `قم بتحليل المستند القانوني التالي واستخراج البنود الرئيسية والمخاطر المحتملة:

اسم المستند: ${documentName}

محتوى المستند:
${documentContent.substring(0, 12000)}

قدم تحليلاً شاملاً منظماً يتضمن:
- نوع المستند والأطراف
- التواريخ والمبالغ الرئيسية
- البنود القانونية المهمة (مع التصنيف حسب الأهمية)
- المخاطر المحتملة (مع مستوى الخطورة والتوصيات)
- تقييم الخطر الإجمالي`
    : `Analyze the following legal document and extract key clauses and potential risks:

Document Name: ${documentName}

Document Content:
${documentContent.substring(0, 12000)}

Provide a comprehensive structured analysis including:
- Document type and parties
- Key dates and amounts
- Important legal clauses (categorized by importance)
- Potential risks (with severity levels and recommendations)
- Overall risk assessment`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "document_analysis",
          strict: true,
          schema: DOCUMENT_ANALYSIS_SCHEMA
        }
      }
    });

    const content = response.choices[0].message.content;
    if (typeof content !== 'string') {
      throw new Error('Expected string response from LLM');
    }

    const analysisResult: DocumentAnalysisResult = JSON.parse(content);
    
    console.log(`[Document Analysis] Extracted ${analysisResult.clauses.length} clauses and ${analysisResult.risks.length} risks from ${documentName}`);
    
    return analysisResult;
  } catch (error) {
    console.error('[Document Analysis] Extraction failed:', error);
    
    // Return a minimal result on error
    return {
      documentType: "Unknown Document",
      parties: [],
      keyDates: [],
      keyAmounts: [],
      clauses: [],
      risks: [{
        id: "risk_extraction_failed",
        title: "Analysis Failed",
        description: "Unable to extract structured data from the document. Please review manually.",
        severity: "medium",
        category: "operational",
        recommendation: "Review the document manually or try uploading again."
      }],
      overallRiskLevel: "medium",
      summary: "Document analysis could not be completed automatically."
    };
  }
}

/**
 * Extract clauses and risks from vision AI analysis
 * This is used when the document is analyzed via vision AI (images, scanned PDFs)
 */
export async function extractClausesAndRisksFromVision(
  imageUrl: string,
  documentName: string,
  language: "en" | "ar" = "en"
): Promise<DocumentAnalysisResult> {
  const systemPrompt = language === "ar"
    ? `أنت محلل قانوني خبير متخصص في قوانين دبي والإمارات. مهمتك هي تحليل المستندات القانونية المرئية واستخراج البنود الرئيسية والمخاطر المحتملة بتنسيق منظم.`
    : `You are an expert legal analyst specializing in Dubai and UAE law. Your task is to analyze visual legal documents and extract key clauses and potential risks in a structured format.`;

  const userPrompt = language === "ar"
    ? `قم بتحليل المستند القانوني المرئي واستخراج البنود الرئيسية والمخاطر المحتملة. اسم المستند: ${documentName}`
    : `Analyze this visual legal document and extract key clauses and potential risks. Document name: ${documentName}`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: userPrompt },
            { type: "image_url", image_url: { url: imageUrl, detail: "high" } }
          ] as any
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "document_analysis",
          strict: true,
          schema: DOCUMENT_ANALYSIS_SCHEMA
        }
      }
    });

    const content = response.choices[0].message.content;
    if (typeof content !== 'string') {
      throw new Error('Expected string response from LLM');
    }

    const analysisResult: DocumentAnalysisResult = JSON.parse(content);
    
    console.log(`[Vision Document Analysis] Extracted ${analysisResult.clauses.length} clauses and ${analysisResult.risks.length} risks from ${documentName}`);
    
    return analysisResult;
  } catch (error) {
    console.error('[Vision Document Analysis] Extraction failed:', error);
    
    return {
      documentType: "Unknown Document",
      parties: [],
      keyDates: [],
      keyAmounts: [],
      clauses: [],
      risks: [{
        id: "risk_extraction_failed",
        title: "Vision Analysis Failed",
        description: "Unable to extract structured data from the visual document. Please review manually.",
        severity: "medium",
        category: "operational",
        recommendation: "Try uploading a clearer image or PDF with text."
      }],
      overallRiskLevel: "medium",
      summary: "Visual document analysis could not be completed automatically."
    };
  }
}
