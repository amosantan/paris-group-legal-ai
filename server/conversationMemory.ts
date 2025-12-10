import { invokeUnifiedLLM } from "./_core/unifiedLLM";

/**
 * Conversation Memory System
 * 
 * Tracks key information across messages in a consultation to provide context-aware responses.
 * Extracts and stores: names, dates, amounts, property details, legal issues, and previous decisions.
 */

export interface ConversationContext {
  consultationId: number;
  keyFacts: KeyFact[];
  summary: string;
  lastUpdated: Date;
}

export interface KeyFact {
  type: "person" | "date" | "amount" | "property" | "legal_issue" | "decision";
  value: string;
  context: string; // Where/how this fact was mentioned
  messageId?: number;
}

/**
 * Extract key facts from a conversation message
 */
export async function extractKeyFacts(
  message: string,
  role: "user" | "assistant"
): Promise<KeyFact[]> {
  const extractionPrompt = `Extract key facts from this legal consultation message. Return ONLY a JSON array of facts.

Message: "${message}"

Extract:
- People's names (type: "person")
- Dates (type: "date") 
- Monetary amounts (type: "amount")
- Property addresses/descriptions (type: "property")
- Legal issues mentioned (type: "legal_issue")
- Decisions or conclusions (type: "decision")

Format: [{"type": "person", "value": "John Smith", "context": "tenant"}, ...]

Return empty array [] if no facts found.`;

  try {
    const response = await invokeUnifiedLLM({
      messages: [
        { role: "system", content: "You are a fact extraction assistant. Return only valid JSON arrays." },
        { role: "user", content: extractionPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "key_facts",
          strict: true,
          schema: {
            type: "object",
            properties: {
              facts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: ["person", "date", "amount", "property", "legal_issue", "decision"],
                    },
                    value: { type: "string" },
                    context: { type: "string" },
                  },
                  required: ["type", "value", "context"],
                  additionalProperties: false,
                },
              },
            },
            required: ["facts"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      const parsed = JSON.parse(content);
      return parsed.facts || [];
    }
    return [];
  } catch (error) {
    console.error("Error extracting key facts:", error);
    return [];
  }
}

/**
 * Generate a conversation summary from message history
 */
export async function generateConversationSummary(
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  if (messages.length === 0) return "";

  const summaryPrompt = `Summarize this legal consultation conversation in 2-3 sentences. Focus on:
- Main legal issue
- Key facts mentioned
- Current status/conclusion

Conversation:
${messages.map((m) => `${m.role}: ${m.content}`).join("\n\n")}

Summary:`;

  try {
    const response = await invokeUnifiedLLM({
      messages: [
        { role: "system", content: "You are a legal consultation summarizer. Be concise and factual." },
        { role: "user", content: summaryPrompt },
      ],
    });

    return (
      (typeof response.choices[0]?.message?.content === "string"
        ? response.choices[0]?.message?.content
        : "") || "No summary available"
    );
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error generating summary";
  }
}

/**
 * Build context string from key facts for AI prompts
 */
export function buildContextString(facts: KeyFact[]): string {
  if (facts.length === 0) return "";

  const grouped: Record<string, string[]> = {};
  facts.forEach((fact) => {
    if (!grouped[fact.type]) grouped[fact.type] = [];
    grouped[fact.type].push(`${fact.value} (${fact.context})`);
  });

  const sections: string[] = [];

  if (grouped.person) {
    sections.push(`People: ${grouped.person.join(", ")}`);
  }
  if (grouped.property) {
    sections.push(`Property: ${grouped.property.join(", ")}`);
  }
  if (grouped.amount) {
    sections.push(`Amounts: ${grouped.amount.join(", ")}`);
  }
  if (grouped.date) {
    sections.push(`Dates: ${grouped.date.join(", ")}`);
  }
  if (grouped.legal_issue) {
    sections.push(`Legal Issues: ${grouped.legal_issue.join(", ")}`);
  }
  if (grouped.decision) {
    sections.push(`Decisions: ${grouped.decision.join(", ")}`);
  }

  return sections.join("\n");
}

/**
 * Merge new facts with existing facts, avoiding duplicates
 */
export function mergeFacts(existing: KeyFact[], newFacts: KeyFact[]): KeyFact[] {
  const merged = [...existing];

  for (const newFact of newFacts) {
    const isDuplicate = existing.some(
      (f) =>
        f.type === newFact.type &&
        f.value.toLowerCase() === newFact.value.toLowerCase()
    );

    if (!isDuplicate) {
      merged.push(newFact);
    }
  }

  return merged;
}

/**
 * Get conversation context for a consultation
 * This aggregates all key facts from the conversation history
 */
export async function getConversationContext(
  consultationId: number,
  messages: Array<{ id: number; role: string; content: string }>
): Promise<ConversationContext> {
  let allFacts: KeyFact[] = [];

  // Extract facts from recent messages (last 20 to avoid token limits)
  const recentMessages = messages.slice(-20);
  
  for (const msg of recentMessages) {
    if (msg.role === "user" || msg.role === "assistant") {
      const facts = await extractKeyFacts(
        msg.content,
        msg.role as "user" | "assistant"
      );
      facts.forEach((f) => (f.messageId = msg.id));
      allFacts = mergeFacts(allFacts, facts);
    }
  }

  // Generate summary
  const summary = await generateConversationSummary(
    recentMessages.map((m) => ({ role: m.role, content: m.content }))
  );

  return {
    consultationId,
    keyFacts: allFacts,
    summary,
    lastUpdated: new Date(),
  };
}

/**
 * Add conversation context to system prompt
 */
export function enhancePromptWithContext(
  systemPrompt: string,
  context: ConversationContext
): string {
  if (context.keyFacts.length === 0) {
    return systemPrompt;
  }

  const contextString = buildContextString(context.keyFacts);
  const enhancedPrompt = `${systemPrompt}

CONVERSATION CONTEXT:
The following key information has been mentioned in this conversation:

${contextString}

When responding, reference this context naturally and avoid asking for information already provided.`;

  return enhancedPrompt;
}
