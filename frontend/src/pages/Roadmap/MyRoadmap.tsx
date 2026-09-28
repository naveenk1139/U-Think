import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Target, CheckCircle, Clock, GraduationCap, Briefcase, Zap, BookOpen, Map } from 'lucide-react';

export default function MyRoadmap() {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assuming student_test_123 for now
    axios.get('/api/student-roadmap/my-roadmaps?studentId=student_test_123')
      .then(res => {
        setRoadmaps(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Roadmaps...</div>;
  if (roadmaps.length === 0) return (
    <div className="p-8 max-w-4xl mx-auto text-center mt-20">
      <h2 className="text-2xl font-bold text-slate-800">No Roadmaps Found</h2>
      <p className="text-slate-600 mt-2">Go to the 6 ASTRA Education Tree, find a Career, and save it to generate your roadmap!</p>
    </div>
  );

  const activeRoadmap = roadmaps[0]; // Just showing the most recent one for now

  return (
    <div className="max-w-5xl mx-auto p-6 mt-6">
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Target className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Active Roadmap
          </span>
          <h1 className="text-4xl font-extrabold mt-4 mb-2">Target: {activeRoadmap.targetCareerName}</h1>
          <p className="text-indigo-200 mb-6">Current Phase: {activeRoadmap.currentPhase}</p>
          
          <div className="w-full bg-slate-800 rounded-full h-3 mb-2 overflow-hidden">
            <div className="bg-emerald-500 h-3 rounded-full" style={{ width: `${activeRoadmap.overallProgress}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-indigo-300 font-bold">
            <span>START</span>
            <span>{activeRoadmap.overallProgress}% COMPLETED</span>
            <span>GOAL</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Map className="w-6 h-6 text-indigo-500" />
            Your Timeline
          </h2>
          
          <div className="relative border-l-2 border-indigo-100 ml-4 space-y-8 pl-8 py-2">
            {activeRoadmap.steps.map((step: any, index: number) => {
              const Icon = getStepIcon(step.type);
              const isCompleted = step.status === 'COMPLETED';
              const isInProgress = step.status === 'IN_PROGRESS';
              
              return (
                <div key={step.stepId} className="relative">
                  <div className={`absolute -left-[41px] w-10 h-10 rounded-full border-4 border-white flex items-center justify-center ${isCompleted ? 'bg-emerald-500 text-white' : isInProgress ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-slate-200 text-slate-400'}`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  
                  <div className={`p-6 rounded-2xl border transition-all ${isInProgress ? 'border-indigo-500 shadow-md bg-white' : 'border-slate-200 bg-white/50'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${isCompleted ? 'bg-emerald-100 text-emerald-700' : isInProgress ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                        {step.type}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{step.status}</span>
                    </div>
                    <h3 className={`text-lg font-bold ${isCompleted ? 'text-slate-800' : 'text-slate-700'}`}>{step.title}</h3>
                    <p className="text-slate-600 text-sm mt-2">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-amber-500" />
              Skill Gaps to Bridge
            </h3>
            <div className="space-y-4">
              {activeRoadmap.skillGaps.map((gap: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-amber-900">{gap.skillName}</span>
                  </div>
                  <div className="flex items-center text-xs gap-2 mt-2">
                    <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded">Current: {gap.currentLevel}</span>
                    <span className="text-amber-500">→</span>
                    <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded">Goal: {gap.requiredLevel}</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-2">{gap.gapDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStepIcon(type: string) {
  switch (type) {
    case 'Foundation': return BookOpen;
    case 'Exam': return Clock;
    case 'Degree': return GraduationCap;
    case 'Skill': return Zap;
    case 'Career': return Briefcase;
    default: return CheckCircle;
  }
}
