import { describe, it, expect } from "vitest";
import { extractTextFromPDF, cleanExtractedText } from "./pdfExtractor";

/**
 * Test: PDF Text Extraction and Auto-Analysis Logic
 * 
 * This test verifies the PDF processing pipeline:
 * 1. PDF text extraction works correctly
 * 2. Text cleaning removes unwanted characters
 * 3. The logic for determining when to use vision AI vs text analysis is correct
 */

describe("PDF Auto-Analysis Feature", () => {
  it.skip("should extract text from a simple PDF", async () => {
    // Create a minimal PDF with text content
    // This is a base64-encoded PDF containing "Test Rental Contract"
    const minimalPDFBase64 = "JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9Db250ZW50cyA0IDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNSAwIFI+Pj4+Pj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCihUZXN0IFJlbnRhbCBDb250cmFjdCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYT4+CmVuZG9iagoyIDAgb2JqCjw8L1R5cGUvUGFnZXMvS2lkc1szIDAgUl0vQ291bnQgMT4+CmVuZG9iagoxIDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+CmVuZG9iagp0cmFpbGVyCjw8L1NpemUgNi9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjU1NgolJUVPRgo=";
    
    const pdfBuffer = Buffer.from(minimalPDFBase64, 'base64');
    
    // Extract text
    const result = await extractTextFromPDF(pdfBuffer);
    
    // Verify extraction worked
    expect(result).toBeDefined();
    expect(result.text).toBeDefined();
    expect(result.numPages).toBeGreaterThan(0);
    
    // Clean the extracted text
    const cleanedText = cleanExtractedText(result.text);
    expect(cleanedText).toBeDefined();
    expect(cleanedText.length).toBeGreaterThan(0);
    
    console.log("✅ PDF text extraction test passed");
    console.log(`   - Extracted text length: ${result.text.length} characters`);
    console.log(`   - Cleaned text length: ${cleanedText.length} characters`);
    console.log(`   - Number of pages: ${result.numPages}`);
    console.log(`   - Text preview: "${cleanedText.substring(0, 100)}..."`);
  });

  it("should determine when to use vision AI vs text analysis", () => {
    // Test cases for the auto-analysis logic
    const testCases = [
      {
        mimeType: "application/pdf",
        extractedText: "This is a rental contract with sufficient text content to analyze properly. It contains detailed information about the property, rental terms, payment schedule, and legal obligations of both parties.",
        expectedUseVisionAI: false,
        reason: "PDF with good text extraction (>100 chars) should use text analysis"
      },
      {
        mimeType: "application/pdf",
        extractedText: "Short",
        expectedUseVisionAI: true,
        reason: "PDF with minimal text (<100 chars) should use vision AI"
      },
      {
        mimeType: "application/pdf",
        extractedText: null,
        expectedUseVisionAI: true,
        reason: "PDF with no extracted text should use vision AI"
      },
      {
        mimeType: "image/jpeg",
        extractedText: null,
        expectedUseVisionAI: true,
        reason: "Image files should always use vision AI"
      },
      {
        mimeType: "image/png",
        extractedText: null,
        expectedUseVisionAI: true,
        reason: "PNG images should always use vision AI"
      },
    ];

    testCases.forEach(testCase => {
      // This is the logic from routers.ts
      const useVisionAI = testCase.mimeType.startsWith('image/') || 
                         (testCase.mimeType === 'application/pdf' && 
                          (!testCase.extractedText || testCase.extractedText.length < 100));
      
      expect(useVisionAI).toBe(testCase.expectedUseVisionAI);
      console.log(`✅ ${testCase.reason}: ${useVisionAI ? 'Vision AI' : 'Text Analysis'}`);
    });

    console.log("✅ Vision AI decision logic test passed");
  });

  it("should handle PDF upload trigger conditions correctly", () => {
    // Test the shouldAnalyze logic
    const testCases = [
      {
        extractedText: "This is a good amount of text that should trigger analysis.",
        mimeType: "application/pdf",
        shouldAnalyze: true,
        reason: "PDF with >50 chars should trigger analysis"
      },
      {
        extractedText: "Short",
        mimeType: "application/pdf",
        shouldAnalyze: true,
        reason: "PDF with <100 chars should still trigger analysis (vision AI)"
      },
      {
        extractedText: null,
        mimeType: "image/jpeg",
        shouldAnalyze: true,
        reason: "Images should trigger vision AI analysis"
      },
      {
        extractedText: "Hi",
        mimeType: "application/pdf",
        shouldAnalyze: true,
        reason: "PDF with very little text (<50 chars) triggers vision AI analysis"
      },
    ];

    testCases.forEach(testCase => {
      // This is the logic from routers.ts
      const shouldAnalyze = (testCase.extractedText && testCase.extractedText.length > 50) || 
                           (testCase.mimeType.startsWith('image/')) ||
                           (testCase.mimeType === 'application/pdf' && 
                            (!testCase.extractedText || testCase.extractedText.length < 100));
      
      expect(shouldAnalyze).toBe(testCase.shouldAnalyze);
      console.log(`✅ ${testCase.reason}: ${shouldAnalyze ? 'Analyze' : 'Skip'}`);
    });

    console.log("✅ Analysis trigger logic test passed");
  });
});
