import React, { useState } from 'react';
import { ShieldAlert, Activity, CheckCircle, XCircle, AlertTriangle, Lightbulb, Loader2 } from 'lucide-react';
import api from '../../api/axios';

interface StabilityAnalysis {
  stabilityScore: number;
  confidenceLevel: string;
  supportingFactors: string[];
  riskFactors: string[];
  alternativeSuggestion: string;
}

export default function StabilityEngine() {
  const [careerInput, setCareerInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<StabilityAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerInput.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    try {
      const response = await api.post('/api/stability/analyze', { targetCareer: careerInput });
      if (response.data.success) {
        setAnalysis(response.data.analysis);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Analysis failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreRing = (score: number) => {
    let color = 'text-gray-200';
    let ringColor = 'text-gray-400';
    if (score >= 80) { color = 'text-emerald-500'; ringColor = 'text-emerald-200'; }
    else if (score >= 50) { color = 'text-amber-500'; ringColor = 'text-amber-200'; }
    else { color = 'text-red-500'; ringColor = 'text-red-200'; }

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="56" className={ringColor} strokeWidth="12" fill="none" />
          <circle 
            cx="64" cy="64" r="56" 
            className={color} 
            strokeWidth="12" 
            fill="none" 
            strokeDasharray="351.858"
            strokeDashoffset={351.858 - (351.858 * score) / 100}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-3xl font-black text-gray-900">{score}%</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans min-h-screen bg-slate-50/50">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 text-white shadow-lg mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Recommendation Stability Engine</h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
          AI isn't perfect. We play Devil's Advocate to expose the hidden risks and mismatches of your career choice before you commit.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden max-w-4xl mx-auto mb-12">
        <form onSubmit={runAnalysis} className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-bold text-slate-700 mb-2">Target Career / Goal</label>
            <input
              type="text"
              required
              className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors shadow-sm font-medium"
              placeholder="e.g. AI Researcher, Commercial Pilot, Investment Banker..."
              value={careerInput}
              onChange={(e) => setCareerInput(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>
          <button
            type="submit"
            disabled={isAnalyzing || !careerInput}
            className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-3 shrink-0"
          >
            {isAnalyzing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</>
            ) : (
              <><Activity className="w-5 h-5" /> Test Stability</>
            )}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>}

        {analysis && (
          <div className="p-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
              <div className="shrink-0 text-center">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Overall Stability</h3>
                {getScoreRing(analysis.stabilityScore)}
                <div className="mt-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${
                    analysis.confidenceLevel === 'High' ? 'bg-emerald-100 text-emerald-700' :
                    analysis.confidenceLevel === 'Medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    AI Confidence: {analysis.confidenceLevel}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-emerald-600 flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5" /> Supporting Evidence
                  </h3>
                  <ul className="space-y-2">
                    {analysis.supportingFactors.map((factor, i) => (
                      <li key={i} className="flex items-start gap-3 bg-emerald-50/50 p-3 rounded-lg text-emerald-900 border border-emerald-100/50">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span className="font-medium text-sm">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-2xl border border-red-100 p-6 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <AlertTriangle className="w-48 h-48 text-red-900" />
              </div>
              <h3 className="text-xl font-black text-red-700 flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6" /> Devil's Advocate: The Disagreements
              </h3>
              <ul className="space-y-3 relative z-10">
                {analysis.riskFactors.map((risk, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-red-100 text-slate-800">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-sm leading-relaxed">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {analysis.alternativeSuggestion && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-xl shrink-0">
                  <Lightbulb className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-indigo-900 mb-2">Better Suited Alternative?</h3>
                  <p className="text-indigo-800 font-medium leading-relaxed">{analysis.alternativeSuggestion}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
