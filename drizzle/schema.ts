import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Legal consultations - tracks all consultation sessions
 */
export const consultations = mysqlTable("consultations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  category: mysqlEnum("category", ["rental_dispute", "real_estate_transaction", "contract_review", "general_inquiry"]).notNull(),
  language: mysqlEnum("language", ["en", "ar"]).default("en").notNull(),
  status: mysqlEnum("status", ["active", "completed", "archived"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Consultation = typeof consultations.$inferSelect;
export type InsertConsultation = typeof consultations.$inferInsert;

/**
 * Chat messages within consultations
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  consultationId: int("consultationId").notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Uploaded documents for analysis
 */
export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  consultationId: int("consultationId").notNull(),
  userId: int("userId").notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  fileUrl: varchar("fileUrl", { length: 1024 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  fileSize: int("fileSize").notNull(),
  extractedText: text("extractedText"),
  documentType: mysqlEnum("documentType", ["contract", "lease", "agreement", "notice", "other"]).default("other").notNull(),
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

/**
 * Contract review results
 */
export const contractReviews = mysqlTable("contractReviews", {
  id: int("id").autoincrement().primaryKey(),
  documentId: int("documentId").notNull(),
  consultationId: int("consultationId").notNull(),
  userId: int("userId").notNull(),
  overallRiskScore: int("overallRiskScore").notNull(), // 0-100
  summary: text("summary").notNull(),
  findings: text("findings").notNull(), // JSON array of findings
  recommendations: text("recommendations").notNull(), // JSON array of recommendations
  missingClauses: text("missingClauses"), // JSON array
  problematicClauses: text("problematicClauses"), // JSON array
  legalReferences: text("legalReferences"), // JSON array of law citations
  language: mysqlEnum("language", ["en", "ar"]).default("en").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContractReview = typeof contractReviews.$inferSelect;
export type InsertContractReview = typeof contractReviews.$inferInsert;

/**
 * Generated legal reports
 */
export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  consultationId: int("consultationId").notNull(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  reportType: mysqlEnum("reportType", ["consultation_summary", "contract_review", "legal_analysis", "advisory_memo"]).notNull(),
  content: text("content").notNull(), // Markdown format
  language: mysqlEnum("language", ["en", "ar"]).default("en").notNull(),
  pdfUrl: varchar("pdfUrl", { length: 1024 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;

/**
 * Legal knowledge base - UAE/Dubai laws and regulations
 */
export const legalKnowledge = mysqlTable("legalKnowledge", {
  id: int("id").autoincrement().primaryKey(),
  lawName: varchar("lawName", { length: 255 }).notNull(),
  lawNumber: varchar("lawNumber", { length: 100 }).notNull(),
  articleNumber: varchar("articleNumber", { length: 100 }),
  titleEn: varchar("titleEn", { length: 500 }).notNull(),
  titleAr: varchar("titleAr", { length: 500 }),
  contentEn: text("contentEn").notNull(),
  contentAr: text("contentAr"),
  category: mysqlEnum("category", ["rental_law", "civil_code", "rera_regulation", "escrow_law", "real_estate_law", "labor_law", "commercial_law", "difc_law", "other"]).notNull(),
  keywords: text("keywords"), // JSON array for search
  // PDF source tracking
  sourceType: mysqlEnum("sourceType", ["manual", "pdf_upload", "pdf_url"]).default("manual").notNull(),
  sourceUrl: varchar("sourceUrl", { length: 1024 }), // Original PDF URL
  sourceFileName: varchar("sourceFileName", { length: 255 }), // Original PDF filename
  chunkIndex: int("chunkIndex"), // For PDF chunks: 0, 1, 2, etc.
  totalChunks: int("totalChunks"), // Total chunks in this document
  pageNumber: int("pageNumber"), // Page number in original PDF
  // Phase 1 Metadata Enrichment fields
  legalConcepts: text("legalConcepts"), // JSON array of extracted concepts: ["eviction", "notice period", "tenant rights"]
  relatedArticles: text("relatedArticles"), // JSON array of related article IDs: [123, 456, 789]
  importance: int("importance").default(5), // Importance score 1-10 (default: 5)
  applicableScenarios: text("applicableScenarios"), // JSON array of scenarios: ["rental dispute", "lease termination"]
  searchKeywords: text("searchKeywords"), // JSON array of pre-computed search keywords for faster retrieval
  // Phase 2 Vector Embeddings field
  embedding: text("embedding"), // JSON array of 1536-dimensional vector for semantic search
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LegalKnowledge = typeof legalKnowledge.$inferSelect;
export type InsertLegalKnowledge = typeof legalKnowledge.$inferInsert;

/**
 * User bookmarks for legal knowledge articles
 */
export const bookmarks = mysqlTable("bookmarks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  articleId: varchar("articleId", { length: 255 }).notNull(), // Reference to knowledge base article
  notes: text("notes"), // User's personal notes on the article
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = typeof bookmarks.$inferInsert;

/**
 * Saved search queries for quick access
 */
export const savedSearches = mysqlTable("savedSearches", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(), // User-defined name for the search
  query: varchar("query", { length: 500 }), // Search keywords
  categories: text("categories"), // JSON array of selected categories
  dateFrom: varchar("dateFrom", { length: 50 }), // Date range start (law enactment date)
  dateTo: varchar("dateTo", { length: 50 }), // Date range end
  language: mysqlEnum("language", ["en", "ar"]).default("en").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  lastUsed: timestamp("lastUsed").defaultNow().notNull(),
});

export type SavedSearch = typeof savedSearches.$inferSelect;
export type InsertSavedSearch = typeof savedSearches.$inferInsert;


/**
 * Lawyer reviews - tracks human lawyer review of AI-generated advice
 */
export const lawyerReviews = mysqlTable("lawyerReviews", {
  id: int("id").autoincrement().primaryKey(),
  consultationId: int("consultationId"),
  contractReviewId: int("contractReviewId"),
  reportId: int("reportId"),
  reviewerId: int("reviewerId").notNull(), // User ID of the lawyer
  reviewerName: varchar("reviewerName", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected", "needs_revision"]).default("pending").notNull(),
  reviewNotes: text("reviewNotes"),
  originalContent: text("originalContent").notNull(), // Original AI response
  revisedContent: text("revisedContent"), // Lawyer's revisions (if any)
  confidenceScore: int("confidenceScore"), // AI confidence at time of generation
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LawyerReview = typeof lawyerReviews.$inferSelect;
export type InsertLawyerReview = typeof lawyerReviews.$inferInsert;

/**
 * Audit trail - comprehensive logging of all AI interactions
 */
export const auditLogs = mysqlTable("auditLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  userName: varchar("userName", { length: 255 }),
  action: varchar("action", { length: 100 }).notNull(), // e.g., "consultation_created", "message_sent", "review_approved"
  entityType: varchar("entityType", { length: 50 }).notNull(), // e.g., "consultation", "message", "review"
  entityId: int("entityId").notNull(),
  details: text("details"), // JSON with additional context
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: varchar("userAgent", { length: 512 }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

/**
 * AI response metadata - stores confidence scores and verification results
 */
export const aiResponseMetadata = mysqlTable("aiResponseMetadata", {
  id: int("id").autoincrement().primaryKey(),
  messageId: int("messageId"), // Links to messages table
  consultationId: int("consultationId"),
  llmProvider: varchar("llmProvider", { length: 50 }).notNull(), // "manus" or "gemini"
  llmModel: varchar("llmModel", { length: 100 }),
  confidenceScore: int("confidenceScore").notNull(), // 0-100
  confidenceLevel: mysqlEnum("confidenceLevel", ["very_high", "high", "medium", "low", "very_low"]).notNull(),
  citationCount: int("citationCount").notNull(),
  verifiedCitations: int("verifiedCitations").notNull(),
  groundingScore: int("groundingScore").notNull(), // 0-100
  knowledgeBaseCoverage: int("knowledgeBaseCoverage").notNull(),
  legalClarityScore: int("legalClarityScore").notNull(),
  queryComplexityScore: int("queryComplexityScore").notNull(),
  requiresLawyerReview: int("requiresLawyerReview").notNull().default(0), // boolean as int
  usedArticles: text("usedArticles"), // JSON array of article IDs used
  warnings: text("warnings"), // JSON array of warnings
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AiResponseMetadata = typeof aiResponseMetadata.$inferSelect;
export type InsertAiResponseMetadata = typeof aiResponseMetadata.$inferInsert;

/**
 * Query Analytics - tracks all search queries for improvement insights
 */
export const queryAnalytics = mysqlTable("queryAnalytics", {
  id: int("id").autoincrement().primaryKey(),
  query: text("query").notNull(),
  language: mysqlEnum("language", ["en", "ar"]).notNull(),
  category: varchar("category", { length: 100 }),
  resultsCount: int("resultsCount").notNull(),
  responseTime: int("responseTime").notNull(), // milliseconds
  confidenceScore: int("confidenceScore"), // 0-100
  wasHelpful: int("wasHelpful"), // boolean as int, nullable (user feedback)
  userId: int("userId"),
  consultationId: int("consultationId"),
  searchMethod: varchar("searchMethod", { length: 50 }).default("hybrid").notNull(), // keyword, semantic, hybrid, reranked
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type QueryAnalytics = typeof queryAnalytics.$inferSelect;
export type InsertQueryAnalytics = typeof queryAnalytics.$inferInsert;

/**
 * Article Analytics - tracks article retrieval and usage patterns
 */
export const articleAnalytics = mysqlTable("articleAnalytics", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  timesRetrieved: int("timesRetrieved").notNull().default(1),
  timesClicked: int("timesClicked").notNull().default(0),
  avgRelevanceScore: int("avgRelevanceScore"), // 0-100, average relevance across all retrievals
  lastRetrieved: timestamp("lastRetrieved").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ArticleAnalytics = typeof articleAnalytics.$inferSelect;
export type InsertArticleAnalytics = typeof articleAnalytics.$inferInsert;
