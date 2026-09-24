import React, { useState } from 'react';
import { Route, Map as MapIcon, Loader2, ArrowRight, Shuffle, AlertCircle, Clock } from 'lucide-react';
import api from '../../api/axios';

export default function RouteSwitchEngine() {
  const [currentPath, setCurrentPath] = useState('');
  const [desiredPath, setDesiredPath] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [switchData, setSwitchData] = useState<any>(null);

  const handleSwitchAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPath.trim() || !desiredPath.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const res = await api.post('/api/education-paths/route-switch', { currentPath, desiredPath });
      if (res.data.success) {
        setSwitchData(res.data.switchData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-sky-100 p-3 rounded-2xl">
          <Shuffle className="w-8 h-8 text-sky-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Education Route Switch Engine</h1>
          <p className="text-slate-500 font-medium">Find lateral entry options, bridge courses, and hidden shortcuts to jump tracks.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 max-w-4xl mx-auto">
        <form onSubmit={handleSwitchAnalysis} className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <MapIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={currentPath}
              onChange={(e) => setCurrentPath(e.target.value)}
              placeholder="Currently studying... (e.g. Diploma in CS)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
          </div>
          
          <ArrowRight className="w-8 h-8 text-sky-400 hidden md:block shrink-0" />
          
          <div className="flex-1 w-full relative">
            <Route className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={desiredPath}
              onChange={(e) => setDesiredPath(e.target.value)}
              placeholder="Want to switch to... (e.g. B.Tech IT)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!currentPath.trim() || !desiredPath.trim() || isAnalyzing}
            className={`w-full md:w-auto px-8 py-4 rounded-xl font-black text-white transition-all flex items-center justify-center gap-2 ${
              currentPath.trim() && desiredPath.trim() && !isAnalyzing
                ? 'bg-sky-600 hover:bg-sky-700 hover:scale-[1.02] shadow-xl shadow-sky-200'
                : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Find Route'}
          </button>
        </form>
      </div>

      {isAnalyzing && (
         <div className="flex flex-col items-center justify-center py-20">
           <Loader2 className="w-12 h-12 text-sky-600 animate-spin mb-4" />
           <p className="text-sky-800 font-bold animate-pulse">Calculating lateral entry vectors...</p>
         </div>
      )}

      {switchData && !isAnalyzing && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
          
          {/* Verdict Banner */}
          <div className={`p-6 rounded-3xl shadow-lg border-2 ${
            switchData.isPossible ? 'bg-slate-900 border-sky-500 text-white' : 'bg-red-50 border-red-200 text-red-900'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                switchData.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' :
                switchData.difficulty === 'Impossible' ? 'bg-red-500/20 text-red-600' :
                'bg-amber-500/20 text-amber-300'
              }`}>
                Difficulty: {switchData.difficulty}
              </span>
              {switchData.timeImpact && (
                <div className="flex items-center gap-1.5 text-sm font-bold opacity-80">
                  <Clock className="w-4 h-4" /> {switchData.timeImpact}
                </div>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-medium leading-relaxed">
              "{switchData.aiVerdict}"
            </h2>
          </div>

          {/* Strategy Steps */}
          {switchData.isPossible && switchData.switchStrategy && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -z-10"></div>
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-sky-600" /> Lateral Switch Strategy
              </h3>
              
              <div className="space-y-4">
                {switchData.switchStrategy.map((step: any, index: number) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-black text-sm border-2 border-white shadow-sm z-10 group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      {index !== switchData.switchStrategy.length - 1 && (
                        <div className="w-0.5 h-full bg-sky-50 mt-1"></div>
                      )}
                    </div>
                    <div className="pb-6 pt-1">
                      <h4 className="text-base font-bold text-slate-900">{step.step}</h4>
                      <p className="text-sm text-slate-600 mt-1">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!switchData.isPossible && (
             <div className="bg-rose-50 text-rose-800 p-6 rounded-2xl flex items-start gap-4 border border-rose-100">
               <AlertCircle className="w-6 h-6 shrink-0 text-rose-600" />
               <div>
                 <h4 className="font-bold mb-1">Hard Lock</h4>
                 <p className="text-sm">There is no official or legal pathway to jump directly between these two points. You will likely need to start from a foundational baseline (like re-taking 12th grade exams or an open university bridge course).</p>
               </div>
             </div>
          )}

        </div>
      )}
    </div>
  );
}
