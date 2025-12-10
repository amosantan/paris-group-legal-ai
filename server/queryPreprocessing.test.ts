/**
 * Query Preprocessing Tests
 * 
 * Tests for query cleaning, synonym expansion, category detection,
 * and overall preprocessing functionality
 */

import { describe, it, expect } from 'vitest';
import {
  cleanQuery,
  detectLanguage,
  extractLegalTerms,
  expandWithSynonyms,
  detectCategory,
  preprocessQuery,
  getCategoryHints,
  type Language,
  type LegalCategory
} from './queryPreprocessing';

describe('Query Preprocessing', () => {
  describe('cleanQuery', () => {
    it('should trim whitespace', () => {
      expect(cleanQuery('  hello world  ')).toBe('hello world');
    });

    it('should convert to lowercase', () => {
      expect(cleanQuery('TENANT DISPUTE')).toBe('tenant dispute');
    });

    it('should remove excessive whitespace', () => {
      expect(cleanQuery('tenant    dispute')).toBe('tenant dispute');
    });

    it('should remove special characters', () => {
      expect(cleanQuery('tenant-dispute!')).toBe('tenant dispute');
    });

    it('should preserve Arabic characters', () => {
      const arabic = 'مستأجر نزاع';
      expect(cleanQuery(arabic)).toBe(arabic);
    });
  });

  describe('detectLanguage', () => {
    it('should detect English', () => {
      expect(detectLanguage('tenant dispute')).toBe('en');
    });

    it('should detect Arabic', () => {
      expect(detectLanguage('مستأجر نزاع')).toBe('ar');
    });

    it('should detect Arabic in mixed text', () => {
      expect(detectLanguage('tenant مستأجر')).toBe('ar');
    });
  });

  describe('extractLegalTerms', () => {
    it('should extract English legal terms', () => {
      const terms = extractLegalTerms('tenant wants to break lease', 'en');
      expect(terms).toContain('tenant');
      expect(terms).toContain('lease');
    });

    it('should extract Arabic legal terms', () => {
      const terms = extractLegalTerms('مستأجر يريد إنهاء عقد', 'ar');
      expect(terms).toContain('مستأجر');
      expect(terms).toContain('عقد');
    });

    it('should recognize synonyms as legal terms', () => {
      const terms = extractLegalTerms('lessee wants to terminate tenancy', 'en');
      expect(terms).toContain('tenant'); // lessee is synonym of tenant
      expect(terms).toContain('lease'); // tenancy is synonym of lease
    });

    it('should return empty array for non-legal query', () => {
      const terms = extractLegalTerms('hello world', 'en');
      expect(terms).toHaveLength(0);
    });

    it('should remove duplicates', () => {
      const terms = extractLegalTerms('tenant tenant tenant', 'en');
      expect(terms).toHaveLength(1);
      expect(terms[0]).toBe('tenant');
    });
  });

  describe('expandWithSynonyms', () => {
    it('should expand English terms with synonyms', () => {
      const synonyms = expandWithSynonyms(['tenant'], 'en');
      expect(synonyms).toContain('lessee');
      expect(synonyms).toContain('renter');
      expect(synonyms).toContain('occupant');
    });

    it('should expand Arabic terms with synonyms', () => {
      const synonyms = expandWithSynonyms(['مستأجر'], 'ar');
      expect(synonyms).toContain('ساكن');
      expect(synonyms).toContain('قاطن');
    });

    it('should handle multiple terms', () => {
      const synonyms = expandWithSynonyms(['tenant', 'landlord'], 'en');
      expect(synonyms.length).toBeGreaterThan(4); // At least 4 synonyms total
    });

    it('should return empty array for unknown terms', () => {
      const synonyms = expandWithSynonyms(['unknown'], 'en');
      expect(synonyms).toHaveLength(0);
    });

    it('should remove duplicate synonyms', () => {
      const synonyms = expandWithSynonyms(['tenant', 'lessee'], 'en');
      const uniqueSynonyms = new Set(synonyms);
      expect(synonyms.length).toBe(uniqueSynonyms.size);
    });
  });

  describe('detectCategory', () => {
    it('should detect rental_law category', () => {
      expect(detectCategory('tenant eviction notice')).toBe('rental_law');
      expect(detectCategory('lease termination dispute')).toBe('rental_law');
    });

    it('should detect civil_code category', () => {
      expect(detectCategory('contract obligation and liability')).toBe('civil_code');
    });

    it('should detect commercial_law category', () => {
      expect(detectCategory('business partnership agreement')).toBe('commercial_law');
      expect(detectCategory('commercial trade dispute')).toBe('commercial_law');
    });

    it('should detect labor_law category', () => {
      expect(detectCategory('employee salary and wage dispute')).toBe('labor_law');
      expect(detectCategory('employment termination')).toBe('labor_law');
    });

    it('should detect real_estate_law category', () => {
      expect(detectCategory('property ownership transfer')).toBe('real_estate_law');
      expect(detectCategory('real estate sale purchase')).toBe('real_estate_law');
    });

    it('should detect Arabic categories', () => {
      expect(detectCategory('مستأجر إخلاء')).toBe('rental_law');
      expect(detectCategory('عقد التزام')).toBe('civil_code');
      expect(detectCategory('شركة تجارة')).toBe('commercial_law');
    });

    it('should return null for ambiguous queries', () => {
      expect(detectCategory('hello world')).toBeNull();
      expect(detectCategory('general question')).toBeNull();
    });

    it('should detect even single strong keyword', () => {
      // With threshold=1, even single keyword should be detected
      expect(detectCategory('tenant')).toBe('rental_law');
      expect(detectCategory('employment')).toBe('labor_law');
    });

    it('should prioritize category with most matches', () => {
      // Has both rental and employment keywords, but more rental
      const result = detectCategory('tenant landlord lease employee');
      expect(result).toBe('rental_law');
    });
  });

  describe('preprocessQuery', () => {
    it('should preprocess English query', () => {
      const result = preprocessQuery('Tenant wants to break LEASE');
      
      expect(result.original).toBe('Tenant wants to break LEASE');
      expect(result.cleaned).toBe('tenant wants to break lease');
      expect(result.language).toBe('en');
      expect(result.legalTerms).toContain('tenant');
      expect(result.legalTerms).toContain('lease');
      expect(result.synonyms.length).toBeGreaterThan(0);
      expect(result.category).toBe('rental_law');
      expect(result.expandedQuery).toContain('OR');
    });

    it('should preprocess Arabic query', () => {
      const result = preprocessQuery('مستأجر يريد إنهاء عقد الإيجار');
      
      expect(result.language).toBe('ar');
      expect(result.legalTerms.length).toBeGreaterThan(0);
      expect(result.category).toBe('rental_law');
    });

    it('should handle query with no legal terms', () => {
      const result = preprocessQuery('hello world');
      
      expect(result.legalTerms).toHaveLength(0);
      expect(result.synonyms).toHaveLength(0);
      expect(result.category).toBeNull();
    });

    it('should build expanded query with OR logic', () => {
      const result = preprocessQuery('tenant dispute');
      
      expect(result.expandedQuery).toContain('OR');
      expect(result.expandedQuery).toContain('tenant');
      expect(result.expandedQuery).toContain('lessee');
    });

    it('should handle complex multi-topic query', () => {
      const result = preprocessQuery('tenant employment contract dispute');
      
      // Should detect legal terms from multiple categories
      expect(result.legalTerms.length).toBeGreaterThan(2);
      // Category detection should pick the dominant one
      expect(result.category).not.toBeNull();
    });
  });

  describe('getCategoryHints', () => {
    it('should return hints for rental_law', () => {
      const hints = getCategoryHints('rental_law');
      expect(hints).toContain('RERA');
      expect(hints.length).toBeGreaterThan(0);
    });

    it('should return hints for labor_law', () => {
      const hints = getCategoryHints('labor_law');
      expect(hints).toContain('MOHRE');
      expect(hints.length).toBeGreaterThan(0);
    });

    it('should return empty array for null category', () => {
      const hints = getCategoryHints(null);
      expect(hints).toHaveLength(0);
    });

    it('should return empty array for other category', () => {
      const hints = getCategoryHints('other');
      expect(hints).toHaveLength(0);
    });

    it('should return hints for all categories', () => {
      const categories: LegalCategory[] = [
        'rental_law',
        'civil_code',
        'commercial_law',
        'labor_law',
        'real_estate_law',
        'rera_regulation',
        'escrow_law',
        'difc_law'
      ];
      
      for (const category of categories) {
        const hints = getCategoryHints(category);
        expect(Array.isArray(hints)).toBe(true);
      }
    });
  });

  describe('Integration Tests', () => {
    it('should improve search for rental dispute query', () => {
      const result = preprocessQuery('tenant wants to evict');
      
      // Should expand with synonyms
      expect(result.synonyms).toContain('lessee');
      expect(result.synonyms).toContain('termination');
      
      // Should detect category
      expect(result.category).toBe('rental_law');
      
      // Expanded query should be more comprehensive
      expect(result.expandedQuery.length).toBeGreaterThan(result.cleaned.length);
    });

    it('should improve search for employment query', () => {
      const result = preprocessQuery('employee salary dispute');
      
      expect(result.category).toBe('labor_law');
      expect(result.synonyms).toContain('worker');
      expect(result.synonyms).toContain('wage');
    });

    it('should improve search for commercial query', () => {
      const result = preprocessQuery('business partnership contract');
      
      expect(result.category).toBe('commercial_law');
      expect(result.synonyms).toContain('company');
      expect(result.synonyms).toContain('agreement');
    });

    it('should handle poorly worded query', () => {
      const result = preprocessQuery('  TENANT!!!  wants   BREAK  lease??? ');
      
      expect(result.cleaned).toBe('tenant wants break lease');
      expect(result.legalTerms.length).toBeGreaterThan(0);
      expect(result.category).toBe('rental_law');
    });

    it('should handle bilingual query', () => {
      const result = preprocessQuery('tenant مستأجر dispute');
      
      // Should detect Arabic due to Arabic characters
      expect(result.language).toBe('ar');
      expect(result.legalTerms.length).toBeGreaterThan(0);
    });
  });

  describe('Performance Tests', () => {
    it('should preprocess query quickly', () => {
      const start = Date.now();
      
      for (let i = 0; i < 100; i++) {
        preprocessQuery('tenant wants to break lease agreement');
      }
      
      const duration = Date.now() - start;
      
      // Should process 100 queries in less than 100ms (1ms per query)
      expect(duration).toBeLessThan(100);
    });

    it('should handle long queries efficiently', () => {
      const longQuery = 'tenant landlord lease rent eviction dispute contract agreement notice obligation right penalty deposit maintenance violation breach compensation'.repeat(5);
      
      const start = Date.now();
      const result = preprocessQuery(longQuery);
      const duration = Date.now() - start;
      
      // Should process even long query in reasonable time (<50ms)
      expect(duration).toBeLessThan(50);
      expect(result.legalTerms.length).toBeGreaterThan(0);
    });
  });
});
