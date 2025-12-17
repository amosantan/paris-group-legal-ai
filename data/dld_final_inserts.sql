-- DLD Documents - Final Insert Statements
-- This fixes the ID sequence and inserts all documents

-- Step 1: Fix the ID sequence
SELECT setval('legal_articles_id_seq', (SELECT MAX(id) FROM legal_articles));

-- Step 2: Insert DLD documents

-- Document 1: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '‫اتفاقية وساطة في التاجير بين المالك والوسيط العقاري‬
LEASE BROKERAGE AGREEMENT BETWEEN THE OWNER AND BROKER
:‫رقم اﻹتفافية‬

Agreement Number:

PROPERTY OWNER’S DETAILS

‫بيانات مالك العقار‬

Owner(s):

:‫اسم مالك العقار‬

Mobile:

:‫رقم الهاتف الجوال‬

Phone:

:‫الهاتف‬
:‫رقم بطاقة الهوية‬

Emirates ID No. (if applicable):

:‫العنوان‬

Address:

:‫البريد اﻻلكترتوني‬

Email:

‫بيانات الوسيط‬

BROKER DETAILS

: ‫رقم تسجيل المكتب‬

ORN:

:‫اسم المؤسسة‬

Company Name:

: ‫رقم الترخيص التجاري‬

Commercial License Number:
BRN :

:‫رقم تسجيل الوسيط‬

‫رقم الجوال‬

Mobile:

Broker’s Name :

Phone:

:‫اسم الوسيط‬
:‫رقم الهاتف‬
:‫العنوان‬

Address:
Email:

:‫البريد اﻻلكتروني‬

PROPERTY DETAILS

‫بيانات العقار‬

Property Status:

: ‫حالة العقار‬

Plot Number and Area :

Type: Villa ( ) Apartment ( ) Shop ( )
Office( ) Warehouse ( ) Other ( )

:‫المساحة‬

Area:
Use: COM ( ) RES ( ) Other ( )

( ) ‫ تجاري ) ( سكني‬:‫اﻻستخدام‬
( ) ‫أخرى‬

Makani ID:
Project Name

NO. of Car Parks

Page

1

Services and General information:

DLD/RERA/RL/LP/P210/ No.1/Vr.4/ Issue Date: Aug.2022

( ) ‫ فيﻼ) ( شقة ) ( محل‬: ‫نوع العقار‬
( ) ‫مكتب ) (مستودع ) ( أخرى‬
:‫رقم مكاني‬
: ‫اسم المشروع‬
: ‫القيمة التقديرية لﻺيجار‬

Approximate Rental Budget :
Building Number

: ‫رقم اﻻرض والمنطقة‬

:‫ رقم المبنى‬Owner’s Association No

:‫رقم جمعية المﻼك‬
:‫عدد مواقف السيارات‬
: ‫الخدمات والمﻼحظات العامه‬

‫اتفاقية وساطة في التاجير بين المالك والوسيط العقاري‬
LEASE BROKERAGE AGREEMENT BETWEEN THE OWNER AND BROKER
:‫رقم اﻹتفافية‬

Agreement Number:

‫العمولة ومدة اﻹتفاقية‬

COMMISSION & Contract Period
Agreement Start Date:

: ‫تاريخ بدء اﻹتفاقية‬

Agreement End Date:

: ‫تاريخ إنتهاء اﻹتفاقية‬

Commission:
To be Paid by Owner : Amount ( AED )______ or % _______
To be Paid by Tenant : Amount ( AED )______or % _______

Non – Exclusive (

)

:‫العمولة‬
_____ ‫ درهم _________ أو النسبة‬: ‫قيمة العمولة من طرف المـــــالك‬
_____ ‫ درهم _________ أو النسبة‬: ‫قيمة العمولة من طرف المستأجر‬
Exclusive ( )

( ) ‫غير حصري‬

(

)

‫حصري‬
‫توقيعاﻻطراف‬

SIGNATURE OF THE PARTIES

(‫الطرف اﻻول )مكتب الوساطة‬

FIRST PARTY [ THE BROKER OFFICE ]
Name:

:‫اﻻسم‬

Title:

:‫الصفه‬

Date:

:‫التاريخ‬

Signature and
stamp:

: ‫التوقيع والختم‬

‫توقيعاﻻطراف‬

SIGNATURE OF THEPARTIES

( ‫الطرف الثاني ) المالك‬

SECOND PARTY [ THE OWNER ]
Name:

: ‫اﻻسم‬

Title:

:‫الصفة‬

Page

2

Date:

DLD/RERA/RL/LP/P210/ No.1/Vr.4/ Issue Date: Aug.2022

:‫التاريخ‬

Signature and
stamp:

: ‫التوقيع والختم‬

DLD/RERA/RL/LP/P210/ No.1/Vr.4/ Issue Date: Aug.2022

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/ifgni0x5/onwer_and_broker.pdf',
  NOW(),
  NOW()
);

-- Document 2: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '‫اتفاقية وساطة في التاجير بين الوسيط و المستاجر‬
LEASE BROKERAGE AGREEMENT BETWEEN THE BROKER AND TENANT
:‫رقم اﻹتفاقية‬

Agreement Number:

‫بيانات الوسيط‬

BROKER DETAILS

: ‫رقم تسجيل المكتب‬

ORN:

:‫اسم المؤسسة‬

Company Name:

:‫رقم الترخيص التجاري‬

Commercial License Number:
BRN:

: ‫رقم تسجيل الوسيط‬

Broker’s Name :

: ‫اسم الوسيط‬

Mobile:

‫رقم الجوال‬

Phone:

:‫رقم الهاتف‬
:‫العنوان‬

Address:

:‫البريد اﻻلكتروني‬

Email:

TENANT DETAILS

‫بيانات المستأجر‬

Tenant’s Name:

:‫اسم المستأجر‬

Emirates ID No:
Expiry Date:
Mobile:

:‫رقم بطاقة الهوية‬
: ‫اﻻنتهاء‬
:‫رقم الهاتف الجوال‬

Nationality:

:‫الجنسية‬

Passport No:

: ‫رقم جواز السفر‬

P.O.Box:

:‫صندوق البريد‬

Phone:

: ‫الهاتف‬

Address:

:‫العنوان‬

Email:

:‫البريد اﻻلكتروني‬

PROPERTY DETAILS

‫بيانات العقار‬

Type: Villa ( ) Apartment ( ) Shop ( ) Office( ) Warehouse( )

() ‫ فيﻼ) ( شقة ) ( محل ) ( مكتب ) ( مستودع‬: ‫نوعالعقار‬

Other ( )

( ) ‫أخرى‬

Area:

:‫المنطقة‬

Approximate Rental Budget :

Page

1

Services and General information:

DLD/RERA/RL/LP/P210/ No.2/Vr.4/ Issue Date: Aug.2022

: ‫القيمة التقديرية لﻺيجار‬
: ‫الخدمات والمﻼحظات العامه‬

‫اتفاقية وساطة في التاجير بين الوسيط و المستاجر‬
LEASE BROKERAGE AGREEMENT BETWEEN THE BROKER AND TENANT
:‫رقم اﻹتفاقية‬

Agreement Number:

‫العمولة ومدة اﻹتفاقية‬

Commission & Agreement period
Agreement Start Date:

: ‫تاريخ بدء اﻹتفاقية‬

Agreement End Date:

: ‫تاريخ إنتهاء اﻹتفاقية‬

To be Paid by Owner : Amount ( AED )______ or % _____

‫العمولة‬
____ ‫ درهم _______ أو النسبة‬: ‫قيمة العمولة من طرف المـــــالك‬

To be Paid by Tenant : Amount ( AED )______or % _____

____ ‫ درهم _______ أو النسبة‬: ‫قيمة العمولة من طرف المستأجر‬

Commission:

‫توقيع اﻻطراف‬

SIGNATURE OF THE PARTIES

( ‫الطرف اﻻول ) مكتب الوساطة‬

FIRST PARTY [ THE BROKER OFFICE ]
Name:

:‫اﻻسم‬

Title:

:‫الصفه‬

Date:

:‫التاريخ‬

Signature and stamp:

: ‫التوقيع والختم‬

‫توقيع اﻻطراف‬

SIGNATURE OF THE PARTIES

( ‫الطرف الثاني ) المستأجر‬

SECOND PARTY ( Tenant )
Name:

: ‫اﻻسم‬

Title:

:‫الصفة‬
:‫التاريخ‬

Page

2

Date:

DLD/RERA/RL/LP/P210/ No.2/Vr.4/ Issue Date: Aug.2022

Signature and stamp:

: ‫التوقيع والختم‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/fqmfy5hv/lease_brokerage_agreement_between_the_broker_and_tenant.pdf',
  NOW(),
  NOW()
);

-- Document 3: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '‫اتفاقية معاينة عقار‬
Property Viewing Agreement

:‫رقم اﻹتفاقية‬

Agreement Number:

‫بيانات الوسيط‬

BROKER DETAILS

: ‫رقم تسجيل المكتب‬

ORN:

:‫اسم المؤسسة‬

Company Name:

:‫رقم الترخيص التجاري‬

Commercial License Number:
BRN :

:‫رقم تسجيل الوسيط‬

Broker’s Name:

‫اسم الوسيط‬

Mobile:

‫رقم الجوال‬

Phone:

:‫رقم الهاتف‬
:‫العنوان‬

Address:

:‫البريد اﻻلكتروني‬

Email:

‫بيانات المستاجر‬

TENANT DETAILS

: ‫اسم المستأجر‬

Tenant’s Name:

: ‫رقم بطاقة الهوية‬

Emirates ID Number:

: ‫الهاتف‬

Phone

Passport No:

:‫رقم جواز السفر‬

Mobile:

:‫الهاتف المتحرك‬

P.O.Box:

:‫صندوق البريد‬

Address:

:‫العنوان‬

Email:

: ‫البريد اﻹلكتروني‬

Additional Information :

: ‫مﻼحظات عامه‬

PROPERTY DETAILS

‫بيانات العقار‬
:‫حالة العقار‬

Property Status:

Plot Number and Area :

( ) ‫ فيﻼ) ( شقة ) ( محل ) ( مكتب‬: ‫نوع العقار‬
( ) ‫مستودع ) ( أخرى‬

Type: Villa ( ) Apartment ( ) Shop ( )
Office ( ) Warehouse ( ) Other ( )

:‫المساحة‬

Area:
Use: COM( )RES( )Other( )

: ‫رقم اﻻرض والمنطقة‬

Makani ID:

:‫رقم مكاني‬

Project Name

: ‫اسم المشروع‬

:‫ رقم المبنى‬Owner’s Association No

:‫رقم جمعية المﻼك‬

( ) ‫ تجاري ) ( سكني ) ( أخرى‬:‫اﻻستخدام‬

Building Number
NO. of Car Parks
Approximate Rental Budget :

Page

1

Services and General information:

DLD/RERA/RL/LP/P210/ No.3/Vr.4/ Issue Date:Aug.2022

:‫عدد مواقف السيارات‬
: ‫القيمة التقديرية لﻺيجار‬
: ‫الخدمات والمﻼحظات العامه‬

‫اتفاقية معاينة عقار‬
Property Viewing Agreement

:‫رقم اﻹتفاقية‬

Agreement Number:

[‫الطرف اﻻول ]مكتب الوساطة‬

FIRST PARTY [THE BROKER OFFICE]

:‫التاريخ‬

Date:
Office Stamp:

SECOND PARTY (THE TENANT(S))

‫اسم المستأجر‬

Page

2

Tenant Name

DLD/RERA/RL/LP/P210/ No.3/Vr.4/ Issue Date:Aug.2022

Signature:

:‫التوقيع‬
:‫ختم المكتب‬

(‫الطرف الثاني )المستاجر‬
‫التوقيع‬
Signature

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/4e4bkhxo/property_viewing_agreement.pdf',
  NOW(),
  NOW()
);

-- Document 4: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '‫مرسوم رقم (‪ )34‬لسنة ‪3104‬‬
‫بشأن‬
‫تحديد الزيادة في بدل إيجار العقارات في إمارة دبي‬
‫ــــــــــــــــــــــ‬
‫نحن‬

‫محمد بن راشد آل مكتوم‬

‫حاكم دبي‬

‫بعد االطالع على القانون رقم (‪ )9‬لسنة ‪ 4002‬بشأن مركز دبي المالي العالمي‬
‫وتعديالته‪،‬‬
‫وعلى القانون رقم (‪ )61‬لسنة ‪ 4002‬بإنشاء مؤسسة التنظيم العقاري‪،‬‬
‫وعلى القانون رقم (‪ )41‬لسنة ‪ 4002‬بشأن تنظيم العالقة بين مؤجري ومستأجري‬
‫العقارات في إمارة دبي وتعديالته‪،‬‬
‫وعلى المرسوم رقم (‪ )44‬لسنة ‪ 4009‬بشأن مناطق التطوير الخاصة في إمارة دبي‪،‬‬
‫وعلى المرسوم رقم (‪ )4‬لسنة ‪ 4066‬بشأن بدل إيجار العقارات في إمارة دبي‪،‬‬
‫وعلى المرسوم رقم (‪ )41‬لسنة ‪ 4062‬بشأن مركز فض المنازعات اإليجارية في إمارة‬
‫دبي‪،‬‬
‫وعلى التشريعات المنظّمة للمناطق الحرة في إمارة دبي‪،‬‬
‫نرسم ما يلي‪:‬‬
‫نسب الزيادة‬
‫المادة (‪)0‬‬
‫تتحدد نسبة الزيادة القصوى في بدل إيجار العقارات في إمارة دبي عند تجديد عقود إيجار‬
‫العقارات‪ ،‬على النحو التالي‪:‬‬

‫أ‪-‬‬

‫بدون أية زيادة في القيمة اإليجارية للوحدة العقارية إذا كان بدل إيجارها يقل عن‬

‫‪ ٪60‬من متوسط أجر المثل‪.‬‬

‫ب‪-‬‬

‫‪ ٪5‬مـن القيمة اإليجارية للوحدة العقارية إذا كان بدل إيجارها يقل بنسبة تتراوح بين‬
‫‪ ٪66‬وحتى ‪ ٪40‬من متوسط أجر المثل‪.‬‬

‫ج‪-‬‬

‫‪ ٪ 60‬من القيمة اإليجارية للوحدة العقارية إذا كان بدل إيجارها يقل بنسبة تتراوح‬
‫بين ‪ ٪46‬وحتى ‪ ٪20‬من متوسط أجر المثل‪.‬‬

‫د‪-‬‬

‫‪ ٪ 65‬من القيمة اإليجارية للوحدة العقارية إذا كان بدل إيجارها يقل بنسبة تتراوح‬
‫بين ‪ ٪26‬وحتى ‪ ٪20‬من متوسط أجر المثل‪.‬‬

‫ه‪-‬‬

‫‪ ٪ 40‬من القيمة اإليجارية للوحدة العقارية إذا كان بدل إيجارها يقل بنسبة تزيد‬
‫على ‪ ٪20‬من متوسط أجر المثل‪.‬‬
‫نطاق التطبيق‬
‫المادة (‪)3‬‬

‫ؤجرين من الجهات العامة والخاصة في إمارة دبي‪ ،‬بما في‬
‫الم ّ‬
‫يسري هذا المرسوم على ُ‬
‫ذلك مناطق التطوير الخاصة والمناطق الحرة‪ ،‬بما فيها مركز دبي المالي العالمي‪.‬‬
‫متوسط أجر المثل‬
‫المادة (‪)4‬‬
‫لغايات تطبيق المادة (‪ )6‬من هذا المرسوم‪ ،‬يتحدد متوسط أجر المثل وفقاً لـ "مؤشر‬
‫تحديد بدل اإليجارات في إمارة دبي" المعتمد لدى مؤسسة التنظيم العقاري‪.‬‬

‫النشر والسريان‬
‫المادة (‪)3‬‬
‫ُيعمل بهذا المرسوم من تاريخ صدوره‪ .‬وُينشر في الجريدة الرسمية‪.‬‬

‫محمد بن راشد آل مكتوم‬
‫حاكم دبي‬
‫صدر في دبي بتاريخ ‪ 01‬ديسمبر ‪3104‬م‬
‫الــــمــــوافــــــــــــــــــــــــق ‪ 01‬صــــــفر ‪0341‬هـ‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/plrb2c1z/rental-increase-decree-43-in-dubai_ar.pdf',
  NOW(),
  NOW()
);

-- Document 5: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '19/03/2025 :‫التاريخ‬
DLD/OUT/2025/0001260 :‫المرجع‬
Circular)02-2025(
To: Esteemed Real Estate Developers
Greetings,

)2025-02( ‫تعميم‬
‫المحترمين‬

‫ المطورين العقاريين‬/‫السادة‬
‫تحية طيبة وبعد‬

Subject: Compliance with Law No. ( 8 of 2007 )
regarding the marketing of real estate projects

‫ ) بالنسبة‬2007 ‫ لسنة‬8 ( ‫ االلتزام بالقانون رقم‬:‫الموضوع‬
‫لتسويق المشاريع العقارية‬

RERA extends its sincere appreciation for your continued
cooperation. Regarding the above subject, some real estate
developers have been marketing and promoting projects
before completing the required registration procedures and
opening an escrow account. Please be advised that this
practice constitutes a violation of Law No.8 of 2007
Accordingly, RERA urges all real estate developers to strictly
adhere to the law and refrain from marketing or promoting
any real estate projects until all registration requirements are
met and an official permit is obtained from RERA. This
permit authorizes developers to market their projects while
ensuring full compliance with the terms and conditions
governing real estate advertisements. Furthermore, all real
estate advertisements must include a QR Code linked to the
project’s marketing permit. Additionally, RERA strictly
prohibits the collection of any payments related to real estate
projects outside the designated escrow account. Noncompliance with these regulations will result in legal action
against the violating company, per the governing real estate
development laws

‫بداية تهديكم مؤسسة التنظيم العقاري أطيب التحايا وتشكر لكم تعاونكم‬
‫ باإلشارة إلى الموضوع أعاله لوحظ في الفترة األخيرة قيام‬،‫الدائم معنا‬
‫بعض المطورين العقاريين بالتسويق والترويج عن بعض المشاريع‬
‫العقارية قبل استكمال إجراءات التسجيل وفتح حساب الضمان لهذه‬
‫ فعليه تدعو‬،2007 ‫ لسنة‬8 ‫المشاريع مما يعتبر مخالفة للقانون رقم‬
‫مؤسسة التنظيم العقاري جميع المطورين العقاريين بضرورة االلتزام‬
‫بالقانون وعدم التسويق أو الترويج عن أي مشاريع عقارية قبل استيفاء‬
‫واستكمال جميع اإلجراءات المتعلقة بتسجيل المشاريع العقارية‬
‫والحصول على تصريح رسمي من المؤسسة يخولهم بتسويق المشروع‬
‫وااللتزام بالشروط واألحكام الخاصة باإلعالنات العقارية بحيث يتم‬
‫“ الخاص بالتصريح العقاري‬QR code” ‫وضع رمز القارئ السريع‬
‫ كذلك تحذر مؤسسة التنظيم العقاري من‬،‫في جميع اإلعالنات العقارية‬
‫استالم أي مبالغ متعلقة بالمشاريع العقارية خارج حساب ضمان‬
‫المشروع ولن تتهاون المؤسسة باتخاذ اإلجراءات القانونية مع أي شركة‬
.‫ال تلتزم بالقوانين والتشريعات المنظمة لعمل المطورين العقاريين‬
.‫مقدرين تعاونكم الدائم معنا‬

We appreciate your continued cooperation.
‫وتفضلوا بقبول فائق االحترام والتقدير‬

Regards,

‫علي عبدهللا آل علي‬
‫مدير أول إدارة الرقابة العقارية‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/ekpflxkw/compliance-with-law-no-8-of-2007-regarding-the-marketing-of-real-estate-projects.pdf',
  NOW(),
  NOW()
);

-- Document 6: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '11/04/2023 :‫التاريخ‬
DLD/OUT/2023/0002269 :‫المرجع‬
(2023-01( ‫تعميم‬

Circular)01-2023(

‫المحترمين‬

Dear Real Estate Brokerage Firms
Greetings

‫ إلزامية استخدام ارقام الهواتف المسجلة في‬:‫الموضوع‬
‫سجل الوسطاء‬

Subject: mandatory use of registered phone
numbers in the brokers registry
RERA would like to thank you for your continued

‫ مكاتب الوسطاء العقاريين‬/‫السادة‬
‫تحية طيبة وبعد‬

‫أط ب ا ح ي وتش س س سسك كم‬

Cooperation. Concerning the above-mentioned ‫م‬

‫ما‬

‫بداية تهديكم مؤسس س س س س س سسة ا‬

‫ ب إلش س س إلى املوض س سسوو ا من وم م‬. ‫ت ونكم ا دائم م‬

subject regarding the regulation of the work of real ‫ب ت س سسوا وا ترواج‬

‫س سسو س س س ف م ي‬

‫ا‬

‫مل ا وسس س س ي ا‬

estate brokers, especially about real estate marketing

‫ فإنه ي وجب اس س س ردام ا ه م ا وا‬،‫مل مع ا ممي‬

and promotion and dealing with customers, the

‫انه ال يح أل وس س س س‬

registered phone numbers in the Real Estate Brokers
Registry must be used, as brokers are not permitted
to use phone numbers not registered with RERA.
Important note: If a violation of the issued circular
occurs, appropriate measures will be taken to address
the violation as prescribed.
We appreciate your continued cooperation.
Regards,

‫علي عبدهللا آل علي‬
‫مدير إدارة أول‬

‫ما‬

‫ا‬

‫ا‬

‫املسس س سسل ة وس اس س سسلل ا وس س س س ي ا‬

‫س رمسس سسل ة د مؤس س س س سسة ا‬

‫ م د ا ت ونكم ا دائم‬.‫اة‬

‫وا‬

‫اس س س ردام ا ه م وا‬

‫ف م يرص مم سسسة م ة ا وسس طة ا‬
.. ‫م‬

‫ في حالة مخالفة التعميم الصادر سوف تطبق املخالفات‬:‫مم ة مة‬
.‫املقررة بهذا الخصوص‬
‫و فض وا ب بول ف ئ اال ترام وا دي‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/adibxo42/إلزامية-استخدام-ارقام-الهواتف-المسجلة-في-سجل-الوسطاء.pdf',
  NOW(),
  NOW()
);

-- Document 7: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '‫التاريخ‪11/04/2023 :‬‬
‫المرجع‪DLD/OUT/2023/0002268 :‬‬
‫تعميم (‪)2023- 02‬‬
‫السادة‪ /‬جميع الشركات والمؤسسات العقارية‬
‫تحية طيبة وبعد‬

‫(‪Circular)02-2023‬‬
‫المحترمين‬

‫‪Dear Real Estate Brokerage Firms‬‬
‫‪Greetings‬‬

‫الموضوع‪ :‬تطبيق نظام رمز القارئ السريع )‪ (QR Code‬بالنسبة‬
‫لإلعالنات العقارية‬

‫‪Subject: Applying the QR code system for real‬‬
‫‪estate ads‬‬

‫بداية تهديكم مؤسسة التنظيم العقاري أطيب التحايا وتشكرلكم تعاونكم‬
‫الدددامم معنددا‪ .‬بددارة د د د د ددار إلى املوض د د د ددو أعاله ومن منطلق تطوير وتحدددي د‬
‫ارعالنددات العقدداريددة‬
‫إجراءات الحوكمددة العقدداريددة في د د د ددو د د د د ددا يمددا ي‬
‫نفيدكم علما بأنه قامت مؤسدسدة التنظيم العقاري بتطويرنظام التيداريح‬
‫العقارية‪ ،‬بحي يتم إ د ددداررم القارئ الس د ددر )‪ (QR Code‬ألي تي د ددريح‬
‫عقاري من نظام ترافيص د ددى وععى جمي الش د ددر ات العقارية االتزام بوض د د‬
‫رم القارئ الس ددر ‪ QR Code‬ععى جمي ارعالنات العقارية س ددواء املرمية‬
‫أو املقروء مم ددا س د د د ددو يمكن املتع ددامل ن من الت ددأك ددد من ن د د د دح ددة ارعالن‬
‫العقاري وأنه معتمد من مؤس دسددة التنظيم العقاري وذلك اعتبارا من تاريخ‬
‫‪2023/4/15‬‬
‫مالحظة هامة‪ :‬ندعو جمي الش د د د ددر ات العقارية االتزام بالتعميم الي د د د ددا ر‬
‫حي ان قيمة املخالفة في حالة عدم االتزام ‪ 50‬ألف رهم‬
‫مقدرين تعاونكم الدامم معنا‪..‬‬

‫‪RERA appreciates your continued cooperation and‬‬
‫‪support in its efforts to modernise and improve real‬‬
‫‪estate governance procedures. As part of this‬‬
‫‪initiative, we would like to inform you that the Real‬‬
‫‪Estate Regulatory Agency has introduced a new‬‬
‫‪system for issuing real estate permits using Quick‬‬
‫‪Response (QR) codes, accessible via the Trakheesi‬‬
‫‪system. Effective 15th April 2023, all real estate‬‬
‫‪companies are required to include the QR code on‬‬
‫‪their advertisements, whether in print or audio‬‬‫‪visual format. This will enable customers to easily‬‬
‫‪verify the authenticity and validity of the‬‬
‫‪advertisement, ensuring that the Real Estate‬‬
‫‪Regulatory Agency has approved it.‬‬
‫‪Important note: We would like to emphasize the‬‬
‫‪importance of adhering to the circular, as the fine in‬‬
‫‪case of non-compliance is AED 50,000.‬‬

‫وتفضلوا بقبول امق ااحترام والتقدير‬

‫‪We appreciate your continuous cooperation.‬‬
‫‪Regards,‬‬

‫علي عبدهللا آل علي‬
‫مدير إدارة أول‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/bxvawlef/تطبيق-نظام-رمز-القارئ-السريع-_-qr-code-بالنسبة-للإعلانات-العقارية.pdf',
  NOW(),
  NOW()
);

-- Document 8: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '05/08/2022 :‫التاريخ‬
DLD/OUT/2022/0004853 :‫المرجع‬
‫المحترمين‬

Dear All real estate offices
After Greetings

‫ اإلعالنات من خالل المنصات العقارية‬:‫الموضوع‬

Subject: ads through online real estate portals
RERA would like to thank you for your continued
cooperation.With reference to the abovementioned topic, and to the periodic monitoring of
online real estate classified portals, we noticed that
there are some non-updated offers that are no
longer available for sale or rent and are still
displayed on the portals by real estate offices.
Accordingly, all real estate offices must address the
online real estate classified portals within 7
working days regarding the advertisements that
were announced by the office or its registered
brokers and which are no longer available for sale
or rent, to delete those advertisements from the
portals. a copy of these communications need to be
send
to
RERA
at
the
e-mail:
Licensing@RERA.GOV.AE
All office should follow the instructions, and in
the event of a violation, a fine will be applied.
With the utmost respect and appreciation

‫علي عبدهللا آل علي‬
‫مدير إدارة أول‬

‫ مكاتب الوسطاء العقاريين‬/ ‫السادة‬
،‫تحية طيبة وبعد‬

‫ وب إلش س س س ة إلى‬، ‫ي‬
‫يأ‬

‫س س س ضل‬

‫تهديكم مؤس س س سمس س سسأ ضل التم ضل‬

‫ وإلى ضلرق بأ ضلدو يأ على ضملاص ت ضل‬،‫ضملوضوع ضملذكو عاله‬

‫لوحظ وجود ب ض ضإلعالاس س ت ضلغير م سسدث سسأ وضلم لم م سسد م س س ح سسأ‬
‫للبتع و لل أجيروم زضلت م روض س س س سسأ على ضملاص س س س س ت من قب ضملك تب‬
‫ وعلت سه يج سسب على جاتع ضملك س ت سسب ضل س ي سسأ‬،‫ضلوسس س س س س س سسأ ضل س ي سسأ‬
‫ ي م عا بخصس سسوال ضإلعالا ت‬7 ‫يأ خالل‬

‫مخ بأ ضملاص س س ت ضل‬

‫ضلم تا سست ضإلعاله ععه س عن ري مك سسب ضلوسس س س س س س سسأ ضل س ي سسأ و‬
‫ضلوس س س س س س ضل س ب يه للاك سسب وضلم لم م سسد م س حسسأ للبتع و لل سسأجير‬
‫ مع ض س س سسرو ة ض سس س س س ل‬،‫ب س س سسرو ة حذف هذه ضإلعالا ت من ضملاصس س س س ت‬
‫نس س س س ساسسأ من هسسذه ض ا س ب س ت للاؤس س س س سم س س س س سسأ على ضل ريسسد ض لك رون‬

