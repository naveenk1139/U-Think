import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, IndianRupee, MapPin, Loader2, PlayCircle, Info } from 'lucide-react';

export default function CollegeCounsellingSimulator() {
  const { currentUser } = useAuth();
  
  const [preferredCourse, setPreferredCourse] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [marks, setMarks] = useState('');
  const [targetColleges, setTargetColleges] = useState('');
  
  const [simulation, setSimulation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    if (!preferredCourse || !budget || !marks) return alert('Please fill in required fields: Course, Budget, Marks');
    
    try {
      setLoading(true);
      const token = await currentUser?.getIdToken();
      const res = await fetch('/api/colleges/counselling/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          preferredCourse,
          preferredLocation,
          budget,
          marks,
          collegePreferences: targetColleges.split(',').map(c => c.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (data.success) {
        setSimulation(data.simulation);
      } else {
        alert(data.error || 'Simulation failed');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Building2 className="w-8 h-8 text-emerald-400" />
          Admission Counselling Simulator
        </h1>
        <p className="text-slate-400 mt-2">Test your chances across various colleges before the actual counselling rounds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h2 className="text-lg font-semibold text-white mb-4">Simulation Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Preferred Course</label>
                <input type="text" placeholder="e.g. B.Tech Computer Science" value={preferredCourse} onChange={e => setPreferredCourse(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Entrance Marks / Rank</label>
                <input type="text" placeholder="e.g. KCET Rank 4500" value={marks} onChange={e => setMarks(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1 flex items-center gap-1"><IndianRupee className="w-4 h-4" /> Maximum Budget</label>
                <input type="text" placeholder="e.g. 5 Lakhs" value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1 flex items-center gap-1"><MapPin className="w-4 h-4" /> Preferred Location</label>
                <input type="text" placeholder="e.g. Bangalore" value={preferredLocation} onChange={e => setPreferredLocation(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Target Colleges (Comma separated)</label>
                <input type="text" placeholder="e.g. RVCE, BMSCE" value={targetColleges} onChange={e => setTargetColleges(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <button 
                onClick={handleSimulate}
                disabled={loading}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlayCircle className="w-5 h-5" />}
                Run Simulation
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {simulation ? (
            <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-bl-lg">
                SIMULATION RESULT
              </div>
              
              <div className="flex items-start gap-3 mb-6 bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
                <Info className="w-6 h-6 text-amber-400 shrink-0" />
                <p className="text-sm text-amber-200/80">{simulation.disclaimer}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Simulated Allocation</h3>
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg text-center">
                  <h4 className="text-2xl font-black text-emerald-400">{simulation.simulatedAllocation?.collegeName || 'No Direct Match'}</h4>
                  <p className="text-slate-300 mt-2 font-medium">Round: {simulation.simulatedAllocation?.round}</p>
                  <p className="text-slate-400 text-sm">Quota: {simulation.simulatedAllocation?.quota}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-4">Eligible Options Breakdown</h3>
                <div className="space-y-3">
                  {simulation.eligibleOptions?.map((opt: any, i: number) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between bg-slate-950 p-4 rounded-lg border border-slate-800 gap-4">
                      <div>
                        <h4 className="font-bold text-slate-200">{opt.collegeName}</h4>
                        <p className="text-sm text-slate-400">{opt.course}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase ${
                          opt.chanceOfAdmission === 'High' ? 'bg-emerald-500/20 text-emerald-400' :
                          opt.chanceOfAdmission === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-rose-500/20 text-rose-400'
                        }`}>
                          {opt.chanceOfAdmission} Chance
                        </span>
                        <p className="text-xs text-slate-500 mt-1 max-w-[200px]">{opt.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {simulation.alternativeOptions?.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Alternative Suggestions</h3>
                  <div className="flex flex-wrap gap-2">
                    {simulation.alternativeOptions.map((alt: string, i: number) => (
                      <span key={i} className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-full border border-slate-700">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-900/50 border border-slate-800 border-dashed rounded-xl">
              <Building2 className="w-16 h-16 text-slate-700 mb-4" />
              <h3 className="text-xl font-bold text-slate-400 mb-2">Simulator Ready</h3>
              <p className="text-slate-500 max-w-md mx-auto text-sm">
                Enter your desired course, marks, and preferences to run an AI-powered simulation of potential counselling outcomes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
