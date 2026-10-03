import React, { useEffect, useState } from 'react';
import { Sparkles, Brain, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import KnowledgeGraphView from './KnowledgeGraphView';

interface IRecommendation {
  _id: string;
  entityType: string;
  entityId: string;
  matchScore: number;
  recommendationLabel: string;
  presentation?: {
    title: string;
    explanation: string;
    action: string;
    learningPlan: string[];
  };
}

export default function AIRecommendationWidget() {
  const [recommendations, setRecommendations] = useState<IRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [selectedGraphTarget, setSelectedGraphTarget] = useState<{type: string, id: string} | null>(null);

  const handleFeedback = async (id: string, action: 'accept' | 'dismiss') => {
    try {
      await api.post(`/api/recommendations/${id}/feedback`, { action });
      // Remove from list or update status
      setRecommendations(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        // First try to fetch existing ones
        let res = await api.get('/api/recommendations');
        let recs = res.data || [];
        
        // If none exist, trigger generation
        if (recs.length === 0) {
          await api.post('/api/recommendations/generate');
          res = await api.get('/api/recommendations');
          recs = res.data || [];
        }
        
        setRecommendations(recs.slice(0, 3)); // Show top 3
        if (recs.length > 0 && recs[0].createdAt) {
          setLastUpdated(new Date(recs[0].createdAt).toLocaleString('en-US', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          }));
        }
      } catch (error) {
        console.error("Failed to load AI Recommendations", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
        <Brain className="w-10 h-10 text-indigo-400 animate-pulse mb-3" />
        <h3 className="font-bold text-indigo-900 text-sm">Processing Latest Analysis...</h3>
        <p className="text-xs text-indigo-600/80 mt-1">Re-evaluating Profile and Marks Card.</p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
        <Brain className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-xs text-gray-500">Complete your intelligence profile to get AI recommendations.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-sm font-black text-indigo-950">AI Personalized Matches</h2>
        </div>
        {lastUpdated && (
          <span className="text-[9px] font-semibold text-indigo-500 uppercase tracking-wider">
            Updated: {lastUpdated}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec._id} className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-sm text-gray-900">
                {rec.presentation?.title || `Recommended ${rec.entityType}`}
              </h3>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                  {rec.recommendationLabel}
                </span>
                <span className="text-xs font-bold text-emerald-600 mt-1">
                  {rec.matchScore}% Match
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
              {rec.presentation?.explanation || "Based on your academic and skill profile, this is a strong fit."}
            </p>

            {rec.presentation?.learningPlan && rec.presentation.learningPlan.length > 0 && (
              <div className="bg-orange-50 border border-orange-100 rounded p-2 mb-3">
                <h4 className="text-[9px] font-bold text-orange-800 uppercase mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Skill Gap Action Plan
                </h4>
                <ul className="text-[10px] text-orange-700 space-y-1 pl-1">
                  {rec.presentation.learningPlan.map((plan, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="shrink-0">•</span> <span>{plan}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-3 mt-4 border-t border-gray-100 pt-3">
              <button 
                onClick={() => handleFeedback(rec._id, 'accept')}
                className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded hover:bg-indigo-100 transition-colors"
              >
                Accept Match
              </button>
              <button 
                onClick={() => handleFeedback(rec._id, 'dismiss')}
                className="text-[10px] font-bold text-gray-500 hover:text-rose-600 transition-colors"
              >
                Dismiss
              </button>
              <div className="flex-1"></div>
              <button 
                onClick={() => setSelectedGraphTarget({ type: rec.entityType, id: rec.entityId || 'fallback_id' })}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
              >
                Explore Path <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedGraphTarget && (
        <KnowledgeGraphView 
          targetType={selectedGraphTarget.type}
          targetId={selectedGraphTarget.id}
          onClose={() => setSelectedGraphTarget(null)}
        />
      )}
    </div>
  );
}
