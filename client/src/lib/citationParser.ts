/**
 * Citation Parser Utility
 * 
 * Detects and extracts legal citations from AI-generated text responses.
 * Supports various citation formats for UAE laws.
 */

export interface ParsedCitation {
  originalText: string;
  articleNumber: string;
  lawName: string;
  category: string;
  startIndex: number;
  endIndex: number;
}

/**
 * Citation patterns to match various formats:
 * - "Article 123 of UAE Civil Code"
 * - "UAE Civil Code Article 123"
 * - "Federal Law No. 5 of 1985 Article 123"
 * - "Dubai Law No. 26 of 2007 Article 123"
 * - "Article 123"
 */
const CITATION_PATTERNS = [
  // "Article 123 of [Law Name]"
  /Article\s+(\d+(?:[A-Za-z])?)\s+of\s+(?:the\s+)?([A-Za-z\s\d\/\(\)]+?)(?:\s*[,.]|\s*$)/gi,
  
  // "[Law Name] Article 123"
  /((?:UAE|Dubai|Federal|DIFC)\s+[A-Za-z\s\d\/\(\)]+?)\s+Article\s+(\d+(?:[A-Za-z])?)/gi,
  
  // "Federal Law No. X of YYYY Article 123"
  /(Federal\s+Law\s+No\.\s*\d+\s+of\s+\d{4})\s+Article\s+(\d+(?:[A-Za-z])?)/gi,
  
  // "Dubai Law No. X of YYYY Article 123"
  /(Dubai\s+Law\s+No\.\s*\d+\s+of\s+\d{4})\s+Article\s+(\d+(?:[A-Za-z])?)/gi,
];

/**
 * Law name to category mapping
 */
const LAW_CATEGORY_MAP: Record<string, string> = {
  "civil code": "civil_code",
  "commercial": "commercial_law",
  "rental": "rental_law",
  "tenancy": "rental_law",
  "lease": "rental_law",
  "labor": "labor_law",
  "employment": "labor_law",
  "real estate": "real_estate_law",
  "property": "real_estate_law",
  "rera": "rera_regulation",
  "escrow": "escrow_law",
  "difc": "difc_law",
  "strata": "real_estate_law",
  "mortgage": "real_estate_law",
};

/**
 * Detect category from law name
 */
function detectCategory(lawName: string): string {
  const lowerLawName = lawName.toLowerCase();
  
  for (const [keyword, category] of Object.entries(LAW_CATEGORY_MAP)) {
    if (lowerLawName.includes(keyword)) {
      return category;
    }
  }
  
  return "civil_code"; // Default category
}

/**
 * Clean and normalize law name
 */
function cleanLawName(lawName: string): string {
  return lawName
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[,.]$/, "");
}

/**
 * Parse citations from text
 */
export function parseCitations(text: string): ParsedCitation[] {
  const citations: ParsedCitation[] = [];
  const seen = new Set<string>(); // Prevent duplicates

  for (const pattern of CITATION_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;

    while ((match = regex.exec(text)) !== null) {
      let articleNumber: string;
      let lawName: string;

      // Different patterns have different capture group orders
      if (pattern.source.includes("Article\\s+\\(\\d+")) {
        // Pattern: "Article 123 of [Law Name]"
        articleNumber = match[1];
        lawName = cleanLawName(match[2]);
      } else {
        // Pattern: "[Law Name] Article 123"
        lawName = cleanLawName(match[1]);
        articleNumber = match[2];
      }

      const category = detectCategory(lawName);
      const key = `${articleNumber}-${lawName}`;

      // Skip duplicates
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);

      citations.push({
        originalText: match[0],
        articleNumber,
        lawName,
        category,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
      });
    }
  }

  // Sort by position in text
  return citations.sort((a, b) => a.startIndex - b.startIndex);
}

/**
 * Split text into segments with citations
 */
export interface TextSegment {
  type: "text" | "citation";
  content: string;
  citation?: ParsedCitation;
}

export function splitTextWithCitations(text: string): TextSegment[] {
  const citations = parseCitations(text);
  
  if (citations.length === 0) {
    return [{ type: "text", content: text }];
  }

  const segments: TextSegment[] = [];
  let lastIndex = 0;

  for (const citation of citations) {
    // Add text before citation
    if (citation.startIndex > lastIndex) {
      segments.push({
        type: "text",
        content: text.substring(lastIndex, citation.startIndex),
      });
    }

    // Add citation segment
    segments.push({
      type: "citation",
      content: citation.originalText,
      citation,
    });

    lastIndex = citation.endIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      type: "text",
      content: text.substring(lastIndex),
    });
  }

  return segments;
}

/**
 * Check if text contains citations
 */
export function hasCitations(text: string): boolean {
  return parseCitations(text).length > 0;
}
