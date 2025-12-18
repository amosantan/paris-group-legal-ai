import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export interface DemandLetterData {
  senderName: string;
  senderNameAr: string;
  senderAddress: string;
  senderAddressAr: string;
  recipientName: string;
  recipientNameAr: string;
  recipientAddress: string;
  recipientAddressAr: string;
  propertyAddress: string;
  propertyAddressAr: string;
  amountOwed: number;
  dueDate: string;
  details: string;
  detailsAr: string;
}

export interface EvictionNoticeData {
  landlordName: string;
  landlordNameAr: string;
  landlordAddress: string;
  landlordAddressAr: string;
  tenantName: string;
  tenantNameAr: string;
  tenantAddress: string;
  tenantAddressAr: string;
  propertyAddress: string;
  propertyAddressAr: string;
  evictionReason: string;
  evictionReasonAr: string;
  noticeDate: string;
  vacateDate: string;
  legalBasis: string;
  legalBasisAr: string;
}

export interface NOCData {
  issuerName: string;
  issuerNameAr: string;
  issuerTitle: string;
  issuerTitleAr: string;
  issuerCompany: string;
  issuerCompanyAr: string;
  recipientName: string;
  recipientNameAr: string;
  propertyAddress: string;
  propertyAddressAr: string;
  purpose: string;
  purposeAr: string;
  conditions: string;
  conditionsAr: string;
  issueDate: string;
}

/**
 * Generate Bilingual Demand Letter PDF (English/Arabic)
 */
