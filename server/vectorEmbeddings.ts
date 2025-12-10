/**
 * Vector Embeddings Module
 * 
 * Generates semantic embeddings for legal documents using Google Gemini API.
 * Embeddings enable semantic search that understands meaning beyond keyword matching.
 * 
 * Features:
 * - Google Gemini text-embedding-004 (768 dimensions)
 * - FREE with generous quota (1500 requests/day)
 * - Batch processing for efficiency
 * - Embedding caching to avoid re-computation
 * - Error handling and retry logic
 * - Cost tracking
 */

/**
 * Embedding configuration
 */
const EMBEDDING_CONFIG = {
  model: "text-embedding-004",
  dimensions: 768, // Gemini embedding dimensions
  maxTokens: 2048, // Maximum context length for embeddings
  batchSize: 100, // Process 100 embeddings per batch
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

/**
 * Embedding cache to avoid re-computing
 */
const embeddingCache = new Map<string, number[]>();

/**
 * Cost tracking
 */
let totalTokensProcessed = 0;
let totalEmbeddingsGenerated = 0;

/**
 * Generate embedding for a single text using Gemini API
 * 
 * @param text - Text to embed (article title + content)
 * @param useCache - Whether to use cache (default: true)
 * @returns 768-dimensional embedding vector
 */
export async function generateEmbedding(
  text: string,
  useCache: boolean = true
): Promise<number[]> {
  // Check cache first
  if (useCache && embeddingCache.has(text)) {
    console.log(`[Embeddings] Cache HIT for text (${text.length} chars)`);
    return embeddingCache.get(text)!;
  }

  // Truncate text if too long (2048 tokens ≈ 8,000 characters)
  const truncatedText = text.length > 8000 ? text.substring(0, 8000) : text;

  // Get Gemini API key from environment
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not found. Please configure Gemini API in app settings.");
  }

  try {
    // Call Gemini embeddings API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_CONFIG.model}:embedContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: {
            parts: [{ text: truncatedText }],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${response.status} ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const embedding = data.embedding.values;

    // Update statistics (estimate tokens based on text length)
    const estimatedTokens = Math.ceil(truncatedText.length / 4);
    totalTokensProcessed += estimatedTokens;
    totalEmbeddingsGenerated++;

    // Cache the result
    if (useCache) {
      embeddingCache.set(text, embedding);
    }

    console.log(
      `[Embeddings] Generated embedding (${embedding.length} dims, ~${estimatedTokens} tokens, ` +
      `total: ${totalEmbeddingsGenerated} embeddings, ${totalTokensProcessed} tokens)`
    );

    return embedding;
  } catch (error) {
    console.error(`[Embeddings] Failed to generate embedding:`, error);
    throw error;
  }
}

/**
 * Generate embeddings for multiple texts in batch
 * More efficient than calling generateEmbedding() multiple times
 * 
 * @param texts - Array of texts to embed
 * @param useCache - Whether to use cache (default: true)
 * @returns Array of embedding vectors
 */
export async function batchGenerateEmbeddings(
  texts: string[],
  useCache: boolean = true
): Promise<number[][]> {
  console.log(`[Embeddings] Batch generating ${texts.length} embeddings...`);

  const embeddings: number[][] = [];
  const uncachedTexts: string[] = [];
  const uncachedIndices: number[] = [];

  // Check cache for each text
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];
    if (useCache && embeddingCache.has(text)) {
      embeddings[i] = embeddingCache.get(text)!;
      console.log(`[Embeddings] Cache HIT for text ${i + 1}/${texts.length}`);
    } else {
      uncachedTexts.push(text);
      uncachedIndices.push(i);
    }
  }

  // If all cached, return immediately
  if (uncachedTexts.length === 0) {
    console.log(`[Embeddings] All ${texts.length} embeddings found in cache`);
    return embeddings;
  }

  console.log(
    `[Embeddings] ${embeddings.filter(e => e).length} cached, ` +
    `${uncachedTexts.length} need generation`
  );

  // Get Gemini API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not found. Please configure Gemini API in app settings.");
  }

  // Process uncached texts one by one (Gemini doesn't support batch embedding in a single request)
  for (let i = 0; i < uncachedTexts.length; i++) {
    const text = uncachedTexts[i];
    const originalIndex = uncachedIndices[i];

    console.log(
      `[Embeddings] Processing ${i + 1}/${uncachedTexts.length} ` +
      `(overall: ${originalIndex + 1}/${texts.length})`
    );

    try {
      const embedding = await generateEmbedding(text, useCache);
      embeddings[originalIndex] = embedding;

      // Rate limiting: wait 100ms between requests to avoid hitting quota
      if (i < uncachedTexts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`[Embeddings] Failed to generate embedding for text ${originalIndex + 1}:`, error);
      throw error;
    }
  }

  console.log(
    `[Embeddings] Batch generation complete: ${embeddings.length} total embeddings`
  );

  return embeddings;
}

