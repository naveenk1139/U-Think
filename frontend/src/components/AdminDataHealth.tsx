import React, { useEffect, useState } from 'react';
import { ShieldCheck, Database, MapPin, DollarSign, BookOpen, AlertTriangle, Link as LinkIcon, RefreshCw, Layers, Map, CheckCircle2 } from 'lucide-react';
import api from '../api/axios';

interface CoverageData {
  district_id: string;
  district_name: string;
  total_institutions: number;
  after_10th: number;
  puc: number;
  diploma: number;
  iti: number;
  undergraduate: number;
  postgraduate: number;
  professional: number;
  research: number;
  verified: number;
  unverified: number;
  missing_website: number;
  missing_coordinates: number;
  missing_programmes: number;
  missing_fees: number;
  last_sync: string;
}

interface CoverageSummary {
  total_institutions: number;
  total_districts: number;
  total_taluks: number;
  total_verified: number;
  total_unverified: number;
  total_missing_website: number;
  total_missing_location: number;
  last_sync: string;
}

export default function AdminDataHealth() {
  const [data, setData] = useState<CoverageData[]>([]);
  const [summary, setSummary] = useState<CoverageSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/admin/coverage');
      setData(res.data.data);
      setSummary(res.data.summary);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch data health statistics. Are you an admin?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSync = async (source: string) => {
    if (!window.confirm(`Start data synchronization from ${source}? This may take a few minutes.`)) return;
    
    try {
      setSyncing(true);
      await api.post('/api/admin/colleges/sync', { source });
      alert('Sync started successfully. Check back in a few minutes.');
      setTimeout(fetchStats, 5000);
    } catch (err) {
      alert('Failed to start sync pipeline.');
    } finally {
      setSyncing(false);
    }
  };

  if (loading) return <div className="p-8 text-center"><RefreshCw className="animate-spin mx-auto w-8 h-8 text-blue-500 mb-4" /> Loading Data Health Dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!summary) return null;

  const StatCard = ({ icon: Icon, title, value, colorClass }: any) => (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl border ${colorClass} shadow-sm flex items-center space-x-4`}>
      <div className={`p-3 rounded-lg bg-opacity-10 ${colorClass.replace('border-', 'bg-').replace('text-', 'text-')}`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('border-', 'text-')}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold dark:text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center">
            <ShieldCheck className="w-8 h-8 text-blue-600 mr-3" />
            Karnataka Data Coverage
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor the provenance, verification status, and coverage of the institutions database across all 31 districts.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button onClick={() => handleSync('AISHE')} disabled={syncing} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center text-sm font-medium transition-colors disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} /> Sync AISHE
            </button>
            <button onClick={() => handleSync('UGC')} disabled={syncing} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center text-sm font-medium transition-colors disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} /> Sync UGC
            </button>
            <button onClick={() => handleSync('COLLEGEDB')} disabled={syncing} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded flex items-center text-sm font-medium transition-colors disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} /> Sync CollegeDB
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 dark:text-white">Core Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Database} title="Total Institutions" value={summary.total_institutions.toLocaleString()} colorClass="border-blue-200 text-blue-600" />
        <StatCard icon={Map} title="Total Districts" value={summary.total_districts.toLocaleString()} colorClass="border-indigo-200 text-indigo-600" />
        <StatCard icon={ShieldCheck} title="Verified Records" value={summary.total_verified.toLocaleString()} colorClass="border-green-200 text-green-600" />
        <StatCard icon={AlertTriangle} title="Unverified/Stale" value={summary.total_unverified.toLocaleString()} colorClass="border-yellow-200 text-yellow-600" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mt-8">
        <h3 className="text-lg font-bold mb-4 flex items-center dark:text-white">
          <Map className="w-5 h-5 text-gray-500 mr-2" />
          Coverage by District
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-500 uppercase whitespace-nowrap">DISTRICT</th>
                <th className="px-4 py-3 text-right font-bold text-gray-500 uppercase whitespace-nowrap">TOTAL</th>
                <th className="px-4 py-3 text-right font-bold text-gray-500 uppercase whitespace-nowrap">10TH</th>
                <th className="px-4 py-3 text-right font-bold text-gray-500 uppercase whitespace-nowrap">PUC</th>
                <th className="px-4 py-3 text-right font-bold text-gray-500 uppercase whitespace-nowrap">UG</th>
                <th className="px-4 py-3 text-right font-bold text-gray-500 uppercase whitespace-nowrap">PG</th>
                <th className="px-4 py-3 text-right font-bold text-gray-500 uppercase whitespace-nowrap">VERIF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">{item.district_name}</td>
                  <td className="px-4 py-3 text-right font-bold text-blue-600 dark:text-blue-400">{item.total_institutions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{item.after_10th}</td>
                  <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{item.puc}</td>
                  <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{item.undergraduate}</td>
                  <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{item.postgraduate}</td>
                  <td className="px-4 py-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold flex justify-end items-center gap-1">
                    {item.verified} <CheckCircle2 className="w-3.5 h-3.5" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
