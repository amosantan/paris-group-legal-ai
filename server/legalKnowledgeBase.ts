/**
 * Legal Knowledge Base for Paris Group Dubai Legal AI
 * Contains UAE/Dubai laws, regulations, and legal provisions
 */

export interface LegalArticle {
  lawName: string;
  lawNumber: string;
  articleNumber?: string;
  titleEn: string;
  titleAr?: string;
  contentEn: string;
  contentAr?: string;
  category: "rental_law" | "civil_code" | "rera_regulation" | "escrow_law" | "real_estate_law" | "other";
  keywords: string[];
}

export const LEGAL_KNOWLEDGE_BASE: LegalArticle[] = [
  // Dubai Rental Law 26/2007
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    articleNumber: "1",
    titleEn: "Title and Scope",
    contentEn: "This Law shall be cited as 'Law on the Regulation of Relationship between Landlords and Tenants in the Emirate of Dubai Law No. 26/2007'. It regulates the relationship between landlords and tenants in the Emirate of Dubai.",
    category: "rental_law",
    keywords: ["title", "scope", "landlord", "tenant", "dubai"]
  },
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    articleNumber: "2",
    titleEn: "Definitions - RERA",
    contentEn: "RERA: The Real Estate Regulatory Agency established under Law No. (16) of 2007.",
    category: "rental_law",
    keywords: ["RERA", "definition", "regulatory agency"]
  },
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    articleNumber: "7",
    titleEn: "Contract Termination",
    contentEn: "A valid tenancy contract cannot be unilaterally terminated during its duration except in cases specified by law. The landlord must provide proper notice and valid grounds for eviction.",
    category: "rental_law",
    keywords: ["termination", "eviction", "contract", "notice"]
  },
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    articleNumber: "16",
    titleEn: "Landlord Maintenance Obligations",
    contentEn: "The landlord is responsible for conducting maintenance, repairs, or addressing any damages that prevent the tenant from benefiting from the leased property, unless otherwise agreed in the contract.",
    category: "rental_law",
    keywords: ["maintenance", "repairs", "landlord obligation", "property damage"]
  },
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    articleNumber: "24",
    titleEn: "Subleasing",
    contentEn: "Subleasing is allowed only with written permission from the landlord. Unauthorized subleasing may result in contract termination.",
    titleAr: "التأجير من الباطن",
    contentAr: "يُسمح بالتأجير من الباطن فقط بإذن كتابي من المالك. قد يؤدي التأجير من الباطن غير المصرح به إلى إنهاء العقد.",
    category: "rental_law",
    keywords: ["sublease", "sublet", "permission", "written consent"]
  },
  {
    lawName: "Dubai Rental Law",
    lawNumber: "33/2008",
    titleEn: "Rent Increase Limitations",
    contentEn: "In any event, the Rent may not be increased nor may any of the terms of the Lease Contract be amended before the lapse of two years as of the date when the Tenant occupied the Real Property or the date of the last increase of Rent. The rent increase should not exceed the average rental increase index issued by the Real Estate Regulatory Authority.",
    titleAr: "قيود زيادة الإيجار",
    contentAr: "لا يجوز زيادة الإيجار أو تعديل أي من شروط عقد الإيجار قبل مرور سنتين من تاريخ شغل المستأجر للعقار أو تاريخ آخر زيادة في الإيجار. يجب ألا تتجاوز الزيادة في الإيجار متوسط مؤشر زيادة الإيجار الصادر عن هيئة تنظيم العقارات.",
    category: "rental_law",
    keywords: ["rent increase", "two years", "RERA index", "rental increase limitation"]
  },
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    titleEn: "Security Deposit",
    contentEn: "Landlords in Dubai can legally require tenants to provide a security deposit, usually equivalent to one or two months' rent. The security deposit must be returned to the tenant upon lease termination, subject to deductions for damages beyond normal wear and tear.",
    titleAr: "التأمين",
    contentAr: "يمكن للمالكين في دبي أن يطلبوا من المستأجرين تقديم تأمين، عادة ما يعادل شهر أو شهرين من الإيجار. يجب إعادة التأمين إلى المستأجر عند إنهاء الإيجار، مع خصم الأضرار التي تتجاوز الاستهلاك العادي.",
    category: "rental_law",
    keywords: ["security deposit", "deposit return", "tenant rights", "damage deduction"]
  },
  
  // RERA Regulations
  {
    lawName: "RERA Regulations",
    lawNumber: "16/2007",
    titleEn: "Establishment of RERA",
    contentEn: "Law No. (16) of 2007 established the Real Estate Regulatory Agency (RERA) to regulate and oversee the real estate sector in Dubai, ensuring transparency and protecting the rights of all stakeholders.",
    category: "rera_regulation",
    keywords: ["RERA", "establishment", "regulatory authority", "real estate oversight"]
  },
  {
    lawName: "RERA Regulations",
    lawNumber: "RERA/Escrow",
    titleEn: "Escrow Account Requirements",
    contentEn: "Escrow accounts are compulsory for real estate developers in Dubai. All payments from buyers for off-plan properties must be deposited into RERA-approved escrow accounts to protect buyer investments until project completion milestones are met.",
    titleAr: "متطلبات حساب الضمان",
    contentAr: "حسابات الضمان إلزامية لمطوري العقارات في دبي. يجب إيداع جميع المدفوعات من المشترين للعقارات قيد الإنشاء في حسابات ضمان معتمدة من RERA لحماية استثمارات المشترين حتى يتم الوصول إلى مراحل إنجاز المشروع.",
    category: "escrow_law",
    keywords: ["escrow", "developer", "buyer protection", "off-plan", "RERA approval"]
  },
  {
    lawName: "RERA Regulations",
    lawNumber: "RERA/180",
    titleEn: "180-Day Rule for Developers",
    contentEn: "The rule of 180 days in Dubai requires developers to start a project within 180 days following RERA approval. This ensures timely project commencement and protects buyer interests.",
    category: "rera_regulation",
    keywords: ["180 days", "developer obligation", "project start", "RERA approval"]
  },
  
  // Oqood Registration
  {
    lawName: "Oqood Registration",
    lawNumber: "DLD/Oqood",
    titleEn: "Oqood Certificate for Off-Plan Properties",
    contentEn: "Oqood is a provisional registration certificate issued by Dubai Land Department for off-plan properties. It serves as proof of the sale agreement and must be registered before property transfer. Registration fees are typically 4% of property value plus administrative charges.",
    titleAr: "شهادة العقود للعقارات قيد الإنشاء",
    contentAr: "العقود هي شهادة تسجيل مؤقتة تصدرها دائرة الأراضي والأملاك في دبي للعقارات قيد الإنشاء. وهي بمثابة إثبات لاتفاقية البيع ويجب تسجيلها قبل نقل الملكية. رسوم التسجيل عادة 4٪ من قيمة العقار بالإضافة إلى الرسوم الإدارية.",
    category: "real_estate_law",
    keywords: ["Oqood", "off-plan", "registration", "DLD", "property transfer", "4% fee"]
  },
  
  // UAE Civil Code
  {
    lawName: "UAE Civil Code",
    lawNumber: "5/1985",
    titleEn: "Civil Code Foundation",
    contentEn: "Federal Law No. (5) of 1985 issuing the Civil Code of the United Arab Emirates provides the foundational legal framework for civil transactions, including contracts, property rights, and obligations.",
    category: "civil_code",
    keywords: ["civil code", "federal law", "contracts", "property rights", "UAE"]
  },
  {
    lawName: "UAE Civil Code",
    lawNumber: "5/1985",
    articleNumber: "Contract Formation",
    titleEn: "Contract Requirements",
    contentEn: "A valid contract requires mutual consent, lawful subject matter, and a lawful cause. Contracts must be in writing for real estate transactions and rental agreements in Dubai.",
    category: "civil_code",
    keywords: ["contract", "consent", "writing requirement", "validity"]
  },
  
  // Rental Dispute Centre
  {
    lawName: "Rental Dispute Centre",
    lawNumber: "Decree 2/1993",
    titleEn: "Special Tribunal for Rental Disputes",
    contentEn: "Decree No. (2) of 1993 established a Special Tribunal for the Settlement of Disputes between Landlords and Tenants. The Rental Dispute Centre (RDC) handles all rental-related disputes in Dubai, including eviction cases, rent increases, and security deposit claims.",
    titleAr: "المحكمة الخاصة لنزاعات الإيجار",
    contentAr: "أنشأ المرسوم رقم (2) لسنة 1993 محكمة خاصة لتسوية النزاعات بين الملاك والمستأجرين. يتعامل مركز تسوية المنازعات الإيجارية (RDC) مع جميع النزاعات المتعلقة بالإيجار في دبي، بما في ذلك قضايا الإخلاء وزيادات الإيجار ومطالبات التأمين.",
    category: "rental_law",
    keywords: ["RDC", "dispute resolution", "tribunal", "eviction", "rental disputes"]
  },
  
  // Strata Law
  {
    lawName: "Dubai Strata Law",
    lawNumber: "27/2007",
    titleEn: "Jointly Owned Property Regulation",
    contentEn: "Law No. 27 of 2007 regulates jointly owned properties (strata titles) in Dubai, establishing the framework for owners' associations, common area management, and service charge collection in shared developments.",
    titleAr: "تنظيم الملكية المشتركة",
    contentAr: "ينظم القانون رقم 27 لسنة 2007 العقارات ذات الملكية المشتركة في دبي، ويضع الإطار لجمعيات الملاك وإدارة المناطق المشتركة وتحصيل رسوم الخدمة في التطويرات المشتركة.",
    category: "real_estate_law",
    keywords: ["strata", "jointly owned", "owners association", "common areas", "service charges"]
  },
  
  // Eviction Procedures
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    titleEn: "Grounds for Eviction",
    contentEn: "A landlord may seek eviction through the Rental Dispute Centre for the following reasons: non-payment of rent, unauthorized subletting, property damage, illegal use of property, or landlord's need for personal use (with 12 months' notice). All evictions require tribunal approval.",
    titleAr: "أسباب الإخلاء",
    contentAr: "يجوز للمالك طلب الإخلاء من خلال مركز تسوية المنازعات الإيجارية للأسباب التالية: عدم دفع الإيجار، التأجير من الباطن غير المصرح به، الإضرار بالعقار، الاستخدام غير القانوني للعقار، أو حاجة المالك للاستخدام الشخصي (مع إشعار 12 شهراً). تتطلب جميع حالات الإخلاء موافقة المحكمة.",
    category: "rental_law",
    keywords: ["eviction", "grounds", "non-payment", "tribunal approval", "12 months notice"]
  },
  
  // Notice Periods
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    titleEn: "Notice Period Requirements",
    contentEn: "For rent increases or contract non-renewal, landlords must provide tenants with written notice at least 90 days before contract expiration. For eviction due to personal use, 12 months' notice is required. Tenants must provide 90 days' notice if they do not wish to renew.",
    titleAr: "متطلبات فترة الإشعار",
    contentAr: "بالنسبة لزيادات الإيجار أو عدم تجديد العقد، يجب على الملاك تقديم إشعار كتابي للمستأجرين قبل 90 يوماً على الأقل من انتهاء العقد. للإخلاء بسبب الاستخدام الشخصي، يلزم إشعار 12 شهراً. يجب على المستأجرين تقديم إشعار 90 يوماً إذا كانوا لا يرغبون في التجديد.",
    category: "rental_law",
    keywords: ["notice period", "90 days", "12 months", "renewal", "eviction notice"]
  }
];

