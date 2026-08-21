import { ai, generateWithRetry } from '../config/gemini.js';

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  const model = ai.models;
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return "This is a simulated AI mentor response because the real Gemini API key is not configured.";
  }
  
  const response = await generateWithRetry(model, {
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  
  return response.text || 'I am sorry, I am currently unable to answer. Please try again.';
};
