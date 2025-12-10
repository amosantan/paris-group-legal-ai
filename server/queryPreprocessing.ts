/**
 * Query Preprocessing Module
 * 
 * Enhances user queries before search by:
 * - Cleaning and normalizing text
 * - Expanding with legal synonyms
 * - Detecting legal categories
 * - Arabic morphological analysis
 * - Improving retrieval quality
 */

import { 
  normalizeArabic, 
  isPrimarilyArabic, 
  processArabicQuery,
  getArabicSynonyms 
} from './arabicNLP';

export type Language = 'en' | 'ar';
export type LegalCategory = 
  | 'rental_law'
  | 'civil_code'
  | 'commercial_law'
  | 'labor_law'
  | 'real_estate_law'
  | 'rera_regulation'
  | 'escrow_law'
  | 'difc_law'
  | 'other';

export interface PreprocessedQuery {
  original: string;
  cleaned: string;
  legalTerms: string[];
  synonyms: string[];
  category: LegalCategory | null;
  expandedQuery: string;
  language: Language;
}

/**
 * Legal Synonym Dictionary
 * Maps legal terms to their synonyms for query expansion
 */
export const LEGAL_SYNONYMS: Record<Language, Record<string, string[]>> = {
  en: {
    // Parties
    'tenant': ['lessee', 'renter', 'occupant', 'resident'],
    'landlord': ['lessor', 'property owner', 'owner', 'proprietor'],
    'employer': ['company', 'organization', 'business', 'firm'],
    'employee': ['worker', 'staff', 'personnel', 'labor'],
    'buyer': ['purchaser', 'acquirer', 'vendee'],
    'seller': ['vendor', 'vend or'],
    'contractor': ['service provider', 'vendor', 'supplier'],
    
    // Actions
    'eviction': ['termination', 'removal', 'expulsion', 'ejection', 'evict'],
    'evict': ['terminate', 'remove', 'expel', 'eject'],
    'terminate': ['end', 'cancel', 'discontinue', 'conclude', 'termination'],
    'termination': ['cancellation', 'ending', 'conclusion', 'cessation'],
    'renew': ['extend', 'continue', 'prolong', 'renewal'],
    'renewal': ['extension', 'continuation'],
    'break': ['terminate early', 'cancel', 'exit', 'end prematurely'],
    'sue': ['file lawsuit', 'take legal action', 'litigate', 'prosecute'],
    'fire': ['terminate employment', 'dismiss', 'discharge', 'let go'],
    'hire': ['employ', 'recruit', 'engage', 'appoint'],
    
    // Legal concepts
    'rent': ['rental payment', 'lease payment', 'tenancy fee'],
    'lease': ['tenancy agreement', 'rental contract', 'tenancy'],
    'contract': ['agreement', 'accord', 'pact', 'deal'],
    'agreement': ['contract', 'accord', 'understanding'],
    'dispute': ['conflict', 'disagreement', 'controversy', 'argument'],
    'notice': ['notification', 'warning', 'advisory', 'communication'],
    'obligation': ['duty', 'responsibility', 'commitment', 'requirement'],
    'right': ['entitlement', 'privilege', 'prerogative', 'claim'],
    'penalty': ['fine', 'sanction', 'punishment', 'charge'],
    'fine': ['penalty', 'charge', 'fee', 'sanction'],
    'deposit': ['security payment', 'guarantee', 'security deposit'],
    'security deposit': ['deposit', 'guarantee', 'security payment'],
    'maintenance': ['repair', 'upkeep', 'servicing', 'fixing'],
    'repair': ['maintenance', 'fix', 'mend', 'restoration'],
    'violation': ['breach', 'infringement', 'contravention', 'transgression'],
    'breach': ['violation', 'infringement', 'breaking', 'non-compliance'],
    'compensation': ['damages', 'reimbursement', 'payment', 'recompense'],
    'damages': ['compensation', 'reimbursement', 'indemnity'],
    
    // Property
    'property': ['real estate', 'premises', 'building', 'unit'],
    'apartment': ['flat', 'unit', 'dwelling', 'residence'],
    'building': ['structure', 'property', 'premises', 'edifice'],
    'villa': ['house', 'residence', 'dwelling', 'home'],
    
    // Employment
    'salary': ['wage', 'pay', 'compensation', 'remuneration', 'earnings'],
    'wage': ['salary', 'pay', 'earnings', 'income'],
    'overtime': ['extra hours', 'additional work', 'extended hours'],
    'leave': ['vacation', 'time off', 'absence', 'holiday'],
    'resignation': ['quit', 'leaving', 'departure', 'stepping down'],
    
    // Commercial
    'company': ['business', 'corporation', 'firm', 'enterprise', 'organization'],
    'partnership': ['joint venture', 'collaboration', 'alliance'],
    'license': ['permit', 'authorization', 'approval', 'certification'],
    'permit': ['license', 'authorization', 'approval', 'clearance'],
    
    // Legal processes
    'lawsuit': ['legal action', 'litigation', 'case', 'suit'],
    'court': ['tribunal', 'judiciary', 'legal system'],
    'judge': ['magistrate', 'justice', 'adjudicator'],
    'lawyer': ['attorney', 'legal counsel', 'advocate', 'solicitor'],
    'law': ['legislation', 'statute', 'regulation', 'act'],
    'regulation': ['rule', 'law', 'statute', 'ordinance'],
  },
  
  ar: {
    // Parties (Arabic)
    'مستأجر': ['ساكن', 'قاطن', 'مستأجر العقار'],
    'مالك': ['مؤجر', 'صاحب العقار', 'مالك العقار'],
    'صاحب العمل': ['الشركة', 'المؤسسة', 'جهة العمل'],
    'موظف': ['عامل', 'مستخدم', 'الموظف'],
    'مشتري': ['المشتري', 'الشاري'],
    'بائع': ['البائع', 'الناقل'],
    
    // Actions (Arabic)
    'إخلاء': ['طرد', 'إزالة', 'إخراج'],
    'إنهاء': ['فسخ', 'إلغاء', 'إنهاء العقد'],
    'فسخ': ['إنهاء', 'إلغاء', 'إبطال'],
    'تجديد': ['تمديد', 'استمرار', 'إطالة'],
    'مقاضاة': ['رفع دعوى', 'اتخاذ إجراء قانوني'],
    'فصل': ['إنهاء الخدمة', 'الطرد من العمل'],
    'توظيف': ['تعيين', 'استخدام', 'تشغيل'],
    
    // Legal concepts (Arabic)
    'إيجار': ['أجرة', 'بدل الإيجار', 'قيمة الإيجار'],
    'عقد': ['اتفاق', 'اتفاقية', 'صك'],
    'اتفاق': ['عقد', 'اتفاقية', 'تعاقد'],
    'نزاع': ['خلاف', 'شقاق', 'صراع'],
    'إخطار': ['إشعار', 'إعلام', 'تنبيه'],
    'التزام': ['واجب', 'مسؤولية', 'تعهد'],
    'حق': ['استحقاق', 'صلاحية', 'امتياز'],
    'غرامة': ['جزاء', 'عقوبة', 'غرامة مالية'],
    'تأمين': ['ضمان', 'كفالة', 'وديعة'],
    'صيانة': ['إصلاح', 'ترميم', 'تجديد'],
    'إصلاح': ['صيانة', 'تصليح', 'ترميم'],
    'مخالفة': ['انتهاك', 'خرق', 'إخلال'],
    'انتهاك': ['مخالفة', 'خرق', 'تجاوز'],
    'تعويض': ['ضرر', 'تعويضات', 'جبر الضرر'],
    
    // Property (Arabic)
    'عقار': ['ملك', 'مبنى', 'وحدة سكنية'],
    'شقة': ['وحدة سكنية', 'سكن', 'مسكن'],
    'مبنى': ['عمارة', 'بناية', 'عقار'],
    'فيلا': ['منزل', 'بيت', 'مسكن'],
    
    // Employment (Arabic)
    'راتب': ['أجر', 'مرتب', 'دخل'],
    'أجر': ['راتب', 'مرتب', 'أجرة'],
    'ساعات إضافية': ['عمل إضافي', 'وقت إضافي'],
    'إجازة': ['عطلة', 'راحة', 'غياب'],
    'استقالة': ['ترك العمل', 'الاستقالة من العمل'],
    
    // Commercial (Arabic)
    'شركة': ['مؤسسة', 'منشأة', 'كيان تجاري'],
    'شراكة': ['تعاون', 'مشاركة', 'تحالف'],
    'رخصة': ['تصريح', 'إذن', 'موافقة'],
    'تصريح': ['رخصة', 'إذن', 'ترخيص'],
    
    // Legal processes (Arabic)
    'دعوى': ['قضية', 'دعوى قضائية', 'مقاضاة'],
    'محكمة': ['قضاء', 'هيئة قضائية'],
    'قاضي': ['حاكم', 'قاض'],
    'محامي': ['مستشار قانوني', 'وكيل', 'محام'],
    'قانون': ['تشريع', 'نظام', 'لائحة'],
    'لائحة': ['نظام', 'قانون', 'تنظيم'],
  }
};

