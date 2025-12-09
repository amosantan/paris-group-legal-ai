/**
 * Confidence Scoring System
 * Calculates confidence scores for AI legal responses based on multiple factors
 */

import { LegalArticle } from "./legalKnowledgeBase";

export interface ConfidenceFactors {
  knowledgeBaseCoverage: number; // 0-100: How well the topic is covered in KB
  relevantArticlesCount: number; // Number of relevant articles found
  legalClarityScore: number; // 0-100: How clear/ambiguous the legal provisions are
  queryComplexityScore: number; // 0-100: How complex the user's query is (inverse)
}

export interface ConfidenceScore {
  overall: number; // 0-100: Overall confidence
  level: "very_high" | "high" | "medium" | "low" | "very_low";
  factors: ConfidenceFactors;
  recommendations: string[];
  requiresLawyerReview: boolean;
}

/**
 * Calculate knowledge base coverage score
 * Measures how comprehensively the topic is covered in the knowledge base
 */
function calculateKnowledgeBaseCoverage(
  query: string,
  relevantArticles: LegalArticle[]
): number {
  if (relevantArticles.length === 0) return 0;
  
  // Extract key legal topics from query
  const topics = extractLegalTopics(query);
  
  if (topics.length === 0) return 50; // Generic query
  
  // Check how many topics are covered by relevant articles
  let coveredTopics = 0;
  topics.forEach(topic => {
    const isCovered = relevantArticles.some(article => 
      article.keywords.some(kw => kw.toLowerCase().includes(topic.toLowerCase())) ||
      article.contentEn.toLowerCase().includes(topic.toLowerCase())
    );
    if (isCovered) coveredTopics++;
  });
  
  return Math.round((coveredTopics / topics.length) * 100);
}

/**
 * Extract legal topics from query
 */
function extractLegalTopics(query: string): string[] {
  const topics: string[] = [];
  
  // Common legal topics in real estate/rental
  const topicKeywords = {
    rent: ["rent", "rental", "lease", "tenancy", "إيجار"],
    eviction: ["evict", "eviction", "terminate", "termination", "إخلاء"],
    deposit: ["deposit", "security", "تأمين"],
    maintenance: ["maintenance", "repair", "صيانة"],
    increase: ["increase", "raise", "زيادة"],
    contract: ["contract", "agreement", "عقد"],
    property: ["property", "real estate", "عقار"],
    offplan: ["off-plan", "off plan", "developer", "على الخارطة"],
    escrow: ["escrow", "حساب ضمان"],
    rera: ["rera", "هيئة"],
    dispute: ["dispute", "conflict", "نزاع"],
    payment: ["payment", "pay", "دفع"],
  };
  
  const lowerQuery = query.toLowerCase();
  
  Object.entries(topicKeywords).forEach(([topic, keywords]) => {
    if (keywords.some(kw => lowerQuery.includes(kw.toLowerCase()))) {
      topics.push(topic);
    }
  });
  
  return topics;
}

/**
 * Calculate legal clarity score
 * Measures how clear and unambiguous the legal provisions are
 */
function calculateLegalClarityScore(relevantArticles: LegalArticle[]): number {
  if (relevantArticles.length === 0) return 0;
  
  let totalClarity = 0;
  
  relevantArticles.forEach(article => {
    let articleClarity = 100; // Start with perfect clarity
    
    // Reduce clarity for ambiguous language
    const ambiguousTerms = [
      "may", "might", "could", "reasonable", "appropriate", "sufficient",
      "adequate", "necessary", "as applicable", "where applicable",
      "قد", "ممكن", "مناسب", "كاف"
    ];
    
    const content = article.contentEn.toLowerCase();
    ambiguousTerms.forEach(term => {
      if (content.includes(term)) articleClarity -= 5;
    });
    
    // Increase clarity for specific numbers, dates, percentages
    const hasSpecifics = /\d+%|\d+ days?|\d+ months?|AED \d+/.test(article.contentEn);
    if (hasSpecifics) articleClarity += 10;
    
    // Increase clarity if there's a practical example
    if (article.practicalExample) articleClarity += 15;
    
    totalClarity += Math.max(0, Math.min(100, articleClarity));
  });
  
  return Math.round(totalClarity / relevantArticles.length);
}

/**
 * Calculate query complexity score
 * Measures how complex the user's legal question is
 */
