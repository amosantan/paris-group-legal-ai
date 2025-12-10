/**
 * Cross-Encoder Re-ranking Module
 * 
 * Re-ranks search results using Gemini API to improve relevance.
 * Applies sophisticated AI model to score query-document pairs.
 * 
 * Expected improvement: +20-30% precision@10
 * Latency overhead: ~100-200ms per query
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

export interface SearchResult {
  article: {
    id: number;
    lawName: string;
    lawNumber: string;
    articleNumber?: string;
    titleEn: string;
    titleAr?: string;
    contentEn: string;
    contentAr?: string;
    category: string;
  };
  score: number;
  source: 'keyword' | 'semantic' | 'hybrid';
}

export interface RerankResult extends SearchResult {
  rerankScore: number;
  originalScore: number;
  originalRank: number;
}

/**
 * Re-rank search results using Gemini API
 * 
 * @param query - User's search query
 * @param results - Initial search results from hybrid search
 * @param topK - Number of top results to return after re-ranking
 * @returns Re-ranked results with updated scores
 */
export async function rerankResults(
  query: string,
  results: SearchResult[],
  topK: number = 10
): Promise<RerankResult[]> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('[Reranker] Gemini API key not configured, skipping re-ranking');
    return results.slice(0, topK).map((result, index) => ({
      ...result,
      rerankScore: result.score,
      originalScore: result.score,
      originalRank: index + 1,
    }));
  }

  if (results.length === 0) {
    return [];
  }

  try {
    const startTime = Date.now();
    
    // Prepare results for re-ranking (take top 20 to re-rank)
    const candidateResults = results.slice(0, Math.min(20, results.length));
    
    // Build prompt for Gemini to score relevance
    const prompt = buildRerankingPrompt(query, candidateResults);
    
    // Call Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse scores from response
    const scores = parseRerankScores(text, candidateResults.length);
    
    // Combine original results with rerank scores
    const rerankedResults: RerankResult[] = candidateResults.map((result, index) => ({
      ...result,
      rerankScore: scores[index] || 0,
      originalScore: result.score,
      originalRank: index + 1,
    }));
    
    // Sort by rerank score (descending)
    rerankedResults.sort((a, b) => b.rerankScore - a.rerankScore);
    
    const latency = Date.now() - startTime;
    console.log(`[Reranker] Re-ranked ${candidateResults.length} results in ${latency}ms`);
    
    // Return top-K results
    return rerankedResults.slice(0, topK);
    
  } catch (error) {
    console.error('[Reranker] Failed to re-rank results:', error);
    // Fallback to original ranking
    return results.slice(0, topK).map((result, index) => ({
      ...result,
      rerankScore: result.score,
      originalScore: result.score,
      originalRank: index + 1,
    }));
  }
}

/**
 * Build prompt for Gemini to score query-document relevance
 */
function buildRerankingPrompt(query: string, results: SearchResult[]): string {
  const documentsText = results.map((result, index) => {
    const article = result.article;
    return `
Document ${index + 1}:
Law: ${article.lawName} (${article.lawNumber})
Article: ${article.articleNumber || 'N/A'}
Title: ${article.titleEn}
Content: ${article.contentEn.substring(0, 500)}...
Category: ${article.category}
`.trim();
  }).join('\n\n---\n\n');

  return `You are a legal relevance scoring expert. Your task is to score how relevant each legal document is to the user's query.

User Query: "${query}"

Legal Documents:
${documentsText}

Instructions:
1. Score each document from 0-100 based on relevance to the query
2. Consider:
   - Direct answer to the query (40 points)
   - Specific law/article citations (30 points)
   - Practical applicability (20 points)
   - Completeness of information (10 points)
3. Output ONLY a JSON array of scores in order: [score1, score2, score3, ...]
4. Do not include any explanation, just the JSON array

Example output format: [85, 72, 90, 45, 60, ...]

Scores:`;
}

/**
 * Parse rerank scores from Gemini response
 */
function parseRerankScores(text: string, expectedCount: number): number[] {
  try {
    // Extract JSON array from response
    const jsonMatch = text.match(/\[[\d,\s]+\]/);
    if (!jsonMatch) {
      console.warn('[Reranker] Could not parse scores from response:', text.substring(0, 200));
      return Array(expectedCount).fill(50); // Default neutral score
    }
    
    const scores = JSON.parse(jsonMatch[0]) as number[];
    
    // Validate scores
    if (!Array.isArray(scores) || scores.length !== expectedCount) {
      console.warn(`[Reranker] Expected ${expectedCount} scores, got ${scores.length}`);
      return Array(expectedCount).fill(50);
    }
    
    // Normalize scores to 0-100 range
    return scores.map(score => Math.max(0, Math.min(100, score)));
    
  } catch (error) {
    console.error('[Reranker] Failed to parse scores:', error);
    return Array(expectedCount).fill(50);
  }
}

/**
 * Re-rank with caching for repeated queries
 */
const rerankCache = new Map<string, { results: RerankResult[]; timestamp: number }>();
const RERANK_CACHE_TTL = 3600000; // 1 hour

export async function rerankResultsCached(
  query: string,
  results: SearchResult[],
  topK: number = 10
): Promise<RerankResult[]> {
  // Generate cache key
  const cacheKey = `${query}:${results.map(r => r.article.id).join(',')}:${topK}`;
  
  // Check cache
  const cached = rerankCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < RERANK_CACHE_TTL) {
    console.log('[Reranker] Cache hit for query:', query.substring(0, 50));
    return cached.results;
  }
  
  // Re-rank
  const reranked = await rerankResults(query, results, topK);
  
  // Store in cache
  rerankCache.set(cacheKey, {
    results: reranked,
    timestamp: Date.now(),
  });
  
  // Clean old cache entries (simple LRU)
  if (rerankCache.size > 500) {
    const oldestKey = rerankCache.keys().next().value;
    if (oldestKey) {
      rerankCache.delete(oldestKey);
    }
  }
  
  return reranked;
}

/**
 * Clear rerank cache
 */
export function clearRerankCache(): void {
  rerankCache.clear();
  console.log('[Reranker] Cache cleared');
}
