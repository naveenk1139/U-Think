import React, { useState } from 'react';
import { Beaker, ArrowRight, Loader2, Lock, Unlock, AlertTriangle } from 'lucide-react';
import api from '../../api/axios';

const AVAILABLE_SUBJECTS = [
  'Physics', 'Chemistry', 'Mathematics', 'Biology', 
  'Computer Science', 'Economics', 'Accountancy', 
  'Business Studies', 'History', 'Political Science', 
  'Geography', 'Psychology', 'Sociology'
];

export default function ImpactSimulator() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== sub));
    } else {
      if (selectedSubjects.length < 5) {
        setSelectedSubjects([...selectedSubjects, sub]);
      }
    }
  };

  const handleSimulate = async () => {
    if (selectedSubjects.length < 3) return;
    
    setIsSimulating(true);
    try {
      const res = await api.post('/api/education-paths/simulate-combo', { subjects: selectedSubjects });
      if (res.data.success) {
        setSimulationResult(res.data.simulation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-fuchsia-100 p-3 rounded-2xl">
          <Beaker className="w-8 h-8 text-fuchsia-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Subject Combination Impact Simulator</h1>
          <p className="text-slate-500 font-medium">Select 3-5 subjects to see what degrees you unlock, and what you lose permanently.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-black text-slate-900 mb-4">Choose Subjects</h2>
          <p className="text-sm text-slate-500 mb-6">Pick up to 5 core subjects.</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {AVAILABLE_SUBJECTS.map((sub) => (
              <button
                key={sub}
                onClick={() => toggleSubject(sub)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedSubjects.includes(sub)
                    ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <button
            onClick={handleSimulate}
            disabled={selectedSubjects.length < 3 || isSimulating}
            className={`w-full py-4 rounded-xl font-black text-white transition-all flex items-center justify-center gap-2 ${
              selectedSubjects.length >= 3 && !isSimulating
                ? 'bg-slate-900 hover:bg-slate-800 hover:scale-[1.02] shadow-xl'
                : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {isSimulating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Run Impact Simulation'}
          </button>
          
          {selectedSubjects.length < 3 && (
            <p className="text-xs text-amber-600 text-center mt-3 font-semibold flex items-center justify-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Select at least 3 subjects
            </p>
          )}
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {!simulationResult && !isSimulating && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
              <Beaker className="w-16 h-16 mb-4 text-slate-300" />
              <p className="font-bold">Select subjects and run the simulation.</p>
            </div>
          )}

          {isSimulating && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-fuchsia-100 bg-fuchsia-50/30 rounded-3xl text-fuchsia-600">
              <Loader2 className="w-16 h-16 mb-4 animate-spin" />
              <p className="font-bold animate-pulse">Consulting the Knowledge Graph...</p>
            </div>
          )}

          {simulationResult && !isSimulating && (
            <div className="space-y-6 animate-fade-in-up">
              
              <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
                <h3 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-2">AI Verdict</h3>
                <p className="text-lg font-medium leading-relaxed">"{simulationResult.aiSummary}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Unlocked */}
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Unlock className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-black text-emerald-900">Unlocked Paths</h3>
                  </div>
                  <div className="space-y-3">
                    {simulationResult.enabledPaths.map((path: any, idx: number) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
                        <h4 className="font-bold text-emerald-950">{path.degree}</h4>
                        <p className="text-sm text-emerald-700 mt-1">{path.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Locked */}
                <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-6 h-6 text-rose-600" />
                    <h3 className="text-xl font-black text-rose-900">Permanently Locked</h3>
                  </div>
                  <div className="space-y-3">
                    {simulationResult.lockedPaths.map((path: any, idx: number) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-rose-100">
                        <h4 className="font-bold text-rose-950">{path.degree}</h4>
                        <p className="text-sm text-rose-700 mt-1">{path.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
