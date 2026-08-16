import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Helper for retries
async function generateWithRetry(model: any, config: any, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await model.generateContent(config);
    } catch (error: any) {
      // Check for 503 error code
      const is503 = error?.code === 503 || error?.status === 503 || error?.message?.includes("503");
      if (is503 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000 + Math.random() * 1000; // Add jitter
        console.warn(`Retrying AI call due to 503, attempt ${i + 1}/${maxRetries}. Delay: ${Math.round(delay)}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Log API requests to help debugging
  app.use((req, res, next) => {
    console.log(`[HTTP] ${req.method} ${req.path}`);
    next();
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API 1: Generate customized career guidance analysis from Aptitude Quiz responses
  app.post("/api/aptitude/evaluate", async (req, res) => {
    try {
      const { answers } = req.body;
      if (!answers || !Array.isArray(answers)) {
        res.status(400).json({ error: "Answers array is missing or invalid." });
        return;
      }

      const prompt = `
        You are the Head Career Advisor at U THINK. A student after 10th grade has completed our custom aptitude assessment. Here is an overview of the questions they answered and the precise choices they made:

        ${answers.map((ans: any, i) => `
        Question ${i + 1}: "${ans.question}"
        Category: "${ans.category}"
        Student Chosen Option: "${ans.choiceText}"
        `).join('\n')}

        Based on these responses and their primary alignment with specific paths, please generate a highly professional, highly motivating, and detailed career pathway proposal.
        Be extremely specific to the fields of Indian post-10th academics:
        Options:
        - 12th / Intermediate (MPC for Engineering, BiPC for Medicine, CEC for Commerce/CS, HEC for Humanities, Arts, UPSC)
        - Polytechnic Diploma (3 years engineering / computer science / mechanical / electrical)
        - Paramedical Diplomas (DMLT, X-Ray, Dialysis technology)
        - ITI (Craft engineering trades: Electrician, Fitter, Diesel Mechanic)
        - Vocational courses (Fashion design, Tourism, Office assistantships)

        Your response should be structured as a JSON object with this exact schema so we can render it beautifully:
        {
          "recommendedStream": "Name of the primary recommended path (e.g. Polytechnic Diploma in Computer Science)",
          "whyThisFits": "A brief Paragraph outlining how this matches their analytical/technical/creative responses (70-100 words).",
          "detailedAnalysis": "A comprehensive deep dive into what this path comprises and why they will excel here (150-200 words).",
          "suggestedCareers": ["Career Option 1", "Career Option 2", "Career Option 3"],
          "actionPlan": [
            "Step 1: Short term action checklist for the next 3 weeks",
            "Step 2: Medium term learning checklist",
            "Step 3: Long term professional qualification advice"
          ],
          "motivationalMessage": "A warm, encouraging closing statement from an advisor's heart."
        }

        Do not wrap the JSON inside markdown triple backticks unless required. Ensure that you return valid, standard JSON.
      `;

      const response = await generateWithRetry(ai.models, {
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are an expert post-10th educational consultant helpful to young secondary school graduates. Always output valid compliant JSON."
        }
      });

      const responseText = response.text || "{}";
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("Aptitude evaluate error:", error);
      res.status(500).json({ 
        error: "AI assessment failed to generate.", 
        details: error?.message || "" 
      });
    }
  });

  // API 2: General Career Assistance Chat
  app.post("/api/advisor/chat", async (req, res) => {
    try {
      const { messages, persona } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Messages history is missing." });
        return;
      }

      // Format messages into chat contents
      const dialog = messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Define different system instructions based on persona
      let systemInstruction = "";
      if (persona === "academic") {
        systemInstruction = `
          You are the official 'U THINK Academic Strategist' (Dr. Anand Kumar). U THINK is a premier platform dedicated to career guidance for Indian students who have just completed 10th grade.
          Your persona: Methodical, analytical, structured, and highly focused on curricula, competitive entrance exams, and academic prerequisites.
          
          When answering:
          - Provide concrete academic details: recommended streams (PCM, PCB, Commerce CEC, Humanities HEC, or Polytechnic/Paramedical/ITI courses).
          - Mention specific entrance exams (e.g., JEE, NEET, POLYCET, NATA, CLAT, CUET) and preparation strategies.
          - Give detailed, step-by-step educational progressions (e.g. 10th -> Diploma -> Lateral entry B.Tech).
          - Use structured, scannable layouts with bold lists.
          - Always remain encouraging and academically precise.
          - Suggest the user to take our 'Aptitude Assessment' for a customized profile if they are unsure.
          - Keep responses helpful, direct, and under 250 words.
        `;
      } else if (persona === "industry") {
        systemInstruction = `
          You are the official 'U THINK Industry Realist' (Sanjay Mehta). U THINK is a premier platform dedicated to career guidance for Indian students who have just completed 10th grade.
          Your persona: Practical, data-driven, and highly focused on job market trends, high-paying career profiles, real-world skills, and financial return on education (ROI).
          
          When answering:
          - Emphasize starting salaries in INR (LPA - Lakhs Per Annum), company placement rates, and real-world duties.
          - Outline specific skills in high demand (e.g. full-stack development, CNC operation, aviation management, pharmacy, medical lab operations).
          - Contrast different streams in terms of job opportunities and career growth potential.
          - Give real-world examples of professionals in these roles.
          - Keep your feedback grounded, realistic, and highly practical. Use bold text for numbers and key statistics.
          - Keep responses direct, scannable, and under 250 words.
        `;
      } else if (persona === "empathetic") {
        systemInstruction = `
          You are the official 'U THINK Student Counselor & Guide' (Sarah D'Souza). U THINK is a premier platform dedicated to career guidance for Indian students who have just completed 10th grade.
          Your persona: Deeply warm, compassionate, supportive, and focused on aligning career paths with personal interests, handling performance anxiety, and navigating parental expectations or peer pressure.
          
          When answering:
          - Emphasize self-discovery, mental well-being, interest alignment, and passion.
          - Provide gentle, non-judgmental validation of the student's fears and doubts (e.g. fear of failing math, parental pressure to do medicine).
          - Give practical communication advice on how they can discuss alternative careers (like ITI, Vocational, Arts, or Commerce) with their parents.
          - Use warm, comforting language. Avoid dry statistics unless helpful for reassurance.
          - Remind them that success comes in many paths and there is no single "correct" stream.
          - Keep responses cozy, reassuring, and under 250 words.
        `;
      } else {
        systemInstruction = `
          You are the official 'U THINK AI Advisor'. U THINK is a premier platform dedicated to career guidance and aptitude assessment for Indian students who have just completed 10th grade.
          Your mission is to provide comprehensive, accurate, and motivating career advice.
  
          Your expertise covers:
          - 12th/Intermediate streams (Science PCM/PCB, Commerce, Arts/Humanities)
          - Polytechnic Engineering Diplomas (Mechanical, Computer Science, Electrical, Civil)
          - Paramedical Diplomas (Medical Lab Tech, Radiology, Dialysis)
          - ITI (Industrial Training Institutes: Electrician, Fitter, Machinist)
          - Vocational Courses (Design, Travel, Management)
  
          When answering student queries:
          - Provide full information: clear educational pathways, recommended entrance exams, eligibility, fee structure guidelines, and salary expectations.
          - Use bold text and bullet lists for clarity.
          - If a student is unsure about their path, suggest they take the U THINK 'Aptitude Assessment' to get a personalized recommendation.
          - Always remain friendly, professional, and encouraging.
  
          Keep answers informative, concise (under 250 words per reply), and actionable.
        `;
      }

      const response = await generateWithRetry(ai.models, {
        model: "gemini-3.5-flash",
        contents: dialog,
        config: {
          systemInstruction,
        }
      });

      res.json({ text: response.text || "I apologize, I am unable to interpret that. Could you please rephrase?" });
    } catch (error: any) {
      console.error("Advisor chat error:", error);
      res.status(500).json({ error: "Counselor server is temporarily occupied.", details: error?.message || "" });
    }
  });

  // API 3: Industry Mentorship Simulation Chat
  app.post("/api/mentor/chat", async (req, res) => {
    try {
      const { mentorId, messages, mentorName, mentorBio, mentorRole, mentorCompany } = req.body;
      if (!mentorId || !messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid mentor chat payload." });
        return;
      }

      const dialog = messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const systemInstruction = `
        You are simulated Industry Mentor '${mentorName}', currently working as a ${mentorRole} at ${mentorCompany}.
        Your background is:
        "${mentorBio}"

        You are speaking to a 10th-grade class graduate who is considering entering your line of study or field.
        Talk to them warmly, address them as a junior, tell them stories from your real-world job, the tools you use (e.g. coding tools, laboratory scanners, CNC lathes, flight reservation systems), and what study path they should take (such as 12th, polytechnic, or ITI) to become like you.
        Be encouraging, practical, and answer with high-level industry expertise. Keep replies friendly and brief (about 120-180 words).
      `;

      const response = await generateWithRetry(ai.models, {
        model: "gemini-3.5-flash",
        contents: dialog,
        config: {
          systemInstruction,
        }
      });

      res.json({ text: response.text || "I am currently focused on site duties. What particular challenge can I assist you with today?" });
    } catch (error: any) {
      console.error("Mentor chat error:", error);
      res.status(500).json({ error: "Mentor connection delay.", details: error?.message || "" });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[U THINK Server] successfully running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