function calculateQueryComplexityScore(query: string): number {
  let complexity = 50; // Start with medium complexity
  
  // Increase complexity for multiple legal issues
  const topics = extractLegalTopics(query);
  if (topics.length > 2) complexity += 15;
  if (topics.length > 4) complexity += 15;
  
  // Increase complexity for conditional/hypothetical questions
  const conditionalTerms = ["if", "what if", "suppose", "assuming", "إذا", "لو"];
  if (conditionalTerms.some(term => query.toLowerCase().includes(term))) {
    complexity += 10;
  }
  
  // Increase complexity for multi-party situations
  const multiPartyTerms = ["and", "both", "all parties", "multiple", "several"];
  if (multiPartyTerms.some(term => query.toLowerCase().includes(term))) {
    complexity += 10;
  }
  
  // Increase complexity for international/cross-border issues
  const internationalTerms = ["foreign", "international", "overseas", "abroad", "أجنبي"];
  if (internationalTerms.some(term => query.toLowerCase().includes(term))) {
    complexity += 15;
  }
  
  // Increase complexity for very long queries (indicates complex situation)
  if (query.length > 500) complexity += 10;
  if (query.length > 1000) complexity += 10;
  
  // Decrease complexity for simple informational queries
  const simpleTerms = ["what is", "define", "explain", "ما هو", "ما هي"];
  if (simpleTerms.some(term => query.toLowerCase().includes(term))) {
    complexity -= 15;
  }
  
  return Math.max(0, Math.min(100, complexity));
}

/**
 * Calculate overall confidence score
 */
export function calculateConfidenceScore(
  query: string,
  relevantArticles: LegalArticle[]
): ConfidenceScore {
  // Calculate individual factors
  const knowledgeBaseCoverage = calculateKnowledgeBaseCoverage(query, relevantArticles);
  const relevantArticlesCount = relevantArticles.length;
  const legalClarityScore = calculateLegalClarityScore(relevantArticles);
  const queryComplexityScore = calculateQueryComplexityScore(query);
  
  // Weight the factors
  const weights = {
    knowledgeBaseCoverage: 0.40, // 40% - most important
    relevantArticlesCount: 0.20, // 20% - having multiple sources helps
    legalClarityScore: 0.25,     // 25% - clarity of law matters
    queryComplexityScore: 0.15,  // 15% - complexity reduces confidence
  };
  
  // Normalize article count to 0-100 scale (0-10 articles)
  const normalizedArticleCount = Math.min(100, (relevantArticlesCount / 10) * 100);
  
  // Invert complexity score (high complexity = low confidence)
  const invertedComplexity = 100 - queryComplexityScore;
  
  // Calculate weighted overall score
  const overall = Math.round(
    knowledgeBaseCoverage * weights.knowledgeBaseCoverage +
    normalizedArticleCount * weights.relevantArticlesCount +
    legalClarityScore * weights.legalClarityScore +
    invertedComplexity * weights.queryComplexityScore
  );
  
  // Determine confidence level
  let level: ConfidenceScore["level"];
  if (overall >= 90) level = "very_high";
  else if (overall >= 75) level = "high";
  else if (overall >= 60) level = "medium";
  else if (overall >= 40) level = "low";
  else level = "very_low";
  
  // Generate recommendations
  const recommendations: string[] = [];
  const requiresLawyerReview = overall < 60;
  
  if (overall >= 90) {
    recommendations.push("✅ High confidence - response is well-grounded in legal sources");
  }
  
  if (knowledgeBaseCoverage < 70) {
    recommendations.push("⚠️ Limited knowledge base coverage for this topic - consider consulting a lawyer");
  }
  
  if (relevantArticlesCount === 0) {
    recommendations.push("❌ No relevant legal articles found - this topic may not be covered in the knowledge base");
    recommendations.push("🔍 Strongly recommend consulting a licensed lawyer");
  } else if (relevantArticlesCount < 3) {
    recommendations.push("📚 Limited legal sources available - verify with additional research");
  }
  
  if (legalClarityScore < 60) {
    recommendations.push("⚠️ Legal provisions may be ambiguous - interpretation may vary");
  }
  
  if (queryComplexityScore > 70) {
    recommendations.push("🔍 Complex legal question - recommend lawyer review for case-specific advice");
  }
  
  if (requiresLawyerReview) {
    recommendations.push("⚠️ LAWYER REVIEW REQUIRED - confidence score below threshold (60%)");
  }
  
  return {
    overall,
    level,
    factors: {
      knowledgeBaseCoverage,
      relevantArticlesCount,
      legalClarityScore,
      queryComplexityScore,
    },
    recommendations,
    requiresLawyerReview,
  };
}

/**
 * Get confidence level display information
 */
export function getConfidenceLevelDisplay(level: ConfidenceScore["level"]): {
  emoji: string;
  color: string;
  label: string;
  description: string;
} {
  const displays = {
    very_high: {
      emoji: "🟢",
      color: "green",
      label: "Very High Confidence",
      description: "Response is well-grounded in clear legal provisions",
    },
    high: {
      emoji: "🟢",
      color: "green",
      label: "High Confidence",
      description: "Response is supported by relevant legal sources",
    },
    medium: {
      emoji: "🟡",
      color: "yellow",
      label: "Medium Confidence",
      description: "Response has some support but may need verification",
    },
    low: {
      emoji: "🟠",
      color: "orange",
      label: "Low Confidence",
      description: "Limited legal support - lawyer review recommended",
    },
    very_low: {
      emoji: "🔴",
      color: "red",
      label: "Very Low Confidence",
      description: "Insufficient legal support - lawyer review required",
    },
  };
  
  return displays[level];
}
