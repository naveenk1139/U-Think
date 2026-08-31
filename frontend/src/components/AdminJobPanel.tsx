import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, AlertTriangle, RefreshCw, Plus, Trash2, Loader } from 'lucide-react';
import { getProviderStatuses } from '../api/jobs';

export default function AdminJobPanel() {
  const [activeTab, setActiveTab] = useState<'providers' | 'import'>('providers');
  const [providers, setProviders] = useState<{name: string, status: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await getProviderStatuses();
      setProviders(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (status: string) => {
    if (status === 'Configured') return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    return <AlertTriangle className="w-4 h-4 text-amber-500" />;
  };


  return (
    <div className="space-y-6 animate-fade-in p-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-600" /> Job Provider Admin
          </h2>
          <p className="text-sm text-text-muted mt-1">Manage external job sources and local seed data.</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border">
        <button 
          onClick={() => setActiveTab('providers')}
          className={`pb-3 text-sm font-bold ${activeTab === 'providers' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-text-muted'}`}
        >
          Provider Status
        </button>
        <button 
           onClick={() => setActiveTab('import')}
           className={`pb-3 text-sm font-bold ${activeTab === 'import' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-text-muted'}`}
        >
          Import Jobs
        </button>
      </div>

      {activeTab === 'providers' && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
          {loading ? (
             <div className="p-12 flex justify-center"><Loader className="w-8 h-8 animate-spin text-text-muted" /></div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="p-4 text-xs font-bold text-text-muted uppercase">Provider Name</th>
                  <th className="p-4 text-xs font-bold text-text-muted uppercase">Connection Status</th>
                  <th className="p-4 text-xs font-bold text-text-muted uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {providers.map((p, i) => (
                  <tr key={i} className="hover:bg-background">
                    <td className="p-4 font-bold text-text-primary">{p.name}</td>
                    <td className="p-4 flex items-center gap-2 text-sm font-medium text-text-secondary">
                      {renderIcon(p.status)} {p.status}
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={fetchProviders} className="text-indigo-600 hover:text-indigo-800 p-2 rounded hover:bg-indigo-50 transition-colors" title="Test Connection">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'import' && (
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none max-w-2xl">
          <h3 className="font-bold text-text-primary mb-4">Manual Job Import</h3>
          <p className="text-sm text-text-muted mb-6">Import seed jobs to the local Admin database for demonstration and testing purposes.</p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1">Job JSON Array</label>
              <textarea 
                rows={10} 
                className="w-full border border-border rounded-xl p-3 text-sm font-mono focus:ring-2 focus:ring-indigo-500"
                placeholder={'[{\n  "title": "Software Engineer",\n  "company": "Tech Corp",\n  "location": "Bengaluru"\n}]'}
              />
            </div>
            <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> Import Jobs
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
