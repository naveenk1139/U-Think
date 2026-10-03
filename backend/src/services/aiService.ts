import { ai } from '../config/gemini.js';
import College from '../models/College.js';
import User from '../models/User.js';

export const uThinkTools = [
  {
    functionDeclarations: [
      {
        name: 'search_colleges',
        description: 'Search for colleges in the U THINK database by category, district, or name query.',
        parameters: {
          type: 'OBJECT',
          properties: {
            query: { type: 'STRING', description: 'Search query for college name or course.' },
            category: { type: 'STRING', description: 'Category like Engineering, Medical, Management, Law, Design, etc.' },
            district: { type: 'STRING', description: 'District or city name in Karnataka.' }
          }
        }
      },
      {
        name: 'get_college_details',
        description: 'Get detailed information about a specific college by its exact name.',
        parameters: {
          type: 'OBJECT',
          properties: {
            name: { type: 'STRING', description: 'Exact name of the college.' }
          },
          required: ['name']
        }
      },
      {
        name: 'search_pathways',
        description: 'Search for post-10th education pathways, streams, and subject combinations in the U-THINK database.',
        parameters: {
          type: 'OBJECT',
          properties: {
            query: { type: 'STRING', description: 'Search query for pathway or stream name (e.g., PUC, Science, ITI, Diploma).' }
          }
        }
      },
      {
        name: 'search_courses',
        description: 'Search for specific courses, degrees, or trades in the U-THINK database.',
        parameters: {
          type: 'OBJECT',
          properties: {
            query: { type: 'STRING', description: 'Search query for course name (e.g., Computer Science, Electrician, B.Tech).' }
          }
        }
      }
    ]
  }
];

export async function executeTool(callName: string, callArgs: any) {
  try {
    if (callName === 'search_colleges') {
      const filter: any = {};
      if (callArgs.query) filter.$text = { $search: callArgs.query };
      if (callArgs.category) filter.categories = { $in: [callArgs.category] };
      if (callArgs.district) filter.district = callArgs.district;
      
      const results = await College.find(filter).limit(5).select('name categories district city fees placement nirfRank');
      return { colleges: results };
    }
    
    if (callName === 'get_college_details') {
      const college = await College.findOne({ name: { $regex: new RegExp(callArgs.name, 'i') } });
      return { college: college || 'College not found.' };
    }
    
    if (callName === 'search_pathways') {
      const { default: Pathway } = await import('../models/Pathway.js');
      const { default: Stream } = await import('../models/Stream.js');
      
      const filter = callArgs.query ? { name: { $regex: new RegExp(callArgs.query, 'i') } } : {};
      const pathways = await Pathway.find(filter).limit(3).select('name level duration eligibility');
      const streams = await Stream.find(filter).limit(3).select('name duration eligibility pathwayId');
      
      return { pathways, streams };
    }
    
    if (callName === 'search_courses') {
      const { default: Course } = await import('../models/Course.js');
      const { default: Trade } = await import('../models/Trade.js');
      
      const filter = callArgs.query ? { name: { $regex: new RegExp(callArgs.query, 'i') } } : {};
      const courses = await Course.find(filter).limit(4).select('name level duration eligibility');
      const trades = await Trade.find(filter).limit(4).select('name duration qualification');
      
      return { courses, trades };
    }

    return { error: 'Unknown tool.' };
  } catch (error: any) {
    console.error('Tool execution error:', error);
    return { error: error.message };
  }
}

export function buildSystemInstruction(user: any, aptitudeResult: any) {
  let profile = '';
  if (user) {
    profile = `
Student: ${user.name || 'Student'}
Education Level: ${user.educationLevel || 'Not specified'}
Class/Year: ${user.classOrYear || 'Not specified'}
Stream: ${user.stream || 'Not specified'}
Interests: ${user.interests?.join(', ') || 'None'}
Career Goal: ${user.careerGoal || 'Not specified'}
Location: ${user.city || 'Not specified'}, ${user.state || 'Not specified'}`;
  }

  let aptitude = '';
  if (aptitudeResult) {
    aptitude = `
Aptitude Score: ${aptitudeResult.score}
Strong Areas: ${aptitudeResult.strongAreas?.join(', ') || 'N/A'}
Weak Areas: ${aptitudeResult.weakAreas?.join(', ') || 'N/A'}
Recommended Stream: ${aptitudeResult.recommendedStream || 'N/A'}`;
  }

  return `You are U THINK AI Career Counselor. Your job is to provide personalized education and career guidance to students.
Use the student's profile and verified U THINK data when available.
Never invent colleges, exams, deadlines, courses or job information.
When the user asks for database-specific information, use the available U THINK tools.
Explain complex career information in simple language. Ask clarifying questions when necessary.
Provide practical step-by-step roadmaps.
Consider the student's education level, interests, aptitude, skills, location and career goals.
Your goal is to help the student make informed education and career decisions.

STUDENT PROFILE CONTEXT:
${profile}

APTITUDE RESULT:
${aptitude}
`;
}

export async function generateGeminiResponse(prompt: string): Promise<string> {
  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt
  });
  return result.text || '';
}
