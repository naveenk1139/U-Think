import React, { useState, useEffect } from 'react';
import { getSavedJobs } from '../api/jobs';
import { Briefcase, Clock, CheckCircle, XCircle, ChevronRight, Loader } from 'lucide-react';

export default function ApplicationTracker() {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await getSavedJobs();
        setSavedJobs(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Saved': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Applied': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Interview': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Offer': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Application Tracker</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and track your job search progress.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12 text-slate-500">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center max-w-xl mx-auto mt-8">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-900">No applications tracked yet</h3>
          <p className="text-sm text-slate-500 mt-1">Save jobs from the Job Explorer to track them here.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Job Role</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Last Updated</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {savedJobs.map((record) => (
                <tr key={record._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{record.jobId}</div>
                    <div className="text-xs text-slate-500 mt-0.5">ID: {record.jobId.slice(-6)}</div>
                  </td>
                  <td className="p-4 font-medium text-slate-700">Company Name</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500 hidden md:table-cell">
                    {new Date(record.statusUpdatedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center gap-1">
                      Update <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