/**
 * Get legal knowledge by category
 */
export function getLegalKnowledgeByCategory(category: string): LegalArticle[] {
  return LEGAL_KNOWLEDGE_BASE.filter(article => article.category === category);
}

/**
 * Search legal knowledge by keywords
 */
export function searchLegalKnowledge(query: string): LegalArticle[] {
  const lowerQuery = query.toLowerCase();
  return LEGAL_KNOWLEDGE_BASE.filter(article => 
    article.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ||
    article.titleEn.toLowerCase().includes(lowerQuery) ||
    article.contentEn.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all legal articles for a specific law
 */
export function getLegalArticlesByLaw(lawNumber: string): LegalArticle[] {
  return LEGAL_KNOWLEDGE_BASE.filter(article => article.lawNumber === lawNumber);
}

/**
 * Build legal context for LLM prompts
 */
export function buildLegalContext(category?: string): string {
  const articles = category 
    ? getLegalKnowledgeByCategory(category)
    : LEGAL_KNOWLEDGE_BASE;
  
  return articles.map(article => {
    const articleRef = article.articleNumber 
      ? `Article ${article.articleNumber}` 
      : article.lawNumber;
    return `**${article.lawName} (${articleRef})**\n${article.titleEn}\n${article.contentEn}`;
  }).join('\n\n');
}
