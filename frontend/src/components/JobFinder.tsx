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
  }, [query, location, jobType, experience, page]);

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
          sourceJobId: job.sourceJobId || job.jobId,
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

  const filteredJobs = React.useMemo(() => {
    let result = [...jobs];
    
    if (secWorkMode !== 'all') {
      result = result.filter(j => j.workMode === secWorkMode);
    }
    
    if (secDatePosted !== 'all') {
      const now = new Date().getTime();
      result = result.filter(j => {
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

  return (
    <div className="animate-fade-in p-6 bg-slate-50 min-h-screen font-sans">
      
      {/* Top Banner */}
      <div className="bg-[#0A2540] rounded-2xl p-8 text-white relative overflow-hidden mb-8 shadow-md">
        <div className="relative z-10">
          <span className="bg-blue-600/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
            Job Explorer
          </span>
          <h1 className="text-3xl font-bold mt-4 tracking-tight">
            Find Your Next Career Move
          </h1>
          <p className="mt-2 text-blue-100/80 text-sm">
            Explore real jobs from top platforms all in one place.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-white text-blue-700 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm"><span className="font-extrabold text-[14px]">in</span> LinkedIn</span>
            <span className="bg-white text-blue-500 px-3 py-1.5 rounded-md text-xs font-bold shadow-sm">naukri.com</span>
            <span className="bg-white text-[#2164f4] px-3 py-1.5 rounded-md text-xs font-bold shadow-sm">indeed</span>
            <span className="bg-white text-emerald-600 px-3 py-1.5 rounded-md text-xs font-bold shadow-sm">apna</span>
            <span className="bg-white text-indigo-700 px-3 py-1.5 rounded-md text-xs font-bold shadow-sm">WORKINDIA</span>
            <span className="bg-white text-green-600 px-3 py-1.5 rounded-md text-xs font-bold shadow-sm">JobHai</span>
          </div>
        </div>
        
        {/* Abstract shapes for banner right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-center opacity-80 pointer-events-none">
          <Briefcase className="w-48 h-48 text-white/10 absolute right-8 transform translate-x-8" />
          <Search className="w-24 h-24 text-white/20 absolute right-32 top-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        
        {/* Main Left Column */}
        <div className="space-y-6">
          
          {/* Search & Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Search & Filter Jobs</h3>
            
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Role / Keyword</label>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. python developer"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Location</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Bangalore"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Job Type</label>
                <select 
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="all">Any Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Experience</label>
                <select 
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="all">Any Experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={fetchJobs} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg text-sm flex items-center gap-2 h-[38px] transition-colors w-full lg:w-auto justify-center">
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex flex-wrap gap-2">
                <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" /> All Filters
                </button>

                {/* Work Mode Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'workMode' ? null : 'workMode')}
                    className={`bg-white border text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${secWorkMode !== 'all' ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                  >
                    {secWorkMode === 'all' ? 'Work Mode' : secWorkMode} <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                  {activeDropdown === 'workMode' && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1">
                       {['all', 'Remote', 'On-site', 'Hybrid'].map(mode => (
                         <button key={mode} onClick={() => { setSecWorkMode(mode); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 text-slate-700">
                           {mode === 'all' ? 'Any Mode' : mode}
                         </button>
                       ))}
                    </div>
                  )}
                </div>

                <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                  Salary <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                  Skills <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {/* Date Posted Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
                    className={`bg-white border text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${secDatePosted !== 'all' ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                  >
                    {secDatePosted === 'all' ? 'Date Posted' : secDatePosted} <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                  {activeDropdown === 'date' && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1">
                       {['all', 'Past 24 hours', 'Past Week', 'Past Month'].map(date => (
                         <button key={date} onClick={() => { setSecDatePosted(date); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 text-slate-700">
                           {date === 'all' ? 'Any Time' : date}
                         </button>
                       ))}
                    </div>
                  )}
                </div>

                <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                  Company <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 border-dashed">
                  More Filters
                </button>
              </div>
              <div className="text-xs font-medium text-slate-600 flex items-center gap-1 shrink-0 ml-4 relative">
                Sort by: 
                <button onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')} className="text-slate-900 font-semibold cursor-pointer flex items-center gap-1">
                  {sortOrder} <ChevronDown className="w-3 h-3" />
                </button>
                {activeDropdown === 'sort' && (
                  <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1 text-left">
                     <button onClick={() => { setSortOrder('Most Relevant'); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 text-slate-700">Most Relevant</button>
                     <button onClick={() => { setSortOrder('Recent'); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 text-slate-700">Recent</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-slate-600 font-medium">
            <div>
              {loading ? (
                <span className="flex items-center gap-2 text-blue-600"><Loader className="w-4 h-4 animate-spin" /> Fetching...</span>
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
                   className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 disabled:opacity-50"><ChevronLeft className="w-4 h-4" />
                 </button>
                 <span className="text-sm font-medium text-slate-600 px-2">Page {page} {totalJobs > page * limit ? `of ${Math.ceil(totalJobs / limit)}` : ''}</span>
                 <button 
                   onClick={() => setPage(p => p + 1)}
                   disabled={totalJobs <= page * limit}
                   className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 disabled:opacity-50"><ChevronRight className="w-4 h-4" />
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
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              {providers.every(p => p.status !== 'Configured') ? (
                <>
                  <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-900 text-lg">No live job providers are configured yet.</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2">
                    Connect an authorized job provider in the Admin panel to display real jobs.
                  </p>
                  <div className="mt-8 text-left bg-slate-50 rounded-xl border border-slate-200 p-5 max-w-md mx-auto">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Current Provider Status</h4>
                    <ul className="space-y-2">
                      {providers.map((p, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm">
                          <span className="font-medium text-slate-700">{p.name}</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${p.status === 'Configured' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>{p.status}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-slate-900">No jobs found</h3>
                  <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
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
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer relative group flex gap-5"
              >
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden text-xl font-bold text-slate-400">
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
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">{job.title}</h3>
                        <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">
                          {matchScore}% Match
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                        {job.company} <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" />
                      </div>
                    </div>
                    <button 
                      onClick={(e) => handleToggleSave(e, job)}
                      className={`p-1 transition-colors ${savedJobIds.has(job.jobId) ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <Bookmark className="w-5 h-5" fill={savedJobIds.has(job.jobId) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> {typeStr}</span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-slate-400" /> {expStr}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900 mr-2">{salaryStr}</span>
                    {(job.skills && job.skills.length > 0 ? job.skills : ['Python', 'Django', 'SQL', 'Git', 'REST API']).slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-600 border border-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">+2</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                      <span>{Math.floor(Math.random() * 24) + 1} hours ago</span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                        in {job.source || 'LinkedIn'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded-lg text-sm font-bold transition-colors">
                        View Details
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleApply(job); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5"
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
               <span className="text-blue-600">AI</span> Match for You
            </h3>

            <div className="flex flex-col items-center justify-center mb-6">
              {/* CSS Circle Progress Mock */}
              <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-blue-50">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" className="stroke-slate-100" strokeWidth="8" fill="none" />
                  <circle cx="56" cy="56" r="48" className="stroke-blue-600" strokeWidth="8" fill="none" strokeDasharray="301" strokeDashoffset="24" strokeLinecap="round" />
                </svg>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-slate-900">92%</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Overall Match</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 text-center mt-4 font-medium">
                Great match! You're a strong fit for this role.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2">Top Matched Skills</h4>
                <ul className="space-y-1.5">
                  {['Python', 'SQL', 'Git', 'Django'].map(skill => (
                    <li key={skill} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2">Skills to Improve</h4>
                <ul className="space-y-1.5">
                  {['REST API', 'AWS', 'Docker'].map(skill => (
                    <li key={skill} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="text-blue-600 font-bold text-xs flex items-center gap-1 mt-2 hover:underline">
                View Detailed Analysis <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Job Insights Widget */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Job Insights</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-400" /> Total Jobs</span>
                <span className="font-bold text-slate-900">1,248</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> Jobs Added Today</span>
                <span className="font-bold text-slate-900">68</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium flex items-center gap-2"><Star className="w-4 h-4 text-slate-400" /> Top Skill</span>
                <span className="font-bold text-slate-900">Python</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium flex items-center gap-2"><IndianRupee className="w-4 h-4 text-slate-400" /> Avg. Salary</span>
                <span className="font-bold text-slate-900">₹6.8 LPA</span>
              </li>
            </ul>
            <div className="border-t border-slate-100 mt-4 pt-4">
               <button className="text-blue-600 font-bold text-xs flex items-center gap-1 hover:underline">
                 View Full Insights <ArrowRight className="w-3 h-3" />
               </button>
            </div>
          </div>

          {/* Job Alerts Widget */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
               <AlertCircle className="w-5 h-5 text-blue-600" /> Job Alerts
            </h3>
            
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="mt-0.5"><AlertCircle className="w-4 h-4 text-slate-400" /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Python Developer in Bangalore</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Weekly • Email</p>
                </div>
              </div>
              <button 
                onClick={() => setJobAlerts(!jobAlerts)} 
                className={`transition-colors ${jobAlerts ? 'text-blue-600' : 'text-slate-300'}`}
              >
                <ToggleRight className="w-8 h-8" />
              </button>
            </div>

            <div className="border-t border-slate-100 mt-5 pt-4">
               <button className="text-blue-600 font-bold text-xs flex items-center gap-1 hover:underline">
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
