# Hybrid LLM System Guide

## Overview

The Paris Group Legal AI now supports **two LLM providers** that can be switched seamlessly:

1. **Manus Built-in LLM** - Pre-configured, no setup required
2. **Google Gemini** - Advanced AI with superior multilingual support

## Architecture

### Unified Interface

All LLM calls in the system go through a unified interface (`server/_core/unifiedLLM.ts`) that automatically routes requests to the configured provider. This ensures:

- **Seamless switching** between providers without code changes
- **Automatic fallback** from Gemini to Manus if errors occur
- **Consistent API** regardless of provider
- **Type safety** across all LLM interactions

### Provider Modules

**Manus LLM** (`server/_core/llm.ts`)
- Pre-configured with platform credentials
- Fast response times
- Structured JSON output support
- Always available

**Google Gemini** (`server/_core/gemini.ts`)
- Requires API key configuration
- Excellent Arabic language support
- 2M token context window
- Latest AI capabilities

## Configuration

### Method 1: Environment Variable (Recommended)

Set the `LLM_PROVIDER` environment variable to choose your provider:

```bash
# Use Manus (default)
LLM_PROVIDER=manus

# Use Google Gemini
LLM_PROVIDER=gemini
```

### Method 2: Automatic Detection

If `LLM_PROVIDER` is not set, the system defaults to **Manus**.

## Setting Up Google Gemini

### Step 1: Get API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### Step 2: Add to Manus

**Option A: Through UI (Recommended)**
1. Open your project in Manus
2. Go to Management UI → Settings → Secrets
3. Add new secret:
   - Key: `GEMINI_API_KEY`
   - Value: Your API key from Step 1

**Option B: Through Code (for development)**
1. Create `.env` file in project root
2. Add: `GEMINI_API_KEY=your_api_key_here`

### Step 3: Set Provider

Add another environment variable:
- Key: `LLM_PROVIDER`
- Value: `gemini`

### Step 4: Restart Server

Restart the development server for changes to take effect.

## Switching Providers

### Via Environment Variable

Change the `LLM_PROVIDER` value and restart:

```bash
# Switch to Gemini
LLM_PROVIDER=gemini

# Switch back to Manus
LLM_PROVIDER=manus
```

### Via LLM Settings UI

1. Sign in to the application
2. Navigate to **LLM Settings** from the sidebar
3. View current provider and available options
4. Follow instructions to configure Gemini if needed

## Provider Comparison

| Feature | Manus LLM | Google Gemini |
|---------|-----------|---------------|
| **Setup** | None required | API key needed |
| **Cost** | Included | Pay per use |
| **Arabic Support** | Good | Excellent |
| **Context Window** | 128K tokens | 2M tokens |
| **Response Speed** | Fast | Fast |
| **Availability** | Always | Requires key |
| **Structured Output** | Native | Best-effort |
| **Fallback** | N/A | Auto to Manus |

## Automatic Fallback

If Gemini is configured but encounters an error, the system automatically falls back to Manus LLM to ensure uninterrupted service:

```
[Unified LLM] Using provider: gemini
[Gemini API] Error: API key invalid
[Unified LLM] Falling back to Manus provider
```

This ensures your legal consultations continue working even if Gemini has issues.

## Code Examples

### Using Unified LLM in Backend

```typescript
import { invokeUnifiedLLM } from "./server/_core/unifiedLLM";

// Automatically uses configured provider
const response = await invokeUnifiedLLM({
  messages: [
    { role: "system", content: "You are a legal expert." },
    { role: "user", content: "Explain rental law." }
  ]
});
```

### Checking Current Provider

```typescript
import { getCurrentProvider, isProviderAvailable } from "./server/_core/unifiedLLM";

const provider = getCurrentProvider(); // "manus" or "gemini"
const geminiAvailable = isProviderAvailable("gemini"); // true/false
```

### Getting Provider Info

```typescript
import { getProviderInfo } from "./server/_core/unifiedLLM";

const info = getProviderInfo("gemini");
console.log(info.name); // "Google Gemini"
console.log(info.features); // Array of features
```

## API Routes

The system provides tRPC routes for provider management:

### `llmProvider.getCurrent`
Returns current provider and its information.

```typescript
const { provider, info } = await trpc.llmProvider.getCurrent.useQuery();
```

### `llmProvider.getAvailable`
Returns list of all providers with availability status.

```typescript
const providers = await trpc.llmProvider.getAvailable.useQuery();
```

### `llmProvider.getInfo`
Get detailed information about a specific provider.

```typescript
const info = await trpc.llmProvider.getInfo.useQuery({ provider: "gemini" });
```

## When to Use Each Provider

### Use Manus LLM When:
- You want zero configuration
- Cost is a concern
- You need guaranteed availability
- Standard legal analysis is sufficient

### Use Google Gemini When:
- You need superior Arabic language support
- You're handling very long documents (>128K tokens)
- You want the latest AI capabilities
- You need advanced reasoning for complex cases

## Troubleshooting

### Gemini Not Working

**Problem**: Gemini returns errors or falls back to Manus

**Solutions**:
1. Verify `GEMINI_API_KEY` is set correctly
2. Check API key is valid at Google AI Studio
3. Ensure you have API quota remaining
4. Check network connectivity to Google services

### Provider Not Switching

**Problem**: Changes to `LLM_PROVIDER` not taking effect

**Solutions**:
1. Restart the development server
2. Clear browser cache and reload
3. Verify environment variable is set correctly
4. Check server logs for provider detection

### Arabic Responses Poor Quality

**Problem**: Arabic legal responses are not accurate

**Solution**: Switch to Gemini for better Arabic support:
```bash
LLM_PROVIDER=gemini
```

## Best Practices

1. **Start with Manus**: Use the default Manus provider initially
2. **Test Gemini**: Try Gemini for Arabic consultations to compare quality
3. **Monitor Costs**: Track Gemini API usage if cost is a concern
4. **Use Fallback**: Rely on automatic fallback for production reliability
5. **Document Choice**: Note which provider works best for your use cases

## Security Notes

- **Never commit API keys** to version control
- Store `GEMINI_API_KEY` in environment variables or secrets management
- Use Manus Secrets UI for production deployments
- Rotate API keys periodically
- Monitor API usage for unexpected spikes

## Future Enhancements

Potential improvements to the hybrid system:

- **Per-consultation provider selection**: Choose provider for each consultation
- **A/B testing**: Compare provider responses side-by-side
- **Cost tracking**: Monitor Gemini API costs within the app
- **Performance metrics**: Track response times and quality scores
- **Additional providers**: Support for Claude, GPT-4, etc.

## Support

For issues with:
- **Manus LLM**: Contact Manus support
- **Google Gemini**: Check [Google AI documentation](https://ai.google.dev/docs)
- **Integration issues**: Review this guide or check server logs

---

**Version**: 1.0  
**Last Updated**: December 2024  
**System**: Paris Group Legal AI
