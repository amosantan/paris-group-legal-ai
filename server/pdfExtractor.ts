/**
 * PDF Text Extraction Utility
 * Extracts text content from PDF files for contract analysis
 */

export interface PDFExtractionResult {
  text: string;
  numPages: number;
  info?: {
    Title?: string;
    Author?: string;
    Subject?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: Date;
    ModDate?: Date;
  };
  metadata?: any;
}

/**
 * Extract text from PDF buffer
 * @param buffer - PDF file buffer
 * @returns Extracted text and metadata
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<PDFExtractionResult> {
  try {
    // Dynamic import to handle CJS/ESM compatibility
    const pdfModule = await import('pdf-parse');
    const pdfParse = (pdfModule as any).default || pdfModule;
    const data = await pdfParse(buffer);
    
    return {
      text: data.text,
      numPages: data.numpages,
      info: data.info,
      metadata: data.metadata,
    };
  } catch (error) {
    console.error('[PDF Extraction] Error:', error);
    throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF document.');
  }
}

/**
 * Extract text from PDF URL
 * @param url - URL to PDF file
 * @returns Extracted text and metadata
 */
export async function extractTextFromPDFUrl(url: string): Promise<PDFExtractionResult> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF from URL: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    return await extractTextFromPDF(buffer);
  } catch (error) {
    console.error('[PDF Extraction] Error fetching from URL:', error);
    throw new Error('Failed to download and extract PDF from URL.');
  }
}

/**
 * Clean and normalize extracted text
 * Removes excessive whitespace and normalizes line breaks
 */
export function cleanExtractedText(text: string): string {
  return text
    // Normalize line breaks first
    .replace(/\r\n/g, '\n')
    // Remove multiple consecutive line breaks
    .replace(/\n{3,}/g, '\n\n')
    // Remove excessive whitespace within lines (but preserve line breaks)
    .replace(/[^\S\n]+/g, ' ')
    // Trim whitespace
    .trim();
}

/**
 * Validate PDF file size
 * @param buffer - PDF file buffer
 * @param maxSizeMB - Maximum allowed size in MB (default: 10MB)
 * @returns true if valid, throws error if too large
 */
export function validatePDFSize(buffer: Buffer, maxSizeMB: number = 10): boolean {
  const sizeMB = buffer.length / (1024 * 1024);
  
  if (sizeMB > maxSizeMB) {
    throw new Error(`PDF file is too large (${sizeMB.toFixed(2)}MB). Maximum allowed size is ${maxSizeMB}MB.`);
  }
  
  return true;
}

/**
 * Extract contract-specific information from PDF text
 * Attempts to identify key contract elements
 */
export function extractContractInfo(text: string): {
  hasParties: boolean;
  hasAmount: boolean;
  hasDate: boolean;
  hasDuration: boolean;
  language: 'en' | 'ar' | 'mixed';
} {
  const lowerText = text.toLowerCase();
  
  // Check for common contract elements
  const hasParties = /\b(landlord|tenant|lessor|lessee|party|parties)\b/i.test(text);
  const hasAmount = /\b(aed|dirham|dhs|amount|rent|price)\b/i.test(text);
  const hasDate = /\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}[/-]\d{1,2}[/-]\d{1,2})\b/.test(text);
  const hasDuration = /\b(month|year|term|period|duration)\b/i.test(text);
  
  // Detect language
  const hasArabic = /[\u0600-\u06FF]/.test(text);
  const hasEnglish = /[a-zA-Z]/.test(text);
  
  let language: 'en' | 'ar' | 'mixed' = 'en';
  if (hasArabic && hasEnglish) {
    language = 'mixed';
  } else if (hasArabic) {
    language = 'ar';
  }
  
  return {
    hasParties,
    hasAmount,
    hasDate,
    hasDuration,
    language,
  };
}
