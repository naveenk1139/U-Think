// @ts-nocheck
import { Router, Request, Response, NextFunction } from 'express';
import { ai, generateWithRetry } from '../config/gemini.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import { uThinkTools, executeTool, buildSystemInstruction } from '../services/aiService.js';

const router = Router();

// Evaluate Aptitude Test results using Gemini AI
router.post('/aptitude/evaluate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
      res.status(400).json({ error: 'Answers array is missing or invalid.' });
      return;
    }

    const prompt = `
      You are the Head Career Advisor at U THINK. A student after 10th grade has completed our custom aptitude assessment. Here is an overview of the questions they answered and the precise choices they made:

      ${answers
        .map(
          (ans: any, i: number) => `
      Question ${i + 1}: "${ans.question}"
      Category: "${ans.category}"
      Student Chosen Option: "${ans.choiceText}"
      `
        )
        .join('\n')}

      Based on these responses and their primary alignment with specific paths, please generate a highly professional, highly motivating, and detailed career pathway proposal.
      Be extremely specific to the fields of Indian post-10th academics:
      Options:
      - 12th_intermediate (MPC for Engineering, BiPC for Medicine, CEC for Commerce/CS, HEC for Humanities, Arts, UPSC)
      - diploma (Polytechnic in Engineering, Architecture, Management)
      - paramedical (Allied Certificates/Diplomas)
      - iti (Industrial Training Institutes Technical & Non-Technical Trades)
      - vocational (Vocational Skills & Design Certifications)

      Respond strictly in valid JSON format like this (no markdown block, just JSON):
      {
        "recommendedStream": "Readable Name of the stream (e.g. 12th / Intermediate Academic Pathway)",
        "recommendedStreamId": "12th_intermediate", // Must be one of: 12th_intermediate, diploma, paramedical, iti, vocational
        "whyThisFits": "1-2 sentences on why this fits them",
        "detailedAnalysis": "Detailed paragraph of academic analysis",
        "suggestedCareers": ["Career 1", "Career 2", "Career 3"],
        "actionPlan": ["Action Step 1", "Action Step 2", "Action Step 3"],
        "motivationalMessage": "A short inspiring quote or message"
      }
    `;

    const model = ai.models;
    let resultData: any = {};
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      resultData = {
        recommendedStream: 'Polytechnic Diploma in Tech & Engineering',
        recommendedStreamId: 'diploma',
        whyThisFits: 'Your answers indicate a strong preference for hands-on, practical learning rather than purely theoretical academics. A diploma will allow you to enter the workforce sooner with specialized skills.',
        detailedAnalysis: 'This is a simulated analysis because the Gemini API Key is not configured in the backend. Based on your responses, we highly recommend the Polytechnic / Diploma stream.',
        suggestedCareers: ['Junior Engineer', 'Technical Supervisor', 'Site Coordinator'],
        actionPlan: [
            'Look out for the state polytechnic entrance exam (POLYCET) notifications usually released in March/April.',
            'Research top polytechnic colleges in your state.',
            'Review previous years exam papers.'
        ],
        motivationalMessage: 'Your practical mindset is your greatest asset. Build the future with your own hands!'
      };
    } else {
      const response = await generateWithRetry(model, {
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      let text = response.text || '{}';
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      try {
        resultData = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse Gemini JSON for aptitude evaluation:", text);
        resultData = {
          recommendedStream: '12th / Intermediate Academic Pathway',
          recommendedStreamId: '12th_intermediate',
          whyThisFits: 'Based on your varied responses, a traditional path gives you the most flexibility.',
          detailedAnalysis: text,
          suggestedCareers: ['Various Options'],
          actionPlan: ['Speak to a local counselor', 'Review academic options'],
          motivationalMessage: 'Every step is progress!'
        };
      }
    }

    res.json(resultData);
  } catch (err) {
    next(err);
  }
});

// AI Counselor direct chat endpoint
router.post('/ai/counselor', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, contextHistory } = req.body;
    if (!message) {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    const systemPrompt = `You are U THINK AI Advisor, an expert career counselor for Indian students after 10th class. Provide clear, accurate, concise, and helpful advice on streams (12th MPC/BiPC/CEC/HEC, Diploma, ITI, Paramedical, Vocational), entrance exams, competitive tests, and career opportunities. Keep formatting clean using markdown.`;

    const prompt = `${systemPrompt}\n\nUser Question: ${message}`;

    const model = ai.models;
    const response = await generateWithRetry(model, {
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      reply: response.text || 'I am sorry, I am currently unable to answer. Please try again.',
    });
  } catch (err) {
    next(err);
  }
});

// Advisor chat endpoint for AICounselorModal
router.post('/advisor/chat', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messages, persona } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    const systemPrompt = `You are U THINK AI Advisor, an expert career counselor for Indian students after 10th class. Provide clear, accurate, concise, and helpful advice on streams (12th MPC/BiPC/CEC/HEC, Diploma, ITI, Paramedical, Vocational), entrance exams, competitive tests, and career opportunities. Keep formatting clean using markdown.`;

    // Format chat history
    const history = messages.map((m: any) => `${m.sender === 'user' ? 'User' : 'Advisor'}: ${m.text}`).join('\n');
    const prompt = `${systemPrompt}\n\nConversation History:\n${history}\n\nAdvisor:`;

    const model = ai.models;
    let responseText = '';
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Provide a mock response for testing
      responseText = "This is a **simulated response** because the real Gemini API key is not configured in the backend `.env` file.\n\nTo get actual AI career guidance, please obtain a free API key from Google AI Studio and update the backend configuration. In the meantime, I can tell you that for ITI and Polytechnic, practical skills are highly valued!";
    } else {
      const response = await generateWithRetry(model, {
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      responseText = response.text || 'I am sorry, I am currently unable to answer. Please try again.';
    }

    res.json({
      text: responseText,
    });
  } catch (err) {
    next(err);
  }
});

