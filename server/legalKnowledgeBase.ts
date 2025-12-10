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
  category: "rental_law" | "civil_code" | "rera_regulation" | "escrow_law" | "real_estate_law" | "strata_law" | "procedures" | "mortgage_law" | "property_registration" | "difc_law" | "other";
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
  },

  // ============================================
  // DUBAI MORTGAGE LAW 14/2008
  // ============================================
  {
    lawName: "Dubai Mortgage Law",
    lawNumber: "14/2008",
    articleNumber: "1",
    titleEn: "Title and Citation",
    titleAr: "العنوان والاستشهاد",
    contentEn: "This Law shall be entitled 'Dubai Law No. 14/2008 on Mortgage in the Emirate of Dubai'. It governs the mortgage of property and property units as security for debt in Dubai.",
    contentAr: "يُطلق على هذا القانون اسم 'قانون دبي رقم 14 لسنة 2008 بشأن الرهن في إمارة دبي'. ينظم رهن العقارات ووحدات العقارات كضمان للديون في دبي.",
    category: "mortgage_law",
    keywords: ["mortgage", "title", "Dubai", "property security", "debt"]
  },
  {
    lawName: "Dubai Mortgage Law",
    lawNumber: "14/2008",
    articleNumber: "3",
    titleEn: "Scope of Application",
    titleAr: "نطاق التطبيق",
    contentEn: "The provisions of this Law apply to the Mortgage of Property and Property Units as security for debt. It makes no difference whether the debt is present, future, conditional, or contingent.",
    contentAr: "تنطبق أحكام هذا القانون على رهن العقارات ووحدات العقارات كضمان للديون. لا فرق إذا كان الدين حاضراً أو مستقبلياً أو مشروطاً أو محتملاً.",
    category: "mortgage_law",
    keywords: ["scope", "application", "property mortgage", "security", "debt types"],
    practicalExample: "A bank can mortgage a property for a current loan or a future credit line. Both are covered under this law."
  },
  {
    lawName: "Dubai Mortgage Law",
    lawNumber: "14/2008",
    articleNumber: "4",
    titleEn: "Eligible Mortgagees",
    titleAr: "المرتهنون المؤهلون",
    contentEn: "The mortgagee must be a bank, company, or financial institution duly licensed and registered with the UAE Central Bank to provide property financing in the UAE. The mortgagor must be the owner of the mortgaged property and in a position to dispose of the same.",
    contentAr: "يجب أن يكون المرتهن بنكاً أو شركة أو مؤسسة مالية مرخصة ومسجلة لدى البنك المركزي الإماراتي لتقديم التمويل العقاري في الإمارات. يجب أن يكون الراهن مالك العقار المرهون وفي وضع يسمح له بالتصرف فيه.",
    category: "mortgage_law",
    keywords: ["mortgagee", "lender", "bank", "Central Bank", "licensed", "mortgagor", "owner"],
    practicalExample: "Only UAE Central Bank-licensed banks like Emirates NBD, ADCB, or Mashreq can act as mortgagees. Individual lenders cannot create valid mortgages."
  },
  {
    lawName: "Dubai Mortgage Law",
    lawNumber: "14/2008",
    titleEn: "Registration Requirement",
    titleAr: "متطلبات التسجيل",
    contentEn: "Only mortgages registered with the Dubai Land Department on the real estate register or the interim register will be considered valid. The ranking of the mortgage is determined by the time of registration, with a serial number allocated on registration.",
    contentAr: "تعتبر الرهونات المسجلة لدى دائرة الأراضي والأملاك في دبي في سجل العقارات أو السجل المؤقت صالحة فقط. يتم تحديد ترتيب الرهن حسب وقت التسجيل، مع تخصيص رقم تسلسلي عند التسجيل.",
    category: "mortgage_law",
    keywords: ["registration", "Dubai Land Department", "DLD", "validity", "ranking", "serial number"],
    practicalExample: "Bank A registers mortgage on January 1st, Bank B on January 15th. Bank A has first priority if property is sold. Unregistered mortgages have no legal effect."
  },
  {
    lawName: "Dubai Mortgage Law",
    lawNumber: "14/2008",
    titleEn: "Interim Register Transfer",
    titleAr: "نقل السجل المؤقت",
    contentEn: "If a mortgage is registered on the interim register, at the time of transfer of title to the real estate register, all mortgages and other interests noted on the interim register will automatically be transferred to and registered on the real estate register.",
    contentAr: "إذا تم تسجيل الرهن في السجل المؤقت، فعند نقل الملكية إلى سجل العقارات، سيتم نقل جميع الرهونات والمصالح الأخرى المسجلة في السجل المؤقت تلقائياً وتسجيلها في سجل العقارات.",
    category: "mortgage_law",
    keywords: ["interim register", "transfer", "real estate register", "automatic", "off-plan"],
    practicalExample: "For off-plan properties, mortgage registered on interim register automatically transfers to main register when building completes and title deed is issued."
  },
  {
    lawName: "Dubai Mortgage Law",
    lawNumber: "14/2008",
    titleEn: "Prohibited Self-Help Clauses",
    titleAr: "بنود المساعدة الذاتية المحظورة",
    contentEn: "Any clause in a mortgage contract stipulating that when the borrower fails to pay the mortgage debt within the specified period, the lender shall have title to the mortgaged property or can sell the mortgaged property without taking the enforcement steps required under law, shall be considered as void.",
    contentAr: "أي بند في عقد الرهن ينص على أنه عندما يفشل المقترض في سدا د الدين المرهون خلال الفترة المحددة، يحق للمقرض الحصول على ملكية العقار المرهون أو بيع العقار المرهون دون اتخاذ خطوات التنفيذ المطلوبة بموجب القانون، يعتبر باطلاً.",
    category: "mortgage_law",
    keywords: ["prohibited clauses", "self-help", "void", "automatic transfer", "illegal"],
    practicalExample: "A bank cannot include a clause saying 'if you don't pay, we automatically own the property'. Such clauses are void. Banks must follow legal enforcement procedures."
  },
  {
    lawName: "Dubai Mortgage Law",
    lawNumber: "14/2008",
    titleEn: "Enforcement Procedure - 30 Day Notice",
    titleAr: "إجراءات التنفيذ - إشعار 30 يوماً",
    contentEn: "In the event of default in payment of the debt when due, the lender must provide the borrower 30 days written notice through the Notary Public before commencing execution proceedings. This notice is mandatory before any court action.",
    contentAr: "في حالة التخلف عن سداد الدين عند استحقاقه، يجب على المقرض تقديم إشعار كتابي للمقترض لمدة 30 يوماً من خلال كاتب العدل قبل البدء في إجراءات التنفيذ. هذا الإشعار إلزامي قبل أي إجراء قضائي.",
    category: "mortgage_law",
    keywords: ["enforcement", "default", "30 days notice", "Notary Public", "mandatory"],
    practicalExample: "If borrower misses 3 monthly payments, bank must send 30-day notice via Notary Public. If borrower pays within 30 days, enforcement stops. If not, bank can proceed to court."
  },
  {
    lawName: "Dubai Mortgage Law",
    lawNumber: "14/2008",
    titleEn: "Court-Ordered Attachment and Sale",
    titleAr: "الحجز والبيع بأمر من المحكمة",
    contentEn: "If within the 30 day period the borrower fails to pay the sums due, the execution judge shall, upon request of the lender, order an attachment against the mortgaged property so that it can be sold by public auction in accordance with the applicable procedures of the Dubai Land Department.",
    contentAr: "إذا فشل المقترض في سداد المبالغ المستحقة خلال فترة 30 يوماً، يأمر قاضي التنفيذ، بناءً على طلب المقرض، بالحجز على العقار المرهون بحيث يمكن بيعه بالمزاد العلني وفقاً للإجراءات المعمول بها في دائرة الأراضي والأملاك في دبي.",
    category: "mortgage_law",
    keywords: ["court order", "attachment", "public auction", "execution judge", "sale"],
    practicalExample: "After 30-day notice expires without payment, bank files with execution judge. Judge orders attachment. Property sold at public auction through DLD. Proceeds pay bank debt, remainder goes to owner."
  },
  {
    lawName: "Dubai Mortgage Law",
    lawNumber: "14/2008",
    titleEn: "Multiple Mortgages - Priority Ranking",
    titleAr: "الرهونات المتعددة - ترتيب الأولوية",
    contentEn: "When multiple mortgages exist on the same property, priority is determined by registration time. First registered mortgage has first claim on sale proceeds. Second and subsequent mortgages are paid from remaining proceeds in order of registration.",
    contentAr: "عندما توجد رهونات متعددة على نفس العقار، يتم تحديد الأولوية حسب وقت التسجيل. الرهن المسجل أولاً له الأولوية الأولى على عائدات البيع. يتم دفع الرهونات الثانية واللاحقة من العائدات المتبقية حسب ترتيب التسجيل.",
    category: "mortgage_law",
    keywords: ["multiple mortgages", "priority", "ranking", "first charge", "second charge"],
    practicalExample: "Property worth AED 2M. First mortgage AED 1.5M (Bank A), second mortgage AED 800K (Bank B). If sold for AED 2M: Bank A gets AED 1.5M, Bank B gets AED 500K, owner gets nothing."
  },
  {
    lawName: "Dubai Mortgage Law",
    lawNumber: "14/2008",
    titleEn: "Mortgage Discharge",
    titleAr: "إبراء الرهن",
    contentEn: "Upon full repayment of the mortgage debt, the lender must provide a discharge certificate. The borrower must register the discharge with Dubai Land Department to remove the mortgage from the property title. Registration of discharge is essential to clear the title.",
    contentAr: "عند السداد الكامل للدين المرهون، يجب على المقرض تقديم شهادة إبراء. يجب على المقترض تسجيل الإبراء لدى دائرة الأراضي والأملاك في دبي لإزالة الرهن من سند الملكية. تسجيل الإبراء ضروري لتنظيف السند.",
    category: "mortgage_law",
    keywords: ["discharge", "repayment", "clear title", "registration", "certificate"],
    practicalExample: "After paying final mortgage installment, bank issues discharge letter. Owner must take letter to DLD and pay discharge fee (typically AED 2,000-3,000) to remove mortgage from title deed."
  },

  // ============================================
  // DUBAI PROPERTY REGISTRATION LAW 7/2006
  // ============================================
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "1",
    titleEn: "Title and Scope",
    titleAr: "العنوان والنطاق",
    contentEn: "This Law shall be entitled 'Law No. 7 of 2006 Concerning Real Property Registration in the Emirate of Dubai'. It applies to all real estate within Dubai and provides the framework for property ownership, registration, and governance.",
    contentAr: "يُطلق على هذا القانون اسم 'القانون رقم 7 لسنة 2006 بشأن تسجيل العقارات في إمارة دبي'. ينطبق على جميع العقارات في دبي ويوفر الإطار لملكية العقارات وتسجيلها وإدارتها.",
    category: "property_registration",
    keywords: ["property registration", "title", "Dubai", "real estate", "scope"]
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "3",
    titleEn: "Ownership Rights - UAE and GCC Nationals",
    titleAr: "حقوق الملكية - مواطنو الإمارات ودول مجلس التعاون",
    contentEn: "UAE nationals, GCC nationals, and companies wholly owned by them can own property anywhere in Dubai without restrictions. This includes freehold ownership of land and buildings.",
    contentAr: "يمكن لمواطني الإمارات ومواطني دول مجلس التعاون والشركات المملوكة لهم بالكامل امتلاك العقارات في أي مكان في دبي دون قيود. يشمل ذلك الملكية الحرة للأراضي والمباني.",
    category: "property_registration",
    keywords: ["ownership", "UAE nationals", "GCC", "freehold", "unrestricted"],
    practicalExample: "An Emirati citizen can buy any property in Dubai - villa in Jumeirah, apartment in Deira, or land in Al Barsha. No restrictions apply."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "4",
    titleEn: "Ownership Rights - Foreign Nationals",
    titleAr: "حقوق الملكية - الأجانب",
    contentEn: "Non-UAE nationals (expats and foreign investors) can own property only in designated areas specified by the Ruler of Dubai. They may be granted freehold ownership without time restrictions, or usufruct/leasehold rights for up to 99 years.",
    contentAr: "يمكن لغير مواطني الإمارات (الوافدين والمستثمرين الأجانب) امتلاك العقارات فقط في المناطق المحددة التي يحددها حاكم دبي. قد يُمنحون ملكية حرة دون قيود زمنية، أو حقوق انتفاع/إيجار لمدة تصل إلى 99 عاماً.",
    category: "property_registration",
    keywords: ["foreign ownership", "expats", "designated areas", "freehold", "usufruct", "99 years"],
    practicalExample: "A British investor can buy freehold property in Downtown Dubai, Dubai Marina, or Palm Jumeirah (designated areas), but cannot buy in Deira or Bur Dubai (non-designated areas)."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "5",
    titleEn: "Dubai Land Department Authority",
    titleAr: "سلطة دائرة الأراضي والأملاك",
    contentEn: "The Dubai Land Department (DLD) is the sole authority responsible for real estate registration and enforcement of property laws. DLD maintains all original documents and court rulings related to property registration. Only authorized judicial authorities, experts, and concerned parties may access these documents.",
    contentAr: "دائرة الأراضي والأملاك في دبي هي السلطة الوحيدة المسؤولة عن تسجيل العقارات وإنفاذ قوانين الملكية. تحتفظ الدائرة بجميع المستندات الأصلية والأحكام القضائية المتعلقة بتسجيل العقارات. يمكن فقط للسلطات القضائية المخولة والخبراء والأطراف المعنية الوصول إلى هذه المستندات.",
    category: "property_registration",
    keywords: ["Dubai Land Department", "DLD", "authority", "registration", "documents"],
    practicalExample: "All property transactions in Dubai must go through DLD. Private property registrations or agreements not registered with DLD have no legal validity."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "6",
    titleEn: "DLD Functions and Responsibilities",
    titleAr: "وظائف ومسؤوليات دائرة الأراضي والأملاك",
    contentEn: "DLD key responsibilities include: (1) Managing the Property Register and maintaining ownership records, (2) Overseeing surveying and mapping of land plots and properties, (3) Regulating real estate transactions, contracts and documentation, (4) Establishing rules for valuation, brokerage and auction sales, (5) Setting and collecting registration fees.",
    contentAr: "المسؤوليات الرئيسية لدائرة الأراضي والأملاك تشمل: (1) إدارة سجل العقارات والحفاظ على سجلات الملكية، (2) الإشراف على مسح ورسم خرائط قطع الأراضي والعقارات، (3) تنظيم المعاملات العقارية والعقود والوثائق، (4) وضع قواعد التقييم والوساطة ومبيعات المزادات، (5) تحديد وجمع رسوم التسجيل.",
    category: "property_registration",
    keywords: ["DLD functions", "property register", "surveying", "transactions", "fees"],
    practicalExample: "When buying property, DLD: verifies ownership, checks for mortgages/liens, calculates transfer fees (4% of value), registers new ownership, and issues title deed."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "7-8",
    titleEn: "Property Register - Legal Validity",
    titleAr: "سجل العقارات - الصلاحية القانونية",
    contentEn: "The Property Register serves as an indisputable legal record of property rights. All real estate transactions (creation, transfer or modification of ownership) MUST be recorded. Transactions hold NO legal validity unless registered. The register's data is legally binding unless proven fraudulent. Electronically recorded property documents hold the same evidentiary value as original paper documents.",
    contentAr: "يعمل سجل العقارات كسجل قانوني لا جدال فيه لحقوق الملكية. يجب تسجيل جميع المعاملات العقارية (إنشاء أو نقل أو تعديل الملكية). المعاملات ليس لها صلاحية قانونية ما لم يتم تسجيلها. بيانات السجل ملزمة قانوناً ما لم يثبت أنها احتيالية. الوثائق العقارية المسجلة إلكترونياً لها نفس القيمة الإثباتية للوثائق الورقية الأصلية.",
    category: "property_registration",
    keywords: ["property register", "legal validity", "mandatory registration", "binding", "electronic records"],
    practicalExample: "If you buy property but don't register with DLD, you have NO legal ownership. Seller can sell to another buyer who registers first. Only registered owner has legal rights."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "9-10",
    titleEn: "Sale and Transfer Requirements",
    titleAr: "متطلبات البيع والنقل",
    contentEn: "All transactions related to real estate MUST be registered with DLD. If a party fails to transfer property as per an agreement, they are only liable for financial compensation (not specific performance). The law prioritizes monetary damages over forcing property transfer.",
    contentAr: "يجب تسجيل جميع المعاملات المتعلقة بالعقارات لدى دائرة الأراضي والأملاك. إذا فشل طرف في نقل العقار وفقاً للاتفاق، فهو مسؤول فقط عن التعويض المالي (وليس الأداء المحدد). يعطي القانون الأولوية للتعويضات النقدية على إجبار نقل الملكية.",
    category: "property_registration",
    keywords: ["sale", "transfer", "registration", "compensation", "breach"],
    practicalExample: "Seller signs sale agreement but refuses to transfer title. Buyer cannot force transfer, but can sue for financial damages equal to property value plus losses."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "11",
    titleEn: "Inheritance of Property",
    titleAr: "وراثة العقارات",
    contentEn: "Heirs must register a certificate of inheritance before exercising ownership rights if real estate is part of an inheritance. The certificate must be obtained from the relevant court and registered with DLD before heirs can sell, mortgage, or otherwise deal with the inherited property.",
    contentAr: "يجب على الورثة تسجيل شهادة الوراثة قبل ممارسة حقوق الملكية إذا كان العقار جزءاً من الميراث. يجب الحصول على الشهادة من المحكمة المختصة وتسجيلها لدى دائرة الأراضي والأملاك قبل أن يتمكن الورثة من بيع العقار أو رهنه أو التعامل معه بأي شكل آخر.",
    category: "property_registration",
    keywords: ["inheritance", "heirs", "certificate", "court", "registration"],
    practicalExample: "Father dies leaving villa to 3 children. Children must get inheritance certificate from Sharia Court, register with DLD, then can sell villa. Cannot sell without certificate."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "12",
    titleEn: "Unregistered Land Regularization",
    titleAr: "تسوية الأراضي غير المسجلة",
    contentEn: "Individuals possessing unregistered land can apply to regularize their ownership through DLD. This provision allows for the formalization of historical land holdings that predate the modern registration system.",
    contentAr: "يمكن للأفراد الذين يمتلكون أراضي غير مسجلة التقدم بطلب لتسوية ملكيتهم من خلال دائرة الأراضي والأملاك. يسمح هذا الحكم بإضفاء الطابع الرسمي على الحيازات الأرضية التاريخية التي تسبق نظام التسجيل الحديث.",
    category: "property_registration",
    keywords: ["unregistered land", "regularization", "historical ownership", "formalization"],
    practicalExample: "Family has occupied land since 1970s with old documents. Can apply to DLD to regularize ownership and get official title deed."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "15",
    titleEn: "Property Maps and Surveying",
    titleAr: "خرائط العقارات والمساحة",
    contentEn: "Property registration is based on three key maps: (1) Topographic master map showing the overall area, (2) Real Property Unit map showing specific plots, (3) Real Property Area map marking multiple property units in a region. Each property unit must have a separate map detailing its location, boundaries and constructions.",
    contentAr: "يعتمد تسجيل العقارات على ثلاث خرائط رئيسية: (1) الخريطة الطبوغرافية الرئيسية التي تظهر المنطقة الإجمالية، (2) خريطة وحدة العقار التي تظهر القطع المحددة، (3) خريطة منطقة العقار التي تحدد وحدات عقارية متعددة في منطقة. يجب أن يكون لكل وحدة عقارية خريطة منفصلة توضح موقعها وحدودها ومبانيها.",
    category: "property_registration",
    keywords: ["maps", "surveying", "boundaries", "topographic", "plot map"],
    practicalExample: "Before registering villa purchase, DLD verifies property boundaries on official maps. Ensures no encroachment on neighboring plots and building matches approved plans."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "16-21",
    titleEn: "Property Division and Merging",
    titleAr: "تقسيم ودمج العقارات",
    contentEn: "When property is divided, existing easement rights (such as access rights) remain unless they create additional burdens. If two properties merge, any mortgage or collateral rights extend to the entire merged property unless the mortgagee consents to modify the terms. All divisions and mergers must be approved by DLD.",
    contentAr: "عند تقسيم العقار، تبقى حقوق الارتفاق الحالية (مثل حقوق الوصول) ما لم تخلق أعباء إضافية. إذا اندمج عقاران، فإن أي حقوق رهن أو ضمانات تمتد إلى العقار المدمج بالكامل ما لم يوافق المرتهن على تعديل الشروط. يجب الموافقة على جميع التقسيمات والاندماجات من قبل دائرة الأراضي والأملاك.",
    category: "property_registration",
    keywords: ["division", "merging", "easement", "mortgage extension", "DLD approval"],
    practicalExample: "Owner has large plot with AED 5M mortgage. Wants to divide into 2 plots. Bank's mortgage automatically extends to both plots unless bank agrees to split mortgage."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "22-24",
    titleEn: "Title Deeds Issuance",
    titleAr: "إصدار سندات الملكية",
    contentEn: "Once property ownership is registered, DLD issues title deeds that serve as absolute proof of ownership. Multi-storey buildings are considered one unit in the register but have separate records for individual apartments or floor owners. Title deeds include any restrictions, conditions or obligations tied to the property.",
    contentAr: "بمجرد تسجيل ملكية العقار، تصدر دائرة الأراضي والأملاك سندات ملكية تعمل كدليل مطلق على الملكية. تعتبر المباني متعددة الطوابق وحدة واحدة في السجل ولكن لها سجلات منفصلة لأصحاب الشقق أو الطوابق الفردية. تتضمن سندات الملكية أي قيود أو شروط أو التزامات مرتبطة بالعقار.",
    category: "property_registration",
    keywords: ["title deed", "proof of ownership", "multi-storey", "restrictions", "conditions"],
    practicalExample: "Title deed for apartment shows: owner name, building name, plot number, area (sqm), any mortgages, and restrictions (e.g., 'no commercial use')."
  },
  {
    lawName: "Dubai Property Registration Law",
    lawNumber: "7/2006",
    articleNumber: "26",
    titleEn: "Invalid Agreements",
    titleAr: "الاتفاقيات الباطلة",
    contentEn: "Any agreement that violates the provisions of this law is considered null and void. Contracts intended to bypass the law are also unenforceable. Courts, the Public Prosecution or DLD can declare such agreements invalid.",
    contentAr: "أي اتفاق ينتهك أحكام هذا القانون يعتبر باطلاً ولاغياً. العقود التي تهدف إلى تجاوز القانون غير قابلة للتنفيذ أيضاً. يمكن للمحاكم أو النيابة العامة أو دائرة الأراضي والأملاك إعلان هذه الاتفاقيات باطلة.",
    category: "property_registration",
    keywords: ["invalid", "void", "unenforceable", "illegal agreements", "bypass"],
    practicalExample: "Seller and buyer sign agreement to avoid DLD registration fees by not registering sale. Agreement is void. Buyer has no legal ownership and cannot enforce it in court."
  },

  // ============================================
  // DIFC REAL PROPERTY LAW 10/2018 & LEASING LAW 1/2020
  // ============================================
  {
    lawName: "DIFC Real Property Law",
    lawNumber: "10/2018",
    titleEn: "DIFC Independent Jurisdiction",
    titleAr: "السلطة القضائية المستقلة لمركز دبي المالي العالمي",
    contentEn: "DIFC is an independent jurisdiction within UAE with laws modeled on English common law system (not UAE Civil Law). English is the default language. Dubai real property laws do NOT apply to DIFC properties. DIFC Courts have exclusive jurisdiction over DIFC property matters.",
    contentAr: "مركز دبي المالي العالمي هو سلطة قضائية مستقلة داخل الإمارات مع قوانين مصممة على نظام القانون العام الإنجليزي (وليس القانون المدني للإمارات). اللغة الإنجليزية هي اللغة الافتراضية. قوانين العقارات في دبي لا تنطبق على عقارات مركز دبي المالي. محاكم مركز دبي المالي لها ولاية قضائية حصرية على قضايا العقارات في المركز.",
    category: "difc_law",
    keywords: ["DIFC", "independent jurisdiction", "English common law", "DIFC Courts", "separate system"],
    practicalExample: "Property in Gate Village (DIFC) governed by DIFC Law 10/2018 and DIFC Courts. Property in Downtown Dubai (mainland) governed by Dubai Law 7/2006 and Dubai Courts. Cannot mix the two."
  },
  {
    lawName: "DIFC Real Property Law",
    lawNumber: "10/2018",
    titleEn: "Property Ownership in DIFC",
    titleAr: "ملكية العقارات في مركز دبي المالي",
    contentEn: "Within DIFC, all foreign nationals, foreign companies, and GCC nationals have the right to acquire and own real property. No restrictions based on nationality. Ownership rights include freehold title, leasehold, usufruct, and musataha.",
    contentAr: "داخل مركز دبي المالي، يحق لجميع الرعايا الأجانب والشركات الأجنبية ومواطني دول مجلس التعاون الحق في اقتناء وامتلاك العقارات. لا توجد قيود بناءً على الجنسية. تشمل حقوق الملكية الملكية الحرة والإيجار وحق الانتفاع والمساطحة.",
    category: "difc_law",
    keywords: ["DIFC ownership", "foreign nationals", "no restrictions", "freehold", "international investors"],
    practicalExample: "A French company can buy freehold office space in DIFC without any nationality restrictions. Same property in mainland Dubai would require designated area."
  },
  {
    lawName: "DIFC Real Property Law",
    lawNumber: "10/2018",
    titleEn: "Lease Registration - 6 Month Threshold",
    titleAr: "تسجيل عقود الإيجار - حد 6 أشهر",
    contentEn: "Leases with term equal to or greater than 6 months (including renewal options) MUST be registered with Registrar of Real Properties (RORP). Lessor must register within 20 days of lease execution. Penalty of USD $1,000 for failure to register.",
    contentAr: "يجب تسجيل عقود الإيجار بمدة 6 أشهر أو أكثر (بما في ذلك خيارات التجديد) لدى مسجل العقارات. يجب على المؤجر التسجيل خلال 20 يوماً من تنفيذ عقد الإيجار. غرامة 1000 دولار أمريكي عند الفشل في التسجيل.",
    category: "difc_law",
    keywords: ["DIFC lease registration", "6 months", "RORP", "20 days", "penalty"],
    practicalExample: "Office lease in DIFC for 8 months must be registered within 20 days. Mainland Dubai requires registration for leases ≥12 months."
  },
  {
    lawName: "DIFC Real Property Law",
    lawNumber: "10/2018",
    titleEn: "Off-Plan Sales Protection",
    titleAr: "حماية مبيعات على الخريطة",
    contentEn: "Off-plan developments require: (1) Registrar approval and recording in Off-Plan Register, (2) Approved Disclosure Statement for buyers, (3) Escrow account with approved agent. Buyers get: Disclosure Statement before SPA, right to terminate if no disclosure, 12-month defect retention, 1-year warranty (non-structural), 10-year warranty (structural).",
    contentAr: "تتطلب التطويرات على الخريطة: (1) موافقة المسجل والتسجيل في سجل على الخريطة، (2) بيان إفصاح معتمد للمشترين، (3) حساب ضمان مع وكيل معتمد. يحصل المشترون على: بيان إفصاح قبل عقد البيع، حق الإنهاء إذا لم يكن هناك إفصاح، احتجاز عيوب لمدة 12 شهراً، ضمان عام واحد (غير إنشائي)، ضمان 10 سنوات (إنشائي).",
    category: "difc_law",
    keywords: ["DIFC off-plan", "buyer protection", "escrow", "warranty", "disclosure"],
    practicalExample: "Buying off-plan apartment in DIFC: Developer must provide disclosure statement, hold payments in escrow, and provide 10-year structural warranty. Stronger protection than mainland."
  },
  {
    lawName: "DIFC Real Property Law",
    lawNumber: "10/2018",
    titleEn: "Master Community Declaration",
    titleAr: "إعلان المجتمع الرئيسي",
    contentEn: "Master Community Declaration is formally recognized as statutory covenant, enforceable and binding on all owners. Includes right to collect service charges. Registered as 'Covenant in Gross' on each title.",
    contentAr: "يتم الاعتراف بإعلان المجتمع الرئيسي رسمياً كعهد قانوني، قابل للتنفيذ وملزم لجميع الملاك. يشمل الحق في تحصيل رسوم الخدمة. يُسجّل كـ 'عهد إجمالي' على كل سند.",
    category: "difc_law",
    keywords: ["DIFC community", "service charges", "covenant", "binding", "enforceable"],
    practicalExample: "DIFC building's Master Community Declaration requires all owners to pay service charges. Enforceable by law, registered on every title deed."
  },

  // ============================================
  // DIFC LEASING LAW 1/2020
  // ============================================
  {
    lawName: "DIFC Leasing Law",
    lawNumber: "1/2020",
    titleEn: "Application and Scope",
    titleAr: "التطبيق والنطاق",
    contentEn: "Applies to all residential, retail, and commercial leases in DIFC. Exceptions: serviced apartments/hotel rooms, and mortgage-related leases. Applies retroactively to existing leases (with limitations on time-based provisions).",
    contentAr: "ينطبق على جميع عقود الإيجار السكنية والتجزئة والتجارية في مركز دبي المالي. الاستثناءات: الشقق المخدومة/غرف الفنادق، وعقود الإيجار المتعلقة بالرهن. ينطبق بأثر رجعي على عقود الإيجار الحالية (مع قيود على الأحكام المستندة إلى الوقت).",
    category: "difc_law",
    keywords: ["DIFC leasing", "application", "residential", "commercial", "retail"],
    practicalExample: "Office lease in DIFC Gate Avenue governed by DIFC Leasing Law 1/2020, not Dubai Law 26/2007. Different rules apply."
  },
  {
    lawName: "DIFC Leasing Law",
    lawNumber: "1/2020",
    articleNumber: "12-16",
    titleEn: "Statutory Obligations - Lessee and Lessor",
    titleAr: "الالتزامات القانونية - المستأجر والمؤجر",
    contentEn: "Lessee must: not use for illegal purpose, use only for permitted use, not cause nuisance, pay rent (quarterly if not specified), pay taxes/fees (except registration fee and owner's amounts). Lessor must: ensure quiet enjoyment, NOT disconnect utilities (police/court action if violated).",
    contentAr: "يجب على المستأجر: عدم الاستخدام لأغراض غير قانونية، الاستخدام فقط للاستخدام المسموح، عدم التسبب في إزعاج، دفع الإيجار (ربع سنوي إذا لم يُحدد)، دفع الضرائب/الرسوم (باستثناء رسوم التسجيل ومبالغ المالك). يجب على المؤجر: ضمان الاستمتاع الهادئ، عدم قطع الخدمات (إجراء شرطة/محكمة إذا انتهك).",
    category: "difc_law",
    keywords: ["DIFC obligations", "lessee duties", "lessor duties", "quiet enjoyment", "utilities"],
    practicalExample: "DIFC landlord cannot cut electricity to force tenant out. Tenant can report to police. Mainland Dubai has similar prohibition but enforcement differs."
  },
  {
    lawName: "DIFC Leasing Law",
    lawNumber: "1/2020",
    titleEn: "Security Deposit - 10% Limit and Escrow",
    titleAr: "التأمين - حد 10٪ والضمان",
    contentEn: "Maximum security deposit: 10% of annual rent. Lessor must pay deposit to DIFC Registrar within 30 days. Registrar holds in escrow account. Used only for: non-payment, damage (excluding fair wear), breach damages. Release via signed form or dispute resolution. Unclaimed deposits forfeited to DIFCA after 6 months.",
    contentAr: "الحد الأقصى للتأمين: 10٪ من الإيجار السنوي. يجب على المؤجر دفع التأمين إلى مسجل مركز دبي المالي خلال 30 يوماً. يحتفظ المسجل في حساب ضمان. يُستخدم فقط لـ: عدم الدفع، الضرر (باستثناء الاستهلاك العادي)، أضرار الخرق. الإفراج عبر نموذج موقّع أو حل النزاع. مصادرة الودائع غير المطالب بها لصالح هيئة مركز دبي المالي بعد 6 أشهر.",
    category: "difc_law",
    keywords: ["DIFC security deposit", "10% limit", "Registrar escrow", "protection", "6 months"],
    practicalExample: "DIFC apartment AED 120K/year. Max deposit AED 12K. Landlord pays to Registrar within 30 days. Registrar holds it. At lease end, parties sign release or file dispute. Stronger protection than mainland."
  },
  {
    lawName: "DIFC Leasing Law",
    lawNumber: "1/2020",
    titleEn: "Rent Increase Notice - 90 Days",
    titleAr: "إشعار زيادة الإيجار - 90 يوماً",
    contentEn: "Lessor must give lessee 90 days' written notice of any proposed rent increases. No automatic lease renewal in DIFC (unlike mainland Dubai). Parties must negotiate new lease or extension.",
    contentAr: "يجب على المؤجر إعطاء المستأجر إشعاراً كتابياً لمدة 90 يوماً بأي زيادات مقترحة في الإيجار. لا يوجد تجديد تلقائي لعقد الإيجار في مركز دبي المالي (على عكس دبي الرئيسية). يجب على الأطراف التفاوض على عقد جديد أو تمديد.",
    category: "difc_law",
    keywords: ["DIFC rent increase", "90 days notice", "no automatic renewal", "negotiation"],
    practicalExample: "DIFC lease expires Dec 31. Landlord wants to increase rent. Must notify tenant by Oct 2 (90 days). Tenant staying past Dec 31 doesn't create automatic renewal - must sign new lease."
  },
  {
    lawName: "DIFC Leasing Law",
    lawNumber: "1/2020",
    articleNumber: "34-38",
    titleEn: "Maintenance Responsibilities",
    titleAr: "مسؤوليات الصيانة",
    contentEn: "Lessee: take reasonable care, keep reasonably clean, notify lessor of damage ASAP. NOT liable for fair wear and tear or lessor's failure. Lessor: maintain premises in good repair during term. Can serve repair notice if lessee breaches. If lessee doesn't comply, lessor can repair and recover costs.",
    contentAr: "المستأجر: العناية المعقولة، الحفاظ على النظافة، إخطار المؤجر بالضرر فوراً. غير مسؤول عن الاستهلاك العادي أو فشل المؤجر. المؤجر: صيانة العقار بحالة جيدة خلال المدة. يمكن تقديم إشعار إصلاح إذا خرق المستأجر. إذا لم يمتثل المستأجر، يمكن للمؤجر الإصلاح واسترداد التكاليف.",
    category: "difc_law",
    keywords: ["DIFC maintenance", "lessee care", "lessor repair", "fair wear", "repair notice"],
    practicalExample: "DIFC apartment AC breaks. Landlord must repair (lessor obligation). Tenant damages wall. Landlord serves repair notice. If tenant doesn't fix in 14 days, landlord can repair and charge tenant."
  },
  {
    lawName: "DIFC Leasing Law",
    lawNumber: "1/2020",
    titleEn: "Condition Reports",
    titleAr: "تقارير الحالة",
    contentEn: "Lessor may prepare condition report before handover (if security deposit required). Lessee must sign/return or provide disagreement within 20 days. If no response, report is evidence of condition. Disagreements resolved by independent expert. Unsigned reports: court draws inferences.",
    contentAr: "يمكن للمؤجر إعداد تقرير حالة قبل التسليم (إذا كان التأمين مطلوباً). يجب على المستأجر التوقيع/الإرجاع أو تقديم الاعتراض خلال 20 يوماً. إذا لم يكن هناك رد، فإن التقرير هو دليل على الحالة. يتم حل الخلافات من قبل خبير مستقل. التقارير غير الموقّعة: تستخلص المحكمة الاستنتاجات.",
    category: "difc_law",
    keywords: ["DIFC condition report", "20 days", "evidence", "independent expert", "handover"],
    practicalExample: "DIFC landlord provides condition report showing perfect apartment. Tenant doesn't respond within 20 days. At lease end, tenant claims damage was pre-existing. Report is evidence against tenant."
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

import { withCache } from './searchCache';

/**
 * Enhanced search that includes both hardcoded articles AND database PDF chunks
 * NOW WITH CACHING for improved performance
 */
export async function searchLegalKnowledgeEnhanced(query: string): Promise<LegalArticle[]> {
  // Use cache wrapper for performance
  return withCache(
    { query, language: 'en', category: 'all' },
    async () => await searchLegalKnowledgeEnhancedUncached(query)
  );
}

/**
 * Internal uncached search function
 */
async function searchLegalKnowledgeEnhancedUncached(query: string): Promise<LegalArticle[]> {
  const lowerQuery = query.toLowerCase();
  
  // Search hardcoded knowledge base
  const hardcodedResults = LEGAL_KNOWLEDGE_BASE.filter(article => 
    article.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ||
    article.titleEn.toLowerCase().includes(lowerQuery) ||
    article.contentEn.toLowerCase().includes(lowerQuery) ||
    (article.practicalExample && article.practicalExample.toLowerCase().includes(lowerQuery))
  );
  
  // Search database for PDF chunks
  const dbResults = await searchDatabaseKnowledge(query);
  
  // Convert database results to LegalArticle format
  const dbArticles: LegalArticle[] = dbResults.map(chunk => ({
    lawName: chunk.lawName,
    lawNumber: chunk.lawNumber,
    articleNumber: chunk.articleNumber || undefined,
    titleEn: chunk.titleEn,
    titleAr: chunk.titleAr || "",
    contentEn: chunk.contentEn,
    contentAr: chunk.contentAr || "",
    category: chunk.category as any, // Cast to match LegalArticle type
    keywords: chunk.keywords ? JSON.parse(chunk.keywords) : [],
    practicalExample: undefined,
  }));
  
  // Combine and deduplicate results
  return [...hardcodedResults, ...dbArticles];
}

/**
 * Search database for PDF chunks matching query
 */
async function searchDatabaseKnowledge(query: string) {
  const db = await import("./db");
  const allChunks = await db.getAllLegalKnowledge();
  
  const lowerQuery = query.toLowerCase();
  
  return allChunks.filter(chunk => {
    const keywords = chunk.keywords ? JSON.parse(chunk.keywords) : [];
    return (
      keywords.some((kw: string) => kw.toLowerCase().includes(lowerQuery)) ||
      chunk.titleEn.toLowerCase().includes(lowerQuery) ||
      chunk.contentEn.toLowerCase().includes(lowerQuery) ||
      chunk.lawName.toLowerCase().includes(lowerQuery)
    );
  });
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
