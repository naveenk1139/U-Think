import { ai, generateWithRetry } from '../config/gemini.js';

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  const model = ai.models;
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return "This is a simulated AI mentor response because the real Gemini API key is not configured.";
  }
  
  try {
    const response = await generateWithRetry(model, {
      model: 'gemini-3.6-flash',
      contents: prompt,
    });
    
    return response.text || 'I am sorry, I am currently unable to answer. Please try again.';
  } catch (error: any) {
    if (error?.status === 429 || error?.code === 429 || error?.message?.includes('429')) {
      console.warn("?? Gemini API 429 Rate Limit Hit. Using fallback mock data for demonstration.");
      
      if (prompt.includes('stabilityScore')) {
        return JSON.stringify({
          stabilityScore: 78,
          confidenceLevel: "High",
          supportingFactors: ["Strong alignment with your current academic subjects", "High demand in the tech industry"],
          riskFactors: ["Highly competitive field", "Requires continuous upskilling and learning"],
          alternativeSuggestion: "Data Science or Systems Engineering"
        });
      }
      
      if (prompt.includes('verdict') && prompt.includes('pathA')) {
        return JSON.stringify({
          verdict: "Path A offers faster entry into the job market, while Path B offers higher long-term specialization.",
          pathA: {
            name: "Path A Mock",
            timeInvestment: "4 Years",
            timeInvestmentScore: 80,
            financialCost: "5 Lakhs",
            financialCostScore: 60,
            earningPotential: "6L - 12L PA",
            earningPotentialScore: 70,
            jobGrowth: "15% YoY",
            jobGrowthScore: 85,
            opportunityCost: "Early career stability"
          },
          pathB: {
            name: "Path B Mock",
            timeInvestment: "3 Years",
            timeInvestmentScore: 60,
            financialCost: "2 Lakhs",
            financialCostScore: 40,
            earningPotential: "4L - 8L PA",
            earningPotentialScore: 50,
            jobGrowth: "Steady",
            jobGrowthScore: 65,
            opportunityCost: "Higher peak earnings"
          }
        });
      }

      if (prompt.includes('steps') && prompt.includes('skillGaps')) {
        return JSON.stringify({
          steps: [
            { stepId: "step-1", title: "Complete Core Curriculum", description: "Finish foundational degree requirements.", type: "Foundation" },
            { stepId: "step-2", title: "Gain Practical Experience", description: "Complete an internship or major project.", type: "Project" },
            { stepId: "step-3", title: "Specialization", description: "Take advanced elective courses in your niche.", type: "Skill" }
          ],
          skillGaps: [
            { skillName: "Technical Knowledge", currentLevel: "Beginner", requiredLevel: "Advanced", gapDescription: "Enroll in specialized courses." }
          ]
        });
      }
      
      if (prompt.includes('nodes')) {
        return JSON.stringify({
          nodes: [
            { 
              skillName: "Software Engineering", 
              category: "Technical", 
              level: "Intermediate", 
              strengthScore: 85, 
              evidence: [{ type: "MANUAL", name: "User Profile Claim", verified: false }],
              relatedSkills: ["Programming", "System Design"]
            },
            { 
              skillName: "Communication", 
              category: "Soft Skill", 
              level: "Advanced", 
              strengthScore: 92, 
              evidence: [{ type: "DOCUMENT", name: "Mock Certificate", verified: true }],
              relatedSkills: ["Teamwork", "Leadership"]
            }
          ]
        });
      }
      
      if (prompt.includes('blockchainId')) {
        return JSON.stringify({
          skills: [{ skillName: "Problem Solving", verifiedBy: "System", verificationDate: new Date().toISOString() }],
          certifications: [{ title: "Foundations", issuer: "U-Think", issueDate: new Date().toISOString(), credentialId: "MOCK-123" }],
          blockchainId: "0xMockBlockchainId123456789"
        });
      }
    }
    throw error;
  }
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

  // Poll for file state to become ACTIVE (required for PDFs)
  let fileState = await ai.files.get({ name: uploadResult.name });
  while (fileState.state === 'PROCESSING') {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    fileState = await ai.files.get({ name: uploadResult.name });
  }

  if (fileState.state === 'FAILED') {
    throw new Error('File processing failed on Gemini servers.');
  }

  const response = await generateWithRetry(model, {
    model: 'gemini-3.6-flash',
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