Licensing@RERA.GOV.AE
‫وفي ح لأ عدم ض ل زضم سسسوف ي م ضتخ ا ضإلجرض ضت ضل اواتأ ضمل ب أ‬
.‫بهذض ضلاصوال‬
‫هذض وتف لوض ب ول ئ ض ح رضم وضل دير‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/5vwppyxh/الإعلانات-من-خلال-المنصات-العقارية.pdf',
  NOW(),
  NOW()
);

-- Document 9: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '14/07/2022 :‫التاريخ‬
DLD/OUT/2022/0004440 :‫المرجع‬
)01- 2022( ‫تعميم‬

Circular)01-2022(

...‫المحترمين‬

Dear Real Estate Brokerage offices.
Greetings,
Subject: linking real estate permits with the real
estate e-marketing contract - Form A

‫ مكاتب الوسطاء العقاريين‬/‫السادة‬
...‫تحية طيبة وبعد‬

A ‫ ربط التصاريح العقارية بعقد التسويق االلكتروني‬:‫الموضوع‬

‫ل س س س س بس‬

‫ت ل س س س سسب‬

‫تنوه مؤس س س س سل س س س سسم طلقنتبس طلوتسسيل س س م من‬

As part of our mission to simplify and facilitate our
offered services and digitalise real estate permits,
‫طلخدميت طلقحول طلرقمي لإلجرطءطت طلخيصس سسم يلقصس سسيلعق طلوتيلعم‬
starting 1 August, the Real Estate Regulatory
‫م‬
‫ م‬A ‫ س س س س سسوو قس لع عتوي طلبب طلس بسسم‬2022/8/1 ‫طعقبسسيلط م تسسيلع‬
Agency’s smart real estate e-marketing contract
(Form A) will be linked with the real estate permit ‫س سسخم م طتفيقبم‬
‫تيم طلقص س سسيلعق طلوتيلعم حبع حل س سسقد تح ب‬
system As such, a marketing agreement that needs
‫طلتلس س س سسوع طسوق‬
to be signed by a broker and a seller can be fulfilled ‫طلوس س س س سب طلبيئ ف طلنتيم ط قفيء يخيل لقس‬
online by completing Form A, entering the contract
.‫ ف طلنتيم‬A ‫عتد طلتلوع‬
number, and submitting it.
Moving onward, we encourage all brokers to
commit to using smart contracts when it comes to
permits for real estate advertisements.

‫ع ب دعو ج ب طلوس يء ط لتزطم يسقخدطم طلوتوي طل بم لكي‬
.‫ق كنوط م طلحصول على طلقصيلعق طلخيصم يإلعال يت طلوتيلعم‬

...‫وتفضلوا بقبول فائق االحترام والتقدير‬

Best regards,

‫علي عبدهللا آل علي‬
‫مدير إدارة أول‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/4zoi4txk/ربط-التصاريح-العقارية-بعقد-التسويق-الالكتروني.pdf',
  NOW(),
  NOW()
);

-- Document 10: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '02/08/2022 :‫التاريخ‬
DLD/OUT/2022/0004772 :‫المرجع‬

)2022-3) ‫تعميم‬

Circular)3-2022(

‫المحترمين‬

Dear / All real estate portals
Greetings

Subject: Terms and conditions for real
estate marketing on portals
RERA extends its warmest regards and gratitude
for your continued cooperation.
Regarding the above topic and in pursuit of the
governance of real estate advertisements to grant
more credibility and protect the rights of investors
and customers in the real estate market, we would
like to inform you that all real estate portals
concerned with publishing real estate ads must
adhere to the following directives:

‫ منصات التسويق العقاري‬/‫السادة‬
...‫تحية طيبة وبعد‬

‫ الشروط واالحكام الخاصة بالتسويق العقاري‬:‫الموضوع‬
‫على المنصات‬
‫أط ب ا ح ت وتشس س س سسكر‬

‫ما‬

‫بداية تهديكم مؤس س س س ساس س س سسة ا‬

‫ ب إلش س س إلى املوضس سسو أن م ومق م‬. ‫كم ت ونكم ا دائم م‬
‫س سسة إلن س ا املد سسد مق املص س س س سسدا سسة وحمس يسسة‬
‫ن دكم‬

‫حوكمسسة اإلن نس ت ا‬

‫ح وق املا سسن مر ق وامل م ا سو ا ا سسوق ا ا سسوق ا‬

‫س سسة امل سسة ب ش س س س سسر‬

‫ن م س ب سأن سسو ي ول سسب ناى لم امل ص س س س س س ت ا‬
:‫ة‬

‫ة اال تزام ب وليه ت ا‬

‫اإلن ن ت ا‬

1. Real estate advertisements without an official ‫ا لح ى سسح ناى ص سسر سس س مق‬
‫ ندم نش سسرأ ان ا ن‬.1
permit from the RERA are not allowed to be
.
‫ما‬
‫مؤساة ا‬
posted.
2. The permit must be verifiable through the ‫ا ر اال كتلون‬
‫ يجب ا أكد مق ص س س سسمة ا ص س س سسر مق‬.2
integration between RERA and the real estate
.‫ة‬
‫وامل صة ا‬
‫ما‬
‫املولود ب ا مؤساة ا‬
portals.

‫ا راب‬

‫ يجب حديث ب ن ت اإلن ن ت بش س س س سسلح دو مق‬.3

3. The content of the ads must be updated
periodically through RERA’s integration ‫ات ا م ت د م وةر‬
properties that are no longer available must be
delisting from the site (or proclaimed clearly on ‫بخ ك ل وواض س س س س ناى‬
the ad in written form that it has been sold out.)
4. The real estate advertising information must ‫س س ن س س ت‬
reflect the information of the permits issued by
RERA.
We appreciate your continued cooperation.

‫م سس ب‬

‫سس‬

‫اال كتلون م املؤسساسسة ب اس ة‬
‫بحسسهة س مق املو أو ك س بسسة ( م ا‬
.)‫اإلن ا‬
‫ يج س سسب أا كوا ب س س ن س س ت اإلن ا ا‬.4
.‫ا صر ا ص د مق املؤساة‬
... ‫م د ق ت ونكم ا دائم م‬

Important note: All real estate portals will be
monitored to ensure compliance with these terms
‫ س س س س سسوق كوا ه س ا س ب سسة ناى لم امل صس س س س س س ت‬:‫م ح سسة ه س م سسة‬
and conditions. In cases of non-compliance, the
‫ا‬
approved legal measures will be taken, including ‫ة أكد مق اال تزام بههم ا ش س س س سسروي واالحل م وسو ح ة ندم‬
blocking or stopping the site from publishing real
‫اال تزام س س س س سسوق ي م ا خ س اإللرااات ا س نون سسة امل م سسد بم س ةيه س‬
estate ads.

.‫ة‬

‫حجب أو إي ق املو مق نشر اإلن ن ت ا‬

Regards,

‫و ض وا ب و ة ئ االحتلام وا دير‬

‫علي عبدهللا آل علي‬
‫مدير إدارة أول‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/ptfi0uoj/الشروط-والاحكام-الخاصة-بالتسويق-العقاري-على-المنصات-1.pdf',
  NOW(),
  NOW()
);

-- Document 11: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '20/07/2022 :‫التاريخ‬
DLD/OUT/2022/0004542 :‫المرجع‬
)2022- 2( ‫تعميم‬

Circular)2-2022(
Dear Real Estate companies and agencies
Greetings

‫ جميع الشركات والمؤسسات العقارية المحترمين‬/‫السادة‬

Subject:Real Estate ads Terms and conditions

‫ الشروط واالحكام الخاصة باإلعالنات العقارية‬:‫الموضوع‬

RERA instruct All real estate companies wishing to market
or promote properties through various advertising channels,
including real estate platforms or social media must commit
to the following terms and conditions:

...‫تحية طيبة وبعد‬

‫جميع‬

‫بسسا س يتوج س‬

‫الشركات والمؤسسات العقارية الراغبة بالتسويق أو الترويج‬
‫للعقس سسا ات ن طايق القنوات اإ ال يس سسة المةتلمس سسة بمس سسا ي س سسا‬
‫المنصس س س سسات العقارية أو قنوات التواصس س س سسي ا جتما ا ا لت ا‬

1- Must obtain an official permit from RERA and the permit
number must be display on the ad.

:‫بالشروط واألحكا التالية‬
‫ص و وريح رسو ووم لم الم س و وةو ووة و ابة‬

2- The ad, whether written or visual, must include the name

‫ يجب الحصو وووى عص‬-1
‫رقم ال صريح في اإلعالن‬

of the real estate company.
3- For real estate projects that are sold off-plan, the

‫تنوه مؤس س س س سسس س س س سسة التنجي العقسسا‬

‫ يجب أن ي ضو و وومم اإلعالن سو و وووا قم ان لقروما ق أو لرئيا ق اسو و ووم‬:2‫الشر ة العقارية المعلنة‬

advertisement must include the developer''s name, project
name, project number, project location and approved escrow

‫لاع عص الخارنة يجب أن‬

account number.

‫ي ضو وومم اإلعالن اسو ووم الموور واسو ووم المشو ووروع ورقم المشو ووروع‬

4- The advertising company is responsible for the validity
and credibility of the advertisement content, and the
advertisement must not include any information that has
not been approved in the permit issued by RERA.
5- A promotional campaign permit must be obtained for
advertisements that include promotional campaigns, such

‫ بالنةووولة للمشووواريي العقارية ال‬-3

.‫ولوقي المشروع ورقم حةاب الضمان المع مد‬
‫ الشووور ة المعلنة كون ل المةوووصولة عم صوووحة ولصوووداقية‬-4
‫لح وي اإلعالن ويجب أن ال ي ض و و و وومم اإلعالن أي لعلولات ير‬
‫لع مدة في ال صريح الصادر لم الم سةة‬

‫‪ -5‬بالنةوولة لالعالنات ال‬

‫ضوومم حمالت رويجية لثل قديم‬

‫‪as the free benefits, value added facilities, discounts, or fees‬‬
‫‪exemptions, others.‬‬

‫ة و و و ووميالت أو لميفات أو خ يض و و و و و وات أو اع ووامات لم بع‬
‫الرسوم يجب الحصوى عص‬

‫صريح حملة رويجية‪.‬‬

‫‪6- It is strictly forbidden to market or promote through‬‬

‫‪ -6‬يمني لنعوا ق بووا وا ق ال ة و و و وووي أو ال روي عم نري المكووالمووات‬

‫‪RERA-‬‬

‫‪direct calls unless the person is registered in‬‬
‫‪approved green list.‬‬

‫الملاش وورة لغير األش ووخال المة ووجليم في نقام القائمة الخض وورام‬
‫المع مدة لم ل سةة ال نقيم العقاري‬

‫‪Important note: Violations will be issued to any company‬‬

‫مالحجة هامة‪ :‬سس س س سسوم تلبق المةالمات‬
‫تلت‬

‫ا‬

‫س س س سسركة‬

‫‪that does not comply with these terms and conditions‬‬

‫ب ذه الشروط وا حكا‬

‫وتفضلوا بقبول فائق االحترام والتقدير‪،،،‬‬

‫علي عبدهللا آل علي‬
‫مدير إدارة أول‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/daylptgk/الشروط-والاحكام-الخاصة-بالإعلانات-العقارية-1.pdf',
  NOW(),
  NOW()
);

-- Document 12: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  'Date: 17/05/2020

2020/05/17 :‫اليوم‬

2020 ‫) لسنة‬1( ‫تعميم رقم‬

Circular)1-2020(
Dear real estate companies and agencies,

...‫ جميع الشركات واملؤسسات العقارية املحترمين‬/‫السادة‬
...‫تحية طيبة وبعد‬

Subject: Real Estate Advertising and
Promotional Campaigns
We would like to thank you for your continued
Cooperation.

With reference to the above subject, and according

‫ اإلعالنات العقارية والحمالت الترويجية‬:‫املوضوع‬
‫أط ب ا ح ت وا ش س س سسك‬

‫ما‬

‫بداية تهديكم مؤس س س س ساس س س سسة ا‬
. ‫ونكم ا دائم م‬

‫ وب ء على ا م م‬،‫أعاله‬

‫الجزيل‬

‫ب إلش ة إلى املوضوع املذكو‬

to the circular number (11-2016) issued on ‫ نف دكم علم أنه من‬،2016/08/10 ‫ ا ص د ب يخ‬،)11-2016( ‫قم‬
10/08/2016, we would like to inform you that after ‫عدم‬
we

monitored

and

audited

real

‫ ف د تبين‬،‫ية‬

‫خالل ا ق بة وا دق ق على اإلعالن ت ا‬

estate ‫ أو ي م‬،‫م م ا ص د بهذا الخصوص‬

advertisements, we noticed that some offices are ‫م بحمالت‬

‫ا تزام ب ض املك تب ب‬

‫ وا‬،‫اس خدام قم ا ص يح بط ي ة غير صح حة‬

not complying with the above-mentioned circular ‫ت ويج ة من خالل اإلعالن عن ت ديم جوائز أو تاه الت أو خصوم ت‬
or that the permit number is being incorrectly used, ‫أو اإلعف ء من سوم الخدم ت أو سوم ا تسج ل بدون‬
as well as conducting promotional campaigns by ‫ودائ ة ا م ة‬
announcing prizes, facilities, discounts on prices,

‫م ا‬

‫على األس‬

‫الحصول على مواف ة مؤساة ا‬
.‫االق ص دية‬

exemption from service fees or registration fees
without obtaining the approval of RERA and
Dubai Economy.
This is considered an infraction to the laws and

‫وت بر جم ع هذه املم س ت مخ فة ل وانين واإلج اءات امل مة‬
‫ فإن نلفت انتب ه جم ع ا ش ك ت‬،‫ وب ء عل ه‬.‫ية‬
‫ وعدم تاويق أ ع‬،‫م م ا ص د ة‬

‫إلعالن ت ا‬

‫ية بض و ة اال تزام ب‬

‫ا‬

procedures regulating real estate advertisements. ‫ مع ض و ة إد اج قم ا ص يح في‬،‫بدون الحصول على تص يح سمي‬
We would like to affirm the importance of adhering

‫ واال تزام بجم ع ا ش وط وا ب ود ا نون ة الخ صة بإصدا‬.‫اإلعالن‬

to the issued circulars by all real estate companies,
and that properties are not to be promoted without

T049

.‫ا ص يح‬

obtaining an official permit that clearly displays
the permit number on the advertisement.
All the conditions and legal provisions for the

‫ سي م اتخ ذ‬،‫وفي ح ة عدم اال تزام بأ من ا ب ود ا وا دة أعاله‬

issuance of permits are to be explicitly adhered to.

‫ علم أن ق مة املخ فة‬،‫اإلج اءات ا نون ة امل مدة بهذا الخصوص‬

In the event of non-compliance, the approved legal

.‫ وفي ح ل تك ا ه تض عف ا مة‬،‫ أ ف د هم‬50 ‫ال ت ل عن‬

measures will be taken in this regard, noting that
the value of the violation is not less than AED
50,000, and in the event of a repeat violation, the
value will be doubled.

. ‫ونكم وتج وبكم ا دائم م‬
Best Regards,

Eng. Marwan Bin Ghulaita
CEO RERA

T049

‫مع ت دي ن‬

‫وتفضلوا بقبول فائق االحترام والتقدير‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/tfwizzpr/الاعلانات-العقارية-والحملات-الترويجية.pdf',
  NOW(),
  NOW()
);

-- Document 13: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  'Cf) Q•JI f1''

The Real Estate Regulatory Agency
Land Department

R

R

I

t;..i JI i...____.,..._
.....,•I.>---°
,

.!I� )''I_., IJ""''°IJ)''I �ylJ

A

Government of Dubai

2016\12\18 : ?..Hl''

Date: 18\12\2016

( 2016-21 ) et":?

Circular ( 21-2016)

Dear real estate brokerage Firms
Greetings

Subject: Standard forms for leasing
RERA extends its warmest regards and thanks ��., .�1.:....11 �l �L..aJI �I L...w_;.. �.J-f ½I�
you for your cooperation.

. Li.a.. iwl.J.11 �Jl.a.i

With regards to the above topic, and to J.o. � Jlb..i.o Vo-'' . .,�, .)�.ill t,--.o.,.ll JI OJ L..t)''�
regulate the mechanism for real estate brokers .:.GLi.a.ll_ei.. J �L...._,JI J4u J �WI �,;Li.a.II �lla....._,.11
working in the field of real estate leasing
�,;Li.a.II �lh........._,JI � � • ..,jl_,Jo''il � J# �t.-_,
brokerage and to protect the rights of all
parties, all real estate brokers should use the .:.GLi...ll_eb �''-_,.14 �WI o�I t�L..i.ll r-l.u.i.-1
approved real estate forms for leasing
properties.

J

Thank you for your cooperation,

j!.

- I·
1.:.. �0
....14lll.., r''�f''
I - "I ""
-·Li J�
,_....,

Attachment:
A copy of the standard Fonns

.:.liJ_,..
--.,.r.1 t.iW.11.:,,. �.

Ali Abdullah Al Ali

�Jl�I�..)&.

Director of Real Estate License Departmen

T028

�Li.a.JI �_;JI o).)J .)''!. ..1.4

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/gnboa5ys/النماذج-الموحدة-الخاصة-بالتأجير.pdf',
  NOW(),
  NOW()
);

-- Document 14: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  'a.� I I.... _.- --t;·., .11 �''--· _cc,,...,,�,�

The Real Estate Regulatory Agency
Land Department
Government of Dubai

_...L.....J

R

E

R

A

• . t.:.·.�11 L..u.,·..,...,,
i,f.) Lh..ll �

2018\06\20: f�I

Date: 20\06\2018

Circular ( 2-2018)

( 2018-2) �

To ALL Real Estate Companies and Real Estate
Firms
Brokerage

Dear Sirs,

Subject: Amending Terms of the Permit
for Marketing Properties Abroad

LJ:4 �, )� L�� �� ..bJ,_.t �..I.JU :e,-eg.l.l
a.J_.,..ul �L>

RERA extends its warmest regards and
- <''t .<'' .��J ,L�I .....Jo1
.�.Li.aJI �
-· t:..:�tl �·>j-4 i-::-,
-<''- L,::
. - ''i''J
thanks you for your cooperation. Reference to i-�
the abovementioned subject, and further to J o�I J_,s''.UI �.,.ti dl oJL!."i4J .� �l..ul �Jt....:i
our previous circular no (13 of 2016) dated
2/11/2016 with a view to increase the u-''lJ • r2016/11;2 J t.)J-ll (2016/13) iJ.) �4 uWJ
confidence of Investors and Customers in the
u-4, '':?Jla...JI J__,..JI J �l.ait.lJ ��I a...iS o.l½J �
Real Estate Market, and protect the rights of
all parties, we would like to inform you that it
'' .,jl_,.b''il � Jyi> �l4o> J�
is decided to add a new clause under the
.. .:dt J,..i..1.>
·
--..u .uL. a.bl>''il.)
'' ij-1e
.. . ..u.i. a.s�I'' .)->4''
Special Terms related to marketing properties �GJI .,b4.r-''
for real estate abroad. This new clause is as �.,,I.Aj) J-AJ o).,4'',/1 J a.JJ..ul �� w-4 uGU... J:.,-3 ��
follows: "the necessity of providing a Bank
· . .:.q 1,....!)
Ll � �L
�.) ..,�
,-...__,� 10 �
<'',. (Jl.4-,.,jO
•e1 ·­
Guarantee in a value of 10 million Dirhams in .)-J:''W
•
• 1-->J
... �
favor of the RERA for incomplete projects",
this is in addition to the other previously �I J �L..., o�I ''-5.»�I ..b�I JJ a.il.o'',14 (o.JA4-

approved terms. This amendment shall be
''�l.)WJ.I
applicable to all the new permits and those
whose renewal is required. And all companies � �J • 0-4..1..�.H e,�I � � J:..i..ai!I l..i.A ��
with prior permits amend their circumstances
� ��JI J:..1-..lU ¼L... e,� i.,-.1... �WI u!S"�I
in accordance with this circular before
01/01/2019
.2019/01/01 � .ill�J �I 1...14 t° JAi�
•••• Ua.o �JW � � �fiLl,

Thank you for your cooperation,
Faithfully Yours,
Eng. Marwan Bin Ghulaita
CEORERA

·-1�rlr>.
1· :''.l/1 �
· 1-f,.__;_.,
·•\j J�
�j

� � ..1-4.>I u IJJ-4 ·r
....�, J!..u.l

� ..

‫لتصاريح العقارية‬
‫ا‬
Permit of marketing real estate a board

Required documents:
1- A Letter of No Objection to marketing the
project or the property to be issued by the
official authorities in the country in which
the property is located,
2- Copy of the title deed of the property
3- Copy of a Marketing Contract executed
between the Property Owner and the Real
Estate Brokerage Firm.
4- An official letter issued by the government
authorities of the country in which the
property is located , clarifying the
percentage of completion of the project ,
which shall not be less than 50% (for the
incomplete projects)
5- An undertaking issued by the Brokerage
Firm not receiving any amounts or issuing
any Sale Contracts from the Firm; the
purchaser shall inspect the property or
project before purchase and it shall execute
a contract directly with the owner of the
property in the concerned country.
6- Provide a Bank Guarantee in the sum of 10
Million Dirhams for incomplete Projects as
per approved form of bank guarantee





:‫المستندات المطلوبة‬
‫ رسالة من الج هات الرسميةفيبلد العقاربعدم الممانعة من‬-1
.‫تسويق المشروع او العقار‬
.‫ نسخة من ملكية العقار‬-2

‫كتب الوسيط‬
‫ نسخة من عقدتسويقبين مالك العقار و م‬-3
.‫العقاري‬
‫ رسالة رسمية من الجهات الحكوميةفيبلد العقارتوضح‬-4
‫تقلنسبة انجاز المشروع‬
�‫نسبة انجاز المشروع ويجب ان‬
.)‫ (للمشاريع الغير جا هزه‬%50 ‫عن‬
‫ تعهد من مكتب الوساطة العقاريةبعدم است�م اي ة مبالغ او‬-5
‫تعين على‬
‫اصدارعقود البيع من المكتب حيث انهي‬
‫تعاقد‬
‫المشتري معاينة العقار او المشروعقبل الشراء وال‬
.‫مباشرة مع مالك العقارفي البلد المعني‬
‫ م�يين در همبالنسبةللمشاريع‬10 ‫بقيمة‬
‫تقديمضمانبنكي‬-6

.‫لضمان البنكي‬
‫الغير جا هزه حسب النموذج المعتمدل‬

: ‫م�حظه‬

Notice:


‫تصريحتسويق عقارات من خارج الدولة‬

The documents coming from abroad shall
be attested by the Embassy of UAE and the
Ministry of Foreign Affairs and shall be
legally translated into Arabic
The number of the permit shall be
mentioned in the announcement.
Permit fees 1020 Dh.

RERA/RL/LP. Cond.s / No.39/Vr.1/ Issue Date: Jun.2018

‫المستندات الواردة من خارج الدولةيجب انتكون مصدقة‬



‫منسفارة �مارات ووزارة الخارجية ومترجمةباللغة‬
.‫العربية عن طريق مترجمقانوني‬
.‫تصريحفي�ع�ن‬
‫ يجب�لتزامبذكر رقم ال‬
.‫ در هم‬1020 ‫لتصريح‬
‫فقة على ا‬
‫رسوم الموا‬



‫لتنظيمالعقاري‬
‫يــرجــى ⸮⸮ــتــزامبــنــص الــض ــمــان الــبــنــكــي أدنـ ـاهويــقــدم الــى مؤسسة ا‬
Please consider the following as a sample bank guarantee letter for RERA

‫تسويقعقار ات من خارجالدول ة‬
‫ن موذجض مانبنكيل‬

Sample of a bank guarantee of permit to
marketing real estate a board
Date:

:‫التاريخ‬

To: Real Estate Regulator agency

‫دبي‬- ‫ترمين‬
‫لعقاري المح‬
‫نظيم ا‬
‫مؤسسةالت‬:‫الى‬

(RERA) - Dubai
Dear Sir,
Our Trade License Guarantee:
For AED 10,000,000 (Ten million Dirham’s
only)

,, ‫طيبـةــ وبعــد‬
‫تحي ة‬
:‫لتجارية بمبلغ‬
‫رفي للرخص ة ا‬
‫ننا المص‬
‫ض ما‬
) ‫يين درهمفقط‬
⸮ ‫ درهم ( عشرة‬10,000,000

In consideration of your granting to:

Dubai, UAE a permit to marketing real
estate a board , We hereby undertake to
pay to you or your accredited
Representative on first demand any
amount submitted to us by you in
respect of claims arising out of any
dispute, provided that such payment
shall not exceed AED 10,000,000 (ten
million Dirham’s only)
This payment shall be made by us on your
request and despite of any contestation of
the part of:
This validity of the guarantee is unlimited
and shall continue in force unless otherwise
informed by you.

: ‫نظـــراًل منحكم الســــادة‬
‫نتعهد‬,‫ متصريحلتسويق عقارات من خارجالدولة‬.‫ ع‬.‫بي – ا‬
‫د‬
‫لممثلكم المخول عند أولطلب أي مبلغتطلبونه‬
‫دفعلكم أو‬
‫بهذا أنن‬
‫لمطالبات النات جة عن أي نزاعبشرط أن ⸮يتجاوز‬
‫بخصوص ا‬
. ) ‫فقط‬
‫ درهم ( عشرة م ⸮يين درهم‬10,000,000 : ‫بلغ‬
‫ذلكالم‬

‫ك ما نتع هدبتقديم ال مبلغبنا ًء على طلبكم وبغض النظر عن أي ة‬
: ‫لسادة‬
‫معارض ة من الطرف ا‬
‫ف ةمستمرة‬
‫ ويظل هذا الض مانساريا ًبص‬, ‫مدةالضمانغير محدود‬
. ‫ا ⸮ا اذأبلغتمونابعكس ذلك‬

RERA/RL/LP/2.1.1.OP1.P4.S13 _F.8/Vr.1/ Issue Date: Jun.2018

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/gicpqkil/تعديل-شروط-تصريح-تسويق-عقارات-من-خارج-دولة.pdf',
  NOW(),
  NOW()
);

-- Document 15: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  'The Real Estate Regulatory Agency
Land Department
Government of Dubai

(S)

R

E

R

h.....JI f''

, L;-.i II 4.__<Mlfl.,_,,,.,.:,.............

A

(?.Jli.J I �I L.....,:,...0

Date: 06/04/2014

2014/04/06 :c,uli.11

Circular No (2/2014)

(2014/2) pl__; f''.J 4t,j

To All companies operating in

f''� �I �1�;11 �l.:i �LSy!i /oJl...JI

the residential timeshare

.-: - .t\
.�..;,-,--

Subject: Important Terms for

� J.JLLLll �� b.J� : t�,J-4,ll

.

��\ r''

Timeshare Contracting
Starting from today, the following terms
must be adhered to, as they must be read
and undersigned by the purchaser and
company''s

authorized

.t\ f''�I''
cl.,..

I II

I Q\

���.
...•.11 �
·''I J:i�
.''i:;
�I .JJ''""''
• 1.J.
L.t.� �
:.) l:i (.)A
J- .
..•
• J-.:..11
- (.)·1
•.t.... A..J,.�,,
t.o.•
.�.···''I (.>!"''
,- ..r �
___.,... .J 1,-;:1.,
.._
(.)A ,�
.,....... .J ($ �

(.)A

person.

purchaser and company must maintain a
copy of the contract to be presented to
RERA when requested.
Non-compliance with this circular is against .b.Jy,:;.l ''-.ii� � � 6"'' l"lj:il)''I I"� 61 �
licensing terms and regulations issued by t..........).4 6"'' o.;.1l....:i.!1 41 a11iilll �1..,.UI .J l"��I.J (..ff_;JI
RERA which will result in fines as per the

···''- ·''I 1 :.1 ill.J 4...41.r-•.t:.:-;11
-<,.;... u,_,,.,. ($.JUa.ll r-..:.11 ��

� .) ..)A''

.2009 � 25 el.; 1.$ •11iill!

Dubai Executive Council No 25 of 2009.

Your commitment and cooperation is

