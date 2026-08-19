import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import pathwayRoutes from './routes/pathwayRoutes.js';
import examRoutes from './routes/examRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import collegeRoutes from './routes/collegeRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import savedJobRoutes from './routes/savedJobRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import degreeRoutes from './routes/degreeRoutes.js';

// Middleware
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Global Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// ─── Routes ──────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    name: 'U-THINK API',
    status: 'ok',
    documentation: '/api/health',
  });
});

app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);     // MongoDB Auth (register, login, me)
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);            // /api/ai/aptitude/evaluate, /api/ai/chat/stream
app.use('/api/colleges', collegeRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/pathways', pathwayRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/jobs/saved', savedJobRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/degrees', degreeRoutes);

// ─── Global Error Handler ─────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 U-THINK Backend (MongoDB) running on http://localhost:${PORT}`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health\n`);
  
  // Connect to MongoDB asynchronously
  connectDB().catch((err) => {
    console.warn('⚠️  MongoDB connection pending — make sure local MongoDB or Atlas is running:', err.message);
  });
});

export default app;
