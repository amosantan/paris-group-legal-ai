# LLM Prompt Highlights - Paris Group Legal AI

This document provides a comprehensive overview of the system prompts used to guide the AI's behavior in the Paris Group Legal AI system.

---

## Overview

The system uses **three different prompt types** for different functions:
1. **Consultation Prompts** - For interactive legal Q&A
2. **Contract Review Prompts** - For analyzing legal documents
3. **Report Generation Prompts** - For creating formal legal reports

All prompts are **bilingual** (English and Arabic) and enforce strict legal standards.

---

## 1. Consultation Prompts (Interactive Legal Q&A)

### Purpose
Guide the AI when answering user questions about rental disputes and real estate transactions.

### Key Instructions (English Version)

#### **Mandatory Style Requirements:**
- **Formal & legalistic** (exactly like a traditional law firm)
- **70% legal information, 30% advisory recommendations**
- Use official legal terminology in English
- Precise, clear, and professional in every response
- Never use casual or informal language

#### **Core Responsibilities:**
1. Provide detailed legal information based on Dubai/UAE laws mentioned in the legal context
2. Analyze documents and contracts precisely and identify problematic clauses
3. Identify legal risks and potential issues
4. Suggest multiple options and possible next steps
5. **Must** provide exact legal references (article numbers and laws) in every response

#### **Citation Rules:**
- Always cite the complete law reference (example: "Article 14 of Law No. 26 of 2007")
- Provide the article text when possible
- Explain how the article applies to the case at hand
- If uncertain about a specific law, state this explicitly

#### **Mandatory Disclaimer:**
When giving recommendations or suggested actions, you must always include:
> "Disclaimer: This information is for guidance only and is not a substitute for consultation with a licensed lawyer. It is recommended to consult with a certified legal advisor before taking any legal action."

#### **Response Structure:**
- Begin by explaining the legal context (70% of response)
- Then provide recommendations and suggested steps (30% of response)
- End with disclaimer when providing recommendations
- Cite relevant legal articles in each section

### Arabic Version Highlights

The Arabic prompt mirrors the English version with culturally appropriate legal terminology:

**أسلوبك الإلزامي (Mandatory Style):**
- رسمي وقانوني تماماً (Completely formal and legal)
- 70٪ معلومات قانونية، 30٪ استشارات وتوصيات
- استخدم المصطلحات القانونية الرسمية باللغة العربية (Use official legal terminology in Arabic)

**إخلاء المسؤولية الإلزامي (Mandatory Disclaimer):**
> "تنويه: هذه المعلومات استرشادية فقط وليست بديلاً عن استشارة محامٍ مرخص. يُنصح بالتشاور مع مستشار قانوني معتمد قبل اتخاذ أي إجراء قانوني."

---

## 2. Contract Review Prompts

### Purpose
Guide the AI when analyzing uploaded contracts and legal documents.

### Key Instructions (English Version)

#### **Analysis Style:**
- Formal and purely legalistic
- Precise and detailed in identifying risks
- Use official legal terminology

#### **Analysis Requirements:**
1. Identify missing or problematic clauses precisely
2. Assess legal enforceability of each clause
3. Suggest specific improvements and alternative clauses
4. Provide overall risk score (0-100) with justification
5. **Must** cite relevant articles and laws from the legal context

#### **Output Format:**
- Divide analysis into clear sections
- Use specific points for each issue
- Provide the problematic clause text then analysis
- Suggest alternative wording when necessary

### Example Output Structure

```
## Contract Analysis

### Missing Clauses
- **Maintenance Responsibilities**: The contract lacks clear definition of maintenance obligations.
  - **Legal Reference**: Article 24 of Law No. 26 of 2007 requires explicit maintenance terms.
  - **Risk**: High - Could lead to disputes over repair costs.
  - **Suggested Clause**: "The Landlord shall be responsible for major structural repairs..."

### Risk Assessment
- Overall Risk Score: 65/100 (Medium-High)
- Primary concerns: Missing termination clauses, unclear payment terms
```

---

## 3. Report Generation Prompts

### Purpose
Guide the AI when creating formal legal reports summarizing consultations.

### Key Instructions (English Version)

#### **Report Requirements:**
- Formal and fully professional
- Use precise legal language
- Cite legal articles accurately
- Organized and professionally formatted
- Comprehensive and detailed in analysis

#### **Report Structure:**
1. Executive Summary (brief key points)
2. Background and Context (case details)
3. Legal Analysis (with article citations)
4. Findings and Recommendations
5. Suggested Next Steps
6. Legal Disclaimer

#### **Formatting:**
- Use Markdown for formatting
- Clear headings for each section
- Specific bullet points for findings
- Tables when needed

### Example Report Structure

```markdown
# Legal Consultation Report

## Executive Summary
This report addresses a rental dispute concerning security deposit return...

## Background and Context
- Client: Tenant in Dubai Marina
- Issue: Landlord refusing to return AED 15,000 security deposit
- Duration: Lease ended 30 days ago

## Legal Analysis
According to Article 22 of Dubai Rental Law No. 26 of 2007, landlords must return security deposits within 14 days of lease termination...

## Findings and Recommendations
1. The landlord is in violation of Article 22
2. Tenant has legal grounds to file complaint with RDC
3. Recommended action: Send formal notice before RDC filing

## Legal Disclaimer
This report is for informational purposes only...
```

---

## How the Legal Context Works

### Legal Knowledge Base Integration

Before the AI responds, the system automatically injects relevant legal context:

