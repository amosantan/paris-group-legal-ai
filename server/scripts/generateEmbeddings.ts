/**
 * Generate Embeddings Script
 * 
 * Generates vector embeddings for all 740 legal articles and stores them in MySQL database.
 * This is a one-time operation that enables semantic search.
 * 
 * Usage:
 *   pnpm tsx server/scripts/generateEmbeddings.ts
 * 
 * Estimated time: 5-10 minutes for 740 articles
 * Estimated cost: ~$0.02 (740 articles × 500 tokens avg × $0.02/1M tokens)
 */

import { getAllLegalKnowledge } from "../db";
import {
  batchGenerateEmbeddings,
  prepareTextForEmbedding,
  getEmbeddingStats,
} from "../vectorEmbeddings";
import {
  batchStoreEmbeddings,
  getEmbeddingStats as getVectorDbStats,
} from "../vectorDatabase";

/**
 * Main function
 */
async function main() {
  console.log("\n==============================================");
  console.log("  Generate Embeddings for Legal Knowledge");
  console.log("==============================================\n");

  try {
    // Step 1: Load all articles from database
    console.log("[Step 1/4] Loading legal articles from database...");
    
    const dbArticles = await getAllLegalKnowledge();
    console.log(`✅ Loaded ${dbArticles.length} articles from database\n`);

    if (dbArticles.length === 0) {
      console.log("⚠️  No articles found in database. Please add articles first.\n");
      return;
    }

    // Step 2: Prepare texts for embedding
    console.log("[Step 2/4] Preparing texts for embedding...");
    const textsToEmbed = dbArticles.map(article =>
      prepareTextForEmbedding(
        article.titleEn,
        article.contentEn,
        {
          lawName: article.lawName,
          lawNumber: article.lawNumber,
          articleNumber: article.articleNumber || undefined,
          category: article.category,
        }
      )
    );
    console.log(`✅ Prepared ${textsToEmbed.length} texts\n`);

    // Step 3: Generate embeddings (batch processing)
    console.log("[Step 3/4] Generating embeddings...");
    console.log("This may take 5-10 minutes. Please wait...\n");

    const startTime = Date.now();
    const embeddings = await batchGenerateEmbeddings(textsToEmbed, false); // Don't use cache for initial generation
    const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);

    console.log(`\n✅ Generated ${embeddings.length} embeddings in ${duration} minutes`);

    // Print embedding statistics
    const embeddingStats = getEmbeddingStats();
    console.log(`\n📊 Embedding Statistics:`);
    console.log(`   - Total embeddings: ${embeddingStats.totalEmbeddingsGenerated}`);
    console.log(`   - Total tokens: ${embeddingStats.totalTokensProcessed.toLocaleString()}`);
    console.log(`   - Avg tokens/embedding: ${embeddingStats.averageTokensPerEmbedding}`);
    console.log(`   - Estimated cost: $${embeddingStats.estimatedCost}`);
    console.log(`   - Cache size: ${embeddingStats.cacheSize}\n`);

    // Step 4: Store embeddings in database
    console.log("[Step 4/4] Storing embeddings in database...");
    console.log("This may take 2-3 minutes. Please wait...\n");

    // Prepare embeddings for batch storage
    const embeddingsToStore = dbArticles.map((article, index) => ({
      articleId: article.id,
      embedding: embeddings[index],
    }));

    // Batch store in chunks of 100
    const batchSize = 100;
    for (let i = 0; i < embeddingsToStore.length; i += batchSize) {
      const batch = embeddingsToStore.slice(i, i + batchSize);
      await batchStoreEmbeddings(batch);
      console.log(`   Progress: ${Math.min(i + batchSize, embeddingsToStore.length)}/${embeddingsToStore.length} embeddings stored`);
    }

    console.log(`\n✅ All embeddings stored in database\n`);

    // Print vector database statistics
    const dbStats = await getVectorDbStats();
    console.log(`📊 Vector Database Statistics:`);
    console.log(`   - Total articles: ${dbStats.totalArticles}`);
    console.log(`   - With embeddings: ${dbStats.articlesWithEmbeddings}`);
    console.log(`   - Without embeddings: ${dbStats.articlesWithoutEmbeddings}`);
    console.log(`   - Coverage: ${dbStats.coveragePercentage.toFixed(1)}%\n`);

    // Success summary
    console.log("==============================================");
    console.log("✅ SUCCESS! Embedding generation complete");
    console.log("==============================================\n");
    console.log(`📈 Summary:`);
    console.log(`   - Articles processed: ${dbArticles.length}`);
    console.log(`   - Embeddings generated: ${embeddings.length}`);
    console.log(`   - Embeddings stored: ${dbStats.articlesWithEmbeddings}`);
    console.log(`   - Total time: ${duration} minutes`);
    console.log(`   - Total cost: $${embeddingStats.estimatedCost}`);
    console.log(`\n🎯 Next Steps:`);
    console.log(`   1. Test semantic search with sample queries`);
    console.log(`   2. Implement hybrid search (BM25 + vectors)`);
    console.log(`   3. Integrate into consultation chat\n`);

  } catch (error) {
    console.error("\n❌ ERROR: Embedding generation failed\n");
    console.error(error);
    process.exit(1);
  }
}

// Run main function
main().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
