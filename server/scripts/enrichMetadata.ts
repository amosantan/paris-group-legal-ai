/**
 * Metadata Enrichment Script
 * 
 * Enriches all legal knowledge articles with metadata:
 * - Legal concepts extraction
 * - Related articles detection
 * - Importance scoring
 * - Applicable scenarios
 * - Search keywords generation
 * 
 * Run with: node --loader ts-node/esm server/scripts/enrichMetadata.ts
 */

import { getDb } from '../db';
import { legalKnowledge, type LegalKnowledge } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { LEGAL_SYNONYMS } from '../queryPreprocessing';

/**
 * Extract legal concepts from article content
 * Identifies key legal terms and concepts mentioned in the article
 */
function extractLegalConcepts(content: string, title: string): string[] {
  const text = `${title} ${content}`.toLowerCase();
  const concepts = new Set<string>();
  
  // Check for English legal terms
  const enSynonyms = LEGAL_SYNONYMS.en;
  for (const [term, synonyms] of Object.entries(enSynonyms)) {
    if (text.includes(term)) {
      concepts.add(term);
    }
    for (const synonym of synonyms) {
      if (text.includes(synonym)) {
        concepts.add(term); // Add the main term, not the synonym
      }
    }
  }
  
  // Check for Arabic legal terms
  const arSynonyms = LEGAL_SYNONYMS.ar;
  for (const [term, synonyms] of Object.entries(arSynonyms)) {
    if (text.includes(term)) {
      concepts.add(term);
    }
    for (const synonym of synonyms) {
      if (text.includes(synonym)) {
        concepts.add(term);
      }
    }
  }
  
  return Array.from(concepts);
}

/**
 * Detect applicable scenarios based on content
 * Maps article content to common legal scenarios
 */
function detectScenarios(content: string, title: string, category: string): string[] {
  const text = `${title} ${content}`.toLowerCase();
  const scenarios: string[] = [];
  
  // Scenario patterns
  const scenarioPatterns: Record<string, string[]> = {
    'rental_dispute': ['rent', 'tenant', 'landlord', 'lease', 'eviction', 'إيجار', 'مستأجر'],
    'lease_termination': ['termination', 'end', 'cancel', 'break', 'إنهاء', 'فسخ'],
    'maintenance_issue': ['maintenance', 'repair', 'damage', 'defect', 'صيانة', 'إصلاح'],
    'security_deposit': ['deposit', 'security', 'guarantee', 'تأمين', 'ضمان'],
    'rent_increase': ['increase', 'raise', 'adjustment', 'زيادة', 'رفع'],
    'property_transfer': ['transfer', 'sale', 'purchase', 'ownership', 'نقل', 'بيع', 'شراء'],
    'employment_dispute': ['employee', 'employer', 'work', 'salary', 'wage', 'موظف', 'عمل'],
    'contract_breach': ['breach', 'violation', 'non-compliance', 'مخالفة', 'انتهاك'],
    'commercial_transaction': ['commercial', 'business', 'trade', 'تجاري', 'تجارة'],
    'property_registration': ['registration', 'title deed', 'ownership', 'تسجيل', 'ملكية'],
  };
  
  for (const [scenario, patterns] of Object.entries(scenarioPatterns)) {
    let matchCount = 0;
    for (const pattern of patterns) {
      if (text.includes(pattern)) {
        matchCount++;
      }
    }
    // Add scenario if at least 2 patterns match
    if (matchCount >= 2) {
      scenarios.push(scenario);
    }
  }
  
  // Always add category-based scenario
  if (category === 'rental_law') {
    if (!scenarios.includes('rental_dispute')) {
      scenarios.push('rental_dispute');
    }
  } else if (category === 'labor_law') {
    if (!scenarios.includes('employment_dispute')) {
      scenarios.push('employment_dispute');
    }
  } else if (category === 'commercial_law') {
    if (!scenarios.includes('commercial_transaction')) {
      scenarios.push('commercial_transaction');
    }
  }
  
  return scenarios;
}

/**
 * Calculate importance score (1-10)
 * Based on article characteristics
 */
function calculateImportance(
  lawName: string,
  articleNumber: string | null,
  category: string,
  contentLength: number
): number {
  let score = 5; // Default baseline
  
  // Boost for specific important laws
  if (lawName.includes('Civil Code') || lawName.includes('القانون المدني')) {
    score += 2;
  }
  if (lawName.includes('RERA') || lawName.includes('تنظيم العقارات')) {
    score += 1;
  }
  if (lawName.includes('Labor Law') || lawName.includes('قانون العمل')) {
    score += 1;
  }
  
  // Boost for articles with specific article numbers (not general sections)
  if (articleNumber && articleNumber.match(/^\d+$/)) {
    score += 1;
  }
  
  // Boost for comprehensive content (longer articles)
  if (contentLength > 500) {
    score += 1;
  }
  if (contentLength > 1000) {
    score += 1;
  }
  
  // Cap at 10
  return Math.min(score, 10);
}

/**
 * Generate search keywords from content
 * Extracts key terms for faster search
 */
