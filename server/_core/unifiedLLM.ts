import { invokeLLM } from "./llm";
import { invokeGemini, invokeGeminiStructured } from "./gemini";

/**
 * Unified LLM interface that supports multiple providers
 * Allows switching between Manus built-in LLM and Google Gemini
 */

export type LLMProvider = "manus" | "gemini";

export interface UnifiedLLMParams {
  messages: Array<{ role: string; content: string | any }>;
  provider?: LLMProvider;
  response_format?: {
    type: string;
    json_schema?: any;
  };
  tool_choice?: string;
  tools?: any[];
}

/**
 * Get the current LLM provider from environment or default to Manus
 */
export function getCurrentProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER?.toLowerCase();
  return provider === "gemini" ? "gemini" : "manus";
}

/**
 * Invoke LLM with automatic provider selection
 * Uses the provider specified in params, or falls back to environment variable, or defaults to Manus
 */
export async function invokeUnifiedLLM(params: UnifiedLLMParams) {
  const provider = params.provider || getCurrentProvider();
  
  console.log(`[Unified LLM] Using provider: ${provider}`);
  console.log(`[Unified LLM] GEMINI_API_KEY available: ${!!process.env.GEMINI_API_KEY}`);
  console.log(`[Unified LLM] LLM_PROVIDER env: ${process.env.LLM_PROVIDER}`);
  
  try {
    if (provider === "gemini") {
      console.log('[Unified LLM] Invoking Gemini provider...');
      const result = await invokeGeminiProvider(params);
      console.log('[Unified LLM] Gemini provider succeeded');
      return result;
    } else {
      console.log('[Unified LLM] Invoking Manus provider...');
      const result = await invokeManusProvider(params);
      console.log('[Unified LLM] Manus provider succeeded');
      return result;
    }
  } catch (error: any) {
    console.error(`[Unified LLM] Error with ${provider}:`, error.message);
    console.error(`[Unified LLM] Full error:`, error);
    
    // Fallback to Manus if Gemini fails
    if (provider === "gemini") {
      console.log("[Unified LLM] Falling back to Manus provider");
      try {
        const result = await invokeManusProvider(params);
        console.log('[Unified LLM] Manus fallback succeeded');
        return result;
      } catch (fallbackError: any) {
        console.error('[Unified LLM] Manus fallback also failed:', fallbackError.message);
        throw fallbackError;
      }
    }
    
    throw error;
  }
}

/**
 * Invoke Manus built-in LLM
 */
async function invokeManusProvider(params: UnifiedLLMParams) {
  return invokeLLM({
    messages: params.messages as any,
    response_format: params.response_format as any,
    tool_choice: params.tool_choice as any,
    tools: params.tools,
  });
}

/**
 * Invoke Google Gemini API
 */
async function invokeGeminiProvider(params: UnifiedLLMParams) {
  // Check if structured output is requested
  if (params.response_format?.type === "json_schema") {
    return await invokeGeminiStructured({
      messages: params.messages.map(msg => ({
        role: msg.role,
        content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
      })),
      schema: params.response_format.json_schema?.schema,
    });
  }
  
  // Standard text generation
  return await invokeGemini({
    messages: params.messages.map(msg => ({
      role: msg.role,
      content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
    })),
  });
}

/**
 * Get provider information for display
 */
export function getProviderInfo(provider?: LLMProvider) {
  const actualProvider = provider || getCurrentProvider();
  
  const info = {
    manus: {
      name: "Manus Built-in LLM",
      description: "Pre-configured LLM with no setup required",
      features: ["Fast response", "No API key needed", "Structured output support"],
      status: "active",
    },
    gemini: {
      name: "Google Gemini",
      description: "Google's advanced AI model with superior multilingual support",
      features: ["Excellent Arabic support", "Latest AI capabilities", "Large context window"],
      status: process.env.GEMINI_API_KEY ? "active" : "requires_api_key",
    },
  };
  
  return info[actualProvider];
}

/**
 * Check if a provider is available
 */
export function isProviderAvailable(provider: LLMProvider): boolean {
  if (provider === "manus") {
    return true; // Always available
  }
  
  if (provider === "gemini") {
    return !!process.env.GEMINI_API_KEY;
  }
  
  return false;
}

/**
 * Get list of available providers
 */
export function getAvailableProviders(): Array<{
  id: LLMProvider;
  name: string;
  available: boolean;
  current: boolean;
}> {
  const currentProvider = getCurrentProvider();
  
  return [
    {
      id: "manus",
      name: "Manus Built-in LLM",
      available: true,
      current: currentProvider === "manus",
    },
    {
      id: "gemini",
      name: "Google Gemini",
      available: isProviderAvailable("gemini"),
      current: currentProvider === "gemini",
    },
  ];
}
