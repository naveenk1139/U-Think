import React, { useState } from 'react';
import { Target, Search, Loader2, Link as LinkIcon, ShieldAlert, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';

export default function EligibilityChain() {
  const [targetGoal, setTargetGoal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chainResult, setChainResult] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetGoal.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const res = await api.post('/api/education-paths/eligibility-chain', { targetGoal });
      if (res.data.success) {
        setChainResult(res.data.chainData);
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
        <div className="bg-amber-100 p-3 rounded-2xl">
          <LinkIcon className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Eligibility Chain Analyzer</h1>
          <p className="text-slate-500 font-medium">Type your dream career or degree, and we'll map the exact prerequisites backwards to 10th grade.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 max-w-2xl mx-auto">
        <form onSubmit={handleAnalyze} className="flex gap-4">
          <div className="relative flex-1">
            <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              placeholder="e.g., Data Scientist, MBBS, Architect..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={!targetGoal.trim() || isAnalyzing}
            className={`px-8 rounded-xl font-black text-white transition-all flex items-center justify-center gap-2 ${
              targetGoal.trim() && !isAnalyzing
                ? 'bg-amber-600 hover:bg-amber-700 hover:scale-[1.02] shadow-xl shadow-amber-200'
                : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5" /> Analyze</>}
          </button>
        </form>
      </div>

      {isAnalyzing && (
         <div className="flex flex-col items-center justify-center py-20">
           <Loader2 className="w-12 h-12 text-amber-600 animate-spin mb-4" />
           <p className="text-amber-800 font-bold animate-pulse">Running reverse graph traversal...</p>
         </div>
      )}

      {chainResult && !isAnalyzing && (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl mb-12">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-2">AI Analysis</h3>
            <p className="text-lg font-medium leading-relaxed">"{chainResult.aiAnalysis}"</p>
          </div>

          <div className="relative">
            {/* The vertical timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-amber-100 rounded-full z-0"></div>

            <div className="space-y-8 relative z-10">
              {chainResult.chain.map((step: any, index: number) => (
                <div key={index} className="flex gap-6 items-start group">
                  
                  {/* Node icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-4 border-white shadow-lg transition-transform group-hover:scale-110 ${
                    step.isStrictlyMandatory ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <span className="font-black text-xl">{step.stepNumber}</span>
                  </div>
                  
                  {/* Node content */}
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex-1 group-hover:border-amber-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{step.level}</h3>
                      {step.isStrictlyMandatory ? (
                        <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" /> Mandatory
                        </span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Recommended
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{step.requirement}</h4>
                    
                    {step.isStrictlyMandatory && step.consequenceOfFailure && (
                      <p className="text-sm text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
                        <strong>If missed:</strong> {step.consequenceOfFailure}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Target Goal Node */}
              <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-4 border-white shadow-lg bg-slate-900 text-amber-400">
                    <Target className="w-8 h-8" />
                  </div>
                  <div className="bg-slate-900 p-6 rounded-3xl shadow-xl flex-1 flex flex-col justify-center">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-400">Target Reached</h3>
                    <h4 className="text-2xl font-black text-white">{chainResult.target}</h4>
                  </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
