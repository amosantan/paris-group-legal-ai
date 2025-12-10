import { getDb } from "./db";
import { termsAcceptance, InsertTermsAcceptance, TermsAcceptance } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Record user acceptance of terms of service
 */
export async function recordTermsAcceptance(data: {
  userId: number;
  ipAddress?: string;
  userAgent?: string;
  termsVersion?: string;
}): Promise<TermsAcceptance> {
  const db = await getDb();
  if (!db) throw new Error("Database not initialized");
  const [acceptance] = await db
    .insert(termsAcceptance)
    .values({
      userId: data.userId,
      acceptedAt: new Date(),
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      termsVersion: data.termsVersion || "1.0",
    })
    .$returningId();

  const [result] = await db
    .select()
    .from(termsAcceptance)
    .where(eq(termsAcceptance.id, acceptance.id));

  return result;
}

/**
 * Check if user has accepted terms
 */
export async function hasAcceptedTerms(userId: number, termsVersion: string = "1.0"): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error("Database not initialized");
  const result = await db
    .select()
    .from(termsAcceptance)
    .where(eq(termsAcceptance.userId, userId))
    .orderBy(desc(termsAcceptance.acceptedAt))
    .limit(1);

  if (result.length === 0) return false;

  // Check if user has accepted the current version
  return result[0].termsVersion === termsVersion;
}

/**
 * Get user's terms acceptance history
 */
export async function getTermsAcceptanceHistory(userId: number): Promise<TermsAcceptance[]> {
  const db = await getDb();
  if (!db) throw new Error("Database not initialized");
  return db
    .select()
    .from(termsAcceptance)
    .where(eq(termsAcceptance.userId, userId))
    .orderBy(desc(termsAcceptance.acceptedAt));
}

/**
 * Get latest terms acceptance for user
 */
export async function getLatestTermsAcceptance(userId: number): Promise<TermsAcceptance | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not initialized");
  const result = await db
    .select()
    .from(termsAcceptance)
    .where(eq(termsAcceptance.userId, userId))
    .orderBy(desc(termsAcceptance.acceptedAt))
    .limit(1);

  return result[0] || null;
}
