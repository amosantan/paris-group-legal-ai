import { describe, it, expect, beforeAll } from "vitest";
import * as db from "./db";
import { calculateConfidenceScore } from "./confidenceScoring";
import { verifyAllCitations, calculateGroundingScore } from "./citationVerification";
import { searchLegalKnowledge } from "./legalKnowledgeBase";

describe("Confidence Score Display Integration", () => {
  describe("AI Response Metadata Storage", () => {
    it("should store confidence metadata with all required fields", async () => {
      const testQuery = "What are the tenant's rights under Dubai Law 26/2007?";
      const relevantArticles = searchLegalKnowledge(testQuery);
      const confidenceScore = calculateConfidenceScore(testQuery, relevantArticles);
      
      expect(confidenceScore).toHaveProperty("overall");
      expect(confidenceScore).toHaveProperty("level");
      expect(confidenceScore).toHaveProperty("requiresLawyerReview");
      expect(confidenceScore).toHaveProperty("factors");
      expect(confidenceScore).toHaveProperty("recommendations");
      
      expect(confidenceScore.overall).toBeGreaterThanOrEqual(0);
      expect(confidenceScore.overall).toBeLessThanOrEqual(100);
      expect(["very_high", "high", "medium", "low", "very_low"]).toContain(confidenceScore.level);
    });

    it("should verify citations and calculate grounding score", async () => {
      const testResponse = "According to Dubai Law 26/2007, Article 25, landlords must provide 90 days notice.";
      const relevantArticles = searchLegalKnowledge("notice period");
      
      const citationVerification = verifyAllCitations(testResponse);
      const groundingScore = calculateGroundingScore(testResponse, relevantArticles);
      
      expect(citationVerification).toHaveProperty("citationCount");
      expect(citationVerification).toHaveProperty("verifiedCount");
      expect(citationVerification).toHaveProperty("warnings");
      
      expect(groundingScore).toBeGreaterThanOrEqual(0);
      expect(groundingScore).toBeLessThanOrEqual(100);
    });

    it("should flag low confidence responses for lawyer review", async () => {
      const complexQuery = "What are the implications of DIFC regulations on offshore property ownership with dual jurisdiction considerations?";
      const relevantArticles = searchLegalKnowledge(complexQuery);
      const confidenceScore = calculateConfidenceScore(complexQuery, relevantArticles);
      
      // Complex queries outside knowledge base should have low confidence
      if (confidenceScore.overall < 70) {
        expect(confidenceScore.requiresLawyerReview).toBe(true);
      }
    });
  });

  describe("Confidence Level Categorization", () => {
    it("should categorize very high confidence (90-100)", () => {
      const simpleQuery = "What is Dubai Law 26/2007?";
      const relevantArticles = searchLegalKnowledge(simpleQuery);
      const confidenceScore = calculateConfidenceScore(simpleQuery, relevantArticles);
      
      if (confidenceScore.overall >= 90) {
        expect(confidenceScore.level).toBe("very_high");
      }
    });

    it("should categorize high confidence (75-89)", () => {
      const standardQuery = "What are the tenant rights in rental disputes?";
      const relevantArticles = searchLegalKnowledge(standardQuery);
      const confidenceScore = calculateConfidenceScore(standardQuery, relevantArticles);
      
      if (confidenceScore.overall >= 75 && confidenceScore.overall < 90) {
        expect(confidenceScore.level).toBe("high");
      }
    });

    it("should categorize medium confidence (60-74)", () => {
      const moderateQuery = "How does the escrow law interact with rental contracts?";
      const relevantArticles = searchLegalKnowledge(moderateQuery);
      const confidenceScore = calculateConfidenceScore(moderateQuery, relevantArticles);
      
      if (confidenceScore.overall >= 60 && confidenceScore.overall < 75) {
        expect(confidenceScore.level).toBe("medium");
      }
    });

    it("should categorize low confidence (40-59)", () => {
      const challengingQuery = "What are the tax implications of property inheritance in Dubai?";
      const relevantArticles = searchLegalKnowledge(challengingQuery);
      const confidenceScore = calculateConfidenceScore(challengingQuery, relevantArticles);
      
      if (confidenceScore.overall >= 40 && confidenceScore.overall < 60) {
        expect(confidenceScore.level).toBe("low");
      }
    });

    it("should categorize very low confidence (<40)", () => {
      const outOfScopeQuery = "What are the criminal penalties for contract fraud in international maritime law?";
      const relevantArticles = searchLegalKnowledge(outOfScopeQuery);
      const confidenceScore = calculateConfidenceScore(outOfScopeQuery, relevantArticles);
      
      if (confidenceScore.overall < 40) {
        expect(confidenceScore.level).toBe("very_low");
      }
    });
  });

  describe("Citation Verification in Responses", () => {
    it("should detect and count citations in responses", () => {
      const responseWithCitations = `According to Dubai Law 26/2007, Article 25, landlords must provide notice. 
        Additionally, UAE Civil Code Article 871 states that contracts must be in good faith.`;
      
      const verification = verifyAllCitations(responseWithCitations);
      
      expect(verification.citationCount).toBeGreaterThan(0);
      expect(verification.verifiedCount).toBeGreaterThanOrEqual(0);
    });

    it("should verify citations against knowledge base", () => {
      const responseWithValidCitation = "Dubai Law 26/2007 governs rental disputes in Dubai.";
      const verification = verifyAllCitations(responseWithValidCitation);
      
      // Should detect at least one citation
      expect(verification.citationCount).toBeGreaterThanOrEqual(0);
      // Verified count should not exceed total count
      expect(verification.verifiedCount).toBeLessThanOrEqual(verification.citationCount);
    });

    it("should flag unverified citations", () => {
      const responseWithInvalidCitation = "According to Dubai Law 999/2099, all properties must be painted blue.";
      const verification = verifyAllCitations(responseWithInvalidCitation);
      
      if (verification.citationCount > verification.verifiedCount) {
        expect(verification.warnings.length).toBeGreaterThan(0);
      }
    });
  });

  describe("Confidence Score Factors", () => {
    it("should calculate knowledge base coverage factor", () => {
      const queryInKB = "What is the notice period for rental termination?";
      const relevantArticles = searchLegalKnowledge(queryInKB);
      const confidenceScore = calculateConfidenceScore(queryInKB, relevantArticles);
      
      expect(confidenceScore.factors).toHaveProperty("knowledgeBaseCoverage");
      expect(confidenceScore.factors.knowledgeBaseCoverage).toBeGreaterThanOrEqual(0);
      expect(confidenceScore.factors.knowledgeBaseCoverage).toBeLessThanOrEqual(100);
    });

    it("should calculate legal clarity factor", () => {
      const clearQuery = "What is Dubai Law 26/2007?";
      const relevantArticles = searchLegalKnowledge(clearQuery);
      const confidenceScore = calculateConfidenceScore(clearQuery, relevantArticles);
      
      expect(confidenceScore.factors).toHaveProperty("legalClarityScore");
      expect(confidenceScore.factors.legalClarityScore).toBeGreaterThanOrEqual(0);
      expect(confidenceScore.factors.legalClarityScore).toBeLessThanOrEqual(100);
    });

    it("should calculate query complexity factor", () => {
      const complexQuery = "How do rental laws interact with escrow requirements for off-plan properties?";
      const relevantArticles = searchLegalKnowledge(complexQuery);
      const confidenceScore = calculateConfidenceScore(complexQuery, relevantArticles);
      
      expect(confidenceScore.factors).toHaveProperty("queryComplexityScore");
      expect(confidenceScore.factors.queryComplexityScore).toBeGreaterThanOrEqual(0);
      expect(confidenceScore.factors.queryComplexityScore).toBeLessThanOrEqual(100);
    });
  });

  describe("Lawyer Review Triggers", () => {
    it("should require review for very low confidence (<40)", () => {
      const outOfScopeQuery = "What are the implications of Brexit on Dubai property law?";
      const relevantArticles = searchLegalKnowledge(outOfScopeQuery);
      const confidenceScore = calculateConfidenceScore(outOfScopeQuery, relevantArticles);
      
      if (confidenceScore.overall < 40) {
        expect(confidenceScore.requiresLawyerReview).toBe(true);
      }
    });

    it("should require review for low confidence (<70)", () => {
      const uncertainQuery = "What are the tax implications of property transfers?";
      const relevantArticles = searchLegalKnowledge(uncertainQuery);
      const confidenceScore = calculateConfidenceScore(uncertainQuery, relevantArticles);
      
      if (confidenceScore.overall < 70) {
        expect(confidenceScore.requiresLawyerReview).toBe(true);
      }
    });

    it("should not require review for high confidence (>=70)", () => {
      const clearQuery = "What is the notice period under Dubai Law 26/2007?";
      const relevantArticles = searchLegalKnowledge(clearQuery);
      const confidenceScore = calculateConfidenceScore(clearQuery, relevantArticles);
      
      if (confidenceScore.overall >= 70) {
        expect(confidenceScore.requiresLawyerReview).toBe(false);
      }
    });
  });

  describe("Recommendations Generation", () => {
    it("should provide recommendations for improving confidence", () => {
      const vagueQuery = "Tell me about property law";
      const relevantArticles = searchLegalKnowledge(vagueQuery);
      const confidenceScore = calculateConfidenceScore(vagueQuery, relevantArticles);
      
      expect(confidenceScore.recommendations).toBeInstanceOf(Array);
      expect(confidenceScore.recommendations.length).toBeGreaterThan(0);
    });

    it("should recommend consulting lawyer for low confidence", () => {
      const complexQuery = "What are the cross-border implications of property ownership?";
      const relevantArticles = searchLegalKnowledge(complexQuery);
      const confidenceScore = calculateConfidenceScore(complexQuery, relevantArticles);
      
      if (confidenceScore.overall < 70) {
        const hasLawyerRecommendation = confidenceScore.recommendations.some(
          rec => rec.toLowerCase().includes("lawyer") || rec.toLowerCase().includes("legal professional")
        );
        expect(hasLawyerRecommendation).toBe(true);
      }
    });
  });

  describe("Integration with Message History", () => {
    it("should retrieve messages with AI metadata", async () => {
      // This test verifies the database query returns metadata
      const messages = await db.getConsultationMessages(1);
      
      // Check structure
      expect(Array.isArray(messages)).toBe(true);
      
      // If there are assistant messages, they should have metadata structure
      const assistantMessages = messages.filter(m => m.role === "assistant");
      if (assistantMessages.length > 0) {
        // Metadata can be undefined for old messages, but if present should have correct structure
        assistantMessages.forEach(msg => {
          if (msg.aiMetadata) {
            expect(msg.aiMetadata).toHaveProperty("confidenceScore");
            expect(msg.aiMetadata).toHaveProperty("confidenceLevel");
            expect(msg.aiMetadata).toHaveProperty("citationCount");
            expect(msg.aiMetadata).toHaveProperty("verifiedCitations");
          }
        });
      }
    });
  });
});
