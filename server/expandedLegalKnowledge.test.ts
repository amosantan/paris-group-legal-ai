/**
 * Comprehensive tests for expanded UAE legal knowledge
 * Tests mortgage law, property registration, and DIFC regulations
 */

import { describe, it, expect } from "vitest";
import { LEGAL_KNOWLEDGE_BASE, searchLegalKnowledge } from "./legalKnowledgeBase";

describe("Expanded Legal Knowledge Base", () => {
  describe("Dubai Mortgage Law 14/2008", () => {
    it("should contain mortgage law articles", () => {
      const mortgageLaws = LEGAL_KNOWLEDGE_BASE.filter(
        (article) => article.category === "mortgage_law"
      );
      expect(mortgageLaws.length).toBeGreaterThanOrEqual(10);
    });

    it("should have article on mortgage registration requirement", () => {
      const results = searchLegalKnowledge("mortgage registration DLD");
      const hasRegistration = results.some(
        (r) => r.lawNumber === "14/2008" && r.keywords.includes("registration")
      );
      expect(hasRegistration).toBe(true);
    });

    it("should have article on 30-day enforcement notice", () => {
      const results = searchLegalKnowledge("mortgage enforcement 30 days notice");
      const hasNotice = results.some(
        (r) => r.lawNumber === "14/2008" && r.keywords.includes("30 days notice")
      );
      expect(hasNotice).toBe(true);
    });

    it("should have article on eligible mortgagees", () => {
      const results = searchLegalKnowledge("mortgage bank Central Bank licensed");
      const hasEligibility = results.some(
        (r) => r.lawNumber === "14/2008" && r.keywords.includes("mortgagee")
      );
      expect(hasEligibility).toBe(true);
    });

    it("should have article on prohibited self-help clauses", () => {
      const results = searchLegalKnowledge("mortgage prohibited void automatic");
      const hasProhibited = results.some(
        (r) => r.lawNumber === "14/2008" && r.keywords.includes("prohibited clauses")
      );
      expect(hasProhibited).toBe(true);
    });

    it("should have article on mortgage discharge", () => {
      const results = searchLegalKnowledge("mortgage discharge repayment clear title");
      const hasDischarge = results.some(
        (r) => r.lawNumber === "14/2008" && r.keywords.includes("discharge")
      );
      expect(hasDischarge).toBe(true);
    });

    it("should have article on multiple mortgages priority", () => {
      const results = searchLegalKnowledge("multiple mortgages priority ranking");
      const hasPriority = results.some(
        (r) => r.lawNumber === "14/2008" && r.keywords.includes("multiple mortgages")
      );
      expect(hasPriority).toBe(true);
    });
  });

  describe("Dubai Property Registration Law 7/2006", () => {
    it("should contain property registration articles", () => {
      const propertyLaws = LEGAL_KNOWLEDGE_BASE.filter(
        (article) => article.category === "property_registration"
      );
      expect(propertyLaws.length).toBeGreaterThanOrEqual(13);
    });

    it("should have article on DLD authority", () => {
      const results = searchLegalKnowledge("Dubai Land Department DLD authority");
      const hasDLD = results.some(
        (r) => r.lawNumber === "7/2006" && r.keywords.includes("DLD")
      );
      expect(hasDLD).toBe(true);
    });

    it("should have article on foreign ownership restrictions", () => {
      const results = searchLegalKnowledge("foreign ownership designated areas");
      const hasForeign = results.some(
        (r) => r.lawNumber === "7/2006" && r.keywords.includes("foreign ownership")
      );
      expect(hasForeign).toBe(true);
    });

    it("should have article on property register legal validity", () => {
      const results = searchLegalKnowledge("property register legal validity mandatory");
      const hasValidity = results.some(
        (r) => r.lawNumber === "7/2006" && r.keywords.includes("legal validity")
      );
      expect(hasValidity).toBe(true);
    });

    it("should have article on inheritance requirements", () => {
      const results = searchLegalKnowledge("inheritance certificate property heirs");
      const hasInheritance = results.some(
        (r) => r.lawNumber === "7/2006" && r.keywords.includes("inheritance")
      );
      expect(hasInheritance).toBe(true);
    });

    it("should have article on property division and merging", () => {
      const results = searchLegalKnowledge("property division merging mortgage");
      const hasDivision = results.some(
        (r) => r.lawNumber === "7/2006" && r.keywords.includes("division")
      );
      expect(hasDivision).toBe(true);
    });

    it("should have article on invalid agreements", () => {
      const results = searchLegalKnowledge("invalid void unenforceable bypass");
      const hasInvalid = results.some(
        (r) => r.lawNumber === "7/2006" && r.keywords.includes("invalid")
      );
      expect(hasInvalid).toBe(true);
    });
  });

  describe("DIFC Real Property Law 10/2018", () => {
    it("should contain DIFC law articles", () => {
      const difcLaws = LEGAL_KNOWLEDGE_BASE.filter(
        (article) => article.category === "difc_law"
      );
      expect(difcLaws.length).toBeGreaterThanOrEqual(10);
    });

    it("should have article on DIFC independent jurisdiction", () => {
      const results = searchLegalKnowledge("DIFC independent jurisdiction English common law");
      const hasJurisdiction = results.some(
        (r) => r.lawNumber === "10/2018" && r.keywords.includes("independent jurisdiction")
      );
      expect(hasJurisdiction).toBe(true);
    });

    it("should have article on DIFC foreign ownership", () => {
      const results = searchLegalKnowledge("DIFC foreign nationals no restrictions");
      const hasOwnership = results.some(
        (r) => r.lawNumber === "10/2018" && r.keywords.includes("foreign nationals")
      );
      expect(hasOwnership).toBe(true);
    });

    it("should have article on DIFC lease registration threshold", () => {
      const results = searchLegalKnowledge("DIFC lease registration 6 months");
      const hasRegistration = results.some(
        (r) => r.lawNumber === "10/2018" && r.keywords.includes("6 months")
      );
      expect(hasRegistration).toBe(true);
    });

    it("should have article on DIFC off-plan protection", () => {
      const results = searchLegalKnowledge("DIFC off-plan buyer protection escrow warranty");
      const hasOffPlan = results.some(
        (r) => r.lawNumber === "10/2018" && r.keywords.includes("off-plan")
      );
      expect(hasOffPlan).toBe(true);
    });
  });

  describe("DIFC Leasing Law 1/2020", () => {
    it("should have article on DIFC leasing application", () => {
      const results = searchLegalKnowledge("DIFC leasing residential commercial retail");
      const hasApplication = results.some(
        (r) => r.lawNumber === "1/2020" && r.keywords.includes("DIFC leasing")
      );
      expect(hasApplication).toBe(true);
    });

    it("should have article on DIFC security deposit escrow", () => {
      const results = searchLegalKnowledge("DIFC security deposit 10% Registrar escrow");
      const hasDeposit = results.some(
        (r) => r.lawNumber === "1/2020" && r.keywords.includes("10% limit")
      );
      expect(hasDeposit).toBe(true);
    });

    it("should have article on DIFC rent increase notice", () => {
      const results = searchLegalKnowledge("DIFC rent increase 90 days no automatic renewal");
      const hasRentIncrease = results.some(
        (r) => r.lawNumber === "1/2020" && r.keywords.includes("90 days notice")
      );
      expect(hasRentIncrease).toBe(true);
    });

    it("should have article on DIFC maintenance responsibilities", () => {
      const results = searchLegalKnowledge("DIFC maintenance lessee lessor repair");
      const hasMaintenance = results.some(
        (r) => r.lawNumber === "1/2020" && r.keywords.includes("DIFC maintenance")
      );
      expect(hasMaintenance).toBe(true);
    });

    it("should have article on DIFC condition reports", () => {
      const results = searchLegalKnowledge("DIFC condition report 20 days evidence");
      const hasCondition = results.some(
        (r) => r.lawNumber === "1/2020" && r.keywords.includes("condition report")
      );
      expect(hasCondition).toBe(true);
    });
  });

  describe("Legal Knowledge Search Functionality", () => {
    it("should find mortgage-related articles", () => {
      const results = searchLegalKnowledge("mortgage");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.category === "mortgage_law")).toBe(true);
    });

    it("should find property registration articles", () => {
      const results = searchLegalKnowledge("property registration DLD");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.category === "property_registration")).toBe(true);
    });

    it("should find DIFC-specific articles", () => {
      const results = searchLegalKnowledge("DIFC");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.category === "difc_law")).toBe(true);
    });

    it("should distinguish between DIFC and mainland Dubai laws", () => {
      const difcResults = searchLegalKnowledge("DIFC leasing");
      const mainlandResults = searchLegalKnowledge("Dubai rental law 26/2007");
      
      expect(difcResults.some((r) => r.lawNumber === "1/2020")).toBe(true);
      expect(mainlandResults.some((r) => r.lawNumber === "26/2007")).toBe(true);
    });
  });

  describe("Practical Examples Coverage", () => {
    it("should have practical examples for mortgage articles", () => {
      const mortgageLaws = LEGAL_KNOWLEDGE_BASE.filter(
        (article) => article.category === "mortgage_law"
      );
      const withExamples = mortgageLaws.filter((a) => a.practicalExample);
      expect(withExamples.length).toBeGreaterThan(5);
    });

    it("should have practical examples for property registration articles", () => {
      const propertyLaws = LEGAL_KNOWLEDGE_BASE.filter(
        (article) => article.category === "property_registration"
      );
      const withExamples = propertyLaws.filter((a) => a.practicalExample);
      expect(withExamples.length).toBeGreaterThan(8);
    });

    it("should have practical examples for DIFC articles", () => {
      const difcLaws = LEGAL_KNOWLEDGE_BASE.filter(
        (article) => article.category === "difc_law"
      );
      const withExamples = difcLaws.filter((a) => a.practicalExample);
      expect(withExamples.length).toBeGreaterThan(7);
    });
  });

  describe("Bilingual Support", () => {
    it("should have Arabic translations for mortgage law", () => {
      const mortgageLaws = LEGAL_KNOWLEDGE_BASE.filter(
        (article) => article.category === "mortgage_law"
      );
      const withArabic = mortgageLaws.filter((a) => a.titleAr && a.contentAr);
      expect(withArabic.length).toBeGreaterThan(5);
    });

    it("should have Arabic translations for property registration law", () => {
      const propertyLaws = LEGAL_KNOWLEDGE_BASE.filter(
        (article) => article.category === "property_registration"
      );
      const withArabic = propertyLaws.filter((a) => a.titleAr && a.contentAr);
      expect(withArabic.length).toBeGreaterThan(8);
    });

    it("should have Arabic translations for DIFC law", () => {
      const difcLaws = LEGAL_KNOWLEDGE_BASE.filter(
        (article) => article.category === "difc_law"
      );
      const withArabic = difcLaws.filter((a) => a.titleAr && a.contentAr);
      expect(withArabic.length).toBeGreaterThan(7);
    });
  });
});