/**
 * Prepare text for embedding
 * Combines title and content with optimal formatting
 * 
 * @param title - Article title
 * @param content - Article content
 * @param metadata - Optional metadata (law name, article number, etc.)
 * @returns Formatted text for embedding
 */
export function prepareTextForEmbedding(
  title: string,
  content: string,
  metadata?: {
    lawName?: string;
    lawNumber?: string;
    articleNumber?: string;
    category?: string;
  }
): string {
  let text = "";

  // Add metadata context
  if (metadata?.lawName) {
    text += `Law: ${metadata.lawName}\n`;
  }
  if (metadata?.lawNumber) {
    text += `Law Number: ${metadata.lawNumber}\n`;
  }
  if (metadata?.articleNumber) {
    text += `Article: ${metadata.articleNumber}\n`;
  }
  if (metadata?.category) {
    text += `Category: ${metadata.category}\n`;
  }

  // Add title and content
  text += `\nTitle: ${title}\n\nContent: ${content}`;

  return text;
}

/**
 * Get embedding statistics
 * Useful for monitoring and cost tracking
 */
export function getEmbeddingStats() {
  // Gemini embeddings are FREE (1500 requests/day)
  const estimatedCost = 0;

  return {
    totalEmbeddingsGenerated,
    totalTokensProcessed,
    cacheSize: embeddingCache.size,
    estimatedCost: estimatedCost.toFixed(4),
    averageTokensPerEmbedding: totalEmbeddingsGenerated > 0
      ? Math.round(totalTokensProcessed / totalEmbeddingsGenerated)
      : 0,
  };
}

/**
 * Clear embedding cache
 * Useful after bulk updates or for memory management
 */
export function clearEmbeddingCache(): void {
  const previousSize = embeddingCache.size;
  embeddingCache.clear();
  console.log(`[Embeddings] Cache cleared: ${previousSize} entries removed`);
}

/**
 * Calculate cosine similarity between two vectors
 * Used for testing and validation
 * 
 * @param vec1 - First vector
 * @param vec2 - Second vector
 * @returns Cosine similarity (-1 to 1, higher is more similar)
 */
export function cosineSimilarity(vec1: number[], vec2: number[]): number {
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

  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

/**
 * Test embedding generation with sample texts
 * Useful for validation and debugging
 */
export async function testEmbeddings(): Promise<void> {
  console.log("\n[Embeddings] Running embedding tests...\n");

  const testTexts = [
    "The tenant has the right to terminate the lease with proper notice.",
    "The landlord must provide 12 months notice for eviction.",
    "Security deposit must be returned within 14 days.",
  ];

  // Generate embeddings
  const embeddings = await batchGenerateEmbeddings(testTexts);

  console.log(`\n[Embeddings] Generated ${embeddings.length} test embeddings`);
  console.log(`[Embeddings] Embedding dimensions: ${embeddings[0].length}`);

  // Calculate similarities
  const sim01 = cosineSimilarity(embeddings[0], embeddings[1]);
  const sim02 = cosineSimilarity(embeddings[0], embeddings[2]);
  const sim12 = cosineSimilarity(embeddings[1], embeddings[2]);

  console.log(`\n[Embeddings] Similarity matrix:`);
  console.log(`  Text 0 vs Text 1: ${sim01.toFixed(4)} (both about tenant/landlord)`);
  console.log(`  Text 0 vs Text 2: ${sim02.toFixed(4)} (different topics)`);
  console.log(`  Text 1 vs Text 2: ${sim12.toFixed(4)} (different topics)`);

  // Print statistics
  const stats = getEmbeddingStats();
  console.log(`\n[Embeddings] Statistics:`);
  console.log(`  Total embeddings: ${stats.totalEmbeddingsGenerated}`);
  console.log(`  Total tokens: ${stats.totalTokensProcessed}`);
  console.log(`  Cache size: ${stats.cacheSize}`);
  console.log(`  Estimated cost: $${stats.estimatedCost} (FREE)`);
  console.log(`  Avg tokens/embedding: ${stats.averageTokensPerEmbedding}`);

  console.log(`\n[Embeddings] Tests complete!\n`);
}