/**
 * Category detection patterns
 * Maps keywords to legal categories
 */
const CATEGORY_PATTERNS: Record<LegalCategory, string[]> = {
  rental_law: [
    'rent', 'lease', 'tenant', 'landlord', 'eviction', 'rental', 'tenancy',
    'إيجار', 'مستأجر', 'مالك', 'إخلاء', 'عقد إيجار'
  ],
  civil_code: [
    'contract', 'obligation', 'liability', 'civil', 'tort', 'damages',
    'عقد', 'التزام', 'مسؤولية', 'مدني', 'ضرر'
  ],
  commercial_law: [
    'commercial', 'business', 'company', 'partnership', 'trade', 'merchant',
    'تجاري', 'شركة', 'تجارة', 'شراكة'
  ],
  labor_law: [
    'employment', 'employee', 'employer', 'salary', 'wage', 'labor', 'work',
    'عمل', 'موظف', 'صاحب عمل', 'راتب', 'أجر'
  ],
  real_estate_law: [
    'property', 'real estate', 'land', 'ownership', 'transfer', 'sale', 'purchase',
    'عقار', 'ملكية', 'بيع', 'شراء', 'نقل ملكية'
  ],
  rera_regulation: [
    'rera', 'real estate regulatory', 'dubai land department',
    'هيئة تنظيم العقارات', 'دائرة الأراضي'
  ],
  escrow_law: [
    'escrow', 'trust account', 'deposit account',
    'حساب ضمان', 'حساب أمانة'
  ],
  difc_law: [
    'difc', 'dubai international financial centre', 'financial free zone',
    'مركز دبي المالي'
  ],
  other: []
};

