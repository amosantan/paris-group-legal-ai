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
  category: mysqlEnum("category", ["rental_law", "civil_code", "rera_regulation", "escrow_law", "real_estate_law", "other"]).notNull(),
  keywords: text("keywords"), // JSON array for search
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
