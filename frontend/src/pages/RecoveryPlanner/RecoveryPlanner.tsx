import React, { useState } from 'react';
import { HeartPulse, HeartHandshake, Loader2, ArrowRight, ShieldCheck, Activity, Target } from 'lucide-react';
import api from '../../api/axios';

export default function RecoveryPlanner() {
  const [failureContext, setFailureContext] = useState('');
  const [ultimateGoal, setUltimateGoal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recoveryData, setRecoveryData] = useState<any>(null);

  const handleRecoveryPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!failureContext.trim() || !ultimateGoal.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const res = await api.post('/api/education-paths/academic-recovery', { failureContext, ultimateGoal });
      if (res.data.success) {
        setRecoveryData(res.data.recoveryData);
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
        <div className="bg-rose-100 p-3 rounded-2xl">
          <HeartPulse className="w-8 h-8 text-rose-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Academic Recovery Path Planner</h1>
          <p className="text-slate-500 font-medium">Failed an exam? Dropped out? Don't panic. There is almost always a way back.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 max-w-4xl mx-auto">
        <form onSubmit={handleRecoveryPlan} className="space-y-4">
          <div className="relative">
            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={failureContext}
              onChange={(e) => setFailureContext(e.target.value)}
              placeholder="What went wrong? (e.g. Failed 12th Math, Scored 45% in Boards)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            />
          </div>
          
          <div className="relative">
            <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={ultimateGoal}
              onChange={(e) => setUltimateGoal(e.target.value)}
              placeholder="What is your dream goal? (e.g. Want to study B.Tech)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!failureContext.trim() || !ultimateGoal.trim() || isAnalyzing}
            className={`w-full py-4 rounded-xl font-black text-white transition-all flex items-center justify-center gap-2 ${
              failureContext.trim() && ultimateGoal.trim() && !isAnalyzing
                ? 'bg-rose-600 hover:bg-rose-700 hover:scale-[1.02] shadow-xl shadow-rose-200'
                : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Find My Way Back'}
          </button>
        </form>
      </div>

      {isAnalyzing && (
         <div className="flex flex-col items-center justify-center py-20">
           <Loader2 className="w-12 h-12 text-rose-600 animate-spin mb-4" />
           <p className="text-rose-800 font-bold animate-pulse">Searching for open schooling & recovery pathways...</p>
         </div>
      )}

      {recoveryData && !isAnalyzing && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
          
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8 rounded-3xl shadow-xl text-white">
             <div className="flex items-center gap-3 mb-4">
               <HeartHandshake className="w-8 h-8 opacity-80" />
               <h2 className="text-2xl font-black">You are not alone.</h2>
             </div>
             <p className="text-lg font-medium leading-relaxed opacity-95">
               {recoveryData.compassionateMessage}
             </p>
          </div>

          {recoveryData.alternativeGoal && (
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl flex gap-4">
              <ShieldCheck className="w-8 h-8 text-amber-600 shrink-0" />
              <div>
                <h3 className="font-bold text-amber-900 mb-1">Course Correction</h3>
                <p className="text-amber-800">Your exact original goal might be locked, but the system highly recommends this alternative: <strong>{recoveryData.alternativeGoal}</strong></p>
              </div>
            </div>
          )}

          {recoveryData.isRecoverable && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-black text-slate-900 mb-6">Your Action Plan</h3>
              
              <div className="space-y-6">
                {recoveryData.recoverySteps.map((step: any, index: number) => (
                  <div key={index} className="flex gap-4 group bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-rose-200 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Step {index + 1}</span>
                        <div className="flex gap-2">
                          <span className="bg-white px-2 py-1 rounded shadow-sm text-xs font-bold text-slate-600">{step.timeline}</span>
                          <span className={`px-2 py-1 rounded shadow-sm text-xs font-bold ${
                            step.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                            step.difficulty === 'Hard' ? 'bg-rose-100 text-rose-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>{step.difficulty}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{step.step}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
