import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowRight, Building2, CalendarDays, BookOpen, 
  Briefcase, GraduationCap, Map, Target, Heart, Scale, Monitor, 
  Camera, Zap, Leaf, BriefcaseMedical, TrendingUp, Settings, Palette, Wrench, ShieldAlert, CheckCircle, User
} from 'lucide-react';
import { getPathwayStats, PathwayStats } from '../api/pathwayApi';
import { fetchColleges, College } from '../api/collegeApi';
import { getExams } from '../api/examApi';
import { StructuredExam } from '../types';

export default function Home({ onNavigate, onOpenCounselor }: any) {
  const navigate = useNavigate();
  const [stats, setStats] = useState<PathwayStats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [colleges, setColleges] = useState<College[]>([]);
  const [upcomingExams, setUpcomingExams] = useState<StructuredExam[]>([]);

  useEffect(() => {
    getPathwayStats().then(setStats).catch(console.error);
    
    fetchColleges({ limit: 4 }).then(res => {
      const data = res.data || res || [];
      setColleges(data.slice(0, 3));
    }).catch(console.error);

    getExams({ limit: 4 }).then(res => {
      const items = res.items || [];
      setUpcomingExams(items.slice(0, 4));
    }).catch(console.error);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="font-sans pb-10 min-h-screen bg-[#F7F9FC]">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative">
        
        {/* ======================= */}
        {/* LEFT MAIN CONTENT (9 cols) */}
        {/* ======================= */}
        <div className="xl:col-span-9 space-y-6 min-w-0">
          
          {/* HERO SECTION */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl overflow-hidden shadow-sm border border-blue-200 relative flex flex-col md:flex-row min-h-[300px]">
            {/* Left Content */}
            <div className="p-8 md:p-10 flex-1 relative z-10 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-2">
                Explore. Learn. Grow. <br/>
                <span className="text-blue-600">Your Future Starts Here.</span>
              </h1>
              <p className="text-sm font-medium text-gray-600 mb-8 max-w-lg">
                Discover the right courses, colleges, exams and career paths. Get personalized guidance and take the next step towards your brighter future.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-xl mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search colleges, courses, exams, careers..."
                  className="w-full pl-11 pr-32 py-4 rounded-xl border border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm">
                  Search
                </button>
              </form>

              {/* Quick Filter Badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Colleges', icon: Building2, color: 'text-purple-600', path: '/colleges' },
                  { label: 'Exams', icon: ShieldAlert, color: 'text-emerald-600', path: '/exams' },
                  { label: 'Courses', icon: BookOpen, color: 'text-teal-600', path: '/colleges' },
                  { label: 'Careers', icon: Briefcase, color: 'text-orange-600', path: '/jobs' },
                  { label: 'After 10th', icon: GraduationCap, color: 'text-blue-600', path: '/streams' },
                  { label: 'After 12th', icon: Target, color: 'text-rose-600', path: '/streams' }
                ].map((tag, idx) => (
                  <button key={idx} onClick={() => navigate(tag.path)} className="flex items-center gap-1.5 bg-white border border-blue-100 hover:border-blue-300 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 hover:text-blue-600 transition-colors shadow-sm">
                    <tag.icon className={`w-3.5 h-3.5 ${tag.color}`} /> {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Image area (hidden on very small screens) */}
            <div className="hidden md:block w-1/3 relative bg-blue-600/5">
               <div className="absolute inset-0 flex items-center justify-center p-6">
                 {/* Visual abstract to represent the student holding books */}
                 <div className="relative w-full h-full max-w-sm rounded-xl overflow-hidden shadow-lg border border-white/40 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                   <div className="text-center font-serif italic text-blue-900 font-bold p-6 relative z-10 text-xl leading-relaxed">
                     "A Brighter Future Begins with the Right Guidance"
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* MAIN STATISTICS CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { label: 'Colleges', value: stats?.colleges ? `${stats.colleges}+` : '500+', sub: 'Across India', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
               { label: 'Courses', value: stats?.courses ? `${stats.courses}+` : '1,200+', sub: 'Multiple streams', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
               { label: 'Exams', value: stats?.exams ? `${stats.exams}+` : '200+', sub: 'Entrance & Govt. exams', icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50' },
               { label: 'Career Options', value: stats?.jobs ? `${stats.jobs}+` : '100+', sub: 'Across industries', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' }
             ].map((stat, i) => (
               <div key={i} onClick={() => navigate(stat.label === 'Exams' ? '/exams' : stat.label === 'Colleges' ? '/colleges' : stat.label === 'Career Options' ? '/jobs' : '/colleges')} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center hover:-translate-y-1 transition-transform cursor-pointer">
                 <div className="flex items-center gap-3 mb-2">
                   <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}><stat.icon className="w-6 h-6"/></div>
                   <div>
                     <div className="text-2xl font-black text-gray-900 leading-none">{stat.value}</div>
                   </div>
                 </div>
                 <div className="text-sm font-bold text-gray-900 mt-2">{stat.label}</div>
                 <div className="text-[10px] font-medium text-gray-500 mt-0.5">{stat.sub}</div>
               </div>
             ))}
          </div>

          {/* EXPLORE BY EDUCATION LEVEL */}
          <div className="mt-8">
            <h2 className="text-lg font-black text-gray-900 mb-4">Explore by Education Level</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 { title: 'After 10th', desc: 'Discover streams, courses and career options after 10th.', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', hover: 'hover:border-blue-300' },
                 { title: 'After 12th', desc: 'Find the best courses, colleges and career paths after 12th.', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'hover:border-emerald-300' },
                 { title: 'Diploma & ITI', desc: 'Explore diploma, ITI and vocational courses.', icon: Wrench, color: 'text-rose-600', bg: 'bg-rose-50', hover: 'hover:border-rose-300' },
                 { title: 'Degree & Beyond', desc: 'Undergraduate, postgraduate and research programs.', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50', hover: 'hover:border-purple-300' }
               ].map((level, idx) => (
                 <div key={idx} className={`bg-white border border-gray-200 rounded-2xl p-5 shadow-sm ${level.hover} transition-colors flex flex-col h-full cursor-pointer group`} onClick={() => navigate('/streams')}>
                   <div className="flex items-center gap-3 mb-3">
                     <div className={`w-10 h-10 rounded-xl ${level.bg} ${level.color} flex items-center justify-center`}><level.icon className="w-5 h-5"/></div>
                     <h3 className="font-bold text-sm text-gray-900">{level.title}</h3>
                   </div>
                   <p className="text-[11px] font-medium text-gray-500 leading-relaxed mb-4 flex-1">{level.desc}</p>
                   <div className="text-[11px] font-bold text-blue-600 group-hover:text-blue-800 transition-colors flex items-center gap-1">Explore <ArrowRight className="w-3 h-3"/></div>
                 </div>
               ))}
            </div>
          </div>

          {/* POPULAR CAREER FIELDS */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-gray-900">Popular Career Fields</h2>
              <button onClick={() => navigate('/jobs')} className="text-xs font-bold text-blue-600 hover:underline">View All Careers →</button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
               {[
                 { label: 'Engineering', count: '120+', icon: Settings, color: 'text-blue-600', bg: 'bg-blue-50' },
                 { label: 'Medical', count: '80+', icon: BriefcaseMedical, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                 { label: 'Management', count: '70+', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
                 { label: 'Law', count: '50+', icon: Scale, color: 'text-purple-600', bg: 'bg-purple-50' },
                 { label: 'IT & Software', count: '100+', icon: Monitor, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                 { label: 'Arts & Humanities', count: '60+', icon: Palette, color: 'text-rose-600', bg: 'bg-rose-50' },
                 { label: 'Design', count: '40+', icon: Target, color: 'text-pink-600', bg: 'bg-pink-50' },
                 { label: 'Agriculture', count: '30+', icon: Leaf, color: 'text-lime-600', bg: 'bg-lime-50' },
               ].map((field, idx) => (
                 <div key={idx} onClick={() => navigate('/jobs')} className="snap-start shrink-0 w-36 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-blue-300 transition-colors flex flex-col items-center text-center cursor-pointer group">
                   <div className={`w-12 h-12 rounded-2xl ${field.bg} ${field.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}><field.icon className="w-6 h-6"/></div>
                   <h3 className="font-bold text-[11px] text-gray-900 leading-tight mb-1">{field.label}</h3>
                   <div className="text-[9px] font-bold text-gray-500">{field.count} careers</div>
                 </div>
               ))}
            </div>
          </div>

          {/* FEATURED COLLEGES */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-gray-900">Featured Colleges</h2>
              <button onClick={() => navigate('/colleges')} className="text-xs font-bold text-blue-600 hover:underline">View All Colleges →</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.length > 0 ? colleges.map((college, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="h-32 bg-gray-200 w-full relative">
                    {college.image ? <img src={college.image} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-blue-50 flex items-center justify-center"><Building2 className="w-8 h-8 text-blue-200"/></div>}
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-gray-500 hover:text-rose-500 shadow-sm transition-colors"><Heart className="w-4 h-4"/></button>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-sm text-gray-900 leading-tight mb-2 line-clamp-2" title={college.name}>{college.name}</h3>
                    <div className="text-[10px] font-medium text-gray-500 mb-3 flex items-center gap-1"><Map className="w-3 h-3 text-red-500 shrink-0"/> {college.city}, {college.state}</div>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {college.categories?.[0] && <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{college.categories[0]}</span>}
                      {college.type && <span className="text-[9px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-100">{college.type}</span>}
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto mb-4 border-t border-gray-100 pt-3">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        <span className="text-xs font-black text-gray-900">4.8</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600">
                        <User className="w-3 h-3" /> 1.5K+ Students
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/colleges/${college._id || college.slug}`)} className="flex-1 bg-blue-600 text-white hover:bg-blue-700 text-[11px] font-bold py-2 rounded-lg transition-colors shadow-sm">View Details</button>
                      <button className="flex-1 bg-white border border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 text-[11px] font-bold py-2 rounded-lg transition-colors shadow-sm">Compare</button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-3 text-center py-8 text-gray-500 text-sm font-medium">Loading colleges...</div>
              )}
            </div>
          </div>

          {/* UPCOMING / IMPORTANT EXAMS */}
          <div className="mt-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-gray-900">Upcoming / Important Exams</h2>
              <button onClick={() => navigate('/exams')} className="text-xs font-bold text-blue-600 hover:underline">View All Exams →</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {upcomingExams.length > 0 ? upcomingExams.map((exam, idx) => {
                 const statusColors = ['bg-blue-50 text-blue-600', 'bg-rose-50 text-rose-600', 'bg-emerald-50 text-emerald-600', 'bg-orange-50 text-orange-600'];
                 const sc = statusColors[idx % statusColors.length];
                 return (
                 <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-blue-300 transition-colors flex flex-col items-center text-center">
                   <div className={`w-14 h-14 rounded-xl ${sc} flex items-center justify-center font-black text-sm mb-3 border ${sc.replace('bg-', 'border-').replace('text-', 'border-').replace('50', '100')}`}>
                     {(exam.short_name || exam.exam_name).substring(0, 4)}
                   </div>
                   <h3 className="font-bold text-[11px] text-gray-900 leading-tight mb-1 h-8 overflow-hidden">{exam.exam_name}</h3>
                   <div className="text-[9px] font-medium text-gray-500 mb-4">{exam.education_level || 'Registration Soon'}</div>
                   <button onClick={() => navigate(`/exams/${exam._id}`)} className="mt-auto text-[10px] font-bold text-blue-600 hover:underline">View Details →</button>
                 </div>
               )}) : (
                 <div className="col-span-4 text-center py-8 text-gray-500 text-sm font-medium">Loading exams...</div>
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
               {[
                 { badge: 'JEE', title: 'JEE Main 2025 Registration Starts Soon', date: 'Mar 20, 2025', color: 'bg-blue-50 text-blue-600 border-blue-100' },
                 { badge: 'NEET', title: 'NEET 2025 Application Form Announced', date: 'Mar 18, 2025', color: 'bg-rose-50 text-rose-600 border-rose-100' },
                 { badge: 'NIRF', title: 'NIRF 2025 Rankings Expected in May', date: 'Mar 15, 2025', color: 'bg-purple-50 text-purple-600 border-purple-100' },
                 { badge: 'UGC', title: 'UGC New Guidelines for Private Universities', date: 'Mar 12, 2025', color: 'bg-orange-50 text-orange-600 border-orange-100' },
                 { badge: 'AICTE', title: 'AICTE Approval Process Updates', date: 'Mar 10, 2025', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
               ].map((update, idx) => (
                 <div key={idx} className="flex gap-3">
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${update.color}`}>
                     <span className="text-[9px] font-black">{update.badge}</span>
                   </div>
                   <div className="flex-1 min-w-0 flex flex-col justify-center">
                     <div className="text-[11px] font-bold text-gray-900 leading-tight mb-1">{update.title}</div>
                     <div className="text-[9px] font-medium text-gray-400 shrink-0">{update.date}</div>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Guidance Card */}
          <div className="bg-[#0B1F44] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-full pointer-events-none"></div>
            
            <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 mb-3 shrink-0 relative z-10">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v1"/><path d="M12 7a5 5 0 0 0-5 5c0 2 1.5 3 2 4.5V18h6v-1.5c.5-1.5 2-2.5 2-4.5a5 5 0 0 0-5-5Z"/></svg>
            </div>
            <h3 className="font-serif italic text-lg font-bold text-white mb-2 leading-tight relative z-10">
              Your Future<br/>Our Guidance
            </h3>
            <p className="text-[10px] text-blue-200 font-medium leading-relaxed mb-5 relative z-10">
              Not sure what's right for you?<br/>Get personalized recommendations with U-THINK AI.
            </p>
            <button onClick={() => navigate('/quiz')} className="w-full bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm relative z-10">
              Take Aptitude Test →
            </button>
          </div>

          {/* Why Choose U-THINK */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900 text-sm">Why Choose U-THINK?</h3>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">See All →</button>
            </div>
            <div className="space-y-3">
               {[
                 'Personalized Guidance',
                 'Verified Information',
                 'Multiple Career Paths',
                 'Easy to Explore',
                 'Built for Every Student'
               ].map((reason, idx) => (
                 <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                   <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle className="w-3.5 h-3.5"/></div>
                   {reason}
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
