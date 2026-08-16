import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { SPECS_DB } from './ExamsDirectory'; // Adjust if needed, or pass the spec as a prop

interface SpecializationDetailViewProps {
  specId: string;
  onBack: () => void;
  onNavigateToJobExplorer?: (role: string) => void;
  onNavigateToSpec?: (specId: string) => void;
}

export default function SpecializationDetailView({ 
  specId, 
  onBack, 
  onNavigateToJobExplorer = () => {}, 
  onNavigateToSpec = () => {} 
}: SpecializationDetailViewProps) {
  const spec = SPECS_DB.find((s: { id: string }) => s.id === specId);

  if (!spec) {
    return <div className="p-8 text-center text-slate-500">Specialization not found.</div>;
  }

  const similarPaths = SPECS_DB.filter((s: { id: string }) => s.id !== specId)
    .map((s: { id: string; subjects: string[]; name?: string; category?: string; demand?: string; weight?: number; rank?: number; roles?: string[]; description?: string }) => ({
      ...s,
      overlapCount: s.subjects.filter((sub: string) => spec.subjects.includes(sub)).length
    }))
    .filter((s: { overlapCount: number }) => s.overlapCount > 0)
    .sort((a: { overlapCount: number }, b: { overlapCount: number }) => b.overlapCount - a.overlapCount)
    .slice(0, 3);
  return (
    <div className="min-h-screen bg-white p-6 md:p-12 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors mb-8 font-bold text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Specializations
      </button>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
              {spec.demand}
            </span>
            <span className="bg-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
              {spec.category}
            </span>
            {spec.trending && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                TRENDING
              </span>
            )}
            <span className="text-[10px] font-bold text-slate-400">
              Rank: #{spec.rank} | Weight: {spec.weight}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            {spec.name}
          </h1>
        </div>

        <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            DESCRIPTION
          </h4>
          <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed">
            {spec.description}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            CORE SUBJECTS
          </h4>
          <div className="flex flex-wrap gap-2">
            {spec.subjects.map((sub: string, i: number) => (
              <span key={i} className="text-sm font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-xl">
                {sub}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            CAREER ROLES
          </h4>
          <div className="flex flex-wrap gap-2">
            {spec.roles.map((role: string, i: number) => (
              <button 
                key={i} 
                onClick={() => onNavigateToJobExplorer(role)}
                className="text-sm font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-colors"
              >
                💼 {role}
              </button>
            ))}
          </div>
        </div>

        {similarPaths.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              SUGGESTED SIMILAR PATHS
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similarPaths.map((s: { id: string; roles?: string[]; name?: string; category?: string; overlapCount: number }) => (
                <button 
                    key={s.id} 
                    onClick={() => {
                      if (typeof onNavigateToJobExplorer === 'function') {
                        onNavigateToJobExplorer(s.roles?.[0] || s.name || '');
                      }
                    }}
                    className="text-left bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:border-emerald-200 transition-colors"
                >
                  <h5 className="font-bold text-slate-900 text-sm mb-1">{s.name}</h5>
                  <p className="text-xs text-slate-500 font-medium">{s.category} • {s.overlapCount} overlapping subjects</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
