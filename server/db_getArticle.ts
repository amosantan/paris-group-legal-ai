/**
 * Get article by law name and article number
 * Used for citation modal to fetch full article details
 */

import { getDb } from "./db";
import { legalKnowledge } from "../drizzle/schema";
import { eq, and, like } from "drizzle-orm";

export interface ArticleDetails {
  id: number;
  articleNumber: string;
  lawName: string;
  category: string;
  fullText: string;
  source?: string;
  enactmentDate?: string;
  importance?: number;
  legalConcepts?: string[];
  relatedArticles?: Array<{
    id: number;
    articleNumber: string;
    title: string;
    category: string;
  }>;
}

/**
 * Get article by law name and article number
 */
export async function getArticleByReference(
  lawName: string,
  articleNumber: string
): Promise<ArticleDetails | null> {
  const db = await getDb();
  if (!db) return null;

  // Try exact match first
  let results = await db
    .select()
    .from(legalKnowledge)
    .where(
      and(
        eq(legalKnowledge.articleNumber, articleNumber),
        eq(legalKnowledge.lawName, lawName)
      )
    )
    .limit(1);

  // If no exact match, try fuzzy match on law name
  if (results.length === 0) {
    results = await db
      .select()
      .from(legalKnowledge)
      .where(
        and(
          eq(legalKnowledge.articleNumber, articleNumber),
          like(legalKnowledge.lawName, `%${lawName}%`)
        )
      )
      .limit(1);
  }

  if (results.length === 0) {
    return null;
  }

  const article = results[0];

  // Parse JSON fields
  const legalConcepts = article.legalConcepts
    ? JSON.parse(article.legalConcepts)
    : [];
  const relatedArticleIds = article.relatedArticles
    ? JSON.parse(article.relatedArticles)
    : [];

  // Fetch related articles
  const relatedArticles = [];
  if (relatedArticleIds.length > 0 && relatedArticleIds.length <= 10) {
    for (const relatedId of relatedArticleIds) {
      const related = await db
        .select()
        .from(legalKnowledge)
        .where(eq(legalKnowledge.id, relatedId))
        .limit(1);

      if (related.length > 0 && related[0].articleNumber) {
        relatedArticles.push({
          id: related[0].id,
          articleNumber: related[0].articleNumber,
          title: related[0].lawName,
          category: related[0].category,
        });
      }
    }
  }

  return {
    id: article.id,
    articleNumber: article.articleNumber || "",
    lawName: article.lawName,
    category: article.category,
    fullText: article.contentEn || article.contentAr || "",
    source: article.sourceUrl || article.sourceFileName || undefined,
    enactmentDate: undefined, // Not in schema
    importance: article.importance || undefined,
    legalConcepts,
    relatedArticles,
  };
}

/**
 * Get article by ID
 */
export async function getArticleById(id: number): Promise<ArticleDetails | null> {
  const db = await getDb();
  if (!db) return null;

  const results = await db
    .select()
    .from(legalKnowledge)
    .where(eq(legalKnowledge.id, id))
    .limit(1);

  if (results.length === 0) {
    return null;
  }

  const article = results[0];

  // Parse JSON fields
  const legalConcepts = article.legalConcepts
    ? JSON.parse(article.legalConcepts)
    : [];
  const relatedArticleIds = article.relatedArticles
    ? JSON.parse(article.relatedArticles)
    : [];

  // Fetch related articles
  const relatedArticles = [];
  if (relatedArticleIds.length > 0 && relatedArticleIds.length <= 10) {
    for (const relatedId of relatedArticleIds) {
      const related = await db
        .select()
        .from(legalKnowledge)
        .where(eq(legalKnowledge.id, relatedId))
        .limit(1);

      if (related.length > 0 && related[0].articleNumber) {
        relatedArticles.push({
          id: related[0].id,
          articleNumber: related[0].articleNumber,
          title: related[0].lawName,
          category: related[0].category,
        });
      }
    }
  }

  return {
    id: article.id,
    articleNumber: article.articleNumber || "",
    lawName: article.lawName,
    category: article.category,
    fullText: article.contentEn || article.contentAr || "",
    source: article.sourceUrl || article.sourceFileName || undefined,
    enactmentDate: undefined, // Not in schema
    importance: article.importance || undefined,
    legalConcepts,
    relatedArticles,
  };
}
