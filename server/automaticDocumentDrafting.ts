import { ConversationContext } from "./conversationMemory";
import { invokeUnifiedLLM } from "./_core/unifiedLLM";
import { DemandLetterData, EvictionNoticeData, NOCData } from "./legalDocumentTemplates";

/**
 * Automatic Document Drafting System
 * 
 * Extracts information from consultation history and automatically fills
 * legal document templates (demand letters, eviction notices, NOCs).
 */

export interface DocumentDraft {
  type: "demand_letter" | "eviction_notice" | "noc";
  data: DemandLetterData | EvictionNoticeData | NOCData;
  confidence: number; // 0-100, how confident we are about the extracted data
  missingFields: string[]; // Fields that couldn't be extracted
}

/**
 * Analyze consultation to determine which documents can be generated
 */
export function suggestDocumentTypes(
  consultationCategory: string,
  conversationContext: ConversationContext
): Array<{ type: string; label: string; description: string }> {
  const suggestions: Array<{ type: string; label: string; description: string }> = [];
  const summary = conversationContext.summary.toLowerCase();

  if (consultationCategory === "rental_dispute") {
    // Suggest demand letter if there's mention of payment issues
    if (
      summary.includes("payment") ||
      summary.includes("arrears") ||
      summary.includes("rent") ||
      summary.includes("owed")
    ) {
      suggestions.push({
        type: "demand_letter",
        label: "Demand Letter for Payment",
        description: "Formal letter requesting outstanding rent payment",
      });
    }

    // Suggest eviction notice if there's mention of eviction
    if (
      summary.includes("evict") ||
      summary.includes("vacate") ||
      summary.includes("terminate")
    ) {
      suggestions.push({
        type: "eviction_notice",
        label: "Eviction Notice",
        description: "Legal notice to vacate the property",
      });
    }
  }

  if (consultationCategory === "real_estate_transaction") {
    // Suggest NOC for various property matters
    if (
      summary.includes("renovation") ||
      summary.includes("transfer") ||
      summary.includes("mortgage") ||
      summary.includes("sale")
    ) {
      suggestions.push({
        type: "noc",
        label: "No Objection Certificate",
        description: "Certificate confirming no objection to the proposed action",
      });
    }
  }

  return suggestions;
}

/**
 * Extract demand letter data from consultation
 */
