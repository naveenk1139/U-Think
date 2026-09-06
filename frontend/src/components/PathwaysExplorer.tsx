import React, { useState, useEffect } from 'react';
import { 
  Search, GraduationCap, ArrowRight, BookOpen, ChevronRight, Briefcase, Filter, Target, 
  Building2, Users, Target as TargetIcon, Zap, Map, ShieldAlert, Heart, CheckCircle, 
  Wrench, BriefcaseMedical, Monitor, Settings, Palette, Plus, Lightbulb, Leaf, GitBranch
} from 'lucide-react';
import { getPathwayTree, getPathwayStats, EducationLevelData, PathwayStats, PathwayData } from '../api/pathwayApi';
import { getExams } from '../api/examApi';
import { StructuredExam } from '../types';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';

export default function PathwaysExplorer() {
  const [educationLevels, setEducationLevels] = useState<EducationLevelData[]>([]);
  const [stats, setStats] = useState<PathwayStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { levelSlug } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingExams, setUpcomingExams] = useState<StructuredExam[]>([]);
  
  const activeLevelSlug = levelSlug || searchParams.get('level') || 'after-10th';

  useEffect(() => {
    setLoading(true);
    getPathwayStats().then(setStats).catch(console.error);
    
    getPathwayTree(activeLevelSlug).then(data => {
      setEducationLevels(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });

    getExams({ limit: 4 }).then(res => {
      setUpcomingExams(res.items?.slice(0, 4) || []);
    }).catch(console.error);
  }, [activeLevelSlug]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getActiveLevelData = () => {
    return educationLevels.find(l => l.slug === activeLevelSlug) || educationLevels[0];
  };
  
  const levelData = getActiveLevelData();
  const pathways = levelData?.pathways || [];

  return (
    <div className="font-sans pb-10 min-h-screen bg-[#F7F9FC]">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative">
        
        {/* ======================= */}
        {/* LEFT MAIN CONTENT (9 cols) */}
        {/* ======================= */}
        <div className="xl:col-span-9 space-y-6 min-w-0">
          
          {/* HERO SECTION */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl overflow-hidden shadow-sm border border-blue-200 relative flex flex-col lg:flex-row min-h-[320px]">
            {/* Left Content */}
            <div className="p-8 md:p-10 flex-1 relative z-10 flex flex-col justify-center">
              <span className="bg-blue-600 text-white text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full w-max mb-4 shadow-sm">
                Discover Your Possibilities
              </span>
              
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3">
                Explore <span className="text-blue-600">Pathways & Streams</span>
              </h1>
              
              <p className="text-sm font-medium text-gray-600 mb-6 max-w-lg">
                Find the right education pathway, compare streams and discover courses and careers that match your interests, goals and future plans.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-xl mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search pathways, streams, courses, branches..."
                  className="w-full pl-11 pr-32 py-3.5 rounded-xl border border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                  Search
                </button>
              </form>

              {/* Quick Filter Badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Explore After 10th', icon: BookOpen, color: 'text-blue-600', path: '/pathways/after-10th' },
                  { label: 'Explore After 12th', icon: BookOpen, color: 'text-emerald-600', path: '/pathways/after-12th' },
                  { label: 'Explore Degrees', icon: GraduationCap, color: 'text-purple-600', path: '/pathways/undergraduate' },
                  { label: 'Explore Careers', icon: Briefcase, color: 'text-orange-600', path: '/jobs' }
                ].map((tag, idx) => (
                  <button key={idx} onClick={() => navigate(tag.path)} className="flex items-center gap-1.5 bg-white border border-blue-100 hover:border-blue-300 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 hover:text-blue-600 transition-colors shadow-sm">
                    <tag.icon className={`w-3.5 h-3.5 ${tag.color}`} /> {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side Stats & Image */}
            <div className="w-full lg:w-[300px] relative bg-white/40 p-6 flex flex-col justify-center border-l border-white/50 backdrop-blur-sm">
               <div className="space-y-3">
                 {[
                   { label: 'Pathways', value: stats?.pathways ? `${stats.pathways}` : '58', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
                   { label: 'Streams', value: stats?.streams ? `${stats.streams}` : '243', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                   { label: 'Courses', value: stats?.courses ? `${stats.courses}` : '1,254', icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
                   { label: 'Branches', value: stats?.branches ? `${stats.branches}` : '4,836', icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' }
                 ].map((stat, i) => (
                   <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-white flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                       <stat.icon className="w-5 h-5"/>
                     </div>
                     <div>
                       <div className="text-lg font-black text-gray-900 leading-none">{stat.value}</div>
                       <div className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-wide">{stat.label}</div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* EDUCATION LEVEL TABS */}
          <div className="flex items-center justify-between border-b border-gray-200">
            <div className="flex gap-1 overflow-x-auto hide-scrollbar">
              {[
                { label: 'After 10th', slug: 'after-10th' },
                { label: 'After 12th', slug: 'after-12th' },
                { label: 'Degree', slug: 'undergraduate' },
                { label: 'Postgraduate', slug: 'postgraduate' }
              ].map(tab => (
                <button 
                  key={tab.slug}
                  onClick={() => navigate(`/pathways/${tab.slug}`)}
                  className={`px-6 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeLevelSlug === tab.slug ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button className="hidden md:flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline shrink-0 pl-4">
              Help Me Choose <ArrowRight className="w-3 h-3"/>
            </button>
          </div>

          {/* POPULAR PATHWAYS GRID */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-gray-900">Popular Pathways {levelData?.name || 'After 10th'}</h2>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All Pathways →</button>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-white rounded-2xl border border-gray-200 animate-pulse"></div>)}
              </div>
            ) : pathways.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {pathways.map((pathway: PathwayData, idx) => {
                  const icons = [GraduationCap, Settings, Wrench, BriefcaseMedical, Briefcase, Leaf];
                  const colors = [
                    { t: 'text-blue-600', b: 'bg-blue-50', br: 'border-blue-100', h: 'hover:border-blue-300' },
                    { t: 'text-orange-500', b: 'bg-orange-50', br: 'border-orange-100', h: 'hover:border-orange-300' },
                    { t: 'text-emerald-600', b: 'bg-emerald-50', br: 'border-emerald-100', h: 'hover:border-emerald-300' },
                    { t: 'text-rose-500', b: 'bg-rose-50', br: 'border-rose-100', h: 'hover:border-rose-300' },
                    { t: 'text-purple-600', b: 'bg-purple-50', br: 'border-purple-100', h: 'hover:border-purple-300' },
                    { t: 'text-lime-600', b: 'bg-lime-50', br: 'border-lime-100', h: 'hover:border-lime-300' }
                  ];
                  const c = colors[idx % colors.length];
                  const Icon = icons[idx % icons.length];
                  
                  return (
                    <div key={idx} className={`bg-white border ${c.br} rounded-2xl p-5 shadow-sm ${c.h} transition-colors flex flex-col group cursor-pointer`} onClick={() => navigate(`/pathways/${activeLevelSlug}/${pathway.slug}`)}>
                      <div className={`w-12 h-12 rounded-xl ${c.b} ${c.t} flex items-center justify-center mb-4`}><Icon className="w-6 h-6"/></div>
                      <h3 className="font-bold text-sm text-gray-900 leading-tight mb-1">{pathway.name}</h3>
                      <p className="text-[10px] font-medium text-gray-500 mb-4">{pathway.description || 'Typically 2-4 years'}</p>
                      
                      <div className="space-y-2 mb-6 flex-1">
                        {pathway.streams?.slice(0,3).map((s, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-gray-700">
                            <CheckCircle className={`w-3.5 h-3.5 ${c.t}`} /> {s.name}
                          </div>
                        )) || (
                          <div className="text-[11px] font-medium text-gray-400 italic">No streams listed</div>
                        )}
                        {(pathway.streams?.length || 0) > 3 && (
                          <div className="text-[10px] font-bold text-blue-600 pl-5">+ More streams</div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <button className={`text-[11px] font-bold ${c.t} group-hover:underline flex items-center gap-1`}>
                          Explore {pathway.streams?.length ? 'Streams' : 'Courses'} <ArrowRight className="w-3 h-3"/>
                        </button>
                        <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-gray-200">
                <Target className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-gray-900">No Pathways Found</h3>
                <p className="text-[11px] text-gray-500 mt-1">Try selecting a different education level.</p>
              </div>
            )}
          </div>

          {/* FEATURED STREAMS */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-gray-900">Featured Streams (After 10th → 12th)</h2>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All Streams →</button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
               {[
                 { title: 'Science', combinations: '3 major combinations', desc: 'PCM, PCB, PCMB + more', icon: TargetIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
                 { title: 'Commerce', combinations: '2 major combinations', desc: 'With Math, Without Math', icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
                 { title: 'Arts / Humanities', combinations: 'Multiple subjects', desc: 'History, Economics + more', icon: Palette, color: 'text-purple-600', bg: 'bg-purple-50' }
               ].map((stream, idx) => (
                 <div key={idx} className="snap-start shrink-0 w-[260px] bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-blue-300 transition-colors flex gap-4 cursor-pointer" onClick={() => navigate(`/pathways/${activeLevelSlug}/12th-intermediate/${stream.title.split(' ')[0].toLowerCase()}`)}>
                   <div className={`w-10 h-10 rounded-xl ${stream.bg} ${stream.color} flex items-center justify-center shrink-0`}><stream.icon className="w-5 h-5"/></div>
                   <div>
                     <h3 className="font-bold text-sm text-gray-900 leading-tight mb-1">{stream.title}</h3>
                     <div className="text-[10px] font-bold text-gray-600 mb-0.5">{stream.combinations}</div>
                     <div className="text-[9px] font-medium text-gray-400 mb-3">{stream.desc}</div>
                     <button className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1">View Details <ArrowRight className="w-3 h-3"/></button>
                   </div>
                 </div>
               ))}
               
               {/* Recommended For You */}
               <div className="snap-start shrink-0 w-[300px] bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5 shadow-sm flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm"><TargetIcon className="w-5 h-5"/></div>
                 <div>
                   <h3 className="font-bold text-sm text-gray-900 leading-tight mb-1">Recommended For You</h3>
                   <div className="text-[10px] font-medium text-emerald-800 mb-3">Based on your profile and interests</div>
                   <div className="flex flex-wrap gap-1.5 mb-3">
                     <span className="text-[9px] font-bold bg-white text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">Science</span>
                     <span className="text-[9px] font-bold bg-white text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">Engineering</span>
                     <span className="text-[9px] font-bold bg-white text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">Computer Science</span>
                   </div>
                   <button className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-1" onClick={() => navigate('/dashboard')}>View Recommendations <ArrowRight className="w-3 h-3"/></button>
                 </div>
               </div>
            </div>
          </div>

          {/* EDUCATION JOURNEY */}
          <div className="mt-8 mb-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-hidden">
            <h2 className="text-base font-black text-gray-900 mb-6">Your Education Journey</h2>
            
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-100 z-0"></div>
              
              {[
                { label: '10th', desc: 'Complete 10th', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Choose Pathway', desc: 'Select your path', icon: Map, color: 'text-rose-500', bg: 'bg-rose-50' },
                { label: 'Stream', desc: 'Pick your stream', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Course', desc: 'Choose a course', icon: BookOpen, color: 'text-teal-500', bg: 'bg-teal-50' },
                { label: 'Branch', desc: 'Specialize further', icon: GitBranch, color: 'text-orange-500', bg: 'bg-orange-50' },
                { label: 'Career', desc: 'Explore career options', icon: Briefcase, color: 'text-purple-500', bg: 'bg-purple-50' },
                { label: 'Jobs', desc: 'Find job opportunities', icon: TargetIcon, color: 'text-pink-500', bg: 'bg-pink-50' }
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center w-20 text-center cursor-pointer group" onClick={() => navigate('/streams')}>
                  <div className={`w-10 h-10 rounded-full ${step.bg} ${step.color} border-2 border-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-4 h-4"/>
                  </div>
                  <div className="font-bold text-[10px] text-gray-900 leading-tight mb-0.5">{step.label}</div>
                  <div className="text-[8px] font-medium text-gray-500 leading-tight">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ======================= */}
        {/* RIGHT RAIL CONTEXT (3 cols) */}
        {/* ======================= */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          
          {/* Filter Pathways */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900 text-sm">Filter Pathways</h3>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">Reset</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Education Level</label>
                <select className="w-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>After 10th</option>
                  <option>After 12th</option>
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Pathway Type</label>
                <select className="w-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>All Pathways</option>
                  <option>Diploma</option>
                  <option>Degree</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Stream</label>
                <select className="w-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>All Streams</option>
                  <option>Science</option>
                  <option>Commerce</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Duration</label>
                <select className="w-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>All Durations</option>
                  <option>1-2 Years</option>
                  <option>3-4 Years</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Location</label>
                <select className="w-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>All India</option>
                </select>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-lg transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900 text-sm">Quick Actions</h3>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">See All →</button>
            </div>
            <div className="space-y-1">
               {[
                 { title: 'Find Colleges', desc: 'Explore colleges for your pathway', icon: Building2, color: 'text-teal-600', bg: 'bg-teal-50', path: '/colleges' },
                 { title: 'Compare Pathways', desc: 'Compare different education paths', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50', path: '/pathways/after-10th/compare' },
                 { title: 'Eligibility Checker', desc: 'Check your eligibility', icon: ShieldAlert, color: 'text-orange-600', bg: 'bg-orange-50', path: '/exams' },
                 { title: 'Explore Careers', desc: 'See career options after each pathway', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', path: '/jobs' },
                 { title: 'Aptitude Test', desc: 'Discover your strengths', icon: Target, color: 'text-rose-600', bg: 'bg-rose-50', path: '/quiz' },
                 { title: 'Download Report', desc: 'Get your personalized report', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/settings' }
               ].map((action, idx) => (
                 <button key={idx} onClick={() => navigate(action.path)} className="w-full p-2 flex items-center justify-between hover:bg-gray-50 rounded-xl transition-all group text-left">
                   <div className="flex items-center gap-3">
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${action.bg} ${action.color}`}><action.icon className="w-4 h-4"/></div>
                     <div>
                       <div className="font-bold text-[11px] text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</div>
                       <div className="text-[9px] text-gray-500 font-medium">{action.desc}</div>
                     </div>
                   </div>
                   <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors shrink-0" />
                 </button>
               ))}
            </div>
          </div>

          {/* Latest Updates */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900 text-sm">Latest Updates</h3>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">View All →</button>
            </div>
            <div className="space-y-4">
               {upcomingExams.length > 0 ? upcomingExams.map((exam, idx) => {
                 const statusColors = ['bg-blue-50 text-blue-600 border-blue-100', 'bg-rose-50 text-rose-600 border-rose-100', 'bg-purple-50 text-purple-600 border-purple-100', 'bg-orange-50 text-orange-600 border-orange-100'];
                 const c = statusColors[idx % statusColors.length];
                 return (
                 <div key={idx} className="flex gap-3 cursor-pointer group" onClick={() => navigate(`/exams/${exam._id}`)}>
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${c}`}>
                     <span className="text-[9px] font-black">{(exam.short_name || exam.exam_name).substring(0, 4)}</span>
                   </div>
                   <div className="flex-1 min-w-0 flex flex-col justify-center">
                     <div className="text-[11px] font-bold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors truncate">{exam.exam_name}</div>
                     <div className="text-[9px] font-medium text-gray-400 shrink-0">{exam.education_level || 'Registration soon'}</div>
                   </div>
                 </div>
               )}) : (
                 <div className="text-center py-4 text-[10px] font-medium text-gray-500">No recent updates available.</div>
               )}
            </div>
          </div>

          {/* Guidance Card */}
          <div className="bg-[#0B1F44] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-full pointer-events-none"></div>
            
            <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 mb-3 shrink-0 relative z-10">
              <Lightbulb className="w-6 h-6"/>
            </div>
            <h3 className="font-serif italic text-lg font-bold text-white mb-2 leading-tight relative z-10">
              Not sure which path<br/>is right for you?
            </h3>
            <p className="text-[10px] text-blue-200 font-medium leading-relaxed mb-5 relative z-10">
              Take the U-THINK aptitude assessment and get personalized pathway recommendations.
            </p>
            <button onClick={() => navigate('/quiz')} className="w-full bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm relative z-10">
              Take Aptitude Test →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
