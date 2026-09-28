import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Languages, Loader2, Volume2, Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi (हिंदी)' },
  { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
  { code: 'te', label: 'Telugu (తెలుగు)' },
  { code: 'ta', label: 'Tamil (தமிழ்)' },
];

export default function AccessibilityOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translating, setTranslating] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Voice Navigation using Web Speech API
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(finalTranscript);
        handleVoiceCommand(finalTranscript.toLowerCase());
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    if (isListening) {
      try { recognition.start(); } catch(e) {}
    } else {
      try { recognition.stop(); } catch(e) {}
    }

    return () => {
      try { recognition.stop(); } catch(e) {}
    };
  }, [isListening]);

  const handleVoiceCommand = (command: string) => {
    if (command.includes('home') || command.includes('dashboard')) {
      navigate('/');
    } else if (command.includes('college') || command.includes('engineering colleges')) {
      navigate('/colleges');
    } else if (command.includes('scholarship')) {
      navigate('/scholarships');
    } else if (command.includes('exam')) {
      navigate('/exams');
    } else if (command.includes('job') || command.includes('career')) {
      navigate('/jobs');
    } else if (command.includes('transition') || command.includes('skill gap')) {
      navigate('/career-transition');
    } else if (command.includes('simulator') || command.includes('admission')) {
      navigate('/simulator');
    } else if (command.includes('prep') || command.includes('weak subject')) {
      navigate('/exam-prep');
    }
    
    // Auto turn off after a successful final command
    setTimeout(() => setIsListening(false), 2000);
  };

  // Multilingual Engine
  const handleTranslatePage = async (targetLangCode: string) => {
    const lang = LANGUAGES.find(l => l.code === targetLangCode);
    if (!lang || lang.code === 'en') {
      setCurrentLanguage('en');
      window.location.reload(); // Simplest way to revert to original English app state
      return;
    }

    setCurrentLanguage(lang.code);
    setTranslating(true);
    setIsOpen(false);

    try {
      // In a real sophisticated app, we'd wrap all text nodes in a context.
      // Here, we grab the main content block to translate it using our AI endpoint.
      const mainElement = document.querySelector('main') || document.querySelector('.page-content');
      if (!mainElement) return;

      const originalText = mainElement.innerText;
      
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: originalText.substring(0, 3000), // Trim to avoid huge payloads
          targetLanguage: lang.label
        })
      });
      
      const data = await res.json();
      if (data.success) {
        // Overlay the translated text nicely
        const overlay = document.createElement('div');
        overlay.id = 'ai-translation-overlay';
        overlay.className = 'fixed inset-0 bg-slate-950/95 z-50 overflow-y-auto p-8 md:p-16 animate-fade-in';
        overlay.innerHTML = `
          <div class="max-w-4xl mx-auto bg-slate-900 border border-emerald-500/30 p-8 rounded-xl shadow-2xl">
            <div class="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
              <h2 class="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                <Globe class="w-6 h-6" /> Translated Content (${lang.label})
              </h2>
              <button id="close-translation" class="text-slate-400 hover:text-white bg-slate-800 px-4 py-2 rounded">Close</button>
            </div>
            <div class="prose prose-invert max-w-none text-lg leading-relaxed whitespace-pre-wrap">
              ${data.translation}
            </div>
          </div>
        `;
        document.body.appendChild(overlay);
        
        document.getElementById('close-translation')?.addEventListener('click', () => {
          overlay.remove();
          setCurrentLanguage('en');
        });
      }
    } catch (err) {
      console.error('Translation failed', err);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Transcript Toast */}
      {isListening && transcript && (
        <div className="bg-slate-900 border border-blue-500/30 text-blue-100 px-4 py-3 rounded-lg shadow-xl max-w-xs animate-fade-in flex items-start gap-3">
          <Volume2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 animate-pulse" />
          <p className="text-sm font-medium">"{transcript}"</p>
        </div>
      )}

      {/* Main Controls */}
      <div className={`flex flex-col gap-2 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-xl flex flex-col gap-2">
          <div className="text-xs font-bold text-slate-500 uppercase px-2 pb-1 border-b border-slate-800">Language</div>
          {LANGUAGES.map(lang => (
            <button 
              key={lang.code}
              onClick={() => handleTranslatePage(lang.code)}
              className={`text-sm text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${currentLanguage === lang.code ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              {lang.label}
              {translating && currentLanguage === lang.code && <Loader2 className="w-3 h-3 animate-spin" />}
            </button>
          ))}
          
          <div className="text-xs font-bold text-slate-500 uppercase px-2 pb-1 pt-2 border-b border-t border-slate-800 mt-1">Voice Nav</div>
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`text-sm text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${isListening ? 'bg-blue-500/20 text-blue-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            {isListening ? 'Stop Listening' : 'Start Listening'}
            {isListening ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-slate-800 text-white rotate-180' : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-105'}`}
      >
        <Globe className="w-6 h-6" />
      </button>
    </div>
  );
}
