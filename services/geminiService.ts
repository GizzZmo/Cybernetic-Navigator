/**
 * @fileoverview Google Gemini AI integration service for Cybernetic Navigator.
 * Provides AI-powered search, text summarization, and theme generation capabilities.
 * 
 * @module geminiService
 */

import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { Theme } from '../types';

/**
 * Environment API key from .env.local file.
 * This is a fallback for when no session key is provided.
 */
const API_KEY_ENV = process.env.API_KEY;

/**
 * Fallback AI client instance using environment variable API key.
 * Only initialized if API_KEY is set in environment.
 */
const ai_env = API_KEY_ENV ? new GoogleGenAI({ apiKey: API_KEY_ENV }) : null;

/**
 * Gets an AI client instance with the appropriate API key.
 * Prioritizes session API key over environment variable.
 * 
 * @param sessionApiKey - Optional API key from user settings
 * @returns GoogleGenAI instance or null if no API key is available
 */
const getAiClient = (sessionApiKey?: string): GoogleGenAI | null => {
  if (sessionApiKey) {
    try {
      return new GoogleGenAI({ apiKey: sessionApiKey });
    } catch (error) {
      console.error("Failed to initialize AI client with session key:", error);
      return null;
    }
  }
  return ai_env;
};

/**
 * The Gemini AI model to use for all requests.
 * @constant
 */
const model = 'gemini-2.5-flash';

/**
 * Performs AI-powered smart search on a user query.
 * Responds with contextual, cyberpunk-themed answers.
 * 
 * @param prompt - The user's search query or command
 * @param sessionApiKey - Optional API key from user settings
 * @returns Promise resolving to AI-generated response text or error message
 * 
 * @example
 * ```typescript
 * const result = await smartSearch("What is quantum computing?");
 * console.log(result); // AI explanation of quantum computing
 * ```
 */
export const smartSearch = async (prompt: string, sessionApiKey?: string): Promise<string> => {
  const ai = getAiClient(sessionApiKey);
  if (!ai) return "Error: API Key not configured. Please set it in the Settings panel or via host environment variables.";
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: `You are a futuristic AI assistant in a cyberpunk browser. Respond to the following user query: "${prompt}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Error in smartSearch:", error);
    return "Error: Could not connect to AI core. System might be offline or the API key is invalid.";
  }
};

/**
 * Summarizes long-form text into concise bullet points.
 * Optimized for cyberpunk interface display with clear, actionable summaries.
 * 
 * @param text - The text content to summarize
 * @param sessionApiKey - Optional API key from user settings
 * @returns Promise resolving to bulleted summary or error message
 * 
 * @example
 * ```typescript
 * const longArticle = "Lorem ipsum dolor sit amet...";
 * const summary = await summarizeText(longArticle);
 * console.log(summary); // • Key point 1\n• Key point 2\n• Key point 3
 * ```
 */
export const summarizeText = async (text: string, sessionApiKey?: string): Promise<string> => {
  const ai = getAiClient(sessionApiKey);
  if (!ai) return "Error: API Key not configured. Please set it in the Settings panel or via host environment variables.";
  
  if (!text.trim()) {
    return "No text provided to summarize.";
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: `Summarize the following text in a concise, bulleted list suitable for a cyberpunk interface:\n\n---\n${text}\n---`,
    });
    return response.text;
  } catch (error)
  {
    console.error("Error in summarizeText:", error);
    return "Error: Failed to process text. The AI summarization module is unresponsive or the API key is invalid.";
  }
};

/**
 * JSON schema definition for AI-generated themes.
 * Ensures consistent structure and validation of theme objects.
 * @constant
 */
const themeSchema = {
  type: Type.OBJECT,
  properties: {
    primaryColor: { type: Type.STRING, description: 'The primary neon color for UI elements like borders and highlights. Must be a hex code.' },
    accentColor: { type: Type.STRING, description: 'A secondary accent color for special elements. Must be a hex code.' },
    textColor: { type: Type.STRING, description: 'The main text color, usually a light color for dark backgrounds. Must be a hex code.' },
    backgroundColor: { type: Type.STRING, description: 'The main dark background color of the UI. Must be a hex code.' },
  },
  required: ["primaryColor", "accentColor", "textColor", "backgroundColor"]
};

/**
 * Generates a custom cyberpunk theme based on a text prompt.
 * Uses AI to create cohesive color schemes matching the description.
 * 
 * @param prompt - Description of desired theme (e.g., "neon green matrix style")
 * @param sessionApiKey - Optional API key from user settings
 * @returns Promise resolving to Theme object or null on failure
 * 
 * @example
 * ```typescript
 * const theme = await generateTheme("deep ocean with electric blue");
 * if (theme) {
 *   console.log(theme.primaryColor); // #00a8e8
 *   console.log(theme.accentColor);  // #00f3ff
 * }
 * ```
 */
export const generateTheme = async (prompt: string, sessionApiKey?: string): Promise<Theme | null> => {
  const ai = getAiClient(sessionApiKey);
  if (!ai) {
    console.error("API Key not configured.");
    return null;
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: `Generate a cyberpunk theme based on this prompt: "${prompt}". The theme should evoke a high-tech, futuristic feel.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: themeSchema,
      },
    });
    
    const themeText = response.text.trim();
    const jsonMatch = themeText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Failed to extract JSON from AI response:", themeText);
      return null;
    }

    const themeObject = JSON.parse(jsonMatch[0]);
    
    if (themeObject.primaryColor && themeObject.accentColor && themeObject.textColor && themeObject.backgroundColor) {
      return themeObject as Theme;
    }
    console.warn("Parsed JSON is missing required theme properties:", themeObject);
    return null;

  } catch (error) {
    console.error("Error in generateTheme:", error);
    return null;
  }
};