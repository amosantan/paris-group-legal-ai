import { describe, it, expect } from "vitest";
import { calculateConfidenceScore } from "./confidenceScoring";
import { LegalArticle } from "./legalKnowledgeBase";

describe("Confidence Scoring - Keywords Bug Fix", () => {
  it("should handle articles with array keywords", () => {
    const query = "What are tenant rights in rental disputes?";
    const articles: LegalArticle[] = [
      {
        lawName: "Dubai Rental Law",
        lawNumber: "26/2007",
        articleNumber: "7",
        titleEn: "Tenant Rights",
        contentEn: "Tenants have the right to peaceful enjoyment of the property.",
        category: "rental_law",
        keywords: ["tenant", "rights", "rental", "dispute"],
      },
    ];

    const result = calculateConfidenceScore(query, articles);
    expect(result.overall).toBeGreaterThan(0);
    expect(result.level).toBeDefined();
  });

  it("should handle articles with JSON string keywords", () => {
    const query = "What are tenant rights in rental disputes?";
    const articles: any[] = [
      {
        lawName: "Dubai Rental Law",
        lawNumber: "26/2007",
        articleNumber: "7",
        titleEn: "Tenant Rights",
        contentEn: "Tenants have the right to peaceful enjoyment of the property.",
        category: "rental_law",
        keywords: JSON.stringify(["tenant", "rights", "rental", "dispute"]),
      },
    ];

    const result = calculateConfidenceScore(query, articles as LegalArticle[]);
    expect(result.overall).toBeGreaterThan(0);
    expect(result.level).toBeDefined();
  });

  it("should handle articles with searchKeywords field (database format)", () => {
    const query = "What are tenant rights in rental disputes?";
    const articles: any[] = [
      {
        lawName: "Dubai Rental Law",
        lawNumber: "26/2007",
        articleNumber: "7",
        titleEn: "Tenant Rights",
        contentEn: "Tenants have the right to peaceful enjoyment of the property.",
        category: "rental_law",
        searchKeywords: JSON.stringify(["tenant", "rights", "rental", "dispute"]),
      },
    ];

    const result = calculateConfidenceScore(query, articles as LegalArticle[]);
    expect(result.overall).toBeGreaterThan(0);
    expect(result.level).toBeDefined();
  });

  it("should handle articles with null/undefined keywords gracefully", () => {
    const query = "What are tenant rights in rental disputes?";
    const articles: any[] = [
      {
        lawName: "Dubai Rental Law",
        lawNumber: "26/2007",
        articleNumber: "7",
        titleEn: "Tenant Rights",
        contentEn: "Tenants have the right to peaceful enjoyment of the property.",
        category: "rental_law",
        keywords: null,
      },
    ];

    const result = calculateConfidenceScore(query, articles as LegalArticle[]);
    expect(result.overall).toBeGreaterThan(0);
    expect(result.level).toBeDefined();
  });

  it("should handle articles with invalid JSON in keywords", () => {
    const query = "What are tenant rights in rental disputes?";
    const articles: any[] = [
      {
        lawName: "Dubai Rental Law",
        lawNumber: "26/2007",
        articleNumber: "7",
        titleEn: "Tenant Rights",
        contentEn: "Tenants have the right to peaceful enjoyment of the property.",
        category: "rental_law",
        keywords: "invalid json {",
      },
    ];

    const result = calculateConfidenceScore(query, articles as LegalArticle[]);
    expect(result.overall).toBeGreaterThan(0);
    expect(result.level).toBeDefined();
  });

  it("should calculate confidence with mixed keyword formats", () => {
    const query = "What are tenant rights and landlord obligations?";
    const articles: any[] = [
      {
        lawName: "Dubai Rental Law",
        lawNumber: "26/2007",
        articleNumber: "7",
        titleEn: "Tenant Rights",
        contentEn: "Tenants have the right to peaceful enjoyment of the property.",
        category: "rental_law",
        keywords: ["tenant", "rights"],
      },
      {
        lawName: "Dubai Rental Law",
        lawNumber: "26/2007",
        articleNumber: "8",
        titleEn: "Landlord Obligations",
        contentEn: "Landlords must maintain the property in good condition.",
        category: "rental_law",
        searchKeywords: JSON.stringify(["landlord", "obligations", "maintenance"]),
      },
    ];

    const result = calculateConfidenceScore(query, articles as LegalArticle[]);
    expect(result.overall).toBeGreaterThan(0);
    expect(result.level).toBeDefined();
    expect(result.factors.relevantArticlesCount).toBe(2);
  });
});