/**
 * Clean and normalize query text
 */
export function cleanQuery(query: string): string {
  return query
    .trim()
    .toLowerCase()
    // Remove special characters but keep Arabic and alphanumeric
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ')
    // Remove excessive whitespace (must come after special char removal)
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Detect language of query
 */
export function detectLanguage(query: string): Language {
  // Check for Arabic characters
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(query) ? 'ar' : 'en';
}

/**
 * Extract legal terms from query
 */
export function extractLegalTerms(query: string, language: Language): string[] {
  const words = query.toLowerCase().split(/\s+/);
  const synonymDict = LEGAL_SYNONYMS[language];
  const legalTerms: string[] = [];
  
  for (const word of words) {
    // Check if word is a key in synonym dictionary
    if (synonymDict[word]) {
      legalTerms.push(word);
    }
    // Check if word is a synonym of any key
    for (const [key, synonyms] of Object.entries(synonymDict)) {
      if (synonyms.includes(word)) {
        legalTerms.push(key);
        break;
      }
    }
  }
  
  return Array.from(new Set(legalTerms)); // Remove duplicates
}

/**
 * Expand query with synonyms
 */
export function expandWithSynonyms(terms: string[], language: Language): string[] {
  const synonymDict = LEGAL_SYNONYMS[language];
  const expanded: string[] = [];
  
  for (const term of terms) {
    const synonyms = synonymDict[term] || [];
    expanded.push(...synonyms);
  }
  
  return Array.from(new Set(expanded)); // Remove duplicates
}

/**
 * Detect legal category from query
 */
export function detectCategory(query: string): LegalCategory | null {
  const lowerQuery = query.toLowerCase();
  
  // Count matches for each category
  const scores: Record<LegalCategory, number> = {
    rental_law: 0,
    civil_code: 0,
    commercial_law: 0,
    labor_law: 0,
    real_estate_law: 0,
    rera_regulation: 0,
    escrow_law: 0,
    difc_law: 0,
    other: 0
  };
  
  for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
    for (const pattern of patterns) {
      if (lowerQuery.includes(pattern.toLowerCase())) {
        scores[category as LegalCategory]++;
      }
    }
  }
  
  // Find category with highest score
  let maxScore = 0;
  let detectedCategory: LegalCategory | null = null;
  
  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedCategory = category as LegalCategory;
    }
  }
  
  // Return null if no strong match (score < 1)
  // Lower threshold to 1 to catch queries with just one strong keyword
  return maxScore >= 1 ? detectedCategory : null;
}

