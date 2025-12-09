/**
 * Citation Verification System
 * Validates legal citations against the knowledge base to prevent hallucinations
 */

import { LEGAL_KNOWLEDGE_BASE, searchLegalKnowledge, LegalArticle } from "./legalKnowledgeBase";

export interface CitationMatch {
  lawName: string;
  lawNumber: string;
  articleNumber: string | undefined;
  matchConfidence: number; // 0-100
  exactMatch: boolean;
}

export interface VerificationResult {
  isValid: boolean;
  confidence: number; // 0-100
  matches: CitationMatch[];
  warnings: string[];
}

/**
 * Extract legal citations from AI response text
 * Looks for patterns like "Article 14 of Law 26/2007" or "المادة 14 من القانون رقم 26 لسنة 2007"
 */
export function extractCitations(text: string): string[] {
  const citations: string[] = [];
  
  // English patterns
  const englishPatterns = [
    /Article\s+(\d+[A-Za-z]?)\s+of\s+(?:Law|Federal Law)\s+(?:No\.\s*)?(\d+)(?:\s*of\s*|\/)(\d{4})/gi,
    /Law\s+(?:No\.\s*)?(\d+)(?:\s*of\s*|\/)(\d{4}),?\s*Article\s+(\d+[A-Za-z]?)/gi,
    /(?:Dubai|UAE)\s+(?:Law|Federal Law)\s+(\d+)\/(\d{4})/gi,
  ];
  
  // Arabic patterns
  const arabicPatterns = [
    /المادة\s+(\d+[أ-ي]?)\s+من\s+القانون\s+رقم\s+(\d+)\s+لسنة\s+(\d{4})/g,
    /القانون\s+رقم\s+(\d+)\s+لسنة\s+(\d{4})/g,
  ];
  
  [...englishPatterns, ...arabicPatterns].forEach(pattern => {
    const matches = Array.from(text.matchAll(pattern));
    matches.forEach(match => {
      citations.push(match[0]);
    });
  });
  
  return Array.from(new Set(citations)); // Remove duplicates
}

/**
 * Verify a single citation against the knowledge base
 */
export function verifyCitation(citation: string): VerificationResult {
  const warnings: string[] = [];
  const matches: CitationMatch[] = [];
  
  // Extract law number and article number from citation
  const lawMatch = citation.match(/(?:Law|القانون)\s+(?:No\.\s*)?(?:رقم\s+)?(\d+)/i);
  const articleMatch = citation.match(/(?:Article|المادة)\s+(\d+[A-Za-z]?|[أ-ي]?)/i);
  
  if (!lawMatch) {
    warnings.push(`Could not extract law number from citation: "${citation}"`);
    return { isValid: false, confidence: 0, matches: [], warnings };
  }
  
  const lawNumber = lawMatch[1];
  const articleNumber = articleMatch ? articleMatch[1] : null;
  
  // Search knowledge base for matching articles
  const searchResults = LEGAL_KNOWLEDGE_BASE.filter(article => {
    const lawMatches = article.lawName.includes(lawNumber) || 
                       (article.articleNumber && article.articleNumber.includes(lawNumber));
    
    if (!articleNumber) return lawMatches;
    
    const articleMatches = article.articleNumber === articleNumber ||
                          (article.articleNumber && article.articleNumber.includes(articleNumber));
    
    return lawMatches && articleMatches;
  });
  
  if (searchResults.length === 0) {
    warnings.push(`No matching article found in knowledge base for: "${citation}"`);
    return { isValid: false, confidence: 0, matches: [], warnings };
  }
  
  // Calculate match confidence
  searchResults.forEach(article => {
    const exactLawMatch = article.lawName.includes(`Law ${lawNumber}`) || 
                         article.lawName.includes(`القانون ${lawNumber}`);
    const exactArticleMatch = articleNumber ? article.articleNumber === articleNumber : true;
    
    const matchConfidence = (exactLawMatch ? 60 : 30) + (exactArticleMatch ? 40 : 20);
    
    matches.push({
      lawName: article.lawName,
      lawNumber: article.lawNumber,
      articleNumber: article.articleNumber,
      matchConfidence,
      exactMatch: exactLawMatch && exactArticleMatch,
    });
  });
  
  // Sort by confidence
  matches.sort((a, b) => b.matchConfidence - a.matchConfidence);
  
  const bestMatch = matches[0];
  const isValid = bestMatch.matchConfidence >= 80;
  
  if (!isValid) {
    warnings.push(`Low confidence match (${bestMatch.matchConfidence}%) for citation: "${citation}"`);
  }
  
  return {
    isValid,
    confidence: bestMatch.matchConfidence,
    matches,
    warnings,
  };
}

