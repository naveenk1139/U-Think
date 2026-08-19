import React from 'react';
import { Job } from '../types';
import { X, Building, MapPin, Briefcase, Calendar, IndianRupee, Link as LinkIcon, Star, CheckCircle, Bookmark } from 'lucide-react';

interface JobDetailsModalProps {
  job: Job;
  isSaved?: boolean;
  onToggleSave?: (e: React.MouseEvent, job: Job) => void;
  onClose: () => void;
}

export default function JobDetailsModal({ job, isSaved, onToggleSave, onClose }: JobDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-slide-up">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 to-indigo-950 p-6 sm:p-8 text-white shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex gap-4 sm:gap-6 items-start">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center text-slate-400 font-bold text-3xl shadow-lg shrink-0 overflow-hidden">
               {job.companyLogo ? (
                 <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
               ) : (
                 job.company.charAt(0)
               )}
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{job.title}</h2>
              <div className="flex items-center gap-2 mt-2 text-indigo-100 font-medium">
                <Building className="w-4 h-4" /> {job.company}
              </div>
              <div className="flex flex-wrap gap-3 mt-4 text-xs font-semibold">
                 <span className="bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                   <MapPin className="w-3.5 h-3.5" /> {job.location}
                 </span>
                 <span className="bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                   <Briefcase className="w-3.5 h-3.5" /> {job.employmentType}
                 </span>
                 <span className="bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                   <Calendar className="w-3.5 h-3.5" /> Posted {new Date(job.postedAt).toLocaleDateString()}
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1 bg-slate-50">
          
          {/* AI Match Analysis Section */}
          {job.matchAnalysis && (
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex flex-col md:flex-row gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
              <div className="flex flex-col justify-center shrink-0">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">AI Match Score</span>
                <div className="text-4xl font-extrabold text-emerald-600 mt-1">{job.matchAnalysis.score}%</div>
              </div>
              <div>
                <ul className="space-y-1 mb-3">
                  {job.matchAnalysis.rationale.map((rat, i) => (
                    <li key={i} className={`text-sm font-semibold ${rat.startsWith('✓') ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {rat}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                   <div>
                     <strong className="text-emerald-700 flex items-center gap-1 mb-1"><CheckCircle className="w-4 h-4" /> Matched Skills</strong>
                     <div className="flex flex-wrap gap-1.5">
                       {job.matchAnalysis.matchedSkills.length ? job.matchAnalysis.matchedSkills.map((s, i) => (
                         <span key={i} className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">{s}</span>
                       )) : <span className="text-slate-400">None</span>}
                     </div>
                   </div>
                   <div>
                     <strong className="text-amber-700 flex items-center gap-1 mb-1"><Star className="w-4 h-4" /> Missing Skills</strong>
                     <div className="flex flex-wrap gap-1.5">
                       {job.matchAnalysis.missingSkills.length ? job.matchAnalysis.missingSkills.map((s, i) => (
                         <span key={i} className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100">{s}</span>
                       )) : <span className="text-slate-400">None</span>}
                     </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-4">
             <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">About the Role</h3>
             <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-sans">
               {job.description}
             </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Required Skills</h4>
               <div className="flex flex-wrap gap-2">
                 {job.skills && job.skills.length > 0 ? job.skills.map((skill, i) => (
                   <span key={i} className="bg-white border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-md shadow-sm">
                     {skill}
                   </span>
                 )) : <span className="text-slate-400 text-sm">Not specified</span>}
               </div>
            </div>
            
            <div className="space-y-4">
               <div>
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Salary Details</h4>
                 <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    {job.salaryMin || job.salaryMax ? 
                      `${job.salaryMin || ''}${job.salaryMax ? ` - ${job.salaryMax}` : '+'} ${job.salaryPeriod || ''}` : 
                      'Not Disclosed'}
                 </div>
               </div>
               <div>
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Experience Level</h4>
                 <div className="font-semibold text-slate-800">
                    {job.experienceLevel || 'Not specified'}
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between shrink-0">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            Provided By: <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded">{job.source}</span>
          </div>
          
          <div className="flex gap-3">
             <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
               Cancel
             </button>
             {onToggleSave && (
               <button 
                 onClick={(e) => onToggleSave(e, job)}
                 className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border ${isSaved ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
               >
                 <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved' : 'Save'}
               </button>
             )}
             <button 
               onClick={() => job.applicationUrl && window.open(job.applicationUrl, '_blank')}
               className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-200 flex items-center gap-2 transition-all"
             >
               Apply on {job.source} <LinkIcon className="w-4 h-4" />
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
