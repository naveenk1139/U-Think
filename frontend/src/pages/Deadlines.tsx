import React, { useState, useEffect } from 'react';
import { CalendarClock, BellRing, Info, ExternalLink, Filter } from 'lucide-react';
import api from '../api/axios';

interface Deadline {
  _id: string;
  title: string;
  description: string;
  category: 'EXAM' | 'SCHOLARSHIP' | 'COLLEGE_APP' | 'COUNSELING' | 'OTHER';
  deadlineDate: string;
  deadlineTime?: string;
  sourceName?: string;
  sourceUrl?: string;
}

export default function Deadlines() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const fetchDeadlines = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/deadlines');
      setDeadlines(res.data.deadlines || []);
    } catch (err) {
      console.error('Failed to fetch deadlines:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (id: string, title: string) => {
    try {
      const res = await api.post(`/api/deadlines/${id}/subscribe`);
      if (res.data.success) {
        alert(`Successfully subscribed to reminders for "${title}". Reminders are queued based on your notification settings.`);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to subscribe');
    }
  };

  const filteredDeadlines = filter === 'ALL' 
    ? deadlines 
    : deadlines.filter(d => d.category === filter);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'EXAM': return 'bg-blue-100 text-blue-800';
      case 'SCHOLARSHIP': return 'bg-emerald-100 text-emerald-800';
      case 'COLLEGE_APP': return 'bg-purple-100 text-purple-800';
      case 'COUNSELING': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="font-sans max-w-6xl mx-auto w-full p-4 sm:p-6 pb-20">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-3">
            <CalendarClock className="w-8 h-8 text-primary" />
            Deadline Hub
          </h1>
          <p className="text-text-muted mt-2">Track upcoming educational deadlines and set multi-channel reminders.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-card p-2 rounded-xl border border-border shadow-sm">
          <Filter className="w-4 h-4 text-text-muted ml-2" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent border-none text-sm font-semibold text-text-primary focus:ring-0 outline-none pr-4 cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="EXAM">Entrance Exams</option>
            <option value="SCHOLARSHIP">Scholarships</option>
            <option value="COLLEGE_APP">College Applications</option>
            <option value="COUNSELING">Counseling</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-48 bg-card rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredDeadlines.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-3xl border border-border">
          <CalendarClock className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-text-primary">No deadlines found</h3>
          <p className="text-text-muted mt-2 max-w-md mx-auto">There are no upcoming deadlines in this category right now. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeadlines.map((deadline) => {
            const date = new Date(deadline.deadlineDate);
            const formattedDate = date.toLocaleDateString('en-IN', {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
            const daysLeft = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
            
            return (
              <div key={deadline._id} className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                {/* Imminent Warning Banner */}
                {daysLeft <= 3 && daysLeft >= 0 && (
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500"></div>
                )}
                {daysLeft <= 7 && daysLeft > 3 && (
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-400"></div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${getCategoryColor(deadline.category)}`}>
                    {deadline.category.replace('_', ' ')}
                  </span>
                  
                  {daysLeft >= 0 ? (
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                      <CalendarClock className="w-3.5 h-3.5" /> {daysLeft} days left
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-red-500">Closed</div>
                  )}
                </div>

                <h3 className="font-bold text-lg text-text-primary mb-2 line-clamp-2">{deadline.title}</h3>
                
                <p className="text-sm text-text-muted line-clamp-3 mb-4 min-h-[60px]">
                  {deadline.description}
                </p>

                <div className="bg-background-secondary rounded-xl p-3 mb-5 border border-border/50">
                  <div className="text-xs text-text-muted font-medium mb-1">Deadline Date</div>
                  <div className="font-semibold text-text-primary">{formattedDate}</div>
                  {deadline.deadlineTime && (
                    <div className="text-sm font-medium text-text-secondary mt-1">@ {deadline.deadlineTime}</div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
                  {deadline.sourceUrl ? (
                    <a 
                      href={deadline.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover flex items-center gap-1.5 text-sm font-semibold"
                    >
                      <ExternalLink className="w-4 h-4" /> Official Link
                    </a>
                  ) : (
                    <div />
                  )}

                  <button 
                    onClick={() => handleSubscribe(deadline._id, deadline.title)}
                    disabled={daysLeft < 0}
                    className="bg-primary hover:bg-primary-hover text-white flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <BellRing className="w-4 h-4" /> Remind Me
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
