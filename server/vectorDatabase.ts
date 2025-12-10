/**
 * Vector Database Module (MySQL-based)
 * 
 * Stores and retrieves vector embeddings using MySQL database.
 * Simpler than external vector databases, sufficient for <10K vectors.
 * 
 * Features:
 * - Store embeddings as JSON in MySQL
 * - Cosine similarity search
 * - Metadata filtering
 * - No external dependencies
 * - Automatic backup with database
 */

import { getDb } from "./db";
import { legalKnowledge } from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";

/**
 * Calculate cosine similarity between two vectors
 * 
 * @param vec1 - First vector
 * @param vec2 - Second vector
 * @returns Cosine similarity (0 to 1, higher is more similar)
 */
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) {
    throw new Error("Vectors must have same length");
  }

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    norm1 += vec1[i] * vec1[i];
    norm2 += vec2[i] * vec2[i];
  }

  const similarity = dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  return similarity;
}

/**
 * Store embedding for an article
 * 
 * @param articleId - Database ID of the article
 * @param embedding - 1536-dimensional vector
 */
export async function storeEmbedding(
  articleId: number,
  embedding: number[]
): Promise<void> {
  try {
    const embeddingJson = JSON.stringify(embedding);

    const db = await getDb();
    if (!db) throw new Error("Database not initialized");
    await db
      .update(legalKnowledge)
      .set({ embedding: embeddingJson })
      .where(eq(legalKnowledge.id, articleId));

    console.log(`[VectorDB] Stored embedding for article ${articleId}`);
  } catch (error) {
    console.error(`[VectorDB] Failed to store embedding for article ${articleId}:`, error);
    throw error;
  }
}

/**
 * Batch store embeddings for multiple articles
 * 
 * @param embeddings - Array of {articleId, embedding}
 */
export async function batchStoreEmbeddings(
  embeddings: Array<{ articleId: number; embedding: number[] }>
): Promise<void> {
  try {
    console.log(`[VectorDB] Batch storing ${embeddings.length} embeddings...`);

    for (const { articleId, embedding } of embeddings) {
      await storeEmbedding(articleId, embedding);
    }

    console.log(`[VectorDB] Batch stored ${embeddings.length} embeddings`);
  } catch (error) {
    console.error(`[VectorDB] Failed to batch store embeddings:`, error);
    throw error;
  }
}

/**
 * Search for similar articles using vector similarity
 * 
 * @param queryEmbedding - Query vector (1536 dimensions)
 * @param topK - Number of results to return (default: 10)
 * @param categoryFilter - Optional category filter
 * @returns Array of {article, score}
 */
export async function searchSimilarArticles(
  queryEmbedding: number[],
  topK: number = 10,
  categoryFilter?: string
): Promise<Array<{
  article: any;
  score: number;
}>> {
  try {
    const startTime = Date.now();

    // Get all articles with embeddings
    const db = await getDb();
    if (!db) throw new Error("Database not initialized");
    const allArticles = await db
      .select()
      .from(legalKnowledge)
      .where(sql`${legalKnowledge.embedding} IS NOT NULL`);

    // Filter by category if specified
    const filteredArticles = categoryFilter
      ? allArticles.filter(article => article.category === categoryFilter)
      : allArticles;

    console.log(
      `[VectorDB] Loaded ${filteredArticles.length} articles with embeddings ` +
      `(category filter: ${categoryFilter || 'none'})`
    );

    // Calculate similarity for each article
    const results = filteredArticles
      .map((article: any) => {
        try {
          const embedding = JSON.parse(article.embedding!);
          const similarity = cosineSimilarity(queryEmbedding, embedding);
          return {
            article,
            score: similarity,
          };
        } catch (error) {
          console.error(`[VectorDB] Failed to parse embedding for article ${article.id}:`, error);
          return null;
        }
      })
      .filter((result): result is { article: any; score: number } => result !== null);

    // Sort by similarity (descending) and take top K
    results.sort((a: any, b: any) => b.score - a.score);
    const topResults = results.slice(0, topK);

    const latency = Date.now() - startTime;

    console.log(
      `[VectorDB] Search complete: ${topResults.length} results in ${latency}ms ` +
      `(top score: ${topResults[0]?.score.toFixed(4) || 'N/A'})`
    );

    return topResults;
  } catch (error) {
    console.error(`[VectorDB] Search failed:`, error);
    throw error;
  }
}

