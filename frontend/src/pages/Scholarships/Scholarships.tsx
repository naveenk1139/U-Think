import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Loader2, IndianRupee, ShieldCheck, CheckCircle2, XCircle, AlertCircle, Calculator, FileText } from 'lucide-react';

export default function Scholarships() {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Cost Calculator State
  const [costs, setCosts] = useState({ tuition: '', hostel: '', transport: '', books: '', exams: '', scholarshipAmount: '', otherFunding: '' });
  const [calculationResult, setCalculationResult] = useState<any>(null);

  useEffect(() => {
    if (currentUser) {
      fetchMatches();
    }
  }, [currentUser]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const token = await currentUser?.getIdToken();
      const res = await fetch('/api/scholarships/match', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateCost = async () => {
    try {
      const token = await currentUser?.getIdToken();
      const res = await fetch('/api/scholarships/calculate-cost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(costs)
      });
      const data = await res.json();
      if (data.success) {
        setCalculationResult(data.calculation);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const trackApplication = async (scholarshipId: string) => {
    try {
      const token = await currentUser?.getIdToken();
      const res = await fetch('/api/scholarships/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ scholarshipId, status: 'Draft' })
      });
      if (res.ok) {
        alert("Saved to Application Tracker!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Scholarship Intelligence</h2>
        <p className="text-slate-400 mb-6">Please log in to use the AI Scholarship Finder.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <IndianRupee className="w-8 h-8 text-emerald-400" />
            Scholarship Discovery
          </h1>
          <p className="text-slate-400 mt-2">AI-powered exact matching based on your academic profile.</p>
        </div>
        <button 
          onClick={() => setShowCalculator(!showCalculator)}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700"
        >
          <Calculator className="w-4 h-4" />
          Cost Calculator
        </button>
      </div>

      {showCalculator && (
        <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">Education Cost Calculator</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400">Tuition Fee</label>
              <input type="number" value={costs.tuition} onChange={(e) => setCosts({...costs, tuition: e.target.value})} className="w-full bg-slate-800 rounded p-2 text-white border border-slate-700" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Hostel/Living</label>
              <input type="number" value={costs.hostel} onChange={(e) => setCosts({...costs, hostel: e.target.value})} className="w-full bg-slate-800 rounded p-2 text-white border border-slate-700" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Transport</label>
              <input type="number" value={costs.transport} onChange={(e) => setCosts({...costs, transport: e.target.value})} className="w-full bg-slate-800 rounded p-2 text-white border border-slate-700" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Books</label>
              <input type="number" value={costs.books} onChange={(e) => setCosts({...costs, books: e.target.value})} className="w-full bg-slate-800 rounded p-2 text-white border border-slate-700" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Exam Fees</label>
              <input type="number" value={costs.exams} onChange={(e) => setCosts({...costs, exams: e.target.value})} className="w-full bg-slate-800 rounded p-2 text-white border border-slate-700" />
            </div>
          </div>
          
          <h3 className="text-sm font-semibold text-emerald-400 pt-2">Available Funding</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Expected Scholarship</label>
              <input type="number" value={costs.scholarshipAmount} onChange={(e) => setCosts({...costs, scholarshipAmount: e.target.value})} className="w-full bg-emerald-900/30 rounded p-2 text-white border border-emerald-800" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Other Funding (Savings/Loans)</label>
              <input type="number" value={costs.otherFunding} onChange={(e) => setCosts({...costs, otherFunding: e.target.value})} className="w-full bg-slate-800 rounded p-2 text-white border border-slate-700" />
            </div>
          </div>

          <button onClick={calculateCost} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-500 w-full">
            Calculate Net Cost
          </button>

          {calculationResult && (
            <div className="mt-4 p-4 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Estimated Total Cost: ₹{calculationResult.totalCost}</p>
                <p className="text-emerald-400 text-sm">Total Funding: ₹{calculationResult.totalFunding}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Net Shortfall / Required</p>
                <p className="text-2xl font-bold text-rose-400">₹{calculationResult.remainingCost}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center p-12 bg-slate-900 rounded-xl border border-slate-800">
          <p className="text-slate-400">No matching scholarships found for your profile at this time.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {matches.map((match, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{match.name || match.originalScholarship?.name}</h3>
                  <p className="text-emerald-400 font-semibold">{match.amount || match.originalScholarship?.amount}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                    match.status === 'ELIGIBLE' ? 'bg-emerald-500/20 text-emerald-400' : 
                    match.status === 'NOT_ELIGIBLE' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {match.status}
                  </span>
                  {match.lastVerifiedAt && (
                    <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      Verified: {new Date(match.lastVerifiedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mb-4">
                <h4 className="text-sm font-semibold text-slate-300 mb-3 border-b border-slate-800 pb-2">Exact Match Explanation</h4>
                <div className="space-y-2">
                  {match.exactMatchExplanation?.map((exp: any, i: number) => (
                    <div key={i} className="flex gap-3 text-sm">
                      {exp.satisfied ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                      )}
                      <div>
                        <p className="text-slate-200">{exp.requirement}</p>
                        <p className="text-slate-500 text-xs">{exp.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 border-t border-slate-800 pt-4">
                <button 
                  onClick={() => trackApplication(match.scholarshipId || match.originalScholarship?._id)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> Track Application
                </button>
                {match.originalScholarship?.officialWebsite && (
                  <a href={match.originalScholarship.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm font-medium">
                    View Official Source
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
