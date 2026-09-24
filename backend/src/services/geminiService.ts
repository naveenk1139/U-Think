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
      if (prompt.includes('enabledPaths') && prompt.includes('lockedPaths')) {
        return JSON.stringify({
          enabledPaths: [
            { degree: "B.Tech Computer Science", description: "Directly enabled by Mathematics and Physics." },
            { degree: "B.Sc Physics", description: "Excellent foundation for research and teaching." }
          ],
          lockedPaths: [
            { degree: "MBBS (Medicine)", reason: "Requires Biology as a core subject." },
            { degree: "B.Com (Honors)", reason: "Often requires Accountancy or Economics." }
          ],
          aiSummary: "Your combination is incredibly strong for engineering and tech, but firmly closes the door on medical and pure commerce fields. Commit to the tech track!"
        });
      }

      if (prompt.includes('chain') && prompt.includes('aiAnalysis')) {
        return JSON.stringify({
          target: "Mock Target Goal",
          chain: [
            { stepNumber: 1, level: "10th Grade", requirement: "Score 75%+ in Science and Math", isStrictlyMandatory: true, consequenceOfFailure: "May not get Science stream in 11th" },
            { stepNumber: 2, level: "12th/PUC", requirement: "Take PCMB or PCMC", isStrictlyMandatory: true, consequenceOfFailure: "Ineligible for technical entrance exams" },
            { stepNumber: 3, level: "Entrance Exam", requirement: "Clear National Level Entrance Exam (e.g. JEE/NEET)", isStrictlyMandatory: true, consequenceOfFailure: "Cannot enter premier institutes" },
            { stepNumber: 4, level: "Undergrad", requirement: "Complete Bachelor's Degree with minimum 6.5 CGPA", isStrictlyMandatory: false }
          ],
          aiAnalysis: "This path is highly structured and competitive. Missing early prerequisites makes it exponentially harder to recover."
        });
      }

      if (prompt.includes('switchStrategy') && prompt.includes('timeImpact')) {
        return JSON.stringify({
          isPossible: true,
          difficulty: "Moderate",
          switchStrategy: [
            { step: "Bridge Course", details: "Complete a 6-month foundational course in the new discipline." },
            { step: "Lateral Entry Exam", details: "Clear the state lateral entry test for direct 2nd-year admission." }
          ],
          timeImpact: "Adds 1 extra year",
          aiVerdict: "It's entirely possible and surprisingly common. The extra year is a small price for long-term career satisfaction."
        });
      }

      if (prompt.includes('compassionateMessage') && prompt.includes('recoverySteps')) {
        return JSON.stringify({
          isRecoverable: true,
          compassionateMessage: "Setbacks happen to the best of us. You have not lost your future, just taken a detour. Let's get you back on track.",
          recoverySteps: [
            { step: "Apply for NIOS On-Demand Exams", timeline: "1-2 months", difficulty: "Moderate" },
            { step: "Enroll in a Diploma/Polytechnic equivalent", timeline: "3 years", difficulty: "Easy" }
          ],
          alternativeGoal: "If the primary goal is too time-consuming, consider an allied vocational field like Paramedical or ITI."
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
