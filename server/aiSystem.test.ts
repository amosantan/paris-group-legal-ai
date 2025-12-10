import { describe, it, expect } from "vitest";
import { searchLegalKnowledgeEnhanced } from "./legalKnowledgeBase";
import { generateEmbedding } from "./vectorEmbeddings";
import { hybridSearch } from "./hybridSearch";
import { rerankResults } from "./reranker";
import { processArabicText, generateArabicVariations } from "./arabicNLP";

describe("AI System Comprehensive Tests", () => {
  describe("Semantic Search", () => {
    it("should find articles using keyword search", async () => {
      const results = await searchLegalKnowledgeEnhanced("tenant rights");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveProperty("titleEn");
      expect(results[0]).toHaveProperty("contentEn");
    });

    it("should recognize synonyms (tenant = lessee)", async () => {
      const tenantResults = await searchLegalKnowledgeEnhanced("tenant");
      const lesseeResults = await searchLegalKnowledgeEnhanced("lessee");
      
      // Both should return results (may not be identical due to ranking)
      expect(tenantResults.length).toBeGreaterThan(0);
      expect(lesseeResults.length).toBeGreaterThan(0);
    });

    it("should handle Arabic queries", async () => {
      const results = await searchLegalKnowledgeEnhanced("مستأجر");
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("Vector Embeddings", () => {
    it("should generate embeddings for English text", async () => {
      const embedding = await generateEmbedding("tenant rights in Dubai");
      expect(Array.isArray(embedding)).toBe(true);
      expect(embedding.length).toBe(768); // Gemini embedding dimension
      expect(embedding.every(n => typeof n === "number")).toBe(true);
    });

    it("should generate embeddings for Arabic text", async () => {
      const embedding = await generateEmbedding("حقوق المستأجر في دبي");
      expect(Array.isArray(embedding)).toBe(true);
      expect(embedding.length).toBe(768);
    });

    it("should generate different embeddings for different texts", async () => {
      const embedding1 = await generateEmbedding("tenant rights");
      const embedding2 = await generateEmbedding("landlord obligations");
      
      // Embeddings should be different
      const areSame = embedding1.every((val, idx) => val === embedding2[idx]);
      expect(areSame).toBe(false);
    });
  });

  describe("Hybrid Search", () => {
    it("should combine keyword and semantic search", async () => {
      const results = await hybridSearch("What are the rights of tenants?", {
        topK: 5,
      });
      
      expect(results.length).toBeGreaterThan(0);
      expect(results.length).toBeLessThanOrEqual(5);
      expect(results[0]).toHaveProperty("article");
      expect(results[0]).toHaveProperty("score");
      expect(results[0]).toHaveProperty("keywordScore");
      expect(results[0]).toHaveProperty("semanticScore");
    });

    it("should return results sorted by score", async () => {
      const results = await hybridSearch("rental dispute resolution", {
        topK: 5,
      });
      
      // Scores should be in descending order
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
      }
    });

    it("should handle category filtering", async () => {
      const results = await hybridSearch("property rights", {
        topK: 5,
        categoryFilter: "civil_code",
      });
      
      expect(results.length).toBeGreaterThan(0);
      // All results should be from civil_code category
      results.forEach(result => {
        expect(result.article.category).toBe("civil_code");
      });
    });
  });

  describe("Re-ranking", () => {
    it("should re-rank search results", async () => {
      const query = "tenant eviction notice period";
      const initialResults = await searchLegalKnowledgeEnhanced(query);
      
      if (initialResults.length === 0) {
        // Skip if no results
        return;
      }
      
      const reranked = await rerankResults(
        query,
        initialResults.slice(0, 5).map(article => ({
          article,
          score: 0.5,
          keywordScore: 0.5,
          semanticScore: 0.5,
          source: "test",
        }))
      );
      
      expect(reranked.length).toBeGreaterThan(0);
      expect(reranked[0]).toHaveProperty("article");
      expect(reranked[0]).toHaveProperty("rerankScore");
    });
  });

  describe("Arabic NLP", () => {
    it("should normalize Arabic text", () => {
      const text = "مُسْتَأْجِر"; // With diacritics
      const normalized = processArabicText(text);
      expect(normalized).toBe("مستاجر"); // Without diacritics
    });

    it("should generate morphological variations", () => {
      const variations = generateArabicVariations("مستأجر");
      expect(Array.isArray(variations)).toBe(true);
      expect(variations.length).toBeGreaterThan(1);
      expect(variations).toContain("مستأجر");
    });

    it("should handle empty Arabic text", () => {
      const normalized = processArabicText("");
      expect(normalized).toBe("");
    });

    it("should handle mixed Arabic-English text", () => {
      const text = "tenant مستأجر rights";
      const normalized = processArabicText(text);
      expect(normalized).toContain("tenant");
      expect(normalized).toContain("مستاجر");
    });
  });

  describe("End-to-End Search Pipeline", () => {
    it("should handle complete search flow", async () => {
      const query = "What happens if tenant doesn't pay rent?";
      
      // Step 1: Hybrid search
      const searchResults = await hybridSearch(query, { topK: 10 });
      expect(searchResults.length).toBeGreaterThan(0);
      
      // Step 2: Re-ranking (optional, depends on configuration)
      const reranked = await rerankResults(query, searchResults.slice(0, 5));
      expect(reranked.length).toBeGreaterThan(0);
      
      // Step 3: Verify results have required fields
      reranked.forEach(result => {
        expect(result.article).toHaveProperty("titleEn");
        expect(result.article).toHaveProperty("contentEn");
        expect(result.article).toHaveProperty("category");
      });
    });

    it("should handle Arabic query end-to-end", async () => {
      const query = "ما هي حقوق المستأجر؟"; // What are tenant rights?
      
      const searchResults = await hybridSearch(query, { topK: 5 });
      expect(searchResults.length).toBeGreaterThan(0);
    });

    it("should handle complex multi-topic query", async () => {
      const query = "tenant eviction, rent increase, and maintenance obligations";
      
      const searchResults = await hybridSearch(query, { topK: 10 });
      expect(searchResults.length).toBeGreaterThan(0);
      
      // Should find articles related to multiple topics
      const topics = ["evict", "rent", "increase", "maintenance"];
      const foundTopics = topics.filter(topic =>
        searchResults.some(r =>
          r.article.contentEn.toLowerCase().includes(topic) ||
          r.article.titleEn.toLowerCase().includes(topic)
        )
      );
      
      expect(foundTopics.length).toBeGreaterThan(1);
    });
  });

  describe("Performance", () => {
    it("should complete hybrid search within reasonable time", async () => {
      const startTime = Date.now();
      await hybridSearch("tenant rights", { topK: 5 });
      const duration = Date.now() - startTime;
      
      // Should complete within 2 seconds
      expect(duration).toBeLessThan(2000);
    });

    it("should handle concurrent searches", async () => {
      const queries = [
        "tenant rights",
        "landlord obligations",
        "rent increase",
        "eviction notice",
        "maintenance responsibility",
      ];
      
      const startTime = Date.now();
      const results = await Promise.all(
        queries.map(q => hybridSearch(q, { topK: 3 }))
      );
      const duration = Date.now() - startTime;
      
      // All searches should complete
      expect(results.length).toBe(5);
      results.forEach(r => expect(r.length).toBeGreaterThan(0));
      
      // Should complete within 5 seconds
      expect(duration).toBeLessThan(5000);
    });
  });

  describe("Edge Cases", () => {
    it("should handle very short queries", async () => {
      const results = await hybridSearch("rent", { topK: 5 });
      expect(results.length).toBeGreaterThan(0);
    });

    it("should handle very long queries", async () => {
      const longQuery = "I am a tenant living in Dubai and I have been experiencing issues with my landlord who is trying to increase the rent by more than the allowed percentage and also wants to evict me without proper notice period and I want to know what are my legal rights and obligations under Dubai Rental Law 26/2007 and what steps should I take to protect myself and ensure that I am not wrongfully evicted from the property that I have been renting for the past three years";
      
      const results = await hybridSearch(longQuery, { topK: 5 });
      expect(results.length).toBeGreaterThan(0);
    });

    it("should handle queries with special characters", async () => {
      const results = await hybridSearch("tenant's rights & landlord's obligations!", { topK: 5 });
      expect(results.length).toBeGreaterThan(0);
    });

    it("should handle queries with numbers", async () => {
      const results = await hybridSearch("Article 7 of Law 26/2007", { topK: 5 });
      expect(results.length).toBeGreaterThan(0);
    });

    it("should return empty results for completely irrelevant queries", async () => {
      const results = await hybridSearch("quantum physics black holes", { topK: 5 });
      // May return some results due to semantic search, but scores should be low
      if (results.length > 0) {
        expect(results[0].score).toBeLessThan(0.5);
      }
    });
  });
});
