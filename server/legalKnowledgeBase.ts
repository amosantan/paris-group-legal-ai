/**
 * Legal Knowledge Base for Paris Group Dubai Legal AI
 * Contains UAE/Dubai laws, regulations, and legal provisions
 * EXPANDED VERSION with comprehensive coverage
 */

export interface LegalArticle {
  lawName: string;
  lawNumber: string;
  articleNumber?: string;
  titleEn: string;
  titleAr?: string;
  contentEn: string;
  contentAr?: string;
  category: "rental_law" | "civil_code" | "rera_regulation" | "escrow_law" | "real_estate_law" | "strata_law" | "procedures" | "other";
  keywords: string[];
  practicalExample?: string;
}

export const LEGAL_KNOWLEDGE_BASE: LegalArticle[] = [
  // ============================================
  // DUBAI RENTAL LAW 26/2007
  // ============================================
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
    keywords: ["termination", "eviction", "contract", "notice"],
    practicalExample: "If a tenant has a 1-year lease, the landlord cannot terminate it mid-term unless the tenant breaches the contract (e.g., non-payment of rent)."
  },
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    articleNumber: "16",
    titleEn: "Landlord Maintenance Obligations",
    contentEn: "The landlord is responsible for conducting maintenance, repairs, or addressing any damages that prevent the tenant from benefiting from the leased property, unless otherwise agreed in the contract.",
    category: "rental_law",
    keywords: ["maintenance", "repairs", "landlord obligation", "property damage"],
    practicalExample: "If the air conditioning system breaks down, the landlord must repair it. However, if the contract states that the tenant is responsible for AC maintenance, the tenant must handle it."
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
    keywords: ["rent increase", "two years", "RERA index", "rental increase limitation"],
    practicalExample: "If a tenant moved in on January 1, 2023, the landlord cannot increase rent until January 1, 2025. The increase must follow RERA's rental index calculator."
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
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    titleEn: "Notice Period Requirements",
    contentEn: "For rent increases or contract non-renewal, landlords must provide tenants with written notice at least 90 days before contract expiration. For eviction due to personal use, 12 months' notice is required. Tenants must provide 90 days' notice if they do not wish to renew.",
    titleAr: "متطلبات فترة الإشعار",
    contentAr: "بالنسبة لزيادات الإيجار أو عدم تجديد العقد، يجب على الملاك تقديم إشعار كتابي للمستأجرين قبل 90 يوماً على الأقل من انتهاء العقد. للإخلاء بسبب الاستخدام الشخصي، يلزم إشعار 12 شهراً. يجب على المستأجرين تقديم إشعار 90 يوماً إذا كانوا لا يرغبون في التجديد.",
    category: "rental_law",
    keywords: ["notice period", "90 days", "12 months", "renewal", "eviction notice"],
    practicalExample: "If a lease expires on December 31, 2024, the landlord must notify the tenant by October 2, 2024 (90 days before) if they want to increase rent or not renew."
  },
  {
    lawName: "Dubai Rental Law",
    lawNumber: "26/2007",
    titleEn: "Ejari Registration Requirement",
    contentEn: "All tenancy contracts in Dubai must be registered with Ejari (the official rental registration system). Unregistered contracts are not legally enforceable and cannot be used in disputes at the Rental Dispute Centre.",
    titleAr: "متطلبات تسجيل إيجاري",
    contentAr: "يجب تسجيل جميع عقود الإيجار في دبي في إيجاري (نظام التسجيل الإيجاري الرسمي). العقود غير المسجلة غير قابلة للتنفيذ قانوناً ولا يمكن استخدامها في النزاعات في مركز تسوية المنازعات الإيجارية.",
    category: "rental_law",
    keywords: ["Ejari", "registration", "tenancy contract", "legal enforcement"]
  },

  // ============================================
  // UAE CIVIL CODE (Federal Law 5/1985)
  // ============================================
  {
    lawName: "UAE Civil Code",
    lawNumber: "5/1985",
    articleNumber: "1",
    titleEn: "Application of Law and Islamic Shari'a",
    contentEn: "Legislative provisions shall be applicable to all matters dealt therein, in letter and context. In absence of a text in this Law, the judge shall adjudicate according to the Islamic Shari'a taking into consideration the choice of the most appropriate solutions in the schools of Imam Malek and Imam Ahmad Ben Hanbal.",
    category: "civil_code",
    keywords: ["Islamic Shari'a", "application", "judge", "interpretation"]
  },
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
    articleNumber: "125",
    titleEn: "Contract Formation Requirements",
    contentEn: "A valid contract requires mutual consent (offer and acceptance), lawful subject matter, and a lawful cause. Contracts must be in writing for real estate transactions and rental agreements in Dubai.",
    category: "civil_code",
    keywords: ["contract", "consent", "writing requirement", "validity", "offer", "acceptance"]
  },
  {
    lawName: "UAE Civil Code",
    lawNumber: "5/1985",
    articleNumber: "246",
    titleEn: "Performance of Contracts",
    contentEn: "The contract must be performed in accordance with its contents, and in a manner consistent with the requirements of good faith. The contract is not confined to obligating the contractor to what is expressly stated therein, but also includes what is appurtenant thereto.",
    category: "civil_code",
    keywords: ["contract performance", "good faith", "obligations"]
  },
  {
    lawName: "UAE Civil Code",
    lawNumber: "5/1985",
    articleNumber: "267",
    titleEn: "Breach of Contract and Damages",
    contentEn: "If a person fails to perform his contractual obligation, or delays in performing it, he shall be liable to compensate the damage resulting therefrom, unless he proves that the failure or delay was due to a cause beyond his control.",
    category: "civil_code",
    keywords: ["breach", "damages", "compensation", "liability", "force majeure"]
  },
  {
    lawName: "UAE Civil Code",
    lawNumber: "5/1985",
    articleNumber: "871-890",
    titleEn: "Property Ownership Rights",
    contentEn: "Ownership is the right of the owner to dispose of the thing owned and to enjoy the benefits thereof, within the limits of the law. The owner may use, exploit, and dispose of his property.",
    category: "civil_code",
    keywords: ["ownership", "property rights", "disposal", "benefits"]
  },
  {
    lawName: "UAE Civil Code",
    lawNumber: "5/1985",
    articleNumber: "1037",
    titleEn: "Lease Contract Definition",
    contentEn: "A lease is a contract whereby the lessor undertakes to enable the lessee to benefit from a specified thing for a specified period in consideration of a specified rent.",
    category: "civil_code",
    keywords: ["lease", "rental contract", "lessor", "lessee", "rent"]
  },

  // ============================================
  // ESCROW LAW (Dubai Law 8/2007)
  // ============================================
  {
    lawName: "Dubai Escrow Law",
    lawNumber: "8/2007",
    articleNumber: "1",
    titleEn: "Escrow Account Mandate",
    contentEn: "Law No. (8) of 2007 mandates that developers selling off-plan properties must establish dedicated escrow accounts for each project. All buyer payments must be deposited into these RERA-approved accounts.",
    titleAr: "إلزامية حساب الضمان",
    contentAr: "يفرض القانون رقم (8) لسنة 2007 على المطورين الذين يبيعون العقارات على الخريطة إنشاء حسابات ضمان مخصصة لكل مشروع. يجب إيداع جميع مدفوعات المشترين في هذه الحسابات المعتمدة من RERA.",
    category: "escrow_law",
    keywords: ["escrow", "off-plan", "developer", "RERA", "buyer protection"]
  },
  {
    lawName: "Dubai Escrow Law",
    lawNumber: "8/2007",
    articleNumber: "2",
    titleEn: "Escrow Account Definitions",
    contentEn: "Escrow Account: The bank account of a real estate development project in which payments made by purchasers of Units sold off-plan or by project financiers are deposited. Escrow Agent: The financial or banking institution accredited by the Department to manage an Escrow Account.",
    category: "escrow_law",
    keywords: ["escrow account", "escrow agent", "bank", "definition"]
  },
  {
    lawName: "Dubai Escrow Law",
    lawNumber: "8/2007",
    titleEn: "Fund Release Conditions",
    contentEn: "Funds in escrow accounts can only be released to developers upon completion of specific construction milestones verified by independent engineers. This protects buyers from project abandonment or fund misuse.",
    category: "escrow_law",
    keywords: ["fund release", "milestones", "construction", "buyer protection"]
  },
  {
    lawName: "Dubai Escrow Law",
    lawNumber: "8/2007",
    titleEn: "Developer Registration Requirement",
    contentEn: "Developers must register with Dubai Land Department and obtain approval before establishing escrow accounts. The Register maintained by the Department tracks all registered developers.",
    category: "escrow_law",
    keywords: ["developer registration", "DLD", "approval", "register"]
  },

  // ============================================
  // STRATA LAW (Dubai Law 27/2007)
  // ============================================
  {
    lawName: "Dubai Strata Law",
    lawNumber: "27/2007",
    articleNumber: "1",
    titleEn: "Jointly Owned Property Regulation",
    contentEn: "Law No. 27 of 2007 regulates jointly owned properties (strata titles) in Dubai, establishing the framework for owners' associations, common area management, and service charge collection in shared developments.",
    titleAr: "تنظيم الملكية المشتركة",
    contentAr: "ينظم القانون رقم 27 لسنة 2007 العقارات ذات الملكية المشتركة في دبي، ويضع الإطار لجمعيات الملاك وإدارة المناطق المشتركة وتحصيل رسوم الخدمة في التطويرات المشتركة.",
    category: "strata_law",
    keywords: ["strata", "jointly owned", "owners association", "common areas", "service charges"]
  },
  {
    lawName: "Dubai Strata Law",
    lawNumber: "27/2007",
    articleNumber: "5",
    titleEn: "Owners' Association Formation",
    contentEn: "An Owners' Association must be formed for each jointly owned property. The association is responsible for managing common areas, collecting service charges, and maintaining shared facilities.",
    category: "strata_law",
    keywords: ["owners association", "management", "common areas", "service charges"]
  },
  {
    lawName: "Dubai Strata Law",
    lawNumber: "27/2007",
    titleEn: "Service Charge Obligations",
    contentEn: "All unit owners must pay service charges for maintenance of common areas, security, cleaning, and shared utilities. Non-payment can result in legal action and property liens.",
    category: "strata_law",
    keywords: ["service charges", "maintenance", "payment obligation", "lien"]
  },
  {
    lawName: "Dubai Strata Law",
    lawNumber: "27/2007",
    titleEn: "Common Area Definition",
    contentEn: "Common areas include lobbies, elevators, staircases, parking areas, swimming pools, gyms, and other shared facilities. These are owned collectively by all unit owners.",
    category: "strata_law",
    keywords: ["common areas", "shared facilities", "collective ownership"]
  },

  // ============================================
  // RERA REGULATIONS
  // ============================================
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
    lawNumber: "RERA/180",
    titleEn: "180-Day Rule for Developers",
    contentEn: "The rule of 180 days in Dubai requires developers to start a project within 180 days following RERA approval. This ensures timely project commencement and protects buyer interests.",
    category: "rera_regulation",
    keywords: ["180 days", "developer obligation", "project start", "RERA approval"]
  },
  {
    lawName: "RERA Regulations",
    lawNumber: "RERA/Calculator",
    titleEn: "RERA Rental Increase Calculator",
    contentEn: "RERA provides an official rental increase calculator that determines the maximum allowable rent increase based on current market rates. Landlords cannot exceed this calculated amount.",
    titleAr: "حاسبة زيادة الإيجار من RERA",
    contentAr: "توفر RERA حاسبة رسمية لزيادة الإيجار تحدد الحد الأقصى المسموح به لزيادة الإيجار بناءً على أسعار السوق الحالية. لا يمكن للمالكين تجاوز هذا المبلغ المحسوب.",
    category: "rera_regulation",
    keywords: ["rent calculator", "rent increase", "maximum", "market rate"]
  },

  // ============================================
  // RENTAL DISPUTE CENTRE PROCEDURES
  // ============================================
  {
    lawName: "Rental Dispute Centre",
    lawNumber: "Decree 2/1993",
    titleEn: "Special Tribunal for Rental Disputes",
    contentEn: "Decree No. (2) of 1993 established a Special Tribunal for the Settlement of Disputes between Landlords and Tenants. The Rental Dispute Centre (RDC) handles all rental-related disputes in Dubai, including eviction cases, rent increases, and security deposit claims.",
    titleAr: "المحكمة الخاصة لنزاعات الإيجار",
    contentAr: "أنشأ المرسوم رقم (2) لسنة 1993 محكمة خاصة لتسوية النزاعات بين الملاك والمستأجرين. يتعامل مركز تسوية المنازعات الإيجارية (RDC) مع جميع النزاعات المتعلقة بالإيجار في دبي، بما في ذلك قضايا الإخلاء وزيادات الإيجار ومطالبات التأمين.",
    category: "procedures",
    keywords: ["RDC", "dispute resolution", "tribunal", "eviction", "rental disputes"]
  },
  {
    lawName: "RDC Procedures",
    lawNumber: "RDC/Filing",
    titleEn: "Case Registration Steps",
    contentEn: "To file a rental dispute: (1) Create account on RDC system, (2) Log in and add lease contract information, (3) Add parties' information, (4) Add lawsuit requests, (5) Upload supporting documents, (6) Save and submit electronically. Filing fee is 3.5% of annual rent (minimum AED 500, maximum AED 20,000).",
    titleAr: "خطوات تسجيل القضية",
    contentAr: "لتقديم نزاع إيجاري: (1) إنشاء حساب في نظام RDC، (2) تسجيل الدخول وإضافة معلومات عقد الإيجار، (3) إضافة معلومات الأطراف، (4) إضافة طلبات الدعوى، (5) تحميل المستندات الداعمة، (6) الحفظ والإرسال إلكترونياً. رسوم التقديم 3.5٪ من الإيجار السنوي (الحد الأدنى 500 درهم، الحد الأقصى 20,000 درهم).",
    category: "procedures",
    keywords: ["case filing", "RDC", "registration", "filing fee", "procedure"]
  },
  {
    lawName: "RDC Procedures",
    lawNumber: "RDC/Timeline",
    titleEn: "Dispute Resolution Timeline",
    contentEn: "RDC dispute process: (1) Mediation/Conciliation attempt (amicable settlement), (2) First Instance hearing if mediation fails, (3) Verdict issued within 30 days of filing, (4) Appeal option available within specified period. Total process typically 30-60 days for standard cases.",
    category: "procedures",
    keywords: ["timeline", "mediation", "hearing", "verdict", "30 days", "appeal"]
  },
  {
    lawName: "RDC Procedures",
    lawNumber: "RDC/Documents",
    titleEn: "Required Documentation for Filing",
    contentEn: "Required documents for RDC case: (1) Valid Ejari-registered lease contract, (2) Emirates ID copies of both parties, (3) Proof of payment/rent receipts, (4) Any relevant correspondence between parties, (5) Supporting evidence for the claim, (6) Notarized eviction notice if applicable.",
    category: "procedures",
    keywords: ["documents", "Ejari", "Emirates ID", "receipts", "evidence"]
  },
  {
    lawName: "RDC Procedures",
    lawNumber: "RDC/Appeal",
    titleEn: "Appeal Process",
    contentEn: "Appeals must be filed within the specified timeframe after verdict issuance. Appeals require deposit fee and separate appeal fee. Appeal outcomes can confirm, modify, or overturn the original verdict. Final appeal decisions are binding.",
    category: "procedures",
    keywords: ["appeal", "deposit", "fee", "verdict", "binding"]
  },

  // ============================================
  // REAL ESTATE TRANSACTIONS
  // ============================================
  {
    lawName: "Dubai Land Department",
    lawNumber: "DLD/Oqood",
    titleEn: "Oqood Certificate for Off-Plan Properties",
    contentEn: "Oqood is a provisional registration certificate issued by Dubai Land Department for off-plan properties. It serves as proof of the sale agreement and must be registered before property transfer. Registration fees are typically 4% of property value plus administrative charges.",
    titleAr: "شهادة العقود للعقارات قيد الإنشاء",
    contentAr: "العقود هي شهادة تسجيل مؤقتة تصدرها دائرة الأراضي والأملاك في دبي للعقارات قيد الإنشاء. وهي بمثابة إثبات لاتفاقية البيع ويجب تسجيلها قبل نقل الملكية. رسوم التسجيل عادة 4٪ من قيمة العقار بالإضافة إلى الرسوم الإدارية.",
    category: "real_estate_law",
    keywords: ["Oqood", "off-plan", "registration", "DLD", "property transfer", "4% fee"]
  },
  {
    lawName: "Dubai Land Department",
    lawNumber: "DLD/Transfer",
    titleEn: "Property Transfer Fees",
    contentEn: "Property transfer in Dubai incurs: (1) DLD transfer fee: 4% of property value, (2) Trustee office fee: AED 4,000 + VAT, (3) Mortgage registration (if applicable): 0.25% of loan amount + AED 290. Buyer and seller typically split the 4% DLD fee.",
    category: "real_estate_law",
    keywords: ["transfer fee", "4%", "DLD", "trustee", "mortgage", "registration"]
  },
  {
    lawName: "Dubai Land Department",
    lawNumber: "DLD/Title",
    titleEn: "Title Deed Issuance",
    contentEn: "Upon completion of property purchase and payment of all fees, Dubai Land Department issues a Title Deed (certificate of ownership). This is the legal proof of property ownership and must be kept securely.",
    category: "real_estate_law",
    keywords: ["title deed", "ownership", "certificate", "DLD"]
  },
  {
    lawName: "Dubai Property Law",
    lawNumber: "Law 7/2006",
    titleEn: "Property Registration Requirements",
    contentEn: "Law No. 7 of 2006 mandates registration of all real property transactions with Dubai Land Department. Unregistered transactions are not legally recognized and cannot be enforced in courts.",
    category: "real_estate_law",
    keywords: ["registration", "property law", "DLD", "legal recognition"]
  },
  {
    lawName: "Dubai Property Law",
    lawNumber: "Regulation 3/2006",
    titleEn: "Freehold Areas for Foreign Ownership",
    contentEn: "Regulation No. 3 of 2006 designates specific areas in Dubai where non-UAE nationals can own freehold property. These include areas like Dubai Marina, Downtown Dubai, Palm Jumeirah, and other designated zones.",
    category: "real_estate_law",
    keywords: ["freehold", "foreign ownership", "designated areas", "non-UAE nationals"]
  },

  // ============================================
  // PRACTICAL SCENARIOS
  // ============================================
  {
    lawName: "Common Scenario",
    lawNumber: "Scenario/NonPayment",
    titleEn: "Tenant Non-Payment of Rent",
    contentEn: "If tenant fails to pay rent: (1) Landlord sends written notice demanding payment within 30 days, (2) If no payment, landlord files case at RDC, (3) RDC attempts mediation, (4) If mediation fails, tribunal issues eviction order, (5) Execution department enforces eviction. Process takes 2-3 months.",
    category: "procedures",
    keywords: ["non-payment", "eviction", "process", "timeline"],
    practicalExample: "Tenant hasn't paid rent for 2 months. Landlord sends notice on March 1st. If no payment by March 31st, landlord files RDC case on April 1st. Verdict expected by May 1st."
  },
  {
    lawName: "Common Scenario",
    lawNumber: "Scenario/Maintenance",
    titleEn: "Maintenance Dispute Resolution",
    contentEn: "For maintenance disputes: (1) Tenant notifies landlord in writing of issue, (2) Landlord must respond within reasonable time (typically 7-14 days), (3) If landlord refuses or delays, tenant can file RDC case, (4) Tribunal determines responsibility based on contract and law, (5) Losing party pays costs.",
    category: "procedures",
    keywords: ["maintenance", "dispute", "responsibility", "RDC"],
    practicalExample: "AC breaks in summer. Tenant emails landlord on June 1st. No response by June 15th. Tenant files RDC case. Tribunal orders landlord to repair within 7 days or tenant can repair and deduct from rent."
  },
  {
    lawName: "Common Scenario",
    lawNumber: "Scenario/DepositReturn",
    titleEn: "Security Deposit Return Dispute",
    contentEn: "Upon lease end: (1) Landlord inspects property, (2) Landlord must return deposit within 14 days minus legitimate deductions, (3) Landlord must provide itemized list of deductions with proof, (4) If tenant disputes, file RDC case within 30 days, (5) Tribunal reviews evidence and decides.",
    category: "procedures",
    keywords: ["security deposit", "return", "deductions", "dispute"],
    practicalExample: "Lease ends December 31st. Landlord claims AED 5,000 for 'damages' but provides no photos or invoices. Tenant files RDC case on January 15th. Tribunal orders full deposit return due to lack of evidence."
  },
  {
    lawName: "Common Scenario",
    lawNumber: "Scenario/UnfairIncrease",
    titleEn: "Challenging Unfair Rent Increase",
    contentEn: "If landlord proposes excessive rent increase: (1) Check RERA calculator for maximum allowed increase, (2) If landlord's increase exceeds RERA limit, reject in writing, (3) If landlord insists, file RDC case, (4) Provide RERA calculator result as evidence, (5) Tribunal enforces RERA limits.",
    category: "procedures",
    keywords: ["rent increase", "RERA calculator", "unfair", "challenge"],
    practicalExample: "Current rent: AED 80,000. Landlord wants AED 95,000 (18.75% increase). RERA calculator shows max 5% allowed. Tenant files RDC case with calculator printout. Tribunal limits increase to AED 84,000."
  },
  
  // OFF-PLAN PROPERTY LAWS
  {
    lawName: "Law Amending Interim Real Property Register Law",
    lawNumber: "19/2017",
    articleNumber: "11(a)(4)(A)",
    titleEn: "Developer Remedies - Over 80% Completion",
    titleAr: "خيارات المطور - أكثر من 80٪ إنجاز",
    contentEn: "Where completion exceeds 80%, Developer may: (1) maintain agreement and claim balance; (2) request DLD auction; or (3) terminate, retain up to 40% of unit value, refund excess within 1 year or 60 days from resale.",
    contentAr: "عندما يتجاوز الإنجاز 80٪، يجوز للمطور: (1) الحفاظ على الاتفاقية والمطالبة بالرصيد؛ (2) طلب مزاد دائرة الأراضي؛ أو (3) الإنهاء، والاحتفاظ بما يصل إلى 40٪ من قيمة الوحدة، ورد الفائض خلال سنة أو 60 يوماً من إعادة البيع.",
    category: "real_estate_law",
    keywords: ["off-plan", "80% completion", "developer rights", "40% retention"],
    practicalExample: "Apartment 85% complete, buyer defaults. Developer can cancel and keep 40% of price as compensation."
  },
  {
    lawName: "Law Amending Interim Real Property Register Law",
    lawNumber: "19/2017",
    articleNumber: "11(a)(4)(B-C)",
    titleEn: "Developer Remedies - Under 80% Completion",
    titleAr: "خيارات المطور - أقل من 80٪ إنجاز",
    contentEn: "60-80% completion: Developer may terminate, retain up to 40%, refund excess within 1 year or 60 days from resale. Under 60% (work commenced): terminate, retain up to 25%, same refund timeline. Work not commenced (beyond developer control): terminate, retain up to 30%, refund within 60 days.",
    contentAr: "60-80٪ إنجاز: يجوز للمطور الإنهاء، والاحتفاظ بما يصل إلى 40٪، ورد الفائض خلال سنة أو 60 يوماً. أقل من 60٪ (بدأ العمل): الإنهاء، والاحتفاظ بما يصل إلى 25٪، نفس المهلة. لم يبدأ العمل (خارج سيطرة المطور): الإنهاء، والاحتفاظ بما يصل إلى 30٪، الرد خلال 60 يوماً.",
    category: "real_estate_law",
    keywords: ["off-plan", "under 80%", "25% retention", "30% retention"],
    practicalExample: "Villa 40% complete, buyer stops paying. Developer cancels, keeps 25% of price, refunds rest within 1 year."
  },
  {
    lawName: "RERA Regulations",
    lawNumber: "RERA/RDC",
    titleEn: "RDC Filing Fees and Process",
    titleAr: "رسوم وعملية تقديم مركز تسوية المنازعات",
    contentEn: "RDC charges 3.5% of annual rent (min AED 500, max AED 20,000). Process: (1) File case with fees, (2) Mediation attempt (1-2 sessions), (3) Hearing if mediation fails, (4) Judgment within 2-4 weeks, (5) Appeal within 15 days, (6) Execution by Dubai Police.",
    contentAr: "يفرض مركز تسوية المنازعات 3.5٪ من الإيجار السنوي (حد أدنى 500 درهم، حد أقصى 20,000 درهم). العملية: (1) تقديم القضية مع الرسوم، (2) محاولة الوساطة (1-2 جلسة), (3) جلسة استماع إذا فشلت الوساطة، (4) حكم خلال 2-4 أسابيع، (5) استئناف خلال 15 يوماً، (6) تنفيذ من قبل شرطة دبي.",
    category: "procedures",
    keywords: ["RDC", "fees", "3.5%", "process", "mediation", "hearing"],
    practicalExample: "Rent AED 80,000, RDC fee is AED 2,800. File case, attend mediation, if no agreement, hearing scheduled within 3 weeks."
  },
  {
    lawName: "RERA Regulations",
    lawNumber: "RERA/Calculator",
    titleEn: "RERA Rent Increase Calculator Limits",
    titleAr: "حدود حاسبة زيادة الإيجار من ريرا",
    contentEn: "Rent increase based on market gap: Up to 10% below market = no increase; 11-20% below = max 5% increase; 21-30% below = max 10% increase; 31-40% below = max 15% increase; Over 40% below = max 20% increase. No increase before 2 years from tenancy start or last increase.",
    contentAr: "زيادة الإيجار بناءً على فجوة السوق: حتى 10٪ أقل من السوق = لا زيادة؛ 11-20٪ أقل = زيادة بحد أقصى 5٪؛ 21-30٪ أقل = زيادة بحد أقصى 10٪؛ 31-40٪ أقل = زيادة بحد أقصى 15٪؛ أكثر من 40٪ أقل = زيادة بحد أقصى 20٪. لا زيادة قبل عامين من بداية الإيجار أو آخر زيادة.",
    category: "rera_regulation",
    keywords: ["rent increase", "RERA calculator", "market rent", "percentage limits", "2-year rule"],
    practicalExample: "Market rent AED 100,000, tenant pays AED 70,000 (30% below). Landlord can increase by max 10% to AED 77,000 after 2 years."
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
    article.contentEn.toLowerCase().includes(lowerQuery) ||
    (article.practicalExample && article.practicalExample.toLowerCase().includes(lowerQuery))
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
    
    let context = `**${article.lawName} (${articleRef})**\n${article.titleEn}\n${article.contentEn}`;
    
    if (article.practicalExample) {
      context += `\n\n*Practical Example:* ${article.practicalExample}`;
    }
    
    return context;
  }).join('\n\n');
}

/**
 * Get statistics about the knowledge base
 */
export function getKnowledgeBaseStats() {
  return {
    totalArticles: LEGAL_KNOWLEDGE_BASE.length,
    byCategory: {
      rental_law: getLegalKnowledgeByCategory("rental_law").length,
      civil_code: getLegalKnowledgeByCategory("civil_code").length,
      escrow_law: getLegalKnowledgeByCategory("escrow_law").length,
      strata_law: getLegalKnowledgeByCategory("strata_law").length,
      rera_regulation: getLegalKnowledgeByCategory("rera_regulation").length,
      real_estate_law: getLegalKnowledgeByCategory("real_estate_law").length,
      procedures: getLegalKnowledgeByCategory("procedures").length,
      other: getLegalKnowledgeByCategory("other").length,
    },
    withPracticalExamples: LEGAL_KNOWLEDGE_BASE.filter(a => a.practicalExample).length,
    withArabicTranslation: LEGAL_KNOWLEDGE_BASE.filter(a => a.contentAr).length,
  };
}
