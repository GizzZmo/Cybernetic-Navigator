# API Documentation

This document provides detailed information about the Cybernetic Navigator's API integration and service layer.

## Table of Contents

- [Overview](#overview)
- [Google Gemini AI Integration](#google-gemini-ai-integration)
- [Service Functions](#service-functions)
- [API Configuration](#api-configuration)
- [Error Handling](#error-handling)
- [Usage Examples](#usage-examples)

## Overview

Cybernetic Navigator uses Google's Gemini AI API to power its intelligent features. All AI interactions are handled through the `geminiService.ts` module, which provides a clean abstraction layer for AI operations.

## Google Gemini AI Integration

### Dependencies

The project uses the official Google Gemini AI SDK:
```json
"@google/genai": "^1.11.0"
```

### Supported Model

- **Model:** `gemini-2.5-flash`
- **Provider:** Google AI
- **Capabilities:** Text generation, structured output, content understanding

## Service Functions

### `smartSearch(prompt: string, sessionApiKey?: string): Promise<string>`

Performs AI-powered search and responds to user queries.

**Parameters:**
- `prompt` (string): The user's search query or command
- `sessionApiKey` (string, optional): User-provided API key from settings

**Returns:**
- `Promise<string>`: AI-generated response text

**Behavior:**
- Sends the prompt to Gemini AI with a cyberpunk assistant persona
- Returns helpful, contextual responses
- Handles errors gracefully with user-friendly messages

**Example:**
```typescript
const response = await smartSearch("What is quantum computing?");
console.log(response); // Detailed explanation of quantum computing
```

**Error Messages:**
- `"Error: API Key not configured..."` - When no API key is available
- `"Error: Could not connect to AI core..."` - When API call fails

---

### `summarizeText(text: string, sessionApiKey?: string): Promise<string>`

Summarizes long-form text into concise bullet points.

**Parameters:**
- `text` (string): The text content to summarize
- `sessionApiKey` (string, optional): User-provided API key from settings

**Returns:**
- `Promise<string>`: Bulleted summary of the input text

**Behavior:**
- Validates that text is provided
- Sends text to Gemini AI for summarization
- Returns results formatted as bullet points
- Optimized for cyberpunk interface display

**Example:**
```typescript
const longArticle = "Lorem ipsum dolor sit amet...";
const summary = await summarizeText(longArticle);
console.log(summary); // • Key point 1\n• Key point 2\n• Key point 3
```

**Error Messages:**
- `"Error: API Key not configured..."` - When no API key is available
- `"No text provided to summarize."` - When text parameter is empty
- `"Error: Failed to process text..."` - When API call fails

---

### `generateTheme(prompt: string, sessionApiKey?: string): Promise<Theme | null>`

Generates a custom cyberpunk color theme based on a text prompt.

**Parameters:**
- `prompt` (string): Description of desired theme (e.g., "neon green matrix")
- `sessionApiKey` (string, optional): User-provided API key from settings

**Returns:**
- `Promise<Theme | null>`: Theme object or null on failure

**Theme Interface:**
```typescript
interface Theme {
  primaryColor: string;   // Hex color for primary UI elements
  accentColor: string;    // Hex color for accents
  textColor: string;      // Hex color for text
  backgroundColor: string; // Hex color for background
}
```

**Behavior:**
- Uses structured JSON output from Gemini AI
- Validates all required theme properties exist
- Ensures colors are in hex format
- Returns null on any validation failure

**Example:**
```typescript
const theme = await generateTheme("deep ocean with electric blue");
if (theme) {
  console.log(theme.primaryColor); // #00a8e8 (example)
  console.log(theme.accentColor);  // #00f3ff (example)
}
```

**Error Handling:**
- Returns `null` if API key not configured
- Returns `null` if JSON parsing fails
- Returns `null` if required properties missing
- Logs errors to console for debugging

---

## API Configuration

### Environment Variable Method

Create a `.env.local` file in the project root:

```env
API_KEY=your_gemini_api_key_here
```

**How it works:**
- Read by Vite during build/dev
- Accessed via `process.env.API_KEY`
- Used as fallback when user hasn't configured session key
- **Security:** File is gitignored, never committed

**Pros:**
- Set once, works across all sessions
- Good for development
- No user configuration needed

**Cons:**
- Not suitable for production deployment
- Shared across all users (if deployed)
- Requires rebuild to change

### Session API Key Method

Users can configure their own API key through the Settings panel.

**How it works:**
- User enters key in Settings panel UI
- Stored in browser's localStorage
- Key: `cyber-navigator-apikey`
- Persists across sessions
- Takes priority over environment variable

**Pros:**
- Each user uses their own API quota
- No shared API costs
- Easy to change without rebuild
- Suitable for production deployment

**Cons:**
- Requires user to obtain API key
- Stored in browser (cleared if cache cleared)
- Must be re-entered on different devices

### Priority Order

The service uses this priority:
1. **Session API Key** (from localStorage) - if provided
2. **Environment Variable** (from `.env.local`) - if set
3. **None** - returns error message

```typescript
const getAiClient = (sessionApiKey?: string): GoogleGenAI | null => {
  if (sessionApiKey) {
    return new GoogleGenAI({ apiKey: sessionApiKey });
  }
  return ai_env; // From environment variable
};
```

## Error Handling

### Common Error Scenarios

#### No API Key Configured
```typescript
if (!ai) return "Error: API Key not configured. Please set it in the Settings panel or via host environment variables.";
```

**User Action:** Configure API key in Settings or add to `.env.local`

#### Invalid API Key
```
Error: Could not connect to AI core. System might be offline or the API key is invalid.
```

**User Action:** Verify API key is correct and active

#### Network Error
```
Error: Could not connect to AI core. System might be offline...
```

**User Action:** Check internet connection

#### Empty Input
```
No text provided to summarize.
```

**User Action:** Provide text content

### Error Handling Best Practices

All service functions:
- ✅ Use try-catch blocks for API calls
- ✅ Return user-friendly error messages
- ✅ Log detailed errors to console for debugging
- ✅ Never expose API keys in error messages
- ✅ Provide actionable feedback to users

## Usage Examples

### Complete Search Flow

```typescript
import { smartSearch } from './services/geminiService';

const handleUserSearch = async (query: string) => {
  const apiKey = localStorage.getItem('cyber-navigator-apikey');
  
  try {
    const result = await smartSearch(query, apiKey || undefined);
    
    if (result.startsWith("Error:")) {
      // Handle error case
      showErrorNotification(result);
    } else {
      // Display successful result
      displaySearchResult(result);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    showErrorNotification("An unexpected error occurred");
  }
};
```

### Complete Summarization Flow

```typescript
import { summarizeText } from './services/geminiService';

const handleSummarize = async (text: string) => {
  if (!text.trim()) {
    alert("Please provide text to summarize");
    return;
  }

  const apiKey = localStorage.getItem('cyber-navigator-apikey');
  setLoading(true);
  
  try {
    const summary = await summarizeText(text, apiKey || undefined);
    
    if (!summary.startsWith("Error:")) {
      // Save to history
      saveSummaryToHistory(text, summary);
      displaySummary(summary);
    } else {
      showError(summary);
    }
  } finally {
    setLoading(false);
  }
};
```

### Complete Theme Generation Flow

```typescript
import { generateTheme } from './services/geminiService';
import type { Theme } from './types';

const handleGenerateTheme = async (prompt: string) => {
  const apiKey = localStorage.getItem('cyber-navigator-apikey');
  setLoading(true);
  
  try {
    const newTheme: Theme | null = await generateTheme(prompt, apiKey || undefined);
    
    if (newTheme) {
      // Apply theme to application
      applyTheme(newTheme);
      showSuccess("Theme generated successfully!");
    } else {
      showError("Failed to generate theme. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};
```

## Rate Limiting & Quotas

### Google Gemini API Limits

- **Free Tier:** 60 requests per minute
- **Rate Limit:** Varies by plan
- **Quota:** Check [Google AI Studio](https://ai.google.dev/) for your limits

### Best Practices

1. **Debounce rapid requests** - Don't spam the API
2. **Show loading states** - Inform users of ongoing operations
3. **Cache responses** when appropriate (e.g., theme history)
4. **Handle rate limit errors** gracefully
5. **Inform users** if they hit quota limits

## Security Considerations

### API Key Storage

- ✅ **Never commit** API keys to version control
- ✅ Use `.env.local` for development (gitignored)
- ✅ Store user keys in localStorage (client-side only)
- ✅ **Never send** API keys to any server
- ⚠️ Be aware localStorage can be accessed by browser extensions

### API Key Validation

The service does **not** validate API keys before use. Invalid keys will result in API errors, which are handled gracefully and shown to the user.

### Best Practices

1. **Educate users** to keep their API keys private
2. **Clear instructions** on obtaining API keys
3. **Option to delete** stored API keys
4. Consider implementing **key rotation** reminders

## Advanced Usage

### Custom AI Client Configuration

You can extend the service to support additional configurations:

```typescript
const ai = new GoogleGenAI({ 
  apiKey: sessionApiKey,
  // Additional config options here
});
```

### Model Selection

To use a different model, update the `model` constant:

```typescript
const model = 'gemini-2.5-flash'; // Current
// or
const model = 'gemini-pro';       // Alternative
```

### Custom Response Schemas

The theme generator uses a custom schema. You can create similar structured outputs:

```typescript
const customSchema = {
  type: Type.OBJECT,
  properties: {
    field1: { type: Type.STRING, description: 'Description' },
    field2: { type: Type.NUMBER, description: 'Description' },
  },
  required: ["field1", "field2"]
};
```

## Troubleshooting

### "API Key not configured" Error

**Solution:**
1. Verify `.env.local` exists with `API_KEY=your_key`
2. Or configure in Settings panel
3. Restart dev server after adding `.env.local`

### "Could not connect to AI core" Error

**Solution:**
1. Verify API key is valid
2. Check internet connection
3. Verify Google AI services are operational
4. Check browser console for detailed errors

### Theme Generation Returns Null

**Solution:**
1. Try a more specific prompt
2. Check console for JSON parsing errors
3. Verify API key has appropriate permissions

---

For more information, visit:
- [Google Gemini AI Documentation](https://ai.google.dev/)
- [Project README](../README.md)
- [Component Documentation](./COMPONENTS.md)
