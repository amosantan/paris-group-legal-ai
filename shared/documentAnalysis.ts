/**
 * Structured Document Analysis Types
 * 
 * These types define the format for AI-extracted clauses and risks from legal documents.
 */

export interface KeyClause {
  /** Unique identifier for the clause */
  id: string;
  /** Title/name of the clause */
  title: string;
  /** The actual clause text or summary */
  content: string;
  /** Category of the clause */
  category: "payment" | "termination" | "liability" | "maintenance" | "insurance" | "dispute_resolution" | "other";
  /** Importance level */
  importance: "critical" | "high" | "medium" | "low";
  /** Page number or section reference (if available) */
  reference?: string;
}

export interface IdentifiedRisk {
  /** Unique identifier for the risk */
  id: string;
  /** Brief title of the risk */
  title: string;
  /** Detailed description of the risk */
  description: string;
  /** Severity level */
  severity: "critical" | "high" | "medium" | "low";
  /** Category of risk */
  category: "legal" | "financial" | "compliance" | "operational" | "ambiguous";
  /** Recommended action to mitigate the risk */
  recommendation: string;
  /** Related clause or section */
  relatedClause?: string;
}

export interface DocumentAnalysisResult {
  /** Type of document identified */
  documentType: string;
  /** Parties involved in the document */
  parties: string[];
  /** Key dates mentioned */
  keyDates: Array<{
    label: string;
    date: string;
  }>;
  /** Key amounts/financial terms */
  keyAmounts: Array<{
    label: string;
    amount: string;
  }>;
  /** Extracted key clauses */
  clauses: KeyClause[];
  /** Identified risks */
  risks: IdentifiedRisk[];
  /** Overall risk assessment */
  overallRiskLevel: "low" | "medium" | "high" | "critical";
  /** General summary */
  summary: string;
}

/**
 * JSON Schema for AI structured output
 * Used with invokeLLM response_format parameter
 */
export const DOCUMENT_ANALYSIS_SCHEMA = {
  type: "object",
  properties: {
    documentType: {
      type: "string",
      description: "Type of legal document (e.g., 'Rental Contract', 'Sale Agreement', 'Power of Attorney')"
    },
    parties: {
      type: "array",
      items: { type: "string" },
      description: "Names of all parties involved in the document"
    },
    keyDates: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string", description: "Description of the date (e.g., 'Contract Start Date')" },
          date: { type: "string", description: "The actual date in ISO format or as written" }
        },
        required: ["label", "date"],
        additionalProperties: false
      },
      description: "Important dates mentioned in the document"
    },
    keyAmounts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string", description: "Description of the amount (e.g., 'Monthly Rent')" },
          amount: { type: "string", description: "The amount with currency" }
        },
        required: ["label", "amount"],
        additionalProperties: false
      },
      description: "Important financial amounts mentioned"
    },
    clauses: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", description: "Unique identifier (e.g., 'clause_1')" },
          title: { type: "string", description: "Title of the clause" },
          content: { type: "string", description: "Summary or full text of the clause" },
          category: {
            type: "string",
            enum: ["payment", "termination", "liability", "maintenance", "insurance", "dispute_resolution", "other"],
            description: "Category of the clause"
          },
          importance: {
            type: "string",
            enum: ["critical", "high", "medium", "low"],
            description: "Importance level of this clause"
          },
          reference: { type: "string", description: "Page or section reference (optional)" }
        },
        required: ["id", "title", "content", "category", "importance"],
        additionalProperties: false
      },
      description: "Key clauses extracted from the document"
    },
    risks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", description: "Unique identifier (e.g., 'risk_1')" },
          title: { type: "string", description: "Brief title of the risk" },
          description: { type: "string", description: "Detailed description of the risk" },
          severity: {
            type: "string",
            enum: ["critical", "high", "medium", "low"],
            description: "Severity level of the risk"
          },
          category: {
            type: "string",
            enum: ["legal", "financial", "compliance", "operational", "ambiguous"],
            description: "Category of risk"
          },
          recommendation: { type: "string", description: "Recommended action to mitigate" },
          relatedClause: { type: "string", description: "Related clause ID (optional)" }
        },
        required: ["id", "title", "description", "severity", "category", "recommendation"],
        additionalProperties: false
      },
      description: "Identified risks in the document"
    },
    overallRiskLevel: {
      type: "string",
      enum: ["low", "medium", "high", "critical"],
      description: "Overall risk assessment of the document"
    },
    summary: {
      type: "string",
      description: "Brief overall summary of the document (2-3 sentences)"
    }
  },
  required: ["documentType", "parties", "keyDates", "keyAmounts", "clauses", "risks", "overallRiskLevel", "summary"],
  additionalProperties: false
} as const;
