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

export const analyzeDocument = async (filePath: string, mimeType: string): Promise<any> => {
  const model = ai.models;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key not configured for document analysis');
  }

  const prompt = `You are an expert AI extracting structured information from an educational document (e.g. marksheet, certificate).
Only extract information explicitly visible in the document. Never guess or fabricate information.
If a field is unreadable or missing, return null.
For 'documentType', choose from: TENTH_MARKSHEET, TWELFTH_MARKSHEET, DIPLOMA_MARKSHEET, EDUCATIONAL_CERTIFICATE, UNKNOWN.
For each extracted field, provide a 'confidence' score between 0.0 and 1.0 (e.g., 0.95 for very clear text, 0.4 for blurry text).
If you cannot identify the document type confidently, use UNKNOWN.

Return valid JSON exactly matching this schema:
{
  "documentType": "string",
  "studentName": "string | null",
  "rollNumber": "string | null",
  "institution": "string | null",
  "board": "string | null",
  "academicYear": "string | null",
  "totalMarks": "number | null",
  "maximumMarks": "number | null",
  "percentage": "number | null",
  "resultStatus": "string | null",
  "confidence": "number",
  "subjects": [
    {
      "subjectName": "string",
      "marksObtained": "number | null",
      "maximumMarks": "number | null",
      "grade": "string | null",
      "confidence": "number"
    }
  ]
}`;

  const uploadResult = await ai.files.upload({
    file: filePath,
    config: { mimeType }
  });

  const response = await generateWithRetry(model, {
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          { fileData: { fileUri: uploadResult.uri, mimeType } }
        ]
      }
    ],
    config: {
      responseMimeType: 'application/json',
      temperature: 0.1
    }
  });

  if (!response.text) {
    throw new Error('Failed to extract data from document');
  }

  try {
    return JSON.parse(response.text);
  } catch (err) {
    console.error('Failed to parse Gemini output as JSON:', response.text);
    throw new Error('Invalid JSON structure returned by AI');
  }
};
