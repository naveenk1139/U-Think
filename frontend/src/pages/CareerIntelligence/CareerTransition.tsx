import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Briefcase, ArrowRight, GitBranch, Target, Loader2, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

export default function CareerTransition() {
  const { currentUser } = useAuth();
  
  const [targetRole, setTargetRole] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');
  
  const [transitionMap, setTransitionMap] = useState<any>(null);
  const [skillGap, setSkillGap] = useState<any>(null);
  
  const [loadingMap, setLoadingMap] = useState(false);
  const [loadingGap, setLoadingGap] = useState(false);

  const handleGenerateMap = async () => {
    if (!targetRole) return alert('Please enter a target role.');
    
    try {
      setLoadingMap(true);
      const token = await currentUser?.getIdToken();
      const res = await fetch('/api/jobs/transition-map', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          targetRole,
          currentRole,
          currentSkills: currentSkills.split(',').map(s => s.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (data.success) {
        setTransitionMap(data.transitionMap);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMap(false);
    }
  };

  const handleAnalyzeGap = async () => {
    if (!targetRole) return alert('Please enter a target role.');
    
    try {
      setLoadingGap(true);
      const token = await currentUser?.getIdToken();
      const res = await fetch('/api/jobs/skill-gap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          targetRole,
          currentSkills: currentSkills.split(',').map(s => s.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (data.success) {
        setSkillGap(data.skillGap);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGap(false);
    }
  };

  if (!currentUser) return <div className="p-12 text-center text-slate-400">Please log in to use Career Intelligence.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <GitBranch className="w-8 h-8 text-fuchsia-400" />
          Career Transition & Skill Gap Analysis
        </h1>
        <p className="text-slate-400 mt-2">Map your path from where you are to where you want to be.</p>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
        <h2 className="text-xl font-semibold text-white">Your Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Current Role / Status</label>
            <input type="text" placeholder="e.g. Mechanical Engineering Student" value={currentRole} onChange={e => setCurrentRole(e.target.value)} className="w-full bg-slate-800 rounded p-2 text-white border border-slate-700" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Target Role</label>
            <input type="text" placeholder="e.g. Data Scientist" value={targetRole} onChange={e => setTargetRole(e.target.value)} className="w-full bg-slate-800 rounded p-2 text-white border border-slate-700" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-400 mb-1">Current Skills (comma separated)</label>
            <input type="text" placeholder="e.g. Python, AutoCAD, Basic Statistics" value={currentSkills} onChange={e => setCurrentSkills(e.target.value)} className="w-full bg-slate-800 rounded p-2 text-white border border-slate-700" />
          </div>
        </div>
        
        <div className="flex gap-4 pt-4 border-t border-slate-800">
          <button onClick={handleGenerateMap} disabled={loadingMap} className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-medium py-2 rounded flex items-center justify-center gap-2">
            {loadingMap ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitBranch className="w-4 h-4" />}
            Generate Transition Map
          </button>
          <button onClick={handleAnalyzeGap} disabled={loadingGap} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 rounded flex items-center justify-center gap-2">
            {loadingGap ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
            Analyze Skill Gap
          </button>
        </div>
      </div>

      {transitionMap && (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-fuchsia-400" />
              Transition Roadmap
            </h2>
            <div className="flex gap-4">
              <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded text-sm font-medium border border-slate-700">Difficulty: {transitionMap.transitionDifficulty}</span>
              <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded text-sm font-medium border border-slate-700">Time: {transitionMap.estimatedMonths} Months</span>
            </div>
          </div>

          <div className="space-y-6">
            {transitionMap.phases.map((phase: any, i: number) => (
              <div key={i} className="relative pl-8 border-l-2 border-fuchsia-500/30">
                <div className="absolute w-4 h-4 rounded-full bg-fuchsia-500 left-[-9px] top-1 border-4 border-slate-900"></div>
                <h3 className="text-lg font-bold text-slate-200">{phase.phaseName}</h3>
                <p className="text-fuchsia-400 text-sm font-medium mt-1">{phase.focusArea}</p>
                <p className="text-slate-400 mt-2 bg-slate-950 p-3 rounded border border-slate-800">
                  🎯 {phase.milestone}
                </p>
              </div>
            ))}
          </div>

          {transitionMap.keyObstacles?.length > 0 && (
            <div className="mt-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
              <h3 className="text-rose-400 font-bold flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5" /> Key Obstacles to Anticipate
              </h3>
              <ul className="list-disc list-inside text-rose-200/80 text-sm space-y-1">
                {transitionMap.keyObstacles.map((obs: string, i: number) => (
                  <li key={i}>{obs}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {skillGap && (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
            <Target className="w-6 h-6 text-cyan-400" />
            Skill Gap Analysis
            <span className="ml-auto text-lg text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
              {skillGap.matchPercentage}% Match
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-300 mb-4 border-b border-slate-800 pb-2">Missing Skills to Acquire</h3>
              <div className="space-y-4">
                {skillGap.missingSkills.map((skill: any, i: number) => (
                  <div key={i} className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-cyan-400">{skill.skillName}</h4>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        skill.importance === 'Critical' ? 'bg-rose-500/20 text-rose-400' :
                        skill.importance === 'High' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>{skill.importance}</span>
                    </div>
                    <div className="mt-3 flex items-start gap-2 text-sm text-slate-400">
                      <BookOpen className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <p>{skill.recommendedAction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-300 mb-4 border-b border-slate-800 pb-2">Your Transferable Skills</h3>
              <div className="space-y-2">
                {skillGap.existingTransferableSkills?.length > 0 ? (
                  skillGap.existingTransferableSkills.map((ts: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300 bg-slate-800 p-3 rounded border border-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      {ts}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm">No significant transferable skills identified for this role.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