export async function generateDemandLetterPDF(data: DemandLetterData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Header - Bilingual
    doc.fontSize(18).fillColor("#1e40af").text("DEMAND LETTER FOR PAYMENT", { align: "center" });
    doc.fontSize(16).text("إخطار بالمطالبة بالدفع", { align: "center", features: ["rtla"] });
    doc.moveDown(2);

    // Date - Bilingual
    const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const dateStrAr = new Date().toLocaleDateString("ar-AE", { year: "numeric", month: "long", day: "numeric" });
    doc.fontSize(10).fillColor("#000");
    doc.text(`Date / التاريخ: ${dateStr} / ${dateStrAr}`, { align: "right" });
    doc.moveDown(2);

    // From Section - Bilingual
    doc.fontSize(12).fillColor("#000").text("FROM / من:", { underline: true });
    doc.fontSize(10);
    doc.text(`${data.senderName} / ${data.senderNameAr}`);
    doc.text(`${data.senderAddress}`);
    doc.text(`${data.senderAddressAr}`, { features: ["rtla"] });
    doc.moveDown();

    // To Section - Bilingual
    doc.fontSize(12).text("TO / إلى:", { underline: true });
    doc.fontSize(10);
    doc.text(`${data.recipientName} / ${data.recipientNameAr}`);
    doc.text(`${data.recipientAddress}`);
    doc.text(`${data.recipientAddressAr}`, { features: ["rtla"] });
    doc.moveDown(2);

    // Subject - Bilingual
    doc.fontSize(12).text("RE: FORMAL DEMAND FOR PAYMENT OF OUTSTANDING RENT", { underline: true });
    doc.text("الموضوع: مطالبة رسمية بدفع الإيجار المستحق", { underline: true, features: ["rtla"] });
    doc.moveDown();

    // Body - English
    doc.fontSize(10).fillColor("#000");
    doc.text(
      "Pursuant to the tenancy agreement and in accordance with Dubai Law No. 26 of 2007 Regulating the Relationship Between Landlords and Tenants in the Emirate of Dubai, this letter serves as formal demand for payment of outstanding rent.",
      { align: "justify" }
    );
    doc.moveDown();

    // Body - Arabic
    doc.text(
      "بموجب عقد الإيجار ووفقاً للقانون رقم 26 لسنة 2007 بشأن تنظيم العلاقة بين المالك والمستأجر في إمارة دبي، يعتبر هذا الخطاب مطالبة رسمية بدفع الإيجار المستحق.",
      { align: "right", features: ["rtla"] }
    );
    doc.moveDown();

    // Property Details - Bilingual
    doc.fontSize(11).text("Property Address / عنوان العقار:", { underline: true });
    doc.fontSize(10);
    doc.text(data.propertyAddress);
    doc.text(data.propertyAddressAr, { features: ["rtla"] });
    doc.moveDown();

    // Amount Details - Bilingual
    doc.fontSize(11).text("Outstanding Amount / المبلغ المستحق:", { underline: true });
    doc.fontSize(12).fillColor("#dc2626");
    doc.text(`AED ${data.amountOwed.toLocaleString()} درهم`, { align: "center" });
    doc.fillColor("#000").fontSize(10);
    doc.text(`Due Date / تاريخ الاستحقاق: ${data.dueDate}`);
    doc.moveDown();

    // Details - Bilingual
    doc.fontSize(11).text("Details / التفاصيل:", { underline: true });
    doc.fontSize(10);
    doc.text(data.details, { align: "justify" });
    doc.moveDown(0.5);
    doc.text(data.detailsAr, { align: "right", features: ["rtla"] });
    doc.moveDown(2);

    // Legal Notice - English
    doc.fontSize(10).fillColor("#000");
    doc.text(
      "You are hereby formally notified to pay the full outstanding amount within thirty (30) calendar days from the date of receipt of this notice. Failure to comply with this demand shall result in:",
      { align: "justify" }
    );
    doc.moveDown(0.5);
    doc.text("1. Filing a case at the Dubai Rental Disputes Center (RDC)", { indent: 20 });
    doc.text("2. Legal proceedings for eviction under Article 25(1)(a) of Law 26/2007", { indent: 20 });
    doc.text("3. Claims for damages, legal fees, and interest at 9% per annum", { indent: 20 });
    doc.moveDown();

    // Legal Notice - Arabic
    doc.text(
      "يُخطر سيادتكم رسمياً بوجوب سداد كامل المبلغ المستحق خلال ثلاثين (30) يوماً تقويمياً من تاريخ استلام هذا الإخطار. وفي حالة عدم الامتثال لهذه المطالبة، سيترتب على ذلك:",
      { align: "right", features: ["rtla"] }
    );
    doc.moveDown(0.5);
    doc.text("1. رفع دعوى لدى مركز فض المنازعات الإيجارية بدبي", { align: "right", features: ["rtla"] });
    doc.text("2. إجراءات قانونية للإخلاء بموجب المادة 25(1)(أ) من القانون 26/2007", { align: "right", features: ["rtla"] });
    doc.text("3. المطالبة بالتعويضات والرسوم القانونية والفائدة بنسبة 9% سنوياً", { align: "right", features: ["rtla"] });
    doc.moveDown(2);

    // Legal Reference - Bilingual
    doc.fontSize(9).fillColor("#666");
    doc.text(
      "Legal Basis: Dubai Law No. 26 of 2007, Articles 22 and 25 | الأساس القانوني: القانون رقم 26 لسنة 2007، المواد 22 و 25",
      { align: "center" }
    );
    doc.moveDown(3);

    // Signature - Bilingual
    doc.fontSize(10).fillColor("#000");
    doc.text("Sincerely / مع خالص التحية", { align: "left" });
    doc.moveDown(2);
    doc.text("_______________________");
    doc.text(`${data.senderName} / ${data.senderNameAr}`);

    // Footer Disclaimer - Bilingual
    doc.moveDown(3);
    doc.fontSize(8).fillColor("#666");
    doc.text(
      "This document is generated by SANZEN Legal Consultant AI. This is not a substitute for professional legal advice.",
      { align: "center" }
    );
    doc.text(
      "هذا المستند تم إنشاؤه بواسطة الذكاء الاصطناعي لمستشار باريس جروب القانوني. لا يعتبر بديلاً عن الاستشارة القانونية المهنية.",
      { align: "center", features: ["rtla"] }
    );

    doc.end();
  });
}

/**
 * Generate Bilingual Eviction Notice PDF (English/Arabic)
 */
