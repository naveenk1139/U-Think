import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Building2, Briefcase, ChevronRight, Star, CheckCircle, Search, ArrowRight, Brain, Target, BarChart2, CalendarDays, Code2, Rocket, Globe, MapPin, RefreshCw, Bot, Award, FlaskConical, Scale, PenTool, BriefcaseMedical, Wrench, Stethoscope, HeartPulse, Settings, Landmark, Leaf, Pill, Users, Cpu, Hotel, Layers, Zap, TrendingUp, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getPathwayStats, PathwayStats } from '../api/pathwayApi';
import { getDistricts, DistrictData } from '../api/geographyApi';

interface HomeProps {
  onNavigate: (tab: string) => void;
  onOpenCounselor: () => void;
}

// All 21 categories with icons and colors
const CATEGORIES = [
  { name: 'Engineering', icon: Settings, color: 'text-primary bg-blue-50 border-blue-100', nav: 'colleges', query: 'Engineering' },
  { name: 'Medical', icon: BriefcaseMedical, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', nav: 'colleges', query: 'Medical' },
  { name: 'Management', icon: Briefcase, color: 'text-amber-600 bg-amber-50 border-amber-100', nav: 'colleges', query: 'Management' },
  { name: 'Design', icon: PenTool, color: 'text-purple-600 bg-purple-50 border-purple-100', nav: 'colleges', query: 'Design' },
  { name: 'Law', icon: Scale, color: 'text-teal-600 bg-teal-50 border-teal-100', nav: 'colleges', query: 'Law' },
  { name: 'Commerce', icon: TrendingUp, color: 'text-orange-600 bg-orange-50 border-orange-100', nav: 'colleges', query: 'Commerce' },
  { name: 'Science', icon: FlaskConical, color: 'text-indigo-600 bg-indigo-50 border-indigo-100', nav: 'colleges', query: 'Science' },
  { name: 'Arts', icon: Layers, color: 'text-rose-600 bg-rose-50 border-rose-100', nav: 'streams', query: 'Arts' },
  { name: 'Architecture', icon: Landmark, color: 'text-cyan-600 bg-cyan-50 border-cyan-100', nav: 'exams', query: 'Architecture' },
  { name: 'Agriculture', icon: Leaf, color: 'text-lime-600 bg-lime-50 border-lime-100', nav: 'exams', query: 'Agriculture' },
  { name: 'Pharmacy', icon: Pill, color: 'text-pink-600 bg-pink-50 border-pink-100', nav: 'exams', query: 'Pharmacy' },
  { name: 'Nursing', icon: HeartPulse, color: 'text-red-600 bg-red-50 border-red-100', nav: 'exams', query: 'Nursing' },
  { name: 'Paramedical', icon: Stethoscope, color: 'text-sky-600 bg-sky-50 border-sky-100', nav: 'exams', query: 'Paramedical' },
  { name: 'Diploma', icon: BookOpen, color: 'text-violet-600 bg-violet-50 border-violet-100', nav: 'degrees', query: 'Diploma' },
  { name: 'Polytechnic', icon: Wrench, color: 'text-text-secondary bg-background border-border', nav: 'degrees', query: 'Polytechnic' },
  { name: 'ITI', icon: Target, color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100', nav: 'degrees', query: 'ITI' },
  { name: 'Vocational', icon: Zap, color: 'text-yellow-600 bg-yellow-50 border-yellow-100', nav: 'streams', query: 'Vocational' },
  { name: 'Computer Apps', icon: Cpu, color: 'text-primary-hover bg-blue-50 border-blue-100', nav: 'degrees', query: 'Computer Applications' },
  { name: 'Education', icon: GraduationCap, color: 'text-teal-700 bg-teal-50 border-teal-100', nav: 'streams', query: 'Education' },
  { name: 'Hospitality', icon: Hotel, color: 'text-amber-700 bg-amber-50 border-amber-100', nav: 'streams', query: 'Hospitality' },
  { name: 'Social Sciences', icon: Users, color: 'text-green-600 bg-green-50 border-green-100', nav: 'streams', query: 'Social Sciences' },
];

const EDUCATION_LEVELS = [
  { label: 'After 10th', icon: '📚', desc: 'PUC, Diploma, ITI, Polytechnic & Vocational', filter: 'POST_10TH', color: 'from-blue-500 to-indigo-600' },
  { label: 'After 12th / PUC', icon: '🎓', desc: 'Engineering, Medical, Law, Design & more', filter: '12TH_SCIENCE', color: 'from-emerald-500 to-teal-600' },
  { label: 'After Diploma', icon: '🔧', desc: 'Lateral Entry B.E/B.Tech, Jobs & Higher Ed', filter: 'DIPLOMA', color: 'from-purple-500 to-violet-600' },
  { label: 'After ITI', icon: '⚙️', desc: 'Apprenticeship, Govt Jobs & further study', filter: 'ITI', color: 'from-orange-500 to-amber-600' },
  { label: 'After Degree', icon: '💼', desc: 'MBA, M.Tech, MS, Govt Exams, Jobs', filter: 'UG', color: 'from-rose-500 to-red-600' },
  { label: 'Postgraduate', icon: '🔬', desc: 'Research, PhD, Advanced specializations', filter: 'PG', color: 'from-cyan-500 to-blue-600' },
];

const STREAMS = [
  { label: 'Science', sub: 'PCM / PCB / PCMB', color: 'bg-blue-50 border-blue-200 text-blue-800', route: 'streams' },
  { label: 'Commerce', sub: 'Business / Finance / Accounting', color: 'bg-amber-50 border-amber-200 text-amber-800', route: 'streams' },
  { label: 'Arts / Humanities', sub: 'History / Polity / Sociology', color: 'bg-rose-50 border-rose-200 text-rose-800', route: 'streams' },
  { label: 'Technical / Diploma', sub: 'CSE / ECE / Mechanical / Civil', color: 'bg-purple-50 border-purple-200 text-purple-800', route: 'degrees' },
  { label: 'Vocational', sub: 'Skill-based practical courses', color: 'bg-lime-50 border-lime-200 text-lime-800', route: 'streams' },
  { label: 'Medical', sub: 'MBBS / BDS / Nursing / Allied Health', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', route: 'exams' },
];

const TOP_SKILLS = ['Python', 'JavaScript', 'SQL', 'Cloud Computing', 'AI / ML', 'Data Analytics', 'Java', 'React', 'Communication', 'Leadership'];

const AFTER_10TH_PATHWAYS = [
  { title: '10th → PUC → Degree', steps: ['10th', 'PUC Science/Commerce/Arts', 'Entrance Exam', 'Undergraduate Degree'], color: 'text-primary' },
  { title: '10th → Diploma → B.E', steps: ['10th', 'Diploma (3 years)', 'Lateral Entry (2nd year B.E)', 'B.E / B.Tech'], color: 'text-purple-600' },
  { title: '10th → ITI → Govt Jobs', steps: ['10th', 'ITI Trade (1-2 years)', 'Apprenticeship', 'Government / Private Jobs'], color: 'text-emerald-600' },
];

type CategoryCounts = Record<string, { colleges: number; exams: number; jobs: number; mentors: number }>;
type Summary = { totalColleges: number; totalExams: number; totalJobs: number; totalMentors: number };

export default function Home({ onNavigate, onOpenCounselor }: HomeProps) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({});
  const [summary, setSummary] = useState<Summary>({ totalColleges: 0, totalExams: 0, totalJobs: 0, totalMentors: 0 });
  const [globalStats, setGlobalStats] = useState<PathwayStats | null>(null);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [upcomingExams, setUpcomingExams] = useState<any[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ type: string; label: string; route: string }[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const userName = currentUser?.displayName || currentUser?.name || 'Student';
  const profileCompletion = currentUser?.profileCompletion ?? null;
  const careerGoal = currentUser?.careerGoal || currentUser?.careerAspiration || null;
  const educationLevel = currentUser?.educationLevel || null;
  const stream = currentUser?.stream || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, districtsData] = await Promise.all([
          getPathwayStats(),
          getDistricts()
        ]);
        setGlobalStats(statsData);
        setDistricts(districtsData);
      } catch (error) {
        console.error('Error fetching global stats or districts:', error);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Live search
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); setSearchOpen(false); return; }
    const q = searchQuery.toLowerCase();
    const results: { type: string; label: string; route: string }[] = [];

    CATEGORIES.forEach(c => {
      if (c.name.toLowerCase().includes(q)) results.push({ type: 'Category', label: c.name, route: `/${c.nav}?category=${c.query}` });
    });
    STREAMS.forEach(s => {
      if (s.label.toLowerCase().includes(q)) results.push({ type: 'Stream', label: s.label, route: `/${s.route}` });
    });
    // Common career matches
    ['Software Engineer','Data Scientist','Doctor','Lawyer','Designer','Accountant','Teacher','Civil Engineer','Mechanical Engineer','Nurse','Pharmacist']
      .filter(c => c.toLowerCase().includes(q))
      .forEach(c => results.push({ type: 'Career', label: c, route: '/jobs' }));

    setSearchResults(results.slice(0, 8));
    setSearchOpen(results.length > 0);
  }, [searchQuery]);

  const goTo = useCallback((path: string) => { navigate(path); }, [navigate]);

  const getCatCount = (name: string) => {
    const d = categoryCounts[name];
    if (!d) return null;
    return d;
  };

  const profileCompletionItems = [
    { label: 'Education Level', done: !!currentUser?.educationLevel },
    { label: 'Stream', done: !!currentUser?.stream },
    { label: 'Interests', done: !!(currentUser?.interests && currentUser.interests.length > 0) },
    { label: 'Skills', done: !!(currentUser?.skills && currentUser.skills.length > 0) },
    { label: 'Career Goal', done: !!currentUser?.careerGoal },
    { label: 'Location', done: !!currentUser?.city || !!currentUser?.state },
  ];
  const completedCount = profileCompletionItems.filter(i => i.done).length;
  const realProfilePct = Math.round((completedCount / profileCompletionItems.length) * 100);

  return (
    <div className="space-y-8 font-sans pb-16">

      {/* ─── 1. HERO ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-center min-h-[300px] shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block opacity-30"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', maskImage: 'linear-gradient(to right, transparent, black)' }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-16 right-32 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-blue-200 font-medium text-sm">
            <span>Welcome back, <span className="font-bold text-white">{userName}</span>!</span>
            <span className="text-xl">👋</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Your Future <span className="text-blue-300">Begins Here</span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-md">
            Explore courses, colleges, exams, careers and jobs based on your education level and interests.
          </p>

          {/* Search */}
          <div className="relative max-w-lg w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-muted" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              className="block w-full pl-11 pr-4 py-3.5 bg-card rounded-2xl text-sm placeholder-slate-400 focus:outline-none shadow-xl text-text-primary font-medium focus:ring-2 focus:ring-blue-400"
              placeholder="Search careers, colleges, courses, exams, jobs..."
            />
            {searchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-2xl border border-border z-50 max-h-64 overflow-y-auto">
                {searchResults.map((r, i) => (
                  <button
                    key={i}
                    onMouseDown={() => { navigate(r.route); setSearchQuery(''); setSearchOpen(false); }}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-background border-b border-slate-50 last:border-0 transition-colors"
                  >
                    <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-primary rounded-full shrink-0">{r.type}</span>
                    <span className="text-sm font-semibold text-text-primary">{r.label}</span>
                    <ChevronRight className="w-4 h-4 text-text-muted ml-auto shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button onClick={() => navigate('/streams')} className="bg-primary hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-blue-900/30 text-sm">
              Explore Pathways <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/quiz')} className="bg-card/10 hover:bg-card/20 border border-white/20 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all text-sm backdrop-blur-sm">
              <Award className="w-4 h-4" /> Take Aptitude Test
            </button>
            <button onClick={() => navigate('/colleges')} className="bg-card/10 hover:bg-card/20 border border-white/20 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all backdrop-blur-sm">
              Find Colleges
            </button>
            <button onClick={() => navigate('/jobs')} className="bg-card/10 hover:bg-card/20 border border-white/20 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all backdrop-blur-sm">
              Find Jobs
            </button>
          </div>
        </div>
      </div>

      {/* ─── 2. QUICK ACTIONS ────────────────────────────────────── */}
      <div className="flex overflow-x-auto pb-1 gap-3 hide-scrollbar">
        {[
          { label: 'Find a Career', icon: Target, route: '/jobs' },
          { label: 'Find a College', icon: Building2, route: '/colleges' },
          { label: 'Explore Courses', icon: BookOpen, route: '/streams' },
          { label: 'Find Exams', icon: CalendarDays, route: '/exams' },
          { label: 'Take Aptitude Test', icon: Award, route: '/quiz' },
          { label: 'Find Jobs', icon: Briefcase, route: '/jobs' },
          { label: 'Industry Mentors', icon: UserCheck, route: '/mentorship' },
        ].map((a, i) => (
          <button key={i} onClick={() => navigate(a.route)}
            className="flex items-center gap-2 shrink-0 bg-card border border-border hover:border-blue-300 hover:bg-blue-50 px-5 py-2.5 rounded-full text-sm font-bold text-text-primary hover:text-primary-hover transition-colors shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <a.icon className="w-4 h-4" /> {a.label}
          </button>
        ))}
      </div>

      {/* ─── 3. PERSONALIZED STATUS ROW ─────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        {/* Career Progress — dynamic based on profile */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-card/10 rounded-full -mr-10 -mt-10 blur-2xl" />
          <div>
            <div className="flex items-center gap-2 font-bold text-sm mb-1 text-blue-100">
              <TrendingUp className="w-4 h-4" /> Career Progress
            </div>
            {careerGoal ? (
              <h3 className="text-2xl font-black mb-1">{careerGoal}</h3>
            ) : (
              <h3 className="text-xl font-black mb-1 text-blue-200">Set your career goal →</h3>
            )}
            <p className="text-xs text-blue-200">
              {educationLevel ? `Level: ${educationLevel}` : 'Complete your profile'}
              {stream ? ` • Stream: ${stream}` : ''}
            </p>
          </div>

          <div className="mt-5">
            {currentUser ? (
              <>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Profile Completion</span>
                  <span>{realProfilePct}%</span>
                </div>
                <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full transition-all" style={{ width: `${realProfilePct}%` }} />
                </div>
                <div className="mt-3">
                  <button onClick={() => navigate('/settings')}
                    className="w-full text-center text-xs font-bold text-white/80 hover:text-white py-1.5 bg-card/10 hover:bg-card/20 rounded-lg transition-colors">
                    {realProfilePct < 100 ? 'Complete Profile →' : '✓ Profile Complete'}
                  </button>
                </div>
              </>
            ) : (
              <button onClick={() => navigate('/login')}
                className="w-full text-center text-xs font-bold text-white bg-card/20 hover:bg-card/30 rounded-lg py-2 transition-colors">
                Sign In to personalise →
              </button>
            )}
          </div>
        </div>

        {/* Platform Summary Stats */}
        {[
          { label: 'Colleges', value: summary.totalColleges, icon: Building2, color: 'text-purple-600 bg-purple-50', route: '/colleges', sub: 'across Karnataka' },
          { label: 'Exams', value: summary.totalExams, icon: CalendarDays, color: 'text-emerald-600 bg-emerald-50', route: '/exams', sub: 'entrance exams' },
          { label: 'Jobs', value: summary.totalJobs, icon: Briefcase, color: 'text-primary bg-blue-50', route: '/jobs', sub: 'live openings' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl p-5 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => navigate(s.route)}>
            <div className="flex items-center gap-2 text-text-primary font-bold text-sm mb-3">
              <div className={`p-1.5 rounded-lg ${s.color}`}><s.icon className="w-4 h-4" /></div>
              {s.label}
            </div>
            <div>
              <div className="text-3xl font-black text-text-primary">
                {statsLoading ? <RefreshCw className="w-6 h-6 animate-spin text-text-muted" /> : s.value || '—'}
              </div>
              <div className="text-text-muted text-xs mt-1 font-medium">{s.sub}</div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Explore <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* ─── 4. EDUCATION LEVEL PATHWAYS ────────────────────────── */}
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Explore Based on Your Education</h2>
          <button onClick={() => navigate('/streams')} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {EDUCATION_LEVELS.map((lvl, i) => (
            <button key={i}
              onClick={() => navigate(`/exams?educationLevel=${lvl.filter}`)}
              className={`bg-gradient-to-br ${lvl.color} p-4 rounded-2xl flex flex-col items-start text-white group hover:scale-105 transition-transform text-left shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none`}>
              <span className="text-2xl mb-2">{lvl.icon}</span>
              <div className="font-bold text-sm leading-tight">{lvl.label}</div>
              <div className="text-[10px] text-white/80 mt-1 leading-tight line-clamp-2">{lvl.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── 5. EXPLORE BY CATEGORIES ───────────────────────────── */}
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Explore by Categories</h2>
          <button onClick={() => navigate('/streams')} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {CATEGORIES.map((cat, i) => {
            const counts = getCatCount(cat.name);
            return (
              <button key={i}
                onClick={() => navigate(`/${cat.nav}?category=${encodeURIComponent(cat.query)}`)}
                className={`border ${cat.color} hover:shadow-md bg-card p-3 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all text-center group cursor-pointer`}>
                <div className={`p-2.5 rounded-xl ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-[12px] leading-tight">{cat.name}</h3>
                  {statsLoading ? (
                    <p className="text-[9px] text-text-muted mt-0.5">Loading...</p>
                  ) : counts ? (
                    <p className="text-[9px] text-text-muted mt-0.5">{counts.colleges > 0 ? `${counts.colleges} Colleges` : counts.exams > 0 ? `${counts.exams} Exams` : 'Explore →'}</p>
                  ) : (
                    <p className="text-[9px] text-text-muted mt-0.5">Explore →</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 6. MAIN CONTENT SPLIT ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Upcoming Exams + Jobs + After-10th + Stream Explorer */}
        <div className="lg:col-span-2 space-y-6">

          {/* Upcoming Exams */}
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-emerald-600" /> Upcoming Exams
              </h2>
              <button onClick={() => navigate('/exams')} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            {statsLoading ? (
              <div className="flex justify-center py-8"><RefreshCw className="w-6 h-6 animate-spin text-text-muted" /></div>
            ) : upcomingExams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {upcomingExams.map((exam, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-border bg-background/50 hover:border-blue-200 hover:bg-blue-50/30 transition-colors cursor-pointer group"
                    onClick={() => navigate('/exams')}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-text-primary text-sm leading-tight">{exam.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${exam.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-background-secondary text-text-muted'}`}>
                        {exam.status === 'Active' ? 'ACTIVE' : exam.status?.toUpperCase() || 'TBA'}
                      </span>
                    </div>
                    <div className="flex gap-2 text-[10px] font-semibold mb-2">
                      <span className="bg-blue-50 text-primary-hover px-1.5 py-0.5 rounded">{exam.category}</span>
                      <span className="bg-background-secondary text-text-secondary px-1.5 py-0.5 rounded">{exam.level}</span>
                    </div>
                    {exam.importantDates?.examDate && (
                      <p className="text-[10px] text-text-muted">Exam: {exam.importantDates.examDate}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-text-muted text-sm mb-3">No verified exam data available currently.</p>
                <button onClick={() => navigate('/exams')} className="text-primary text-sm font-bold hover:underline">Browse All Exams →</button>
              </div>
            )}
          </div>

          {/* Featured Jobs */}
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" /> Explore Jobs
              </h2>
              <button onClick={() => navigate('/jobs')} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            {statsLoading ? (
              <div className="flex justify-center py-8"><RefreshCw className="w-6 h-6 animate-spin text-text-muted" /></div>
            ) : featuredJobs.length > 0 ? (
              <div className="space-y-3">
                {featuredJobs.slice(0, 3).map((job, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-border bg-background/50 hover:border-blue-200 hover:bg-blue-50/30 transition-colors cursor-pointer flex items-center justify-between gap-4 group"
                    onClick={() => navigate('/jobs')}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 font-bold text-primary-hover text-sm">
                        {(job.company || job.title || 'J').charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-text-primary">{job.title}</div>
                        <div className="text-xs text-text-muted">{job.company} • {job.location || 'Remote'}</div>
                      </div>
                    </div>
                    <div className="text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      Apply <ArrowRight className="w-3 h-3 inline" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-text-muted text-sm mb-3">No verified job data available currently.</p>
                <button onClick={() => navigate('/jobs')} className="text-primary text-sm font-bold hover:underline">Browse Job Explorer →</button>
              </div>
            )}
          </div>

          {/* After 10th Pathways */}
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text-primary">What Can I Do After 10th?</h2>
              <button onClick={() => navigate('/streams')} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                Explore All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {AFTER_10TH_PATHWAYS.map((p, i) => (
                <div key={i} className="p-4 border border-border rounded-2xl bg-background/50 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate('/streams')}>
                  <h3 className={`font-bold text-sm mb-3 ${p.color}`}>{p.title}</h3>
                  <div className="space-y-1.5">
                    {p.steps.map((step, j) => (
                      <div key={j} className="flex items-center gap-2">
                        {j < p.steps.length - 1 ? (
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-slate-300" />
                            <div className="w-px h-4 border-border" />
                          </div>
                        ) : (
                          <Star className="w-2 h-2 text-amber-400 fill-amber-400 shrink-0" />
                        )}
                        <span className={`text-xs ${j === p.steps.length - 1 ? 'font-bold text-text-primary' : 'text-text-muted'}`}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stream Explorer */}
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text-primary">Explore by Stream</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {STREAMS.map((s, i) => (
                <button key={i} onClick={() => navigate(`/${s.route}`)}
                  className={`border ${s.color} p-4 rounded-2xl text-left hover:shadow-md transition-shadow cursor-pointer group`}>
                  <div className="font-bold text-sm">{s.label}</div>
                  <div className="text-[10px] opacity-70 mt-1">{s.sub}</div>
                  <div className="mt-2 text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* Profile Status — Real data */}
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <h2 className="text-base font-bold text-text-primary mb-4">Profile Status</h2>
            {currentUser ? (
              <>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-3xl font-black text-primary">{realProfilePct}%</span>
                  <span className="text-xs font-bold text-text-muted mb-1">{realProfilePct === 100 ? 'Complete ✓' : 'Incomplete'}</span>
                </div>
                <div className="w-full bg-background-secondary h-2 rounded-full mb-4 overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${realProfilePct}%` }} />
                </div>
                <div className="space-y-2 mb-4">
                  {profileCompletionItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className={item.done ? 'text-text-primary font-medium' : 'text-text-muted'}>{item.label}</span>
                      {item.done
                        ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        : <div className="w-3.5 h-3.5 rounded-full border-2 border-border" />}
                    </div>
                  ))}
                </div>
                {realProfilePct < 100 && (
                  <button onClick={() => navigate('/settings')} className="w-full bg-blue-50 hover:bg-blue-100 text-primary-hover font-bold text-xs py-2.5 rounded-xl transition-colors">
                    Complete Profile →
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-text-muted mb-3">Sign in to see your profile status.</p>
                <button onClick={() => navigate('/login')} className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-sm py-2.5 rounded-xl transition-colors">
                  Sign In
                </button>
              </div>
            )}
          </div>

          {/* Recommended Careers */}
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <h2 className="text-base font-bold text-text-primary mb-4">Recommended Careers</h2>
            {currentUser?.careerGoal || currentUser?.interests?.length ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between border border-border p-3 rounded-xl bg-background/50 hover:border-blue-200 cursor-pointer transition-colors"
                  onClick={() => navigate('/jobs')}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50"><Code2 className="w-4 h-4 text-indigo-600" /></div>
                    <div>
                      <div className="font-bold text-sm text-text-primary">{careerGoal || 'Software Engineer'}</div>
                      <div className="text-[10px] text-text-muted">Based on your profile</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </div>
                <button onClick={() => navigate('/jobs')} className="w-full text-primary text-xs font-bold py-2 hover:underline">
                  Explore All Careers →
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Brain className="w-8 h-8 text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-muted mb-3">Take the Aptitude Assessment to get personalized career recommendations.</p>
                <button onClick={() => navigate('/quiz')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl transition-colors">
                  Take Aptitude Test →
                </button>
              </div>
            )}
          </div>

          {/* Skills in Demand */}
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <h2 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-primary" /> Skills in Demand
            </h2>
            <div className="flex flex-wrap gap-2">
              {TOP_SKILLS.map((skill, i) => (
                <button key={i} onClick={() => navigate(`/jobs?search=${encodeURIComponent(skill)}`)}
                  className="px-2.5 py-1 bg-background-secondary hover:bg-blue-50 hover:text-primary-hover hover:border-blue-200 border border-transparent text-text-secondary text-[11px] font-bold rounded-lg transition-colors cursor-pointer">
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Industry Mentors */}
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-text-primary">Industry Mentors</h2>
              <button onClick={() => navigate('/mentorship')} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                Find Mentor <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Engineering', 'Medical', 'Finance', 'Design', 'Law', 'IT'].map((cat, i) => (
                <button key={i} onClick={() => navigate(`/mentorship?search=${cat}`)}
                  className="py-2 px-3 bg-background hover:bg-blue-50 border border-border hover:border-blue-200 rounded-xl text-xs font-bold text-text-primary hover:text-primary-hover transition-colors text-left">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* AI Counselor */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-10 -mt-10 blur-2xl" />
            <div className="bg-card/10 w-fit p-3 rounded-2xl mb-4 backdrop-blur-md border border-white/10">
              <Bot className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">Need Guidance?</h3>
            <p className="text-xs text-text-muted mb-5 leading-relaxed">
              Chat with our AI Counselor for personalized college, course, and exam recommendations based on your profile.
            </p>
            <button onClick={onOpenCounselor} className="w-full bg-emerald-500 hover:bg-emerald-400 text-text-primary font-bold text-sm py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
              Ask AI Counselor
            </button>
          </div>

        </div>
      </div>

      {/* ─── 7. EXPLORE KARNATAKA COLLEGES ──────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-slate-50 rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Explore Karnataka Colleges
            </h2>
            <p className="text-xs text-text-muted mt-1">Filter colleges by district, stream, and category</p>
          </div>
          <button onClick={() => navigate('/colleges')} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
            All Colleges <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {districts.map((dist) => (
            <button key={dist._id}
              onClick={() => navigate(`/colleges?district=${dist._id}`)}
              className="px-4 py-2 bg-card border border-border hover:border-blue-300 hover:bg-blue-50 rounded-full text-sm font-semibold text-text-primary hover:text-primary-hover transition-colors shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
              {dist.name}
            </button>
          ))}
          {districts.length === 0 && statsLoading && (
            <div className="text-sm text-text-muted">Loading districts...</div>
          )}
        </div>
      </div>

    </div>
  );
}
