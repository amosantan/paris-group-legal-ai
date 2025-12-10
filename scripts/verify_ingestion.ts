#!/usr/bin/env tsx
import { getAllLegalKnowledge, getLegalKnowledgeStats } from '../server/db';

async function main() {
  console.log('Verifying PDF ingestion into knowledge base...\n');
  
  // Get all entries
  const allEntries = await getAllLegalKnowledge();
  console.log(`✅ Total knowledge base entries: ${allEntries.length}`);
  
  // Get stats
  const stats = await getLegalKnowledgeStats();
  console.log(`\n📊 Knowledge base statistics:`);
  console.log(`  - Total entries: ${stats.totalEntries}`);
  console.log(`  - Total categories: ${stats.totalCategories}`);
  console.log(`  - Total sources: ${stats.totalSources}`);
  
  // Count by category
  const categoryCount: Record<string, number> = {};
  const sourceCount: Record<string, number> = {};
  
  for (const entry of allEntries) {
    categoryCount[entry.category] = (categoryCount[entry.category] || 0) + 1;
    if (entry.source) {
      sourceCount[entry.source] = (sourceCount[entry.source] || 0) + 1;
    }
  }
  
  console.log('\n📊 Entries by category:');
  for (const [category, count] of Object.entries(categoryCount).sort((a, b) => b[1] - a[1])) {
    console.log(`  - ${category}: ${count}`);
  }
  
  console.log('\n📥 Entries by source (top 15):');
  const sortedSources = Object.entries(sourceCount).sort((a, b) => b[1] - a[1]).slice(0, 15);
  for (const [source, count] of sortedSources) {
    console.log(`  - ${source}: ${count}`);
  }
  
  // Sample some PDF-sourced entries
  const pdfEntries = allEntries.filter(e => 
    e.source && (
      e.source.includes('dubailand.gov.ae') || 
      e.source.includes('dlp.dubai.gov.ae') ||
      e.source.includes('moj.gov.ae') ||
      e.source.includes('moet.gov.ae') ||
      e.source.includes('acerislaw.com')
    )
  );
  
  console.log(`\n📄 PDF-sourced entries: ${pdfEntries.length}`);
  console.log('\nSample PDF entries:');
  for (const sample of pdfEntries.slice(0, 5)) {
    console.log(`\n  Law: ${sample.lawName}`);
    console.log(`  Article: ${sample.articleNumber || 'Chunk'}`);
    console.log(`  Category: ${sample.category}`);
    console.log(`  Source: ${sample.source}`);
    console.log(`  Content preview: ${sample.content.substring(0, 100)}...`);
  }
  
  process.exit(0);
}

main().catch(console.error);
