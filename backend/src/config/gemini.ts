import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
  console.warn('⚠️  GEMINI_API_KEY is not set. AI features will not work.');
}

export const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: { 'User-Agent': 'u-think-backend' },
  },
});

/** Retry helper for 503 overload errors */
export async function generateWithRetry(
  model: any,
  config: any,
  maxRetries = 5
): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await model.generateContent(config);
    } catch (error: any) {
      const is503 =
        error?.code === 503 ||
        error?.status === 503 ||
        error?.message?.includes('503');
      if (is503 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
        console.warn(
          `Retrying AI call (503), attempt ${i + 1}/${maxRetries}. Delay: ${Math.round(delay)}ms`
        );
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
}