/**
 * Get embedding for a specific article
 * 
 * @param articleId - Database ID of the article
 * @returns Embedding vector or null if not found
 */
export async function getEmbedding(articleId: number): Promise<number[] | null> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not initialized");
    const article = await db
      .select()
      .from(legalKnowledge)
      .where(eq(legalKnowledge.id, articleId))
      .limit(1);

    if (article.length === 0 || !article[0].embedding) {
      return null;
    }

    return JSON.parse(article[0].embedding);
  } catch (error) {
    console.error(`[VectorDB] Failed to get embedding for article ${articleId}:`, error);
    throw error;
  }
}

/**
 * Get statistics about stored embeddings
 * 
 * @returns Stats about embeddings in database
 */
export async function getEmbeddingStats(): Promise<{
  totalArticles: number;
  articlesWithEmbeddings: number;
  articlesWithoutEmbeddings: number;
  coveragePercentage: number;
}> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not initialized");
    const allArticles = await db.select().from(legalKnowledge);
    const articlesWithEmbeddings = allArticles.filter((a: any) => a.embedding !== null);

    const totalArticles = allArticles.length;
    const withEmbeddings = articlesWithEmbeddings.length;
    const withoutEmbeddings = totalArticles - withEmbeddings;
    const coveragePercentage = totalArticles > 0 ? (withEmbeddings / totalArticles) * 100 : 0;

    return {
      totalArticles,
      articlesWithEmbeddings: withEmbeddings,
      articlesWithoutEmbeddings: withoutEmbeddings,
      coveragePercentage,
    };
  } catch (error) {
    console.error(`[VectorDB] Failed to get embedding stats:`, error);
    throw error;
  }
}

/**
 * Delete embedding for an article
 * 
 * @param articleId - Database ID of the article
 */
export async function deleteEmbedding(articleId: number): Promise<void> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not initialized");
    await db
      .update(legalKnowledge)
      .set({ embedding: null })
      .where(eq(legalKnowledge.id, articleId));

    console.log(`[VectorDB] Deleted embedding for article ${articleId}`);
  } catch (error) {
    console.error(`[VectorDB] Failed to delete embedding for article ${articleId}:`, error);
    throw error;
  }
}

/**
 * Clear all embeddings from database
 * WARNING: This deletes all embeddings!
 */
export async function clearAllEmbeddings(): Promise<void> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not initialized");
    await db.update(legalKnowledge).set({ embedding: null });
    console.log(`[VectorDB] Cleared all embeddings`);
  } catch (error) {
    console.error(`[VectorDB] Failed to clear embeddings:`, error);
    throw error;
  }
}

/**
 * Test vector search with sample data
 */
export async function testVectorSearch(): Promise<void> {
  console.log("\n[VectorDB] Running vector search tests...\n");

  // Get stats
  const stats = await getEmbeddingStats();
  console.log(`📊 Embedding Statistics:`);
  console.log(`   Total articles: ${stats.totalArticles}`);
  console.log(`   With embeddings: ${stats.articlesWithEmbeddings}`);
  console.log(`   Without embeddings: ${stats.articlesWithoutEmbeddings}`);
  console.log(`   Coverage: ${stats.coveragePercentage.toFixed(1)}%\n`);

  if (stats.articlesWithEmbeddings === 0) {
    console.log(`⚠️  No embeddings found. Run generateEmbeddings.ts first.\n`);
    return;
  }

  // Get a random article's embedding to use as query
  const db = await getDb();
  if (!db) throw new Error("Database not initialized");
  const allArticles = await db.select().from(legalKnowledge);
  const articlesWithEmbeddings = allArticles.filter((a: any) => a.embedding !== null);
  const randomArticle = articlesWithEmbeddings[0];
  const queryEmbedding = JSON.parse(randomArticle.embedding!);

  console.log(`🔍 Testing search with article: "${randomArticle.titleEn}"\n`);

  // Search for similar articles
  const results = await searchSimilarArticles(queryEmbedding, 5);

  console.log(`📋 Top 5 similar articles:`);
  results.forEach((result, i) => {
    console.log(
      `   ${i + 1}. ${result.article.titleEn} ` +
      `(score: ${result.score.toFixed(4)}, category: ${result.article.category})`
    );
  });

  console.log(`\n[VectorDB] Tests complete!\n`);
}
