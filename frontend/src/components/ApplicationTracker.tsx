import React, { useState, useEffect } from 'react';
import { getSavedJobs } from '../api/jobs';
import { Briefcase, Clock, CheckCircle, XCircle, ChevronRight, Loader, IndianRupee } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ApplicationTracker() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'JOBS' | 'SCHOLARSHIPS'>('JOBS');
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'JOBS') {
          const res = await getSavedJobs();
          setSavedJobs(res.data || []);
        } else {
          const token = await currentUser?.getIdToken();
          const res = await fetch('/api/scholarships/applications', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            setScholarships(data.applications || []);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab, currentUser]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Saved': return 'bg-background-secondary text-text-primary border-border';
      case 'Applied': return 'bg-blue-50 text-primary-hover border-blue-200';
      case 'Interview': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Offer': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-background text-text-primary border-border';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Application Tracker</h2>
          <p className="text-sm text-text-muted mt-1">Manage and track your progress.</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border pb-2">
        <button 
          onClick={() => setActiveTab('JOBS')}
          className={`flex items-center gap-2 pb-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'JOBS' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary'}`}
        >
          <Briefcase className="w-4 h-4" /> Jobs
        </button>
        <button 
          onClick={() => setActiveTab('SCHOLARSHIPS')}
          className={`flex items-center gap-2 pb-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'SCHOLARSHIPS' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary'}`}
        >
          <IndianRupee className="w-4 h-4" /> Scholarships
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12 text-text-muted">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      ) : activeTab === 'JOBS' && savedJobs.length === 0 ? (
        <div className="bg-background border border-border rounded-2xl p-12 text-center max-w-xl mx-auto mt-8">
          <Briefcase className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="font-bold text-text-primary">No applications tracked yet</h3>
          <p className="text-sm text-text-muted mt-1">Save jobs from the Job Explorer to track them here.</p>
        </div>
      ) : activeTab === 'SCHOLARSHIPS' && scholarships.length === 0 ? (
        <div className="bg-background border border-border rounded-2xl p-12 text-center max-w-xl mx-auto mt-8">
          <IndianRupee className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="font-bold text-text-primary">No scholarships tracked yet</h3>
          <p className="text-sm text-text-muted mt-1">Save scholarships from the Finder to track them here.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">{activeTab === 'JOBS' ? 'Job Role' : 'Scholarship Name'}</th>
                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">{activeTab === 'JOBS' ? 'Company' : 'Status'}</th>
                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider hidden md:table-cell">Last Updated</th>
                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(activeTab === 'JOBS' ? savedJobs : scholarships).map((record) => (
                <tr key={record._id} className="hover:bg-background transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-text-primary">{activeTab === 'JOBS' ? record.jobId : (record.scholarshipId?.name || 'Unknown Scholarship')}</div>
                    <div className="text-xs text-text-muted mt-0.5">ID: {activeTab === 'JOBS' ? record.jobId.slice(-6) : record._id.slice(-6)}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-text-muted hidden md:table-cell">
                    {new Date(record.updatedAt || record.statusUpdatedAt || record.appliedAt).toLocaleDateString()}
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
