import { describe, expect, it } from "vitest";
import {
  cleanExtractedText,
  validatePDFSize,
  extractContractInfo,
} from "./pdfExtractor";

describe("PDF Extractor", () => {
  describe("cleanExtractedText", () => {
    it("should remove excessive whitespace", () => {
      const input = "This    has    too    many    spaces";
      const result = cleanExtractedText(input);
      expect(result).toBe("This has too many spaces");
    });

    it("should normalize line breaks", () => {
      const input = "Line 1\r\nLine 2\r\nLine 3";
      const result = cleanExtractedText(input);
      expect(result).toContain("Line 1\nLine 2\nLine 3");
    });

    it("should remove multiple consecutive line breaks", () => {
      const input = "Paragraph 1\n\n\n\n\nParagraph 2";
      const result = cleanExtractedText(input);
      expect(result).toBe("Paragraph 1\n\nParagraph 2");
    });

    it("should trim whitespace", () => {
      const input = "   Text with spaces   ";
      const result = cleanExtractedText(input);
      expect(result).toBe("Text with spaces");
    });
  });

  describe("validatePDFSize", () => {
    it("should accept files under the size limit", () => {
      const buffer = Buffer.alloc(5 * 1024 * 1024); // 5MB
      expect(() => validatePDFSize(buffer, 10)).not.toThrow();
    });

    it("should reject files over the size limit", () => {
      const buffer = Buffer.alloc(15 * 1024 * 1024); // 15MB
      expect(() => validatePDFSize(buffer, 10)).toThrow(/too large/);
    });

    it("should use default 10MB limit", () => {
      const buffer = Buffer.alloc(11 * 1024 * 1024); // 11MB
      expect(() => validatePDFSize(buffer)).toThrow(/too large/);
    });

    it("should allow custom size limits", () => {
      const buffer = Buffer.alloc(8 * 1024 * 1024); // 8MB
      expect(() => validatePDFSize(buffer, 5)).toThrow(/too large/);
      expect(() => validatePDFSize(buffer, 10)).not.toThrow();
    });
  });

  describe("extractContractInfo", () => {
    it("should detect parties in contract", () => {
      const text = "This agreement is between the landlord and the tenant";
      const info = extractContractInfo(text);
      expect(info.hasParties).toBe(true);
    });

    it("should detect amounts in contract", () => {
      const text = "The rent is 50,000 AED per year";
      const info = extractContractInfo(text);
      expect(info.hasAmount).toBe(true);
    });

    it("should detect dates in contract", () => {
      const text = "This contract starts on 01/01/2024";
      const info = extractContractInfo(text);
      expect(info.hasDate).toBe(true);
    });

    it("should detect duration terms", () => {
      const text = "The lease period is 12 months";
      const info = extractContractInfo(text);
      expect(info.hasDuration).toBe(true);
    });

    it("should detect English language", () => {
      const text = "This is a rental agreement in English";
      const info = extractContractInfo(text);
      expect(info.language).toBe("en");
    });

    it("should detect Arabic language", () => {
      const text = "هذا عقد إيجار باللغة العربية";
      const info = extractContractInfo(text);
      expect(info.language).toBe("ar");
    });

    it("should detect mixed language", () => {
      const text = "Rental Agreement عقد إيجار";
      const info = extractContractInfo(text);
      expect(info.language).toBe("mixed");
    });

    it("should detect all contract elements", () => {
      const text = `
        RENTAL AGREEMENT
        Between landlord and tenant
        Rent: 60,000 AED per year
        Start date: 01/01/2024
        Duration: 12 months
      `;
      const info = extractContractInfo(text);
      expect(info.hasParties).toBe(true);
      expect(info.hasAmount).toBe(true);
      expect(info.hasDate).toBe(true);
      expect(info.hasDuration).toBe(true);
      expect(info.language).toBe("en");
    });

    it("should handle text without contract elements", () => {
      const text = "This is just some random text";
      const info = extractContractInfo(text);
      expect(info.hasParties).toBe(false);
      expect(info.hasAmount).toBe(false);
      expect(info.hasDate).toBe(false);
      expect(info.hasDuration).toBe(false);
    });
  });
});
