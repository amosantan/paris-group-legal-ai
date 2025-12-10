import { describe, it, expect } from "vitest";
import { searchLegalKnowledgeEnhanced, searchLegalKnowledge } from "./legalKnowledgeBase";

describe("PDF Ingestion & Knowledge Base Integration", () => {
  it("should search hardcoded knowledge base successfully", () => {
    const results = searchLegalKnowledge("rental");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty("lawName");
    expect(results[0]).toHaveProperty("contentEn");
  });

  it("should return relevant articles for rental queries", () => {
    const results = searchLegalKnowledge("rental");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.category === "rental_law")).toBe(true);
  });

  it("should return relevant articles for mortgage queries", () => {
    const results = searchLegalKnowledge("mortgage");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.lawName.includes("Mortgage"))).toBe(true);
  });

  it("enhanced search should include hardcoded articles", async () => {
    const results = await searchLegalKnowledgeEnhanced("rental");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty("lawName");
    expect(results[0]).toHaveProperty("contentEn");
  });

  it("enhanced search should work with empty database", async () => {
    // Even with no PDF chunks in database, should return hardcoded articles
    const results = await searchLegalKnowledgeEnhanced("tenant rights");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should handle queries with no results gracefully", () => {
    const results = searchLegalKnowledge("xyz123nonexistent");
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
  });

  it("enhanced search should handle queries with no results", async () => {
    const results = await searchLegalKnowledgeEnhanced("xyz123nonexistent");
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
  });

  it("should search by law number", () => {
    const results = searchLegalKnowledge("26/2007");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.lawNumber === "26/2007")).toBe(true);
  });

  it("should search by article content", () => {
    const results = searchLegalKnowledge("security deposit");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.contentEn.toLowerCase().includes("security deposit"))).toBe(true);
  });

  it("enhanced search should combine results from both sources", async () => {
    const hardcodedResults = searchLegalKnowledge("rental");
    const enhancedResults = await searchLegalKnowledgeEnhanced("rental");
    
    // Enhanced should have at least as many results as hardcoded
    expect(enhancedResults.length).toBeGreaterThanOrEqual(hardcodedResults.length);
  });
});