function generateSearchKeywords(content: string, title: string, concepts: string[]): string[] {
  const keywords = new Set<string>();
  
  // Add all concepts
  concepts.forEach(c => keywords.add(c));
  
  // Extract words from title (more important)
  const titleWords = title
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 3); // Only words longer than 3 chars
  titleWords.forEach(w => keywords.add(w));
  
  // Extract frequent words from content
  const contentWords = content
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 4); // Only words longer than 4 chars
  
  // Count word frequency
  const wordFreq: Record<string, number> = {};
  contentWords.forEach(w => {
    wordFreq[w] = (wordFreq[w] || 0) + 1;
  });
  
  // Take top 20 most frequent words
  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);
  
  topWords.forEach(w => keywords.add(w));
  
  // Limit to 50 keywords total
  return Array.from(keywords).slice(0, 50);
}

/**
 * Find related articles based on content similarity
 * Simple approach: articles with overlapping concepts
 */
function findRelatedArticles(
  articleId: number,
  concepts: string[],
  allArticles: Array<{ id: number; concepts: string[] }>
): number[] {
  const related: Array<{ id: number; overlap: number }> = [];
  
  for (const other of allArticles) {
    if (other.id === articleId) continue;
    
    // Calculate concept overlap
    const overlap = concepts.filter(c => other.concepts.includes(c)).length;
    
    if (overlap >= 2) {
      related.push({ id: other.id, overlap });
    }
  }
  
  // Sort by overlap and take top 10
  return related
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 10)
    .map(r => r.id);
}

/**
 * Main enrichment function
 */
async function enrichAllArticles() {
  console.log('🚀 Starting metadata enrichment...\n');
  
  // Get database connection
  const db = await getDb();
  if (!db) {
    console.error('❌ Failed to connect to database');
    return;
  }
  
  // Fetch all articles
  console.log('📥 Fetching all articles from database...');
  const articles = await db.select().from(legalKnowledge);
  console.log(`✅ Found ${articles.length} articles\n`);
  
  if (articles.length === 0) {
    console.log('⚠️  No articles found. Exiting.');
    return;
  }
  
  // Phase 1: Extract concepts for all articles (needed for related articles)
  console.log('🔍 Phase 1: Extracting legal concepts...');
  const articlesWithConcepts = articles.map((article: LegalKnowledge) => {
    const concepts = extractLegalConcepts(
      article.contentEn,
      article.titleEn
    );
    return {
      id: article.id,
      concepts
    };
  });
  console.log('✅ Concepts extracted for all articles\n');
  
  // Phase 2: Enrich each article
  console.log('✨ Phase 2: Enriching articles with metadata...');
  let processed = 0;
  let updated = 0;
  
  for (const article of articles) {
    try {
      // Extract concepts
      const concepts = extractLegalConcepts(article.contentEn, article.titleEn);
      
      // Detect scenarios
      const scenarios = detectScenarios(article.contentEn, article.titleEn, article.category);
      
      // Calculate importance
      const importance = calculateImportance(
        article.lawName,
        article.articleNumber,
        article.category,
        article.contentEn.length
      );
      
      // Generate search keywords
      const keywords = generateSearchKeywords(article.contentEn, article.titleEn, concepts);
      
      // Find related articles
      const related = findRelatedArticles(
        article.id,
        concepts,
        articlesWithConcepts
      );
      
      // Update article
      await db
        .update(legalKnowledge)
        .set({
          legalConcepts: JSON.stringify(concepts),
          applicableScenarios: JSON.stringify(scenarios),
          importance,
          searchKeywords: JSON.stringify(keywords),
          relatedArticles: JSON.stringify(related),
        })
        .where(eq(legalKnowledge.id, article.id));
      
      updated++;
      processed++;
      
      // Log progress every 50 articles
      if (processed % 50 === 0) {
        console.log(`   Progress: ${processed}/${articles.length} articles processed (${Math.round(processed / articles.length * 100)}%)`);
      }
    } catch (error) {
      console.error(`❌ Error enriching article ${article.id}:`, error);
      processed++;
    }
  }
  
  console.log(`\n✅ Enrichment complete!`);
  console.log(`   Total articles: ${articles.length}`);
  console.log(`   Successfully enriched: ${updated}`);
  console.log(`   Failed: ${processed - updated}`);
  
  // Show sample enriched article
  if (updated > 0) {
    console.log('\n📊 Sample enriched article:');
    const sample = await db
      .select()
      .from(legalKnowledge)
      .where(eq(legalKnowledge.id, articles[0].id))
      .limit(1);
    
    if (sample.length > 0) {
      const s = sample[0];
      console.log(`   ID: ${s.id}`);
      console.log(`   Title: ${s.titleEn.substring(0, 60)}...`);
      console.log(`   Concepts: ${s.legalConcepts ? JSON.parse(s.legalConcepts).slice(0, 5).join(', ') : 'none'}`);
      console.log(`   Scenarios: ${s.applicableScenarios ? JSON.parse(s.applicableScenarios).join(', ') : 'none'}`);
      console.log(`   Importance: ${s.importance}/10`);
      console.log(`   Keywords: ${s.searchKeywords ? JSON.parse(s.searchKeywords).slice(0, 10).join(', ') : 'none'}`);
      console.log(`   Related articles: ${s.relatedArticles ? JSON.parse(s.relatedArticles).length : 0}`);
    }
  }
  
  console.log('\n🎉 Metadata enrichment completed successfully!');
}

// Run the enrichment
enrichAllArticles()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
