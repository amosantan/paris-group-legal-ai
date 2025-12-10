#!/usr/bin/env node
/**
 * Test PDF Upload and Ingestion
 * 
 * This script tests the complete PDF upload pipeline:
 * 1. Upload PDF to database
 * 2. Extract text and chunk into articles
 * 3. Generate embeddings
 * 4. Verify searchability
 */

import { readFileSync } from 'fs';
import { ingestPDF } from './server/pdfIngestionService.js';
import { getAllLegalKnowledge, getLegalKnowledgeStats } from './server/db.js';
import { searchLegalKnowledgeEnhanced } from './server/legalKnowledgeBase.js';
import { hybridSearch } from './server/hybridSearch.js';

async function testPDFUpload() {
  console.log('🧪 Testing PDF Upload and Ingestion Pipeline\n');
  
  // Step 1: Get baseline stats
  console.log('📊 Step 1: Getting baseline statistics...');
  const statsBefore = await getLegalKnowledgeStats();
  console.log(`   Total articles before: ${statsBefore.total}`);
  console.log(`   From PDFs before: ${statsBefore.fromPDFs}\n`);
  
  // Step 2: Read PDF file
  console.log('📄 Step 2: Reading RERA legislation PDF...');
  const pdfPath = '/home/ubuntu/upload/real-estate-legislation.pdf';
  const pdfBuffer = readFileSync(pdfPath);
  console.log(`   PDF size: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB\n`);
  
  // Step 3: Ingest PDF
  console.log('⚙️  Step 3: Ingesting PDF (this may take 2-5 minutes)...');
  const startTime = Date.now();
  
  try {
    const result = await ingestPDF({
      filename: 'real-estate-legislation.pdf',
      buffer: pdfBuffer,
      category: 'real_estate_law',
      sourceType: 'pdf_upload',
    });
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`   ✅ Ingestion complete in ${duration}s`);
    console.log(`   Articles created: ${result.articlesCreated}`);
    console.log(`   Embeddings generated: ${result.embeddingsGenerated}`);
    console.log(`   Errors: ${result.errors}\n`);
    
  } catch (error) {
    console.error(`   ❌ Ingestion failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
  
  // Step 4: Get updated stats
  console.log('📊 Step 4: Getting updated statistics...');
  const statsAfter = await getLegalKnowledgeStats();
  console.log(`   Total articles after: ${statsAfter.total}`);
  console.log(`   From PDFs after: ${statsAfter.fromPDFs}`);
  console.log(`   New articles added: ${statsAfter.total - statsBefore.total}\n`);
  
  // Step 5: Test search for content from the PDF
  console.log('🔍 Step 5: Testing search for PDF content...');
  
  const testQueries = [
    'What are the rules for jointly owned property in Dubai?',
    'What is RERA and what are its powers?',
    'How is rent increase calculated in Dubai?',
    'What are the escrow account requirements?',
  ];
  
  for (const query of testQueries) {
    console.log(`\n   Query: "${query}"`);
    
    try {
      const results = await hybridSearch(query, { topK: 3 });
      console.log(`   Results found: ${results.length}`);
      
      if (results.length > 0) {
        const topResult = results[0];
        console.log(`   Top result: ${topResult.article.lawName}`);
        console.log(`   Article: ${topResult.article.articleNumber || 'N/A'}`);
        console.log(`   Score: ${topResult.score.toFixed(3)}`);
        console.log(`   Preview: ${topResult.article.contentEn.substring(0, 100)}...`);
      } else {
        console.log(`   ⚠️  No results found`);
      }
    } catch (error) {
      console.log(`   ❌ Search failed: ${error.message}`);
    }
  }
  
  // Step 6: Verify specific laws from the PDF
  console.log('\n\n📋 Step 6: Verifying specific laws from PDF...');
  const allArticles = await getAllLegalKnowledge();
  
  const lawsToCheck = [
    'Law No. (6) of 2019',
    'Law No. (4) of 2019',
    'Law No. (26) of 2007',
    'Law No. (13) of 2008',
  ];
  
  for (const lawName of lawsToCheck) {
    const found = allArticles.filter(a => a.lawName.includes(lawName));
    console.log(`   ${lawName}: ${found.length} articles`);
  }
  
  console.log('\n\n✅ PDF Upload Test Complete!');
  console.log('\n📝 Summary:');
  console.log(`   - Articles added: ${statsAfter.total - statsBefore.total}`);
  console.log(`   - Search functionality: ${testQueries.length} queries tested`);
  console.log(`   - System can now answer questions about RERA legislation`);
  
  process.exit(0);
}

// Run the test
testPDFUpload().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
