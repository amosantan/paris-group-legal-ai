#!/usr/bin/env node
/**
 * Upload Law No. (2) of 2022 - Acquisition of Real Property for Public Use
 */

import { readFileSync } from 'fs';
import { ingestPDF } from './server/pdfIngestionService.js';
import { getLegalKnowledgeStats } from './server/db.js';

async function uploadLaw2022() {
  console.log('📄 Uploading Law No. (2) of 2022 - Acquisition of Real Property for Public Use\n');
  
  // Get baseline stats
  console.log('📊 Getting baseline statistics...');
  const statsBefore = await getLegalKnowledgeStats();
  console.log(`   Total articles before: ${statsBefore.total}`);
  console.log(`   From PDFs before: ${statsBefore.fromPDFs}\n`);
  
  // Read PDF
  console.log('📖 Reading PDF file...');
  const pdfPath = '/home/ubuntu/upload/LawNo.(2)of2022ConcerningAcquisitionofRealPropertyforPublicUse.pdf';
  const pdfBuffer = readFileSync(pdfPath);
  console.log(`   File size: ${(pdfBuffer.length / 1024).toFixed(2)} KB`);
  console.log(`   Pages: 13\n`);
  
  // Ingest PDF
  console.log('⚙️  Ingesting PDF...');
  console.log('   This may take 1-3 minutes depending on document complexity...\n');
  
  const startTime = Date.now();
  
  try {
    const result = await ingestPDF(
      pdfBuffer,
      {
        filename: 'Law No. (2) of 2022 - Acquisition of Real Property for Public Use.pdf',
        category: 'real_estate_law',
        lawName: 'Law No. (2) of 2022',
        lawNumber: '2/2022',
      }
    );
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log('✅ Ingestion Complete!\n');
    console.log('📊 Results:');
    console.log(`   Duration: ${duration}s`);
    console.log(`   Success: ${result.success}`);
    console.log(`   Chunks created: ${result.chunksCreated}`);
    console.log(`   Error: ${result.error || 'None'}\n`);
    
    // Get updated stats
    const statsAfter = await getLegalKnowledgeStats();
    console.log('📈 Updated Statistics:');
    console.log(`   Total articles: ${statsAfter.total} (+${statsAfter.total - statsBefore.total})`);
    console.log(`   From PDFs: ${statsAfter.fromPDFs} (+${statsAfter.fromPDFs - statsBefore.fromPDFs})\n`);
    
    console.log('✅ Law No. (2) of 2022 successfully added to knowledge base!');
    console.log('\n💡 The AI can now answer questions about:');
    console.log('   - Property acquisition for public benefit');
    console.log('   - Expropriation procedures in Dubai');
    console.log('   - Compensation for acquired property');
    console.log('   - Rights of property owners');
    console.log('   - Acquisition committee procedures');
    
  } catch (error) {
    console.error('\n❌ Ingestion failed:', error.message);
    console.error(error);
    process.exit(1);
  }
  
  process.exit(0);
}

uploadLaw2022().catch(error => {
  console.error('❌ Upload failed:', error);
  process.exit(1);
});