/**
 * Main preprocessing function
 * Enhances user query for better search results
 */
export function preprocessQuery(query: string): PreprocessedQuery {
  // Detect if query is primarily Arabic
  const isArabicQuery = isPrimarilyArabic(query);
  
  // Apply Arabic-specific preprocessing if needed
  if (isArabicQuery) {
    return preprocessArabicQuery(query);
  }
  
  // Continue with English preprocessing
  const userQuery = query;
  // Detect language
  const language = detectLanguage(userQuery);
  
  // Clean query
  const cleaned = cleanQuery(userQuery);
  
  // Extract legal terms
  const legalTerms = extractLegalTerms(cleaned, language);
  
  // Expand with synonyms
  const synonyms = expandWithSynonyms(legalTerms, language);
  
  // Detect category
  const category = detectCategory(cleaned);
  
  // Build expanded query (original + synonyms with OR logic)
  const allTerms = [cleaned, ...synonyms];
  const expandedQuery = allTerms.join(' OR ');
  
  return {
    original: query,
    cleaned,
    legalTerms,
    synonyms,
    category,
    expandedQuery,
    language,
  };
}

/**
 * Preprocess Arabic query with morphological analysis
 */
function preprocessArabicQuery(query: string): PreprocessedQuery {
  // Normalize Arabic text
  const cleaned = normalizeArabic(query);
  
  // Process Arabic query (morphological variations + synonyms)
  const expandedTerms = processArabicQuery(query);
  
  // Extract legal terms (words that have synonyms)
  const legalTerms: string[] = [];
  const words = cleaned.split(/\s+/);
  for (const word of words) {
    const synonyms = getArabicSynonyms(word);
    if (synonyms.length > 0) {
      legalTerms.push(word);
    }
  }
  
  // Detect category (same logic as English)
  const category = detectCategory(cleaned);
  
  // Build expanded query (combine all terms with OR)
  const expandedQuery = expandedTerms.join(' OR ');
  
  return {
    original: query,
    cleaned,
    legalTerms,
    synonyms: expandedTerms,
    category,
    expandedQuery,
    language: 'ar',
  };
}

/**
 * Get category-specific search hints
 * Returns additional keywords to boost search for specific categories
 */
export function getCategoryHints(category: LegalCategory | null): string[] {
  if (!category) return [];
  
  const hints: Record<LegalCategory, string[]> = {
    rental_law: ['rental dispute', 'tenancy', 'lease agreement', 'RERA'],
    civil_code: ['civil code', 'UAE law', 'federal law', 'obligations'],
    commercial_law: ['commercial transactions', 'business law', 'trade'],
    labor_law: ['employment law', 'labor rights', 'MOHRE', 'work permit'],
    real_estate_law: ['property law', 'ownership', 'land department'],
    rera_regulation: ['RERA', 'real estate regulatory agency', 'Dubai'],
    escrow_law: ['escrow account', 'trust', 'deposit protection'],
    difc_law: ['DIFC', 'financial centre', 'free zone'],
    other: []
  };
  
  return hints[category] || [];
}
