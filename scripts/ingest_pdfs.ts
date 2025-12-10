#!/usr/bin/env tsx
/**
 * Ingest downloaded UAE legal PDFs into the knowledge base
 */
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { ingestPDF } from '../server/pdfIngestionService';

// PDF directory
const pdfDir = '/home/ubuntu/uae_legal_pdfs';

// Metadata for each PDF
const pdfMetadata: Record<string, {
  lawName: string;
  lawNumber: string;
  category: 'rental_law' | 'civil_code' | 'escrow_law' | 'strata_law' | 'rera_regulation' | 'real_estate_law' | 'procedures' | 'other' | 'difc_law' | 'mortgage_law' | 'property_registration' | 'labor_law' | 'commercial_law';
  source: string;
}> = {
  'Abu_Dhabi_Real_Estate_Law_3_2015.pdf': {
    lawName: 'Abu Dhabi Law No. (3) of 2015 - Real Estate Sector Regulation',
    lawNumber: '3/2015',
    category: 'real_estate_law',
    source: 'Abu Dhabi Government - services.dari.ae'
  },
  'Abu_Dhabi_Rental_Law_20_2006.pdf': {
    lawName: 'Abu Dhabi Law No. 20 of 2006 - Leasing Relations',
    lawNumber: '20/2006',
    category: 'rental_law',
    source: 'Abu Dhabi Government - services.dari.ae'
  },
  'Dubai_Real_Estate_Legislation.pdf': {
    lawName: 'Dubai Real Estate Legislation Compilation',
    lawNumber: 'COMPILATION',
    category: 'real_estate_law',
    source: 'Dubai Land Department - dubailand.gov.ae'
  },
  'Dubai_Rental_Law_26_2007.pdf': {
    lawName: 'Dubai Law No. (26) of 2007 - Landlord-Tenant Relations',
    lawNumber: '26/2007',
    category: 'rental_law',
    source: 'Dubai Legislation Portal - dlp.dubai.gov.ae'
  },
  'Dubai_Rental_Law_Amendment_33_2008.pdf': {
    lawName: 'Dubai Law No. (33) of 2008 - Rental Law Amendment',
    lawNumber: '33/2008',
    category: 'rental_law',
    source: 'Dubai Legislation Portal - dlp.dubai.gov.ae'
  },
  'Dubai_Tenancy_Guide.pdf': {
    lawName: 'Dubai Tenancy Guide - RERA',
    lawNumber: 'GUIDE',
    category: 'rental_law',
    source: 'RERA - Dubai Land Department'
  },
  'UAE_Civil_Code_Aceris.pdf': {
    lawName: 'UAE Civil Code - Federal Law No. 5 of 1985',
    lawNumber: '5/1985',
    category: 'civil_code',
    source: 'Aceris Law - acerislaw.com'
  },
  'UAE_Civil_Code_Amendment_30_2020.pdf': {
    lawName: 'Federal Decree Law No. (30) of 2020 - Civil Code Amendment',
    lawNumber: '30/2020',
    category: 'civil_code',
    source: 'Ministry of Justice - moj.gov.ae'
  },
  'UAE_Civil_Code_English_Translation.pdf': {
    lawName: 'UAE Civil Code - English Translation',
    lawNumber: '5/1985',
    category: 'civil_code',
    source: 'Lex Emirati'
  },
  'UAE_Commercial_Companies_Law_32_2021.pdf': {
    lawName: 'Federal Decree-Law No. (32) of 2021 - Commercial Companies Law',
    lawNumber: '32/2021',
    category: 'commercial_law',
    source: 'Ministry of Economy - moet.gov.ae'
  },
  'UAE_Commercial_Transactions_Law_50_2022.pdf': {
    lawName: 'Federal Decree-Law No. 50/2022 - Commercial Transactions Law',
    lawNumber: '50/2022',
    category: 'commercial_law',
    source: 'Ministry of Economy - moet.gov.ae'
  },
  'UAE_Federal_Decrees_MOJ.pdf': {
    lawName: 'Decrees of Federal Laws - Ministry of Justice Compilation',
    lawNumber: 'COMPILATION',
    category: 'other',
    source: 'Ministry of Justice - moj.gov.ae'
  },
  'UAE_Labour_Law_8_1980.pdf': {
    lawName: 'UAE Labour Law - Federal Law No. (8) of 1980',
    lawNumber: '8/1980',
    category: 'labor_law',
    source: 'ILO Natlex - natlex.ilo.org'
  },
};

