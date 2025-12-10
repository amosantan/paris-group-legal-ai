/**
 * Vector Embeddings Tests
 * 
 * Tests Gemini API integration for generating embeddings
 */

import { describe, it, expect } from "vitest";
import { generateEmbedding, batchGenerateEmbeddings, cosineSimilarity } from "./vectorEmbeddings";

describe("Vector Embeddings", () => {
  it("should generate embedding for a single text", async () => {
    const text = "The tenant has the right to terminate the lease with proper notice.";
    const embedding = await generateEmbedding(text, false); // Don't use cache for test

    expect(embedding).toBeDefined();
    expect(Array.isArray(embedding)).toBe(true);
    expect(embedding.length).toBe(768); // Gemini embeddings are 768-dimensional
    expect(embedding[0]).toBeTypeOf("number");
  }, 30000); // 30 second timeout

  it("should generate embeddings in batch", async () => {
    const texts = [
      "The landlord must provide 12 months notice for eviction.",
      "Security deposit must be returned within 14 days.",
    ];

    const embeddings = await batchGenerateEmbeddings(texts, false); // Don't use cache

    expect(embeddings).toBeDefined();
    expect(embeddings.length).toBe(2);
    expect(embeddings[0].length).toBe(768);
    expect(embeddings[1].length).toBe(768);
  }, 60000); // 60 second timeout for batch

  it("should calculate cosine similarity correctly", () => {
    const vec1 = [1, 0, 0];
    const vec2 = [1, 0, 0];
    const vec3 = [0, 1, 0];

    const sim12 = cosineSimilarity(vec1, vec2);
    const sim13 = cosineSimilarity(vec1, vec3);

    expect(sim12).toBeCloseTo(1.0, 5); // Identical vectors
    expect(sim13).toBeCloseTo(0.0, 5); // Orthogonal vectors
  });

  it("should validate Gemini API key is configured", () => {
    expect(process.env.GEMINI_API_KEY).toBeDefined();
    expect(process.env.GEMINI_API_KEY).not.toBe("");
  });
});
