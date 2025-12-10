/**
 * Analytics Tracking Module
 * 
 * Tracks query patterns and article usage for continuous improvement
 */

import { getDb } from "./db";
import { queryAnalytics, articleAnalytics } from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";

export interface QueryTrackingData {
  query: string;
  language: "en" | "ar";
  category?: string;
  resultsCount: number;
  responseTime: number; // milliseconds
  confidenceScore?: number;
  userId?: number;
  consultationId?: number;
  searchMethod?: "keyword" | "semantic" | "hybrid" | "reranked";
}

export interface ArticleTrackingData {
  articleId: number;
  relevanceScore?: number; // 0-100
}

/**
 * Track a search query for analytics
 */
export async function trackQuery(data: QueryTrackingData): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;
    
    await db.insert(queryAnalytics).values({
      query: data.query,
      language: data.language,
      category: data.category || null,
      resultsCount: data.resultsCount,
      responseTime: data.responseTime,
      confidenceScore: data.confidenceScore || null,
      userId: data.userId || null,
      consultationId: data.consultationId || null,
      searchMethod: data.searchMethod || "hybrid",
      wasHelpful: null, // Will be updated when user provides feedback
    });

    console.log(`[Analytics] Tracked query: "${data.query.substring(0, 50)}..." (${data.language}, ${data.resultsCount} results, ${data.responseTime}ms)`);
  } catch (error) {
    console.error("[Analytics] Failed to track query:", error);
    // Don't throw - analytics failures shouldn't break the main flow
  }
}

/**
 * Track article retrieval for analytics
 */
export async function trackArticleRetrieval(data: ArticleTrackingData): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;
    
    // Check if article analytics record exists
    const existing = await db
      .select()
      .from(articleAnalytics)
      .where(eq(articleAnalytics.articleId, data.articleId))
      .limit(1);

    if (existing.length > 0) {
      // Update existing record
      const current = existing[0];
      const newTimesRetrieved = current.timesRetrieved + 1;
      
      // Calculate new average relevance score
      let newAvgScore = current.avgRelevanceScore;
      if (data.relevanceScore !== undefined) {
        if (current.avgRelevanceScore) {
          // Weighted average: (old_avg * old_count + new_score) / new_count
          newAvgScore = Math.round(
            (current.avgRelevanceScore * current.timesRetrieved + data.relevanceScore) / newTimesRetrieved
          );
        } else {
          newAvgScore = data.relevanceScore;
        }
      }

      await db
        .update(articleAnalytics)
        .set({
          timesRetrieved: newTimesRetrieved,
          avgRelevanceScore: newAvgScore,
          lastRetrieved: new Date(),
        })
        .where(eq(articleAnalytics.articleId, data.articleId));
    } else {
      // Insert new record
      await db.insert(articleAnalytics).values({
        articleId: data.articleId,
        timesRetrieved: 1,
        timesClicked: 0,
        avgRelevanceScore: data.relevanceScore || null,
        lastRetrieved: new Date(),
      });
    }

    console.log(`[Analytics] Tracked article retrieval: article ${data.articleId} (score: ${data.relevanceScore || 'N/A'})`);
  } catch (error) {
    console.error("[Analytics] Failed to track article retrieval:", error);
    // Don't throw - analytics failures shouldn't break the main flow
  }
}

/**
 * Track multiple article retrievals in batch
 */
export async function trackArticleRetrievalBatch(articles: ArticleTrackingData[]): Promise<void> {
  for (const article of articles) {
    await trackArticleRetrieval(article);
  }
}

/**
 * Update query feedback (was it helpful?)
 */
export async function updateQueryFeedback(queryId: number, wasHelpful: boolean): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;
    
    await db
      .update(queryAnalytics)
      .set({ wasHelpful: wasHelpful ? 1 : 0 })
      .where(eq(queryAnalytics.id, queryId));

    console.log(`[Analytics] Updated query feedback: query ${queryId} was ${wasHelpful ? 'helpful' : 'not helpful'}`);
  } catch (error) {
    console.error("[Analytics] Failed to update query feedback:", error);
  }
}

/**
 * Track article click (user clicked to view full article)
 */
export async function trackArticleClick(articleId: number): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;
    
    const existing = await db
      .select()
      .from(articleAnalytics)
      .where(eq(articleAnalytics.articleId, articleId))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(articleAnalytics)
        .set({
          timesClicked: existing[0].timesClicked + 1,
        })
        .where(eq(articleAnalytics.articleId, articleId));
    }

    console.log(`[Analytics] Tracked article click: article ${articleId}`);
  } catch (error) {
    console.error("[Analytics] Failed to track article click:", error);
  }
}
