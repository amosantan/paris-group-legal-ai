/**
 * Test PDF Upload Fix
 * Verify that PDF extraction works with pdf-parse instead of pdftotext
 */

import { ingestPDF } from "./server/pdfIngestionService.ts";

const pdfUrl = "https://dlp.dubai.gov.ae/Legislation%20Reference/2022/Law%20No.%20(19)%20of%202022%20Concerning%20Offplan%20Cancellation.aspx.pdf";

console.log("🧪 Testing PDF Upload Fix...\n");
console.log("PDF URL:", pdfUrl);
console.log("Filename: Offplan cancellation");
console.log("Law Name: UAE Labor Law");
console.log("Law Number: 19/2022");
console.log("Category: RERA Regulation\n");

try {
  const startTime = Date.now();
  
  const result = await ingestPDF(pdfUrl, {
    filename: "Offplan cancellation",
    sourceUrl: pdfUrl,
    lawName: "UAE Labor Law",
    lawNumber: "19/2022",
    category: "rera_regulation",
  });
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);
  
  console.log("✅ PDF Upload Successful!\n");
  console.log("Results:");
  console.log(`  ⏱️  Processing time: ${duration}s`);
  console.log(`  📄 Chunks created: ${result.chunksCreated}`);
  console.log(`  🧠 Embeddings generated: ${result.embeddingsGenerated}`);
  console.log(`  📊 Total articles: ${result.totalArticles} (+${result.chunksCreated})`);
  
  if (result.chunksCreated > 0) {
    console.log("\n✅ PDF extraction with pdf-parse is working correctly!");
  } else {
    console.log("\n⚠️  No chunks created - PDF might already be in the database");
  }
  
} catch (error) {
  console.error("\n❌ PDF Upload Failed!");
  console.error("Error:", error.message);
  console.error("\nFull error:", error);
  process.exit(1);
}
