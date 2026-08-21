import { Router, Request, Response, NextFunction } from 'express';
import Mentor from '../models/Mentor.js';
import MentorSession from '../models/MentorSession.js';
import { generateGeminiResponse } from '../services/geminiService.js';

const router = Router();

// Get mentors with filtering
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { educationLevel, stream, course, branch, search } = req.query;
    
    let query: any = {};
    
    if (educationLevel && educationLevel !== 'All') {
      query.educationLevels = educationLevel;
    }
    
    if (stream && stream !== 'All') {
      query.streams = stream;
    }

    if (course && course !== 'All') {
      query.courses = course;
    }
    
    if (branch && branch !== 'All') {
      query.branches = branch;
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    const mentors = await Mentor.find(query).limit(50);
    res.json(mentors);
  } catch (err) {
    next(err);
  }
});

// Chat with a mentor (AI contextual chat)
router.post('/chat', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mentorId, studentContext, message, history } = req.body;
    
    if (!mentorId || !message) {
      res.status(400).json({ error: 'mentorId and message are required.' });
      return;
    }

    const mentor = await Mentor.findOne({ mentorId });
    if (!mentor) {
      res.status(404).json({ error: 'Mentor not found.' });
      return;
    }

    // Prepare prompt
    const systemPrompt = `You are playing the role of an AI Career Mentor for a career guidance platform.
Your Persona:
Name: ${mentor.name}
Role: ${mentor.jobTitle} at ${mentor.company}
Industry: ${mentor.industry}
Bio: ${mentor.bio}
Skills: ${mentor.skills.join(', ')}

Student Context:
Education Level: ${studentContext?.educationLevel || 'Unknown'}
Stream: ${studentContext?.stream || 'Unknown'}
Course/Branch: ${studentContext?.course || 'Unknown'}

Guidelines:
1. Act exclusively as this mentor persona.
2. Provide practical, industry-specific career advice based on the student's context.
3. If they ask about something completely unrelated to your field, politely redirect them or advise them to seek a mentor in that specific field.
4. If relevant, suggest they check out "College Explorer" or "Job Explorer" on our platform for specific colleges or jobs.
5. Keep your responses concise (1-2 paragraphs), conversational, and encouraging.`;

    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // For demo purposes, we will construct a single prompt since we might not have a proper conversational Gemini wrapper in geminiService
    let fullConversation = systemPrompt + '\n\nChat History:\n';
    (history || []).forEach((msg: any) => {
      fullConversation += `${msg.sender}: ${msg.text}\n`;
    });
    fullConversation += `\nstudent: ${message}\n${mentor.name}:`;

    // Assuming generateGeminiResponse takes a string prompt
    const replyText = await generateGeminiResponse(fullConversation);

    res.json({ text: replyText });
  } catch (err) {
    next(err);
  }
});

// Request a session with a real mentor
router.post('/session', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mentorId, studentId, date, time, topic } = req.body;
    
    if (!mentorId || !studentId || !date || !time || !topic) {
      res.status(400).json({ error: 'Missing required fields for session.' });
      return;
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor || mentor.mentorType !== 'REAL') {
      res.status(400).json({ error: 'Cannot book sessions with an AI mentor or mentor not found.' });
      return;
    }

    const session = await MentorSession.create({
      mentorId,
      studentId,
      date,
      time,
      topic,
      status: 'Pending'
    });

    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
});

export default router;