// AI College Recommendation
router.post('/colleges/recommend', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userProfile, colleges } = req.body;
    if (!colleges || !Array.isArray(colleges)) {
      res.status(400).json({ error: 'Colleges array is required.' });
      return;
    }

    const prompt = `You are an expert career counselor for Indian students. 
A student with the following profile wants college recommendations:
Interests: ${userProfile?.interests?.join(', ') || 'General'}
Preferred Stream: ${userProfile?.streamPreference || 'Not specified'}

Please score the following colleges from 0 to 100 on how well they match the student, and provide a 1-sentence rationale for each.
Colleges:
${colleges.map((c: any) => `- ID: ${c._id}, Name: ${c.name}, Category: ${c.category}, City: ${c.city}`).join('\n')}

Respond strictly in valid JSON format like this (no markdown block, just JSON):
{
  "scores": {
    "collegeId1": { "score": 95, "rationale": "Rationale here" },
    "collegeId2": { "score": 80, "rationale": "Rationale here" }
  }
}`;

    const model = ai.models;
    let scores = {};
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Mock scores if API key is not set
      colleges.forEach((c: any) => {
        scores[c._id as keyof typeof scores] = { score: 85, rationale: 'Mock AI recommendation (API Key missing).' };
      });
    } else {
      const response = await generateWithRetry(model, {
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      let text = response.text || '{}';
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      try {
        const parsed = JSON.parse(text);
        scores = parsed.scores || {};
      } catch (e) {
        console.error("Failed to parse Gemini JSON for colleges:", text);
        scores = {};
      }
    }

    res.json({ scores });
  } catch (err) {
    next(err);
  }
});

// --- NEW AI CAREER COUNSELOR ROUTES ---

// GET /api/ai/conversations
router.get('/conversations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For now we will allow passing userId in query
    const userId = req.query.userId || req.body.userId; 
    if (!userId) {
       res.status(401).json({ error: 'Unauthorized' });
       return;
    }
    const convos = await Conversation.find({ userId }).sort({ updatedAt: -1 });
    res.json(convos);
  } catch (err) { next(err); }
});

// GET /api/ai/conversations/messages/:id
router.get('/conversations/messages/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) { next(err); }
});

// DELETE /api/ai/conversations/:id
router.delete('/conversations/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    await Message.deleteMany({ conversationId: req.params.id });
    res.json({ success: true });
  } catch (err) { next(err); }
});

// POST /api/ai/chat/stream
router.post('/chat/stream', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, conversationId, message } = req.body;
    if (!userId || !message) {
       res.status(400).json({ error: 'userId and message required' });
       return;
    }

    let convId = conversationId;
    if (!convId) {
      const newConv = await Conversation.create({ userId, title: message.substring(0, 30) + '...' });
      convId = newConv._id;
    } else {
      await Conversation.findByIdAndUpdate(convId, { updatedAt: new Date() });
    }

    // Save user message
    await Message.create({ conversationId: convId, role: 'user', content: message });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      res.write(`data: {"text":"I am a simulated AI. Please add a valid GEMINI_API_KEY to the backend."}\n\n`);
      res.write(`data: {"done": true, "conversationId": "${convId}"}\n\n`);
      res.end();
      return;
    }

    const user = await User.findById(userId);
    // You can fetch aptitude results here if they exist in DB
    const sysInst = buildSystemInstruction(user, null);

    // Fetch history
    const historyMsgs = await Message.find({ conversationId: convId }).sort({ createdAt: 1 });
    
    // Map to Gemini history format
    const contents: any[] = historyMsgs.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Start Chat
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: sysInst,
        tools: uThinkTools,
      },
      history: contents.slice(0, -1) // Exclude the latest user message which we just added
    });

    let fullResponseText = '';
    
    // We'll use a recursive loop if tool calls are requested
    const executeChatStream = async (msgText: string) => {
      const responseStream = await chat.sendMessageStream(msgText);
      
      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullResponseText += chunk.text;
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
        if (chunk.functionCalls && chunk.functionCalls.length > 0) {
          for (const call of chunk.functionCalls) {
            const toolResult = await executeTool(call.name, call.args);
            // Send the tool response back to the model iteratively
            const followUpStream = await chat.sendMessageStream([{
               functionResponse: {
                 name: call.name,
                 response: toolResult
               }
            }]);
            for await (const followUpChunk of followUpStream) {
               if (followUpChunk.text) {
                 fullResponseText += followUpChunk.text;
                 res.write(`data: ${JSON.stringify({ text: followUpChunk.text })}\n\n`);
               }
            }
          }
        }
      }
    };

    await executeChatStream(message);

    // Save AI response
    await Message.create({ conversationId: convId, role: 'model', content: fullResponseText });

    res.write(`data: {"done": true, "conversationId": "${convId}"}\n\n`);
    res.end();

  } catch (err: any) {
    console.error('AI Stream Error:', err);
    res.write(`data: {"error": "AI Error: ${err.message || 'Temporarily unavailable'}"}\n\n`);
    res.end();
  }
});

export default router;
