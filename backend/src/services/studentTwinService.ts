import { ai } from '../config/gemini.js';
import User, { IUser } from '../models/User.js';

export interface CareerDNA {
  coreStrengths: string[];
  learningStyle: string;
  recommendedSectors: string[];
  personalityArchetype: string;
  summary: string;
}

export async function buildDigitalTwinContext(userId: string): Promise<string> {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  let twinText = `STUDENT DIGITAL TWIN PROFILE:\n`;
  twinText += `Name: ${user.name}\n`;
  twinText += `Education Level: ${user.educationLevel || 'Not specified'}\n`;
  twinText += `Stream: ${user.stream || 'Not specified'}\n`;
  twinText += `Class/Year: ${user.classOrYear || 'Not specified'}\n`;
  twinText += `Interests: ${user.interests && user.interests.length > 0 ? user.interests.join(', ') : 'Not specified'}\n`;
  twinText += `Skills: ${user.skills && user.skills.length > 0 ? user.skills.join(', ') : 'Not specified'}\n`;
  twinText += `Career Goal: ${user.careerGoal || 'Not specified'}\n`;
  twinText += `Preferred Locations: ${user.preferredLocation && user.preferredLocation.length > 0 ? user.preferredLocation.join(', ') : 'Not specified'}\n`;

  if (user.academicProfile) {
    twinText += `ACADEMIC PERFORMANCE:\n`;
    if (user.academicProfile.tenthPercentage) twinText += `- 10th: ${user.academicProfile.tenthPercentage}%\n`;
    if (user.academicProfile.twelfthPercentage) twinText += `- 12th: ${user.academicProfile.twelfthPercentage}%\n`;
    if (user.academicProfile.diplomaPercentage) twinText += `- Diploma: ${user.academicProfile.diplomaPercentage}%\n`;
  }

  return twinText;
}

export async function generateCareerDNA(userId: string): Promise<CareerDNA> {
  const twinContext = await buildDigitalTwinContext(userId);
  
  const prompt = `
You are an expert Career AI Analyst for the U THINK platform. 
Analyze the following student profile (Digital Twin) and generate their "Career DNA".

${twinContext}

Return ONLY a valid JSON object matching this structure EXACTLY (no markdown wrappers like \`\`\`json):
{
  "coreStrengths": ["Strength 1", "Strength 2", "Strength 3"],
  "learningStyle": "Visual / Auditory / Kinesthetic / Reading-Writing (choose most likely and explain briefly)",
  "recommendedSectors": ["Sector 1", "Sector 2"],
  "personalityArchetype": "e.g., The Architect, The Catalyst, The Analyst",
  "summary": "A 2-3 sentence engaging summary explaining why this DNA suits them."
}`;

  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return {
        coreStrengths: ["Analytical Thinking", "Problem Solving", "Adaptability"],
        learningStyle: "Visual",
        recommendedSectors: ["Technology", "Engineering", "Data Science"],
        personalityArchetype: "The Architect",
        summary: "This is a simulated AI Career DNA profile since the Gemini API Key is not configured."
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: 'application/json'
      }
    });

    const responseText = response?.text;
    if (!responseText) throw new Error('Empty response from AI');
    
    const parsed = JSON.parse(responseText.trim());
    return parsed as CareerDNA;
  } catch (error) {
    console.error('Failed to generate Career DNA (API Error):', error);
    // Graceful fallback if the API fails for any reason (e.g., invalid key, quota limit)
    return {
      coreStrengths: ["Analytical Thinking", "Problem Solving", "Adaptability"],
      learningStyle: "Visual",
      recommendedSectors: ["Technology", "Engineering", "Data Science"],
      personalityArchetype: "The Architect",
      summary: "This is a simulated AI Career DNA profile since the Gemini API request failed (check your API key or quotas)."
    };
  }
}
