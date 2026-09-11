import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, BookOpen, Map, Award, ArrowRight, User, Bell, ChevronRight, 
  CheckCircle, Briefcase, Star, Clock, GraduationCap, Compass, MapPin, 
  Heart, Bookmark, CalendarDays, Zap, ShieldAlert, Target, PlayCircle, FileText
} from 'lucide-react';
import { calculateProfileCompletion, calculateMatchScore, getEducationJourney } from '../lib/dashboardUtils';
import { getExams } from '../api/examApi';
import { StructuredExam } from '../types';
import { fetchColleges, College } from '../api/collegeApi';
import { getSavedJobs } from '../api/savedJobs';
import { getSavedPathways } from '../api/pathwayApi';
import api from '../api/axios';

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Profile Data
  const userName = currentUser?.displayName || currentUser?.name || 'Student';
  const firstName = userName.split(' ')[0];
  const educationLevel = currentUser?.educationLevel || 'Class 12th';
  const streamPreference = currentUser?.streamPreference || 'Science (PCM)';
  const rawInterests = currentUser?.interests;
  const interests = Array.isArray(rawInterests) ? rawInterests : (typeof rawInterests === 'string' ? (rawInterests as string).split(',') : ['Technology', 'AI']);
  
  const { percentage: profilePercentage } = calculateProfileCompletion(currentUser);
  const journeySteps = getEducationJourney(currentUser);

  // States
  const [activeTab, setActiveTab] = useState('All');
  const [colleges, setColleges] = useState<College[]>([]);
  const [upcomingExams, setUpcomingExams] = useState<StructuredExam[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>({
    collegesViewed: 0,
    coursesExplored: 0,
    careersExplored: 0,
    totalSaved: 0,
    details: {}
  });
  
  useEffect(() => {
    // Fetch some basic recommendations/deadlines
    fetchColleges({ limit: 4 }).then(res => {
      const data = res.data || res || [];
      setColleges(data.slice(0, 3));
    }).catch(console.error);

    getExams({ limit: 4 }).then(res => {
      const items = res.items || [];
      setUpcomingExams(items.slice(0, 3));
    }).catch(console.error);
    
    // Fetch actual saved counts and stats
    const token = localStorage.getItem('uthink_token');
    if (token) {
      api.get('/api/profile/dashboard-stats')
      .then(res => {
        if (!res.data.error) setDashboardStats(res.data);
      })
      .catch(console.error);

      // Fetch user documents
      api.get('/api/documents')
      .then(res => {
        if (Array.isArray(res.data)) setDocuments(res.data);
      })
      .catch(console.error);
    }
  }, []);

  return (
    <div className="font-sans pb-10 min-h-screen bg-[#F7F9FC]">
      
      {/* 3-Column Dashboard Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative">
        
        {/* ======================= */}
        {/* LEFT MAIN CONTENT (9 cols) */}
        {/* ======================= */}
        <div className="xl:col-span-9 space-y-6 min-w-0">
          
          {/* TOP ROW: Welcome & Profile Completion */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Welcome Card (2 cols) */}
            <div className="md:col-span-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 shadow-sm border border-blue-200 relative overflow-hidden">
               {/* Decorative background element */}
               <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-200/50 to-transparent pointer-events-none"></div>
               
               <div className="relative z-10">
                 <h1 className="text-2xl font-black text-gray-900 mb-2 flex items-center gap-2">
                   Welcome back, {firstName}! 👋
                 </h1>
                 <p className="text-sm font-medium text-gray-700 mb-6">
                   You're currently in <span className="font-bold">{educationLevel} ({streamPreference})</span>. Here's your personalized overview for today.
                 </p>

                 <div className="flex flex-wrap gap-4 md:gap-8">
                   <div>
                     <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase mb-1">
                       <MapPin className="w-3.5 h-3.5 text-blue-500" /> Location
                     </div>
                     <div className="text-sm font-bold text-gray-900">Karnataka</div>
                   </div>
                   <div>
                     <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase mb-1">
                       <Heart className="w-3.5 h-3.5 text-rose-500" /> Interests
                     </div>
                     <div className="text-sm font-bold text-gray-900">{interests.length > 0 ? interests.join(', ') : 'Not selected'}</div>
                   </div>
                   <div>
                     <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase mb-1">
                       <Target className="w-3.5 h-3.5 text-emerald-500" /> Career Goal
                     </div>
                     <div className="text-sm font-bold text-gray-500 italic">Not selected</div>
                   </div>
                   <div className="ml-auto flex items-center">
                     <button onClick={() => navigate('/settings')} className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                       Edit Profile <ArrowRight className="w-3 h-3" />
                     </button>
                   </div>
                 </div>
               </div>
            </div>

            {/* Profile Completion Card (1 col) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center relative">
               <div className="absolute top-4 right-4"><User className="w-4 h-4 text-gray-300"/></div>
               <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                   <path className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                   <path className="text-blue-600" strokeDasharray={`${profilePercentage}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center text-lg font-black text-blue-600">
                   {profilePercentage}%
                 </div>
               </div>
               <h3 className="text-sm font-black text-gray-900 mb-1">Complete Your Profile</h3>
               <p className="text-[10px] text-gray-500 font-medium mb-3 leading-tight">
                 Add your academic details, interests and preferences to get better recommendations.
               </p>
               <button onClick={() => navigate('/settings')} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold py-2 rounded-lg transition-colors shadow-sm">
                 Continue Profile →
               </button>
            </div>
          </div>

          {/* USER ACTIVITY STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { label: 'Colleges Viewed', value: dashboardStats.collegesViewed || 0, subtext: 'In last 30 days', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
               { label: 'Courses Explored', value: dashboardStats.coursesExplored || 0, subtext: 'In last 30 days', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
               { label: 'Careers Explored', value: dashboardStats.careersExplored || 0, subtext: 'In last 30 days', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
               { label: 'Items Saved', value: dashboardStats.totalSaved || 0, subtext: 'Across all sections', icon: Bookmark, color: 'text-orange-500', bg: 'bg-orange-50' }
             ].map((stat, i) => (
               <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center hover:-translate-y-0.5 transition-transform cursor-pointer" onClick={() => navigate(stat.label.includes('Saved') ? '/saved-jobs' : (stat.label.includes('Colleges') ? '/colleges' : '/pathways/after-10th'))}>
                 <div className="flex items-center gap-3 mb-2">
                   <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}><stat.icon className="w-4 h-4"/></div>
                   <div className="text-2xl font-black text-gray-900 leading-none">{stat.value}</div>
                 </div>
                 <div className="text-[11px] font-bold text-gray-700">{stat.label}</div>
                 <div className="text-[9px] font-semibold text-gray-400 mt-0.5">{stat.subtext}</div>
               </div>
             ))}
          </div>

          {/* YOUR NEXT STEPS & RECOMMENDED FOR YOU (Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Your Next Steps (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
               <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                 <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
                   <CheckCircle className="w-4 h-4 text-emerald-500" /> Your Next Steps
                 </h2>
               </div>
               <div className="p-4 flex-1 space-y-4">
                 
                 {/* Completed Step */}
                 <div className="flex gap-3 opacity-60">
                   <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle className="w-3.5 h-3.5" /></div>
                   <div className="text-xs font-bold text-gray-900 mt-1 line-through decoration-gray-400">Complete your profile</div>
                 </div>
                 
                 {/* Current Priority Step */}
                 <div className="flex gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100 relative">
                   <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-blue-200 -z-10"></div>
                   <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 border-2 border-white shadow-sm"><span className="text-[10px] font-bold">2</span></div>
                   <div>
                     <div className="text-xs font-black text-blue-900">Take Aptitude Assessment</div>
                     <p className="text-[10px] font-medium text-blue-700/80 mt-1 mb-2 leading-tight">Discover your strengths and get personalized career suggestions.</p>
                     <button onClick={() => navigate('/quiz')} className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">Start Assessment →</button>
                   </div>
                 </div>

                 {/* Upcoming Steps */}
                 {[
                   { id: 3, label: 'Select your preferred pathway', path: '/pathways/after-10th' },
                   { id: 4, label: 'Explore suitable courses', path: '/courses' },
                   { id: 5, label: 'Shortlist colleges', path: '/colleges' },
                   { id: 6, label: 'Check upcoming exams', path: '/exams' }
                 ].map(step => (
                   <div key={step.id} className="flex gap-3 relative cursor-pointer hover:bg-gray-50 p-1 -ml-1 rounded transition-colors group" onClick={() => navigate(step.path)}>
                     <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100 -z-10"></div>
                     <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center shrink-0 border-2 border-white transition-colors"><span className="text-[10px] font-bold">{step.id}</span></div>
                     <div className="text-xs font-bold text-gray-600 mt-1 group-hover:text-blue-700 transition-colors">{step.label}</div>
                   </div>
                 ))}

               </div>
            </div>

            {/* Recommended For You (8 cols) */}
            <div className="lg:col-span-8 flex flex-col">
               <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                 <h2 className="text-lg font-black text-gray-900">Recommended For You</h2>
                 <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                   {['All', 'Pathways', 'Courses', 'Careers', 'Colleges'].map(tab => (
                     <button 
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                     >
                       {tab}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                 
                 {/* Recommendation 1: Pathway */}
                 {(activeTab === 'All' || activeTab === 'Pathways') && (
                 <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-blue-300 transition-colors flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Map className="w-5 h-5"/></div>
                      <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Pathway</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 leading-tight mb-1">Engineering & Technology</h3>
                    <div className="text-xs font-bold text-emerald-600 mb-3">Match: 92%</div>
                    <div className="text-[10px] font-medium text-gray-500 leading-snug mb-auto">Based on your Science stream, maths interest and aptitude results.</div>
                    <button onClick={() => navigate('/pathways/after-10th/diploma')} className="mt-4 w-full text-center border border-gray-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 text-[10px] font-bold py-2 rounded-lg transition-colors text-gray-700">View Pathway →</button>
                 </div>
                 )}

                 {/* Recommendation 2: Course */}
                 {(activeTab === 'All' || activeTab === 'Courses') && (
                 <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-emerald-300 transition-colors flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><BookOpen className="w-5 h-5"/></div>
                      <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Course</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 leading-tight mb-1">B.Tech Computer Science</h3>
                    <div className="text-xs font-bold text-emerald-600 mb-3">Match: 89%</div>
                    <ul className="text-[10px] font-medium text-gray-500 leading-snug mb-auto space-y-1 ml-1">
                      <li className="flex items-start gap-1"><span className="text-emerald-500 font-bold">•</span> Your profile: Eligible</li>
                      <li className="flex items-start gap-1"><span className="text-emerald-500 font-bold">•</span> High career opportunities</li>
                      <li className="flex items-start gap-1"><span className="text-emerald-500 font-bold">•</span> Matches your interests</li>
                    </ul>
                    <button onClick={() => navigate('/courses')} className="mt-4 w-full text-center border border-gray-200 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 text-[10px] font-bold py-2 rounded-lg transition-colors text-gray-700">View Course →</button>
                 </div>
                 )}

                 {/* Recommendation 3: Career */}
                 {(activeTab === 'All' || activeTab === 'Careers') && (
                 <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-purple-300 transition-colors flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"><Briefcase className="w-5 h-5"/></div>
                      <span className="text-[9px] font-black uppercase text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">Career</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 leading-tight mb-1">Software Developer</h3>
                    <div className="text-xs font-bold text-emerald-600 mb-3">Match: 91%</div>
                    <ul className="text-[10px] font-medium text-gray-500 leading-snug mb-auto space-y-1 ml-1">
                      <li className="flex items-start gap-1"><span className="text-emerald-500 font-bold">•</span> High demand</li>
                      <li className="flex items-start gap-1"><span className="text-emerald-500 font-bold">•</span> Good salary potential</li>
                      <li className="flex items-start gap-1"><span className="text-emerald-500 font-bold">•</span> Matches your aptitude</li>
                    </ul>
                    <button onClick={() => navigate('/jobs')} className="mt-4 w-full text-center border border-gray-200 hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600 text-[10px] font-bold py-2 rounded-lg transition-colors text-gray-700">Explore Career →</button>
                 </div>
                 )}

                 {/* Recommendation 4: College (if filtered to Colleges) */}
                 {(activeTab === 'Colleges') && colleges.slice(0,1).map((college, idx) => (
                   <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:border-blue-300 transition-colors flex flex-col">
                     <div className="h-24 bg-gray-200 w-full overflow-hidden relative">
                       {college.image ? <img src={college.image} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-blue-100 flex items-center justify-center"><Building2 className="w-8 h-8 text-blue-300"/></div>}
                       <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[9px] font-black uppercase text-blue-600 px-2 py-0.5 rounded shadow-sm">College</div>
                     </div>
                     <div className="p-4 flex flex-col flex-1">
                       <h3 className="font-bold text-sm text-gray-900 leading-tight truncate">{college.name}</h3>
                       <div className="text-[9px] font-medium text-gray-500 mt-1 flex items-center gap-1 truncate"><MapPin className="w-3 h-3 text-red-500 shrink-0"/> {college.city}, {college.state}</div>
                       <div className="flex gap-1 mt-2 mb-3">
                         {college.categories?.[0] && <span className="text-[8px] font-bold bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100">{college.categories[0]}</span>}
                         {college.type && <span className="text-[8px] font-bold bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded border border-rose-100">{college.type}</span>}
                       </div>
                       <div className="text-xs font-bold text-emerald-600 mb-auto">Match: {calculateMatchScore(college.categories || [], currentUser)}%</div>
                       <div className="flex gap-2 mt-4">
                         <button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 text-[10px] font-bold py-2 rounded-lg transition-colors">View Details →</button>
                         <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"><Heart className="w-4 h-4"/></button>
                       </div>
                     </div>
                   </div>
                 ))}

               </div>
            </div>
          </div>

          {/* EDUCATION JOURNEY */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-hidden">
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-sm font-black text-gray-900">Your Education Journey</h2>
               <button className="text-xs font-bold text-blue-600 hover:underline">View Full Journey →</button>
             </div>
             
             <div className="relative">
               {/* Connecting Line */}
               <div className="absolute top-6 left-8 right-8 h-0.5 bg-gray-100 -z-10"></div>
               
               <div className="flex justify-between items-start text-center">
                 {journeySteps.map((step, idx) => {
                   const isCompleted = step.status === 'completed';
                   const isCurrent = step.status === 'current';
                   const isNext = step.status === 'next';
                   
                   let iconBg = 'bg-gray-100 text-gray-400 border-gray-200';
                   let textColor = 'text-gray-400';
                   let subText = 'Upcoming';
                   
                   if (isCompleted) {
                     iconBg = 'bg-emerald-500 text-white border-emerald-500';
                     textColor = 'text-emerald-700';
                     subText = 'Completed';
                   } else if (isCurrent || isNext) {
                     iconBg = 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-50';
                     textColor = 'text-blue-900';
                     subText = isCurrent ? 'Current Stage' : 'Next Step';
                   }

                   // Map index to a specific icon
                   const icons = [CheckCircle, Compass, Award, BookOpen, Building2, Briefcase, Target];
                   const StepIcon = icons[idx] || CheckCircle;

                   return (
                     <div key={idx} className="flex flex-col items-center group cursor-pointer">
                       <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-white mb-2 transition-transform group-hover:scale-110 relative z-10 ${isCompleted || isCurrent || isNext ? 'border-transparent ' + iconBg : 'border-gray-200 text-gray-400'}`}>
                         <StepIcon className="w-5 h-5" />
                       </div>
                       <div className={`text-[11px] font-black mt-1 ${isCurrent || isNext ? 'text-gray-900' : 'text-gray-600'}`}>{step.stage}</div>
                       <div className={`text-[9px] font-bold mt-0.5 ${textColor}`}>{subText}</div>
                     </div>
                   );
                 })}
               </div>
             </div>
          </div>

          {/* BOTTOM ROW: Saved Items, Recent Activity, Aptitude CTA, Academic Documents */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Your Saved Items (1 col) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-sm font-black text-gray-900">Your Saved Items</h2>
                 <button className="text-[10px] font-bold text-blue-600 hover:underline">View All →</button>
               </div>
               <div className="grid grid-cols-3 gap-3">
                 {[
                   { label: 'Colleges', count: dashboardStats.details?.colleges || 0, icon: Building2, color: 'text-orange-500', bg: 'bg-orange-50' },
                   { label: 'Courses', count: dashboardStats.details?.courses || 0, icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                   { label: 'Careers', count: dashboardStats.details?.careers || 0, icon: Briefcase, color: 'text-purple-500', bg: 'bg-purple-50' },
                   { label: 'Exam', count: dashboardStats.details?.exams || 0, icon: ShieldAlert, color: 'text-blue-500', bg: 'bg-blue-50' },
                   { label: 'Jobs', count: dashboardStats.details?.jobs || 0, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                 ].map((item, idx) => (
                   <div key={idx} className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors text-center">
                     <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center mb-1`}><item.icon className="w-4 h-4"/></div>
                     <div className="text-sm font-black text-gray-900">{item.count}</div>
                     <div className="text-[9px] font-bold text-gray-500">{item.label}</div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Recent Activity (1 col) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col">
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-sm font-black text-gray-900">Recent Activity</h2>
                 <button className="text-[10px] font-bold text-blue-600 hover:underline">View All →</button>
               </div>
               <div className="space-y-4 flex-1">
                 {[
                   { action: 'Viewed B.Tech Computer Science', time: '2 hours ago', icon: BookOpen, color: 'text-emerald-500' },
                   { action: 'Saved RV College of Engineering', time: '4 hours ago', icon: Bookmark, color: 'text-orange-500' },
                   { action: 'Explored Engineering pathway', time: 'Yesterday', icon: Compass, color: 'text-blue-500' },
                   { action: 'Viewed Software Developer career', time: 'Yesterday', icon: Briefcase, color: 'text-purple-500' }
                 ].map((activity, idx) => (
                   <div key={idx} className="flex items-start gap-3">
                     <div className={`mt-0.5 ${activity.color}`}><activity.icon className="w-4 h-4"/></div>
                     <div>
                       <div className="text-[11px] font-bold text-gray-700">{activity.action}</div>
                       <div className="text-[9px] font-medium text-gray-400">{activity.time}</div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Aptitude Assessment (1 col) */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="flex items-start gap-3 mb-3 relative z-10">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0"><Target className="w-5 h-5 text-purple-600"/></div>
                 <div>
                   <div className="text-[10px] font-black text-purple-600 uppercase tracking-wider mb-0.5">Aptitude Assessment</div>
                   <h3 className="text-sm font-black text-gray-900 leading-tight">Discover Your Strengths</h3>
                 </div>
               </div>
               
               <p className="text-[10px] font-medium text-gray-600 leading-relaxed mb-auto relative z-10">
                 You haven't taken the aptitude assessment yet. Understand your interests, skills and career preferences.
               </p>
               
               <button onClick={() => navigate('/quiz')} className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold py-2.5 rounded-lg transition-colors shadow-sm relative z-10 flex justify-center items-center gap-1.5">
                 Take Aptitude Test <ArrowRight className="w-3.5 h-3.5"/>
               </button>
            </div>

            {/* Academic Documents (1 col) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden">
               <div className="flex items-start justify-between mb-3">
                 <div className="flex items-center gap-2">
                   <FileText className="w-5 h-5 text-emerald-600" />
                   <h3 className="text-sm font-black text-gray-900">Academic Documents</h3>
                 </div>
               </div>
               
               {documents.length === 0 ? (
                 <div className="flex flex-col h-full justify-between">
                   <p className="text-[11px] font-medium text-gray-600 leading-relaxed mb-4">
                     Upload your marksheet to automatically build your academic profile.
                   </p>
                   <button onClick={() => navigate('/documents/analyze')} className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold py-2.5 rounded-lg transition-colors shadow-sm">
                     Upload Document
                   </button>
                 </div>
               ) : (
                 <div className="flex flex-col h-full justify-between">
                   <div className="space-y-3 mb-4">
                     {documents.slice(0, 2).map((item, idx) => {
                       const doc = item.document;
                       const analysis = item.analysis;
                       const isConfirmed = analysis?.analysisStatus === 'CONFIRMED';
                       const hasAnalysis = !!analysis;
                       
                       return (
                         <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                           <div className="flex justify-between items-start mb-1">
                             <div className="font-bold text-xs text-gray-900 truncate pr-2">
                               {analysis?.documentType ? analysis.documentType.replace('_', ' ') : doc.fileName}
                             </div>
                             {isConfirmed && analysis.percentage && (
                               <div className="text-xs font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                 {analysis.percentage}%
                               </div>
                             )}
                           </div>
                           
                           <div className="flex items-center gap-1 text-[10px] font-bold">
                             {isConfirmed ? (
                               <span className="text-emerald-600 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Academic profile updated</span>
                             ) : hasAnalysis ? (
                               <span className="text-orange-600 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Document analyzed - Review pending</span>
                             ) : (
                               <span className="text-blue-600 flex items-center gap-1"><Clock className="w-3 h-3"/> Analysis pending</span>
                             )}
                           </div>
                         </div>
                       );
                     })}
                   </div>
                   
                   <div className="flex gap-2">
                     <button onClick={() => navigate('/documents/analyze')} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold py-2 rounded-lg transition-colors shadow-sm text-center">
                       View Analysis
                     </button>
                     <button onClick={() => navigate('/documents/analyze')} className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[10px] font-bold py-2 rounded-lg transition-colors shadow-sm text-center">
                       Upload Another
                     </button>
                   </div>
                 </div>
               )}
            </div>

          </div>

        </div>

        {/* ======================= */}
        {/* RIGHT RAIL CONTEXT (3 cols) */}
        {/* ======================= */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          
          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900 text-sm">Quick Actions</h3>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">See All →</button>
            </div>
            <div className="space-y-1">
               {[
                 { title: 'College Finder', desc: 'Search and explore colleges', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50', path: '/colleges' },
                 { title: 'Compare Colleges', desc: 'Compare shortlisted colleges', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50', path: '/colleges' },
                 { title: 'Eligibility Checker', desc: 'Check your eligibility', icon: ShieldAlert, color: 'text-orange-600', bg: 'bg-orange-50', path: '/exams' },
                 { title: 'Career Explorer', desc: 'Explore careers for you', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/jobs' },
                 { title: 'Academic Documents', desc: 'Upload & analyze marksheets', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/documents/analyze' },
                 { title: 'Aptitude Test', desc: 'Discover your strengths', icon: Target, color: 'text-rose-600', bg: 'bg-rose-50', path: '/quiz' },
                 { title: 'Download Report', desc: 'Get your personalized report', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', path: '/settings' }
               ].map((action, idx) => (
                 <button key={idx} onClick={() => navigate(action.path)} className="w-full p-2 flex items-center justify-between hover:bg-gray-50 rounded-xl transition-all group text-left">
                   <div className="flex items-center gap-3">
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${action.bg} ${action.color}`}><action.icon className="w-4 h-4"/></div>
                     <div>
                       <div className="font-bold text-[11px] text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</div>
                       <div className="text-[9px] text-gray-500 font-medium">{action.desc}</div>
                     </div>
                   </div>
                   <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors shrink-0" />
                 </button>
               ))}
            </div>
          </div>

          {/* Important Deadlines */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900 text-sm">Important Deadlines</h3>
              <button onClick={() => navigate('/exams')} className="text-[10px] font-bold text-blue-600 hover:underline">View All →</button>
            </div>
            <div className="space-y-4">
              {/* Manual layout for dates to match design closely */}
              <div className="flex gap-3">
                <div className="w-10 h-10 flex flex-col items-center justify-center bg-rose-50 text-rose-700 rounded-lg shrink-0 border border-rose-100">
                  <span className="text-[8px] font-black uppercase">Apr</span>
                  <span className="text-sm font-black leading-none mt-0.5">25</span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="text-[11px] font-bold text-gray-900 truncate">JEE Main 2025</div>
                  <div className="text-[9px] font-medium text-gray-500 truncate">Application Deadline</div>
                </div>
                <div className="text-[9px] font-bold text-rose-600 bg-white border border-rose-200 px-1.5 py-0.5 rounded flex items-center h-fit mt-1">
                  12 days left
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg shrink-0 border border-blue-100">
                  <span className="text-[8px] font-black uppercase">May</span>
                  <span className="text-sm font-black leading-none mt-0.5">10</span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="text-[11px] font-bold text-gray-900 truncate">KCET 2025</div>
                  <div className="text-[9px] font-medium text-gray-500 truncate">Registration Deadline</div>
                </div>
                <div className="text-[9px] font-bold text-blue-600 bg-white border border-blue-200 px-1.5 py-0.5 rounded flex items-center h-fit mt-1">
                  27 days left
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 flex flex-col items-center justify-center bg-emerald-50 text-emerald-700 rounded-lg shrink-0 border border-emerald-100">
                  <span className="text-[8px] font-black uppercase">May</span>
                  <span className="text-sm font-black leading-none mt-0.5">20</span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="text-[11px] font-bold text-gray-900 truncate">COMEDK UGET 2025</div>
                  <div className="text-[9px] font-medium text-gray-500 truncate">Application Deadline</div>
                </div>
                <div className="text-[9px] font-bold text-emerald-600 bg-white border border-emerald-200 px-1.5 py-0.5 rounded flex items-center h-fit mt-1">
                  37 days left
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 flex flex-col items-center justify-center bg-orange-50 text-orange-700 rounded-lg shrink-0 border border-orange-100">
                  <span className="text-[8px] font-black uppercase">Jun</span>
                  <span className="text-sm font-black leading-none mt-0.5">05</span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="text-[11px] font-bold text-gray-900 truncate">CUET UG 2025</div>
                  <div className="text-[9px] font-medium text-gray-500 truncate">Form Correction</div>
                </div>
                <div className="text-[9px] font-bold text-orange-600 bg-white border border-orange-200 px-1.5 py-0.5 rounded flex items-center h-fit mt-1">
                  53 days left
                </div>
              </div>

            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900 text-sm">Recent Notifications</h3>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">View All →</button>
            </div>
            <div className="space-y-4">
               {[
                 { title: 'New college recommendation', desc: 'Based on your profile', time: '10 min ago', icon: Building2, color: 'text-rose-500', bg: 'bg-rose-50' },
                 { title: 'JEE Main application reminder', desc: 'Deadline in 12 days', time: '2 hours ago', icon: CalendarDays, color: 'text-blue-500', bg: 'bg-blue-50' },
                 { title: 'Your aptitude report is ready', desc: 'Check your results', time: 'Yesterday', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                 { title: 'Profile completion reminder', desc: 'Add your location preference', time: 'Yesterday', icon: User, color: 'text-orange-500', bg: 'bg-orange-50' }
               ].map((notif, idx) => (
                 <div key={idx} className="flex gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                     <notif.icon className="w-4 h-4"/>
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="text-[11px] font-bold text-gray-900 leading-tight truncate">{notif.title}</div>
                     <div className="text-[9px] text-gray-500 font-medium truncate mt-0.5">{notif.desc}</div>
                   </div>
                   <div className="text-[9px] font-medium text-gray-400 shrink-0">{notif.time}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Guidance Card */}
          <div className="bg-[#0B1F44] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-center min-h-[140px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-full pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 shrink-0">
                 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v1"/><path d="M12 7a5 5 0 0 0-5 5c0 2 1.5 3 2 4.5V18h6v-1.5c.5-1.5 2-2.5 2-4.5a5 5 0 0 0-5-5Z"/></svg>
               </div>
               <div>
                 <h3 className="font-serif italic text-lg font-bold text-white mb-1 leading-tight">
                   Your Future<br/>Our Guidance
                 </h3>
                 <p className="text-[9px] text-blue-200 font-medium leading-relaxed">
                   Make informed decisions.<br/>Explore. Learn. Achieve.
                 </p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
