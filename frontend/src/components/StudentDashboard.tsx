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
import { getCareerDNA } from '../api/profileApi';
import AIRecommendationWidget from './AIRecommendationWidget';
import { useNotifications } from '../contexts/NotificationContext';

export default function StudentDashboard() {
  const { currentUser, updateProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, loading, navigate]);

  // Profile Data
  const userName = currentUser?.displayName || currentUser?.name || 'Student';
  const firstName = userName.split(' ')[0];
  const educationLevel = currentUser?.educationLevel || 'Class 12th';
  const streamPreference = currentUser?.stream || currentUser?.streamPreference || 'Science (PCM)';
  const rawInterests = currentUser?.interests;
  const interests = Array.isArray(rawInterests) && rawInterests.length > 0 
    ? rawInterests 
    : (typeof rawInterests === 'string' && rawInterests !== '' ? (rawInterests as string).split(',') : []);
  
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
  const [nextActions, setNextActions] = useState<any[]>([]);
  const [deadlines, setDeadlines] = useState<any[]>([]);
  
  const { notifications } = useNotifications();
  
  const [careerDNA, setCareerDNA] = useState<any>(currentUser?.settings?.careerDNA || null);
  const [generatingDNA, setGeneratingDNA] = useState(false);
  
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

      // Fetch Next Best Actions
      api.get('/api/profile/next-best-actions')
      .then(res => {
        if (Array.isArray(res.data)) setNextActions(res.data);
      })
      .catch(console.error);

      // Fetch upcoming Deadlines
      api.get('/api/deadlines')
      .then(res => {
        if (res.data?.success && Array.isArray(res.data.deadlines)) {
          setDeadlines(res.data.deadlines);
        }
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
                     <div className={`text-sm font-bold ${currentUser?.preferredLocation?.[0] ? 'text-gray-900' : 'text-gray-500 italic'}`}>
                       {currentUser?.preferredLocation?.[0] || 'Not selected'}
                     </div>
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
                     <div className={`text-sm font-bold ${currentUser?.preferredCareer?.[0] ? 'text-gray-900' : 'text-gray-500 italic'}`}>
                       {currentUser?.preferredCareer?.[0] || 'Not selected'}
                     </div>
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
                   <CheckCircle className="w-4 h-4 text-emerald-500" /> AI Next Best Actions
                 </h2>
               </div>
               <div className="p-4 flex-1 space-y-4">
                 
                 {nextActions.length === 0 ? (
                   <div className="text-xs text-gray-500 italic">No urgent actions pending.</div>
                 ) : (
                   nextActions.map((action, index) => (
                     <div key={action.id} className={`flex gap-3 ${index === 0 ? 'bg-blue-50/50 p-3 rounded-xl border border-blue-100' : 'hover:bg-gray-50 p-1 -ml-1 rounded cursor-pointer'} relative group transition-colors`} onClick={() => navigate(action.actionUrl)}>
                       <div className={`absolute left-3 top-0 bottom-0 w-0.5 ${index === 0 ? 'bg-blue-200' : 'bg-gray-100'} -z-10`}></div>
                       <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 border-white transition-colors ${index === 0 ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                         <span className="text-[10px] font-bold">{index + 1}</span>
                       </div>
                       <div>
                         <div className={`text-xs font-black ${index === 0 ? 'text-blue-900' : 'text-gray-600 group-hover:text-blue-700'}`}>{action.title}</div>
                         {index === 0 && (
                           <>
                             <p className="text-[10px] font-medium text-blue-700/80 mt-1 mb-2 leading-tight">{action.description}</p>
                             <button onClick={(e) => { e.stopPropagation(); navigate(action.actionUrl); }} className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                               {action.actionText} →
                             </button>
                           </>
                         )}
                       </div>
                     </div>
                   ))
                 )}

               </div>
            </div>

            {/* Recommended For You (8 cols) */}
            <div className="lg:col-span-8 flex flex-col">
               <AIRecommendationWidget />
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

            {/* Career DNA Card (1 col) */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="flex items-start gap-3 mb-3 relative z-10">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0"><Target className="w-5 h-5 text-purple-600"/></div>
                 <div>
                   <div className="text-[10px] font-black text-purple-600 uppercase tracking-wider mb-0.5">AI Analysis</div>
                   <h3 className="text-sm font-black text-gray-900 leading-tight">Your Career DNA</h3>
                 </div>
               </div>
               
               {careerDNA && careerDNA.personalityArchetype ? (
                 <div className="relative z-10 text-xs text-gray-800 space-y-3 mb-auto">
                   <div><span className="font-bold text-purple-700">Archetype:</span> {careerDNA.personalityArchetype}</div>
                   <div><span className="font-bold text-purple-700">Strengths:</span> {careerDNA.coreStrengths?.join(', ')}</div>
                   <div><span className="font-bold text-purple-700">Learning Style:</span> {careerDNA.learningStyle}</div>
                   <div><span className="font-bold text-purple-700">Sectors:</span> {careerDNA.recommendedSectors?.join(', ')}</div>
                 </div>
               ) : (
                 <p className="text-[10px] font-medium text-gray-600 leading-relaxed mb-auto relative z-10">
                   Generate your AI-powered Career DNA based on your profile to get personalized sector recommendations and insights.
                 </p>
               )}
               
               {!(careerDNA && careerDNA.personalityArchetype) && (
                 <button 
                   onClick={async () => {
                     setGeneratingDNA(true);
                     try {
                       const dna = await getCareerDNA();
                       setCareerDNA(dna);
                       if (updateProfile) {
                         updateProfile({ settings: { ...currentUser?.settings, careerDNA: dna } });
                       }
                     } catch(err) {
                       console.error(err);
                       alert('Failed to generate Career DNA: ' + (err instanceof Error ? err.message : String(err)));
                     } finally {
                       setGeneratingDNA(false);
                     }
                   }}
                   disabled={generatingDNA}
                   className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold py-2.5 rounded-lg transition-colors shadow-sm relative z-10 flex justify-center items-center gap-1.5 disabled:opacity-50"
                 >
                   {generatingDNA ? 'Analyzing Profile...' : 'Generate Career DNA'} <ArrowRight className="w-3.5 h-3.5"/>
                 </button>
               )}
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
              {deadlines.length === 0 ? (
                <div className="text-xs text-gray-500 italic">No upcoming deadlines found.</div>
              ) : (
                deadlines.slice(0, 4).map((dl, idx) => {
                  const dDate = new Date(dl.deadlineDate);
                  const month = dDate.toLocaleString('default', { month: 'short' });
                  const dateNum = dDate.getDate();
                  
                  // Calculate days left
                  const diffTime = Math.abs(dDate.getTime() - new Date().getTime());
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  
                  // Color coding based on urgency
                  let colorTheme = 'blue';
                  if (diffDays <= 7) colorTheme = 'rose';
                  else if (diffDays <= 30) colorTheme = 'orange';
                  else colorTheme = 'emerald';
                  
                  const bgClass = `bg-${colorTheme}-50`;
                  const borderClass = `border-${colorTheme}-100`;
                  const textClass = `text-${colorTheme}-700`;
                  
                  return (
                    <div key={idx} className="flex gap-3 cursor-pointer group" onClick={() => dl.sourceUrl && window.open(dl.sourceUrl, '_blank')}>
                      <div className={`w-10 h-10 flex flex-col items-center justify-center ${bgClass} ${textClass} rounded-lg shrink-0 border ${borderClass}`}>
                        <span className="text-[8px] font-black uppercase">{month}</span>
                        <span className="text-sm font-black leading-none mt-0.5">{dateNum}</span>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="text-[11px] font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{dl.title}</div>
                        <div className="text-[9px] font-medium text-gray-500 truncate">{dl.description || 'Deadline'}</div>
                      </div>
                      <div className={`text-[9px] font-bold ${textClass} bg-white border ${borderClass} px-1.5 py-0.5 rounded flex items-center h-fit mt-1`}>
                        {diffDays} days left
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900 text-sm">Recent Notifications</h3>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">View All →</button>
            </div>
            <div className="space-y-4">
               {notifications.length === 0 ? (
                 <div className="text-xs text-gray-500 italic">No recent notifications.</div>
               ) : (
                 notifications.slice(0, 4).map((notif, idx) => (
                   <div key={notif._id || idx} className="flex gap-3 cursor-pointer group" onClick={() => notif.link && navigate(notif.link)}>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'system' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}`}>
                       {notif.type === 'system' ? <ShieldAlert className="w-4 h-4"/> : <Building2 className="w-4 h-4"/>}
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="text-[11px] font-bold text-gray-900 leading-tight truncate group-hover:text-blue-600 transition-colors">{notif.title}</div>
                       <div className="text-[9px] text-gray-500 font-medium truncate mt-0.5">{notif.message}</div>
                     </div>
                     <div className="text-[9px] font-medium text-gray-400 shrink-0">
                       {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </div>
                   </div>
                 ))
               )}
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
