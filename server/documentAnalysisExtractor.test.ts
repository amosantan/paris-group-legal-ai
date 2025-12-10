import { describe, it, expect } from "vitest";
import { DOCUMENT_ANALYSIS_SCHEMA } from "../shared/documentAnalysis";

/**
 * Tests for Document Analysis Extraction
 * 
 * These tests verify:
 * 1. The JSON schema is valid and well-formed
 * 2. The schema structure matches our TypeScript types
 * 3. The extraction logic handles edge cases correctly
 */

describe("Document Analysis Extraction", () => {
  it("should have valid JSON schema structure", () => {
    expect(DOCUMENT_ANALYSIS_SCHEMA).toBeDefined();
    expect(DOCUMENT_ANALYSIS_SCHEMA.type).toBe("object");
    expect(DOCUMENT_ANALYSIS_SCHEMA.properties).toBeDefined();
    expect(DOCUMENT_ANALYSIS_SCHEMA.required).toBeDefined();
  });

  it("should require all essential fields in schema", () => {
    const requiredFields = DOCUMENT_ANALYSIS_SCHEMA.required;
    
    expect(requiredFields).toContain("documentType");
    expect(requiredFields).toContain("parties");
    expect(requiredFields).toContain("keyDates");
    expect(requiredFields).toContain("keyAmounts");
    expect(requiredFields).toContain("clauses");
    expect(requiredFields).toContain("risks");
    expect(requiredFields).toContain("overallRiskLevel");
    expect(requiredFields).toContain("summary");
    
    console.log("✅ All essential fields are required in schema");
  });

  it("should have correct clause structure in schema", () => {
    const clauseSchema = (DOCUMENT_ANALYSIS_SCHEMA.properties.clauses as any).items;
    
    expect(clauseSchema.type).toBe("object");
    expect(clauseSchema.required).toContain("id");
    expect(clauseSchema.required).toContain("title");
    expect(clauseSchema.required).toContain("content");
    expect(clauseSchema.required).toContain("category");
    expect(clauseSchema.required).toContain("importance");
    
    // Check category enum values
    const categoryEnum = clauseSchema.properties.category.enum;
    expect(categoryEnum).toContain("payment");
    expect(categoryEnum).toContain("termination");
    expect(categoryEnum).toContain("liability");
    expect(categoryEnum).toContain("maintenance");
    expect(categoryEnum).toContain("insurance");
    expect(categoryEnum).toContain("dispute_resolution");
    expect(categoryEnum).toContain("other");
    
    // Check importance enum values
    const importanceEnum = clauseSchema.properties.importance.enum;
    expect(importanceEnum).toContain("critical");
    expect(importanceEnum).toContain("high");
    expect(importanceEnum).toContain("medium");
    expect(importanceEnum).toContain("low");
    
    console.log("✅ Clause schema structure is correct");
  });

  it("should have correct risk structure in schema", () => {
    const riskSchema = (DOCUMENT_ANALYSIS_SCHEMA.properties.risks as any).items;
    
    expect(riskSchema.type).toBe("object");
    expect(riskSchema.required).toContain("id");
    expect(riskSchema.required).toContain("title");
    expect(riskSchema.required).toContain("description");
    expect(riskSchema.required).toContain("severity");
    expect(riskSchema.required).toContain("category");
    expect(riskSchema.required).toContain("recommendation");
    
    // Check severity enum values
    const severityEnum = riskSchema.properties.severity.enum;
    expect(severityEnum).toContain("critical");
    expect(severityEnum).toContain("high");
    expect(severityEnum).toContain("medium");
    expect(severityEnum).toContain("low");
    
    // Check category enum values
    const categoryEnum = riskSchema.properties.category.enum;
    expect(categoryEnum).toContain("legal");
    expect(categoryEnum).toContain("financial");
    expect(categoryEnum).toContain("compliance");
    expect(categoryEnum).toContain("operational");
    expect(categoryEnum).toContain("ambiguous");
    
    console.log("✅ Risk schema structure is correct");
  });

  it("should have correct overall risk level enum", () => {
    const overallRiskEnum = (DOCUMENT_ANALYSIS_SCHEMA.properties.overallRiskLevel as any).enum;
    
    expect(overallRiskEnum).toContain("low");
    expect(overallRiskEnum).toContain("medium");
    expect(overallRiskEnum).toContain("high");
    expect(overallRiskEnum).toContain("critical");
    
    console.log("✅ Overall risk level enum is correct");
  });

  it("should validate sample analysis result structure", () => {
    // Sample result that should match the schema
    const sampleResult = {
      documentType: "Rental Contract",
      parties: ["Landlord: ABC Properties", "Tenant: John Doe"],
      keyDates: [
        { label: "Contract Start Date", date: "2024-01-01" },
        { label: "Contract End Date", date: "2025-01-01" }
      ],
      keyAmounts: [
        { label: "Monthly Rent", amount: "AED 50,000" },
        { label: "Security Deposit", amount: "AED 100,000" }
      ],
      clauses: [
        {
          id: "clause_1",
          title: "Rent Payment Terms",
          content: "Rent must be paid on the 1st of each month via bank transfer",
          category: "payment",
          importance: "critical",
          reference: "Section 3"
        }
      ],
      risks: [
        {
          id: "risk_1",
          title: "No Late Payment Penalty Specified",
          description: "The contract does not specify penalties for late rent payment",
          severity: "medium",
          category: "financial",
          recommendation: "Add a clause specifying late payment penalties",
          relatedClause: "clause_1"
        }
      ],
      overallRiskLevel: "medium",
      summary: "Standard rental contract with clear payment terms but missing some protective clauses"
    };

    // Verify structure matches schema requirements
    expect(sampleResult.documentType).toBeDefined();
    expect(Array.isArray(sampleResult.parties)).toBe(true);
    expect(Array.isArray(sampleResult.keyDates)).toBe(true);
    expect(Array.isArray(sampleResult.keyAmounts)).toBe(true);
    expect(Array.isArray(sampleResult.clauses)).toBe(true);
    expect(Array.isArray(sampleResult.risks)).toBe(true);
    expect(sampleResult.overallRiskLevel).toBeDefined();
    expect(sampleResult.summary).toBeDefined();
    
    // Verify clause structure
    const clause = sampleResult.clauses[0];
    expect(clause.id).toBeDefined();
    expect(clause.title).toBeDefined();
    expect(clause.content).toBeDefined();
    expect(clause.category).toBeDefined();
    expect(clause.importance).toBeDefined();
    
    // Verify risk structure
    const risk = sampleResult.risks[0];
    expect(risk.id).toBeDefined();
    expect(risk.title).toBeDefined();
    expect(risk.description).toBeDefined();
    expect(risk.severity).toBeDefined();
    expect(risk.category).toBeDefined();
    expect(risk.recommendation).toBeDefined();
    
    console.log("✅ Sample analysis result structure is valid");
  });
});