export async function generateEvictionNoticePDF(data: EvictionNoticeData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Header - Bilingual
    doc.fontSize(18).fillColor("#dc2626").text("EVICTION NOTICE", { align: "center" });
    doc.fontSize(16).text("إخطار بالإخلاء", { align: "center", features: ["rtla"] });
    doc.moveDown(2);

    // Notice Date - Bilingual
    doc.fontSize(10).fillColor("#000");
    doc.text(`Notice Date / تاريخ الإخطار: ${data.noticeDate}`, { align: "right" });
    doc.moveDown(2);

    // From Section - Bilingual
    doc.fontSize(12).text("FROM (Landlord) / من (المالك):", { underline: true });
    doc.fontSize(10);
    doc.text(`${data.landlordName} / ${data.landlordNameAr}`);
    doc.text(data.landlordAddress);
    doc.text(data.landlordAddressAr, { features: ["rtla"] });
    doc.moveDown();

    // To Section - Bilingual
    doc.fontSize(12).text("TO (Tenant) / إلى (المستأجر):", { underline: true });
    doc.fontSize(10);
    doc.text(`${data.tenantName} / ${data.tenantNameAr}`);
    doc.text(data.tenantAddress);
    doc.text(data.tenantAddressAr, { features: ["rtla"] });
    doc.moveDown(2);

    // Subject - Bilingual
    doc.fontSize(12).text("RE: NOTICE TO VACATE PREMISES", { underline: true });
    doc.text("الموضوع: إخطار بإخلاء العقار", { underline: true, features: ["rtla"] });
    doc.moveDown();

    // Legal Opening - English
    doc.fontSize(10).fillColor("#000");
    doc.text(
      "Pursuant to Dubai Law No. 26 of 2007 Regulating the Relationship Between Landlords and Tenants in the Emirate of Dubai, you are hereby formally notified to vacate the premises described below:",
      { align: "justify" }
    );
    doc.moveDown();

    // Legal Opening - Arabic
    doc.text(
      "بموجب القانون رقم 26 لسنة 2007 بشأن تنظيم العلاقة بين المالك والمستأجر في إمارة دبي، يُخطر سيادتكم رسمياً بإخلاء العقار الموضح أدناه:",
      { align: "right", features: ["rtla"] }
    );
    doc.moveDown();

    // Property Details - Bilingual
    doc.fontSize(11).text("Property Address / عنوان العقار:", { underline: true });
    doc.fontSize(10);
    doc.text(data.propertyAddress);
    doc.text(data.propertyAddressAr, { features: ["rtla"] });
    doc.moveDown();

    // Vacate Date - Highlighted
    doc.fontSize(11).text("Vacate Date / تاريخ الإخلاء:", { underline: true });
    doc.fontSize(12).fillColor("#dc2626");
    doc.text(data.vacateDate, { align: "center" });
    doc.fillColor("#000").fontSize(10);
    doc.moveDown();

    // Reason - Bilingual
    doc.fontSize(11).text("Reason for Eviction / سبب الإخلاء:", { underline: true });
    doc.fontSize(10);
    doc.text(data.evictionReason, { align: "justify" });
    doc.moveDown(0.5);
    doc.text(data.evictionReasonAr, { align: "right", features: ["rtla"] });
    doc.moveDown();

    // Legal Basis - Bilingual
    doc.fontSize(11).text("Legal Basis / الأساس القانوني:", { underline: true });
    doc.fontSize(10);
    doc.text(data.legalBasis, { align: "justify" });
    doc.moveDown(0.5);
    doc.text(data.legalBasisAr, { align: "right", features: ["rtla"] });
    doc.moveDown(2);

    // Legal Requirements - English
    doc.fontSize(10).fillColor("#000");
    doc.text("You are required to:", { underline: true });
    doc.text("1. Vacate the premises on or before the specified date", { indent: 20 });
    doc.text("2. Return the property in good condition (normal wear and tear excepted)", { indent: 20 });
    doc.text("3. Settle all outstanding utility bills (DEWA, Emicool, etc.)", { indent: 20 });
    doc.text("4. Return all keys and access cards to the landlord", { indent: 20 });
    doc.moveDown();

    // Legal Requirements - Arabic
    doc.text("يُطلب منكم:", { underline: true, align: "right", features: ["rtla"] });
    doc.text("1. إخلاء العقار في أو قبل التاريخ المحدد", { align: "right", features: ["rtla"] });
    doc.text("2. إعادة العقار بحالة جيدة (باستثناء التآكل الطبيعي)", { align: "right", features: ["rtla"] });
    doc.text("3. تسوية جميع فواتير المرافق المستحقة (ديوا، إيميكول، إلخ)", { align: "right", features: ["rtla"] });
    doc.text("4. إعادة جميع المفاتيح وبطاقات الدخول إلى المالك", { align: "right", features: ["rtla"] });
    doc.moveDown(2);

    // Legal Consequences - English
    doc.text(
      "Failure to vacate by the specified date will result in legal proceedings at the Dubai Rental Disputes Center (RDC) to enforce this eviction notice.",
      { align: "justify" }
    );
    doc.moveDown();

    // Legal Consequences - Arabic
    doc.text(
      "عدم الإخلاء بحلول التاريخ المحدد سيؤدي إلى اتخاذ إجراءات قانونية لدى مركز فض المنازعات الإيجارية بدبي لتنفيذ هذا الإخطار بالإخلاء.",
      { align: "right", features: ["rtla"] }
    );
    doc.moveDown(3);

    // Signature - Bilingual
    doc.fontSize(10).fillColor("#000");
    doc.text("Issued by / صادر عن:");
    doc.moveDown(2);
    doc.text("_______________________");
    doc.text(`${data.landlordName} / ${data.landlordNameAr}`);
    doc.text("Landlord / المالك");

    // Footer Disclaimer - Bilingual
    doc.moveDown(3);
    doc.fontSize(8).fillColor("#666");
    doc.text(
      "This document is generated by SANZEN Legal Consultant AI. This is not a substitute for professional legal advice.",
      { align: "center" }
    );
    doc.text(
      "هذا المستند تم إنشاؤه بواسطة الذكاء الاصطناعي لمستشار باريس جروب القانوني. لا يعتبر بديلاً عن الاستشارة القانونية المهنية.",
      { align: "center", features: ["rtla"] }
    );

    doc.end();
  });
}

