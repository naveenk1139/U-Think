import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle2, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function ScraperHealth() {
  const { currentUser } = useAuth();
  const [healthData, setHealthData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/trust/scraper-health');
      const data = await res.json();
      if (data.success) setHealthData(data.health);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!currentUser) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-emerald-400" />
            Data Scraper Health Monitor
          </h1>
          <p className="text-slate-400 mt-2">Real-time status of backend UGC and College scraper jobs.</p>
        </div>
        <button onClick={fetchHealth} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded transition-colors" title="Refresh">
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {healthData.map((run, i) => (
          <div key={run._id || i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-white capitalize">{run.scraperName || run.sourceName || 'Unknown Job'}</h3>
              {run.status === 'COMPLETED' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : run.status === 'FAILED' ? (
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              ) : (
                <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
              )}
            </div>
            
            <div className="space-y-2 text-sm text-slate-400 mb-4 border-b border-slate-800 pb-4">
              <p className="flex justify-between"><span>Status:</span> <span className={`font-medium ${
                run.status === 'COMPLETED' ? 'text-emerald-400' :
                run.status === 'FAILED' ? 'text-rose-400' : 'text-blue-400'
              }`}>{run.status}</span></p>
              <p className="flex justify-between"><span>Rows Processed:</span> <span>{run.recordsProcessed || run.processedCount || 0}</span></p>
              <p className="flex justify-between"><span>Errors:</span> <span>{run.errorCount || 0}</span></p>
            </div>
            
            <p className="text-xs text-slate-500 flex justify-between">
              <span>Started: {new Date(run.createdAt || run.startTime).toLocaleString()}</span>
            </p>
          </div>
        ))}

        {healthData.length === 0 && !loading && (
          <div className="col-span-full p-12 text-center text-slate-500 border border-slate-800 rounded-xl border-dashed">
            No scraper logs found. The backend engines are likely idle.
          </div>
        )}
      </div>
    </div>
  );
}
