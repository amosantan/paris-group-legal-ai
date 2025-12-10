/**
 * Search Result Caching Module
 * 
 * Implements LRU (Least Recently Used) cache for legal knowledge search results.
 * Improves performance by caching frequent queries and reducing database load.
 * 
 * Features:
 * - LRU eviction policy (max 1000 entries)
 * - TTL-based expiration (1 hour)
 * - Cache hit/miss logging
 * - Query normalization for better hit rates
 */

import { LRUCache } from 'lru-cache';

/**
 * Cache configuration
 */
const CACHE_CONFIG = {
  max: 1000, // Maximum number of cached queries
  ttl: 1000 * 60 * 60, // 1 hour TTL (time to live)
  updateAgeOnGet: true, // Reset TTL on cache hit
  updateAgeOnHas: false, // Don't reset TTL on has() check
};

/**
 * Cache statistics
 */
interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}

/**
 * Cache key components
 */
interface CacheKeyComponents {
  query: string;
  language?: string;
  category?: string;
  limit?: number;
}

/**
 * LRU cache instance
 */
const searchCache = new LRUCache<string, any>(CACHE_CONFIG);

/**
 * Cache statistics tracking
 */
let cacheHits = 0;
let cacheMisses = 0;

/**
 * Generate normalized cache key from query components
 * Ensures consistent keys for similar queries
 */
export function generateCacheKey(components: CacheKeyComponents): string {
  const { query, language = 'en', category = 'all', limit = 10 } = components;
  
  // Normalize query: lowercase, trim, collapse whitespace
  const normalizedQuery = query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
  
  // Create deterministic key
  return `${normalizedQuery}|${language}|${category}|${limit}`;
}

/**
 * Get cached search results
 * Returns undefined if not found or expired
 */
export function getCachedResults(key: string): any | undefined {
  const result = searchCache.get(key);
  
  if (result !== undefined) {
    cacheHits++;
    console.log(`[SearchCache] HIT: "${key}" (hits: ${cacheHits}, misses: ${cacheMisses}, hit rate: ${getHitRate().toFixed(1)}%)`);
    return result;
  }
  
  cacheMisses++;
  console.log(`[SearchCache] MISS: "${key}" (hits: ${cacheHits}, misses: ${cacheMisses}, hit rate: ${getHitRate().toFixed(1)}%)`);
  return undefined;
}

/**
 * Store search results in cache
 */
export function setCachedResults(key: string, results: any): void {
  searchCache.set(key, results);
  console.log(`[SearchCache] SET: "${key}" (cache size: ${searchCache.size}/${CACHE_CONFIG.max})`);
}

/**
 * Check if a key exists in cache (without updating age)
 */
export function hasCachedResults(key: string): boolean {
  return searchCache.has(key);
}

/**
 * Clear specific cache entry
 */
export function clearCacheEntry(key: string): void {
  searchCache.delete(key);
  console.log(`[SearchCache] DELETED: "${key}"`);
}

/**
 * Clear entire cache
 * Useful after bulk data updates (e.g., PDF uploads)
 */
export function clearAllCache(): void {
  const previousSize = searchCache.size;
  searchCache.clear();
  cacheHits = 0;
  cacheMisses = 0;
  console.log(`[SearchCache] CLEARED ALL: ${previousSize} entries removed`);
}

/**
 * Get cache statistics
 */
export function getCacheStats(): CacheStats {
  const total = cacheHits + cacheMisses;
  const hitRate = total > 0 ? (cacheHits / total) * 100 : 0;
  
  return {
    hits: cacheHits,
    misses: cacheMisses,
    size: searchCache.size,
    hitRate,
  };
}

/**
 * Get current hit rate percentage
 */
export function getHitRate(): number {
  const total = cacheHits + cacheMisses;
  return total > 0 ? (cacheHits / total) * 100 : 0;
}

/**
 * Wrapper function for caching search operations
 * 
 * Usage:
 * ```ts
 * const results = await withCache(
 *   { query: 'tenant rights', language: 'en' },
 *   async () => await searchDatabase('tenant rights')
 * );
 * ```
 */
export async function withCache<T>(
  keyComponents: CacheKeyComponents,
  searchFn: () => Promise<T>
): Promise<T> {
  const cacheKey = generateCacheKey(keyComponents);
  
  // Check cache first
  const cached = getCachedResults(cacheKey);
  if (cached !== undefined) {
    return cached as T;
  }
  
  // Cache miss - execute search
  const results = await searchFn();
  
  // Store in cache
  setCachedResults(cacheKey, results);
  
  return results;
}

/**
 * Log cache statistics summary
 * Useful for monitoring and debugging
 */
export function logCacheStatsSummary(): void {
  const stats = getCacheStats();
  console.log('\n[SearchCache] Statistics Summary:');
  console.log(`  Total Requests: ${stats.hits + stats.misses}`);
  console.log(`  Cache Hits: ${stats.hits}`);
  console.log(`  Cache Misses: ${stats.misses}`);
  console.log(`  Hit Rate: ${stats.hitRate.toFixed(2)}%`);
  console.log(`  Cache Size: ${stats.size}/${CACHE_CONFIG.max}`);
  console.log(`  TTL: ${CACHE_CONFIG.ttl / 1000 / 60} minutes\n`);
}

/**
 * Invalidate cache entries matching a pattern
 * Useful for selective cache invalidation
 * 
 * Example: Invalidate all rental law queries after updating rental law articles
 */
export function invalidateCachePattern(pattern: string): number {
  let invalidated = 0;
  
  // Get all keys
  const keys = Array.from(searchCache.keys());
  
  // Delete matching keys
  for (const key of keys) {
    if (key.includes(pattern)) {
      searchCache.delete(key);
      invalidated++;
    }
  }
  
  console.log(`[SearchCache] INVALIDATED: ${invalidated} entries matching pattern "${pattern}"`);
  return invalidated;
}

/**
 * Warm up cache with common queries
 * Call this on server startup to pre-populate cache
 */
export async function warmUpCache(
  commonQueries: Array<{ query: string; language?: string; category?: string }>,
  searchFn: (query: string, language?: string, category?: string) => Promise<any>
): Promise<void> {
  console.log(`[SearchCache] Warming up cache with ${commonQueries.length} common queries...`);
  
  let warmed = 0;
  for (const { query, language, category } of commonQueries) {
    try {
      await withCache(
        { query, language, category },
        async () => await searchFn(query, language, category)
      );
      warmed++;
    } catch (error) {
      console.error(`[SearchCache] Failed to warm up query "${query}":`, error);
    }
  }
  
  console.log(`[SearchCache] Warm-up complete: ${warmed}/${commonQueries.length} queries cached`);
}
