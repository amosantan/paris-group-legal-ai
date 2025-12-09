/**
 * Database helper functions for lawyer reviews and audit logging
 */

import { getDb } from "./db";
import { 
  lawyerReviews, 
  InsertLawyerReview,
  LawyerReview,
  auditLogs,
  InsertAuditLog,
  AuditLog,
  consultations,
  aiResponseMetadata
} from "../drizzle/schema";
import { eq, desc, and, sql, or } from "drizzle-orm";

// ==================== LAWYER REVIEWS ====================

/**
 * Create a new lawyer review
 */
export async function createLawyerReview(review: InsertLawyerReview): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(lawyerReviews).values(review);
  return result[0].insertId;
}

/**
 * Get all pending lawyer reviews (for dashboard)
 */
export async function getPendingLawyerReviews(): Promise<LawyerReview[]> {
  const db = await getDb();
  if (!db) return [];

  const reviews = await db
    .select()
    .from(lawyerReviews)
    .where(eq(lawyerReviews.status, "pending"))
    .orderBy(desc(lawyerReviews.createdAt));

  return reviews;
}

/**
 * Get all lawyer reviews with optional filtering
 */
export async function getLawyerReviews(filters?: {
  status?: "pending" | "approved" | "rejected" | "needs_revision";
  reviewerId?: number;
  consultationId?: number;
}): Promise<LawyerReview[]> {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(lawyerReviews);

  const conditions = [];
  if (filters?.status) {
    conditions.push(eq(lawyerReviews.status, filters.status));
  }
  if (filters?.reviewerId) {
    conditions.push(eq(lawyerReviews.reviewerId, filters.reviewerId));
  }
  if (filters?.consultationId) {
    conditions.push(eq(lawyerReviews.consultationId, filters.consultationId));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  const reviews = await query.orderBy(desc(lawyerReviews.createdAt));
  return reviews;
}

/**
 * Get lawyer review by ID
 */
export async function getLawyerReviewById(id: number): Promise<LawyerReview | null> {
  const db = await getDb();
  if (!db) return null;

  const reviews = await db
    .select()
    .from(lawyerReviews)
    .where(eq(lawyerReviews.id, id))
    .limit(1);

  return reviews[0] || null;
}

/**
 * Get lawyer reviews for a consultation with details
 */
export async function getConsultationReviews(consultationId: number): Promise<Array<LawyerReview & { consultationTitle?: string | null }>> {
  const db = await getDb();
  if (!db) return [];

  const reviews = await db
    .select({
      id: lawyerReviews.id,
      consultationId: lawyerReviews.consultationId,
      contractReviewId: lawyerReviews.contractReviewId,
      reportId: lawyerReviews.reportId,
      reviewerId: lawyerReviews.reviewerId,
      reviewerName: lawyerReviews.reviewerName,
      status: lawyerReviews.status,
      reviewNotes: lawyerReviews.reviewNotes,
      originalContent: lawyerReviews.originalContent,
      revisedContent: lawyerReviews.revisedContent,
      confidenceScore: lawyerReviews.confidenceScore,
      reviewedAt: lawyerReviews.reviewedAt,
      createdAt: lawyerReviews.createdAt,
      consultationTitle: consultations.title,
    })
    .from(lawyerReviews)
    .leftJoin(consultations, eq(lawyerReviews.consultationId, consultations.id))
    .where(eq(lawyerReviews.consultationId, consultationId))
    .orderBy(desc(lawyerReviews.createdAt));

  return reviews;
}

/**
 * Update lawyer review status and notes
 */
export async function updateLawyerReview(
  id: number,
  updates: {
    status?: "pending" | "approved" | "rejected" | "needs_revision";
    reviewNotes?: string;
    revisedContent?: string;
    reviewedAt?: Date;
  }
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(lawyerReviews)
    .set(updates)
    .where(eq(lawyerReviews.id, id));
}

/**
 * Get reviews that need attention (pending or needs_revision)
 */
export async function getReviewsNeedingAttention(): Promise<LawyerReview[]> {
  const db = await getDb();
  if (!db) return [];

  const reviews = await db
    .select()
    .from(lawyerReviews)
    .where(
      or(
        eq(lawyerReviews.status, "pending"),
        eq(lawyerReviews.status, "needs_revision")
      )
    )
    .orderBy(desc(lawyerReviews.createdAt));

  return reviews;
}

/**
 * Get review statistics
 */
export async function getReviewStatistics(): Promise<{
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  needsRevision: number;
}> {
  const db = await getDb();
  if (!db) return { total: 0, pending: 0, approved: 0, rejected: 0, needsRevision: 0 };

  const stats = await db
    .select({
      status: lawyerReviews.status,
      count: sql<number>`count(*)`,
    })
    .from(lawyerReviews)
    .groupBy(lawyerReviews.status);

  const result = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    needsRevision: 0,
  };

  stats.forEach((stat) => {
    const count = Number(stat.count);
    result.total += count;
    if (stat.status === "pending") result.pending = count;
    if (stat.status === "approved") result.approved = count;
    if (stat.status === "rejected") result.rejected = count;
    if (stat.status === "needs_revision") result.needsRevision = count;
  });

  return result;
}

// ==================== AUDIT LOGS ====================

/**
 * Create an audit log entry
 */
export async function createAuditLog(log: InsertAuditLog): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Audit] Database not available, skipping log");
    return;
  }

  try {
    await db.insert(auditLogs).values(log);
  } catch (error) {
    console.error("[Audit] Failed to create audit log:", error);
  }
}

/**
 * Get audit logs with filtering
 */
export async function getAuditLogs(filters?: {
  userId?: number;
  action?: string;
  entityType?: string;
  entityId?: number;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}): Promise<AuditLog[]> {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(auditLogs);

  const conditions = [];
  if (filters?.userId) {
    conditions.push(eq(auditLogs.userId, filters.userId));
  }
  if (filters?.action) {
    conditions.push(eq(auditLogs.action, filters.action));
  }
  if (filters?.entityType) {
    conditions.push(eq(auditLogs.entityType, filters.entityType));
  }
  if (filters?.entityId) {
    conditions.push(eq(auditLogs.entityId, filters.entityId));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  const logs = await query
    .orderBy(desc(auditLogs.timestamp))
    .limit(filters?.limit || 100);

  return logs;
}

/**
 * Get audit logs for a specific entity
 */
export async function getEntityAuditLogs(
  entityType: string,
  entityId: number
): Promise<AuditLog[]> {
  const db = await getDb();
  if (!db) return [];

  const logs = await db
    .select()
    .from(auditLogs)
    .where(
      and(
        eq(auditLogs.entityType, entityType),
        eq(auditLogs.entityId, entityId)
      )
    )
    .orderBy(desc(auditLogs.timestamp));

  return logs;
}

/**
 * Get recent audit logs (for admin dashboard)
 */
export async function getRecentAuditLogs(limit: number = 50): Promise<AuditLog[]> {
  const db = await getDb();
  if (!db) return [];

  const logs = await db
    .select()
    .from(auditLogs)
    .orderBy(desc(auditLogs.timestamp))
    .limit(limit);

  return logs;
}

/**
 * Helper function to log AI interactions automatically
 */
export async function logAIInteraction(
  userId: number,
  userName: string | null,
  action: string,
  entityType: string,
  entityId: number,
  details?: any
): Promise<void> {
  await createAuditLog({
    userId,
    userName: userName || "Unknown",
    action,
    entityType,
    entityId,
    details: details ? JSON.stringify(details) : null,
    ipAddress: null,
    userAgent: null,
  });
}
