import { Request, Response, NextFunction } from 'express';
import { ai } from '../services/geminiService.js';
import crypto from 'crypto';

// Simple in-memory cache for translations (In a real app, use Redis or MongoDB)
const translationCache: Record<string, string> = {};

/**
 * Middleware that intercepts JSON responses and translates string values if a target language is requested.
 */
export const aiTranslationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const targetLang = req.headers['x-language'] as string;
  
  if (!targetLang || targetLang === 'en') {
    return next();
  }

  // Intercept res.json
  const originalJson = res.json;
  
  res.json = function (body: any): Response {
    // Only attempt to translate if body is an object or array and not a buffer/stream
    if (typeof body === 'object' && body !== null) {
      
      // We must restore original json immediately to prevent double interception
      res.json = originalJson;
      
      // Async IIFE to handle the translation
      (async () => {
        try {
          const jsonString = JSON.stringify(body);
          
          // Generate a cache key based on language and content
          const hash = crypto.createHash('md5').update(jsonString).digest('hex');
          const cacheKey = `${targetLang}_${hash}`;
          
          if (translationCache[cacheKey]) {
            console.log(`[i18n] Cache hit for ${targetLang}`);
            return originalJson.call(this, JSON.parse(translationCache[cacheKey]));
          }

          console.log(`[i18n] Translating response to ${targetLang}...`);
          
          // Using Gemini to translate JSON keys/values while preserving structure
          const prompt = `You are a professional API translation layer. 
          Translate the string values in the following JSON to the language code: "${targetLang}". 
          IMPORTANT RULES:
          1. Keep all JSON keys exactly the same in English.
          2. Keep the exact same JSON structure (arrays, nested objects).
          3. Do not translate IDs, URLs, ISO dates, or system constants (like 'PENDING', 'APPROVED').
          4. Return ONLY valid JSON, nothing else. No markdown wrappers.
          
          JSON to translate:
          ${jsonString.substring(0, 8000)} // Truncating if too large just for safety
          `;

          const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
              temperature: 0.1,
            }
          });

          let translatedText = result.text || '';
          translatedText = translatedText.replace(/```json/g, '').replace(/```/g, '').trim();
          
          const translatedObj = JSON.parse(translatedText);
          
          // Cache the translation
          translationCache[cacheKey] = JSON.stringify(translatedObj);
          
          return originalJson.call(this, translatedObj);
        } catch (error) {
          console.error(`[i18n] Translation failed, falling back to original. Error:`, error);
          return originalJson.call(this, body); // Fallback to original
        }
      })();
      return this; // res.json returns res
    }
    
    return originalJson.call(this, body);
  };

  next();
};
