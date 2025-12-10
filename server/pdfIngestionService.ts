/**
 * PDF Ingestion Service
 * 
 * Handles downloading, extracting, chunking, and storing legal PDFs
 * into the knowledge base for RAG (Retrieval-Augmented Generation)
 */

import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, unlink } from "fs/promises";
import { randomBytes } from "crypto";
import * as db from "./db";

const execAsync = promisify(exec);

export interface PDFChunk {
  lawName: string;
  lawNumber: string;
  articleNumber?: string;
  titleEn: string;
  titleAr?: string;
  contentEn: string;
  contentAr?: string;
  category: string;
  keywords: string[];
  sourceUrl?: string;
  sourceFileName: string;
  chunkIndex: number;
  totalChunks: number;
  pageNumber?: number;
}

export interface ChunkingOptions {
  chunkSize?: number; // Target words per chunk (default: 500)
  overlap?: number; // Overlap words between chunks (default: 50)
  language?: "en" | "ar" | "both";
}

/**
 * Extract text from PDF file or URL
 */
export async function extractTextFromPDF(pdfSource: string | Buffer): Promise<string> {
  const tempFile = `/tmp/pdf-${randomBytes(8).toString('hex')}.pdf`;
  
  try {
    // Write PDF to temp file
    if (typeof pdfSource === 'string') {
      // Download from URL
      const response = await fetch(pdfSource);
      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      await writeFile(tempFile, buffer);
    } else {
      // Use provided buffer
      await writeFile(tempFile, pdfSource);
    }

    // Extract text using pdftotext (from poppler-utils, pre-installed)
    const { stdout } = await execAsync(`pdftotext -layout "${tempFile}" -`);
    
    return stdout.trim();
  } catch (error) {
    console.error('[PDF Extraction] Failed:', error);
    throw new Error(`PDF text extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    // Clean up temp file
    try {
      await unlink(tempFile);
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

/**
 * Split text into chunks with overlap
 */
export function chunkText(text: string, options: ChunkingOptions = {}): string[] {
  const chunkSize = options.chunkSize || 500; // words
  const overlap = options.overlap || 50; // words
  
  // Split into words
  const words = text.split(/\s+/).filter(w => w.length > 0);
  
  if (words.length === 0) {
    return [];
  }
  
  const chunks: string[] = [];
  let currentIndex = 0;
  
  while (currentIndex < words.length) {
    const chunkWords = words.slice(currentIndex, currentIndex + chunkSize);
    chunks.push(chunkWords.join(' '));
    
    // Move forward by (chunkSize - overlap) to create overlap
    currentIndex += (chunkSize - overlap);
    
    // Prevent infinite loop if overlap >= chunkSize
    if (currentIndex <= chunks.length * overlap) {
      currentIndex = chunks.length * chunkSize;
    }
  }
  
  return chunks;
}

/**
 * Extract keywords from text chunk
 */
export function extractKeywords(text: string): string[] {
  // Common legal terms to prioritize
  const legalTerms = [
    'tenant', 'landlord', 'lease', 'rent', 'eviction', 'contract', 'agreement',
    'property', 'real estate', 'mortgage', 'RERA', 'Dubai', 'UAE', 'law',
    'article', 'regulation', 'decree', 'federal', 'emirate', 'DIFC',
    'dispute', 'court', 'tribunal', 'notice', 'termination', 'renewal',
    'deposit', 'security', 'maintenance', 'repair', 'damage', 'liability'
  ];
  
  const textLower = text.toLowerCase();
  const foundKeywords: string[] = [];
  
  // Find legal terms
  for (const term of legalTerms) {
    if (textLower.includes(term.toLowerCase())) {
      foundKeywords.push(term);
    }
  }
  
  // Extract numbers (likely article/law numbers)
  const numbers = text.match(/\b\d+\/\d+\b|\b\d{4}\b/g) || [];
  foundKeywords.push(...numbers);
  
  // Remove duplicates and limit to 20 keywords
  return Array.from(new Set(foundKeywords)).slice(0, 20);
}

/**
 * Detect law name and number from text
 */
export function detectLawInfo(text: string, filename: string): { lawName: string; lawNumber: string } {
  const textLower = text.toLowerCase();
  const filenameLower = filename.toLowerCase();
  
  // Try to extract from text
  const lawPatterns = [
    /law\s+no\.?\s*(\d+\/\d+)/i,
    /federal\s+law\s+no\.?\s*(\d+)\s+of\s+(\d{4})/i,
    /decree\s+no\.?\s*(\d+\/\d+)/i,
  ];
  
  for (const pattern of lawPatterns) {
    const match = text.match(pattern);
    if (match) {
      return {
        lawName: match[0],
        lawNumber: match[1] || `${match[1]}/${match[2]}`
      };
    }
  }
  
  // Fallback: use filename
  if (filenameLower.includes('rental')) {
    return { lawName: 'Dubai Rental Law', lawNumber: '26/2007' };
  } else if (filenameLower.includes('labor') || filenameLower.includes('labour')) {
    return { lawName: 'UAE Labor Law', lawNumber: '8/1980' };
  } else if (filenameLower.includes('commercial')) {
    return { lawName: 'UAE Commercial Law', lawNumber: '18/1993' };
  } else if (filenameLower.includes('civil')) {
    return { lawName: 'UAE Civil Code', lawNumber: '5/1985' };
  } else if (filenameLower.includes('difc')) {
    return { lawName: 'DIFC Law', lawNumber: 'DIFC' };
  }
  
  return { lawName: filename.replace(/\.pdf$/i, ''), lawNumber: 'Unknown' };
}

/**
 * Detect category from text and filename
 */
export function detectCategory(text: string, filename: string): string {
  const combined = (text + ' ' + filename).toLowerCase();
  
  if (combined.includes('rental') || combined.includes('lease') || combined.includes('tenant')) {
    return 'rental_law';
  } else if (combined.includes('labor') || combined.includes('labour') || combined.includes('employment')) {
    return 'labor_law';
  } else if (combined.includes('commercial') || combined.includes('company') || combined.includes('business')) {
    return 'commercial_law';
  } else if (combined.includes('civil code') || combined.includes('civil transaction')) {
    return 'civil_code';
  } else if (combined.includes('difc')) {
    return 'difc_law';
  } else if (combined.includes('rera') || combined.includes('real estate regulatory')) {
    return 'rera_regulation';
  } else if (combined.includes('escrow')) {
    return 'escrow_law';
  } else if (combined.includes('real estate') || combined.includes('property')) {
    return 'real_estate_law';
  }
  
  return 'other';
}

/**
 * Process PDF and create chunks ready for database insertion
 */
export async function processPDF(
  pdfSource: string | Buffer,
  metadata: {
    filename: string;
    sourceUrl?: string;
    lawName?: string;
    lawNumber?: string;
    category?: string;
  },
  options: ChunkingOptions = {}
): Promise<PDFChunk[]> {
  console.log(`[PDF Ingestion] Processing: ${metadata.filename}`);
  
  // Extract text
  const extractedText = await extractTextFromPDF(pdfSource);
  
  if (!extractedText || extractedText.length < 100) {
    throw new Error('PDF contains insufficient text content');
  }
  
  console.log(`[PDF Ingestion] Extracted ${extractedText.length} characters`);
  
  // Detect law info if not provided
  const lawInfo = metadata.lawName && metadata.lawNumber
    ? { lawName: metadata.lawName, lawNumber: metadata.lawNumber }
    : detectLawInfo(extractedText, metadata.filename);
  
  // Detect category if not provided
  const category = metadata.category || detectCategory(extractedText, metadata.filename);
  
  // Chunk the text
  const chunks = chunkText(extractedText, options);
  console.log(`[PDF Ingestion] Created ${chunks.length} chunks`);
  
  // Create PDFChunk objects
  const pdfChunks: PDFChunk[] = chunks.map((chunkText, index) => {
    const keywords = extractKeywords(chunkText);
    
    return {
      lawName: lawInfo.lawName,
      lawNumber: lawInfo.lawNumber,
      articleNumber: `Chunk ${index + 1}`,
      titleEn: `${lawInfo.lawName} - Part ${index + 1} of ${chunks.length}`,
      contentEn: chunkText,
      category,
      keywords,
      sourceUrl: metadata.sourceUrl,
      sourceFileName: metadata.filename,
      chunkIndex: index,
      totalChunks: chunks.length,
    };
  });
  
  return pdfChunks;
}

/**
 * Ingest PDF into knowledge base
 */
export async function ingestPDF(
  pdfSource: string | Buffer,
  metadata: {
    filename: string;
    sourceUrl?: string;
    lawName?: string;
    lawNumber?: string;
    category?: string;
  },
  options: ChunkingOptions = {}
): Promise<{ success: boolean; chunksCreated: number; error?: string }> {
  try {
    const chunks = await processPDF(pdfSource, metadata, options);
    
    // Insert chunks into database and generate embeddings
    let insertedCount = 0;
    const { generateEmbedding, prepareTextForEmbedding } = await import("./vectorEmbeddings");
    const { storeEmbedding } = await import("./vectorDatabase");
    
    for (const chunk of chunks) {
      const articleId = await db.createLegalKnowledge({
        lawName: chunk.lawName,
        lawNumber: chunk.lawNumber,
        articleNumber: chunk.articleNumber || '',
        titleEn: chunk.titleEn,
        titleAr: chunk.titleAr,
        contentEn: chunk.contentEn,
        contentAr: chunk.contentAr,
        category: chunk.category as any,
        keywords: JSON.stringify(chunk.keywords),
        sourceType: chunk.sourceUrl ? 'pdf_url' : 'pdf_upload',
        sourceUrl: chunk.sourceUrl,
        sourceFileName: chunk.sourceFileName,
        chunkIndex: chunk.chunkIndex,
        totalChunks: chunk.totalChunks,
        pageNumber: chunk.pageNumber,
      });
      insertedCount++;
      
      // Generate and store embedding for the new article
      try {
        const textForEmbedding = prepareTextForEmbedding(
          chunk.titleEn,
          chunk.contentEn,
          {
            lawName: chunk.lawName,
            lawNumber: chunk.lawNumber,
            articleNumber: chunk.articleNumber,
            category: chunk.category,
          }
        );
        const embedding = await generateEmbedding(textForEmbedding);
        await storeEmbedding(articleId, embedding);
        console.log(`[PDF Ingestion] Generated embedding for chunk ${insertedCount}/${chunks.length}`);
      } catch (embeddingError) {
        console.error(`[PDF Ingestion] Failed to generate embedding for chunk ${insertedCount}:`, embeddingError);
        // Continue even if embedding fails
      }
    }
    
    console.log(`[PDF Ingestion] Successfully ingested ${insertedCount} chunks from ${metadata.filename}`);
    
    return {
      success: true,
      chunksCreated: insertedCount
    };
  } catch (error) {
    console.error('[PDF Ingestion] Failed:', error);
    return {
      success: false,
      chunksCreated: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
