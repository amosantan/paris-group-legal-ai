/**
 * Hybrid Search Module
 * 
 * Combines keyword-based search (BM25) with semantic vector search
 * for optimal retrieval accuracy.
 * 
 * Features:
 * - Keyword search using SQL LIKE (fast, exact matches)
 * - Semantic search using vector embeddings (understands meaning)
 * - Score fusion (combines both approaches)
 * - Configurable weights
 */

import { searchLegalKnowledgeEnhanced } from "./legalKnowledgeBase";
import { generateEmbedding } from "./vectorEmbeddings";
import { searchSimilarArticles } from "./vectorDatabase";

/**
 * Hybrid search configuration
 */
const HYBRID_CONFIG = {
  keywordWeight: 0.3, // 30% weight for keyword search
  semanticWeight: 0.7, // 70% weight for semantic search
  topK: 10, // Return top 10 results
  minScore: 0.1, // Minimum combined score threshold
};

/**
 * Perform hybrid search combining keyword and semantic approaches
 * 
 * @param query - User query text
 * @param options - Search options
 * @returns Combined and ranked results
 */
export async function hybridSearch(
  query: string,
  options?: {
    topK?: number;
    categoryFilter?: string;
    keywordWeight?: number;
    semanticWeight?: number;
  }
): Promise<Array<{
  article: any;
  score: number;
  keywordScore: number;
  semanticScore: number;
  source: string;
}>> {
  const topK = options?.topK || HYBRID_CONFIG.topK;
  const keywordWeight = options?.keywordWeight || HYBRID_CONFIG.keywordWeight;
  const semanticWeight = options?.semanticWeight || HYBRID_CONFIG.semanticWeight;

  console.log(`[HybridSearch] Query: "${query.substring(0, 50)}..."`);
  console.log(`[HybridSearch] Weights: keyword=${keywordWeight}, semantic=${semanticWeight}`);

  try {
    // Step 1: Keyword search (existing enhanced search)
    const keywordStartTime = Date.now();
    const keywordResults = await searchLegalKnowledgeEnhanced(query);
    const keywordLatency = Date.now() - keywordStartTime;

    console.log(
      `[HybridSearch] Keyword search: ${keywordResults.length} results in ${keywordLatency}ms`
    );

    // Step 2: Semantic search (vector similarity)
    const semanticStartTime = Date.now();
    
    // Generate query embedding
    const queryEmbedding = await generateEmbedding(query);
    
    // Search for similar articles
    const semanticResults = await searchSimilarArticles(
      queryEmbedding,
      topK * 2, // Get more results for better fusion
      options?.categoryFilter
    );
    
    const semanticLatency = Date.now() - semanticStartTime;

    console.log(
      `[HybridSearch] Semantic search: ${semanticResults.length} results in ${semanticLatency}ms`
    );

    // Step 3: Normalize scores to 0-1 range
    const normalizedKeywordResults = normalizeKeywordScores(keywordResults);
    const normalizedSemanticResults = normalizeSemanticScores(semanticResults);

    // Step 4: Merge and combine scores
    const mergedResults = mergeResults(
      normalizedKeywordResults,
      normalizedSemanticResults,
      keywordWeight,
      semanticWeight
    );

    // Step 5: Sort by combined score and take top K
    mergedResults.sort((a, b) => b.score - a.score);
    const topResults = mergedResults.slice(0, topK);

    // Step 6: Filter by minimum score threshold
    const filteredResults = topResults.filter(
      result => result.score >= HYBRID_CONFIG.minScore
    );

    console.log(
      `[HybridSearch] Combined: ${filteredResults.length} results ` +
      `(top score: ${filteredResults[0]?.score.toFixed(4) || 'N/A'})`
    );

    return filteredResults;
  } catch (error) {
    console.error(`[HybridSearch] Search failed:`, error);
    
    // Fallback to keyword search only
    console.log(`[HybridSearch] Falling back to keyword search only`);
    const keywordResults = await searchLegalKnowledgeEnhanced(query);
    
    return keywordResults.slice(0, topK).map(article => ({
      article,
      score: 0.5, // Default score for fallback
      keywordScore: 1.0,
      semanticScore: 0.0,
      source: "keyword_only",
    }));
  }
}

/**
 * Normalize keyword search scores to 0-1 range
 * Keyword results don't have explicit scores, so we use position-based scoring
 */
function normalizeKeywordScores(results: any[]): Array<{
  article: any;
  score: number;
}> {
  return results.map((article, index) => ({
    article,
    score: 1.0 / (index + 1), // Position-based: 1.0, 0.5, 0.33, 0.25, ...
  }));
}

/**
 * Normalize semantic search scores to 0-1 range
 * Semantic scores are already cosine similarities (0-1), but we ensure they're normalized
 */
function normalizeSemanticScores(results: Array<{
  article: any;
  score: number;
}>): Array<{
  article: any;
  score: number;
}> {
  if (results.length === 0) return [];

  const maxScore = Math.max(...results.map(r => r.score));
  const minScore = Math.min(...results.map(r => r.score));
  const range = maxScore - minScore;

  if (range === 0) {
    // All scores are the same, return as-is
    return results;
  }

  return results.map(result => ({
    article: result.article,
    score: (result.score - minScore) / range, // Normalize to 0-1
  }));
}

/**
 * Merge keyword and semantic results with weighted scoring
 */
function mergeResults(
  keywordResults: Array<{ article: any; score: number }>,
  semanticResults: Array<{ article: any; score: number }>,
  keywordWeight: number,
  semanticWeight: number
): Array<{
  article: any;
  score: number;
  keywordScore: number;
  semanticScore: number;
  source: string;
}> {
  const mergedMap = new Map<number, {
    article: any;
    keywordScore: number;
    semanticScore: number;
  }>();

  // Add keyword results
  for (const result of keywordResults) {
    const articleId = result.article.id;
    mergedMap.set(articleId, {
      article: result.article,
      keywordScore: result.score,
      semanticScore: 0,
    });
  }

  // Add semantic results (merge if already exists)
  for (const result of semanticResults) {
    const articleId = result.article.id;
    const existing = mergedMap.get(articleId);

    if (existing) {
      // Article found in both searches - update semantic score
      existing.semanticScore = result.score;
    } else {
      // Article only in semantic search
      mergedMap.set(articleId, {
        article: result.article,
        keywordScore: 0,
        semanticScore: result.score,
      });
    }
  }

  // Calculate combined scores
  const mergedResults = Array.from(mergedMap.values()).map(item => {
    const combinedScore =
      item.keywordScore * keywordWeight +
      item.semanticScore * semanticWeight;

    // Determine source
    let source = "hybrid";
    if (item.keywordScore > 0 && item.semanticScore === 0) {
      source = "keyword_only";
    } else if (item.keywordScore === 0 && item.semanticScore > 0) {
      source = "semantic_only";
    }

    return {
      article: item.article,
      score: combinedScore,
      keywordScore: item.keywordScore,
      semanticScore: item.semanticScore,
      source,
    };
  });

  return mergedResults;
}

/**
 * Get search statistics
 */
export function getHybridSearchStats() {
  return {
    keywordWeight: HYBRID_CONFIG.keywordWeight,
    semanticWeight: HYBRID_CONFIG.semanticWeight,
    topK: HYBRID_CONFIG.topK,
    minScore: HYBRID_CONFIG.minScore,
  };
}
