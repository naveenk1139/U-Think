import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AICareerQuestion, AssessmentResult } from './types';

// Icons
import {
  Brain,
  ChevronRight,
  GraduationCap,
  Target,
  Sparkles,
  Trophy,
  ArrowRight,
  Loader2,
  Briefcase,
  BookOpen
} from 'lucide-react';

const EDUCATION_LEVELS = [
  { id: 'POST_10TH', label: 'Completed 10th' },
  { id: '12TH_SCIENCE', label: '12th / PU (Science)' },
  { id: '12TH_COMMERCE', label: '12th / PU (Commerce)' },
  { id: '12TH_ARTS', label: '12th / PU (Arts)' },
  { id: 'DIPLOMA', label: 'Diploma' },
  { id: 'ITI', label: 'ITI' },
  { id: 'PARAMEDICAL', label: 'Paramedical' },
  { id: 'VOCATIONAL', label: 'Vocational' },
  { id: 'ENGINEERING', label: 'Engineering Degree' },
  { id: 'MEDICAL', label: 'Medical Degree' },
  { id: 'MANAGEMENT', label: 'Management Degree' },
  { id: 'LAW', label: 'Law Degree' },
  { id: 'DESIGN', label: 'Design Degree' },
  { id: 'SCIENCE', label: 'Science Degree (B.Sc)' },
  { id: 'COMMERCE', label: 'Commerce Degree (B.Com)' },
  { id: 'DEGREE', label: 'Other Degree' }
];

export default function CareerAssessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'INTRO' | 'EDUCATION' | 'QUIZ' | 'ANALYZING' | 'RESULT'>('INTRO');
  
  const [educationLevel, setEducationLevel] = useState<string>('');
  const [attemptId, setAttemptId] = useState<string>('');
  
  const [currentQuestion, setCurrentQuestion] = useState<AICareerQuestion | null>(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Hardcoded for demo, normally from auth context
  const userId = 'user-123'; 

  const startAssessment = async (level: string) => {
    setEducationLevel(level);
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/assessment/start', {
        userId,
        educationLevel: level
      });
      setAttemptId(res.data.attemptId);
      setCurrentQuestion(res.data.nextQuestion);
      setStep('QUIZ');
    } catch (err) {
      console.error(err);
      alert('Failed to start assessment. Ensure backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswer = async (choiceText: string) => {
    if (!currentQuestion) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/assessment/answer', {
        attemptId,
        questionId: currentQuestion._id,
        choiceText
      });

      if (res.data.isComplete) {
        setStep('ANALYZING');
        // Fetch result
        const resultRes = await axios.get(`http://localhost:5000/api/assessment/result/${res.data.resultId}`);
        setTimeout(() => {
          setResult(resultRes.data);
          setStep('RESULT');
        }, 2000); // Fake delay for AI effect
      } else {
        setCurrentQuestion(res.data.nextQuestion);
        setQuestionCount(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          
          {step === 'INTRO' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 px-4 py-2 rounded-full mb-8 border border-blue-500/20">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">AI-Powered Career Intelligence</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight leading-tight">
                Discover Your Perfect Career Path
              </h1>
              
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Stop guessing your future. Our advanced AI analyzes your 18-dimension cognitive and psychological profile to map you to the exact degree, college, and career where you'll thrive.
              </p>

              <button
                onClick={() => setStep('EDUCATION')}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="relative flex items-center space-x-2">
                  <span>Start Free Assessment</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>
          )}

          {step === 'EDUCATION' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What is your current education level?</h2>
                <p className="text-gray-400">This helps our AI adapt the questions to your exact context.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {EDUCATION_LEVELS.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => startAssessment(level.id)}
                    disabled={isSubmitting}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left group flex flex-col h-full"
                  >
                    <GraduationCap className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">{level.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'QUIZ' && currentQuestion && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-3xl mx-auto"
            >
              <div className="mb-8 flex justify-between items-center text-sm font-medium text-gray-400">
                <span className="bg-white/10 px-3 py-1 rounded-full text-blue-400">
                  {currentQuestion.category} Analysis
                </span>
                <span>Question {questionCount} of 5</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                <h2 className="text-2xl md:text-3xl font-semibold mb-10 leading-relaxed">
                  {currentQuestion.questionText}
                </h2>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.text)}
                      disabled={isSubmitting}
                      className="w-full p-6 text-left bg-black border border-white/10 rounded-2xl hover:border-blue-500 focus:border-blue-500 hover:bg-blue-500/5 transition-all group flex items-center justify-between"
                    >
                      <span className="text-lg text-gray-300 group-hover:text-white transition-colors">
                        {option.text}
                      </span>
                      <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-blue-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'ANALYZING' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500 blur-[40px] opacity-20 rounded-full"></div>
                <Brain className="h-24 w-24 text-blue-400 animate-pulse relative z-10" />
              </div>
              <h2 className="text-3xl font-bold mb-4">AI is computing your career matrix...</h2>
              <p className="text-gray-400 text-lg">Analyzing 18 cognitive and behavioral dimensions.</p>
            </motion.div>
          )}

          {step === 'RESULT' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto space-y-8"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full mb-6 border border-green-500/20">
                  <Trophy className="h-5 w-5" />
                  <span className="font-medium">Analysis Complete</span>
                </div>
                <h2 className="text-4xl font-bold mb-4">Your AI Career Blueprint</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  {result.aiAnalysisText}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Matches */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-2xl font-bold flex items-center space-x-2">
                    <Target className="text-blue-400" />
                    <span>Top Career Matches</span>
                  </h3>
                  
                  {result.topMatches.map((match, idx) => (
                    <div key={match.careerId?._id || idx} className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-500 to-purple-600 text-white font-bold py-2 px-6 rounded-bl-2xl">
                        {match.matchScore}% Match
                      </div>
                      
                      <h4 className="text-3xl font-bold mb-2">{match.careerName}</h4>
                      <p className="text-gray-400 mb-6">{match.careerId?.description || 'A highly recommended career path for your profile.'}</p>
                      
                      <div className="bg-black/50 rounded-xl p-4 mb-6">
                        <p className="text-sm font-medium text-gray-300">Why this matches you:</p>
                        <p className="text-gray-400 mt-2">{match.matchRationale}</p>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <button onClick={() => navigate('/colleges?stream=Engineering')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center space-x-2 transition-colors">
                          <GraduationCap className="h-5 w-5" />
                          <span>Find Colleges</span>
                        </button>
                        <button onClick={() => navigate('/jobs')} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl flex items-center space-x-2 transition-colors border border-white/5">
                          <Briefcase className="h-5 w-5" />
                          <span>View Jobs in this Field</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Profile Dimensions */}
                <div className="space-y-8">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                      <Brain className="text-purple-400" />
                      <span>Your Cognitive Profile</span>
                    </h3>
                    
                    <div className="space-y-4">
                      {Object.entries(result.finalScores).map(([dim, score]) => {
                        const pct = Math.min((score / 50) * 100, 100);
                        return (
                          <div key={dim}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300 capitalize">{dim}</span>
                              <span className="text-blue-400">{Math.round(pct)}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8">
                    <h3 className="text-xl font-bold mb-4">Recommended Next Step</h3>
                    <p className="text-blue-100 mb-6">
                      Based on your profile, you should start preparing for entrance exams in your recommended streams.
                    </p>
                    <button onClick={() => navigate('/exams')} className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
                      <BookOpen className="h-5 w-5" />
                      <span>Explore Entrance Exams</span>
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
