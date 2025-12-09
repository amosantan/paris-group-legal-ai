import { describe, expect, it } from "vitest";
import {
  LEGAL_KNOWLEDGE_BASE,
  getLegalKnowledgeByCategory,
  searchLegalKnowledge,
  getLegalArticlesByLaw,
  buildLegalContext,
  getKnowledgeBaseStats,
} from "./legalKnowledgeBase";

describe("Legal Knowledge Base", () => {
  it("should have comprehensive legal articles", () => {
    expect(LEGAL_KNOWLEDGE_BASE.length).toBeGreaterThan(40);
    expect(LEGAL_KNOWLEDGE_BASE.length).toBeLessThan(100);
  });

  it("should include rental law articles", () => {
    const rentalArticles = getLegalKnowledgeByCategory("rental_law");
    expect(rentalArticles.length).toBeGreaterThan(5);
    
    const ejariArticle = rentalArticles.find(a => 
      a.keywords.includes("Ejari") || a.keywords.includes("registration")
    );
    expect(ejariArticle).toBeDefined();
  });

  it("should include UAE Civil Code articles", () => {
    const civilCodeArticles = getLegalKnowledgeByCategory("civil_code");
    expect(civilCodeArticles.length).toBeGreaterThan(3);
    
    const contractArticle = civilCodeArticles.find(a => 
      a.keywords.includes("contract")
    );
    expect(contractArticle).toBeDefined();
  });

  it("should include escrow law articles", () => {
    const escrowArticles = getLegalKnowledgeByCategory("escrow_law");
    expect(escrowArticles.length).toBeGreaterThan(2);
    
    const escrowMandateArticle = escrowArticles.find(a => 
      a.lawNumber === "8/2007"
    );
    expect(escrowMandateArticle).toBeDefined();
  });

  it("should include strata law articles", () => {
    const strataArticles = getLegalKnowledgeByCategory("strata_law");
    expect(strataArticles.length).toBeGreaterThan(2);
    
    const ownersAssocArticle = strataArticles.find(a => 
      a.keywords.includes("owners association")
    );
    expect(ownersAssocArticle).toBeDefined();
  });

  it("should include RDC procedures", () => {
    const procedures = getLegalKnowledgeByCategory("procedures");
    expect(procedures.length).toBeGreaterThan(3);
    
    const filingProcedure = procedures.find(a => 
      a.keywords.includes("case filing") || a.keywords.includes("RDC")
    );
    expect(filingProcedure).toBeDefined();
  });

  it("should search by keyword correctly", () => {
    const rentIncreaseResults = searchLegalKnowledge("rent increase");
    expect(rentIncreaseResults.length).toBeGreaterThan(0);
    
    const hasRentIncreaseContent = rentIncreaseResults.some(article =>
      article.contentEn.toLowerCase().includes("rent") &&
      article.contentEn.toLowerCase().includes("increase")
    );
    expect(hasRentIncreaseContent).toBe(true);
  });

  it("should search for eviction procedures", () => {
    const evictionResults = searchLegalKnowledge("eviction");
    expect(evictionResults.length).toBeGreaterThan(0);
    
    const hasEvictionGrounds = evictionResults.some(article =>
      article.keywords.includes("eviction") || 
      article.titleEn.toLowerCase().includes("eviction")
    );
    expect(hasEvictionGrounds).toBe(true);
  });

  it("should get articles by specific law number", () => {
    const law26Articles = getLegalArticlesByLaw("26/2007");
    expect(law26Articles.length).toBeGreaterThan(3);
    
    const law8Articles = getLegalArticlesByLaw("8/2007");
    expect(law8Articles.length).toBeGreaterThan(0);
  });

  it("should build legal context for LLM", () => {
    const context = buildLegalContext("rental_law");
    expect(context).toContain("Dubai Rental Law");
    expect(context).toContain("Article");
    expect(context.length).toBeGreaterThan(500);
  });

  it("should build full legal context", () => {
    const fullContext = buildLegalContext();
    expect(fullContext).toContain("Dubai Rental Law");
    expect(fullContext).toContain("UAE Civil Code");
    expect(fullContext).toContain("Escrow");
    expect(fullContext.length).toBeGreaterThan(2000);
  });

  it("should include practical examples in some articles", () => {
    const articlesWithExamples = LEGAL_KNOWLEDGE_BASE.filter(
      a => a.practicalExample
    );
    expect(articlesWithExamples.length).toBeGreaterThan(3);
    
    const exampleArticle = articlesWithExamples[0];
    expect(exampleArticle?.practicalExample).toBeDefined();
    expect(exampleArticle?.practicalExample?.length).toBeGreaterThan(50);
  });

  it("should include Arabic translations for key articles", () => {
    const arabicArticles = LEGAL_KNOWLEDGE_BASE.filter(
      a => a.contentAr
    );
    expect(arabicArticles.length).toBeGreaterThan(5);
  });

  it("should provide knowledge base statistics", () => {
    const stats = getKnowledgeBaseStats();
    
    expect(stats.totalArticles).toBeGreaterThan(40);
    expect(stats.byCategory.rental_law).toBeGreaterThan(5);
    expect(stats.byCategory.civil_code).toBeGreaterThan(3);
    expect(stats.byCategory.escrow_law).toBeGreaterThan(2);
    expect(stats.byCategory.strata_law).toBeGreaterThan(2);
    expect(stats.byCategory.procedures).toBeGreaterThan(3);
    expect(stats.withPracticalExamples).toBeGreaterThan(3);
    expect(stats.withArabicTranslation).toBeGreaterThan(5);
  });

  it("should search for security deposit information", () => {
    const depositResults = searchLegalKnowledge("security deposit");
    expect(depositResults.length).toBeGreaterThan(0);
    
    const hasDepositInfo = depositResults.some(article =>
      article.contentEn.toLowerCase().includes("deposit")
    );
    expect(hasDepositInfo).toBe(true);
  });

  it("should search for RERA information", () => {
    const reraResults = searchLegalKnowledge("RERA");
    expect(reraResults.length).toBeGreaterThan(2);
  });

  it("should find maintenance obligation articles", () => {
    const maintenanceResults = searchLegalKnowledge("maintenance");
    expect(maintenanceResults.length).toBeGreaterThan(0);
    
    const hasMaintenanceObligation = maintenanceResults.some(article =>
      article.keywords.includes("maintenance") ||
      article.contentEn.toLowerCase().includes("landlord") &&
      article.contentEn.toLowerCase().includes("maintenance")
    );
    expect(hasMaintenanceObligation).toBe(true);
  });

  it("should include notice period requirements", () => {
    const noticeResults = searchLegalKnowledge("notice period");
    expect(noticeResults.length).toBeGreaterThan(0);
    
    const has90DayNotice = noticeResults.some(article =>
      article.contentEn.includes("90 days")
    );
    expect(has90DayNotice).toBe(true);
  });

  it("should include practical scenario for non-payment", () => {
    const nonPaymentResults = searchLegalKnowledge("non-payment");
    expect(nonPaymentResults.length).toBeGreaterThan(0);
    
    const hasScenario = nonPaymentResults.some(article =>
      article.practicalExample && 
      article.practicalExample.toLowerCase().includes("rent")
    );
    expect(hasScenario).toBe(true);
  });

  it("should include Oqood information for off-plan properties", () => {
    const oqoodResults = searchLegalKnowledge("Oqood");
    expect(oqoodResults.length).toBeGreaterThan(0);
    
    const hasOqoodInfo = oqoodResults.some(article =>
      article.contentEn.includes("off-plan") &&
      article.contentEn.includes("4%")
    );
    expect(hasOqoodInfo).toBe(true);
  });

  it("should include property transfer fee information", () => {
    const transferResults = searchLegalKnowledge("transfer fee");
    expect(transferResults.length).toBeGreaterThan(0);
    
    const hasTransferFee = transferResults.some(article =>
      article.contentEn.includes("4%") &&
      article.contentEn.toLowerCase().includes("transfer")
    );
    expect(hasTransferFee).toBe(true);
  });

  it("should validate all articles have required fields", () => {
    LEGAL_KNOWLEDGE_BASE.forEach(article => {
      expect(article.lawName).toBeDefined();
      expect(article.lawNumber).toBeDefined();
      expect(article.titleEn).toBeDefined();
      expect(article.contentEn).toBeDefined();
      expect(article.category).toBeDefined();
      expect(article.keywords).toBeDefined();
      expect(Array.isArray(article.keywords)).toBe(true);
      expect(article.keywords.length).toBeGreaterThan(0);
    });
  });
});
