import React, { useState } from 'react';
import { Split, GitBranch, Scale, BrainCircuit, Loader2, ArrowRight, TrendingUp, Clock, Wallet, AlertCircle, Activity } from 'lucide-react';
import api from '../../api/axios';

interface PathDetails {
  name: string;
  timeInvestment: string;
  timeInvestmentScore: number;
  financialCost: string;
  financialCostScore: number;
  earningPotential: string;
  earningPotentialScore: number;
  jobGrowth: string;
  jobGrowthScore: number;
  opportunityCost: string;
}

interface SimulatorData {
  pathA: PathDetails;
  pathB: PathDetails;
  verdict: string;
}

export default function CareerForkSimulator() {
  const [pathAInput, setPathAInput] = useState('');
  const [pathBInput, setPathBInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulation, setSimulation] = useState<SimulatorData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pathAInput.trim() || !pathBInput.trim()) return;

    setIsSimulating(true);
    setError(null);
    try {
      const response = await api.post('/api/simulator/fork', {
        pathA: pathAInput,
        pathB: pathBInput
      });
      if (response.data.success) {
        setSimulation(response.data.simulation);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Simulation failed.');
    } finally {
      setIsSimulating(false);
    }
  };

  const getScoreBarColor = (score: number, inverseGood: boolean = false) => {
    const isGood = inverseGood ? score < 50 : score > 50;
    if (score >= 80) return isGood ? 'bg-emerald-500' : 'bg-red-500';
    if (score >= 40) return 'bg-amber-500';
    return isGood ? 'bg-red-500' : 'bg-emerald-500';
  };

  const renderComparisonMetric = (
    icon: React.ReactNode, 
    label: string, 
    valA: string, 
    scoreA: number, 
    valB: string, 
    scoreB: number, 
    inverseGood: boolean = false
  ) => (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
      <div className="md:col-span-3 text-right">
        <p className="font-bold text-gray-900 mb-2">{valA}</p>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex justify-end">
          <div className={`h-full ${getScoreBarColor(scoreA, inverseGood)}`} style={{ width: `${scoreA}%` }} />
        </div>
      </div>
      
      <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-1">
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">{label}</span>
      </div>

      <div className="md:col-span-3 text-left">
        <p className="font-bold text-gray-900 mb-2">{valB}</p>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full ${getScoreBarColor(scoreB, inverseGood)}`} style={{ width: `${scoreB}%` }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans min-h-screen bg-gray-50/30">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg mb-4">
          <GitBranch className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">Career Fork Simulator</h1>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">
          Evaluate the exact opportunity cost of choosing one path over another. Enter two careers, degrees, or streams to run an AI-powered comparative analysis.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden mb-12">
        <form onSubmit={runSimulation} className="p-8 border-b border-gray-100 bg-gray-50/50">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Path Option A</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors shadow-sm font-medium"
                placeholder="e.g. B.Tech Computer Science"
                value={pathAInput}
                onChange={(e) => setPathAInput(e.target.value)}
                disabled={isSimulating}
              />
            </div>
            
            <div className="md:col-span-1 flex justify-center pb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-black">
                VS
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Path Option B</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors shadow-sm font-medium"
                placeholder="e.g. B.Des Product Design"
                value={pathBInput}
                onChange={(e) => setPathBInput(e.target.value)}
                disabled={isSimulating}
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isSimulating || !pathAInput || !pathBInput}
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black disabled:opacity-50 transition-all shadow-md flex items-center gap-3 text-lg"
            >
              {isSimulating ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Simulating Options...</>
              ) : (
                <><Scale className="w-6 h-6" /> Run Opportunity Cost Analysis</>
              )}
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>}
        </form>

        {simulation && (
          <div className="p-8 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <h2 className="text-2xl font-black text-indigo-600 text-center md:text-right">{simulation.pathA.name}</h2>
              <h2 className="text-2xl font-black text-purple-600 text-center md:text-left">{simulation.pathB.name}</h2>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm mb-8">
              {renderComparisonMetric(<Clock className="w-4 h-4" />, "Time Needed", simulation.pathA.timeInvestment, simulation.pathA.timeInvestmentScore, simulation.pathB.timeInvestment, simulation.pathB.timeInvestmentScore, true)}
              {renderComparisonMetric(<Wallet className="w-4 h-4" />, "Est. Cost", simulation.pathA.financialCost, simulation.pathA.financialCostScore, simulation.pathB.financialCost, simulation.pathB.financialCostScore, true)}
              {renderComparisonMetric(<TrendingUp className="w-4 h-4" />, "Earning Pot.", simulation.pathA.earningPotential, simulation.pathA.earningPotentialScore, simulation.pathB.earningPotential, simulation.pathB.earningPotentialScore)}
              {renderComparisonMetric(<Activity className="w-4 h-4" />, "Job Growth", simulation.pathA.jobGrowth, simulation.pathA.jobGrowthScore, simulation.pathB.jobGrowth, simulation.pathB.jobGrowthScore)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
                <h3 className="text-sm font-black text-red-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Opportunity Cost (A)
                </h3>
                <p className="text-red-900 font-medium leading-relaxed">{simulation.pathA.opportunityCost}</p>
              </div>
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
                <h3 className="text-sm font-black text-red-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Opportunity Cost (B)
                </h3>
                <p className="text-red-900 font-medium leading-relaxed">{simulation.pathB.opportunityCost}</p>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex items-start gap-4">
              <BrainCircuit className="w-8 h-8 text-indigo-600 shrink-0" />
              <div>
                <h3 className="font-bold text-indigo-900 mb-1">AI Analytical Verdict</h3>
                <p className="text-indigo-800 leading-relaxed">{simulation.verdict}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
