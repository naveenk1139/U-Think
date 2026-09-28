import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Calendar, Clock, Loader2, AlertTriangle, TrendingUp, CheckCircle, ChevronRight, Zap } from 'lucide-react';

export default function ExamPrep() {
  const { currentUser } = useAuth();
  const [examId, setExamId] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [dailyHours, setDailyHours] = useState('4');
  
  // Weak Subject Analyzer state
  const [performances, setPerformances] = useState([{ subjectName: '', topicName: '', scorePercentage: '', evidenceSource: 'Practice Test' }]);
  const [weakAreas, setWeakAreas] = useState<any[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  // Study Planner state
  const [studyPlan, setStudyPlan] = useState<any>(null);
  const [generatingPlan, setGeneratingPlan] = useState(false);

  const handleAddPerformance = () => {
    setPerformances([...performances, { subjectName: '', topicName: '', scorePercentage: '', evidenceSource: 'Practice Test' }]);
  };

  const handleAnalyze = async () => {
    if (!examId) return alert('Please enter an Exam ID');
    try {
      setAnalyzing(true);
      const token = await currentUser?.getIdToken();
      const res = await fetch(`/api/exams/${examId}/weak-subjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ performances })
      });
      const data = await res.json();
      if (data.success) {
        setWeakAreas(data.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (!examId || !targetDate || !dailyHours) return alert('Please fill all plan requirements');
    try {
      setGeneratingPlan(true);
      const token = await currentUser?.getIdToken();
      const res = await fetch(`/api/exams/${examId}/study-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ 
          targetDate, 
          dailyAvailableHours: Number(dailyHours),
          weakAreas: weakAreas.map(w => w.subjectName),
          strongAreas: [] 
        })
      });
      const data = await res.json();
      if (data.success) {
        setStudyPlan(data.plan);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingPlan(false);
    }
  };

  if (!currentUser) return <div className="p-12 text-center text-slate-400">Please log in to access Exam Intelligence.</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-400" />
          Exam Preparation Engine
        </h1>
        <p className="text-slate-400 mt-2">AI-driven weak subject analysis and adaptive study planning.</p>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h2 className="text-xl font-semibold text-white mb-4">1. Performance Input</h2>
        <div className="mb-4">
          <label className="block text-sm text-slate-400 mb-1">Target Exam ID (e.g. JEE-MAIN)</label>
          <input type="text" value={examId} onChange={e => setExamId(e.target.value)} className="bg-slate-800 rounded p-2 text-white border border-slate-700 w-64" />
        </div>
        
        <div className="space-y-3 mb-4">
          {performances.map((perf, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <input placeholder="Subject (e.g. Math)" value={perf.subjectName} onChange={e => { const p = [...performances]; p[idx].subjectName = e.target.value; setPerformances(p); }} className="bg-slate-800 rounded p-2 text-white border border-slate-700 w-1/4" />
              <input placeholder="Topic (e.g. Calculus)" value={perf.topicName} onChange={e => { const p = [...performances]; p[idx].topicName = e.target.value; setPerformances(p); }} className="bg-slate-800 rounded p-2 text-white border border-slate-700 w-1/4" />
              <input placeholder="Score %" type="number" value={perf.scorePercentage} onChange={e => { const p = [...performances]; p[idx].scorePercentage = e.target.value; setPerformances(p); }} className="bg-slate-800 rounded p-2 text-white border border-slate-700 w-24" />
              <select value={perf.evidenceSource} onChange={e => { const p = [...performances]; p[idx].evidenceSource = e.target.value; setPerformances(p); }} className="bg-slate-800 rounded p-2 text-white border border-slate-700">
                <option>Practice Test</option>
                <option>Assessment</option>
                <option>Self-Reported</option>
              </select>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4">
          <button onClick={handleAddPerformance} className="text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded">
            + Add Topic
          </button>
          <button onClick={handleAnalyze} disabled={analyzing} className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded flex items-center gap-2">
            {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            Analyze Weaknesses
          </button>
        </div>
      </div>

      {weakAreas.length > 0 && (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            2. Weak Subject Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weakAreas.map((area, i) => (
              <div key={i} className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h3 className="font-bold text-slate-200">{area.subjectName} &rarr; {area.topicName}</h3>
                <div className="mt-3 space-y-2">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">Root Cause</span>
                    <p className="text-sm text-slate-400 mt-1">{area.rootCause}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Recommended Practice</span>
                    <p className="text-sm text-slate-400 mt-1">{area.recommendedPractice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h2 className="text-xl font-semibold text-white mb-4">3. AI Study Planner</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Target Exam Date</label>
            <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="bg-slate-800 rounded p-2 text-white border border-slate-700" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Daily Available Hours</label>
            <input type="number" value={dailyHours} onChange={e => setDailyHours(e.target.value)} className="bg-slate-800 rounded p-2 text-white border border-slate-700 w-24" />
          </div>
        </div>
        <button onClick={handleGeneratePlan} disabled={generatingPlan} className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded flex items-center gap-2">
          {generatingPlan ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
          Generate Adaptive Plan
        </button>
      </div>

      {studyPlan && (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl font-semibold text-white mb-4">Your 7-Day Study Schedule</h2>
          <div className="space-y-4">
            {studyPlan.schedule.map((day: any, i: number) => (
              <div key={i} className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h3 className="font-bold text-indigo-400 mb-3 border-b border-slate-800 pb-2">
                  {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                </h3>
                <div className="space-y-2">
                  {day.tasks.map((task: any, j: number) => (
                    <div key={j} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="font-semibold text-slate-200">{task.durationMinutes} mins</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          task.taskType === 'Study' ? 'bg-blue-500/20 text-blue-400' :
                          task.taskType === 'Revision' ? 'bg-emerald-500/20 text-emerald-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>{task.taskType}</span>
                        <span className="text-slate-300">{task.subject} - {task.topic}</span>
                      </div>
                      <button className="text-slate-500 hover:text-emerald-400 transition-colors">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