/**
 * Generate Bilingual No Objection Certificate (NOC) PDF (English/Arabic)
 */
export async function generateNOCPDF(data: NOCData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Header - Bilingual
    doc.fontSize(18).fillColor("#059669").text("NO OBJECTION CERTIFICATE", { align: "center" });
    doc.fontSize(16).text("شهادة عدم ممانعة", { align: "center", features: ["rtla"] });
    doc.fontSize(12).fillColor("#666").text("(NOC) / (شهادة عدم ممانعة)", { align: "center" });
    doc.moveDown(3);

    // Certificate Number (placeholder)
    doc.fontSize(10).fillColor("#000");
    doc.text(`Certificate No. / رقم الشهادة: NOC-${Date.now()}`, { align: "right" });
    doc.text(`Issue Date / تاريخ الإصدار: ${data.issueDate}`, { align: "right" });
    doc.moveDown(2);

    // To Whom It May Concern - Bilingual
    doc.fontSize(12).text("TO WHOM IT MAY CONCERN", { align: "center", underline: true });
    doc.text("إلى من يهمه الأمر", { align: "center", underline: true, features: ["rtla"] });
    doc.moveDown(2);

    // Opening Statement - English
    doc.fontSize(10).fillColor("#000");
    doc.text(
      `This is to certify that ${data.issuerCompany}, represented by ${data.issuerName}, ${data.issuerTitle}, hereby issues this No Objection Certificate to:`,
      { align: "justify" }
    );
    doc.moveDown();

    // Opening Statement - Arabic
    doc.text(
      `نشهد بأن ${data.issuerCompanyAr}، ممثلة بـ ${data.issuerNameAr}، ${data.issuerTitleAr}، تصدر بموجبه شهادة عدم ممانعة لـ:`,
      { align: "right", features: ["rtla"] }
    );
    doc.moveDown(2);

    // Recipient Details - Bilingual
    doc.fontSize(11).text("Recipient / المستفيد:", { underline: true });
    doc.fontSize(10);
    doc.text(`${data.recipientName} / ${data.recipientNameAr}`);
    doc.moveDown();

    // Property Details - Bilingual
    doc.fontSize(11).text("Property Address / عنوان العقار:", { underline: true });
    doc.fontSize(10);
    doc.text(data.propertyAddress);
    doc.text(data.propertyAddressAr, { features: ["rtla"] });
    doc.moveDown();

    // Purpose - Bilingual
    doc.fontSize(11).text("Purpose / الغرض:", { underline: true });
    doc.fontSize(10);
    doc.text(data.purpose, { align: "justify" });
    doc.moveDown(0.5);
    doc.text(data.purposeAr, { align: "right", features: ["rtla"] });
    doc.moveDown();

    // Conditions - Bilingual (if provided)
    if (data.conditions) {
      doc.fontSize(11).text("Conditions / الشروط:", { underline: true });
      doc.fontSize(10);
      doc.text(data.conditions, { align: "justify" });
      doc.moveDown(0.5);
      doc.text(data.conditionsAr, { align: "right", features: ["rtla"] });
      doc.moveDown();
    }

    // Validity Statement - English
    doc.fontSize(10).fillColor("#000");
    doc.text(
      "This No Objection Certificate is issued for the stated purpose only and does not constitute any warranty, guarantee, or assumption of liability. The recipient is solely responsible for complying with all applicable laws, regulations, and requirements of relevant authorities in the Emirate of Dubai and the United Arab Emirates.",
      { align: "justify" }
    );
    doc.moveDown();

    // Validity Statement - Arabic
    doc.text(
      "تصدر شهادة عدم الممانعة هذه للغرض المذكور فقط ولا تشكل أي ضمان أو كفالة أو تحمل للمسؤولية. المستفيد مسؤول وحده عن الامتثال لجميع القوانين واللوائح والمتطلبات المعمول بها لدى الجهات المختصة في إمارة دبي ودولة الإمارات العربية المتحدة.",
      { align: "right", features: ["rtla"] }
    );
    doc.moveDown(3);

    // Issuer Details - Bilingual
    doc.fontSize(10).fillColor("#000");
    doc.text("Issued by / صادر عن:");
    doc.moveDown();
    doc.text("_______________________");
    doc.text(`Name / الاسم: ${data.issuerName} / ${data.issuerNameAr}`);
    doc.text(`Title / المسمى الوظيفي: ${data.issuerTitle} / ${data.issuerTitleAr}`);
    doc.text(`Company / الشركة: ${data.issuerCompany} / ${data.issuerCompanyAr}`);

    // Stamp Placeholder
    doc.moveDown(2);
    const stampX = 400;
    const stampY = doc.y;
    doc.rect(stampX, stampY, 100, 80).stroke();
    doc.fontSize(8).text("Company Stamp", stampX + 10, stampY + 25);
    doc.text("ختم الشركة", stampX + 10, stampY + 40, { features: ["rtla"] });

    // Signature Placeholder
    doc.text("_______________________", 50, stampY + 50);
    doc.text("Authorized Signature", 50, stampY + 65);
    doc.text("التوقيع المعتمد", 50, stampY + 78, { features: ["rtla"] });

    // Footer Disclaimer - Bilingual
    doc.moveDown(5);
    doc.fontSize(8).fillColor("#666");
    doc.text(
      "This document is generated by SANZEN Legal Consultant AI. This is not a substitute for professional legal advice.",
      { align: "center" }
    );
    doc.text(
      "هذا المستند تم إنشاؤه بواسطة الذكاء الاصطناعي لمستشار باريس جروب القانوني. لا يعتبر بديلاً عن الاستشارة القانونية المهنية.",
      { align: "center", features: ["rtla"] }
    );

    doc.end();
  });
}

