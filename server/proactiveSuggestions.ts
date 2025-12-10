import { invokeUnifiedLLM } from "./_core/unifiedLLM";
import { ConversationContext } from "./conversationMemory";
import { caseLawDatabase } from "./caseLawDatabase";
// Legal knowledge base is available via search functions

/**
 * Proactive Suggestion System
 * 
 * Analyzes consultation context to provide helpful suggestions:
 * - Missing information that should be collected
 * - Related legal topics to consider
 * - Relevant case precedents
 * - Next steps in the legal process
 */

export interface ProactiveSuggestion {
  type: "missing_info" | "related_topic" | "case_precedent" | "next_step";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  actionable: boolean;
}

/**
 * Generate proactive suggestions based on conversation context
 */
export async function generateProactiveSuggestions(
  consultationCategory: string,
  conversationContext: ConversationContext,
  lastUserMessage: string
): Promise<ProactiveSuggestion[]> {
  const suggestions: ProactiveSuggestion[] = [];

  // 1. Check for missing critical information
  const missingInfoSuggestions = await identifyMissingInformation(
    consultationCategory,
    conversationContext
  );
  suggestions.push(...missingInfoSuggestions);

  // 2. Suggest related legal topics
  const relatedTopicSuggestions = suggestRelatedTopics(
    consultationCategory,
    conversationContext,
    lastUserMessage
  );
  suggestions.push(...relatedTopicSuggestions);

  // 3. Recommend relevant case precedents
  const casePrecedentSuggestions = recommendCasePrecedents(
    consultationCategory,
    conversationContext
  );
  suggestions.push(...casePrecedentSuggestions);

  // 4. Suggest next steps in legal process
  const nextStepSuggestions = await suggestNextSteps(
    consultationCategory,
    conversationContext
  );
  suggestions.push(...nextStepSuggestions);

  // Sort by priority
  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Identify missing critical information based on consultation type
 */
async function identifyMissingInformation(
  category: string,
  context: ConversationContext
): Promise<ProactiveSuggestion[]> {
  const suggestions: ProactiveSuggestion[] = [];
  const facts = context.keyFacts;

  // Check for missing information based on category
  if (category === "rental_dispute") {
    const hasProperty = facts.some((f) => f.type === "property");
    const hasAmount = facts.some((f) => f.type === "amount");
    const hasDate = facts.some((f) => f.type === "date");
    const hasTenant = facts.some((f) => f.type === "person" && f.context.toLowerCase().includes("tenant"));
    const hasLandlord = facts.some((f) => f.type === "person" && f.context.toLowerCase().includes("landlord"));

    if (!hasProperty) {
      suggestions.push({
        type: "missing_info",
        title: "Property Address Missing",
        description: "Please provide the property address or description for more specific legal advice.",
        priority: "high",
        actionable: true,
      });
    }

    if (!hasAmount) {
      suggestions.push({
        type: "missing_info",
        title: "Rent Amount Not Specified",
        description: "Knowing the rent amount helps determine applicable regulations and calculate potential damages.",
        priority: "medium",
        actionable: true,
      });
    }

    if (!hasDate) {
      suggestions.push({
        type: "missing_info",
        title: "Relevant Dates Missing",
        description: "Please provide key dates (lease start, notice date, payment due date) for timeline analysis.",
        priority: "medium",
        actionable: true,
      });
    }

    if (!hasTenant || !hasLandlord) {
      suggestions.push({
        type: "missing_info",
        title: "Party Names Not Provided",
        description: "Tenant and landlord names are needed for document preparation and legal filings.",
        priority: "low",
        actionable: true,
      });
    }
  }

  if (category === "real_estate_transaction") {
    const hasProperty = facts.some((f) => f.type === "property");
    const hasAmount = facts.some((f) => f.type === "amount");
    const hasBuyer = facts.some((f) => f.type === "person" && f.context.toLowerCase().includes("buyer"));
    const hasSeller = facts.some((f) => f.type === "person" && f.context.toLowerCase().includes("seller"));

    if (!hasProperty) {
      suggestions.push({
        type: "missing_info",
        title: "Property Details Missing",
        description: "Property address, type, and size are essential for transaction advice.",
        priority: "high",
        actionable: true,
      });
    }

    if (!hasAmount) {
      suggestions.push({
        type: "missing_info",
        title: "Transaction Amount Not Specified",
        description: "Sale price or property value is needed to calculate fees and assess financial implications.",
        priority: "high",
        actionable: true,
      });
    }

    if (!hasBuyer || !hasSeller) {
      suggestions.push({
        type: "missing_info",
        title: "Party Information Incomplete",
        description: "Buyer and seller details are required for contract preparation and registration.",
        priority: "medium",
        actionable: true,
      });
    }
  }

  return suggestions;
}

/**
 * Suggest related legal topics based on conversation
 */
function suggestRelatedTopics(
  category: string,
  context: ConversationContext,
  lastMessage: string
): ProactiveSuggestion[] {
  const suggestions: ProactiveSuggestion[] = [];
  const lowerMessage = lastMessage.toLowerCase();
  const summary = context.summary.toLowerCase();

  // Rental dispute related topics
  if (category === "rental_dispute") {
    if (lowerMessage.includes("evict") || summary.includes("evict")) {
      suggestions.push({
        type: "related_topic",
        title: "Eviction Notice Requirements",
        description: "Dubai Law 26/2007 requires specific notice periods. Have you served proper notice?",
        priority: "high",
        actionable: true,
      });
    }

    if (lowerMessage.includes("rent increase") || summary.includes("rent increase")) {
      suggestions.push({
        type: "related_topic",
        title: "Rent Increase Regulations",
        description: "RERA Decree 43/2013 limits rent increases. Check if the increase is within legal limits.",
        priority: "high",
        actionable: true,
      });
    }

    if (lowerMessage.includes("maintenance") || summary.includes("maintenance")) {
      suggestions.push({
        type: "related_topic",
        title: "Maintenance Responsibilities",
        description: "Article 16 of Law 26/2007 defines landlord vs tenant maintenance obligations.",
        priority: "medium",
        actionable: false,
      });
    }

    if (lowerMessage.includes("security deposit") || summary.includes("security deposit")) {
      suggestions.push({
        type: "related_topic",
        title: "Security Deposit Rules",
        description: "Learn about security deposit limits, deductions, and return timelines under Dubai law.",
        priority: "medium",
        actionable: false,
      });
    }
  }

  // Real estate transaction related topics
  if (category === "real_estate_transaction") {
    if (lowerMessage.includes("mortgage") || summary.includes("mortgage")) {
      suggestions.push({
        type: "related_topic",
        title: "Mortgage Registration",
        description: "Dubai Law 14/2008 governs mortgage registration. Consider mortgage discharge procedures.",
        priority: "high",
        actionable: true,
      });
    }

    if (lowerMessage.includes("foreign") || lowerMessage.includes("ownership")) {
      suggestions.push({
        type: "related_topic",
        title: "Foreign Ownership Restrictions",
        description: "Check if the property is in a freehold area. DIFC has different ownership rules.",
        priority: "high",
        actionable: true,
      });
    }

    if (lowerMessage.includes("title deed") || summary.includes("title deed")) {
      suggestions.push({
        type: "related_topic",
        title: "Title Deed Transfer",
        description: "Dubai Law 7/2006 governs property registration. Ensure all documents are in order.",
        priority: "medium",
        actionable: true,
      });
    }
  }

  // DIFC-specific suggestions
  if (lowerMessage.includes("difc") || summary.includes("difc")) {
    suggestions.push({
      type: "related_topic",
      title: "DIFC vs Mainland Dubai Laws",
      description: "DIFC has separate legal framework. Ensure you're applying the correct jurisdiction's laws.",
      priority: "high",
      actionable: false,
    });
  }

  return suggestions;
}

/**
 * Recommend relevant case precedents
 */
function recommendCasePrecedents(
  category: string,
  context: ConversationContext
): ProactiveSuggestion[] {
  const suggestions: ProactiveSuggestion[] = [];
  const summary = context.summary.toLowerCase();

  // Find relevant cases
  const relevantCases = caseLawDatabase.filter((c) => {
    if (category === "rental_dispute" && c.category === "rental_dispute") {
      return true;
    }
    if (category === "real_estate_transaction" && 
        c.category === "property_transfer") {
      return true;
    }
    if (c.category === "mortgage") {
      return true;
    }
    return false;
  });

  // Suggest top 2 most relevant cases
  relevantCases.slice(0, 2).forEach((caseItem) => {
    suggestions.push({
      type: "case_precedent",
      title: `Relevant Case: ${caseItem.caseNumber}`,
      description: `${caseItem.title} - ${caseItem.legalPrinciple.substring(0, 100)}...`,
      priority: "medium",
      actionable: false,
    });
  });

  return suggestions;
}

/**
 * Suggest next steps in legal process
 */
async function suggestNextSteps(
  category: string,
  context: ConversationContext
): Promise<ProactiveSuggestion[]> {
  const suggestions: ProactiveSuggestion[] = [];
  const summary = context.summary.toLowerCase();

  if (category === "rental_dispute") {
    if (summary.includes("non-payment") || summary.includes("arrears")) {
      suggestions.push({
        type: "next_step",
        title: "Send Demand Letter",
        description: "Before eviction, send a formal demand letter requesting payment within 30 days.",
        priority: "high",
        actionable: true,
      });
    }

    if (summary.includes("evict") || summary.includes("notice")) {
      suggestions.push({
        type: "next_step",
        title: "File RDC Case",
        description: "If notice period has expired, file an eviction case with the Rental Disputes Centre.",
        priority: "high",
        actionable: true,
      });
    }

    if (summary.includes("maintenance") || summary.includes("repair")) {
      suggestions.push({
        type: "next_step",
        title: "Document the Issue",
        description: "Take photos, get repair quotes, and send written notice to landlord/tenant.",
        priority: "medium",
        actionable: true,
      });
    }
  }

  if (category === "real_estate_transaction") {
    if (summary.includes("buy") || summary.includes("purchase")) {
      suggestions.push({
        type: "next_step",
        title: "Conduct Due Diligence",
        description: "Verify title deed, check for encumbrances, and review property history at Dubai Land Department.",
        priority: "high",
        actionable: true,
      });
    }

    if (summary.includes("mortgage")) {
      suggestions.push({
        type: "next_step",
        title: "Obtain No Objection Certificate",
        description: "Get NOC from developer/landlord before mortgage registration or property transfer.",
        priority: "high",
        actionable: true,
      });
    }
  }

  return suggestions;
}
