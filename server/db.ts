import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { 
  InsertUser, 
  users, 
  consultations,
  InsertConsultation,
  messages,
  InsertMessage,
  documents,
  InsertDocument,
  contractReviews,
  InsertContractReview,
  reports,
  InsertReport,
  legalKnowledge,
  InsertLegalKnowledge,
  bookmarks,
  InsertBookmark,
  savedSearches,
  InsertSavedSearch,
  aiResponseMetadata,
  InsertAiResponseMetadata
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Consultation queries
export async function createConsultation(data: InsertConsultation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(consultations).values(data);
  return result[0].insertId;
}

export async function getConsultationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(consultations).where(eq(consultations.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserConsultations(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(consultations).where(eq(consultations.userId, userId)).orderBy(desc(consultations.updatedAt));
}

export async function updateConsultationStatus(id: number, status: "active" | "completed" | "archived") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(consultations).set({ status, updatedAt: new Date() }).where(eq(consultations.id, id));
}

// Message queries
export async function createMessage(data: InsertMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(messages).values(data);
  return result[0].insertId;
}

export async function getConsultationMessages(consultationId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const results = await db
    .select({
      message: messages,
      metadata: aiResponseMetadata,
    })
    .from(messages)
    .leftJoin(aiResponseMetadata, eq(messages.id, aiResponseMetadata.messageId))
    .where(eq(messages.consultationId, consultationId))
    .orderBy(messages.createdAt);
  
  return results.map(r => ({
    ...r.message,
    aiMetadata: r.metadata || undefined,
  }));
}

// Document queries
export async function createDocument(data: InsertDocument) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(documents).values(data);
  return result[0].insertId;
}

export async function getDocumentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(documents).where(eq(documents.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getConsultationDocuments(consultationId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(documents).where(eq(documents.consultationId, consultationId)).orderBy(desc(documents.uploadedAt));
}

export async function updateDocumentText(id: number, extractedText: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(documents).set({ extractedText }).where(eq(documents.id, id));
}

// Contract review queries
export async function createContractReview(data: InsertContractReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(contractReviews).values(data);
  return result[0].insertId;
}

export async function getContractReviewByDocumentId(documentId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(contractReviews).where(eq(contractReviews.documentId, documentId)).orderBy(desc(contractReviews.createdAt)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getConsultationReviews(consultationId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(contractReviews).where(eq(contractReviews.consultationId, consultationId)).orderBy(desc(contractReviews.createdAt));
}

// Report queries
export async function createReport(data: InsertReport) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(reports).values(data);
  return result[0].insertId;
}

export async function getReportById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(reports).where(eq(reports.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getConsultationReports(consultationId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(reports).where(eq(reports.consultationId, consultationId)).orderBy(desc(reports.createdAt));
}

export async function updateReportPdfUrl(id: number, pdfUrl: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(reports).set({ pdfUrl }).where(eq(reports.id, id));
}

// Legal knowledge queries
export async function createLegalKnowledge(data: InsertLegalKnowledge) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(legalKnowledge).values(data);
  return result[0].insertId;
}

export async function searchLegalKnowledge(category?: string, keyword?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (category) {
    return db.select().from(legalKnowledge).where(eq(legalKnowledge.category, category as any));
  }
  
  return db.select().from(legalKnowledge);
}

export async function getAllLegalKnowledge() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(legalKnowledge);
}

export async function listLegalKnowledge(options: {
  category?: string;
  sourceType?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(legalKnowledge);
  
  if (options.category) {
    query = query.where(eq(legalKnowledge.category, options.category as any)) as any;
  }
  
  if (options.sourceType) {
    query = query.where(eq(legalKnowledge.sourceType, options.sourceType as any)) as any;
  }
  
  if (options.limit) {
    query = query.limit(options.limit) as any;
  }
  
  if (options.offset) {
    query = query.offset(options.offset) as any;
  }
  
  return query;
}

export async function getLegalKnowledgeStats() {
  const db = await getDb();
  
  // Import hardcoded knowledge base to count articles dynamically
  const { LEGAL_KNOWLEDGE_BASE } = await import('./legalKnowledgeBase');
  const hardcoded = LEGAL_KNOWLEDGE_BASE.length;
  
  if (!db) return { total: hardcoded, byCategory: {}, bySourceType: {}, fromPDFs: 0, hardcoded };
  
  const all = await db.select().from(legalKnowledge);
  
  const byCategory: Record<string, number> = {};
  const bySourceType: Record<string, number> = {};
  
  for (const item of all) {
    byCategory[item.category] = (byCategory[item.category] || 0) + 1;
    bySourceType[item.sourceType] = (bySourceType[item.sourceType] || 0) + 1;
  }
  
  // Count PDF entries (both pdf_upload and pdf_url)
  const fromPDFs = (bySourceType['pdf_upload'] || 0) + (bySourceType['pdf_url'] || 0);
  
  return {
    total: all.length + hardcoded, // Total = database entries + hardcoded
    byCategory,
    bySourceType,
    fromPDFs,
    hardcoded, // Dynamically counted from LEGAL_KNOWLEDGE_BASE array
  };
}

export async function deleteLegalKnowledge(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(legalKnowledge).where(eq(legalKnowledge.id, id));
  return true;
}

// Bookmark queries
export async function createBookmark(data: InsertBookmark) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(bookmarks).values(data);
  return result[0].insertId;
}

export async function getUserBookmarks(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(bookmarks).where(eq(bookmarks.userId, userId)).orderBy(desc(bookmarks.createdAt));
}

export async function getBookmarkByArticle(userId: number, articleId: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.articleId, articleId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function deleteBookmark(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(bookmarks).where(and(eq(bookmarks.id, id), eq(bookmarks.userId, userId)));
}

export async function updateBookmarkNotes(id: number, userId: number, notes: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(bookmarks).set({ notes }).where(and(eq(bookmarks.id, id), eq(bookmarks.userId, userId)));
}

// Saved Searches queries
export async function createSavedSearch(data: InsertSavedSearch) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(savedSearches).values(data);
  return result[0].insertId;
}

export async function getUserSavedSearches(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(savedSearches).where(eq(savedSearches.userId, userId)).orderBy(desc(savedSearches.lastUsed));
}

export async function getSavedSearchById(id: number, userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(savedSearches)
    .where(and(eq(savedSearches.id, id), eq(savedSearches.userId, userId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function deleteSavedSearch(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(savedSearches).where(and(eq(savedSearches.id, id), eq(savedSearches.userId, userId)));
}

export async function updateSavedSearchLastUsed(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(savedSearches)
    .set({ lastUsed: new Date() })
    .where(and(eq(savedSearches.id, id), eq(savedSearches.userId, userId)));
}

export async function updateSavedSearchName(id: number, userId: number, name: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(savedSearches)
    .set({ name })
    .where(and(eq(savedSearches.id, id), eq(savedSearches.userId, userId)));
}


// AI Response Metadata functions
export async function createAiResponseMetadata(data: InsertAiResponseMetadata) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(aiResponseMetadata).values(data);
  return result[0].insertId;
}

export async function getAiResponseMetadata(messageId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(aiResponseMetadata).where(eq(aiResponseMetadata.messageId, messageId)).limit(1);
  return result[0] || null;
}

export async function getConsultationMetadata(consultationId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(aiResponseMetadata).where(eq(aiResponseMetadata.consultationId, consultationId));
}
