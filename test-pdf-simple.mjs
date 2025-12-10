/**
 * Test PDF extraction with a simple working PDF
 */

import { extractTextFromPDF } from "./server/pdfIngestionService.ts";

// Use a simple test PDF URL
const testUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

console.log("🧪 Testing PDF Extraction with pdf-parse...\n");
console.log("Test PDF URL:", testUrl);

try {
  const text = await extractTextFromPDF(testUrl);
  
  console.log("\n✅ PDF Extraction Successful!");
  console.log("Extracted text length:", text.length, "characters");
  console.log("\nFirst 200 characters:");
  console.log(text.substring(0, 200));
  console.log("\n✅ pdf-parse is working correctly! The pdftotext dependency has been successfully replaced.");
  
} catch (error) {
  console.error("\n❌ PDF Extraction Failed!");
  console.error("Error:", error.message);
  process.exit(1);
}
