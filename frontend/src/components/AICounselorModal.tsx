import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, X, Send, Bot, Loader2, Info, GraduationCap, 
  Volume2, VolumeX, Copy, Check, RotateCcw, 
  MessageSquarePlus, Trash2, Menu, Settings,
  Paperclip, Mic, ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';

interface AICounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  _id?: string;
  role: 'user' | 'model' | 'system' | 'function';
  content: string;
  createdAt?: string;
}

interface Conversation {
  _id: string;
  title: string;
  updatedAt: string;
}

export default function AICounselorModal({ isOpen, onClose }: AICounselorModalProps) {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchConversations();
    }
  }, [isOpen, currentUser]);

  const fetchConversations = async () => {
    try {
      const res = await fetch(`/api/ai/conversations?userId=${(currentUser as any)?._id || currentUser?.id}`);
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadConversation = async (id: string) => {
    setActiveConversationId(id);
    try {
      const res = await fetch(`/api/ai/conversations/${id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createNewChat = () => {
    setActiveConversationId(null);
    setMessages([]);
  };

  const deleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/ai/conversations/${id}`, { method: 'DELETE' });
      setConversations(prev => prev.filter(c => c._id !== id));
      if (activeConversationId === id) {
        createNewChat();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || isStreaming) return;

    setInputText('');
    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg, { role: 'model', content: '' }]); // Append empty model msg for streaming
    setIsStreaming(true);

    try {
      const response = await fetch('/api/ai/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser?.id || (currentUser as any)?._id,
          conversationId: activeConversationId,
          message: textToSend
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Error ${response.status}: Failed to reach AI.`);
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      let aiResponseText = "";
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr) {
              try {
                const data = JSON.parse(dataStr);
                if (data.error) {
                   aiResponseText = data.error;
                   setMessages(prev => {
                     const newMsgs = [...prev];
                     newMsgs[newMsgs.length - 1].content = aiResponseText;
                     return newMsgs;
                   });
                } else if (data.done) {
                  if (!activeConversationId && data.conversationId) {
                    setActiveConversationId(data.conversationId);
                    fetchConversations();
                  }
                } else if (data.text) {
                  aiResponseText += data.text;
                  setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1].content = aiResponseText;
                    return newMsgs;
                  });
                }
              } catch (e) {
                console.error("Error parsing stream chunk", e, dataStr);
              }
            }
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = `⚠️ ${err.message || "AI Counselor is temporarily unavailable."}`;
        return newMsgs;
      });
    } finally {
      setIsStreaming(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-[100] animate-fade-in font-sans">
      <div className="bg-card rounded-2xl w-full max-w-5xl shadow-2xl border border-border flex overflow-hidden h-[90vh]">
        
        {/* Sidebar */}
        <div className={`bg-background border-r border-border flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
          <div className="p-4 border-b border-border flex items-center justify-between min-w-[16rem]">
            <button 
              onClick={createNewChat}
              className="flex-1 flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              New Chat
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto min-w-[16rem]">
            <div className="p-2 space-y-1">
              <p className="px-3 py-2 text-[10px] font-bold text-text-muted uppercase tracking-wider">Chat History</p>
              {conversations.map(conv => (
                <div 
                  key={conv._id} 
                  onClick={() => loadConversation(conv._id)}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors ${activeConversationId === conv._id ? 'border-border text-text-primary font-semibold' : 'text-text-secondary hover:bg-background-secondary'}`}
                >
                  <span className="truncate flex-1">{conv.title}</span>
                  <button 
                    onClick={(e) => deleteConversation(conv._id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-text-muted hover:text-red-500 rounded transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {conversations.length === 0 && (
                <p className="px-3 py-4 text-xs text-text-muted text-center">No history yet</p>
              )}
            </div>
          </div>
          
          <div className="p-4 border-t border-border min-w-[16rem]">
            <button 
              onClick={() => {
                onClose();
                window.location.href = '/settings';
              }}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors w-full p-2 rounded-lg hover:bg-background-secondary cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              Counselor Settings
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-card">
          
          {/* Header */}
          <div className="bg-card border-b border-border p-3 sm:p-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 text-text-muted hover:text-text-primary hover:bg-background-secondary rounded-lg cursor-pointer transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-text-primary flex items-center gap-2">
                  U THINK AI Career Counselor
                </h3>
                <p className="text-[10px] sm:text-xs text-text-muted font-medium">Personalized career guidance for your future</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-secondary bg-background-secondary hover:border-border rounded-full p-1.5 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {!currentUser ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto animate-fade-in pb-10">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none border border-blue-100">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-text-primary mb-2">Login Required</h2>
                <p className="text-sm text-text-muted mb-8">Please log in or create an account to use the AI Career Counselor and get personalized guidance.</p>
                <button
                  onClick={() => {
                    onClose();
                    window.location.href = '/login';
                  }}
                  className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md"
                >
                  Log In Now
                </button>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto animate-fade-in pb-10">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none border border-blue-100">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-text-primary mb-2">What should I help you with?</h2>
                <p className="text-sm text-text-muted mb-8">I'm connected to the U THINK database and can provide personalized career and college advice based on your profile.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {[
                    { icon: '🎯', text: "Find my career" },
                    { icon: '🎓', text: "Find colleges near me" },
                    { icon: '📚', text: "Recommend courses" },
                    { icon: '📝', text: "Find exams" },
                    { icon: '💼', text: "Find jobs" },
                    { icon: '🛣️', text: "Create my roadmap" },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => handleSubmit(undefined, btn.text)}
                      className="bg-card border border-border hover:border-blue-400 hover:shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none text-text-primary p-3 rounded-xl text-sm font-medium transition-all text-left flex items-center gap-3 cursor-pointer group"
                    >
                      <span className="text-lg bg-background p-1.5 rounded-lg group-hover:scale-110 transition-transform">{btn.icon}</span>
                      {btn.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className="flex gap-3 max-w-[85%] sm:max-w-[75%]">
                      
                      {!isUser && (
                        <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none mt-1">
                          <Bot className="w-5 h-5" />
                        </div>
                      )}
                      
                      <div className={`rounded-2xl px-5 py-3.5 text-sm sm:text-base leading-relaxed ${
                        isUser
                          ? 'bg-primary text-white rounded-br-none shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none'
                          : 'bg-background text-text-primary border border-border rounded-bl-none shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none'
                      }`}>
                        {isUser ? (
                          <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                        ) : (
                          <div className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-primary">
                            {msg.content === '' && isStreaming && idx === messages.length - 1 ? (
                              <div className="flex items-center gap-2 text-text-muted">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="animate-pulse">Thinking...</span>
                              </div>
                            ) : (
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            )}
                          </div>
                        )}
                      </div>

                      {isUser && (
                        <div className="w-8 h-8 bg-slate-800 text-white rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none mt-1 font-bold text-xs">
                          {currentUser?.name?.substring(0, 2).toUpperCase() || 'ME'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-card border-t border-border">
            <form onSubmit={(e) => handleSubmit(e)} className="max-w-4xl mx-auto relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button type="button" className="p-2 text-text-muted hover:text-primary hover:bg-blue-50 rounded-full transition-colors cursor-pointer" title="Upload Document">
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Message U THINK AI Counselor..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isStreaming || !currentUser}
                className="w-full bg-background border border-border hover:border-border focus:border-blue-500 focus:ring-4 focus:ring-primary/10 rounded-2xl pl-14 pr-24 py-4 text-[15px] font-medium text-text-primary transition-all outline-none disabled:opacity-50"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button type="button" disabled={isStreaming || !currentUser} className="p-2 text-text-muted hover:text-primary hover:bg-blue-50 rounded-full transition-colors cursor-pointer" title="Voice Input">
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  disabled={!inputText.trim() || isStreaming || !currentUser}
                  className="bg-primary hover:bg-primary-hover text-white p-2.5 rounded-xl cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
            <p className="text-center text-[11px] text-text-muted font-medium mt-2">
              AI Counselor uses Gemini API and your U THINK profile to generate personalized responses. It can make mistakes. Check important information.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