```
**Legal Context (use as primary reference):**

[Rental Law 26/2007 Articles]
[RERA Regulations]
[Civil Code Provisions]
[Escrow Law Details]
[Practical Scenarios]
```

### Context Selection Logic

The system selects relevant laws based on the consultation category:

- **Rental Dispute** → Rental Law 26/2007, RERA procedures, RDC filing steps
- **Real Estate Transaction** → Property transfer laws, DLD procedures, escrow regulations
- **Contract Review** → All relevant laws for comprehensive analysis
- **General Inquiry** → Broad legal context

---

## Prompt Quality Assurance

### What Makes These Prompts Effective

✅ **Explicit Instructions**: Clear "must" and "always" directives
✅ **Structured Output**: Defined response format (70/30 split)
✅ **Citation Requirements**: Mandatory article references
✅ **Disclaimer Enforcement**: Required legal disclaimers
✅ **Bilingual Support**: Culturally appropriate Arabic legal terms
✅ **Context-Aware**: Injects relevant UAE/Dubai laws automatically

### What the Prompts Prevent

❌ **Casual Language**: "You might want to..." → "It is recommended that..."
❌ **Vague Advice**: "Check the law" → "Article 14 of Law No. 26 of 2007 states..."
❌ **Missing Disclaimers**: Always includes disclaimer when giving recommendations
❌ **Speculation**: If uncertain, AI must explicitly state limitations

---

## Testing the Prompts

### How to Verify Prompt Effectiveness

1. **Test Formal Tone**
   - Ask: "Can my landlord kick me out?"
   - Expected: Formal response with legal terminology, not casual language

2. **Test Citation Requirements**
   - Ask: "What's the notice period for eviction?"
   - Expected: Response includes "Article X of Law No. Y of YYYY"

3. **Test 70/30 Balance**
   - Ask: "What should I do about rent increase?"
   - Expected: Majority of response explains the law (70%), then provides recommendations (30%)

4. **Test Disclaimer**
   - Ask: "Should I file a case with RDC?"
   - Expected: Response ends with disclaimer about consulting licensed lawyer

5. **Test Bilingual Support**
   - Ask in Arabic: "ما هي حقوق المستأجر؟"
   - Expected: Formal Arabic legal terminology, not casual Arabic

---

## Prompt Comparison: Before vs After Enhancement

### Before Enhancement (Generic)
```
You are a legal consultant specializing in Dubai rental law.
Provide accurate advice and cite relevant laws.
```

**Problems:**
- No tone specification
- No citation format
- No disclaimer requirement
- No response structure

### After Enhancement (Detailed)
```
You are a legal consultant specializing in Dubai rental law.

**Your Mandatory Style:**
- Formal & legalistic (exactly like a traditional law firm)
- 70% legal information, 30% advisory recommendations
- Use official legal terminology
- Never use casual language

**Citation Rules:**
- Always cite complete law reference (e.g., "Article 14 of Law No. 26 of 2007")
- Provide article text when possible
- Explain how it applies to the case

**Mandatory Disclaimer:**
"Disclaimer: This information is for guidance only..."

**Response Instructions:**
- Begin with legal context (70%)
- Then provide recommendations (30%)
- End with disclaimer when giving advice
```

**Improvements:**
✅ Explicit tone requirements
✅ Defined citation format
✅ Mandatory disclaimer
✅ Clear response structure
✅ Percentage-based guidance

---

## LLM Provider Compatibility

### Works with Both Providers

The prompts are designed to work consistently across:

1. **Manus Built-in LLM** (default)
   - No setup required
   - Pre-configured credentials
   - Consistent performance

2. **Google Gemini API** (optional)
   - Requires API key setup
   - Better Arabic language support
   - Access to latest Gemini models

### Unified Interface

The `invokeUnifiedLLM()` function ensures:
- Same prompt format for both providers
- Automatic fallback (Gemini → Manus on error)
- Consistent response structure

---

## Key Takeaways

### What You Should Know

1. **The AI is NOT trained** - It uses prompt engineering with pre-trained models
2. **Legal context is injected** - 42 UAE/Dubai law articles provided in every prompt
3. **Strict formatting enforced** - 70% info / 30% advice, mandatory citations, required disclaimers
4. **Bilingual by design** - Separate prompts for English and Arabic with culturally appropriate terms
5. **Three prompt types** - Consultations, contract review, and report generation each have specialized prompts

### How to Modify Prompts

If you need to adjust the AI's behavior:

1. **Location**: `/home/ubuntu/paris_group_legal_ai/server/routers.ts`
2. **Search for**: `const systemPrompt = input.language === "ar"`
3. **Modify**: The English or Arabic prompt text
4. **Test**: Create a new consultation and verify changes

### Limitations to Remember

⚠️ **Not a replacement for lawyers** - Always include disclaimers
⚠️ **Context-dependent** - Quality depends on legal knowledge base accuracy
⚠️ **No case law** - System doesn't learn from actual court decisions
⚠️ **Hallucination risk** - LLMs can still generate incorrect information despite prompts

---

## Conclusion

The enhanced prompts ensure the Paris Group Legal AI behaves like a professional legal consultant by:

- Enforcing formal, legalistic tone
- Requiring specific UAE/Dubai law citations
- Balancing information (70%) with recommendations (30%)
- Including mandatory disclaimers
- Supporting bilingual responses with proper legal terminology

These prompts transform a general-purpose LLM into a specialized legal assistant that follows Paris Group's professional standards.