export interface LOIData {
  buyerName: string;
  buyerNameAr: string;
  buyerAddress: string;
  buyerAddressAr: string;
  buyerContact: string;
  sellerName: string;
  sellerNameAr: string;
  sellerAddress: string;
  sellerAddressAr: string;
  sellerContact: string;
  propertyAddress: string;
  propertyAddressAr: string;
  propertyType: string;
  propertyTypeAr: string;
  purchasePrice: number;
  currency: string;
  depositAmount: number;
  validityDays: number;
  specialConditions: string;
  specialConditionsAr: string;
  issueDate: string;
}

/**
 * Generate Bilingual Letter of Intent (LOI) PDF for Property Purchase (English/Arabic)
 */
export async function generateLOIPDF(data: LOIData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Header - Bilingual
    doc.fontSize(18).fillColor("#1e40af").text("LETTER OF INTENT", { align: "center" });
    doc.fontSize(16).text("خطاب نوايا", { align: "center", features: ["rtla"] });
    doc.fontSize(14).fillColor("#000").text("Property Purchase / شراء عقار", { align: "center" });
    doc.moveDown(2);

    // Date - Bilingual
    const dateStr = new Date(data.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const dateStrAr = new Date(data.issueDate).toLocaleDateString("ar-AE", { year: "numeric", month: "long", day: "numeric" });
    doc.fontSize(10).fillColor("#000");
    doc.text(`Date / التاريخ: ${dateStr} / ${dateStrAr}`, { align: "right" });
    doc.moveDown(2);

    // Buyer Information - Bilingual
    doc.fontSize(12).fillColor("#000").text("BUYER INFORMATION / معلومات المشتري", { underline: true });
    doc.fontSize(10);
    doc.text(`Name / الاسم: ${data.buyerName} / ${data.buyerNameAr}`);
    doc.text(`Address / العنوان: ${data.buyerAddress}`);
    doc.text(`${data.buyerAddressAr}`, { features: ["rtla"] });
    doc.text(`Contact / الاتصال: ${data.buyerContact}`);
    doc.moveDown();

    // Seller Information - Bilingual
    doc.fontSize(12).text("SELLER INFORMATION / معلومات البائع", { underline: true });
    doc.fontSize(10);
    doc.text(`Name / الاسم: ${data.sellerName} / ${data.sellerNameAr}`);
    doc.text(`Address / العنوان: ${data.sellerAddress}`);
    doc.text(`${data.sellerAddressAr}`, { features: ["rtla"] });
    doc.text(`Contact / الاتصال: ${data.sellerContact}`);
    doc.moveDown(2);

    // Property Details - Bilingual
    doc.fontSize(12).fillColor("#1e40af").text("PROPERTY DETAILS / تفاصيل العقار", { underline: true });
    doc.fontSize(10).fillColor("#000");
    doc.text(`Property Address / عنوان العقار:`);
    doc.text(`${data.propertyAddress}`);
    doc.text(`${data.propertyAddressAr}`, { features: ["rtla"] });
    doc.moveDown(0.5);
    doc.text(`Property Type / نوع العقار: ${data.propertyType} / ${data.propertyTypeAr}`);
    doc.moveDown(2);

    // Financial Terms - Bilingual
    doc.fontSize(12).fillColor("#1e40af").text("FINANCIAL TERMS / الشروط المالية", { underline: true });
    doc.fontSize(10).fillColor("#000");
    const formattedPrice = data.purchasePrice.toLocaleString("en-US");
    doc.text(`Purchase Price / سعر الشراء: ${data.currency} ${formattedPrice}`);
    const formattedDeposit = data.depositAmount.toLocaleString("en-US");
    doc.text(`Initial Deposit / الدفعة الأولى: ${data.currency} ${formattedDeposit}`);
    doc.moveDown(2);

    // Intent Statement - English
    doc.fontSize(11).fillColor("#000").text("STATEMENT OF INTENT / بيان النوايا", { underline: true });
    doc.fontSize(10);
    doc.text(
      `This Letter of Intent (LOI) is issued by the Buyer to express their genuine interest and intent to purchase the above-mentioned property from the Seller, subject to the terms and conditions outlined herein.`,
      { align: "justify" }
    );
    doc.moveDown(0.5);

    // Intent Statement - Arabic
    doc.text(
      `يصدر خطاب النوايا هذا من قبل المشتري للتعبير عن اهتمامه الحقيقي ونيته في شراء العقار المذكور أعلاه من البائع، وفقاً للشروط والأحكام المبينة في هذا الخطاب.`,
      { align: "right", features: ["rtla"] }
    );
    doc.moveDown(2);

    // Terms and Conditions - English
    doc.fontSize(11).text("TERMS AND CONDITIONS / الشروط والأحكام", { underline: true });
    doc.fontSize(10);
    
    const terms = [
      {
        en: `1. This LOI is non-binding and serves as an expression of intent only. It does not constitute a legally binding agreement to purchase the property.`,
        ar: `١. خطاب النوايا هذا غير ملزم ويعتبر تعبيراً عن النية فقط. لا يشكل اتفاقية ملزمة قانونياً لشراء العقار.`
      },
      {
        en: `2. The Buyer agrees to conduct due diligence on the property, including but not limited to title verification, property inspection, and legal review.`,
        ar: `٢. يوافق المشتري على إجراء العناية الواجبة للعقار، بما في ذلك على سبيل المثال لا الحصر التحقق من الملكية وفحص العقار والمراجعة القانونية.`
      },
      {
        en: `3. Upon satisfactory completion of due diligence, the parties agree to negotiate in good faith towards a formal Sale and Purchase Agreement (SPA).`,
        ar: `٣. عند الانتهاء المرضي من العناية الواجبة، يوافق الطرفان على التفاوض بحسن نية نحو اتفاقية بيع وشراء رسمية.`
      },
      {
        en: `4. This LOI shall remain valid for ${data.validityDays} days from the date of issuance, unless extended by mutual written agreement.`,
        ar: `٤. يظل خطاب النوايا هذا ساري المفعول لمدة ${data.validityDays} يوماً من تاريخ الإصدار، ما لم يتم تمديده باتفاق كتابي متبادل.`
      },
      {
        en: `5. All costs and expenses related to due diligence, legal fees, and transaction costs shall be borne by the respective parties as agreed.`,
        ar: `٥. تتحمل الأطراف المعنية جميع التكاليف والنفقات المتعلقة بالعناية الواجبة والرسوم القانونية وتكاليف المعاملة حسب الاتفاق.`
      }
    ];

    terms.forEach(term => {
      doc.text(term.en, { align: "justify" });
      doc.moveDown(0.3);
      doc.text(term.ar, { align: "right", features: ["rtla"] });
      doc.moveDown(0.5);
    });

    doc.moveDown();

    // Special Conditions - Bilingual (if provided)
    if (data.specialConditions) {
      doc.fontSize(11).text("SPECIAL CONDITIONS / شروط خاصة:", { underline: true });
      doc.fontSize(10);
      doc.text(data.specialConditions, { align: "justify" });
      doc.moveDown(0.5);
      doc.text(data.specialConditionsAr, { align: "right", features: ["rtla"] });
      doc.moveDown(2);
    }

    // Governing Law - Bilingual
    doc.fontSize(10).fillColor("#000");
    doc.text(
      "This Letter of Intent shall be governed by and construed in accordance with the laws of the Emirate of Dubai and the United Arab Emirates. Any disputes arising from this LOI shall be subject to the exclusive jurisdiction of the courts of Dubai.",
      { align: "justify" }
    );
    doc.moveDown(0.5);
    doc.text(
      "يخضع خطاب النوايا هذا ويفسر وفقاً لقوانين إمارة دبي ودولة الإمارات العربية المتحدة. تخضع أي نزاعات ناشئة عن هذا الخطاب للاختصاص القضائي الحصري لمحاكم دبي.",
      { align: "right", features: ["rtla"] }
    );
    doc.moveDown(3);

    // Signature Sections - Bilingual
    doc.fontSize(11).text("SIGNATURES / التوقيعات", { underline: true });
    doc.moveDown(2);

    // Buyer Signature
    doc.fontSize(10);
    doc.text("Buyer / المشتري:");
    doc.moveDown();
    doc.text("_______________________");
    doc.text(`Name / الاسم: ${data.buyerName}`);
    doc.text(`Date / التاريخ: ______________`);
    doc.moveDown(2);

    // Seller Signature
    doc.text("Seller / البائع:");
    doc.moveDown();
    doc.text("_______________________");
    doc.text(`Name / الاسم: ${data.sellerName}`);
    doc.text(`Date / التاريخ: ______________`);

    // Footer Disclaimer - Bilingual
    doc.moveDown(3);
    doc.fontSize(8).fillColor("#666");
    doc.text(
      "This document is generated by SANZEN Legal Consultant AI. This is not a substitute for professional legal advice. Please consult with a qualified legal professional before entering into any binding agreement.",
      { align: "center" }
    );
    doc.moveDown(0.5);
    doc.text(
      "هذا المستند تم إنشاؤه بواسطة الذكاء الاصطناعي لمستشار سانزن القانوني. لا يعتبر بديلاً عن الاستشارة القانونية المهنية. يرجى استشارة محامٍ مؤهل قبل الدخول في أي اتفاقية ملزمة.",
      { align: "center", features: ["rtla"] }
    );

    doc.end();
  });
}
