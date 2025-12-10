import { invokeUnifiedLLM } from "./_core/unifiedLLM";

/**
 * Image Recognition System for Document Processing
 * 
 * Extracts text from images of legal documents using:
 * - Vision-capable LLM for OCR
 * - Document structure analysis
 * - Text extraction and formatting
 */

export interface ImageOCRResult {
  text: string;
  confidence: number;
  documentType?: string;
  language?: string;
  warnings: string[];
}

/**
 * Extract text from document image using vision LLM
 * 
 * @param imageUrl - URL to the uploaded image
 * @param documentHint - Optional hint about document type (e.g., "contract", "title deed")
 * @returns Extracted text and metadata
 */
export async function extractTextFromImage(
  imageUrl: string,
  documentHint?: string
): Promise<ImageOCRResult> {
  const warnings: string[] = [];

  try {
    const prompt = documentHint
      ? `Extract all text from this ${documentHint} image. Preserve the structure and formatting. If the text is in Arabic, preserve the Arabic text. Return the extracted text exactly as it appears.`
      : `Extract all text from this document image. Preserve the structure and formatting. If the text is in Arabic, preserve the Arabic text. Return the extracted text exactly as it appears.`;

    const response = await invokeUnifiedLLM({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "high", // Use high detail for better OCR accuracy
              },
            },
          ],
        },
      ],
    });

    const extractedText =
      typeof response.choices[0]?.message?.content === "string"
        ? response.choices[0]?.message?.content
        : "";

    if (!extractedText || extractedText.length < 10) {
      warnings.push("Very little text extracted. Image may be low quality or empty.");
    }

    // Detect document type from content
    const documentType = detectDocumentType(extractedText);

    // Detect language
    const language = detectLanguage(extractedText);

    // Calculate confidence based on text length and quality indicators
    const confidence = calculateOCRConfidence(extractedText, warnings);

    return {
      text: extractedText,
      confidence,
      documentType,
      language,
      warnings,
    };
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw new Error(
      "Failed to extract text from image. Please ensure the image is clear and try again."
    );
  }
}

/**
 * Detect document type from extracted text
 */
function detectDocumentType(text: string): string | undefined {
  const lowerText = text.toLowerCase();

  if (
    lowerText.includes("tenancy contract") ||
    lowerText.includes("lease agreement") ||
    lowerText.includes("ejari")
  ) {
    return "tenancy_contract";
  }

  if (
    lowerText.includes("title deed") ||
    lowerText.includes("property deed") ||
    lowerText.includes("dubai land department")
  ) {
    return "title_deed";
  }

  if (
    lowerText.includes("eviction notice") ||
    lowerText.includes("notice to vacate")
  ) {
    return "eviction_notice";
  }

  if (
    lowerText.includes("demand letter") ||
    lowerText.includes("payment demand")
  ) {
    return "demand_letter";
  }

  if (
    lowerText.includes("no objection") ||
    lowerText.includes("noc") ||
    lowerText.includes("certificate")
  ) {
    return "noc";
  }

  if (
    lowerText.includes("mortgage") ||
    lowerText.includes("loan agreement")
  ) {
    return "mortgage_document";
  }

  return undefined;
}

/**
 * Detect language from text
 */
function detectLanguage(text: string): string {
  // Simple heuristic: check for Arabic characters
  const arabicPattern = /[\u0600-\u06FF]/;
  const hasArabic = arabicPattern.test(text);

  const englishPattern = /[a-zA-Z]/;
  const hasEnglish = englishPattern.test(text);

  if (hasArabic && hasEnglish) {
    return "bilingual";
  }
  if (hasArabic) {
    return "ar";
  }
  if (hasEnglish) {
    return "en";
  }

  return "unknown";
}

/**
 * Calculate OCR confidence score
 */
function calculateOCRConfidence(text: string, warnings: string[]): number {
  let confidence = 100;

  // Reduce confidence for very short text
  if (text.length < 50) {
    confidence -= 30;
  } else if (text.length < 100) {
    confidence -= 15;
  }

  // Reduce confidence for each warning
  confidence -= warnings.length * 10;

  // Check for garbled text indicators
  const garbledIndicators = [
    /\s{5,}/, // Multiple consecutive spaces
    /[^\w\s\u0600-\u06FF.,!?;:()\-"'\/]{5,}/, // Long sequences of special characters
  ];

  garbledIndicators.forEach((pattern) => {
    if (pattern.test(text)) {
      confidence -= 15;
    }
  });

  return Math.max(0, Math.min(100, confidence));
}

/**
 * Validate image file before OCR
 */
export function validateImageFile(fileSize: number, mimeType: string): boolean {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB limit
  const SUPPORTED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
  ];

  if (fileSize > MAX_SIZE) {
    throw new Error(
      `Image file too large. Maximum size is 10MB. Your file is ${Math.round(fileSize / 1024 / 1024)}MB.`
    );
  }

  if (!SUPPORTED_TYPES.includes(mimeType.toLowerCase())) {
    throw new Error(
      `Unsupported image format: ${mimeType}. Supported formats: JPEG, PNG, WebP, HEIC.`
    );
  }

  return true;
}

/**
 * Process multiple images (e.g., multi-page document)
 */
export async function extractTextFromMultipleImages(
  imageUrls: string[],
  documentHint?: string
): Promise<ImageOCRResult> {
  const results: ImageOCRResult[] = [];

  for (const imageUrl of imageUrls) {
    const result = await extractTextFromImage(imageUrl, documentHint);
    results.push(result);
  }

  // Combine results
  const combinedText = results.map((r) => r.text).join("\n\n---PAGE BREAK---\n\n");
  const avgConfidence =
    results.reduce((sum, r) => sum + r.confidence, 0) / results.length;
  const allWarnings = results.flatMap((r) => r.warnings);

  // Use document type from first page
  const documentType = results[0]?.documentType;
  const language = results[0]?.language;

  return {
    text: combinedText,
    confidence: Math.round(avgConfidence),
    documentType,
    language,
    warnings: allWarnings,
  };
}
