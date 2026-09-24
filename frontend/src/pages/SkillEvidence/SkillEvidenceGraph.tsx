import React, { useState, useEffect } from 'react';
import { Network, RefreshCw, FileText, CheckCircle, BrainCircuit, Activity } from 'lucide-react';
import api from '../../api/axios';

interface IEvidenceSource {
  type: string;
  name: string;
  url?: string;
  verified: boolean;
}

interface ISkillNode {
  _id: string;
  skillName: string;
  category: string;
  level: string;
  strengthScore: number;
  evidence: IEvidenceSource[];
  relatedSkills: string[];
}

export default function SkillEvidenceGraph() {
  const [nodes, setNodes] = useState<ISkillNode[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGraph = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/skill-evidence');
      if (response.data.graph && response.data.graph.nodes) {
        setNodes(response.data.graph.nodes);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const response = await api.post('/api/skill-evidence/sync');
      if (response.data.graph) {
        setNodes(response.data.graph.nodes);
      }
    } catch (err) {
      console.error("Sync failed", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 50) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 30) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans min-h-screen bg-gray-50/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
            <Network className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Skill Evidence Graph</h1>
            <p className="text-gray-500 font-medium text-sm">Visualize your verified capabilities backed by real documents.</p>
          </div>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 transition-all shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Synchronizing AI...' : 'AI Sync from Documents'}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : nodes.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <BrainCircuit className="w-16 h-16 text-gray-200 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Graph is Empty</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            You haven't generated your skill evidence graph yet. Click the Sync button above to let our AI scan your uploaded documents and build your verified skill graph.
          </p>
          <button onClick={handleSync} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            Generate Graph Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {nodes.map(node => (
            <div key={node._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Card Header */}
              <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-black text-indigo-500 bg-indigo-50 px-2 py-1 rounded mb-2 inline-block">
                    {node.category}
                  </span>
                  <h3 className="text-lg font-black text-gray-900">{node.skillName}</h3>
                </div>
                <div className={`px-3 py-1.5 rounded-lg border font-bold text-sm flex items-center gap-1.5 ${getScoreColor(node.strengthScore)}`}>
                  <Activity className="w-4 h-4" />
                  {node.strengthScore}%
                </div>
              </div>
              
              {/* Evidence Section */}
              <div className="p-5 bg-gray-50/50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Supporting Evidence</h4>
                {node.evidence && node.evidence.length > 0 ? (
                  <div className="space-y-3">
                    {node.evidence.map((ev, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        {ev.verified ? (
                          <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-lg shrink-0">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="bg-gray-100 text-gray-500 p-1.5 rounded-lg shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{ev.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            {ev.verified ? <span className="text-emerald-600 font-medium">Verified by AI OCR</span> : <span>Self-Reported</span>}
                            • {ev.type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No evidence linked yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