async function main() {
  // Get all PDFs
  const pdfFiles = readdirSync(pdfDir).filter(f => f.endsWith('.pdf')).sort();
  
  console.log(`Found ${pdfFiles.length} PDFs to ingest\n`);
  
  // Ingest each PDF
  const ingested: any[] = [];
  const failed: any[] = [];
  
  for (const filename of pdfFiles) {
    const metadata = pdfMetadata[filename] || {
      lawName: filename.replace('.pdf', '').replace(/_/g, ' '),
      lawNumber: 'UNKNOWN',
      category: 'other' as const,
      source: 'Downloaded'
    };
    
    console.log('='.repeat(80));
    console.log(`Ingesting: ${metadata.lawName}`);
    console.log(`File: ${filename}`);
    console.log(`Category: ${metadata.category}`);
    console.log(`Source: ${metadata.source}`);
    
    try {
      // Read PDF file
      const pdfPath = join(pdfDir, filename);
      const pdfBytes = readFileSync(pdfPath);
      
      // Ingest using the service
      const result = await ingestPDF(
        pdfBytes,
        {
          filename,
          sourceUrl: metadata.source,
          lawName: metadata.lawName,
          lawNumber: metadata.lawNumber,
          category: metadata.category,
        }
      );
      
      console.log(`✅ Successfully ingested!`);
      console.log(`   Chunks created: ${result.chunksCreated}`);
      console.log(`   Total characters: ${result.totalCharacters.toLocaleString()}`);
      console.log();
      
      ingested.push({
        filename,
        lawName: metadata.lawName,
        chunksCreated: result.chunksCreated,
        totalCharacters: result.totalCharacters
      });
      
    } catch (error: any) {
      console.log(`❌ Failed to ingest: ${error.message}`);
      console.log();
      failed.push({
        filename,
        lawName: metadata.lawName,
        error: error.message
      });
    }
  }
  
  // Summary
  console.log('='.repeat(80));
  console.log('INGESTION SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Successfully ingested: ${ingested.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (ingested.length > 0) {
    const totalChunks = ingested.reduce((sum, item) => sum + item.chunksCreated, 0);
    const totalChars = ingested.reduce((sum, item) => sum + item.totalCharacters, 0);
    
    console.log(`\n📊 Statistics:`);
    console.log(`   Total chunks created: ${totalChunks.toLocaleString()}`);
    console.log(`   Total characters: ${totalChars.toLocaleString()}`);
    console.log(`   Average chunk size: ${totalChunks > 0 ? Math.round(totalChars / totalChunks) : 0} chars`);
    
    console.log(`\n📥 Ingested documents:`);
    for (const item of ingested) {
      console.log(`  - ${item.lawName}: ${item.chunksCreated} chunks`);
    }
  }
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed ingestions:`);
    for (const item of failed) {
      console.log(`  - ${item.lawName}`);
      console.log(`    Error: ${item.error}`);
    }
  }
  
  // Save summary
  const summary = {
    ingested,
    failed,
    total_attempted: pdfFiles.length,
    success_count: ingested.length,
    failure_count: failed.length,
    total_chunks: ingested.reduce((sum: number, item: any) => sum + item.chunksCreated, 0),
    total_characters: ingested.reduce((sum: number, item: any) => sum + item.totalCharacters, 0)
  };
  
  const summaryPath = join(pdfDir, 'ingestion_summary.json');
  writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  console.log(`\n📊 Summary saved to: ${summaryPath}`);
}

main().catch(console.error);
