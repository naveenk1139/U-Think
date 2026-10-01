import React, { useEffect, useState } from 'react';
import { Network, ArrowRight, Loader2, BookOpen, GraduationCap, Building2, Briefcase, ChevronRight, X } from 'lucide-react';
import api from '../api/axios';

interface IGraphNode {
  type: string;
  id: string;
  name?: string;
}

interface IGraphPath {
  nodes: IGraphNode[];
  relations: string[];
}

interface Props {
  targetType: string;
  targetId: string;
  onClose: () => void;
}

export default function KnowledgeGraphView({ targetType, targetId, onClose }: Props) {
  const [path, setPath] = useState<IGraphPath | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        setLoading(true);
        const res = await api.post('/api/education-paths/path-to-goal', {
          targetType,
          targetId
        });
        if (res.data.success) {
          setPath(res.data.path);
        }
      } catch (err) {
        console.error("Failed to fetch path", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPath();
  }, [targetType, targetId]);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'Pathway': return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'Degree': return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'College': return <Building2 className="w-5 h-5 text-orange-600" />;
      case 'Career': return <Briefcase className="w-5 h-5 text-purple-600" />;
      default: return <Network className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Pathway': return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'Degree': return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      case 'College': return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'Career': return 'bg-purple-50 border-purple-200 text-purple-900';
      default: return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Knowledge Graph Path</h2>
              <p className="text-xs font-bold text-slate-500">Your personalized route to the recommendation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 flex-1 overflow-y-auto bg-slate-50/50">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
              <p className="text-sm font-bold text-slate-500">Traversing Knowledge Graph...</p>
            </div>
          ) : path && path.nodes.length > 0 ? (
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-8 top-10 bottom-10 w-1 bg-indigo-100 -z-10 rounded-full"></div>
              
              <div className="space-y-8 relative z-10">
                {path.nodes.map((node, idx) => (
                  <div key={idx} className="flex items-start gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-white border-4 border-indigo-50 rounded-2xl shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {getNodeIcon(node.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 pt-1">
                      {idx > 0 && path.relations[idx - 1] && (
                        <div className="mb-2 -mt-4">
                          <span className="text-[9px] font-black tracking-widest uppercase text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-indigo-100/50">
                            <ChevronRight className="w-3 h-3" />
                            {path.relations[idx - 1]}
                          </span>
                        </div>
                      )}
                      <div className={`p-4 rounded-2xl border ${getNodeColor(node.type)} shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="text-[10px] font-black uppercase tracking-wider opacity-70 mb-1">
                          {node.type}
                        </div>
                        <h3 className="text-lg font-black leading-tight">
                          {node.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-64">
              <p className="text-sm font-bold text-slate-500">No direct path found from your current stage.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
