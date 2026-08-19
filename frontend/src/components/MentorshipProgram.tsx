import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { StructuredMentor, ChatMessage } from '../types';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Search, Filter, Send, ShieldCheck, 
  Bot, Briefcase, GraduationCap, MapPin, Loader2, ArrowRight
} from 'lucide-react';

const EDUCATION_LEVELS = [
  'All', 'POST_10TH', '12TH_SCIENCE', '12TH_COMMERCE', '12TH_ARTS',
  'DIPLOMA', 'ITI', 'PARAMEDICAL', 'VOCATIONAL', 'ENGINEERING',
  'MEDICAL', 'MANAGEMENT', 'LAW', 'DESIGN', 'SCIENCE', 'COMMERCE', 'DEGREE'
];

export default function MentorshipProgram() {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState<StructuredMentor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedEdu, setSelectedEdu] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Chat State
  const [selectedMentor, setSelectedMentor] = useState<StructuredMentor | null>(null);
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>({});
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMentors();
  }, [selectedEdu, searchQuery]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, isTyping]);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedEdu !== 'All') params.append('educationLevel', selectedEdu);
      if (searchQuery) params.append('search', searchQuery);

      const res = await axios.get(`http://localhost:5000/api/mentors?${params.toString()}`);
      setMentors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startChat = (mentor: StructuredMentor) => {
    setSelectedMentor(mentor);
    if (!chats[mentor.mentorId]) {
      setChats(prev => ({
        ...prev,
        [mentor.mentorId]: [{
          id: 'init',
          sender: 'mentor',
          text: `Hi! I'm ${mentor.name}. I specialize in ${mentor.specialization}. How can I help you with your career journey today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]
      }));
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedMentor) return;

    const mentorId = selectedMentor.mentorId;
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setInputText('');
    setChats(prev => ({
      ...prev,
      [mentorId]: [...(prev[mentorId] || []), userMsg]
    }));
    
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/api/mentors/chat', {
        mentorId: selectedMentor.mentorId,
        message: userMsg.text,
        history: chats[mentorId],
        studentContext: { educationLevel: selectedEdu }
      });

      const mentorMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'mentor',
        text: res.data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChats(prev => ({
        ...prev,
        [mentorId]: [...(prev[mentorId] || []), mentorMsg]
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-64 h-64 -mr-16 -mt-16" />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Industry Mentorship Platform</h1>
            <p className="text-indigo-200">Connect with verified industry experts and AI Career Personas tailored to your specific education level.</p>
          </div>
          <div className="relative z-10 hidden md:block">
            <button onClick={() => navigate('/quiz')} className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition flex items-center space-x-2">
              <span>Take Career Assessment</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-280px)] min-h-[600px]">
          
          {/* Mentors Catalog */}
          <div className="lg:col-span-5 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full">
            {/* Filters */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search mentors, careers, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                <Filter className="h-4 w-4 text-slate-400 shrink-0" />
                {EDUCATION_LEVELS.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedEdu(level)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                      selectedEdu === level 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {level.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                </div>
              ) : mentors.length === 0 ? (
                <div className="text-center text-slate-500 py-12">
                  <Users className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                  <p>No mentors found for this filter.</p>
                </div>
              ) : (
                mentors.map(mentor => (
                  <div
                    key={mentor.mentorId}
                    onClick={() => startChat(mentor)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      selectedMentor?.mentorId === mentor.mentorId 
                        ? 'border-indigo-600 bg-indigo-50/30 shadow-md ring-1 ring-indigo-600' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                          {mentor.name}
                          {mentor.mentorType === 'REAL' ? (
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Bot className="h-4 w-4 text-indigo-500" />
                          )}
                        </h3>
                        <p className="text-sm text-slate-600 font-medium">{mentor.jobTitle} at {mentor.company}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                        mentor.mentorType === 'REAL' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {mentor.mentorType === 'REAL' ? 'Verified' : 'AI Mentor'}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-slate-500 gap-2">
                        <Briefcase className="h-4 w-4 text-slate-400" />
                        <span>{mentor.experience} Experience</span>
                      </div>
                      <div className="flex items-center text-xs text-slate-500 gap-2">
                        <GraduationCap className="h-4 w-4 text-slate-400" />
                        <span>{mentor.education}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {mentor.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                          {skill}
                        </span>
                      ))}
                      {mentor.skills.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                          +{mentor.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full">
            {selectedMentor ? (
              <>
                <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm ${
                      selectedMentor.mentorType === 'REAL' ? 'bg-emerald-500' : 'bg-indigo-500'
                    }`}>
                      {selectedMentor.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                        {selectedMentor.name}
                      </h2>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Online • {selectedMentor.industry}
                      </p>
                    </div>
                  </div>
                  {selectedMentor.mentorType === 'REAL' && (
                    <button className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition">
                      Book Session
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                  {chats[selectedMentor.mentorId]?.map(msg => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                          isUser ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                        }`}>
                          <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.text}</p>
                          <span className={`text-[10px] block mt-2 ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center space-x-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-slate-100">
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder={`Ask ${selectedMentor.name.split(' ')[0]} for advice...`}
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim() || isTyping}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                  
                  <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
                    {['What skills should I learn?', 'How do I get an internship?', 'What is a typical day like?'].map(q => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setInputText(q)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg shrink-0 transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                <Users className="h-16 w-16 mb-4 text-slate-300" />
                <h3 className="text-xl font-bold text-slate-600 mb-2">No Active Chat</h3>
                <p className="text-center max-w-md">Select a mentor from the list to start a personalized career guidance session.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
