import React, { useState, useEffect } from 'react';
import { getSavedJobs, removeSavedJob, updateSavedJob, SavedJob } from '../api/savedJobs';
import { Bookmark, Search, MapPin, Briefcase, ExternalLink, IndianRupee, Loader, Trash2, Calendar, FileEdit, CheckCircle, ChevronDown, Bell } from 'lucide-react';
import JobDetailsModal from './JobDetailsModal';
import { Job } from '../types';

export default function SavedJobs() {
  const [jobs, setJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Filters
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // UI States
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getSavedJobs();
      if (res.data?.success) {
        setJobs(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load saved jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm('Remove this job from Saved Jobs?')) return;
    
    try {
      await removeSavedJob(id);
      setJobs(jobs.filter(j => j._id !== id));
    } catch (err) {
      console.error('Failed to remove job', err);
    }
  };

  const handleStatusChange = async (e: React.MouseEvent, id: string, newStatus: string) => {
    e.stopPropagation();
    try {
      await updateSavedJob(id, { status: newStatus });
      setJobs(jobs.map(j => j._id === id ? { ...j, status: newStatus as any } : j));
      setActiveDropdown(null);
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleSaveNote = async (id: string) => {
    try {
      await updateSavedJob(id, { notes: noteText });
      setJobs(jobs.map(j => j._id === id ? { ...j, notes: noteText } : j));
      setEditingNoteId(null);
    } catch (err) {
      console.error('Failed to save note', err);
    }
  };

  const filteredJobs = jobs.filter(j => {
    if (statusFilter !== 'All' && j.status !== statusFilter) return false;
    if (query) {
      const search = query.toLowerCase();
      if (!j.title?.toLowerCase().includes(search) && !j.company?.toLowerCase().includes(search)) return false;
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-primary-hover border-blue-200';
      case 'Interview': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Assessment': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Offer': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'Withdrawn': return 'border-border text-text-primary border-border';
      default: return 'bg-background-secondary text-text-primary border-border';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-24 font-sans animate-fade-in">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-6 rounded-2xl shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none border border-border">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-primary fill-blue-50" /> Saved Jobs
          </h1>
          <p className="text-text-muted text-sm mt-1">{jobs.length} jobs saved in your pipeline</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search saved jobs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm font-medium text-text-primary outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Assessment">Assessment</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <Loader className="w-8 h-8 text-primary animate-spin" />
          <p className="text-text-muted font-medium">Loading your saved jobs...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center font-medium">
          {error}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-16 text-center shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
           <Bookmark className="w-16 h-16 text-slate-200 mx-auto mb-4" />
           <h3 className="text-xl font-bold text-text-primary">No Saved Jobs Yet</h3>
           <p className="text-text-muted mt-2 max-w-sm mx-auto">
             Jobs you save from Job Explorer will appear here so you can track your applications.
           </p>
           <button 
             onClick={() => window.location.href = '/jobs'}
             className="mt-6 bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 rounded-lg transition-colors"
           >
             Explore Jobs
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <div key={job._id} className="bg-card border border-border rounded-2xl shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
              
              {/* Card Header */}
              <div className="p-5 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 overflow-hidden text-lg font-bold text-text-muted">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain p-1" />
                  ) : (
                    <div className="w-full h-full bg-slate-900 text-white flex items-center justify-center font-serif">{(job.company || '?').substring(0, 3)}</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-text-primary text-base truncate cursor-pointer hover:text-primary transition-colors" onClick={() => setSelectedJob(job as unknown as Job)}>
                    {job.title}
                  </h3>
                  <p className="text-sm font-medium text-text-secondary truncate">{job.company}</p>
                </div>
                <div className="shrink-0 relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === `status-${job._id}` ? null : `status-${job._id}`)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide flex items-center gap-1 ${getStatusColor(job.status)}`}
                  >
                    {job.status} <ChevronDown className="w-3 h-3" />
                  </button>
                  {activeDropdown === `status-${job._id}` && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-xl z-10 py-1 overflow-hidden">
                       {['Saved', 'Applied', 'Interview', 'Assessment', 'Offer', 'Rejected', 'Withdrawn'].map(st => (
                         <button 
                           key={st}
                           onClick={(e) => handleStatusChange(e, job._id, st)}
                           className="w-full text-left px-3 py-1.5 text-xs hover:bg-background font-medium text-text-primary"
                         >
                           {st}
                         </button>
                       ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="px-5 pb-4 flex-1">
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-text-secondary mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-text-muted" /> {job.location}</span>
                  <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5 text-text-muted" /> {(job as any).salary || 'Salary not specified'}</span>
                </div>

                {/* Notes Section */}
                <div className="bg-background rounded-lg p-3 border border-border">
                  {editingNoteId === job._id ? (
                    <div>
                      <textarea 
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="w-full text-sm p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card resize-none"
                        placeholder="Add a note..."
                        rows={2}
                        autoFocus
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button onClick={() => setEditingNoteId(null)} className="text-xs text-text-muted hover:text-text-primary font-medium">Cancel</button>
                        <button onClick={() => handleSaveNote(job._id)} className="text-xs bg-primary text-white px-3 py-1 rounded font-medium">Save Note</button>
                      </div>
                    </div>
                  ) : (
                    <div className="group/note">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-text-muted uppercase">Personal Note</span>
                        <button 
                          onClick={() => { setEditingNoteId(job._id); setNoteText(job.notes || ''); }}
                          className="opacity-0 group-hover/note:opacity-100 text-primary hover:text-blue-800 transition-opacity"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className={`text-sm ${job.notes ? 'text-text-primary' : 'text-text-muted italic'}`}>
                        {job.notes || 'No notes added yet.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-background border-t border-border flex items-center justify-between">
                <div className="text-[10px] text-text-muted font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Saved {new Date(job.savedAt).toLocaleDateString()}
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={(e) => handleRemove(e, job._id)} className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove Job">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => job.applicationUrl && window.open(job.applicationUrl, '_blank')}
                    className="flex items-center gap-1 bg-card border border-border hover:border-blue-300 hover:text-primary text-text-primary text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none transition-colors"
                  >
                    Apply <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          isSaved={true}
          onClose={() => setSelectedJob(null)} 
        />
      )}
    </div>
  );
}
