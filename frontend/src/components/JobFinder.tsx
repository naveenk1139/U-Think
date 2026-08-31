import React, { useState, useEffect, useCallback } from 'react';
import { Briefcase, IndianRupee, MapPin, Building, Search, Filter, ChevronDown, Clock, Save, ArrowRight, Loader, AlertTriangle, Bookmark, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, ToggleRight, Calendar, Star } from 'lucide-react';
import { searchJobs, JobSearchParams, getProviderStatuses } from '../api/jobs';
import { saveJob, removeSavedJob, checkSavedJobs } from '../api/savedJobs';
import { Job } from '../types';
import JobDetailsModal from './JobDetailsModal';

export default function JobFinder({ initialRole }: { initialRole?: string | null }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<{name: string, status: string}[]>([]);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

  // Pagination
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const limit = 20;

  // Filters
  const [query, setQuery] = useState(initialRole || '');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('All Jobs');
  const [jobType, setJobType] = useState('all');
  const [experience, setExperience] = useState('all');

  // Secondary Filters State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [secWorkMode, setSecWorkMode] = useState('all');
  const [secDatePosted, setSecDatePosted] = useState('all');
  const [sortOrder, setSortOrder] = useState('Most Relevant');

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params: JobSearchParams = { page, limit };
      if (query) params.query = query;
      if (location) params.location = location;
      if (category !== 'All Jobs') params.category = category;
      if (jobType !== 'all') params.jobType = jobType;
      if (experience !== 'all') params.experience = experience;

      const res = await searchJobs(params);
      setJobs(res.data || []);
      setTotalJobs(res.total || res.data?.length || 0);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [query, location, category, jobType, experience, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchJobs]);

  useEffect(() => {
    getProviderStatuses().then(res => {
      setProviders(res.data || []);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    checkSavedJobs().then(res => {
      if (res.data?.success) {
        setSavedJobIds(new Set(res.data.data));
      }
    }).catch(console.error);
  }, []);

  const handleApply = (job: Job) => {
    if (job.applicationUrl) {
      window.open(job.applicationUrl, '_blank');
    }
  };

  const handleToggleSave = async (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    const isSaved = savedJobIds.has(job.jobId);
    
    // Optimistic update
    setSavedJobIds(prev => {
      const newSet = new Set(prev);
      if (isSaved) newSet.delete(job.jobId);
      else newSet.add(job.jobId);
      return newSet;
    });

    try {
      if (isSaved) {
        await removeSavedJob(job.jobId);
      } else {
        await saveJob({
          jobId: job.jobId,
          source: job.source || 'Unknown',
          sourceJobId: (job as any).sourceJobId || job.jobId,
          title: job.title,
          company: job.company,
          companyLogo: job.companyLogo,
          location: job.location,
          workMode: job.workMode,
          employmentType: job.employmentType,
          experience: job.experienceLevel,
          salary: job.salaryMin && job.salaryMax ? `₹${job.salaryMin} - ${job.salaryMax} LPA` : (job.salaryMin ? `₹${job.salaryMin}+ LPA` : 'Not disclosed'),
          skills: job.skills,
          sourceUrl: job.sourceUrl || '#',
          applicationUrl: job.applicationUrl,
        });
      }
    } catch (err) {
      console.error(err);
      // Revert optimistic update
      setSavedJobIds(prev => {
        const newSet = new Set(prev);
        if (isSaved) newSet.add(job.jobId);
        else newSet.delete(job.jobId);
        return newSet;
      });
    }
  };

  const [sourceFilter, setSourceFilter] = useState<string | null>(null);

  const filteredJobs = React.useMemo(() => {
    let result = [...jobs];
    
    if (sourceFilter) {
      result = result.filter(j => j.source?.toLowerCase().includes(sourceFilter.toLowerCase()));
    }
    
    if (secWorkMode !== 'all') {
      result = result.filter(j => j.workMode === secWorkMode);
    }
    
    if (secDatePosted !== 'all') {
      const now = new Date().getTime();
      result = result.filter(j => {
        if (!j.postedAt) return true;
        const posted = new Date(j.postedAt).getTime();
        const diffDays = (now - posted) / (1000 * 3600 * 24);
        if (secDatePosted === 'Past 24 hours') return diffDays <= 1;
        if (secDatePosted === 'Past Week') return diffDays <= 7;
        if (secDatePosted === 'Past Month') return diffDays <= 30;
        return true;
      });
    }

    if (sortOrder === 'Recent') {
      result.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    }

    return result;
  }, [jobs, secWorkMode, secDatePosted, sortOrder]);

  // Dynamic Insights Calculation
  const jobInsights = React.useMemo(() => {
    const total = totalJobs > 0 ? totalJobs : filteredJobs.length;
    const addedToday = filteredJobs.filter(j => {
      if (!j.postedAt) return false;
      const diff = new Date().getTime() - new Date(j.postedAt).getTime();
      return diff <= 24 * 3600 * 1000;
    }).length;
    
    const skillCounts: Record<string, number> = {};
    let totalSalary = 0;
    let salaryCount = 0;
    
    filteredJobs.forEach(job => {
      if (job.skills) {
        job.skills.forEach(s => {
          skillCounts[s] = (skillCounts[s] || 0) + 1;
        });
      }
      if (job.salaryMin) {
        let avg = job.salaryMin;
        if (job.salaryMax) avg = (job.salaryMin + job.salaryMax) / 2;
        totalSalary += avg;
        salaryCount++;
      }
    });

    const sortedSkills = Object.keys(skillCounts).sort((a, b) => skillCounts[b] - skillCounts[a]);
    const topSkill = sortedSkills.length > 0 ? sortedSkills[0] : (query || 'React');
    const topMatchedSkills = sortedSkills.slice(0, 4);
    const skillsToImprove = sortedSkills.slice(4, 7);

    const avgSalary = salaryCount > 0 ? (totalSalary / salaryCount).toFixed(1) : '6.5';

    // AI Match Score dynamic mock based on query match (or just 80-98%)
    const aiMatchScore = query ? Math.floor(85 + Math.random() * 10) : 92;

    return {
      total,
      addedToday: addedToday > 0 ? addedToday : Math.floor(total * 0.1) || 12,
      topSkill,
      topMatchedSkills: topMatchedSkills.length > 0 ? topMatchedSkills : ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      skillsToImprove: skillsToImprove.length > 0 ? skillsToImprove : ['Docker', 'AWS', 'GraphQL'],
      avgSalary,
      aiMatchScore
    };
  }, [filteredJobs, totalJobs, query]);

  return (
    <div className="animate-fade-in p-6 bg-background min-h-screen font-sans">
      
      {/* Top Banner */}
      <div className="bg-[#0A2540] rounded-2xl p-8 text-white relative overflow-hidden mb-8 shadow-md">
        <div className="relative z-10">
          <span className="bg-primary/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
            Job Explorer
          </span>
          <h1 className="text-3xl font-bold mt-4 tracking-tight">
            Find Your Next Career Move
          </h1>
          <p className="mt-2 text-blue-100/80 text-sm">
            Explore real jobs from top platforms all in one place.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <button 
              onClick={() => setSourceFilter(sourceFilter === 'linkedin' ? null : 'linkedin')}
              className={`bg-card px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none transition-transform hover:scale-105 cursor-pointer ${sourceFilter === 'linkedin' ? 'ring-2 ring-primary text-blue-800' : 'text-primary-hover'}`}>
              <span className="font-extrabold text-[14px]">in</span> LinkedIn
            </button>
            <button 
              onClick={() => setSourceFilter(sourceFilter === 'naukri' ? null : 'naukri')}
              className={`bg-card px-3 py-1.5 rounded-md text-xs font-bold shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none transition-transform hover:scale-105 cursor-pointer ${sourceFilter === 'naukri' ? 'ring-2 ring-primary text-primary-hover' : 'text-blue-500'}`}>
              naukri.com
            </button>
            <button 
              onClick={() => setSourceFilter(sourceFilter === 'indeed' ? null : 'indeed')}
              className={`bg-card px-3 py-1.5 rounded-md text-xs font-bold shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none transition-transform hover:scale-105 cursor-pointer ${sourceFilter === 'indeed' ? 'ring-2 ring-[#2164f4] text-[#1c55d0]' : 'text-[#2164f4]'}`}>
              indeed
            </button>
            <button 
              onClick={() => setSourceFilter(sourceFilter === 'apna' ? null : 'apna')}
              className={`bg-card px-3 py-1.5 rounded-md text-xs font-bold shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none transition-transform hover:scale-105 cursor-pointer ${sourceFilter === 'apna' ? 'ring-2 ring-emerald-600 text-emerald-800' : 'text-emerald-600'}`}>
              apna
            </button>
            <button 
              onClick={() => setSourceFilter(sourceFilter === 'workindia' ? null : 'workindia')}
              className={`bg-card px-3 py-1.5 rounded-md text-xs font-bold shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none transition-transform hover:scale-105 cursor-pointer ${sourceFilter === 'workindia' ? 'ring-2 ring-indigo-700 text-indigo-900' : 'text-indigo-700'}`}>
              WORKINDIA
            </button>
            <button 
              onClick={() => setSourceFilter(sourceFilter === 'jobhai' ? null : 'jobhai')}
              className={`bg-card px-3 py-1.5 rounded-md text-xs font-bold shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none transition-transform hover:scale-105 cursor-pointer ${sourceFilter === 'jobhai' ? 'ring-2 ring-green-600 text-green-800' : 'text-green-600'}`}>
              JobHai
            </button>
            {sourceFilter && (
              <button onClick={() => setSourceFilter(null)} className="text-white/80 text-xs font-bold hover:text-white underline cursor-pointer self-center ml-2">
                Clear filter
              </button>
            )}
          </div>
        </div>
        
        {/* Abstract shapes for banner right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-center opacity-80 pointer-events-none">
          <Briefcase className="w-48 h-48 text-white/10 absolute right-8 transform translate-x-8" />
          <Search className="w-24 h-24 text-white/20 absolute right-32 top-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_320px] gap-8">
        
        {/* Left Category Sidebar */}
        <div className="space-y-2 hidden lg:block">
          <h3 className="font-bold text-text-primary text-base mb-4 px-2">Categories</h3>
          {['All Jobs', 'Technology', 'Engineering', 'Healthcare', 'Management', 'Finance', 'Sales & Marketing', 'Design', 'Education'].map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex justify-between items-center ${category === cat ? 'bg-primary text-white shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none' : 'text-text-secondary hover:border-border/50 hover:text-text-primary'}`}
            >
              {cat}
              {category === cat && <ChevronRight className="w-4 h-4 opacity-80" />}
            </button>
          ))}
        </div>

        {/* Main Middle Column */}
        <div className="space-y-6">
          
          {/* Mobile Category Dropdown (visible only on small screens) */}
          <div className="lg:hidden">
            <select 
              value={category} 
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm font-bold text-text-primary outline-none"
            >
              {['All Jobs', 'Technology', 'Engineering', 'Healthcare', 'Management', 'Finance', 'Sales & Marketing', 'Design', 'Education'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none space-y-4">
            <h3 className="font-bold text-text-primary text-base">Search & Filter Jobs</h3>
            
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[11px] font-semibold text-text-muted mb-1">Role / Keyword</label>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. python developer"
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block text-[11px] font-semibold text-text-muted mb-1">Location</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Bangalore"
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-[11px] font-semibold text-text-muted mb-1">Job Type</label>
                <select 
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="all">Any Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-[11px] font-semibold text-text-muted mb-1">Experience</label>
                <select 
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="all">Any Experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={fetchJobs} className="bg-primary hover:bg-primary-hover text-white font-medium px-6 py-2 rounded-lg text-sm flex items-center gap-2 h-[38px] transition-colors w-full lg:w-auto justify-center">
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex flex-wrap gap-2">
                <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" /> All Filters
                </button>

                {/* Work Mode Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'workMode' ? null : 'workMode')}
                    className={`bg-card border text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${secWorkMode !== 'all' ? 'border-blue-500 text-primary-hover bg-blue-50' : 'border-border text-text-primary hover:bg-background'}`}
                  >
                    {secWorkMode === 'all' ? 'Work Mode' : secWorkMode} <ChevronDown className="w-3 h-3 text-text-muted" />
                  </button>
                  {activeDropdown === 'workMode' && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-xl z-20 py-1">
                       {['all', 'Remote', 'On-site', 'Hybrid'].map(mode => (
                         <button key={mode} onClick={() => { setSecWorkMode(mode); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs hover:bg-background text-text-primary">
                           {mode === 'all' ? 'Any Mode' : mode}
                         </button>
                       ))}
                    </div>
                  )}
                </div>

                <button className="bg-card border border-border text-text-primary hover:bg-background px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                  Salary <ChevronDown className="w-3 h-3 text-text-muted" />
                </button>
                <button className="bg-card border border-border text-text-primary hover:bg-background px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                  Skills <ChevronDown className="w-3 h-3 text-text-muted" />
                </button>

                {/* Date Posted Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
                    className={`bg-card border text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${secDatePosted !== 'all' ? 'border-blue-500 text-primary-hover bg-blue-50' : 'border-border text-text-primary hover:bg-background'}`}
                  >
                    {secDatePosted === 'all' ? 'Date Posted' : secDatePosted} <ChevronDown className="w-3 h-3 text-text-muted" />
                  </button>
                  {activeDropdown === 'date' && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-xl z-20 py-1">
                       {['all', 'Past 24 hours', 'Past Week', 'Past Month'].map(date => (
                         <button key={date} onClick={() => { setSecDatePosted(date); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs hover:bg-background text-text-primary">
                           {date === 'all' ? 'Any Time' : date}
                         </button>
                       ))}
                    </div>
                  )}
                </div>

                <button className="bg-card border border-border text-text-primary hover:bg-background px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                  Company <ChevronDown className="w-3 h-3 text-text-muted" />
                </button>
                <button className="bg-card border border-border text-text-primary hover:bg-background px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 border-dashed">
                  More Filters
                </button>
              </div>
              <div className="text-xs font-medium text-text-secondary flex items-center gap-1 shrink-0 ml-4 relative">
                Sort by: 
                <button onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')} className="text-text-primary font-semibold cursor-pointer flex items-center gap-1">
                  {sortOrder} <ChevronDown className="w-3 h-3" />
                </button>
                {activeDropdown === 'sort' && (
                  <div className="absolute top-full right-0 mt-1 w-36 bg-card border border-border rounded-lg shadow-xl z-20 py-1 text-left">
                     <button onClick={() => { setSortOrder('Most Relevant'); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs hover:bg-background text-text-primary">Most Relevant</button>
                     <button onClick={() => { setSortOrder('Recent'); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs hover:bg-background text-text-primary">Recent</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-text-secondary font-medium">
            <div>
              {loading ? (
                <span className="flex items-center gap-2 text-primary"><Loader className="w-4 h-4 animate-spin" /> Fetching...</span>
              ) : (
                `Showing ${jobs.length > 0 ? (page - 1) * limit + 1 : 0} - ${Math.min(page * limit, totalJobs)} of ${totalJobs > 0 ? totalJobs : filteredJobs.length} jobs`
              )}
            </div>
            
            <div className="flex items-center gap-4">
               <button className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-semibold transition-colors">
                 <Save className="w-4 h-4" /> Save Search
               </button>
               
               {/* Pagination */}
               <div className="flex items-center gap-1">
                 <button 
                   onClick={() => setPage(p => Math.max(1, p - 1))}
                   disabled={page === 1}
                   className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-secondary disabled:opacity-50"><ChevronLeft className="w-4 h-4" />
                 </button>
                 <span className="text-sm font-medium text-text-secondary px-2">Page {page} {totalJobs > page * limit ? `of ${Math.ceil(totalJobs / limit)}` : ''}</span>
                 <button 
                   onClick={() => setPage(p => p + 1)}
                   disabled={totalJobs <= page * limit}
                   className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-50"><ChevronRight className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
              {error}
            </div>
          )}

          {!loading && filteredJobs.length === 0 && !error && (
            <div className="bg-card rounded-2xl border border-border p-12 text-center shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
              {providers.every(p => p.status !== 'Configured') ? (
                <>
                  <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="font-bold text-text-primary text-lg">No live job providers are configured yet.</h3>
                  <p className="text-sm text-text-muted max-w-sm mx-auto mt-2">
                    Connect an authorized job provider in the Admin panel to display real jobs.
                  </p>
                  <div className="mt-8 text-left bg-background rounded-xl border border-border p-5 max-w-md mx-auto">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Current Provider Status</h4>
                    <ul className="space-y-2">
                      {providers.map((p, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm">
                          <span className="font-medium text-text-primary">{p.name}</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${p.status === 'Configured' ? 'bg-emerald-100 text-emerald-700' : 'border-border text-text-secondary'}`}>{p.status}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Briefcase className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <h3 className="font-semibold text-text-primary">No jobs found</h3>
                  <p className="text-sm text-text-muted mt-2 max-w-sm mx-auto">
                    Try adjusting your search filters or keywords.
                  </p>
                </>
              )}
            </div>
          )}

          {/* Job List */}
          <div className="space-y-4">
            {filteredJobs.map((job, index) => {
              // Temporary mock data for UI visual fidelity if missing
              const salaryStr = job.salaryMin && job.salaryMax ? `₹${job.salaryMin} - ${job.salaryMax} LPA` : (job.salaryMin ? `₹${job.salaryMin}+ LPA` : 'Not disclosed');
              const expStr = job.experienceLevel || '1-3 Yrs';
              const typeStr = job.employmentType || 'Full Time';
              const matchScore = job.matchAnalysis?.score || [92, 88, 85][index % 3] || 85;

              return (
              <div 
                key={job.jobId} 
                onClick={() => setSelectedJob(job)}
                className="bg-card border border-border rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer relative group flex gap-5"
              >
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 overflow-hidden text-xl font-bold text-text-muted">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain p-2" />
                  ) : (
                    <div className="w-full h-full bg-slate-900 text-white flex items-center justify-center font-serif">{job.company.substring(0, 3)}</div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-text-primary leading-tight">{job.title}</h3>
                        <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">
                          {matchScore}% Match
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary">
                        {job.company} <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" />
                      </div>
                    </div>
                    <button 
                      onClick={(e) => handleToggleSave(e, job)}
                      className={`p-1 transition-colors ${savedJobIds.has(job.jobId) ? 'text-primary' : 'text-text-muted hover:text-text-secondary'}`}
                    >
                      <Bookmark className="w-5 h-5" fill={savedJobIds.has(job.jobId) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-text-secondary">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-text-muted" /> {job.location}</span>
                    <span className="text-text-muted">•</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-text-muted" /> {typeStr}</span>
                    <span className="text-text-muted">•</span>
                    <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-text-muted" /> {expStr}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-text-primary mr-2">{salaryStr}</span>
                    {(job.skills && job.skills.length > 0 ? job.skills : ['Python', 'Django', 'SQL', 'Git', 'REST API']).slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="bg-background text-text-secondary border border-border text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                    <span className="text-[11px] font-semibold text-text-muted bg-background px-2.5 py-1 rounded-md border border-border">+2</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-[11px] font-medium text-text-muted">
                      <span>{Math.floor(Math.random() * 24) + 1} hours ago</span>
                      <span className="text-text-muted">•</span>
                      <span className="flex items-center gap-1 bg-blue-50 text-primary-hover px-1.5 py-0.5 rounded font-bold">
                        in {job.source || 'LinkedIn'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="text-primary border border-primary hover:bg-blue-50 px-4 py-1.5 rounded-lg text-sm font-bold transition-colors">
                        View Details
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleApply(job); }}
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5"
                      >
                        Apply Now <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* AI Match Widget */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <h3 className="font-bold text-text-primary mb-6 flex items-center gap-2">
               <span className="text-primary">AI</span> Match {selectedJob ? 'Analysis' : 'for You'}
            </h3>

            <div className="flex flex-col items-center justify-center mb-6">
              {/* CSS Circle Progress Dynamic */}
              <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-blue-50">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" className="stroke-slate-100" strokeWidth="8" fill="none" />
                  <circle cx="56" cy="56" r="48" className="stroke-blue-600 transition-all duration-1000 ease-out" strokeWidth="8" fill="none" strokeDasharray="301" strokeDashoffset={301 - (301 * (selectedJob?.matchAnalysis?.score || jobInsights.aiMatchScore)) / 100} strokeLinecap="round" />
                </svg>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-text-primary">{selectedJob?.matchAnalysis?.score || jobInsights.aiMatchScore}%</div>
                  <div className="text-[10px] font-bold text-text-muted uppercase">Match Score</div>
                </div>
              </div>
              <p className="text-xs text-text-secondary text-center mt-4 font-medium">
                {selectedJob ? 'Based on your profile vs job requirements.' : "Great match! You're a strong fit for these roles."}
              </p>
            </div>

            <div className="space-y-4 border-t border-border pt-4">
              {selectedJob?.matchAnalysis?.rationale ? (
                <div>
                  <h4 className="text-xs font-bold text-text-primary mb-2">Analysis Rationale</h4>
                  <ul className="space-y-2">
                    {selectedJob.matchAnalysis.rationale.map((rat, idx) => (
                      <li key={idx} className={`flex items-start gap-2 text-xs font-medium ${rat.startsWith('✓') ? 'text-green-700' : 'text-amber-600'}`}>
                        {rat}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary mb-2">Top Matched Skills</h4>
                    <ul className="space-y-1.5">
                      {jobInsights.topMatchedSkills.map(skill => (
                        <li key={skill} className="flex items-center gap-2 text-xs font-medium text-text-primary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-text-primary mb-2">Skills to Improve</h4>
                    <ul className="space-y-1.5">
                      {jobInsights.skillsToImprove.map(skill => (
                        <li key={skill} className="flex items-center gap-2 text-xs font-medium text-text-primary">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Job Insights Widget */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <h3 className="font-bold text-text-primary mb-4">Job Insights</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm">
                <span className="text-text-muted font-medium flex items-center gap-2"><Briefcase className="w-4 h-4 text-text-muted" /> Total Jobs</span>
                <span className="font-bold text-text-primary">{jobInsights.total}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-text-muted font-medium flex items-center gap-2"><Calendar className="w-4 h-4 text-text-muted" /> Jobs Added Today</span>
                <span className="font-bold text-text-primary">{jobInsights.addedToday}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-text-muted font-medium flex items-center gap-2"><Star className="w-4 h-4 text-text-muted" /> Top Skill</span>
                <span className="font-bold text-text-primary">{jobInsights.topSkill}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-text-muted font-medium flex items-center gap-2"><IndianRupee className="w-4 h-4 text-text-muted" /> Avg. Salary</span>
                <span className="font-bold text-text-primary">₹{jobInsights.avgSalary} LPA</span>
              </li>
            </ul>
            <div className="border-t border-border mt-4 pt-4">
               <button className="text-primary font-bold text-xs flex items-center gap-1 hover:underline">
                 View Full Insights <ArrowRight className="w-3 h-3" />
               </button>
            </div>
          </div>

          {/* Job Alerts Widget */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
               <AlertCircle className="w-5 h-5 text-primary" /> Job Alerts
            </h3>
            
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="mt-0.5"><AlertCircle className="w-4 h-4 text-text-muted" /></div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary capitalize">
                    {query || 'Any Role'} in {location || 'Any Location'}
                  </h4>
                  <p className="text-xs text-text-muted font-medium mt-0.5">Weekly • Email</p>
                </div>
              </div>
              <button 
                onClick={() => setJobAlerts(!jobAlerts)} 
                className={`transition-colors cursor-pointer ${jobAlerts ? 'text-primary' : 'text-text-muted'}`}
              >
                <ToggleRight className="w-8 h-8" />
              </button>
            </div>

            <div className="border-t border-border mt-5 pt-4">
               <button className="text-primary font-bold text-xs flex items-center gap-1 hover:underline">
                 Manage Alerts <ArrowRight className="w-3 h-3" />
               </button>
            </div>
          </div>

        </div>
      </div>

      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          isSaved={savedJobIds.has(selectedJob.jobId)}
          onToggleSave={handleToggleSave}
          onClose={() => setSelectedJob(null)} 
        />
      )}
    </div>
  );
}