/**
 * Verify all citations in an AI response
 */
export function verifyAllCitations(responseText: string): {
  allValid: boolean;
  overallConfidence: number;
  citationCount: number;
  verifiedCount: number;
  results: Array<{ citation: string; verification: VerificationResult }>;
  warnings: string[];
} {
  const citations = extractCitations(responseText);
  const results: Array<{ citation: string; verification: VerificationResult }> = [];
  const allWarnings: string[] = [];
  
  if (citations.length === 0) {
    // No citations found - this might be okay for general information
    return {
      allValid: true,
      overallConfidence: 100,
      citationCount: 0,
      verifiedCount: 0,
      results: [],
      warnings: ["No legal citations found in response"],
    };
  }
  
  let totalConfidence = 0;
  let verifiedCount = 0;
  
  citations.forEach(citation => {
    const verification = verifyCitation(citation);
    results.push({ citation, verification });
    
    if (verification.isValid) {
      verifiedCount++;
      totalConfidence += verification.confidence;
    }
    
    allWarnings.push(...verification.warnings);
  });
  
  const overallConfidence = citations.length > 0 
    ? Math.round(totalConfidence / citations.length) 
    : 0;
  
  const allValid = verifiedCount === citations.length;
  
  return {
    allValid,
    overallConfidence,
    citationCount: citations.length,
    verifiedCount,
    results,
    warnings: allWarnings,
  };
}

/**
 * Calculate grounding score - percentage of response backed by knowledge base
 * This helps detect hallucinations
 */
export function calculateGroundingScore(responseText: string, usedArticles: LegalArticle[]): number {
  // Split response into sentences
  const sentences = responseText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (sentences.length === 0) return 0;
  
  // Count how many sentences contain verifiable legal information
  let groundedSentences = 0;
  
  sentences.forEach(sentence => {
    // Check if sentence contains legal terminology or citations
    const hasLegalTerms = /(?:article|law|regulation|provision|clause|statute|المادة|القانون|اللائحة)/i.test(sentence);
    const hasCitation = extractCitations(sentence).length > 0;
    
    // Check if sentence content matches any article in knowledge base
    const matchesKnowledge = usedArticles.some(article => {
      // Simple keyword matching (can be improved with semantic similarity)
      const keywords = sentence.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      const articleText = (article.contentEn + " " + (article.contentAr || "")).toLowerCase();
      
      const matchCount = keywords.filter(kw => articleText.includes(kw)).length;
      return matchCount >= 2; // At least 2 keywords match
    });
    
    if (hasCitation || (hasLegalTerms && matchesKnowledge)) {
      groundedSentences++;
    }
  });
  
  return Math.round((groundedSentences / sentences.length) * 100);
}

/**
 * Generate citation report for AI response
 */
export function generateCitationReport(responseText: string, usedArticles: LegalArticle[]): {
  citationVerification: ReturnType<typeof verifyAllCitations>;
  groundingScore: number;
  recommendations: string[];
} {
  const citationVerification = verifyAllCitations(responseText);
  const groundingScore = calculateGroundingScore(responseText, usedArticles);
  const recommendations: string[] = [];
  
  // Generate recommendations based on scores
  if (citationVerification.overallConfidence < 70) {
    recommendations.push("⚠️ Low citation confidence - verify legal references manually");
  }
  
  if (groundingScore < 60) {
    recommendations.push("⚠️ Low grounding score - response may contain unverified claims");
    recommendations.push("🔍 Recommend lawyer review before relying on this advice");
  }
  
  if (citationVerification.citationCount === 0 && responseText.length > 200) {
    recommendations.push("📚 No legal citations provided - consider requesting specific article references");
  }
  
  if (!citationVerification.allValid) {
    recommendations.push("❌ Some citations could not be verified - check knowledge base coverage");
  }
  
  if (citationVerification.overallConfidence >= 90 && groundingScore >= 80) {
    recommendations.push("✅ High confidence - response is well-grounded in legal sources");
  }
  
  return {
    citationVerification,
    groundingScore,
    recommendations,
  };
}