..,(Al �-:ti •
....{_� .J�
O::.J J£.4
.Jr---...;,-,-,
-�

much appreciated
Deputy CEO

''-ti,,,,,,:-.,,.

.,..,+ w, t HI oorr: ,.,..si.;, + w, t HT,, IT: .j;;Le
Phone: +971 4 222 1112, Fax: +971 4 221 5533, PO.Box: 1166, Dubai, UAE i..>.>.:i.ll 4!_,.JI .;.1;1,.�1
Website: www.rpdubai.ae : ..:....;.,.._;11 t°""" - E-mail: info@rera.gov.ae :�9,....s:.Jt"I .....,_,....11

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/jaddzjsx/issues_40270i.pdf',
  NOW(),
  NOW()
);

-- Document 16: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  'Our Vision:
To be a global real estate leader in attracting investments.

Our Mission:
To create a real estate environment that applies best international
practices to guarantee the rights of all stakeholders, and to
contribute to the development of society by:
• Developing and applying clear and transparent real estate
regulations
• Providing distinctive and effcient real estate services that help
attract investment
• Increasing real estate knowledge

Chapter I
EJARI Program

Tenancy Guide

About EJARI
EJARI is an online program developed by RERA for recording tenancy
contracts for all types of property in the Emirate of Dubai, pursuant to Law
No. 26 of 2007, as amended by Law No. 33 of 2008. EJARI is the frst step to
regulate the process of real estate lease and management. It helps upgrade
this important sector and provides distinctive real estate services in terms
of registration and regulation. The program aims to preserve rights, regulate
the relations between the parties to property lease and management, and to
provide encouraging and safe environment for those wishing to engage in this
feld, including investors or benefciary tenants.

EJARI Mechanisms
Tenancy Contract Registration
As the registration of tenancy contracts through EJARI is mandatory, plans
have been developed to connect all those engaged in property lease and
management sector, including licensed companies in this feld, companies
which own and manage properties, or landlords who manage their properties
on personal basis, or their legal representatives, and enable them to register
and issue contracts.
Registration of Management Contracts
Management contracts concluded between the property owner and the
licensed real estate company is registered through EJARI. This contract
determines responsibilities and obligations between the parties to the
contract, especially in terms of property management, services provided to
tenants, issuance and registration of lease contracts, legal follow-ups, rent
collection, maintenance and other obligations. The objective of registration of
the management contract is to enable the company to obtain information of the
registered property, perform any authorized operations under the management
contract, including the registration of tenants and processes associated with
the lease contracts, such as rental, renewal, and eviction during the period of
the management contract.
6

EJARI Program

Training on Using EJARI
There is a training program for using EJARI in order to qualify people who
need to use it. Arrangements have been made with Dubai Real Estate Institute
in this regard in order to send registered persons to be trained and awarded
certifcates. Access to EJARI is given to the persons who have obtained the
training certifcates that allow them to record data and issue tenancy contracts
directly through the website.

Documents Required for Registration in EJARI
Users
Owner Manager (Individual): The person who manages the property which is only
personally owned. No license is required in this respect.
Required Documents:
1. Passport copy.
2. Copy of the title deed of any owned property (to verify the number of
the owner).
Owner Manager (Company): The entity (company) which manages the property
owned by the company only (i.e. the property registered in the name of the
company). This company may have different activities, such as a shopping
mall, commercial center, or a governmental or quasi-governmental body.
Required Documents:
1. Copy of the trade license
2. Copy of the title deed of any property owned by the company (to verify the
owner number).
3. Copy of the passport of the offcial representative of the company (manager)
4. Letter from the company that identifes the names of users who will be
qualifed for using the program.
5. Copies of the passports of the employees nominated to use the program
Property Management Companies
 A company involved in property management licensed by the Department
7

Tenancy Guide

of Economic Development to carry out any of the following activities:
 Property lease and management on behalf of third parties: (This activity
gives the company the power to rent property from owners, and then
releasing them to third parties).
 Lease and management of private property: (This activity grants the company
the power to manage the property of the licensor and his relatives only).
 Property administrative supervision services: (This activity gives the
management company the power to manage the owners’ property under
a management contract between the company and the owner, in which
the owner determines the authority granted to the company to manage the
property for him.
 Shopping centers and malls
 Businessmen service centers
 Department stores and retail shops
Required Documents:
1. Copy of the trade license
2. Copy of the passport of the offcial representative of the company (manager)
3. Letter from the company that identifes the names of users who will be
qualifed for using the program.
4. Copies of the passports of the employees nominated to use the program
Representative of the owner (agent)
The person who represents the owner under the power of attorney granted
by the owner, or an owner in a group having joint ownership of the property,
represented by a power of attorney issued by them, or under legal guardianship
(such as a receiver, a guardian of minors, or a representative of the heirs).
Required Documents:
1. Copy of the owner passport (whether an individual or a group of owners)
2. Copy of the passport of the agent
3. Copy of the power of attorney and/or (guardianship order or the order
appointing the receiver)
8

Chapter II
How to Register Lease Contracts
with RERA

Tenancy Guide

The owner who personally manages the property (no property management license
is required)
1. Completing the property management statement form (CD) which includes
the property and lease contract information.
2. Attaching the required documents, namely:
1. Passport copy
2. Copy of the title deed and land map (Land Department)
3. Copy of the power of attorney of one of the owners, in case of joint
ownership of the property
Owner Obligations:
1. If the owner delegates the property management to a property management
company, the owner shall observe the following:
2. The company shall be licensed and registered by RERA and its business
shall include property lease and management to third parties, or property
administrative supervision (verifying the trade license).
3. Signing a management contract with the company, which identifes the parties
to the contract, property details, the obligations of each party, management
fees, and the contract period. In the event the building is rented in full, the
company shall be licensed to conduct the business of property lease and
management on behalf of third parties.
4. The person signing on behalf of the company shall have capacity
(offcially authorized).
5. There shall be a premises for the property management company
(fxed address)
In case the owner leases and manages the property by himself, the owner shall observe
the following:
1. The property should be owned by (granted to) the applicant and its
ownership should not be disputed by any other persons.
2. In the event the property is jointly owned, there should be a power of attorney
by the owners to the applicant authenticated at the notary public.
3. The property granted by the government shall not be a popular house and
shall be designated as family residence for the person to which it is granted

10

How to Register

only, subject to the conditions laid down by the government bodies.
4. The property shall not be mortgaged for any party that prescribes noninvestment (such as Etisalat, certain banks, and donors).
5. The property shall not be fnanced by Zayed Housing Project or Mohammad
bin Rashid Housing Establishment.
6. There shall be no amendment or violations in respect of the property
plan, and the property shall be constructed according to the applicable
conditions and standards stipulated by the regulations in the Emirate of
Dubai, according to the completion certifcate issued by Dubai Municipality,
and the licenses granted for use and specifcations.
7. The property shall satisfy safety and security conditions (civil
defense statement).
8. The purpose of lease and use shall be specifed and shall comply with the
authorized conditions in the Emirate of Dubai according to area designation
(residential, commercial, industrial, etc.)
9. In the event the property is leased in whole or in part (supplement, part of
villa, or any additions), this shall be indicated and the plans approved by
Dubai Municipality shall be submitted.
10. In the event of partial lease of the property, an independent electricity meter
shall be installed for the part intended to be leased, and the procedures
shall be completed and approvals shall be obtained from Dubai Electricity
and Water Authority.
11. The party responsible for maintenance shall be identifed and a maintenance
contract shall be procured from a building maintenance company.
12. The facilities and services available in the property, the extent to which the
tenants may use these facilities, and the obligations to be complied with
shall be identifed (e.g. swimming pools, gyms, gardens, parking lots, etc.)
13. The party responsible for cleaning and security of the property and facility
management shall be identifed.
14. The specifcations and total area of the property and the area of the leased
part shall be identifed (in the event of partial lease).
15. Insurance shall be maintained in respect of the property at one of property
insurance companies.
16. The rent value of the property shall be identifed.
17. The duration of the lease contract shall be identifed.

11

Tenancy Guide

18. The insured sum agreed upon by the landlord and the tenant shall
be identifed.
19. The landlord shall undertake to comply with RERA regulations and
Landlords and Tenants Law issued in the Emirate of Dubai.
20. The landlord undertakes to authenticate the lease contract at RERA and
present the documents and tenant information for each contract (lease
or renewal).
21. The landlord undertakes not to issue more than one contract for the leased
property and for only one person or one entity.
22. In the event the contract with the tenant is terminated, the fnal water and
electricity invoice shall be presented, along with the settlement with the
former tenant.
23. No new contract shall be registered for a new tenant of the formerly leased
property before ending the contract with the former tenant and presenting
the settlement and the fnal water and electricity invoice.
The tenant shall be inquired about the following documents:
1. Passport copy, if the tenant is an individual (name, passport number,
residence permit, and expiry dates of the passport and residence permit).
2. Trade license, if the tenant is a company (trade name, license number,
expiry date).
The tenant:
In the event of dealing with the landlord directly, the following procedures
shall apply:
1. Verifying property ownership.
2. Passport photocopy of the landlord (name, etc.)
3. Photocopy of the power of attorney given to one of the landlords, in the event
of joint ownership, authorizing him to manage the property.
4. Verifying that there are no construction violations (unlicensed additions
or amendments).
5. Verifying the type of the licensed use of the building (residential, commercial)
6. Registering all information of the lease contracts (property type, unit, rent
amount, landlord name, type of use, land number)
12

How to Register

7. Reading the contract clauses to identify the obligations of both parties.
8. The electricity meter shall be transferred to the name of the tenant upon
signing the contract.
In the event of dealing with property management company:
1. Copy of the lease contract between the landlord and the company (verifying
the name of the landlord, contract period).
2. Copy of the land ownership and map (verifying the name of the landlord,
location, property type, and use).
3. Copy of the trade license to verify the name of the company, type of the
licensed activity, and whether it is authorized to lease and re-lease.
4. The contract clauses shall be read to identify the obligations of both parties.
5. All information shall be registered in the lease contract (landlord name,
name of the leasing company, property type, land type, rent value, and
contract period)
6. Payments shall be in the name of the owner of the property or the name of
the leasing company only and not in the name of any other persons.
7. There shall be premises for the company (an offce) and its address shall
be identifed.
8. The electricity meter shall be transferred upon signing the contract.
In the event of dealing with a private property lease and management company:
1. Property ownership shall be verifed, so that the property shall be owned by
the company itself, the company owner, or his frst-degree or second-degree
relatives, according to the granted license.
2. Copy of the trade license (verifying the trade name, type of license, etc.)
3. The contract clauses shall be read to identify the obligations of both parties.
4. All information shall be registered in the lease contract (landlord name,
name of the leasing company, property type, unit type, rent value, and
contract period)
5. Payments shall be in the name of the owner of the property or the name of
the leasing company only and not in the name of any other persons.
6. There shall be premises for the company (an offce) and its address shall
be identifed.
13

Tenancy Guide

7. The electricity meter shall be transferred upon signing the contract.
In the event of dealing with a company licensed for property management
supervision business:
1. Copy of the management contract concluded between the landlord and the
company (to verify the name of the company and the landlord, property type
and specifcations, and the contract period).
2. Trade license of the company (company name, business type, expiry
date, etc).
3. The contract clauses shall be read to identify the obligations of both parties.
4. All information shall be registered in the lease contract (landlord name,
name of the leasing company, property type, unit type, rent value, and
contract period)
5. Payments shall be in the name of the owner of the property only and not in
the name of the company or any other persons.
6. The electricity meter shall be transferred to the name of the tenant upon
signing the contract.
In the event the lessor (landlord/property management company) does not register the lease
contract, i.e. registration through the tenant, the required documents shall be as follows:
1. Copy of the tenant passport, if the tenant is an individual
2. The original contract, or a copy thereof
3. Electricity and water invoice of the last month (the meter shall be in the name
of the tenant).
4. Copy of the trade license, if the tenant is a company.
5. Copy of the land map or the title deed of the property.
Instructions to be complied with for registering lease contracts at the printing offces.
1. The applicant for registration of the lease contract shall be relevant to the
transaction, i.e. either the owner of the property or the tenant (the identity
and capacity shall be verifed).
2. The applications fled by the real estate companies shall not be accepted
and the company shall be obliged to register the contracts through EJARI.

14

How to Register

3. The lease contract shall be effective.
4. The applicant for registration of the lease contract shall fll the online form,
shall undertake and declare the accuracy of the information and addresses
(phone numbers and email address), and shall assume responsibility in the
event of any mistake by signing the form on the designated place. In the
case of a company, the seal of the company (whether a tenant or a landlord)
shall be affxed in the designated place.
5. The property or the unit shall be registered at the Land Department (title
deed in the name of the owner)
6. The purpose of lease and type of use shall be identifed and shall be
according to the conditions applicable in the Emirate of Dubai according
to designation of areas (as mentioned in the lease contract, residential,
commercial, industrial).
7. The contract shall not be restricted by the condition of non-investment, such
as using it as a family accommodation, popular house, or funded by entities
that prescribe non-investment, such Sheikh Zayed Project, and Mohammad
bin Rashid Housing and Telecommunications Establishment.
8. There shall be no amendments or violations to the property plan and the
property shall be constructed according to the conditions and applicable
standards provided for in the Emirate of Dubai regulations, including the
completion certifcate issued by Dubai Municipality (i.e. the lease contract of
one room in an apartment, a villa consisting of a number of rooms, or part of
an Arab house, i.e. joint accommodation, shall not be registered).
9. Sublease contracts (between one tenant and another) shall not be registered.
10. Attention shall be paid to the contract duration and property type (for
instance, if the lease property is an open land and the lease contract is for
construction buildings to be invested for a long time, the lease contracts
shall not be registered), because it shall be considered musataha (land
rental contract) rather than a lease contract.
11. The information stated in the form shall be matched with the information
stated in the documents and lease contract.
12. All required documents shall be provided, verifed, and uploaded to the
system, as follows:
 The original lease contract and a copy thereof (the name of the tenant,
landlord, and lessor, the commencement and expiry date of the contract,

15

Tenancy Guide

the registered rent value, property and unit number, and the purpose
of the lease shall be verifed). In the event the original contract is not
provided, the transaction shall not be accepted.
 DEWA invoice for the last month (the name shall be verifed, the meter
shall be in the name of the tenant, date, unit number, the address stated
on the invoice and name of the landlord shall be verifed and matched
with the contract)
 Copy of the land map or the title deed of the property (the land number,
landlord name, and the location of the registered property shall be
verifed and matched with the information stated in the lease contract).
 Copy of the tenant passport, if the tenant is an individual (the tenant
name, nationality, passport number, and residence permit number, and
the expiry dates thereof shall be verifed and matched with the information
stated in the lease contract)
 Copy of the trade license, if the tenant is a company (trade name,
trade license number and expiry date, and the address of the company
registered in the license shall be verifed and matched with the information
stated in the lease contract).
In the event of a dispute between the lessor and the tenant
1. Registering the lease contract.
2. The parties shall refer to the competent authority to settle the dispute
according to the applicable procedures.

Documents required for registration in EJAR as users
Owner Manager (Individual): The person who manages the property which is only
personally owned. No license is required in this respect.
Documents required:
1. Passport copy
2. Copy of the title deed of any property owned (to verify the number of
the owner).
Owner Manager (Company): The entity (company) which manages the property
16

How to Register

owned by the company only (i.e. the property registered in the name of the
company). This company may have different activities, such as a shopping
mall, commercial center, or a governmental or quasi-governmental body.
Required Documents:
1. Copy of the trade license
2. Copy of the title deed of any property owned by the company (to verify the
owner number).
3. Copy of the passport of the offcial representative of the company (manager)
4. Letter from the company that identifes the names of users who will be
qualifed for using the program.
5. Copies of passports of the employees nominated to use the program
Property Management Companies
 A company involved in property management licensed by the Department
of Economic Development to carry out any of the following activities:
 Property leasing and management on behalf of third parties (This activity
gives the company the power to rent property from owners, and then
releasing them to third parties).
 Rental and management of private property: (This activity grants the company
the power to manage the property of the licensor and its relatives only).
 Property administrative supervision services: (This activity gives the
management company the power to manage the owners’ property under
a management contract between the company and the owner, in which
the owner determines the authority granted to the company to manage the
property for him.
 Shopping centers and malls
 Businessmen service centers
 Department stores and retail shops
Required Documents:
1. Copy of the trade license
2. Copy of the passport of the offcial representative of the company (manager)
3. Letter from the company that identifes the names of users who will be
qualifed for using the program.
17

Tenancy Guide

4. Copies of the passports of the employees nominated to use the program.
Representative of the owner (agent)
The person who represents the owner under the power of attorney granted
by the owner, or an owner in a group having joint ownership of the property,
represented by a power of attorney issued by them, or under legal guardianship
(such as a receiver, a guardian of minors, or a representative of the heirs).
Required Documents
1. Copy of the landlord passport (whether an individual or joint owners).
2. Copy of the agent passport
3. Copy of the power of attorney and/or (custody order or receiver
appointment order)

18

Chapter III
Tenancy Regulating Legislations

Tenancy Guide

Decree No. (43) of 2013
Determining Rent Increases for Real Property
in the Emirate of Dubai(1)
We, Mohammed bin Rashid Al Maktoum, Ruler of Dubai,
After perusal of:
Law No. (9) of 2004 Concerning Dubai International Financial Centre and
its amendments;
Law No. (16) of 2007 Establishing the Real Estate Regulatory Agency;
Law No. (26) of 2007 Regulating the Relationship between Landlords and
Tenants in the Emirate of Dubai and its amendments;
Decree No. (22) of 2009 Concerning Special Development Zones in the Emirate
of Dubai; Decree No. (2) of 2011 Concerning Rent in the Emirate of Dubai;
Decree No. (26) of 2013 Concerning the Rent Disputes Settlement Centre in
the Emirate of Dubai; and
The legislation regulating free zones in the Emirate of Dubai,
Do hereby issue this Decree.

Percentages of Increase
Article (1)
When renewing real property lease contracts, the maximum percentage of
rent increase
for real property in the Emirate of Dubai will be as follows:
a. no rent increase, where the rent of the real property unit is up to ten percent
(10%)
b. less than the average rental value of similar units;
c. fve percent (5%) of the rent of the real property unit, where the rent is eleven
© 2014 The Government of Dubai Legal Affairs Department
(1) Every effort has been made to produce an accurate and complete English version of this
legislation. However, for the purpose of its interpretation and application, reference must be made to
the original Arabic text. In case of confict the Arabic text will prevail.

20

Tenancy Regulating Legislations

percent (11%) to twenty percent (20%) less than the average rental value
of similar units;
d. ten percent (10%) of the rent of the real property unit, where the rent is
twenty one percent (21%) to thirty percent (30%) less than the average
rental value of similar units;
e. ffteen percent (15%) of the rent of the real property unit, where the rent is
thirty one percent (31%) to forty percent (40%) less than the average rental
value of similar units; or
f. twenty percent (20%) of the rent of the real property unit, where the rent
is more than forty percent (40%) less than the average rental value of
similar units.

Scope of Application
Article (2)
This Decree will apply to landlords, whether private or public entities, in the
Emirate of Dubai, including those in special development zones and free
zones such as Dubai International Financial Centre.
Average Rental Value

Article (3)
For the purposes of application of Article (1) of this Decree, the average rental
value of similar units will be determined in accordance with the “Rent Index of
the Emirate of Dubai” approved by the Real Estate Regulatory Agency.

Publication and Commencement
Article (4)
This Decree comes into force on the day on which it is issued, and will be
published in the Offcial Gazette.
Mohammed bin Rashid Al Maktoum
Ruler of Dubai
Issued in Dubai on 18 December 2013
Corresponding to 15 Safar 1435 A.H.

21

Tenancy Guide

Law No. (33) of 2008 Amending
Law No. (26) of 2007
Regulating the Relationship between Landlords and Tenants
in the Emirate of Dubai 2
We, Mohammed bin Rashid Al Maktoum, Ruler of Dubai,
After perusal of:
Federal Law No. (5) of 1985 Issuing the Civil Code of the United Arab Emirates
and its amendments;
Federal Law No. (10) of 1992 Issuing the Law of Evidence in Civil and
Commercial Transactions and its amendments;
Law No. (16) of 2007 Establishing the Real Estate Regulatory Agency;
Law No. (26) of 2007 Regulating the Relationship between Landlords and
Tenants in the Emirate of Dubai; and
Decree No. (2) of 1993 Establishing a Special Tribunal for the Settlement of
Disputes between Landlords and Tenants and its amendments,
Do hereby issue this Law.

Article (1)
Articles (2), (3), (4), (9), (13), (14), (15), (25), (26), (29), and (36) of Law No.
(26) of 2007 Regulating the Relationship between Landlords and Tenants in
the Emirate of Dubai will be superseded by the following provisions:

Article (2)
In implementing the provisions of this Law, the following words and expressions
will have the meaning indicated opposite each of them, unless the context
implies otherwise:
© 2014 The Government of Dubai Legal Affairs Department
(1) Every effort has been made to produce an accurate and complete English version of this
legislation. However, for the purpose of its interpretation and application, reference must be made to
the original Arabic text. In case of confict the Arabic text will prevail.

22

Tenancy Regulating Legislations

Emirate:

The Emirate of Dubai.

Tribunal:

The Special Tribunal for the Settlement of Disputes between
Landlords and Tenants.

RERA:

The Real Estate Regulatory Agency.

Real Property:

Immovable property and everything affxed or annexed to
it, and which is leased out for purposes of accommodation
or conducting a business activity, trade, profession, or any
other lawful activity.

Tenancy Contract: A contract by virtue of which the Landlord is bound to
allow the Tenant use of the Real Property for a specifc
purpose, over a specifc term, and in return for a
specifc consideration.
Landlord:

A natural or legal person who is entitled by law or agreement
to dispose of Real Property. This also includes a person
to whom ownership of the Real Property is transferred
during the term of a Tenancy Contract, an agent or legal
representative of the Landlord, or a Tenant who is permitted
by the Landlord to sub-let the Real Property.

Tenant:

A natural or legal person who is entitled use of the Real
Property by virtue of a Tenancy Contract, or any person to
whom the tenancy is legally transferred from the Tenant.

Sub-Tenant:

A natural or legal person who is entitled use of the Real
Property or any part thereof by virtue of a Tenancy Contract
entered into with the Tenant.

Rent:

The specifed consideration which the Tenant must be
bound to pay by virtue of the Tenancy Contract.

Notice:

A written notifcation sent by either party to the Lease
Contract to the other through the Notary Public, or delivered
by registered post, by hand, or by any other technological
means approved by law.
23

Tenancy Guide

Article (3)
The provisions of this Law will apply to lands and Real Property leased out in
the Emirate excluding Real Property provided free of Rent by natural or legal
persons to accommodate their employees.

Article (4)
1. The contractual relationship between Landlord and Tenant will be regulated
by a Tenancy Contract detailing, in a manner allowing no room for uncertainty,
a description of the leased Real Property, the purpose of the tenancy, the
term of the Tenancy Contract, the Rent and payment method, and the name
of the owner of the Real Property, if the Landlord is not the owner.
2. All Tenancy Contracts or any amendments to such Tenancy Contracts
related to Real Property which are subject to the provisions of this Law will
be registered with RERA.

Article (9)
1. The Landlord and Tenant must specify the Rent in the Tenancy Contract.
Should the parties omit or fail to specify the agreed Rent, the Rent must be
the same as that of similar Real Property.
2. The Tribunal will determine the Rent of similar Real Property taking into
account the criteria determining the percentage of Rent increase set by
RERA, the overall economic situation in the Emirate, the condition of the
Real Property, and the average Rent of similar Real Property in similar
Real Property markets within the same area and in accordance with any
applicable legislation in the Emirate concerning Real Property Rent, or any
other factors which the Tribunal deems appropriate.

Article (13)
For the purposes of renewing the Tenancy Contract, the Landlord and Tenant
may, prior to the expiry of the Tenancy Contract, amend any of the terms of
the Tenancy Contract or review the Rent, whether increasing or decreasing it.
Should the Landlord and Tenant fail to reach an agreement, then the Tribunal
may determine the fair Rent, taking into account the criteria stipulated in Article
(9) of this Law.
24

Tenancy Regulating Legislations

Article (14)
Unless otherwise agreed by the parties, if either party to the Tenancy Contract
wishes to amend any of its terms in accordance with Article (13) of this Law,
that party must notify the other party of same no less than ninety (90) days prior
to the date on which the Tenancy Contract expires.

Article (15)
The Landlord will be bound to hand over the Real Property in good condition,
which allows the Tenant full use as stated in the Tenancy Contract. However,
the parties may agree upon renting an unfnished Real Property provided
that the Tenant agrees to complete the construction of the Real Property in a
manner to render it suitable for use as intended. The identity of the party who
will incur the costs of completing the construction will be determined in the
Tenancy Contract.

Article (25)
The Landlord may seek eviction of the Tenant from the Real Property prior to
the expiry of the term of the Tenancy only in the following cases:
1. where the Tenant fails to pay the Rent or any part thereof within thirty (30)
days after the date a Notice to pay is given to the Tenant by the Landlord
unless otherwise agreed by the parties;
a. where the Tenant sub-lets the Real Property or any part thereof without
obtaining the Landlord’s approval in writing. In this case, the eviction will
apply to both the Tenant and Sub-Tenant. However, the Sub-Tenant’s right
to claim a compensation from the Tenant will be preserved;
b. where the Tenant uses the Real Property or allows others to use it for any
illegal purpose or for a purpose which breaches public order or morals;
c. where the Tenant of commercial Real Property leaves the Real Property
unoccupied for no valid reason for thirty (30) consecutive days or ninety
(90) non-consecutive days within the same year, unless agreed otherwise
by both parties;
d. where the Tenant makes a change to the Real Property that renders it
unsafe in a manner that makes it impossible to restore the Real Property
25

Tenancy Guide

to its original state, or damages the Real Property willfully or through gross
negligence, by failing to exercise due diligence, or by allowing others to
cause such damage;
e. where the Tenant uses the Real Property for a purpose other than that
for which the Real Property was leased, or uses the Real Property in a
manner that violates planning, construction, and use-of-land regulations
in force in the Emirate;
f. where the Real Property is condemned, provided that the Landlord
must prove this by a technical report issued by or attested to by
Dubai Municipality;
g. where the Tenant fails to observe any obligation imposed on him by this
Law or any of the terms of the Tenancy Contract within thirty (30) days
from the date a Notice to perform such obligation or term is served upon
him by the Landlord; or
h. where competent Government entities requires demolition or
reconstruction of the Real Property as per urban development
requirements in the Emirate.
For the purposes of paragraph (1) of this Article, the Landlord will give Notice
to the Tenant through a Notary Public or registered post.
2. Upon expiry of the Tenancy Contract the Landlord may request eviction of
the Tenant from the Real Property only in any of the following cases:
a. where the owner of the Real Property wishes to demolish the Real Property
to reconstruct it, or to add any new constructions that will prevent the
Tenant from using the Real Property, provided that the required permits
are obtained from the competent entities;
b. where the Real Property is in a condition that requires restoration or
comprehensive maintenance that cannot be carried out in the presence
of the Tenant in the Real Property, provided that the condition of the Real
Property is verifed by a technical report issued by or attested to by
Dubai Municipality;
c. where the owner of the Real Property wishes to take possession of it for his
personal use or for use by any of his frst-degree relatives, provided that
26

Tenancy Regulating Legislations

the owner proves that he does not own another Real Property appropriate
for such purpose; or
d. where the owner of the Real Property wishes to sell the leased Real Property.
For the purposes of paragraph (2) of this Article, the Landlord must notify
the Tenant of the eviction reasons twelve (12) months prior to the date set
for eviction, provided that this notice is given through a Notary Public or
registered post.

Article (26)
If the Tribunal awards the Landlord possession of the Real Property for his
personal use or for use by any of his frst-degree relatives in accordance with
sub-paragraph (c) of paragraph (2) of Article (25) of this Law, the Landlord may
not rent the Real Property to a third party before the lapse of at least two (2)
years from the date of possession of the Real Property by the Landlord in case
of residential Real Property and three (3) years in case of non-residential Real
Property, unless the Tribunal, in its discretion, sets a shorter period. Otherwise,
the Tenant may request the Tribunal to award him a fair compensation.

Article (29)
1. The Tenant has the right of frst refusal to rent the Real Property after it has
been demolished and reconstructed or renovated and refurbished by the
Landlord, provided that the Rent is determined in accordance with the
provisions of Article (9) of this Law.
2. The Tenant must exercise the right of frst refusal referred to in the preceding
paragraph within a period not exceeding thirty (30) days from the date the
Tenant is notifed by the Landlord.

Article (36)
The Chairman of the Executive Council will issue the regulations, bylaws, and
resolutions required for the implementation of the provisions of this Law.
27

Tenancy Guide

Article (2)
This Law will be published in the Offcial Gazette and will come into force on
the day on which it is published.

Mohammed bin Rashid Al Maktoum
Ruler of Dubai
Issued in Dubai on 1 December 2008
Corresponding to 3 Thu al-Hijjah 1429 A.H.

28

Tenancy Regulating Legislations

Law No. (26) of 2007
Regulating the Relationship between Landlords and Tenants
in the Emirate of Dubai 3
We, Mohammed bin Rashid Al Maktoum, Ruler of Dubai,
After perusal of:
Federal Law No. (5) of 1985 Issuing the Civil Code of the United Arab Emirates
and its amendments;
Federal Law No. (10) of 1992 Issuing the Law of Evidence in Civil and
Commercial Transactions;
Decree No. (2) of 1993 Establishing a Special Tribunal for the Settlement of
Disputes between Landlords and Tenants; and
Law No. (16) of 2007 Establishing the Real Estate Regulatory Agency,
Do hereby issue this Law.

Title
Article (1)
This Law will be cited as “Law No. (26) of 2007 Regulating the Relationship
between Landlords and Tenants in the Emirate of Dubai “.
Defnitions and Scope of Application

Article (2)
In implementing the provisions of this Law, the following words and expressions
will have the meaning indicated opposite each of them, unless the context
implies otherwise:
Emirate:

The Emirate of Dubai.

RERA:

The Real Estate Regulatory Agency.

© 2014 The Government of Dubai Legal Affairs Department
(1) Every effort has been made to produce an accurate and complete English version of this
legislation. However, for the purpose of its interpretation and application, reference must be made to
the original Arabic text. In case of confict the Arabic text will prevail.

29

Tenancy Guide

Real Property:

Immovable property and everything affxed or annexed to
it and which is leased out for purposes of accommodation
or conducting a business activity, trade, profession, or any
other lawful activity.

Lease Contract:

A contract by virtue of which the Landlord is bound to
allow the Tenant use of the Real Property for a specifc
purpose, over a specifc term, and in return for a
specifc consideration.

Landlord:

A natural or legal person who is entitled by law or agreement
to dispose of Real Property. This also includes a person
to whom ownership of the Real Property is transferred
during the term of a Lease Contract, an agent or legal
representative of the Landlord, or a Tenant who is permitted
by the Landlord to sub-let the Real Property.

Tenant:

A natural or legal person who is entitled to use Real Property
by virtue of a Lease Contract, or any person to whom the
lease is legally transferred from the Tenant.

Sub-tenant:

A natural or legal person who is entitled use of the Real
Property or any part thereof by virtue of a Lease Contract
entered into with the Tenant.

Rent:

The specifed consideration which the Tenant will be bound
to pay by virtue of the Lease Contract.

Tribunal:

The Special Tribunal for the Settlement of Disputes between
Landlords and Tenants.

Notice:

A written notifcation sent by either party to the Lease
Contract to the other through the Notary Public, or delivered
by registered post, by hand, or by any other technological
means approved by law.

Article (3)
The provisions of this Law will apply to Real Property leased out in the Emirate,
including vacant and agricultural lands, but excluding hotel establishments
30

Tenancy Regulating Legislations

and Real Property provided by natural or legal persons as accommodation to
their employees at no charge.

Lease Contract
Article (4)
1. The contractual relationship between Landlord and Tenant will be regulated
by a written Lease Contract signed by both parties and detailing, in a manner
allowing no room for uncertainty, a description of the leased Real Property,
the purpose of the Lease Contract, the name of the owner, the number and
type of the land, and the area where the Real Property is located. It will also
determine the term of the Lease Contract, the Rent, and payment method.
2. All Lease Contracts related to Real Property which is subject to the
provisions of this Law and any amendments thereto will be registered with
RERA. Judicial authorities and Government departments, authorities, and
corporations may not consider any dispute or claim or otherwise take any
action relating to a Lease Contract unless such Contract is registered with
RERA in accordance with the relevant rules and regulations.

Term of Lease Contract
Article (5)
The term of a Lease Contract must be specifed. Where the term is not specifed
in the Lease Contract or where it is impossible to prove the alleged term, the
Lease Contract will be deemed valid for the period specifed for payment of
the Rent.

Article (6)
Where the term of a Lease Contract expires, but the Tenant continues to
occupy the Real Property without any objection by the Landlord, the Lease
Contract will be renewed for the same term or for a term of one year, whichever
is shorter, and under the same terms as the previous Lease Contract.
31

Tenancy Guide

Article (7)
Where a Lease Contract is valid, it may not be unilaterally terminated during
its term by the Landlord or the Tenant. It can only be terminated by mutual
consent or in accordance with the provisions of this Law.

Article (8)
The term of a sub-lease contract entered into between the Tenant and Subtenant will expire upon the expiry of the term of the Lease Contract entered
into between the Landlord and Tenant, unless the Landlord expressly agrees
to extend the term of the sub-lease contract.

The Rent
Article (9)
Landlord and Tenant must specify the Rent in the Lease Contract. In any event,
the Rent may not be increased nor may any of the terms of the Lease Contract
be amended before the lapse of two years as of the date when the original
contractual relationship was established.

Article (10)
RERA will have the authority to establish criteria relating to percentages of Rent
increase in the Emirate in line with the requirements of the prevailing economic
situation in the Emirate.

Article (11)
Unless otherwise agreed, the Rent will cover use of the Real Property amenities
such as swimming pools, playgrounds, gymnasiums, health clubs, car parks,
and other amenities.

Article (12)
The Tenant will pay the Landlord the Rent on the dates mutually agreed upon.
32

Tenancy Regulating Legislations

Where there is no agreement or where it is impossible to verify the payment
dates, the Rent must be annually paid in four (4) equal instalments to be paid
in advance.

Article (13)
1. Subject to the provisions of Article (9) of this Law and for the purposes of
renewing the Lease Contract, the Landlord and Tenant may review the Rent,
and if they do not reach an agreement and it is proved necessary to extend
the term of the Lease Contract, the Tribunal may decide on extending the
Lease Contract and determine the Rent based on the average Rent of similar
Real Property.
2. The Tribunal will determine the average rental value of similar Real Property
in accordance with the legislation adopting criteria and amount of Rent,
proposed by RERA, taking into account the condition of the Real Property
and the prevailing market rate of Rent of similar Real Property within the
same area.

Article (14)
Where either of the two parties to a Lease Contract do not wish to renew the
Lease Contract or wish to amend any of its terms, such party must notify the
other party of such intent no less than ninety (90) days before the date on
which the Lease Contract expires, unless otherwise agreed by the parties.

Landlord’s Obligations
Article (15)
The Landlord will be bound to hand over the Real Property in good condition,
which allows the Tenant full use stated in the Lease Contract.

Article (16)
Unless otherwise agreed by the parties, the Landlord will, during the term of
the Lease Contract, be responsible for the Real Property’ maintenance works
and for repairing any defect or damage that may affect the Tenant’s intended
use of the Real Property.
33

Tenancy Guide

Article (17)
The Landlord may not make to the Real Property or any of its amenities or
annexes any changes that would preclude the Tenant from full use of the Real
Property as intended. The Landlord will be responsible for such changes
whether made by him or any other person authorised by the Landlord. Further,
the Landlord will be responsible for any defect, damage, defciency, and wear
and tear occurring to the Real Property for reasons not attributable to the fault
of the Tenant.

Article (18)
The Landlord must provide the Tenant with the approvals required to be
submitted to the competent offcial entities in the Emirate whenever the
Tenant wishes to carry out decoration works or any other works that require
such approvals, provided that such works do not affect the structure of the
Real Property and that the Tenant has the offcial documents requesting
such approvals.

Tenant’s Obligations
Article (19)
The Tenant must pay the Rent on due dates and maintain the Real Property in
such a manner as an ordinary person would maintain his own property. Without
prejudice to the Tenant’s obligation to carry out the restorations that have been
agreed upon or which are customary for Tenants to undertake, the Tenant may
not make any changes or carry out any restoration or maintenance works to the
Real Property unless so permitted by the Landlord and after obtaining required
licences from the competent offcial entities.

Article (20)
When entering into a Lease Contract, the Landlord may obtain from the
Tenant a security deposit to ensure maintenance of the Real Property upon
the expiry of the Lease Contract, provided that the Landlord undertakes to
refund such deposit or remainder thereof to the Tenant upon the expiry of the
Lease Contract.
34

Tenancy Regulating Legislations

Article (21)
Upon the expiry of the term of the Lease Contract, the Tenant must surrender
possession of the Real Property to the Landlord in the same condition in which
the Tenant received it at the time of entering into the Lease Contract except
for ordinary wear and tear or for damage due to reasons beyond the Tenant’s
control. In the event of dispute between the two parties, the matter must be
referred to the Tribunal to issue an award in this regard.

Article (22)
Unless the Lease Contract states otherwise, the Tenant must pay all fees and
taxes due to Government entities and departments for use of the Real Property
as well as any fees or taxes prescribed for any sub-lease.

Article (23)
Unless otherwise agreed by the parties, upon vacating and surrendering
possession of the Real Property, the Tenant may not remove any leasehold
improvements made by the Tenant.

Article (24)
Unless otherwise agreed by the parties to the Lease Contract, the Tenant may
not assign the use of or sub-lease the Real Property to third parties unless
written consent of the Landlord is obtained.

Eviction Cases
Article (25)
1. The Landlord may seek eviction of the Tenant from the Real Property before
the expiry of the Lease Contract term in any of the following cases:
a. Where the Tenant fails to pay the Rent or any part thereof within thirty
(30) days from the date of service of Notice to pay on the Tenant by
the Landlord;
b. Where the Tenant sub-lets the Real Property or any part thereof without
35

Tenancy Guide

obtaining the Landlord’s written approval. In this case, the eviction will
apply to the Sub-tenant, who will have the right to claim compensation
from the Tenant;
c. Where the Tenant uses the Real Property or allows others to use it for any
illegal purpose or for a purpose which breaches public order or morals;
d. Where the Tenant makes a change to the Real Property that endangers its
safety in a manner that makes it impossible to restore the Real Property to
its original state, or damages the Real Property wilfully, or through gross
negligence, by failing to exercise due diligence, or by allowing others to
cause such damage;
e. Where the Tenant uses the Real Property for a purpose other than that for
which the Real Property was let, or otherwise uses such Real Property in
a manner that violates planning, construction, and use-of-land regulations
in force in the Emirate;
f. Where the Real Property is condemned, provided that the Landlord
proves this by a technical report attested to by Dubai Municipality, or
g. Where the Tenant fails to observe any obligation imposed on him by this
Law or any of the Lease Contract terms within thirty (30) days from the
date a Notice to perform such obligation or term is served upon him by
the Landlord.
2. Upon expiry of the Lease Contract, the Landlord may seek eviction of the
Tenant from the Real Property if:
a. a competent Government entity requires demolition and reconstruction of
the Real Property as per urban development requirements in the Emirate;
b. the Real Property is in a condition that requires full renovation or
comprehensive maintenance that cannot be carried out in the presence
of the Tenant in the Real Property, provided that the condition of the
Real Property is verifed by virtue of a technical report attested to by
Dubai Municipality;
c. the Landlord wishes to demolish the Real Property to reconstruct it or add
any new constructions that will prevent the Tenant from using the Real
Property, provided that the Landlord obtains the required permits from the
36

Tenancy Regulating Legislations

competent entities; or
d. the Landlord wishes to repossess the Real Property for use by him
personally or by any of his frst-degree relatives.
However, for each of the above-mentioned four cases, the Landlord must notify
the Tenant of the eviction reasons at least ninety (90) days prior to the expiry
of the Lease Contract.

Article (26)
If, upon expiry of the Lease Contract, the Landlord requests possession of the
Real Property for his personal use or for use by any of his frst-degree relatives,
and the Tribunal awards him such possession, the Landlord may not rent the
Real Property to a third party before the lapse of at least one (1) calendar year
from the date of repossessi... [truncated]',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/mijnfixi/tenancyguideen.pdf',
  NOW(),
  NOW()
);

-- Document 17: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.



















-

-

.

.

.
.

.
.

.

.

.

.

.
.
.
.
.
.

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/ubuhzcsm/tr01-survey-manual-sign_2022-04-26.pdf',
  NOW(),
  NOW()
);

-- Document 18: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '‫دليل دبي‬
‫للتقييم العقاري‬
‫اإلصدار األول ‪2025 -‬‬

‫‪2‬‬

‫دليل دبي للتقييم العقاري‬

‫دليل دبي‬
‫للتقييم العقاري‬

‫‪3‬‬

‫المحتويات‬

‫‪4‬‬

‫كلمة مدير عام دائرة األراضي واألمالك‬

‫‪5‬‬

‫المقدمة‬

‫‪6‬‬

‫الفصل األول‪ :‬اإلطار القانوين والتنظيمي للتقييم العقاري يف إمارة ديب‬

‫‪8‬‬

‫الفصل الثاني‪ :‬أسس ومبادئ التقييم العقاري‬

‫‪11‬‬

‫الفصل الثالث‪ :‬نطاق العمل‬

‫‪14‬‬

‫الفصل الرابع‪ :‬منهجيات وأساليب التقييم العقاري‬

‫‪17‬‬

‫الفصل الخامس‪ :‬التطبيقات العملية ودراسات الحالة‬

‫‪18‬‬

‫الفصل السادس‪ :‬الجودة واالعتماد المهني‬

‫‪21‬‬

‫الفصل السابع‪ :‬إعادة النظر يف التقييم العقاري‬

‫‪23‬‬

‫الفصل الثامن‪ :‬التقييم الذكي واالبتكار يف التقييم العقاري‬

‫‪25‬‬

‫الخاتمة‬

‫‪26‬‬

‫الملحق األول‪ :‬التشريعات والقرارات‬

‫‪27‬‬

‫الملحق الثاني‪ :‬المصطلحات والتعاريف‬

‫‪27‬‬

‫ميثاق شرف ممارسة المهن العقارية‬

‫‪29‬‬

‫دليل دبي للتقييم العقاري‬

‫كلمة مدير عام‬

‫دائرة األراضي واألمالك‬

‫عمر بوشهاب‬

‫يش ـّك ّل القط ــاع العق ــاري ركي ــزة أساس ــية‬
‫يف مس ــيرة التنمي ــة االقتصادي ــة إلم ــارة‬
‫ديب‪ ،‬وع ـ ا‬
‫ـاماًل محور ًّيً ــا يف اس ــتراتيجيتها‬
‫نح ــو ترس ــيخ مكانته ــا وجهـ ـًةً عالم ّّي ــة‬
‫لالس ــتثمار واألعم ــال‪.‬‬
‫وانطالًقً ــا م ــن ه ــذا ال ــدور الحي ــوي‪،‬‬
‫تواص ــل دائ ــرة األراض ــي واألمالك يف ديب‬
‫التزامه ــا بتعز ي ــز بيئ ــة تنظيمي ــة ش ــفافة‬
‫ومس ــتدامة‪ ،‬تدع ــم نم ــو الس ــوق و ُُت ّ‬
‫حّف ــز‬
‫الثقــة علــى المســتويين المحلــي والــدويل‪.‬‬
‫ويم ّّث ــل دلي ــل ديب للتقيي ــم العق ــاري‪،‬‬
‫ال ــذي ينس ــجم م ــع المعايي ــر الص ــادرة‬
‫ع ــن منظم ــة المعايي ــر الدولي ــة للتقيي ــم‬
‫(‪ )IVSC‬الت ــي نعت ــز بعضويتن ــا فيه ــا‪،‬‬
‫أحــد األدوات االســتراتيجية التــي أطلقتهــا‬

‫الدائ ــرة لتنظي ــم مهن ــة التقيي ــم‪ ،‬وتوحي ــد‬
‫إجراءاته ــا وف ــق معايي ــر مهني ــة متق ّّدم ــة‬
‫تتماش ــى م ــع أفض ــل الممارس ــات‬
‫العالمي ــة‪ ،‬م ــع مواءمته ــا لخصوصي ــة‬
‫س ــوق ديب واحتياجات ــه المتج ــددة‪.‬‬
‫ويعك ــس ه ــذا الدلي ــل حرصن ــا عل ــى‬
‫ترســيخ الشــفافية وتعز يــز جــودة القرارات‬
‫االس ــتثمارية يف القط ــاع‪.‬‬
‫نحــن ماضــون يف تطو يــر أدواتنــا ومبادراتنــا‬
‫بم ــا يوا ك ــب تطلع ــات المرحل ــة المقبل ــة‪،‬‬
‫وس ــنواصل تحدي ــث ه ــذا الدلي ــل لضم ــان‬
‫أعل ــى مس ــتويات الكف ــاءة والموثوقي ــة‪،‬‬
‫بم ــا يدع ــم مس ــتهدفات اس ــتراتيجية ديب‬
‫للقط ــاع العق ــاري ‪ ،2033‬و ُُيعـ ـّزّز م ــن‬
‫تنافس ــية اإلم ــارة عل ــى الس ــاحة العالمي ــة‪.‬‬

‫‪5‬‬

‫المقدمة‬
‫ي ــأيت دلي ــل ديب للتقيي ــم العق ــاري يف إط ــار الجه ــود المتواصل ــة الت ــي تبذله ــا‬
‫دائ ــرة األراض ــي واألم ــاك يف إم ــارة ديب لتعز ي ــز بيئ ــة عمل احترافي ــة تقوم على‬
‫أس ــس الج ــودة‪ ،‬والش ــفافية‪ ،‬والمصداقي ــة‪ .‬وق ــد ت ــم إعداد ه ــذا الدلي ــل ليكون‬
‫مرجع ــا مهن ًّي ــا موثو ًقا ُيسترش ــد به كافة المعنيين يف مج ــال التقييم والتثمين‬
‫ً‬
‫ـجاما م ــع تطلع ــات ديب نح ــو الر ي ــادة كوجهة اس ــتثمارية عالمية‬
‫العق ــاري‪ ،‬انس ـ ً‬
‫تتمت ــع بأعل ــى مس ــتويات التنافس ــية واالبتكار‪.‬‬

‫اعتماد دولي وتوافق محلي‬

‫حرص ــت الدائ ــرة عل ــى أن ُُيع ــد ه ــذا الدلي ــل وف ــق المعايي ــر الدولي ــة للتقيي ــم‬
‫العق ــاري الص ــادرة ع ــن منظم ــة المعايي ــر الدولي ــة للتقيي ــم (‪ ،)IVSC‬والت ــي‬
‫ُُتع ــد الدائ ــرة عضـ ـًوً ا معتم ــًدًا فيها‪ ،‬مم ــا ُُيعـ ـّزّز مواءمته مع أحدث الممارس ــات‬
‫ـإّن االلت ــزام بالقواني ــن واألنظم ــة المحلي ــة يف إم ــارة ديب‬
‫العالمي ــة‪ .‬م ــع ذل ــك‪ ،‬ف ـ ّ‬
‫ُُيعـ ـ ّّد أمـ ـًرًا جوهر ًّيً ــا ال غن ــى عن ــه عن ــد تطبيق أي م ــن المنهج ّّيات أو اإلرش ــادات‬
‫ال ــواردة يف ه ــذا الدلي ــل‪ ،‬وذل ــك لضم ــان توافق الممارس ــات مع اإلط ــار القانوين‬
‫والتنظيم ــي الس ــاري‪.‬‬

‫أهداف الدليل‬
‫حد لعملي ــات التقيي ــم والتثمين العقاري‬
‫•وض ــع إط ــار مرجع ــي واضح ومو ّ‬

‫يف إمارة ديب‪.‬‬
‫•دع ــم المقيمي ــن العقاريي ــن المعتمدين وتمكينهم م ــن أداء مهامهم وفق‬
‫أفضل المعايير‪.‬‬
‫•مس ــاعدة الجهات الحكومية وشبه الحكومية وش ــركات التثمين والتطوير‬
‫حدة وموثوقة‪.‬‬
‫على اعتماد منهجي ــات مو ّ‬
‫•إرشاد لجان التقييم والتظلّم نحو قرارات عادلة وشفافة‪.‬‬
‫•توعي ــة المتعاملي ــن م ــن أف ــراد ومؤسس ــات بأس ــس التقيي ــم العق ــاري‬
‫المعتم ــدة‪.‬‬

‫‪6‬‬

‫دليل دبي للتقييم العقاري‬

‫الفئات المستهدفة‬
‫•المقيمون العقاريون المعتمدون‬
‫•الجهات الحكومية وشبه الحكومية‬
‫•شركات التثمين والتطوير العقاري‬
‫•لجان التقييم والتظلّم‬
‫•المتعاملون من أفراد ومؤسسات‬
‫منهجية إعداد الدليل‬

‫ت ــم إع ــداد ه ــذا الدلي ــل اس ــتناًدًا إىل دراس ــة ش ــاملة لألنظم ــة والتشريع ــات‬
‫العقار ي ــة المعم ــول به ــا يف إم ــارة ديب‪ ،‬مع مراعاة المواءم ــة الدقيقة مع أحدث‬
‫اإلص ــدارات الص ــادرة ع ــن المعايي ــر الدولي ــة للتقييم العق ــاري (‪ .)IVSC‬وقد تم‬
‫االسترش ــاد بأفضل الممارسات العالمية وتكييفها بما يتناسب مع خصوصية‬
‫الس ــوق المحل ــي واحتياجاته‪ ،‬لضمان مرجعية مهني ــة متكاملة ُُتراعي البعدين‬
‫ال ــدويل والمحلي‪.‬‬

‫النتيجة‬

‫يم ّّث ــل ه ــذا الدلي ــل خط ــوة جوهر ي ــة نحو ترس ــيخ مب ــادئ الش ــفافية والثقة يف‬
‫س ــوق العق ــارات ب ــديب‪ ،‬كم ــا يشـ ـّك ّل أداة عملية داعم ــة ُُتمكن جمي ــع األطراف‬
‫المعني ــة م ــن تطبي ــق منهجي ــات تقيي ــم دقيق ــة ومعتم ــدة‪ ،‬ضمن إط ــار قانوين‬
‫وتنظيم ــي متكام ــل يعك ــس التوجه ــات التطوير ي ــة لإلمارة‪.‬‬

‫‪7‬‬

‫الفصل األول‬
‫اإلطار القانوني والتنظيمي‬
‫للتقييم العقاري في إمارة دبي‬
‫يشـ ـّك ّل اإلط ــار القان ــوين والتنظيم ــي حج ــر األس ــاس يف ممارس ــات التقيي ــم العق ــاري‬
‫داخ ــل إم ــارة ديب‪.‬‬
‫فالتقييم العقاري ال ُُيع ّّد مج ّّرد عملية فن ّّية لحس ــاب القيمة الس ــوق ّّية للعقار‪ ،‬بل هو‬
‫عملي ــة مهني ــة وإج ــراء قانوين وتنظيمي يخض ــع لمجموعة من التشريع ــات واألنظمة‬
‫التي تهدف إىل ضمان النزاهة والش ــفافية يف الس ــوق العقاري‪.‬‬

‫المرجعية القانونية المحلية‪:‬‬

‫تس ــتند عمليات التقييم العقاري يف ديب إىل منظومة متكاملة من القوانين واألنظمة‬
‫الصادرة عن الجه ــات الحكومية‪ ،‬من أبرزها‪:‬‬
‫‪1.‬القانون رقم (‪ )7‬لسنة ‪ 2006‬بشأن التسجيل العقاري يف إمارة ديب‬
‫•يضع اإلطار األساسي لتسجيل التصرفات العقارية‪.‬‬
‫ينص على مبدأ المشروعية والشفافية يف المعامالت العقارية‪.‬‬
‫• ّ‬
‫• ُيعتب ــر المرجع األساس ــي لجميع عمليات التقيي ــم المرتبطة بنقل الملكية أو الرهن‬
‫أو غيره ــا من التصرفات‪.‬‬
‫‪2.‬ق ــرار المجل ــس التنفي ــذي رق ــم (‪ )37‬لس ــنة ‪ 2015‬بش ــأن تنظي ــم مزاول ــة مهن ــة‬
‫التقيي ــم العق ــاري يف إم ــارة ديب‬
‫•ق ــرار ّ‬
‫منظ ــم لمهن ــة التقييم العق ــاري يف إم ــارة ديب‪ ،‬محدّد الختصاصات مؤسس ــة‬
‫التنظي ــم العق ــاري وش ــروط وإج ــراءات ومدة القي ــد‪ ،‬وما يتعلّق بالمقي ــم المتد ّرب‬
‫وفت ــرة التدر ي ــب‪ ،‬فضـ ـاً ع ــن ش ــروط إص ــدار التصر ي ــح وم ّدت ــه وإج ــراءات إص ــداره‪،‬‬
‫والتزام ــات م ــزاويل مهن ــة التقيي ــم‪ ،‬والرس ــوم المس ــتوفاة نظي ــر إص ــدار التصر ي ــح‬

‫‪8‬‬

‫دليل دبي للتقييم العقاري‬

‫والقي ــد وس ــائر الخدم ــات الت ــي تقدّمه ــا مؤسس ــة التنظي ــم العقاري‪ ،‬ع ــاوة على‬
‫المخالف ــات والغرام ــات المرتبط ــة بمزاول ــة مهن ــة التقييم‪.‬‬
‫‪3.‬ق ــرار إداري رق ــم (‪ )67‬لس ــنة ‪ 2020‬بش ــأن تحدي ــد الش ــروط واإلج ــراءات الخاصة‬
‫بتنظي ــم مزاول ــة مهنة التقيي ــم العق ــاري يف إمارة ديب‬
‫•ق ــرار تنظيم ــي يب ّي ــن المؤه ــات العلمي ــة للقيد يف س ــجل المقيمين‪ ،‬والس ــجالت‬
‫المق َّيم‪.‬‬
‫والوثائ ــق المتعلق ــة بالعق ــار ُ‬
‫‪4.‬قانون رقم (‪ )4‬لسنة ‪ 2019‬بشأن مؤسسة التنظيم العقاري‬
‫•أن ــاط القان ــون بمؤسس ــة التنظي ــم العقاري ع ــدة اختصاصات‪ ،‬م ــن ضمنها تنظيم‬
‫وترخي ــص األنش ــطة العقار ي ــة‪ ،‬وقيد مزاويل األنش ــطة يف الس ــجالت المعـ ـدّة لديها‬
‫ّ‬
‫المنظمة‬
‫يف ه ــذا الش ــأن‪ ،‬وإصدار البطاقات التعريفية للعاملي ــن‪ ،‬واعتماد القواعد‬
‫لم ــزاويل األنش ــطة العقارية‪ ،‬ومن ضمنهم نش ــاط التقيي ــم العقاري‪.‬‬
‫‪5.‬قرار المجلس التنفيذي رقم (‪ )30‬لس ــنة ‪ 2013‬بش ــأن اعتماد الرس ــوم الخاصة‬
‫بدائ ــرة األراضي واألمالك‬
‫•ق ــرار يعتم ــد الرس ــوم الخاص ــة بدائ ــرة األراض ــي واألم ــاك‪ ،‬وأن َ ــاط بالدائ ــرة‪ ،‬لغاي ــات‬
‫احتس ــاب الرس ــوم المس ـ ّ‬
‫ـتحقة‪ ،‬القي ــام بم ــا يلي‪:‬‬
‫ّ‬
‫التحق ــق م ــن قيم ــة العق ــارات الت ــي تك ــون محـ ـاًّ للتص ــرف العق ــاري‪ ،‬تقدي ــر قيم‬
‫•‬
‫العق ــارات والتصرف ــات العقار ي ــة غي ــر مح ــددة القيم ــة‪ ،‬أو الت ــي يتب ّي ــن أن القيم ــة‬
‫أقل من القيمة السوقية‪ ،‬أو التي ُتقدّم بشأنها معلومات‬
‫الواردة يف عقد التصرف ّ‬
‫أو بيان ــات غي ــر صحيحة‪.‬‬

‫‪9‬‬

‫مالحظة هامة‬

‫عل ــى جمي ــع المقيمي ــن العقاريين وش ــركات التثمي ــن اإللمام به ــذه القوانين المحلية‬
‫عن ــد ممارس ــة مهامه ــم‪ ،‬وأي مخالفة له ــا قد تؤدي إىل إجراءات قانوني ــة أو إدارية بحق‬
‫المخالف‪.‬‬

‫االرتباط بالمعايير الدولية‬

‫عل ــى الرغ ــم من االلتزام الصارم بالقوانين المحلية‪ ،‬فإن إمارة ديب تحرص على مواءمة‬
‫ممارس ــات التقييم العقاري مع المعايير الدولية للتقييم (‪ )IVS‬الصادرة عن منظمة‬
‫المعايي ــر الدولي ــة للتقييم (‪ ،)IVSC‬والتي ُُتعد دائرة األراضي واألمالك عضًوً ا فيها‪.‬‬

‫هذا االرتباط يضمن‬
‫•تطبيق منهجيات تقييم معترف بها عالم ًّيا‪.‬‬
‫•تعزيز الثقة لدى المستثمرين المحليين والدوليين‪.‬‬
‫•رفع جودة وكفاءة تقارير التقييم الصادرة عن المقيمين العقاريين المعتمدين‪.‬‬
‫مسؤوليات المقيم العقاري في اإلطار القانوني‬

‫يلتزم المقيم العقاري المعتمد يف ديب بما يلي‪:‬‬
‫•العمل وفق التراخيص المعتمدة الصادرة عن دائرة األراضي واألمالك‪.‬‬
‫•التق ّيد بالمعايير الدولية والمحلية عند اختيار منهجية التقييم وإعداد التقرير‪.‬‬
‫•مدة صالحية التقييم (‪: )Validity of Valuation Reports‬‬
‫‪ً 1.‬‬
‫وفق ــا ألفض ــل الممارس ــات الدولي ــة ومعايي ــر ‪ ،IVS 2025‬تعتب ــر تقار ي ــر التقيي ــم‬
‫صالح ــة لم ــدة تت ــراوح بي ــن ‪ 3‬إىل ‪ 6‬أش ــهر م ــن تار ي ــخ اإلص ــدار‪ ،‬م ــا ل ــم يت ــم تحديد‬
‫م ــدة مختلف ــة ً‬
‫وفقا التفاق خاص مع العميل أو حس ــب تعليم ــات الجهة الرقابية‬
‫( مؤسس ــة التنظي ــم العقاري )‬
‫المقيم التنوي ــه صراحة إىل تاريخ صالحية التقرير يف صفحة الغالف‬
‫‪2.‬ويج ــب على ُ‬
‫أو ضمن الملخص التنفيذي‪.‬‬
‫•العقوبات العملية للمخالفات ‪:‬‬
‫‪1.‬تلت ــزم جمي ــع الجه ــات والمقيمي ــن المعتمدي ــن باالمتث ــال لألنظم ــة الص ــادرة عن‬
‫هيئ ــة التنظي ــم العق ــاري (‪ )RERA‬والمعايي ــر الدولي ــة يف ح ــال وج ــود أي مخالفة‪،‬‬
‫ُتطب ــق العقوب ــات التالي ــة بحس ــب جس ــامة المخالفة‪:‬‬
‫‪.‬أإيقاف مؤقت تعليق اعتماد المقيم لفترة زمنية محددة‪.‬‬
‫‪.‬بش ــطب دائ ــم إلغ ــاء االعتم ــاد المهن ــي يف حال ــة المخالف ــات الجس ــيمة أو التالعب‬
‫بالبيانات‪.‬‬
‫‪.‬جغرامات مالية فرض غرامات تتناسب مع حجم المخالفة ً‬
‫وفقا للوائح السارية‪.‬‬
‫‪2.‬كم ــا تمل ــك الجه ــة الرقابي ــة حق اإلحال ــة إىل الجه ــات القضائية المختص ــة يف حال‬
‫وج ــود مخالف ــات مؤث ــرة أو احتيالية‪.‬‬

‫‪10‬‬

‫دليل دبي للتقييم العقاري‬

‫الفصل الثاني‬
‫أسس ومبادئ التقييم العقاري‬

‫ُُيعـ ـ ّّد التقيي ــم العق ــاري عملي ــة منهج ّّي ــة ته ــدف إىل تحدي ــد القيم ــة الس ــوقية للعقار‬
‫يف وق ــت مع ّّي ــن ولغ ــرض محـ ـّدّد‪ .‬وال يمك ــن الوص ــول إىل تقيي ــم دقي ــق وموث ــوق إال‬
‫م ــن خالل االلت ــزام بأس ــس ومب ــادئ علمي ــة ومهني ــة معت ــرف به ــا دول ًًّي ــا‪ ،‬م ــع مراعاة‬
‫اإلط ــار القان ــوين والتنظيم ــي المحل ــي يف إم ــارة ديب‪.‬‬

‫‪ .1‬تعريفات أساسية‪:‬‬
‫القيمة السوقية‪:‬‬
‫القيم ــة المقـ ـّدّرة الت ــي يمك ــن أن يت ــم به ــا تب ــادل عق ــار بي ــن بائ ــع راغ ــب ومش ــتري‬
‫راغ ــب‪ ،‬يف معامل ــة عل ــى أس ــاس تجاري بحت‪ ،‬بعد تس ــويق مالئم ودون أي ضغوط‬
‫أو إ كراه‪.‬‬
‫القيمة االستثمارية‪:‬‬
‫القيم ــة الت ــي يحدده ــا مس ــتثمر مع ّّي ــن للعق ــار بن ــاًءً عل ــى متطلبات ــه االس ــتثمار ية‬
‫الخاص ــة‪.‬‬
‫القيمة العادلة‪:‬‬
‫قيم ــة متوازن ــة تأخ ــذ يف االعتب ــار الظ ــروف الحالي ــة للس ــوق‪ ،‬وغالًبً ــا ُُتس ــتخدم يف‬
‫التقار ي ــر المالي ــة‪.‬‬
‫قيمة التصفية‪:‬‬
‫القيم ــة المقـ ـّدّرة لعقار يف حال البيع السر يع بس ــبب ظروف اس ــتثنائية‪.‬‬

‫‪11‬‬

‫‪ .2‬المبادئ األساسية للتقييم العقاري‬

‫يس ــتند التقيي ــم العق ــاري إىل مجموعة من المب ــادئ العلمية‪ ،‬من أهمها‪:‬‬
‫مبدأ أعلى وأفضل اس ــتخدام (‪:)Highest and Best Use‬‬
‫العق ــار يج ــب أن ُُيقَّيَ ــم بناًءً على االس ــتخدام األمثل الذي يحقق أعل ــى قيمة ممكنة‬
‫ضم ــن اإلطار القانوين والمايل‪.‬‬
‫مبدأ االستبدال (‪:)Substitution‬‬
‫القيم ــة الس ــوقية للعق ــار ُُتحـ ـّدّد بن ــاًءً عل ــى تكلفة الحص ــول على عقار بدي ــل مماثل‬
‫م ــن حيث المنفع ــة والجودة‪.‬‬
‫مب ــدأ العرض والطلب (‪:)Supply and Demand‬‬
‫التغ ّّي ــرات يف توازن العرض والطلب تؤّثّر بش ــكل مباش ــر عل ــى القيمة العقار ية‪.‬‬
‫مبدأ التوازن (‪:)Balance‬‬
‫ّ‬
‫تتحّق ــق القيم ــة المثل ــى عندما يك ــون هناك توازن بين عناص ــر اإلنتاج العقاري‬
‫(األرض‪ ،‬رأس المال‪ ،‬اإلدارة‪ ،‬العمل)‪.‬‬
‫مبدأ التغ ّّير (‪:)Change‬‬
‫ّ‬
‫القيم ــة العقار ي ــة ليس ــت ثابت ــة‪ ،‬ب ــل تتأّث ــر بالتغ ّّي ــرات االقتصادي ــة والتشر يعية‬
‫واالجتماعية‪.‬‬

‫‪12‬‬

‫دليل دبي للتقييم العقاري‬

‫مبدأ المساهمة (‪:)Contribution‬‬
‫يت ــم احتس ــاب مس ــاهمة كل ج ــزء م ــن العق ــار يف القيم ــة الكلي ــة‪ ،‬مث ــل‬
‫اإلضاف ــات أو التحس ــينات‪.‬‬
‫مبدأ التوقع (‪)Anticipation‬‬
‫يعتم ــد ه ــذا المب ــدأ عل ــى فك ــرة أن قيم ــة العق ــار ترتب ــط بتوقع ــات المنافع‬
‫المس ــتقبلية الت ــي يمك ــن أن يحققه ــا‪.‬‬
‫يف س ــوق ديناميك ــي مث ــل ديب‪ ،‬ق ــد ترتف ــع قيم ــة العق ــارات يف المناط ــق‬
‫المحيط ــة بمش ــار يع البني ــة التحتي ــة الجدي ــدة أو المناط ــق االقتصادي ــة‬
‫الناش ــئة‪ ،‬بس ــبب التوق ــع بارتف ــاع الطل ــب يف المس ــتقبل‪.‬‬
‫مثال تطبيقي‪:‬‬
‫•ارتف ــاع قيم ــة األراض ــي المحيط ــة بمحط ــات المت ــرو الجدي ــدة قب ــل‬
‫افتتاحه ــا نتيج ــة توق ــع ز ي ــادة اإلقب ــال على الس ــكن واالس ــتثمار يف تلك‬
‫المنا ط ــق‪.‬‬

‫‪ .3‬العوامل المؤثرة على القيمة العقارية‬
‫•الموقع الجغرايف‪ :‬قرب العقار من الخدمات والمرافق الرئيس ــية‪.‬‬
‫•الحالة القانونية والتنظيمية‪ :‬وجود تراخيص س ــليمة وس ــجالت عقار ية‬
‫معتمدة‪.‬‬
‫•العمر اإلنش ــايئ والحالة الفنية‪ :‬جودة البناء والصيانة‪.‬‬
‫•العوام ــل االقتصادي ــة‪ :‬اتجاه ــات الس ــوق‪ ،‬أس ــعار الفائ ــدة‪ ،‬والسياس ــات‬
‫المالية‪.‬‬
‫•االس ــتخدام الح ــايل والمحتم ــل للعق ــار‪ :‬اس ــتخدام س ــكني‪ ،‬تج ــاري‪،‬‬
‫صناع ــي‪ ،‬أو مختل ــط‪.‬‬

‫‪ .4‬متطلبات مهنية للمقيم العقاري‬

‫ّ‬
‫يحّقق المقيم العق ــاري تقييًمً ا دقيًقً ا وموثوًقً ا‪ ،‬عليه‪:‬‬
‫لك ــي‬
‫•اإللم ــام بالقوانين المحلي ــة التي ُت ّ‬
‫نظم التصرفات العقار ية‪.‬‬
‫•االلتزام بالمعايير الدولية (‪ )IVS‬والممارس ــات المهنية األخالقية‪.‬‬
‫•االعتم ــاد على بيان ــات حديثة وموثوقة عند إعداد التقر ير‪.‬‬
‫•توثيق جميع االفتراضات واألس ــس التي بُني عليها التقييم‪.‬‬

‫‪ .5‬العالقة بين المبادئ والقوانين‬

‫ُُيعـ ـ ّّد الجم ــع بي ــن المب ــادئ العلمي ــة وااللت ــزام بالقواني ــن المحلي ــة الضمانة‬
‫األساس ــية لتحقي ــق تقيي ــم عق ــاري ع ــادل وموثوق‪.‬‬
‫فاألس ــس المذك ــورة يج ــب أن ُُتطَّبَ ــق دائًمً ــا ضم ــن اإلط ــار القان ــوين ال ــذي‬
‫حددت ــه دائ ــرة األراض ــي واألمالك يف ديب‪.‬‬
‫‪13‬‬

‫الفصل الثالث‬
‫نطاق العمل‬
‫ُُيحـ ـّدّد نط ــاق العم ــل يف التقيي ــم العق ــاري طبيع ــة العق ــار وحق ــوق الملكي ــة‬
‫المرتبط ــة به‪ ،‬وهو ما يؤثر بش ــكل مباش ــر على المنهج ّّي ــة واإلجراءات والبيانات‬
‫الت ــي يج ــب اعتمادها‪.‬‬

‫‪ .1‬أنواع الملكيات في دبي‬

‫تختل ــف الملكيات التي يتعام ــل معها المقيم العقاري‪ ،‬ومن أبرزها‪:‬‬

‫الملكي ــة التامة (ملك)‪:‬‬
‫ملكية كاملة للعقار تخضع للقوانين الس ــار ية‪.‬‬
‫منحة‪:‬‬
‫عقار ُُمِنِح من جهة حكومية لغرض س ــكني أو اس ــتثماري‪.‬‬
‫أصل منحة‪:‬‬
‫عقار منحة أصلي ــة محتفظة بحقوق معينة‪.‬‬
‫منح ــة تجارية تخض ــع لقانون التملك ‪:30%‬‬
‫عقار منحة تجار ية ُُيطبق عليه س ــقف تملك بنس ــبة ‪ 30%‬وفق اللوائح‪.‬‬
‫تملك أجانب‪:‬‬
‫عق ــار يندرج ضمن المناط ــق المفتوحة للتملك األجنبي‪.‬‬
‫ملك ضمن اس ــتثناءات‪:‬‬
‫عقار ُُيس ــمح بالتملك بموجب اس ــتثناءات صادرة عن الجهات المختصة‪.‬‬

‫‪14‬‬

‫دليل دبي للتقييم العقاري‬

‫ملك في مشاع‪:‬‬
‫ملكي ــة مش ــتركة لعق ــار بين عدة أش ــخاص‪ ،‬يمتلك كل منه ــم حصة غير مفرزة‬
‫(نس ــبة) م ــن كام ــل العق ــار‪ ،‬ويج ــب عل ــى المقي ــم العق ــاري توضي ــح الحص ــة‬
‫المش ــاعة عن ــد التقييم‪.‬‬
‫مل ــك حق منفعة (‪:)Usufruct‬‬
‫العق ــار ُُيمن ــح حق االنتفاع ب ــه لفترة زمنية محددة دون تمّلّك الرقبة‪.‬‬
‫إيجار طويل األجل‪:‬‬
‫•إيجار لمدة ‪ 25‬سنة‪.‬‬
‫•إيجار لمدة ‪ 99‬سنة‪.‬‬
‫•إيج ــار من العق ــارات الحكومية أو الخاصة وفق عقود موثقة‪.‬‬

‫‪ .2‬أنواع العقارات في دبي‬

‫تش ــمل العقارات التي تدخل ضم ــن نطاق التقييم العقاري ما يلي‪:‬‬

‫عقارات حق االنتفاع‪:‬‬
‫العق ــارات التي ُُيحّدّد فيها المقيم الفت ــرة الزمنية المتبقية لالنتفاع‪.‬‬
‫عقارات المس ــاطحة (‪:)Surface Rights‬‬
‫مباٍن أو إنش ــاءات لفترة زمنية محددة‬
‫العق ــارات الت ــي ُُيمن ــح فيها الحق بإقامة‬
‫ٍ‬
‫مع االلتزام بالش ــروط التعاقدية‪.‬‬

‫‪15‬‬

‫عقارات الفنادق‪:‬‬
‫تتطل ــب التقييم ــات فيه ــا تقر ي ــر مدق ــق حس ــابات آلخ ــر ثالث س ــنوات لتقدي ــر‬
‫العوائ ــد والدخ ــل التش ــغيلي‪.‬‬
‫العق ــارات المبنية على عقود إيجار س ــنوية‪:‬‬
‫مثل بعض مش ــار يع ش ــركة الوصل التي تعتمد على عقود إيجار ية س ــنوية‪.‬‬
‫العقارات التي تدفع نس ــبة من دخلها لجهة أو ش ــركة حكومية‪:‬‬
‫مث ــل العق ــارات التابع ــة لمناط ــق تيك ــوم‪ ،‬حيث ُُتدفع نس ــبة من الدخ ــل للجهة‬
‫المالكة أو المش ـ ّ‬
‫ـّغلة‪.‬‬
‫العقارات الخدمية‪:‬‬
‫ُُتعتب ــر األراض ــي الخدمي ــة م ــن أن ــواع األص ــول العقار ية الت ــي ُُتس ــتخدم لتقديم‬
‫خدم ــات عام ــة أو خاص ــة غي ــر ربحي ــة (محط ــات كهر ب ــاء‪ ،‬العي ــادات‪ ،‬الحدائ ــق‬
‫العامة)‪.‬‬
‫تختلف طر يقة تقييم هذه األراضي حس ــب الغرض منها ونوع المس ــتفيد‪:‬‬
‫•لالس ــتخدام الع ــام غي ــر الربح ــي (مث ــل الم ــدارس الحكومي ــة)‪ُ :‬يوص ــى‬
‫باس ــتخدام منه ــج التكلف ــة أو قيم ــة رمز ي ــة استرش ــادية‪.‬‬
‫•إذا كان ــت األرض غي ــر مطـ ـ ّورة و ُتمن ــح بموج ــب قواني ــن حكومي ــة‪ ،‬ف ُيراع ــى‬
‫تقييمه ــا بن ــا ًء عل ــى القي ــود والحق ــوق المقي ــدة المفروض ــة عليه ــا‪.‬‬
‫•عند عدم تو ّفر بيانات مرجعية مباش ــرة‪ُ ،‬ي ّ‬
‫فضل استش ــارة لجنة التقييم‪.‬‬
‫العق ــارات الغير مطوره‪:‬‬
‫ُُتعـ ـ ّّد األراض ــي غير المط ّّورة من أهم أنواع األصول العقار ية‪.‬‬
‫•يت ــم تقييمها بنا ًء على موقعها واس ــتخداماتها المحتملة‪.‬‬
‫•تختل ــف منهجي ــة التقيي ــم حس ــب الوض ــع الح ــايل ل ــأرض والغ ــرض م ــن‬
‫التقيي ــم‪.‬‬
‫أهمية إدراج ه ــذه األنواع في نطاق العمل‬
‫•توجي ــه المقي ــم إىل البيان ــات اإلضافي ــة الواج ــب الحص ــول عليه ــا (مثل مدة‬
‫االنتف ــاع أو التقار ي ــر المالية)‪.‬‬
‫•ضم ــان تطبيق المنهجية المناس ــبة لكل نوع ملكية أو عقار‪.‬‬
‫•التأ ك ــد من التوافق مع القوانين المحلي ــة والتعاميم التنظيمية‪.‬‬
‫•توثي ــق ه ــذه التفاصي ــل بوض ــوح داخ ــل تقر ي ــر التقيي ــم لتج ّن ــب أي نزاعات‬
‫مستقبلية ‪.‬‬

‫‪16‬‬

‫دليل دبي للتقييم العقاري‬

‫الفصل الرابع‬
‫منهجيات وأساليب التقييم العقاري‬
‫يه ــدف ه ــذا الفص ــل إىل اس ــتعراض منهجي ــات وأس ــاليب التقيي ــم العق ــاري‬
‫المعتم ــدة دول ًًّي ــا ووف ــق األط ــر القانوني ــة المحلي ــة يف ديب‪ ،‬وذلك لضم ــان الدقة‬
‫والش ــفافية‪.‬‬
‫ا‬
‫أواًل‪ :‬منه ــج المقارنة (‪:)Market Comparison Approach‬‬
‫ـّل التقييم بعق ــارات مماثل ــة تم بيعه ــا حديًثً ا‪،‬‬
‫يعتم ــد عل ــى مقارن ــة العق ــار مح ـ ّ‬
‫م ــع تعديل األس ــعار حس ــب الفروقات‪.‬‬
‫ثانًيً ــا‪ :‬منهج الدخل (‪:)Income Approach‬‬
‫ّج ــرة والفنادق‪،‬‬
‫الُمـ ـ ِِد ّّرة للدخ ــل‪ ،‬مث ــل المب ــاين المؤ ّ‬
‫ُُيس ــتخدم لتقيي ــم العق ــارات ُ‬
‫ويعتم ــد عل ــى تقدي ــر ص ــايف الدخل التش ــغيلي و ََرس ــملته‪.‬‬
‫ثالًثً ــا‪ :‬منهج التكلفة (‪:)Cost Approach‬‬
‫ُُيس ــتخدم عندم ــا تك ــون البيان ــات الس ــوقية مح ــدودة‪ ،‬ويعتم ــد عل ــى حس ــاب‬
‫تكلف ــة إنش ــاء عق ــار مماث ــل وخص ــم االس ــتهالك‪.‬‬
‫منهجيات وأدوات مس ــاعدة‬
‫ُنُ ُُظ ــم المعلوم ــات الجغرافي ــة (‪ ،)GIS‬والنم ــاذج اإلحصائي ــة والتحليلي ــة الت ــي‬
‫تعـ ـّزّز د ّّق ــة التقييم‪.‬‬
‫اختيار المنهج األنس ــب‬
‫يت ــم بن ــاًءً على طبيعة العقار‪ ،‬والغ ــرض من التقييم‪ ،‬وتو ّّفر البيانات‪.‬‬

‫‪17‬‬

‫الفصل الخامس‬
‫التطبيقات العملية ودراسات الحالة‬
‫يه ــدف ه ــذا الفص ــل إىل توضي ــح كيفي ــة تطبي ــق المب ــادئ والمنهج ّّي ــات الت ــي‬
‫وردت يف الفص ــول الس ــابقة يف الس ــوق العق ــاري ب ــديب‪.‬‬
‫ّ‬
‫توّض ــح كيفي ــة إع ــداد‬
‫ُُيع ــرض م ــن خالل ــه خط ــوات عملي ــة ودراس ــات حال ــة‬
‫التقييم ــات العقار ي ــة وفًقً ــا للمعايي ــر الدولي ــة والتشر يع ــات المحلي ــة‪.‬‬

‫‪ .1‬اإلجراءات‬
‫ا‬
‫أواًل‪ :‬جمع البيانات‬
‫• الحصول على بيانات العقار من الس ــجالت الرس ــمية‪.‬‬
‫• مراجع ــة المخططات والوثائق القانونية‪.‬‬
‫ّ‬
‫التحّقق من بيانات الس ــوق والصفقات المماثلة‪.‬‬
‫•‬
‫ثانًيً ــا‪ :‬تحليل المعلومات‬
‫• تحلي ــل الموقع الجغ ــرايف والبنية التحتية المحيطة‪.‬‬
‫• دراس ــة حالة العقار الفنية والقانونية‪.‬‬
‫• مراجع ــة البيانات المالية (إن ُُوجدت)‪.‬‬
‫ثالًثً ا‪ :‬اختيار المنهجية المناس ــبة‬
‫• المقارن ــة‪ ،‬أو الدخ ــل‪ ،‬أو التكلفة حس ــب طبيعة العقار والغرض من التقييم‪.‬‬
‫• يمكن اس ــتخدام مز يج من أ كثر من منهج لتعز يز الدقة‪.‬‬
‫رابًعً ا‪ :‬إعداد الحسابات‬
‫ّ‬
‫• تطبي ــق المنهجي ــة المختارة بخطوات واضحة وموّثقة‪.‬‬
‫• االس ــتعانة ب ــاألدوات المس ــاندة مث ــل النم ــاذج اإلحصائية أو ُنُ ُُظ ــم المعلومات‬
‫الجغرافية‪.‬‬
‫‪18‬‬

‫دليل دبي للتقييم العقاري‬

‫خامًسً ــا‪ :‬إعداد التقرير النهائي‬
‫• تضمي ــن جميع البيانات والتحليالت والمنهجيات الحس ــابية‪.‬‬
‫• االلت ــزام بالصياغة الرس ــمية المتوافقة مع متطلبات دائرة األراضي واألمالك‪.‬‬

‫‪ .2‬إعادة النظر في التقييم العقاري‬

‫ق ــد تط ــرأ يف بع ــض الح ــاالت مس ــتجّدّات أو ُُيق ــَّدَم اعت ــراض م ــن أح ــد األطراف‬
‫ذات العالق ــة‪ ،‬ويف ه ــذه الح ــاالت تب ــرز أهمية وجود آلية واضح ــة إلعادة النظر يف‬
‫التقيي ــم‪ ،‬بم ــا يضم ــن مراجع ــة التقر ير والتأ ّك ّ ــد من د ّّقته ومالءمت ــه للمعطيات‬
‫الجديدة‪.‬‬

‫‪ .3‬مالحظة حول إعادة النظر‬

‫إذا ُُوج ــدت اعتراض ــات أو مس ــتجّدّات تؤّثّ ــر يف نتيج ــة التقيي ــم‪ ،‬ف ُُيرج ــى الرجوع‬
‫المفّصل ــة يف الفص ــل الس ــابع‪ :‬إع ــادة النظر يف التقيي ــم العقاري‪،‬‬
‫إىل اإلج ــراءات‬
‫ّ‬
‫حي ــث ت ــم توضي ــح الخط ــوات والضواب ــط المعتمدة له ــذه العملية‪.‬‬

‫‪19‬‬

‫‪ .4‬دراسات حالة تطبيقية‬
‫الحالة األولى‪ :‬تقييم عقار س ــكني‬
‫•جمع بيانات عن ش ــقق مماثلة أو فلل‪.‬‬
‫•استخدام منهج المقارنة‪.‬‬
‫•إعداد تقر ير تفصيلي يوضح األس ــس الحسابية‪.‬‬
‫الحال ــة الثاني ــة‪ :‬تقييم عقار فندقي‬
‫•مراجعة بيانات مالية لثالث س ــنوات سابقة‪.‬‬
‫•تطبيق منهج الدخل مع مراعاة نس ــبة اإلش ــغال واإليرادات التشغيلية‪.‬‬
‫•إعداد تقر ير يعرض القيمة االس ــتثمار ية بد ّقة‪.‬‬
‫•التأكد من المصروفات بش ــكل دقيق ألنها ُتخصم من الدخل‪.‬‬
‫الحال ــة الثالث ــة‪ :‬إعادة النظر في تقييم مس ــتودع صناعي‬
‫تم ــت‬
‫•بع ــد اعت ــراض المال ــك وتقدي ــم مس ــتندات جدي ــدة ع ــن تحس ــينات ّ‬
‫بالعق ــار‪.‬‬
‫•إع ــادة التقييم بمنهج التكلفة مع األخذ بالتحس ــينات الجديدة‪.‬‬
‫•إص ــدار تقر ير معـ ـدّل واعتماده من اللجنة المختصة‪.‬‬
‫‪ .5‬دور التطبيق ــات العملية في تعز ي ــز جودة التقييم‬
‫•توحيد اإلجراءات المتبع ــة بين المقيمين العقار يين‪.‬‬
‫•رفع مس ــتوى الكفاءة المهنية وتطوير المهارات‪.‬‬
‫•تقليل النزاعات وتعز يز الثقة يف الس ــوق العقاري‪.‬‬

‫‪20‬‬

‫دليل دبي للتقييم العقاري‬

‫الفصل السادس‬
‫الجودة واالعتماد المهني‬
‫الج ــودة واالعتماد المهني ُُيم ّّثالن حجر األس ــاس يف مهنة التقييم العقاري‪.‬‬
‫إن الت ــزام المقي ــم العقاري بمعايير الجودة المعتم ــدة يعّزّز ثقة المتعاملين والجهات‬
‫الرقابي ــة‪ ،‬ويضم ــن تواف ــق التقارير مع األطر القانونية والتنظيمية يف إمارة ديب‪.‬‬

‫‪ .1‬معايير الجودة في التقييم العقاري‬
‫ّ‬
‫دّق ــة البيانات والمعلومات‪:‬‬
‫حة جميع البيانات المس ــتخدمة يف التقييم‪.‬‬
‫•التأ ك ــد من ص ّ‬
‫•مراجعة السجالت الرس ــمية وتوثيق مصادر المعلومات‪.‬‬
‫الوضوح‪:‬‬
‫•بي ــان المنهجية المس ــتخدمة بالتفصيل يف التقرير‪.‬‬
‫•توضيح االفتراض ــات والعوامل المؤثّرة على القيمة‪.‬‬
‫االلت ــزام بالقوانين المحلي ــة والمعايير الدولية‪:‬‬
‫•االلت ــزام بتعليمات دائ ــرة األراضي واألمالك والتعاميم الصادرة عنها‪.‬‬
‫•مراع ــاة المعايير الدولية للتقييم (‪.)IVS 2025‬‬
‫الحياد والشفافية‪:‬‬
‫•االبتع ــاد عن أي تضارب مصالح‪.‬‬
‫•اإلفص ــاح عن أي ظروف ق ــد تؤثّر على نتيجة التقييم‪.‬‬

‫‪ .2‬االعتماد المهني للمقيمين العقاريين‬
‫الحص ــول على الترخيص المهني‪:‬‬
‫•يج ــب عل ــى المقي ــم العق ــاري أن يحم ــل رخص ــة س ــارية ص ــادرة ع ــن الجه ــة‬
‫المختص ــة يف ديب‪.‬‬
‫ّ‬
‫‪21‬‬

‫التدريب والتأهيل المس ــتمر‪:‬‬
‫•حضور ال ــدورات والبرامج التدريبية المعتمدة‪.‬‬
‫االطالع المس ــتمر على المس ــتجدّات القانونية والتنظيمية‪.‬‬
‫• ّ‬
‫االلتزام بميث ــاق أخالقيات المهنة‪:‬‬
‫•المحافظة على سـ ـ ّر ية المعلومات‪.‬‬
‫•التصـ ـ ّرف بمهني ــة وموضوعية يف جميع مراحل العمل‪.‬‬

‫‪ .3‬إجراءات ضمان الجودة‬
‫المختص ــة بمراجع ــة تقار ي ــر التقيي ــم‬
‫•التدقي ــق ال ــدوري للتقار ي ــر‪ :‬تق ــوم الجه ــات‬
‫ّ‬
‫بانتظ ــام للتأ ك ّ ــد م ــن مطابقته ــا للمعايي ــر‪.‬‬
‫•المراجع ــات الميدانية‪ :‬زيارات ميدانية للتأ ك ّد من صحة البيانات المس ــتخدمة‪.‬‬
‫•نظ ــام ش ــكاوى وتظلّم ــات‪ :‬تمكي ــن المتعاملي ــن م ــن تقدي ــم أي اعتراض ــات عل ــى‬
‫نتائ ــج التقييم‪.‬‬
‫•اعتم ــاد التقييم ــات‪ :‬ال ُتقب ــل أي تقار ي ــر دون أن تك ــون ص ــادرة ع ــن مقيم معتمد‬
‫وملت ــزم بالمعايير‪.‬‬

‫‪ .4‬أثر الجودة واالعتماد المهني‬
‫•تعزيز ثقة المس ــتثمرين يف السوق العقاري‪.‬‬
‫•المس ــاهمة يف تحقيق الش ــفافية والعدالة بين جميع األطراف‪.‬‬
‫•دع ــم رؤية ديب يف أن تكون مركـ ـزًا عالم ًّيا للتقييم العقاري‪.‬‬
‫‪22‬‬

‫دليل دبي للتقييم العقاري‬

‫الفصل السابع‬
‫إعادة النظر في التقييم العقاري‬
‫• ُتع ّد إعادة النظر يف التقييم العقاري آلية تنظيمية مهمة تتيح مراجعة التقييمات‬
‫حة اإلجراءات‪.‬‬
‫الصادرة‪ ،‬بما يضمن العدالة والشفافية وص ّ‬
‫•و ُتس ــهم ه ــذه العملي ــة يف رف ــع ج ــودة الق ــرارات العقار ي ــة وتحقي ــق التواف ــق م ــع‬
‫القواني ــن والمعايي ــر‪.‬‬
‫•يح ـ ّـق للمتعاملي ــن تقدي ــم طل ــب إع ــادة النظ ــر خ ــال المـ ـدّة الزمنية الت ــي تحددها‬
‫األنظم ــة بع ــد ص ــدور التقييم‪.‬‬
‫ّ‬
‫• ُتعرض الطلبات على لجان التقييم والتظلم لدراستها وإصدار القرار المناسب‪.‬‬

‫‪ .1‬الحاالت التي تستدعي إعادة النظر‬
‫•ظهور بيانات أو مستندات جديدة تؤثّر على التقييم‪.‬‬
‫•ا كتشاف خطأ جوهري أو معلومات غير دقيقة يف التقرير‪.‬‬
‫•تغ ّير يف الوضع القانوين أو التنظيمي للعقار‪.‬‬
‫•اعتراض صاحب المصلحة‪.‬‬
‫‪ .2‬إجراءات إعادة النظر‬
‫تقديم الطلب‪:‬‬
‫ً‬
‫مرفقا بالمستندات المؤيّدة‪.‬‬
‫•يقدّم المتعامل طل ًبا رسم ًّيا عبر القنوات المعتمدة‪،‬‬
‫اإلحالة إلى لجنة التقييم‪:‬‬
‫•تقوم اللجنة بدراسة التقرير السابق‪ ،‬ومراجعة المعطيات الجديدة وتحليلها‪.‬‬
‫إصدار القرار النهائي‪:‬‬
‫إما تثبيت التقييم السابق أو تعديله بنا ًء على المعطيات الجديدة‪.‬‬
‫• ّ‬

‫‪23‬‬

‫‪ .3‬دور المقيم العقاري في إعادة النظر‬
‫•• مراجعة التقرير السابق وتحديثه بموضوعية وحياد‪.‬‬
‫‪ .4‬أهمية إعادة النظر في السوق العقاري‬
‫•ضمان حقوق جميع األطراف‪.‬‬
‫•تعزيز الثقة يف القرارات والتقييمات العقارية‪.‬‬
‫•تحسين جودة ود ّقة تقارير التقييم‪.‬‬
‫•دعم الشفافية والعدالة بما ينعكس إيجابًا على السوق العقاري يف إمارة ديب‪.‬‬

‫‪24‬‬

‫دليل دبي للتقييم العقاري‬

‫الفصل الثامن‬
‫التقييم الذكي واالبتكار في‬
‫التقييم العقاري‬
‫يش ــهد قطاع التقييم العقاري تطّوًّرًا متس ــارًعً ا مدفوًعً ا بالتقنيات الحديثة والتح ّّول الرقمي‪ .‬و ُُيع ّّد‬
‫التقيي ــم الذك ــي أح ــد أب ــرز مالمح هذا التطـ ـ ّّور‪ ،‬حيث ُُي ِ‬
‫وِّظف البيان ــات الضخمة وال ــذكاء االصطناعي‬
‫وُنُ ُُظ ــم المعلوم ــات الجغرافي ــة والمنصات الرقمية لتقدير القيم العقارية بس ــرعة ود ّّقة‪ ،‬بما يوا كب‬
‫متطلبات الس ــوق يف إمارة ديب‪.‬‬

‫‪ .1‬تعريف التقييم الذكي‬

‫التقييم الذكي هو عملية تقدير للقيمة العقارية تعتمد على‪:‬‬
‫المحدّثة واللحظية من سجالت البيع واإليجار والمعامالت العقارية‪.‬‬
‫•البيانات ُ‬
‫•النماذج اإلحصائية وخوارزميات التعلّم اآليل لتحليل االتجاهات وتو ّقع القيم‪.‬‬
‫•التكامل مع األنظمة والمنصات الرقمية التابعة للجهات الرسمية‪.‬‬
‫يه ــدف ه ــذا األس ــلوب إىل إنت ــاج تقار ي ــر تقيي ــم دقيقة يف وق ــت أقل مقارن ــة بالط ــرق التقليدية‪ ،‬مع‬
‫الحفاظ عل ــى الج ــودة والموثوقية‪.‬‬

‫‪ .2‬مكونات التقييم الذكي‬
‫•قواعد بيانات عقارية لحظية‪ُ :‬تمكن من الوصول إىل أحدث معلومات السوق‪.‬‬
‫•نُ ُظم المعلومات الجغرافية (‪ :)GIS‬لتحليل الموقع والبنية التحتية والمخططات‪.‬‬
‫•نماذج التقييم اآللية (‪ :)AVMs‬لتقدير القيمة باالعتماد على خوارزميات متقدّمة‪.‬‬
‫•المنصات الرقمية الحكومية‪ :‬مثل األنظمة المعتمدة لدى دائرة األراضي واألمالك‪.‬‬
‫‪ .3‬اإلشراف البشري ودور اللجان‬

‫عل ــى الرغ ــم م ــن اس ــتخدام ال ــذكاء االصطناع ــي والتقني ــات الرقمي ــة‪ ،‬ف ــإن التقييم الذك ــي ال ُُيعتمد‬
‫دون إش ــراف بش ــري مهني‪.‬‬
‫يق ــوم المقي ــم العق ــاري المعتم ــد بمراجع ــة النتائ ــج الص ــادرة ع ــن النم ــاذج الرقمي ــة والتأ ّك ّ ــد م ــن‬
‫توافقه ــا م ــع القواني ــن والمعايي ــر قب ــل اعتماده ــا رسـ ـمًيً ا‪.‬‬

‫‪25‬‬

‫ويف ح ــال ظه ــور اعتراض ــات أو مس ــتجّدّات عل ــى التقيي ــم‪ ،‬تت ــم إع ــادة النظ ــر م ــن خالل اللج ــان‬
‫المختّص ــة يف دائ ــرة األراض ــي واألمالك لضم ــان العدال ــة والش ــفافية‪.‬‬
‫ّ‬

‫‪ .4‬التوافق مع معايير التقييم الدولية (‪)IVS 2025‬‬

‫ال تذك ــر معايي ــر التقيي ــم الدولي ــة ‪ IVS 2025‬التقيي ــم الذك ــي كمعي ــار مس ــتقل‪ ،‬لكنه ــا تعت ــرف‬
‫باس ــتخدام النم ــاذج اآللي ــة واألدوات التقني ــة شريط ــة أن تك ــون تح ــت إش ــراف بش ــري‪ ،‬وذلك على‬
‫النح ــو اآليت‪:‬‬
‫•‪ :IVS 104‬يؤك ــد أهمي ــة االعتم ــاد عل ــى بيانات موثوق ــة وقابلة للرصد‪ ،‬وهو م ــا ُيحققه التقييم‬
‫الذكي‪.‬‬
‫•‪ :IVS 105‬يس ــمح باس ــتخدام نماذج التقييم اآللية (‪ )AVMs‬بش ــرط مراجعتها من قبل مقيم‬
‫مؤ ّهل‪.‬‬
‫•‪ :IVS 100‬يشدّد على ضرورة وجود ضوابط جودة ومراجعات داخلية ألي عملية تقييم‪.‬‬
‫•‪ُ :IVS 106‬يلزم المقيم بتوثيق المنهج ّيات والنماذج واالفتراضات لضمان الشفافية‪.‬‬

‫‪ .5‬العالقة مع األساليب التقليدية‬

‫مكّم ااًل لها‪،‬‬
‫التقيي ــم الذك ــي ال ُُيلغ ــي الط ــرق التقليدية مث ــل المقارنة أو الدخ ــل أو التكلفة‪ ،‬بل ُُيعـ ـ ّّد‬
‫ّ‬
‫حي ــث يوف ــر بيان ــات وتحل ــيالت إضافية ُُتعـ ـّزّز جودة التقييم وتدع ــم اتخاذ الق ــرارات بثقة أ كبر‪.‬‬

‫الخالصة‪:‬‬

‫التقيي ــم الذك ــي أداة حديث ــة داعمة لعمل المقيم العقاري‪ ،‬و ُُيس ــتخدم وفًقً ا لمتطلبات ‪IVS 2025‬‬
‫م ــع االلت ــزام باإلش ــراف البش ــري والرقابة من خالل اللجان المختصة عن ــد الحاجة إلعادة النظر‪.‬‬

‫الخاتمة‬

‫ي ــأيت إص ــدار دلي ــل ديب للتقيي ــم العق ــاري يف إطار س ــعي دائ ــرة األراضي واألمالك إىل ترس ــيخ‬
‫أفض ــل الممارس ــات يف مهن ــة التقييم العق ــاري‪ ،‬وتوحيد اإلجراءات والمعايي ــر بما يتوافق مع‬
‫القواني ــن المحلي ــة والمعايير الدولية‪.‬‬
‫لقد حرصنا من خالل هذا الدليل على تقديم إطار متكامل يغطي‪:‬‬
‫•األسس القانونية والتنظيمية‪.‬‬
‫•المنهج ّيات واألساليب المعتمدة‪.‬‬
‫•نطاق العمل وأنواع الملكيات والعقارات‪.‬‬
‫•التطبيقات العملية ودراسات الحالة‪.‬‬
‫•الجودة واالعتماد المهني وآليات إعادة النظر‪.‬‬
‫•إضافة إىل استعراض التقييم الذكي كاتجاه مستقبلي ُيعزّز الكفاءة والشفافية‪.‬‬
‫إنن ــا عل ــى ثق ــة ب ــأن ه ــذا الدلي ــل س ــيكون مرجًعً ــا عملًيً ــا للمقيمي ــن العقاريي ــن‪ ،‬والجه ــات‬
‫الحكومي ــة وش ــبه الحكومية‪ ،‬وش ــركات التثمي ــن والتطوير العقاري‪ ،‬كما سيس ــهم يف تمكين‬
‫جمي ــع األط ــراف م ــن اتخاذ قرارات مس ــتنيرة تعكس القيم الحقيقية للعق ــارات يف إمارة ديب‪.‬‬
‫ختاًمً ــا‪ :‬نؤك ــد الت ــزام دائ ــرة األراض ــي واألمالك بمواصل ــة تطوير ه ــذا الدلي ــل وموا كبته ألحدث‬
‫المعايي ــر واالبت ــكارات‪ ،‬دعًمً ــا لرؤ ي ــة ديب الطموح ــة يف أن تكون مرك ــًزًا عالم ًًّيا للتم ّّي ــز واالبتكار‬
‫يف القط ــاع العقاري‪.‬‬
‫‪26‬‬

‫دليل دبي للتقييم العقاري‬

‫المالحق‬
‫الملحق األول‪ :‬التشريعات والقرارات‬
‫قائم ــة بأه ــم القواني ــن واللوائ ــح والق ــرارات التنظيمي ــة ذات الصل ــة بالتقيي ــم‬
‫العق ــاري في دبي‪ ،‬مث ــل‪:‬‬
‫القانون رقم (‪ )7‬لسنة ‪.2006‬‬
‫قرار المجلس التنفيذي رقم (‪ )37‬لسنة ‪.2015‬‬
‫القرار اإلداري رقم (‪ )67‬لسنة ‪.2020‬‬
‫القانون رقم (‪ )4‬لسنة ‪ 2019‬بشأن مؤسسة التنظيم العقاري‪.‬‬
‫قرار المجلس التنفيذي رقم (‪ )30‬لسنة ‪.2013‬‬
‫التعاميم والقرارات الصادرة عن مؤسسة التنظيم العقاري (‪.)RERA‬‬
‫معايير التقييم الدولية السارية بتاريخ ‪ 31‬يناير ‪.2025‬‬

‫الملحق الثاني‪ :‬المصطلحات والتعاريف‬
‫•القيم ــة الس ــوقية‪ :‬التقدي ــر النق ــدي األكث ــر احتم ـااًلً لعق ــار يف تار ي ــخ التقيي ــم‪ ،‬بي ــن طرفي ــن‬
‫راغبي ــن يف البي ــع والش ــراء‪ ،‬بع ــد تس ــويق مالئ ــم‪ ،‬ودون أي ضغ ــوط خارجي ــة‪.‬‬
‫•القيمــة االســتثمارية‪ :‬القيمــة التــي ُيم ّثلهــا العقــار لمســتثمر مع ّيــن اســتنادًا إىل متطلباتــه‬
‫االســتثمارية الخاصــة‪.‬‬
‫•القيم ــة العادل ــة‪ :‬القيم ــة الت ــي يتف ــق عليه ــا طرف ــان مس ــتقالن يف معامل ــة تبادلي ــة‪ ،‬م ــع‬
‫المعرف ــة الكامل ــة بالوقائ ــع‪.‬‬
‫ـريعا يف ســوق غيــر مســتقر أو تحــت‬
‫•قيمــة التصفيــة‪ :‬القيمــة المقـدّرة عنــد بيــع العقــار سـ ً‬
‫ضغــط مــايل‪.‬‬
‫•الملكي ــة التام ــة (مل ــك)‪ :‬الح ــق الكام ــل يف تملّ ــك العق ــار والتصـ ـ ّرف ب ــه وف ــق القواني ــن‬
‫الس ــارية‪.‬‬
‫•أرض خدمية‪ :‬أرض مخصصة الستخدامات غير ربحية أو خدمية‪.‬‬
‫ـان دائم ــة‪ ،‬ول ــم يت ــم‬
‫•أرض غي ــر مطـ ـ ّورة‪ :‬ه ــي قط ــع أرض خالي ــة م ــن أي إنش ــاءات أو مب ـ ٍ‬
‫تجهيزهـ��ا بع�دــ بالبني�ةــ التحتيةـــ األساس ـ�ية مث ـ�ل الط���رق‪ ،‬الكهر ب�اــء‪ ،‬المي���اه‪ ،‬أو الصرـــف الصح ــي‪.‬‬
‫‪27‬‬

‫•منح ــة‪ :‬عق ــار ُيمن ــح من جهة حكومية لغرض س ــكني أو اس ــتثماري مع قيود مع ّينة‬
‫حس ــب نوع المنحة‪.‬‬
‫•أصل منحة‪ :‬عقار منحة أصلية محتفظة بحقوق خاصة أو استثناءات‪.‬‬
‫•منحة تجارية تخضع لقانون التملك ‪ :30%‬عقار منحة تجارية يحق تملّك نس ــبة‬
‫تصل إىل ‪ 30%‬منه وفق اللوائح المحلية‪.‬‬
‫•تمل ــك أجان ــب‪ :‬عق ــار يقع ضم ــن المناطق المفتوح ــة لتملّك األجان ــب وفق األنظمة‬
‫المعمول بها‪.‬‬
‫•مل ــك ضم ــن اس ــتثناءات‪ :‬عق ــار ُيس ــمح بتملّك ــه بموج ــب اس ــتثناءات ص ــادرة ع ــن‬
‫المختصة‪.‬‬
‫الجه ــات‬
‫ّ‬
‫•ح ــق ش ــخص فح ــق االنتفاع‪ :‬اس ــتعمال عقار واس ــتغالله لمدة زمنية مح ــددة دون‬
‫ملكية الرقبة‪.‬‬
‫•الملكية على الش ــيوع (ملك في مش ــاع)‪ :‬ملكية مشتركة لعقار بين عدة أشخاص‪،‬‬
‫ل منهم حصة غير مفرزة (نسبة) من كامل العقار‪.‬‬
‫يمتلك ك ٌّ‬
‫•اإليج ــار طوي ــل األجل‪ :‬عقد إيجار يمنح المس ــتأجر حق االنتفاع بالعقار لفترة طويلة‬
‫(مثل ‪ 25‬س ــنة أو ‪ 99‬سنة)‪.‬‬
‫مبان أو إنش ــاءات عل ــى أرض مملوكة‬
‫•المس ــاطحة‪ :‬عق ــد يمن ــح صاح ــب الحق إقامة‬
‫ٍ‬
‫للغير لفترة زمني ــة متّفق عليها‪.‬‬
‫•نم ــاذج التقيي ــم اآللي ــة (‪ :)AVMs‬خوارزميات تعتمد على البيانات الضخمة لتقدير‬
‫القيمة العقارية بشكل أوتوماتيكي‪.‬‬
‫•التقيي ــم الذك ــي‪ :‬أس ــلوب حدي ــث يس ــتخدم التقني ــات الرقمي ــة والبيان ــات الضخم ــة‬
‫وال ــذكاء االصطناع ــي يف تقدي ــر القي ــم العقار ي ــة‪ ،‬م ــع بق ــاء اإلش ــراف البش ــري‪.‬‬
‫•إع ــادة النظ ــر ـفـي التقيي ــم‪ :‬إجراء تنظيمي يس ــمح بمراجعة تقر ي ــر التقييم بنا ًء على‬
‫مختصة‪.‬‬
‫طل ــب ُمسـ ـ َّبب م ــن أحد األط ــراف‪ ،‬ويتم من خالل لج ــان‬
‫ّ‬
‫•دائ ــرة األراض ــي واألم ــاك – دبــي‪ :‬الجه ــة الحكومي ــة المعني ــة بتنظي ــم وتس ــجيل‬
‫العق ــارات وإص ــدار التقييم ــات واللوائ ــح ذات الصل ــة‪.‬‬
‫•مؤسس ــة التنظي ــم العق ــاري (‪ :)RERA‬الذراع التنظيمية لدائ ــرة األراضي واألمالك‪،‬‬
‫المس ــؤولة عن وضع األطر القانونية واإلش ــراف على ممارس ــات الس ــوق العقاري‪.‬‬
‫•نط ــاق العم ــل‪ :‬اإلط ــار الذي يحدّد طبيعة العقار ون ــوع الملكية والغرض من التقييم‬
‫والمنهج ّي ــات التي يجب اتباعها‪.‬‬
‫•منه ــج المقارن ــة‪ :‬طريق ــة لتقدير القيمة باالعتماد على أس ــعار معامالت مماثلة بعد‬
‫إج ــراء التعديالت الالزمة‪.‬‬
‫•منهج الدخل‪ :‬طريقة لتقدير القيمة بنا ًء على العوائد المتوقعة ورسملتها‪.‬‬
‫مخصوما‬
‫•منه ــج التكلف ــة‪ :‬طريق ــة لتقدير القيم ــة بنا ًء على تكلفة اس ــتبدال العق ــار‬
‫ً‬
‫منها االس ــتهالك‪.‬‬
‫•نُ ُظ ــم المعلوم ــات الجغرافي ــة (‪ :)GIS‬أدوات رقمي ــة لتحلي ــل الموق ــع الجغ ــرايف‬
‫والبيان ــات المكاني ــة للعق ــار‪.‬‬

‫‪28‬‬

‫دليل دبي للتقييم العقاري‬

‫ميثاق شرف ممارسة‬
‫المهن العقارية‬

‫‪29‬‬

‫” نح ــن الش ــركات العقار ي ــة المرخ ــص له ــا بممارس ــة‬
‫نش ــاطها يف إم ــارة ديب‪ ،‬نتعه ــد بموجب ه ــذه الوثيقة أن‬
‫نتمس ــك‪ ،‬وذلك تعزيًزًا لـ “استراتيجية القطاع العقاري‬
‫‪:“2033‬‬

‫بع ــدم الس ــماح لألفراد ممن ليس ــوا من المس ــجلين أو‬
‫المص ــرح له ــم بالعم ــل عب ــر المكتب لدينا أو اس ــتغالل‬
‫اس ــم المكت ــب أو الترخي ــص الخ ــاص بنا‪ .‬ونح ــن ندرك‬
‫تماًمً ــا أن التالع ــب أو تقدي ــم المعلوم ــات أو البيان ــات‬
‫المزيف ــة عم ــًدًا أو اإلهم ــال أو أ ي ــة محاول ــة لعمل ذلك‪،‬‬
‫تع ــرض مرتكبيه ــا للمخالف ــة والتحقي ــق والتح ــري‪،‬‬
‫باإلضاف ــة إىل تعرضه ــم لإلج ــراءات العقابي ــة التأديبي ــة‬
‫الالزمة‪.‬‬

‫ثانيًاً – المعاملة المتسمة باالحترام‪:‬‬
‫نتعه ــد باحت ــرام األط ــراف المتعاق ــدة والعناي ــة واحت ــرام‬
‫خصوصيته ــم‪ ،‬ونرف ــض أي س ــلوك يقل ــل من ش ــأنهم‪.‬‬

‫سابعًاً – النزاهة‪:‬‬
‫نح ــن نس ــعى بجدي ــة يف تعاملن ــا م ــع كاف ــة األط ــراف‬
‫بااللت ــزام بالنزاه ــة والمس ــؤولية‪ ،‬ونتعه ــد أن تعتم ــد‬
‫جهودن ــا عل ــى المعلوم ــات الصادق ــة والواضح ــة‪ .‬كم ــا‬
‫نتعه ــد بالتعام ــل ب ــكل ش ــفافية م ــع كاف ــة األط ــراف‬
‫المعني ــة‪ ،‬بم ــا يف ذل ــك ش ــفافية األنظم ــة واإلج ــراءات‬
‫المتعلق ــة بالعملي ــات‪.‬‬

‫أوًالً – المعاملة العادلة‪:‬‬
‫نتعه ــد بمعامل ــة كاف ــة األط ــراف المتعاقدة بالمس ــاواة‪،‬‬
‫وأن نحق ــق الع ــدل فيم ــا بينه ــم ب ــدون إض ــرار أو تمييز‪.‬‬

‫ثالثًاً – الحفاظ على الخصوصية‪:‬‬
‫نتعه ــد بالحف ــاظ عل ــى خصوصي ــة األط ــراف وسر ي ــة‬
‫معلوماته ــم الخاصة وعدم الكش ــف عنها‪ ،‬س ــواء كانت‬
‫ه ــذه المعلوم ــات مرتبط ــة بالمش ــتري أو البائ ــع أو أي‬
‫ط ــرف مع ِِن ــي باألنش ــطة العقارية‪ .‬كما نتعه ــد بالحفاظ‬
‫عل ــى ه ــذه المعلومات وحمايتها م ــن وصول أي طرف‬
‫ق ــد يس ــتخدمها ألغ ــراض تعاقدية أو ش ــخصية‪ .‬إضافة‬
‫إىل ذلك‪ ،‬نتعهد باس ــتخدام أدوات التكنولوجيا الحديثة‬
‫واألنظم ــة بش ــفافية ومهني ــة تام ــة بم ــا يخ ــدم مصلحة‬
‫العمي ــل دون انته ــاك الخصوصية‪.‬‬
‫رابعًاً – الصدق واالستقامة‪:‬‬
‫نتعه ــد بتقدي ــم الخدم ــة لجمي ــع األط ــراف ب ــكل ص ــدق‬
‫وأمان ــة‪ ،‬وإطالعهم على كاف ــة الحقائق الخاصة بالعقار‪،‬‬
‫باإلضاف ــة إىل تنفي ــذ المطل ــوب ب ــكل صدق واس ــتقامة‬
‫دون اإلض ــرار بس ــمعة األنش ــطة العقارية‪.‬‬
‫خامسًاً – مراقبة الجودة‪:‬‬
‫نتعه ــد بتوفير خدمات عالية الج ــودة لألطراف المعنية‬
‫باألنش ــطة العقارية‪ ،‬والسعي بش ــكل متواصل لتطوير‬
‫ه ــذه الخدمات من حي ــث الدقة والجودة‪.‬‬
‫سادسًاً – مراعاة اللوائح والقوانين‪:‬‬
‫نتعه ــد بمراع ــاة اللوائ ــح والقواني ــن الس ــارية يف ال ــبالد‪،‬‬
‫م ــع احت ــرام االلتزام ــات ال ــواردة بالعق ــد‪ .‬كم ــا نتعه ــد‬

‫‪30‬‬

‫دليل دبي للتقييم العقاري‬

‫ثامنًاً – االلتزام تجاه المجتمع‪:‬‬
‫نتعه ــد بأن نك ــون أعضاء فاعلي ــن يف المجتمع‪ ،‬ونعمل‬
‫عل ــى احت ــرام القيم والمب ــادئ الخاص ــة بمجتمعنا‪ .‬كما‬
‫أنن ــا س ــنجتهد لدعم القطاع العق ــاري يف اإلمارة‪.‬‬
‫تاسعًاً – مراعاة مصالح األطراف المتعاقدة‪:‬‬
‫نتعه ــد بحماي ــة مصال ــح األط ــراف المتعاق ــدة‪ ،‬واالمتناع‬
‫ع ــن القي ــام بأّيّ ــة أفعال قد تضر بمصلح ــة أحد األطراف‪.‬‬
‫عاشرًاً – االلتزام بالحفاظ على المستندات والوثائق‪:‬‬
‫نتعه ــد بالحف ــاظ عل ــى كاف ــة الوثائ ــق والمس ــتندات‬
‫والس ــجالت واألش ــياء ذات الصل ــة بالمعامل ــة‪.‬‬
‫الحادي عش ــر – احت ــرام اللوائح واإلج ــراءات الخاصة‬
‫بدائ ــرة األراضي واألمالك‪:‬‬
‫نتعه ــد باحت ــرام كاف ــة اللوائ ــح واإلج ــراءات والتعليم ــات‬
‫الص ــادرة‪ ،‬باإلضاف ــة إىل االلتزام بقواعد الس ــلوك األخاليق‬
‫عن ــد ز ي ــارة الدائ ــرة‪ .‬كم ــا نتعه ــد بع ــدم تكوين أ ي ــة عالقة‬
‫خاصة مع موظفي الدائرة لتحقيق مكاس ــب شخصية‪،‬‬
‫ونق ــر باإلفص ــاح الكام ــل ع ــن أي تض ــارب محتم ــل يف‬
‫المصالح‪.‬‬

‫إعداد ومراجعة‬

‫إعداد‬
‫بدور المري‬
‫مشاركة ومراجعة‬
‫المستشار محمد بن حماد‬
‫الخبير العقاري محمد الجميري‬
‫الخبير العقاري اسماعيل الحمادي‬
‫المراجعة القانونية‬
‫محمد البرواني‬

‫‪31‬‬

‫‪32‬‬

‫دليل دبي للتقييم العقاري‬

‫دليل دبي‬
‫للتقييم العقاري‬

‫‪33‬‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/5iek4niq/emirates_book_valuation_standards_ar.pdf',
  NOW(),
  NOW()
);

-- Document 19: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '‫موجهات القواعد العامة‬

‫بشأن عقارات الملكية المشتركة‬
‫الفصل األول‪ :‬تعريفات وأحكام عامة‬
‫العبارات المستخدمة في القانون‬
‫المادة (‪)1‬‬

‫في هذه الالئحة‪ ،‬يكون للكلمات والعبارات المعرفة فيي الميادة ‪ 2‬مي القيانون ر ي ‪ 22‬لعيام ‪ 2002‬بشينن‬
‫عقييارات الملك يية المشييترإة فييي مييارة دبييي نفييم المعيياني المخصصيية لمييا فييي المييادة المييذإورة وتع ييي أييية‬
‫شارة لى إلمة "القانون" في هذه الالئحة القانون المذإور‪.‬‬
‫تعريفات‬
‫المادة (‪)2‬‬

‫يكييون للكلمييات والعبييارات التال يية المعيياني المخصصيية لمييا إمييا سلييي مييا ل ي ست ل ي‬

‫ي ا ال ي‬

‫ييال‬

‫ذلك‪:‬‬

‫المؤ سة‪ :‬مؤ سة الت ظ العقارى‬
‫مجموع المستحقات‪ :‬مجموع إافة المستحقات في نظام الملك ة المشترإة‪.‬‬
‫مدير الجمعية‪ :‬الشخ‬

‫المعي مدس اًر للجمع ة وفقاً لل ظام األ ا ي لجمع ة المالك‪.‬‬

‫اتفاقيةةة مةةدير الجمعيةةة‪ :‬اتفاق يية تعييي بمو جمييا مع يية الم يالك مييدسر الجمع يية وتفواييال بالصييالح ات‬
‫الالزمة‪.‬‬
‫العناصر المشتركة‪ :‬تع ي ف ما ستعلق بالع اصر المكونة للمج يى تليك األ ي ان مي المج يى (بميا فيي ذليك‬
‫الخدمات والمعدات والمرافق) التي تستخدم لع صر واحد أو أكثر م المكونات‪.‬‬
‫‪1‬‬

‫العنصر‪ :‬في حالة تقس أي مج ى ع طريق التقس الحجمي ليى ي ئي أو أكثير ويكيون مي ال ير‬
‫التقس ملك ة وا تخدام إل‬

‫للمج ى‪.‬‬

‫ن م ما بشيكل مسيتقل ميا إملك ية مشيترإة أو ملك ية تليك األ ي ان المكونية‬

‫مالك العنصر‪ :‬يع ي مالك أي ع صر‪.‬‬
‫قواعد المجمع‪ :‬هى القواعد المجي ة فى عالن نظام الملك ة المشترإة‪.‬‬
‫العميل‪ :‬أي شخ‬

‫طج عى أو عتبارى يشتري أو يعر‬

‫شران أية وحدة بإ تث ان الم ور‪.‬‬

‫المطور‪ :‬يع ي أي م ور رئ سي أو أي م ور فرعي‪.‬‬
‫التوجيهةةات‪ :‬تع ييي تو يمييات مسييض األ اراييي الصييادرة ع ي الييدائرة وفق ياً لالئحيية ر ي ( ) لس ي ة ‪2010‬‬
‫بشنن عداد مخ‬

‫ات مسض األرااي في مارة دبي‪.‬‬

‫بيان اإلفصاح‪ :‬يع ي ب ان‬

‫ي محرر بمو‬

‫المادة ‪.4‬‬

‫الوحدة المقترحة‪ :‬تع ي أية وحدة‪:‬‬
‫(أ)‬

‫في مشروع يد اإلنشيان أو مي المقتيرإ نشيا ه والتيي تصيبض ع يد اهنتميان مي ب ائميا موايوع‬
‫نظام ملك ة مشترإة؛ أو‬

‫(ب)‬

‫ف ييي مش ييروع مكتم ييل حي ييد لي ي تص ييدر ال ييدائرة ي ي د ملك يية للوح ييدة و ذا إ ييان ب ييائ الوح ييدة ه ييو‬
‫الم ور‪.‬‬
‫ي ة واحيدة لتورييد البويائ أو الخيدمات‪ ،‬بميا فيي‬

‫اتفاقية التوريةد‪ :‬اإلتفاق ية التيى تجيرم لميدة ه تقيل عي‬

‫ذلك المرافق الخدم ة لى أية مع ة مالك وان بشكل مباشر أو م‬

‫التقسةةيا الحجم ة ‪ :‬تقسي أي مج ييى و عيية األر‬

‫الل ب ان دارة المج ى‪.‬‬

‫التييي يقييام عليمييا لييى سييمي أو أكثيير و يحييدد إييل‬
‫‪2‬‬

‫ناً م المج ى‪.‬‬

‫س بال ريقة التي تحددها الدائرة ويشكل‬

‫نفاذ الالئحة‬
‫المادة (‪)3‬‬
‫‪-1‬‬

‫تصبض هذه الالئحة نافذة اعتبا اًر م تاريخ التوق‬

‫‪-2‬‬

‫يصدر المدسر العام للدائرة الق اررات والتعل مات وال ماذج الالزمة ل ت فيذ هذه الالئحة‪.‬‬

‫‪-3‬‬

‫مست د‬

‫يجوز للمدسر العام بمو‬

‫مم وحيية لييال أو للييدائرة بمو ي‬
‫الت ظ العقاري‪.‬‬

‫ي أن يفو‬

‫عليما م‬

‫جل الرئ م‪.‬‬

‫أية صالح ة أو ل ة أو وا‬

‫أو مممة‬

‫هييذه الالئحيية أو أييية هئحيية أ ييرى وفق ياً للقييانون لييى مؤ سيية‬

‫الفصل الثاني‬
‫ب انات اإلفصاإ وحماية المستملك‬
‫المادة (‪)4‬‬

‫(‪)1‬‬

‫جييل توق ي أي عميييل علييى عقييد لشيران وحييدة مقترحيية مي الم ييور‪ ،‬يجي‬

‫ب ييان‬

‫ييي لييى العميييل مو ي عل ييال بوا ي ة الم ييور أو الشييخ‬

‫علييى الم ييور تقييدي‬

‫المفييو‬

‫م ييال سجييي ف ييال‬

‫المعلومات التال ة‪:‬‬
‫(أ)‬
‫(‪)1‬‬

‫وصف المج ى أو المشروع الذي تشكل الوحدة المقترحة‬
‫اه يتخدامات المقصييودة لييضر‬

‫اييم المج ييى أو المشييروع (مثييال ا ييتخدامات ييك ة‪ ،‬شييقق‬

‫مفروشة أو ف دق ة ومحالت تجارية ومكات‬
‫(‪)2‬‬

‫ناً م ال‪ ،‬بما في ذلك‪:‬‬

‫أو متعددة اه تخدامات ‪ ....‬الخ)؛‬

‫المعلومات الخاصة بالمج ى أو المشروع أو أية معدات أو دمات متويم ة ف يال والتيي تسياه‬

‫في الت وير المع ز بيئ اً؛‬

‫‪3‬‬

‫(‪)3‬‬

‫أي معييدل ت ييوير مع ي ز بيئ ياً يسييري علييى المج ييى أو المشييروع‪ ،‬بمييا فييي ذلييك تفاصيييل هيئيية‬

‫(‪)4‬‬

‫أي ا تخدام اص يسري على الوحدة المقترحة (مثال شقة مفروشة أو ف دق ة بالخدمات)؛‬

‫(‪)5‬‬

‫الم ارفيق المو يودة عليى الم ياطق المشيترإة المقترحية والتيي يتكون متيوفرة لال يتخدام مي‬

‫(‪)6‬‬

‫الم ارفيق المو ييودة دا يل المج ييى أو المشيروع والتييي يتكون متييوفرة لال يتخدام مي‬

‫المواصفات؛‬

‫المالك والشاغلي إحق م حقو م ؛‬

‫جيل‬

‫جيل المييالك‬

‫والشاغلي على أ اس تجاري؛‬
‫(‪)2‬‬

‫األثاث والمفروشات ( ن و دت) للم اطق المشترإة المقترحة التي سلت م الم ور بتوفيرها‬

‫بدون أية ر وم ااف ة؛‬

‫(ب)‬

‫نسخة م‬

‫(ج)‬

‫نسخة م ب ان دارة مج ى المقترإ؛‬

‫(د)‬

‫عالن نظام الملك ة المشترإة المقترإ؛‬

‫مس ييودة لمخ ي ي أر‬

‫الوح ييدة المقترح يية توا ييض مس يياحات الوح ييدة الم لو يية عل ييى المخ ي ي‬

‫ل ايات التسجيل وفقاً للتعل مات‪ ،‬و شرط عدم توا ض مساحات أ رى؛‬
‫(هي)‬

‫دول بالمواد والتش يبات لكل م الم اطق المشترإة المقترحة والوحدة المقترحة؛‬

‫(و)‬

‫نسخة م أية اتفاق ة توريد تجرمما مع ة المالك المقترحة؛‬

‫(ز)‬

‫المي ان ة المواوعة وفقاً لل ظام األ ا ي ل ر‬

‫(إ)‬

‫أي تقي ي ب ييان علييى تلييك المي ان يية لر ييوم الخدميية المسييتحقة بخصييوص الوحييدة المقترحيية لييى‬

‫تي ماليتي م عمل مع ة المالك المقترحة؛‬

‫الص دو ي المذإوري م‬

‫الص دو العام والصي دو اهحت ياطي ألول‬

‫الل الس تي الماليتي المذإورتي ؛‬
‫‪4‬‬

‫(ط)‬
‫(ي)‬

‫الترتيبات المقترحة لتوريد دمات المرافق الخدم ة لى الملك ة المشترإة والوحدة؛‬
‫فييي حاليية تقييدي أييية ييدمات م ارفييق دم يية مي‬

‫جييل هيئيية غييير تابعيية لحكوميية دبييي‪ ،‬با ييتث ان‬

‫مع ة المالك‪:‬‬
‫الميئة التي تقدم تلك الخدمات؛‬

‫(‪)1‬‬

‫ذإر ا‬

‫(‪)2‬‬

‫ذا ما إانت تلك الميئة مرتب ة بالم ور؛ و‬

‫(‪)3‬‬

‫تقي معقول للتكال ف الس وية للخدمات المذإورة التي تقدم لى الوحدة المقترحة؛‬

‫(ك)‬

‫ما ذا إانت مع ة المالك يتج‬

‫(ل)‬

‫مييا ذا بييدأت أعمييال الج ييان أم ه و ذا ل ي تك ي‬

‫(م)‬

‫التاريخ المتو لتسل العقار لى المشتري؛ و‬

‫(ن)‬

‫ب ان للمشتري بخصوص الت امال بتسجيل العقد في السجل العقاري المجدئى أو ال مائى بحس‬

‫(‪)2‬‬

‫أيية يدمات م ارفيق دم ية ليى ميالكي الوحيدات وفيي حالية‬

‫ق ام الجمع ة بذلك‪ ،‬تفاصيل ترتيبات التوريد؛‬

‫الج ان؛‬

‫ييد بييدأت‪ ،‬التيياريخ المتو ي لانتمييان م ي أعمييال‬

‫األحوال وفقاً للقانون ذات العال ة‪.‬‬
‫جل برام أي عميل عقد لج‬
‫آ يير‪ ،‬يج ي‬

‫أية وحدة مقترحة يقوم العميل بش ارئما م الم ور أو مي عمييل‬

‫عليممييا تقييدي نسييخة إامليية م ي ب ييان اإلفصيياإ التييي ا ييتلمما ع ييد ش يران الوحييدة‬

‫المقترحة لى المشتري‪.‬‬

‫‪5‬‬

‫ب انات اإلفصاإ غير الصح حة أو ال ا صة‬
‫المادة (‪)5‬‬
‫(‪)1‬‬

‫ف ييي حال يية ع ييدم تمكي ي الم ييور مي ي تق ييدي الج ييان الم ييذإور ف ييي الج ييد (‪ )1‬مي ي الم ييادة (‪، )4‬‬

‫(‪)2‬‬

‫وفي حالة عدم تمك العميل م تقدي نسخة م الج ان وفقاً للج د (‪ )2‬م الميادة (‪ ،)4‬يعتجير‬

‫)‪(3‬‬

‫يضمن المطور المعلومات الواردة في البيان المقدم بموجب الفقرةة الفةيير( ‪ )1‬مرن المرادة ‪4‬‬
‫وخرر س ترر مين مررن نرراريك ةقررو مل يرر( الوررردة مررن المطررورن فرري رالرر( ا م ررا ن مررن‬
‫المعلومات غية صحيح( و غية م ممل( من ي( ةاري( جوهةي(ن ي ون المطرور مؤرالو ت نهرا‬
‫العميو الذ ن قو إليه مل ي( الوردة لمعويضه ين األضةارن تواء اشمةى العميو الورردة مرن‬
‫المطور و من يميو آخة‪.‬‬

‫يعتجرالعقد الذي دم الج ان بخصوصال باطال‪.‬‬

‫العقد الذي إان يج‬

‫تقدي نسخة م الج ان بشننال باطالً‪.‬‬

‫معلومات شهادة اإلةهاز‬
‫المادة ‪)6‬‬
‫ي د نؤليم الم مة وردة مقمةر( ن و مب ى و جزء من المب ىن يهب يلرى المطرور إبر‬
‫الم مة الم مة خطيرا ت بمراريك شرهادة إ مراس المب رى‪ .‬ويهروز للم رمة ا يممراد يلرى هرذا‬
‫الب‬

‫لغةض الضماةات الواردة في المادة ‪ 26‬من القاةون‪.‬‬

‫األمور المال ة‬
‫المادة( ‪)2‬‬
‫(‪)1‬‬

‫م عدم اإل الل بنحكيام العقيود التيى تكيون يارية فيى تياريخ بيدن يريان هيذه الالئحية‪ ،‬يكيون‬
‫الم ور مسؤوهً ع إافية التكيال ف والمصياريف المرتب ية بق عية األر‬
‫األر‬

‫ملك ة مشترإة‪.‬‬

‫‪6‬‬

‫جيل أن تصيبض تليك‬

‫(‪)2‬‬

‫ع دما تصبض‬

‫عة األر‬

‫ملك ة مشترإة‪ ،‬تعتجر مع ة المالك مسؤولة ع إافة التكال ف‬

‫والمصاريف المرتب ة بتلك الملك ة المشترإة طبقيا ألحكيام القيانون ولوائحيال الت فيذيية والقي اررات‬
‫والتو يمات الصادرة بمقتواه‪.‬‬

‫(‪)3‬‬

‫يج‬

‫على الم يور تحميل م ي التكيال ف المرتب ية بتصيح ض العييوب فيي العقيار والتنكيد مي‬

‫عدم تحميل تلك التكيال ف عليى مع ية الميالك‪ .‬وفيي حالية مخالفية هيذه الميادة يجيوز لجمع ية‬

‫المالك ا ترداد التكال ف م الم ور‪.‬‬
‫(‪)4‬‬

‫ع د تاريخ نفاذ هذه الالئحة‪ ،‬يج‬

‫على الم ور أو أي م ور فرعي عدم نقل المسيؤول ة عي‬

‫التكال ف والمصاريف المشار ليما في الج د (‪ )1‬م هذه الميادة(‪ )2‬ليى أيية مع ية ميالك أو‬
‫عميل ويعتجر أي شرط بخال‬

‫ذلك باطال‪.‬‬

‫على الم ور دف الر وم الوا بة السداد لى الدائرة ع د تسجيل مع ة المالك‬

‫(‪)5‬‬

‫يج‬

‫(‪)6‬‬

‫ه يسري الج د (‪ )4‬م هذه المادة على أية أ ساط تنمي أو مبالغ التنمي األ رى‪.‬‬

‫(‪)2‬‬

‫وتسي ييترد المبي ييالغ المدفوعي يية مقي ييدماً م ي ي‬

‫(أ)‬

‫ذا إييان المجلييغ مسييتحق األدان م ي‬

‫جي ييل الم ي ييور والتي ييي تتعلي ييق بالت‬

‫الخدمات التي تقدم بعد تشكيل الجمع ة شرط‪:‬‬

‫ي يية أو البوي ييائ أو‬

‫مع يية المييالك أو ييتتحملما الجمع يية‪ ،‬أن ه س يييد المجلييغ‬

‫ع المجلغ المستحق األدان أصالً إما لو إانت مع ة المالك تدف أ ساط التنمي أو مبالغ‬

‫التنمي نفسما؛‬
‫(ب)‬

‫أما ذا إان المجلغ مستحق األدان م أي عمييل أو ييتحملما ذليك العمييل‪ ،‬أن ه س ييد المجليغ‬

‫ع نسبة س التنمي أو مبالغ التنمي األ رى التي تستحق األدان أصالً م العميل إما لو‬
‫كانت مع ة الميالك يد يددت سي التينمي أو المصياريف مي أميوال معتميا الجمع ية مي‬

‫ر وم الخدمة‪.‬‬
‫(‪)8‬‬

‫يج ي‬

‫علييى الم ييور تحمييل ر ييوم توصيييل الخييدمات للمش ييروع ويم ي عل ييى الم ييور م الب يية‬
‫‪7‬‬

‫مشتري وحدات أو المالك أو الجمع ة بالمبالغ المدفوعة م‬

‫جلال‪.‬‬

‫(‪)9‬‬

‫ه يحييق ألي م ييور تحصيييل ر ييوم الخدميية أو ر ييوم الم ارفييق دون الحصييول علييى الموافقيية‬

‫(‪)10‬‬

‫في حالة تحصيل الم ور ر وم الخدمية أو الر يوم األ يرى مي مشيتري و ميالك الوحيدات أو‬

‫(أ)‬

‫أن يكون لدييال ميد ق حسيابات مسيجل لتيد يق إافية األميوال المسيتلمة والتيي ت فيق واليذي يجي‬

‫الخ ة م مؤ سة الت ظ العقاري‪.‬‬

‫الوحدات المقترحة‪ ،‬يج‬

‫على الم ور الل ثالثة أشمرم تاريخ تن م مع ة المالك‪:‬‬

‫عل ال المصاد ة‪:‬‬
‫مي ي ر ييوم الخدم يية ور ييوم‬

‫(‪)1‬‬

‫المص يياد ة عل ييى أن األمي يوال أنفق ييت بش ييكل أص ييولي وفقي ياً لل يير‬

‫(‪)2‬‬

‫رصيد تسوية األموال التي ل ست نفا ما والتي يحتفظ بما الم ور؛‬

‫(ب)‬

‫ييالل ‪ 21‬سييوم مي تيياريخ تن ي م مع يية المييالك للوحييدات أو األر‬

‫المرافق‬

‫مع ة المالك رصييد المبيالغ التيي تسيلمما الم يور بال ابية عي‬

‫والتي حددها المد ق وذلك ع د ا تسالم تقرير المد ق؛‬
‫(ج)‬

‫ي ن م ي أييية مبييالغ مال يية ل ي ت فييق أصييوهً وذلييك وفق ياً لل يير‬

‫جل تقدي أية تعل مات بمو‬

‫تقييدي شييعار‬

‫المؤ سة بننال يج‬
‫(‪)12‬‬

‫مع ية الميالك التيي لي ت فيق‬

‫الل ‪ 21‬سوم م صدور تعل مات ل ال مي المؤ سية‪ ،‬أن سيدف ليى مع ية الميالك إاميل أو‬
‫أ رى إما يصاد عليما مد ق الحسابات‪.‬‬

‫(‪)11‬‬

‫المع يية‪ ،‬أن سييدف لييى‬

‫م ي ر ي الخدميية أو أييية ر ييوم‬

‫الفقرة (ج) م الج د ‪ 10‬مي هيذه الميادة‪ ،‬يجي‬

‫عليى المؤ سية‬

‫ييى لييى الم ييور ستوييم تفاصيييل ال فقييات غي ير األصييول ة وأ ييباب اعتقيياد‬
‫داد األموال لى مع ة المالك‪.‬‬

‫ذا ا ييتخدم الم ييور ر ييوم الخدميية أو غيرهييا م ي الر ييوم المحصييلة م ي مشييتري الوحييدات أو‬

‫الوحييدات المقترحيية لتملييك بوييائ أو تجمي ي ات و قيييت تلييك البوييائ والتجمي ي ات مو ييودة فييي‬
‫‪8‬‬

‫جييل أولئييك المشييتري ‪ ،‬يجي‬

‫تيياريخ تشييكيل مع يية المييالك مي‬

‫ع دئييذ علييى الم ييور أن يحييول‬

‫ملك ة وح ازة تلك البويائ والتجميي ات ليى مع ية الميالك‪ .‬ويجيوز للمؤ سية أن تحكي بشينن‬
‫أية مسائل ت شن ع هذا الشرط‪.‬‬
‫(‪)13‬‬

‫يج‬

‫أن ه ستعيار‬

‫أي شيرط متويم فيي اتفاق ية الج ي والشيران‪ ،‬يوان إانيت متعلقية بوحيدة‬

‫مقترحة أو بوحدة ائمة‪ ،‬م أحكام القيانون والليوائض الت فيذيية وغيرهيا مي القي اررات والتو يميات‬

‫الصادرة بمقتواه‪.‬‬

‫مت لبات اإلسداع‬
‫المادة (‪)8‬‬

‫(‪)1‬‬

‫ي جييق ب ييان دارة المج ييى علييى الحيياهت ال يواردة فييى المييادة (‪ )22‬الج ييد (‪ )2‬م ي القييانون‪ ,‬إمييا‬
‫أن ستقي ييد ب ييان دارة المج ييى بنحك ييام هييذه الالئح يية و ييالق اررات و تو يم ييات الص ييادرة مي ي‬

‫يج ي‬

‫المؤ سة‪.‬‬
‫أن يكون لجم‬

‫(‪)2‬‬

‫يج‬

‫(‪)3‬‬

‫ذا رغ ي‬

‫المباني ذات مواوع التقس الحجمي ب ان دارة المج ى‬

‫الم ييور ب يإ ران تقس ي حجمييي ستو ي‬

‫عل ييال تحمييل التكييال ف الالزميية لييذلك وتشييمل‬

‫على جيل المثال دون حصر (تقس حجمي‪ ،‬تجمي ب ان دارة المج ى‪ ،‬اه تشيارات‪ ،‬تجميي‬
‫عالن أنظمة الممتلكات العقارية)‪.‬‬

‫(‪)4‬‬

‫يكون ال ر‬

‫(أ)‬

‫تحدسد الع اصر المكونة؛‬

‫(ب)‬

‫تحدسد الع اصر المشترإة؛‬

‫م ب ان دارة المج ى هو‪:‬‬

‫‪9‬‬

‫(ت)‬

‫تحدسد م ه مالكي الع اصر المكونة اللذس يملكون الع اصر المشترإة المختلفة؛‬

‫(ث)‬

‫تحدسييد حقييو الييد ول‪ ،‬بمييا فييي ذلييك ييدمات الم ارفييق الخدم يية لييى أي ع صيير مكييون حيييد‬

‫(ج)‬

‫تحدسد حقو دع أو سوان الع اصر المكونة؛‬

‫(إ)‬

‫تحدسد إ ف ة ص انة الع اصر المشترإة وم المسؤول ع ص انتما؛‬

‫(خ)‬

‫تحدسييد إ ف يية توزي ي تكييال ف الص ي انة بمييا فييي ذلييك تكييال ف التجدسييد واه ييتجدال علييى مييالكي‬

‫(د)‬

‫ب ييان الترتيبييات بخصييوص المج ييى ف مييا ستعلييق بالتيينمي ‪ ،‬بمييا فييي ذلييك أ يياس توزي ي تكييال ف‬

‫(‪)5‬‬

‫يجوز أن ستوم ب ان دارة المج ى تفويواً بما سلي‪:‬‬

‫تسري تلك الحقو على أو م‬

‫الل أي ع صر مكون آ ر؛‬

‫الع اصر المكونة؛ و‬

‫التنمي على مالكي الع اصر المكونة‪.‬‬

‫(أ)‬

‫فتض حساب مصرفي با‬

‫(ب)‬

‫تحدسد ال ريقة التي يش ل بما المفواون بالتوق‬

‫(ج)‬

‫تحدسد أية يود على تش يل ذلك الحساب المصرفي؛‬
‫ويفييو‬

‫مع ة المالك الذي ستعلق بال؛‬
‫على ذلك الحساب المصرفي؛ و‬

‫أح ييد الج ييوك بف ييتض ذل ييك الحس يياب والسييماإ بتشي ي يلال وفقي ياً لحس يياب الو ييمان الخ يياص‬

‫بجمع ات المالك و ود ب ان دارة المج ى‪.‬‬

‫الج انات اإل ت ارية‬
‫مادة (‪)9‬‬

‫‪10‬‬

‫يج‬

‫أن ستوم ب ان دارة المج ى الترتيبات المتعلقة باألمور المجي ة في الج د (‪ )4‬م المادة (‪ )2‬وإميا‬

‫يجوز أن ستوم أحكام ع بعض أو إافة ما سلي‪:‬‬

‫(أ)‬

‫نشان وعمل مجموعة اإلدارة؛‬

‫(ب)‬

‫تحدسد وا ترداد ر وم الص انة (بما في ذلك التجدسد واه تجدال)؛‬

‫(ج)‬

‫تحدسد وا ترداد ر وم تمويل المرافق التجارية أو المحالت التجارية ام المج ى؛‬

‫(د)‬

‫المقاس م المعمارية للج اية مواوع ب ان دارة المج ى؛‬

‫(هي)‬

‫مت لبات دارة ال فايات وتوفير ال ا ة والم اه ومت لبات دارة الجيئة األ رى؛‬

‫(و)‬

‫واعد ا تخدام الع اصر المشترإة؛‬

‫(ز)‬

‫الترتيبات اإلدارية وحفظ السجالت؛‬

‫(إ)‬

‫حل ال اعات؛ و‬

‫(ط)‬

‫أية أمور أ رى م لو ة لحماية مصالض المالك وشاغلي الع اصر المكونة‪.‬‬

‫األثر المل م لج ان دارة المج ى‬
‫المادة (‪)10‬‬
‫يكون ب ان دارة المج ى مل ماً لمالكي الع اصر المكونة بميا فيى ذليك مع ية الميالك‪ ،‬و ميالكي الوحيدات‬
‫والشاغلي واألشخاص الذس لدسم حق عي ى على أية وحدة‪.‬‬

‫‪11‬‬

‫أثر حقو اهرتفا والتعمدات والقيود‬
‫ال ادة (‪)11‬‬
‫تكون أية حقو‬

‫رتفا أو تعمدات أو يود في ب ان دارة المج ى نافذة وفقاً لشروطما‪.‬‬

‫أثر األحكام المتعاراة‬
‫المادة (‪)12‬‬
‫يجي‬

‫أن ه ستعيار‬

‫أي شيرط متوييم فيي ب يان دارة المج يى مي أحكيام القيانون أو الليوائض أو القي اررات‬

‫والتو يمات الصادرة بمو بال ويعتجر باطالً لى الحد الذي ستعار‬

‫ف ال ذلك الشرط م تلك األحكام‪.‬‬

‫الشكل والمومون‬
‫المادة (‪)13‬‬
‫يجوز للمدسر العام للدائرة تحدسد ص ة وتفاصيل محتويات أي ب ان دارة مج ى‪.‬‬

‫الفصل الثالد‬
‫اتفاق ات التوريد‬
‫مدة الر ابة‬

‫المادة (‪)14‬‬

‫تجدأ مدة الر ابة ع د تسجيل مع ة المالك وت تمي ع دما سجلغ مجموع مستحقات المالك‪ ،‬دون الم ور‪،‬‬
‫ثلثي مجموع المستحقات أو أكثر‪.‬‬

‫المادة (‪)15‬‬

‫‪12‬‬

‫تقييد المدة‬
‫وات والتي تتوم أي‬

‫(‪)1‬‬

‫يم‬

‫برام اتفاق ات توريد ت يد مدة إل م ما ع ‪3‬‬

‫(‪)2‬‬

‫يم‬

‫على مدسر الجمع ة برام اتفاق ات ت يد مدتما ع ‪3‬‬

‫(‪)1‬‬

‫يجوز نمان اتفاق ة ميدسر الجمع ية واتفاق يات التورييد التيي تجيرم مي‬

‫ار للتجدسد‪.‬‬

‫وات‪.‬‬

‫المادة (‪)16‬‬
‫حق اإلنمان‬

‫مدة الر ابة بمو‬

‫جيل مع ية الميالك يالل‬

‫رار م أغلج ة الميالك (بإ يتث ان الم يور و الجميات التابعية ليال أو يمتليك‬

‫حصة م ما) في معيتما العموم ة الس وية األولى‪.‬‬
‫(‪)2‬‬

‫إلنمييان اتفاق يية مييدسر الجمع يية أو أي اتفاق يية توريييد يج ي‬

‫علييى مجلييم اإلدارة تو يال شييعار‬

‫بالقرار الصادر وفقاً للمادة ‪ )1(16‬لى المدسر أو م ود الخدمة وع دها ت تمي اهتفاق ة‪.‬‬

‫محتويات اإلتفاق ات‬
‫المادة (‪)12‬‬

‫(‪)1‬‬

‫يج‬

‫أن تتوم اتفاق ة التوريد أو اتفاق ة مدسر الجمع ة التي تسيري عليميا هيذه الميادة ب يوداً‬

‫تتوم اآلتى‪:‬‬
‫(أ)‬

‫في حالة توريد بوائ يج‬
‫مقابلما‪ ،‬ويج‬

‫أن تتوم اإلتفاق ة‪ ،‬وصفاً إامالً لتلك البوائ والسعر المدفوع‬

‫أن يكون ذلك السعر م افساً م األ عار التيي يمكي الحصيول عليميا لبويائ‬

‫مماثلة فى السو ‪.‬‬
‫(ب)‬

‫في حالة الخدمات‪:‬‬

‫‪13‬‬

‫(‪)1‬‬

‫(ج)‬

‫وصفاً تفصيل اً للخدمات التي تقدم؛‬

‫(‪)2‬‬

‫األتعيياب التييي ييتفر‬

‫(‪)2‬‬

‫و يلة مراقبة وتقي أدان م ود الخدمة؛‬

‫م افساً م‬

‫مقابييل تلييك الخييدمات‪ ،‬ويج ي‬

‫أن يكييون ييعر تلييك األتعيياب‬

‫عر األتعاب الذي يمك الحصول عل ال مقابل دمات مماثلة في السو ؛‬

‫على نمان اهتفاق ة في حالة عدم األدان أو اإل الل؛‬

‫(‪)3‬‬

‫بد س‬

‫(‪)4‬‬

‫ن‬

‫يسيمض لجمع ية الميالك‪ ،‬بتعيدسل الخيدمات أو مسيتويات الخيدمات التيي يتقدم مي‬

‫(‪)5‬‬

‫ن‬

‫يرية أو رشياوي ف ميا‬

‫مراعاة تعدسل مماثل في األتعاب وفق شروط معقولة ؛ و‬
‫يم‬

‫على م ود الخدمية طلي‬

‫أو جيول عميوهت أو حيواف‬

‫ستعلق بالبوائ أو الخدمات التي تورد م م ودس آ ري ‪.‬‬

‫في حالة توريد بوائ أو ت ويد الخدمات‪:‬‬
‫(‪ )1‬يج ي‬

‫علييى المييورد أو م ي ود الخدميية أن يكييون حاصييل علييى ر صيية تجارييية تخولييال‬

‫توريد البوائ والمستل مات الم لو ة أو تقدي الخدمات الم لو ة‪.‬‬

‫(‪ )2‬ه يجوز ألي مورد أو م ود دمة التعا يد بالبياط مي طير ثاليد لتورييد أو ت وييد‬
‫تلك الخدمة‪.‬‬

‫(‪ )3‬يم ي تحميييل المبييالغ التن س ي ة و التش ي يل ة والروات ي‬

‫أو تعيييي مييو في لصييالض‬

‫الشرإة على مع ة المالك أو المالك‪.‬‬

‫(إ)‬

‫في حالة تعيي شرإة لت ويد دمات دارة الم اطق المشترإة‬
‫(‪ )1‬يج‬

‫على مع ة المالك التعا د م شرإات مسجلة و مر صة بوا‬
‫‪14‬‬

‫ة المؤ سة لتقدي‬

‫ي ييدمات دارة الم ي يياطق المشي ييترإة طبق ي ياً ألحكي ييام القي ييانون ر ي ي (‪ )22‬لس ي ي ة ‪ 2002‬ولوائحي ييال‬

‫الت فيذية‪.‬‬
‫(‪ )2‬يج‬
‫(‪)2‬‬

‫تسجيل عقد اإلدارة لدى مؤ سة الت ظ العقاري‪.‬‬

‫ذا إانيت اتفاق ية التورييد أو اتفاق ية ميدسر الجمع ية تخيالف أي حكي مي األحكيام المشيار اليميا‬

‫أعيياله يجييوز ألي مالييك أو مع يية مييالك تقييدي طل ي‬
‫بإب ال اإلتفاق ة أو تعدسل شروطما‪.‬‬

‫لييى المحكميية المختصيية إلصييدار أميير‬

‫الفصل الراب‬

‫شعارات ت فيذ واعد المجم‬
‫تقدي اإلشعار‬
‫المادة (‪)18‬‬

‫ذا رأى مجلييم دارة مع يية المييالك أن أي مالييك أو شيياغل فييي حاليية‬

‫ييالل بييني م ي‬

‫يجوز للمجلم تفويض مدسر الجمع ة لتقدي شعار ت فيذ واعد المجم ‪ ،‬ويج‬

‫ال موذج الذي تقدمال المؤ سة ويج‬

‫وفقاً للتعل مات المجي ة في ذلك ال موذج‪.‬‬

‫واعييد المجم ي ‪،‬‬

‫أن يكون اإلشعار وفيق‬

‫التقصير في اهلت ام‬
‫المادة (‪)19‬‬

‫‪ .1‬فييي حاليية عييدم لت ي ام المالييك أو الشيياغل باإلشييعار المقييدم ال ييال بت فيييذ واعييد المجم ي ‪ ،‬يجييوز‬
‫للمجلييم بعييد تقييدي شييعار آ يير فيير‬

‫(‪ )20000‬دره ي ‪ .‬ويج ي‬
‫ويج‬

‫غ ارميية مال يية علييى المالييك أو الشيياغل ه ت يييد ع ي ألفييي‬

‫أن يكييون ذلييك اإلشييعار اإلاييافي وفييق ال مييوذج المقييدم م ي المؤ سيية‬

‫تعجئتال وفقاً للتعل مات المجي ة في ذلك ال موذج‪.‬‬

‫‪ .2‬يجوز لجمع ة المالك‬

‫ترداد أية غرامة مفرواة بمو‬

‫‪15‬‬

‫هذا الفصل إدس‬

‫الفصل الخامم‬

‫تعيي مدسر دارى مؤ ت‬
‫المادة (‪)20‬‬
‫في حالة نشون أي م الظرو‬

‫التال ة‪:‬‬

‫(أ)‬

‫رفيض أو تقصييير مع يية المييالك فيي التقيييد بييني يرار لحييل ني اع صييادر عي محكي‬

‫(ب)‬

‫عدم ق ام مع ة المالك بالوفان بوا باتما الم صوص عليما فى القانون أو اللوائض أو الق اررات‬

‫م المؤ سة ‪.‬‬

‫يياص أو‬

‫أو التو يمات الصادرة بمقتواه ؛ أو‬
‫(د)‬

‫ذا إانت شئون الجمع ة في حالة فواى وعدم نوباط‪،‬‬
‫يجوز للمؤ سة فى هذه الحالة تعيي مدسر دارى لتولي أمور مع ة المالك لفترة محيددة مي‬
‫ال م ‪.‬‬

‫أثر التعيي‬

‫المادة (‪)21‬‬

‫ع د تعيي مدسر دارى مؤ ت‪:‬‬
‫في مجلم دارة مع ة المالك شاغرة؛‬

‫(أ)‬

‫تصبض إافة الم اص‬

‫(ب)‬

‫تييؤول صييالح ات وممييام مجلييم دارة مع يية المييالك لييى مييدسر الجمع يية ط يوال المييدة التييي‬

‫تحددها المؤ سة و‬

‫‪16‬‬

‫(ج)‬

‫يجي‬

‫علييى المييدسر المييذإور التقيييد بقي اررات وتو يمييات المؤ سيية (الخ يية)‪ ،‬يوان ييدمت فييي‬

‫د تعيي ال أو في أي و ت هحق‪.‬‬

‫انتخاب مجلم دارة دسد لجمع ة المالك‬
‫المادة (‪)22‬‬

‫جل انتمان مدة تعيي مدسر الجمع ة بو ت معقول‪ ،‬يج‬

‫عل ال عقيد ا تمياع للجمع ية العموم ية هنتخياب‬

‫مجلييم دارة دسييد والييذي يييتحمل مسييؤول ة دارة شييؤون مع يية المييالك فييور انتمييان مييدة تعيييي المييدسر‬

‫المذإور‪.‬‬

‫الفصل السادس‬
‫تسجيل مع ات المالك‬
‫مت لبات التسجيل‬
‫المادة (‪)23‬‬

‫(‪)1‬‬

‫لتن م مع ة مالك يج‬

‫تقدي المست دات اهت ة‪:‬‬

‫(أ)‬

‫طل‬

‫التسجيل‬

‫(ب)‬

‫مخ‬

‫المو للم اطق المشترإة؛‬

‫(ج)‬

‫عالن نظام الملك ة المشترإة؛‬

‫(د)‬

‫ي د الملك يية لق عيية األر‬

‫الملك ة يد اإل ران‬

‫مواييوع مخ ي المو ي ؛ أو ر ييالة م ي الييدائرة تفيييد ب ينن شييمادة‬

‫‪17‬‬

‫(و)‬

‫الج يد (‪ )10‬مي الميادة (‪)2‬؛ أو ر يالة تعميد عليى أن يقيدم تقريير‬

‫تقرير التيد يق المعيد بمو ي‬
‫المد ق الل المدة المحددة‪.‬‬

‫(ز)‬

‫د نقل ملك ة أول وحدة؛‬

‫(إ)‬

‫مي‬

‫فييي حاليية تقييدي ال ل ي‬

‫جييل مييالكي الوحييدة‪ ،‬ثبييات تو ييال وعييدم التقيييد باإلشييعار بمو ي‬

‫المادة (‪ )11‬الج د الفرعي (‪ )3‬م لوائض نظام الملك ة المشترإة ر ( ) لس ة ‪2010‬؛‬
‫(ط)‬

‫ر وم الدائرة؛ و‬

‫(ي)‬

‫أية مست دات أ رى ت لجما الدائرة‪.‬‬

‫(‪)2‬‬

‫يجوز للمدسر العام للدائرة طل‬
‫المادة‪ ،‬بما في ذلك أي‬

‫تقدي بعض أو إافة المست دات المجي ة في الج د (‪ )1‬مي هيذه‬

‫ن م تلك المست دات ب ريقة لكترون ة‪.‬‬
‫نظام اإلدارة والمحا بة‬
‫المادة (‪)24‬‬

‫(‪)1‬‬

‫يج ي‬

‫علييى مع يية المييالك ع ييد تسييجيلما ا ييتخدام نظييام دارة ومحا ييبة لكترونييي لالحتفييا‬

‫بس ييجالتما الحس يياب ة وغيره ييا مي ي الس ييجالت وتق ييدي ال م يياذج والمس ييت دات األ ييرى الم ل ييوب‬
‫تقديمما بمو‬

‫ال ظام األ ا ي للجمع ة أو الق اررات والتو يمات الصادرة م المؤ سة‪.‬‬

‫اعتماد نظام اإلدارة والمحا بة اإللكتروني المشار ل ال في الج د (‪ )1‬م هيذه الميادة مي‬

‫(‪)2‬‬

‫يج‬

‫(‪)3‬‬

‫وع د تسجيلما‪ ،‬يج‬

‫جل المؤ سة ‪.‬‬

‫على مع ة المالك أن تقدم لى المؤ سة الج انات ذات الصلة بشؤونما‬

‫وفق ال موذج و ال ريقة واألو ات التي تحددها المؤ سة المذإورة‪.‬‬

‫‪18‬‬

‫(‪)4‬‬

‫يجييوز للمؤ سيية تمدسييد الممليية ال م يية مييا بشييكل عييام أو فييي حيياهت معي يية بخصييوص التقيييد‬
‫بني شرط م شروط هذه المادة‪.‬‬

‫تن م مع ة المالك‬
‫المادة (‪)25‬‬
‫(‪)1‬‬

‫يج‬
‫)‬
‫ب)‬
‫ج)‬

‫على الم ور الذي يسجل مع ة مالك لمشروع محدد ما سلي‪:‬‬
‫حفظ دفاتر جالت مع ة المالك وفقاً لما س‬
‫شران وثائق التنمي الوا بة با‬
‫عداد م‬

‫عل ال نظامما األ ا ي؛‬

‫مع ة المالك؛‬

‫المست دات الالزمة للجمع ة العموم ة الس وية األولى لجمع ة المالك؛‬

‫د)‬

‫عقد ا تماع الجمع ة العموم ة الس وية األولى؛ و‬

‫)‬

‫دارة مع ة المالك والم اطق المشترإة (بما في ذلك صالحما وص انتما) حتى‬

‫الجمع ة العموم ة الس وية األولى‪.‬‬
‫(‪)2‬‬

‫تتحمل مع ة المالك مسؤول ة التكال ف المعقولة لضش ان الالزم الق ام بما بمو‬

‫(‪)3‬‬

‫يجوز للمدسر العام أن يصدر تو يمات بشنن مج ى أو تجم محدد أو مباني أو تجمعات في‬

‫م هذه المادة‪.‬‬

‫مارة دبي بشكل عام تحك مستوى ر وم الخدمة التي تفر‬

‫وعقد أول مع ة عموم ة‬

‫وية لما‪.‬‬

‫‪19‬‬

‫الج د (‪)1‬‬

‫لى حي تن م مع ة مالك‬

‫عدم ص انة الم اطق المشترإة‬
‫المادة (‪)26‬‬

‫(‪)1‬‬

‫ذا أهملت مع ة المالك فى ص انة الم اطق المشترإة وفقاً ل ظامما األ ا ي أو نظام‬

‫(‪)2‬‬

‫ذا ثجت للمؤ سة أو م تفواال لذلك بعد المعاس ة همال مع ة المالك فى ص انة األ ان‬

‫الملك ة المشترإة‪ ،‬يجوز للمؤ سة أو م تفواال لذلك أن تجري معاس ة للعقارالمشترك‪.‬‬

‫المشترإة ف ج‬

‫عليما صدار شعار‬

‫اإلشعار العمل الوا‬

‫(‪)3‬‬

‫ذا ل تق‬

‫م أو م‬
‫)‬
‫ب)‬

‫ى لجمع ة المالك بإثبات المخالفة ويج‬

‫على مع ة المالك الق ام بال ومملة معقولة يج‬

‫مع ة المالك بت فيذ ما طل‬

‫نجاز العمل اللما‪.‬‬

‫م ما فى شعار التصح ض‪ ،‬يجوز للمؤ سة الق ام بني‬

‫ما سلي‪:‬‬

‫تعيي مدسر ادارى مؤ ت بمو‬

‫فر‬

‫أن يحدد‬

‫الفصل ‪ 5‬م هذه الالئحة؛‬

‫غرامة ه تتجاوز ‪ 1000000‬دره ‪.‬‬

‫الفصل الساب‬
‫أحكام انتقال ة‬
‫المادة (‪)22‬‬
‫تعريفات‬

‫المشروع القائ ‪ :‬أي مشروع يكون ائما ع د تاريخ نفاذ هذه الالئحة ويشمل‪:‬‬
‫(أ)‬

‫المشييروع الييذي بيياع الم ييور ف ييال وحييدة واحييدة أو أكثيير مي الوحييدات لييى أي عميييل فييي تيياريخ‬

‫(ب)‬

‫المشيروع الييذي يكيون لييدى الم يور ترتيبييات ائمية ونافييذة بشيننال والتييي يمكي تحق قمييا إلطييال‬

‫ال فاذ؛‬

‫‪20‬‬

‫المشييروع فييي السييو‬
‫تاريخ ال فاذ‪.‬‬

‫ييالل الفت يرة األولييى وحييدوث مثييل ذلييك اإلطييال‬

‫ييالل الفت يرة وذلييك فييي‬

‫الفترة األولى‪ :‬الفترة التي تجدأ في تاريخ ال فاذ وت تمي بعد ‪ 3‬أشمر ميالدية م بداستما‪.‬‬
‫الفترة الثان ة‪ :‬الفترة التي تجدأ ع د انتمان الفترة األولى وت تمي بعد ‪ 6‬أشمر م بداستما‬
‫ب ان اإلفصاإ المؤ ت‪ :‬أي ب ان ستفق م المادة ‪.31‬‬
‫المادة (‪)28‬‬
‫ا تث ان المادتي ‪ 4‬و‪5‬‬
‫يسري هذا الفصل على المشروع القائ بي ما ه تسري المادتان ‪ 4‬و‪ 5‬على أي مشيروع يائ حتيى انتميان‬
‫الفترة الثان ة‬
‫مت لبات الفترة األولى‬
‫المادة (‪)29‬‬

‫(‪)1‬‬

‫ييالل الفتيرة األولييى و جييل توق ي العميييل علييى أي عقييد لشيران أييية وحييدة فييي أي مشييروع ييائ ‪،‬‬
‫يج ي‬

‫علييى الم ييور أن سرفييق بييذلك العقييد شييعار لييى المشييتري وفييق ال مييوذج الييذي تعتمييده‬

‫المؤ سة‪.‬‬
‫(‪)2‬‬

‫يالل الفتيرة األوليى و جييل توق ي العميييل عليى أي عقييد لج ي أييية وحيدة مقترحيية فيي أي مشييروع‬

‫ييائ والتييي اشييتراها مي الم ييور أو مي عميييل آ يير‪ ،‬يجي‬

‫شعار لى المشتري وفق ال موذج الذي تعتمده المؤ سة‪.‬‬

‫علييى العميييل أن سرفييق بييذلك العقييد‬

‫(‪)3‬‬

‫فييي حاليية تقصييير الم ييور فييي التقيييد بالج ييد (‪ )1‬م ي هييذه المييادة‪ ،‬يعتجيير العقييد الييذي أرفييق بييال‬

‫(‪)4‬‬

‫فييي حاليية تقصييير العميييل فييي التقيييد بالج ييد (‪ )2‬م ي هييذه المييادة‪ ،‬يعتجيير العقييد الييذي أرفييق بييال‬

‫اإلشعار المقدم لى المشتري باطال‪.‬‬

‫‪21‬‬

‫اإلشعار المقدم لى المشتري باطال‪.‬‬
‫مت لبات الفترة الثان ة‬
‫المادة (‪)30‬‬

‫(‪)1‬‬

‫ييالل الفت يرة الثان يية و جييل توق ي العميييل علييى أي عقييد لش يران أييية وحييدة فييي أي مشييروع ييائ ‪،‬‬
‫يج‬

‫على الم ور‪:‬‬

‫(أ)‬

‫أن سرفق بذلك العقد شعار لى المشتري وفق ال موذج الذي تعتمده المؤ سة؛ و‬

‫(ب)‬

‫تقدي ب ان إشف مؤ ت‪.‬‬

‫(‪)2‬‬

‫الل الفترة الثان ة و جل توق‬

‫العميل على أي عقد لج‬

‫اشتراها م الم ور أو م عميل آ ر‪ ،‬يج‬

‫أية وحدة فيي أي مشيروع يائ والتيي‬

‫على العميل‪:‬‬

‫(أ)‬

‫أن سرفق بذلك العقد شعار لى المشتري وفق ال موذج الذي تعتمده المؤ سة؛ و‬

‫(ب)‬

‫تقدي نسخة إاملة م أي ب ان إشف مؤ ت والذي ا تلمال المشتري ع د شران الوحدة‬

‫(‪)3‬‬

‫في حالة تقصير الم ور في التقيد بالج يد (‪ )1‬مي هيذه الميادة‪ ،‬يعتجير العقيد اليذي يسيري عل يال‬

‫(‪)4‬‬

‫في حالة تقصيير العمييل فيي التقييد بالج يد (‪ )2‬مي هيذه الميادة‪ ،‬يعتجير العقيد اليذي يسيري عل يال‬

‫الت ام الم ور باطال‪.‬‬

‫الت ام الم ور باطال‪.‬‬

‫‪22‬‬

‫مت لبات ب ان اإلفصاإ المؤ ت‬
‫المادة (‪)31‬‬

‫(‪)1‬‬

‫يج‬

‫(أ)‬

‫وصف المج ى أو المشروع الذي تشكل الوحدة‬

‫(‪)1‬‬

‫التوق‬

‫على ب ان فصاإ مؤ ت م‬

‫اه يتخدامات المقصييودة لييضر‬

‫جل الم ور سجي ف ال المعلومات التال ة‪:‬‬
‫ناً م ال‪ ،‬بما في ذلك‪:‬‬

‫اييم المج ييى أو المشييروع (مثييال ا ييتخدامات ييك ة‪ ،‬شييقق‬

‫مفروشة أو الف دق ة ومحالت تجارية)؛‬

‫اصة بالمج ى أو المشروع أو أية معدات أو دمات متوم ة ف ال والتي تساه في‬

‫(‪)2‬‬

‫أية معال‬

‫(‪)3‬‬

‫أي ا تخدام اص يسري على الوحدة (مثال شقة م ودة بالخدمات)؛‬

‫(‪)4‬‬

‫الم ارفي ييق المو ي ييودة بالم ي يياطق المشي ييترإة والتي ييي ي ييتكون متي ييوفرة لال ي ييتخدام م ي ي‬

‫جي ييل المي ييالك‬

‫(‪)5‬‬

‫الم ارفيق المو ييودة دا يل المج يى أو المشيروع والتييي يتكون متييوفرة لال يتخدام مي‬

‫جيل المييالك‬

‫الت وير المع ز بيئ اً؛‬

‫والشاغلي إحق م حقو م ؛‬

‫والشاغلي على أ اس تجاري؛‬
‫(‪)6‬‬

‫ي األثيياث والمفروشييات ( ن و ييدت) للم يياطق المشييترإة التييي سلتي م الم ييور بتوفيرهييا بييدون‬
‫أية ر وم ااف ة؛‬
‫أر‬

‫(‪)2‬‬

‫مخ‬

‫(‪)8‬‬

‫دول بالمواد والتش يبات لكل م الم اطق المشترإة المقترحة والوحدة؛‬

‫على المخ‬

‫الوحيدة المقترحية تجيي بوايوإ م ياطق الوحيدة التيي تشيترط التو يميات‬
‫ألغ ار‬

‫التسجيل دون أية م اطق أ رى؛‬

‫‪23‬‬

‫مارهيا‬

‫(‪)9‬‬

‫جيل مع ية الميالك و ن إيان األمير إيذلك‪ ،‬ما ية‬

‫ما ذا إانت يتجرم أيية اتفاق يات تورييد مي‬
‫تلك اهتفاق ات؛‬

‫(‪)10‬‬
‫(‪)11‬‬

‫ترتيبات مقترحة لتوريد دمات المرافق لى الممتلكات المشترإة والوحدة؛‬
‫جييل هيئيية غييير تابعيية لحكوميية دبييي‪ ،‬با ييتث ان‬

‫فييي حاليية تقييدي أييية ييدمات م ارفييق دم يية مي‬
‫مع ة المالك‪ ،‬ب ان يحدد ا‬

‫الميئة التي يتقدم تليك الخيدمات وتحدسيد إ ف ية تسيدسد الر يوم‬

‫(‪)12‬‬

‫ما ذا إانت مع ة المالك يتج‬

‫أيية يدمات م ارفيق دم ية ليى ميالكي الوحيدات وفيي حالية‬

‫(‪)13‬‬

‫مييا ذا بييدأت أعمييال الج ييان أم ه و ذا ل ي تك ي‬

‫لى تلك الميئة؛‬

‫ق ام الجمع ة بذلك‪ ،‬توفير تفاصيل ترتيبات التوريد؛‬

‫ييد بييدأت‪ ،‬تحدسييد التيياريخ المتو ي بشييكل معقييول‬

‫لجدن أعمال الج ان؛‬
‫(‪)14‬‬

‫التاريخ الذي ستو بشكل معقول أن يسل ف ال العقار لى المشتري؛ و‬

‫(‪)15‬‬

‫ب ان سلفت انتباه المشتري لى الت امال بتسجيل العقد في السيجل العقياري المجيدئي وفقياً للقيواني‬
‫عدم التسجيل‪.‬‬

‫ذات العال ة‪ ،‬بما في ذلك ب ان يشرإ عوا‬

‫الومان المقدم م الم ور‬
‫المادة (‪)32‬‬
‫يوم الم ور صحة المعلومات المجي ة في ب ان اإلفصاإ المؤ ت و الل‬

‫الوحييدة مي الم ييور‪ ،‬وفييي حاليية اكتشييا‬

‫تي مي تياريخ نقيل ملك ية‬

‫أن أي مي المعلومييات غييير صييح حة أو غييير مكتمليية مي أييية‬

‫ناح ة وهرية‪ ،‬يكون الم ور مسؤوهً تجاه العميل الذي ت قل ل ال ملك ة الوحدة لتعويوال عي األايرار‪،‬‬
‫وان اشترى العميل الوحدة م الم ور أو م عميل آ ر‪.‬‬

‫‪24‬‬

‫ب انات دارة المج ى‬
‫المادة (‪)33‬‬
‫(‪)1‬‬

‫يج‬

‫الذس‬

‫أن ستوم ب ان دارة المج ى أحكاماً ارورية م أ ل ت ظ حقو والت امات المالك‬
‫كونون ملت مي بال‪ ،‬بما في ذلك األ اس الذي توزع ب ان عل ال تكال ف الص انة‬

‫والتكال ف األ رى‪ ،‬بشكل عادل لكل األط ار ‪.‬‬

‫(‪)2‬‬

‫دون أ الل بنحكام الج د (‪ )1‬م هذه المادة‪ ،‬يج‬

‫أه يكون أي حك في الج ان متعارااً م‬

‫القانون أو اللوائض والق ار ارت والتو يمات الصادرة بمقتواه ويعتجر باطالً لى حد أي تعار‬
‫مما ذإر‪.‬‬

‫يجوز للمؤ سة أن ترفض تسجيل أى ب ان ذا رأت أن أحكامال ه تتوافق م الج دس (‪ )1‬و (‪ )2‬م‬

‫هذه المادة‪.‬‬

‫اتفاق ات التوريد‬
‫المادة (‪)34‬‬

‫(‪)1‬‬

‫تسري هذه المادة على مع ة المالك التي في و ت تسجيلما تكون الدائرة د أصدرت شمادات‬

‫(‪)2‬‬

‫ه يجوز للم ور الذي يسجل مع ة مالك تسري عليما هذه المادة أن سجرم اتفاق ة توريد‬

‫ملك ة لمالك الوحدات الفردية فيما‪.‬‬

‫بال ابة ع‬

‫مع ة المالك بصفتال وإيالً مفوااً ع ما‪.‬‬

‫‪25‬‬

‫تحصيل ر وم الخدمة و ر وم المرافق‬
‫المادة (‪)35‬‬
‫(‪)1‬‬

‫ه يجوز للم ور فر‬

‫أية ر يوم دمية أو ر يوم م ارفيق‪ ،‬عليى مشيتري وميالك الوحيدات فيي‬

‫م يياطق عقييارات الملك يية المشييترإة أو الم يياطق المشييترإة دون الحصييول علييى الموافقيية الخ يية‬

‫م المؤ سة‪.‬‬
‫(‪)2‬‬

‫فى حالة‬

‫يالل الم يور بميا ورد فيى الج يد (‪ )1‬مي هيذه الميادة يجيوز للمؤ سية اتخياذ ا يرانات‬

‫انون ة اده‪.‬‬
‫صدرت هذه المو مات فى دبي اليوم الثالثان الموافق ‪ 13‬أبريل ‪2010‬م‬

‫‪26‬‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/sanhvvid/موجهات-القواعد-العامة-2010.pdf',
  NOW(),
  NOW()
);

-- Document 20: Document
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
  'Document',
  '‫التاريخ‪:‬‬
‫المرجع‪:‬‬

‫‪10/11/2021‬‬
‫‪DLD/OUT/2021/0009961‬‬

‫المحترمين‬

‫السادة ‪ /‬شركات إدارة العقارات الملكية المشتركة‬
‫تحية طيبة وبعد‪،‬‬
‫الموضوع‪ :‬متابعة تشكيل لجان المالك لمشاريع الملكية المشتركة‬
‫تهديكم مؤسسة التنظيم العقاري أطيب تحياتها وتتمنى لكم المزيد من التقدم واالزدهار ومن منطلق حرص المؤسسة نحو متابعة تشكيل لجان المالك‬
‫لمشاريع الملكية المشتركة وتقديم أفضل الخدمات بمستوى عالي ومهني تحقيقا لألهداف المرجوة والحرص على رضا المتعاملين وتعزيز الثقة‬
‫وتطبيقا لمبدأ الشفافية في القطاع العقاري‪ ،‬يتطلب من شركات اإلدارة التعاون مع المؤسسة لعمل التالي‪- :‬‬
‫أوال‪ - :‬البدأ في حصر المشاريع المشكل لها لجان المالك والمشاريع الغير مسجل بها لجان مالك مع ذكر السبب (حسب الكشف المرفق)‪.‬‬
‫ثانيا‪ - :‬البدأ في تسجيل أعضاء الجان الخاصة بالمشاريع الغير مسجل بها لجان مالك عن طريق الخدمة اإللكترونية (خدمة تسجيل لجان المالك)‪.‬‬
‫ثالثا‪- :‬ستقوم المؤسسة بمتابعة تسجيل اللجان وعلى الشركات التعاون مع المؤسسة بهذا الخصوص‪.‬‬
‫وعليه يتطلب من جميع شركات اإلدارة البدأ في اإلعالن عن تشكيل اللجان المطلوبة من خالل التعميم على مالك الوحدات العقارية للمشاريع المدارة‬
‫من قبلهم واستالم الطلبات واالنتهاء من جميع اإلجراءات الالزمة والخاصة بتشكيل اللجان عن طريق الخدمة اإللكترونية بنظام مالك مع نهاية شهر‬
‫نوفمبر ‪2021‬م‪.‬‬
‫ويرجى العلم وفي حالة عدم االلتزام بما ورد في هذا التعميم ستقوم المؤسسة باتخاذ اإلجراءات القانونية الالزمة بحق الشركات الغير ملتزمة‪.‬‬

‫وتفضلوا بقبول فائق االحترام والتقدير‪،،،‬‬

‫محمد بن حماد‬
‫مدير إدارة أول‬

',
  'Dubai Real Estate Law',
  'https://dubailand.gov.ae/media/wymcdabb/متابعة-تشكيل-لجان-الملاك-لمشاريع-الملكية-المشتركة.pdf',
  NOW(),
  NOW()
);

