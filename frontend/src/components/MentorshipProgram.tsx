import React, { useState } from 'react';
import { MENTORS_DATA } from '../data';
import { Mentor, ChatMessage } from '../types';
import { Users, Send, MessageCircleCode, CheckCircle2, Zap, ArrowRight, Loader2, Sparkles, BookOpen } from 'lucide-react';

export default function MentorshipProgram() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>({});
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const startChatWithMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    // Initialize standard greeting if chat is fresh empty
    if (!chats[mentor.id]) {
      setChats((prev) => ({
        ...prev,
        [mentor.id]: [
          {
            id: 'init',
            sender: 'mentor',
            text: `Hi! I'm ${mentor.name}, currently working as ${mentor.role} at ${mentor.companyOrHospital}. I started my journey just where you are now. Ask me any practical query you have about academic routes, day-to-day work, or typical compensation!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      }));
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedMentor) return;

    const currentMentor = selectedMentor;
    const currentInput = inputText;
    setInputText('');

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: currentInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update state instantly with student's request
    setChats((prev) => ({
      ...prev,
      [currentMentor.id]: [...(prev[currentMentor.id] || []), userMsg],
    }));

    setIsTyping(true);

    try {
      const chatHistory = chats[currentMentor.id] || [];
      const formattedHistory = [...chatHistory, userMsg].map((msg) => ({
        sender: msg.sender,
        text: msg.text,
      }));

      // Contact real simulated backend mentor
      const response = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorId: currentMentor.id,
          mentorName: currentMentor.name,
          mentorBio: currentMentor.bio,
          mentorRole: currentMentor.role,
          mentorCompany: currentMentor.companyOrHospital,
          messages: formattedHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Mentor timing out.');
      }

      const resJson = await response.json();
      const mentorReturnMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'mentor',
        text: resJson.text || 'Thank you for writing. I will share more details soon.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChats((prev) => ({
        ...prev,
        [currentMentor.id]: [...(prev[currentMentor.id] || []), mentorReturnMsg],
      }));
    } catch (err) {
      console.error(err);
      const errMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: 'system',
        text: 'The mentor is currently in an industrial shifts operation. Try submitting an academic question about general guidelines.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChats((prev) => ({
        ...prev,
        [currentMentor.id]: [...(prev[currentMentor.id] || []), errMessage],
      }));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="mentorship-page" className="space-y-8 animate-fade-in font-sans">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Users className="w-64 h-64 -mr-16 -mt-16" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="bg-emerald-500/30 text-emerald-100 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Industry Connections
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            Industry Mentorship Programs
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-emerald-100 leading-relaxed font-sans max-w-2xl">
            Learn from professionals who walked this path before you! Engage with simulated experts from Biocon, Capgemini, Apollo Healthcare, and BHEL to answer questions about real daily routines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Mentors Catalog List */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest px-1">
            Available Industry Advisors
          </h3>

          <div className="space-y-3">
            {MENTORS_DATA.map((mentor) => {
              const isSelected = selectedMentor?.id === mentor.id;
              return (
                <div
                  id={`mentor-panel-${mentor.id}`}
                  key={mentor.id}
                  onClick={() => startChatWithMentor(mentor)}
                  className={`border rounded-2xl p-5 hover:shadow-xs transition-all cursor-pointer text-left relative overflow-hidden ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/20 ring-2 ring-emerald-600/10'
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Placeholder dynamic initials avatar */}
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-base shrink-0 border border-indigo-200">
                      {mentor.name.split(' ').map((n) => n[0]).join('')}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">{mentor.name}</h4>
                        <span className="bg-slate-100 text-slate-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wide">
                          {mentor.stream.split('_').join(' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-semibold line-clamp-1">
                        {mentor.role} at {mentor.companyOrHospital}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {mentor.bio}
                      </p>
                    </div>
                  </div>

                  {/* Suggest queries hint */}
                  <div className="mt-3 pt-3 border-t border-slate-50 text-[10px] text-slate-500 italic block">
                    ⚡ {mentor.expertQueryHint}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Immersive Mentorship Live Chat Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-[550px] shadow-xs relative">
          {selectedMentor ? (
            <>
              {/* Active Mentor Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {selectedMentor.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{selectedMentor.name}</h4>
                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                      Active Counselor Session
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                        detail: { 
                          tab: 'streams', 
                          streamPreset: selectedMentor.stream 
                        } 
                      }));
                    }}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-black px-2.5 py-1.5 rounded-xl border border-indigo-100 flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>View Stream Info ➔</span>
                  </button>
                  <div className="text-[10px] bg-slate-100 px-2 py-1.5 rounded text-slate-600 font-bold uppercase tracking-wide">
                    Simulated AI Response
                  </div>
                </div>
              </div>

              {/* Chat Content Messages scrolling area */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 px-2">
                {(chats[selectedMentor.id] || []).map((msg) => {
                  const isUser = msg.sender === 'user';
                  const isSystem = msg.sender === 'system';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm font-sans space-y-1 ${
                        isUser
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : isSystem
                          ? 'bg-amber-50 text-amber-800 border border-amber-100 rounded-bl-none'
                          : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-100'
                      }`}>
                        <div className="whitespace-pre-line leading-relaxed">
                          {msg.text}
                        </div>
                        <div className={`text-[9px] text-right ${isUser ? 'text-emerald-200' : 'text-slate-400'}`}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-50 text-slate-500 rounded-2xl p-3 border border-slate-100 flex items-center gap-2 text-xs">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{selectedMentor.name} is keying response...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Typing Form */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex gap-2">
                <input
                  id="mentor-chat-input"
                  type="text"
                  placeholder={`Ask ${selectedMentor.name.split(' ')[0]} a query...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 hover:bg-slate-100/75 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 text-slate-800"
                />
                <button
                  id="btn-send-mentor-chat"
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs flex items-center gap-1 disabled:opacity-40 cursor-pointer transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            /* Idle Empty State */
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-100">
              <MessageCircleCode className="w-12 h-12 text-slate-300 animate-bounce" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">No Active Advisior Chat</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Click on any industry expert from the panel on the left to initiate a specialized counselor counseling simulation chat.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