export async function extractDemandLetterData(
  messages: Array<{ role: string; content: string }>,
  conversationContext: ConversationContext
): Promise<DocumentDraft> {
  const extractionPrompt = `Extract information for a demand letter from this legal consultation.

Conversation Summary: ${conversationContext.summary}

Key Facts:
${conversationContext.keyFacts.map((f) => `- ${f.type}: ${f.value} (${f.context})`).join("\n")}

Recent Messages:
${messages.slice(-10).map((m) => `${m.role}: ${m.content}`).join("\n\n")}

Extract the following fields (use "UNKNOWN" if not found):
- senderName: Name of the person sending the letter (landlord)
- senderAddress: Address of the sender
- recipientName: Name of the recipient (tenant)
- recipientAddress: Address of the recipient
- propertyAddress: Address of the property in question
- amountOwed: Amount of money owed (number only, no currency)
- dueDate: Date when payment is due (YYYY-MM-DD format)
- details: Brief description of what is owed and why

Return ONLY valid JSON with these exact field names.`;

  try {
    const response = await invokeUnifiedLLM({
      messages: [
        {
          role: "system",
          content: "You are a legal document data extractor. Return only valid JSON.",
        },
        { role: "user", content: extractionPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "demand_letter_data",
          strict: true,
          schema: {
            type: "object",
            properties: {
              senderName: { type: "string" },
              senderAddress: { type: "string" },
              recipientName: { type: "string" },
              recipientAddress: { type: "string" },
              propertyAddress: { type: "string" },
              amountOwed: { type: "number" },
              dueDate: { type: "string" },
              details: { type: "string" },
            },
            required: [
              "senderName",
              "senderAddress",
              "recipientName",
              "recipientAddress",
              "propertyAddress",
              "amountOwed",
              "dueDate",
              "details",
            ],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      const extracted = JSON.parse(content);

      // Add Arabic translations (placeholder - in production, use proper translation)
      const data: DemandLetterData = {
        ...extracted,
        senderNameAr: extracted.senderName,
        senderAddressAr: extracted.senderAddress,
        recipientNameAr: extracted.recipientName,
        recipientAddressAr: extracted.recipientAddress,
        propertyAddressAr: extracted.propertyAddress,
        detailsAr: extracted.details,
      };

      // Calculate confidence and find missing fields
      const missingFields: string[] = [];
      let filledFields = 0;
      const totalFields = 8;

      Object.entries(extracted).forEach(([key, value]) => {
        if (value === "UNKNOWN" || value === "" || value === 0) {
          missingFields.push(key);
        } else {
          filledFields++;
        }
      });

      const confidence = Math.round((filledFields / totalFields) * 100);

      return {
        type: "demand_letter",
        data,
        confidence,
        missingFields,
      };
    }
  } catch (error) {
    console.error("Error extracting demand letter data:", error);
  }

  // Return empty draft if extraction fails
  return {
    type: "demand_letter",
    data: {
      senderName: "UNKNOWN",
      senderNameAr: "غير معروف",
      senderAddress: "UNKNOWN",
      senderAddressAr: "غير معروف",
      recipientName: "UNKNOWN",
      recipientNameAr: "غير معروف",
      recipientAddress: "UNKNOWN",
      recipientAddressAr: "غير معروف",
      propertyAddress: "UNKNOWN",
      propertyAddressAr: "غير معروف",
      amountOwed: 0,
      dueDate: "",
      details: "UNKNOWN",
      detailsAr: "غير معروف",
    },
    confidence: 0,
    missingFields: [
      "senderName",
      "senderAddress",
      "recipientName",
      "recipientAddress",
      "propertyAddress",
      "amountOwed",
      "dueDate",
      "details",
    ],
  };
}

/**
 * Extract eviction notice data from consultation
 */
export async function extractEvictionNoticeData(
  messages: Array<{ role: string; content: string }>,
  conversationContext: ConversationContext
): Promise<DocumentDraft> {
  const extractionPrompt = `Extract information for an eviction notice from this legal consultation.

Conversation Summary: ${conversationContext.summary}

Key Facts:
${conversationContext.keyFacts.map((f) => `- ${f.type}: ${f.value} (${f.context})`).join("\n")}

Recent Messages:
${messages.slice(-10).map((m) => `${m.role}: ${m.content}`).join("\n\n")}

Extract the following fields (use "UNKNOWN" if not found):
- landlordName: Name of the landlord
- landlordAddress: Address of the landlord
- tenantName: Name of the tenant
- tenantAddress: Address of the tenant
- propertyAddress: Address of the property
- evictionReason: Reason for eviction
- noticeDate: Date of the notice (YYYY-MM-DD, use today if not specified)
- vacateDate: Date tenant must vacate (YYYY-MM-DD)
- legalBasis: Legal basis for eviction (e.g., "Article 25(1)(a) of Dubai Law 26/2007")

Return ONLY valid JSON with these exact field names.`;

  try {
    const response = await invokeUnifiedLLM({
      messages: [
        {
          role: "system",
          content: "You are a legal document data extractor. Return only valid JSON.",
        },
        { role: "user", content: extractionPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "eviction_notice_data",
          strict: true,
          schema: {
            type: "object",
            properties: {
              landlordName: { type: "string" },
              landlordAddress: { type: "string" },
              tenantName: { type: "string" },
              tenantAddress: { type: "string" },
              propertyAddress: { type: "string" },
              evictionReason: { type: "string" },
              noticeDate: { type: "string" },
              vacateDate: { type: "string" },
              legalBasis: { type: "string" },
            },
            required: [
              "landlordName",
              "landlordAddress",
              "tenantName",
              "tenantAddress",
              "propertyAddress",
              "evictionReason",
              "noticeDate",
              "vacateDate",
              "legalBasis",
            ],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      const extracted = JSON.parse(content);

      const data: EvictionNoticeData = {
        ...extracted,
        landlordNameAr: extracted.landlordName,
        landlordAddressAr: extracted.landlordAddress,
        tenantNameAr: extracted.tenantName,
        tenantAddressAr: extracted.tenantAddress,
        propertyAddressAr: extracted.propertyAddress,
        evictionReasonAr: extracted.evictionReason,
        legalBasisAr: extracted.legalBasis,
      };

      const missingFields: string[] = [];
      let filledFields = 0;
      const totalFields = 9;

      Object.entries(extracted).forEach(([key, value]) => {
        if (value === "UNKNOWN" || value === "") {
          missingFields.push(key);
        } else {
          filledFields++;
        }
      });

      const confidence = Math.round((filledFields / totalFields) * 100);

      return {
        type: "eviction_notice",
        data,
        confidence,
        missingFields,
      };
    }
  } catch (error) {
    console.error("Error extracting eviction notice data:", error);
  }

  return {
    type: "eviction_notice",
    data: {
      landlordName: "UNKNOWN",
      landlordNameAr: "غير معروف",
      landlordAddress: "UNKNOWN",
      landlordAddressAr: "غير معروف",
      tenantName: "UNKNOWN",
      tenantNameAr: "غير معروف",
      tenantAddress: "UNKNOWN",
      tenantAddressAr: "غير معروف",
      propertyAddress: "UNKNOWN",
      propertyAddressAr: "غير معروف",
      evictionReason: "UNKNOWN",
      evictionReasonAr: "غير معروف",
      noticeDate: new Date().toISOString().split("T")[0],
      vacateDate: "UNKNOWN",
      legalBasis: "UNKNOWN",
      legalBasisAr: "غير معروف",
    },
    confidence: 0,
    missingFields: [
      "landlordName",
      "landlordAddress",
      "tenantName",
      "tenantAddress",
      "propertyAddress",
      "evictionReason",
      "vacateDate",
      "legalBasis",
    ],
  };
}

/**
 * Extract NOC data from consultation
 */
export async function extractNOCData(
  messages: Array<{ role: string; content: string }>,
  conversationContext: ConversationContext
): Promise<DocumentDraft> {
  const extractionPrompt = `Extract information for a No Objection Certificate from this legal consultation.

Conversation Summary: ${conversationContext.summary}

Key Facts:
${conversationContext.keyFacts.map((f) => `- ${f.type}: ${f.value} (${f.context})`).join("\n")}

Recent Messages:
${messages.slice(-10).map((m) => `${m.role}: ${m.content}`).join("\n\n")}

Extract the following fields (use "UNKNOWN" if not found):
- issuerName: Name of the person issuing the NOC
- issuerTitle: Title/position of the issuer (e.g., "Property Manager")
- issuerCompany: Company name of the issuer
- recipientName: Name of the recipient
- propertyAddress: Address of the property
- purpose: Purpose of the NOC (what is being permitted)
- conditions: Any conditions or limitations
- issueDate: Date of issuance (YYYY-MM-DD, use today if not specified)

Return ONLY valid JSON with these exact field names.`;

  try {
    const response = await invokeUnifiedLLM({
      messages: [
        {
          role: "system",
          content: "You are a legal document data extractor. Return only valid JSON.",
        },
        { role: "user", content: extractionPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "noc_data",
          strict: true,
          schema: {
            type: "object",
            properties: {
              issuerName: { type: "string" },
              issuerTitle: { type: "string" },
              issuerCompany: { type: "string" },
              recipientName: { type: "string" },
              propertyAddress: { type: "string" },
              purpose: { type: "string" },
              conditions: { type: "string" },
              issueDate: { type: "string" },
            },
            required: [
              "issuerName",
              "issuerTitle",
              "issuerCompany",
              "recipientName",
              "propertyAddress",
              "purpose",
              "conditions",
              "issueDate",
            ],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      const extracted = JSON.parse(content);

      const data: NOCData = {
        ...extracted,
        issuerNameAr: extracted.issuerName,
        issuerTitleAr: extracted.issuerTitle,
        issuerCompanyAr: extracted.issuerCompany,
        recipientNameAr: extracted.recipientName,
        propertyAddressAr: extracted.propertyAddress,
        purposeAr: extracted.purpose,
        conditionsAr: extracted.conditions,
      };

      const missingFields: string[] = [];
      let filledFields = 0;
      const totalFields = 8;

      Object.entries(extracted).forEach(([key, value]) => {
        if (value === "UNKNOWN" || value === "") {
          missingFields.push(key);
        } else {
          filledFields++;
        }
      });

      const confidence = Math.round((filledFields / totalFields) * 100);

      return {
        type: "noc",
        data,
        confidence,
        missingFields,
      };
    }
  } catch (error) {
    console.error("Error extracting NOC data:", error);
  }

  return {
    type: "noc",
    data: {
      issuerName: "UNKNOWN",
      issuerNameAr: "غير معروف",
      issuerTitle: "UNKNOWN",
      issuerTitleAr: "غير معروف",
      issuerCompany: "UNKNOWN",
      issuerCompanyAr: "غير معروف",
      recipientName: "UNKNOWN",
      recipientNameAr: "غير معروف",
      propertyAddress: "UNKNOWN",
      propertyAddressAr: "غير معروف",
      purpose: "UNKNOWN",
      purposeAr: "غير معروف",
      conditions: "UNKNOWN",
      conditionsAr: "غير معروف",
      issueDate: new Date().toISOString().split("T")[0],
    },
    confidence: 0,
    missingFields: [
      "issuerName",
      "issuerTitle",
      "issuerCompany",
      "recipientName",
      "propertyAddress",
      "purpose",
      "conditions",
    ],
  };
}
