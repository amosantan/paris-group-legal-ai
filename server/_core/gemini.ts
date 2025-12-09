import axios from "axios";

/**
 * Google Gemini API integration for Paris Group Legal AI
 * Provides an alternative LLM provider to the built-in Manus LLM
 */

export interface GeminiMessage {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
      role: string;
    };
    finishReason: string;
  }>;
}

/**
 * Convert standard message format to Gemini format
 */
function convertToGeminiMessages(messages: Array<{ role: string; content: string }>): GeminiMessage[] {
  const geminiMessages: GeminiMessage[] = [];
  
  for (const msg of messages) {
    // Gemini uses "model" instead of "assistant" or "system"
    const role = msg.role === "user" ? "user" : "model";
    
    geminiMessages.push({
      role,
      parts: [{ text: msg.content }],
    });
  }
  
  return geminiMessages;
}

/**
 * Invoke Google Gemini API
 * 
 * @param messages - Array of messages in standard format
 * @param apiKey - Gemini API key (optional, reads from env if not provided)
 * @param model - Gemini model to use (default: gemini-1.5-pro)
 * @returns Response in standard format compatible with Manus LLM
 */
export async function invokeGemini(params: {
  messages: Array<{ role: string; content: string }>;
  apiKey?: string;
  model?: string;
}) {
  const apiKey = params.apiKey || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("Gemini API key not found. Please set GEMINI_API_KEY environment variable.");
  }
  
  const model = params.model || "gemini-1.5-pro";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  
  // Convert messages to Gemini format
  const geminiMessages = convertToGeminiMessages(params.messages);
  
  // Separate system message (first message) from conversation
  const systemInstruction = params.messages[0]?.role === "system" 
    ? params.messages[0].content 
    : undefined;
  
  const conversationMessages = systemInstruction 
    ? geminiMessages.slice(1) 
    : geminiMessages;
  
  try {
    const response = await axios.post<GeminiResponse>(
      endpoint,
      {
        contents: conversationMessages,
        systemInstruction: systemInstruction ? {
          parts: [{ text: systemInstruction }]
        } : undefined,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: apiKey,
        },
      }
    );
    
    // Convert Gemini response to standard format (compatible with Manus LLM)
    const content = response.data.candidates[0]?.content?.parts[0]?.text || "";
    
    return {
      choices: [
        {
          message: {
            role: "assistant" as const,
            content,
          },
          finish_reason: response.data.candidates[0]?.finishReason || "stop",
        },
      ],
    };
  } catch (error: any) {
    console.error("[Gemini API] Error:", error.response?.data || error.message);
    throw new Error(`Gemini API error: ${error.response?.data?.error?.message || error.message}`);
  }
}

/**
 * Invoke Gemini with structured JSON output
 * Note: Gemini's JSON mode is different from OpenAI's, this is a best-effort implementation
 */
export async function invokeGeminiStructured(params: {
  messages: Array<{ role: string; content: string }>;
  schema: any;
  apiKey?: string;
  model?: string;
}) {
  // Add JSON formatting instruction to the last user message
  const modifiedMessages = [...params.messages];
  const lastMessage = modifiedMessages[modifiedMessages.length - 1];
  
  if (lastMessage && lastMessage.role === "user") {
    lastMessage.content += `\n\nIMPORTANT: Respond with ONLY valid JSON matching this schema:\n${JSON.stringify(params.schema, null, 2)}\n\nDo not include any text before or after the JSON.`;
  }
  
  return invokeGemini({
    messages: modifiedMessages,
    apiKey: params.apiKey,
    model: params.model,
  });
}
