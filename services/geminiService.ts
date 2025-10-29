
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { Theme } from '../types';

// This instance is a fallback for when no session key is provided,
// or when running in a secure environment where process.env.API_KEY is set.
const API_KEY_ENV = process.env.API_KEY;
const ai_env = API_KEY_ENV ? new GoogleGenAI({ apiKey: API_KEY_ENV }) : null;

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


const model = 'gemini-2.5-flash';

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