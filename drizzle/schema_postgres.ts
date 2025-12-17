import { pgTable, text, timestamp, serial, integer, real, jsonb, index } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow (PostgreSQL/Supabase version)
 */
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  name: text("name"),
  picture_url: text("picture_url"),
  role: text("role").default("user"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Legal consultations - tracks all consultation sessions
 */
export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").notNull(),
  title: text("title"),
  category: text("category"),
  status: text("status").default("active"),
  confidence_score: real("confidence_score"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type Consultation = typeof consultations.$inferSelect;
export type InsertConsultation = typeof consultations.$inferInsert;

/**
 * Chat messages within consultations
 */
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  consultation_id: integer("consultation_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  citations: jsonb("citations").default('[]'),
  confidence_score: real("confidence_score"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Documents uploaded for analysis
 */
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  consultation_id: integer("consultation_id"),
  user_id: text("user_id").notNull(),
  file_name: text("file_name").notNull(),
  file_path: text("file_path").notNull(),
  file_size: integer("file_size"),
  file_type: text("file_type"),
  extracted_text: text("extracted_text"),
  analysis_result: jsonb("analysis_result"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

/**
 * Contract review results
 */
export const contract_reviews = pgTable("contract_reviews", {
  id: serial("id").primaryKey(),
  consultation_id: integer("consultation_id"),
  user_id: text("user_id").notNull(),
  document_id: integer("document_id"),
  contract_type: text("contract_type"),
  risk_score: real("risk_score"),
  clauses: jsonb("clauses").default('[]'),
  recommendations: jsonb("recommendations").default('[]'),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type ContractReview = typeof contract_reviews.$inferSelect;
export type InsertContractReview = typeof contract_reviews.$inferInsert;

/**
 * Legal knowledge base with semantic search capabilities
 */
export const legal_articles = pgTable("legal_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  source_url: text("source_url"),
  category: text("category"),
  subcategory: text("subcategory"),
  importance_score: real("importance_score").default(0.5),
  concepts: text("concepts").array().default([]),
  scenarios: text("scenarios").array().default([]),
  embedding: text("embedding"), // vector type will be handled by pgvector extension
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type LegalArticle = typeof legal_articles.$inferSelect;
export type InsertLegalArticle = typeof legal_articles.$inferInsert;

/**
 * Audit logs for system actions
 */
export const audit_logs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  user_id: text("user_id"),
  action: text("action").notNull(),
  entity_type: text("entity_type"),
  entity_id: text("entity_id"),
  details: jsonb("details"),
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type AuditLog = typeof audit_logs.$inferSelect;
export type InsertAuditLog = typeof audit_logs.$inferInsert;

/**
 * Search cache for performance optimization
 */
export const search_cache = pgTable("search_cache", {
  id: serial("id").primaryKey(),
  query_hash: text("query_hash").unique().notNull(),
  query_text: text("query_text").notNull(),
  results: jsonb("results").notNull(),
  hit_count: integer("hit_count").default(1),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  last_accessed_at: timestamp("last_accessed_at", { withTimezone: true }).defaultNow(),
});

export type SearchCache = typeof search_cache.$inferSelect;
export type InsertSearchCache = typeof search_cache.$inferInsert;

/**
 * Query analytics for tracking search patterns
 */
export const query_analytics = pgTable("query_analytics", {
  id: serial("id").primaryKey(),
  query_text: text("query_text").notNull(),
  category: text("category"),
  result_count: integer("result_count"),
  confidence_score: real("confidence_score"),
  user_id: text("user_id"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type QueryAnalytics = typeof query_analytics.$inferSelect;
export type InsertQueryAnalytics = typeof query_analytics.$inferInsert;

/**
 * Article usage tracking
 */
export const article_usage = pgTable("article_usage", {
  id: serial("id").primaryKey(),
  article_id: integer("article_id").notNull(),
  consultation_id: integer("consultation_id"),
  relevance_score: real("relevance_score"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type ArticleUsage = typeof article_usage.$inferSelect;
export type InsertArticleUsage = typeof article_usage.$inferInsert;

/**
 * Lawyer reviews for consultation approval
 */
export const lawyer_reviews = pgTable("lawyer_reviews", {
  id: serial("id").primaryKey(),
  consultation_id: integer("consultation_id").notNull(),
  lawyer_id: text("lawyer_id").notNull(),
  status: text("status").default("pending"),
  feedback: text("feedback"),
  approved: text("approved"), // Using text instead of boolean for compatibility
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type LawyerReview = typeof lawyer_reviews.$inferSelect;
export type InsertLawyerReview = typeof lawyer_reviews.$inferInsert;

/**
 * LLM provider settings
 */
export const llm_settings = pgTable("llm_settings", {
  id: serial("id").primaryKey(),
  provider: text("provider").notNull(),
  model: text("model").notNull(),
  temperature: real("temperature").default(0.7),
  max_tokens: integer("max_tokens").default(1000),
  is_active: text("is_active").default("true"), // Using text for boolean compatibility
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type LLMSettings = typeof llm_settings.$inferSelect;
export type InsertLLMSettings = typeof llm_settings.$inferInsert;
