import React from 'react';
import { 
  ArrowRight, 
  Map, 
  Building2, 
  CalendarDays, 
  Settings, 
  BriefcaseMedical, 
  Briefcase,
  PenTool,
  Scale,
  TrendingUp,
  FlaskConical,
  LayoutGrid,
  Bot,
  Award,
  Target,
  Search,
  BookOpen,
  HeartPulse,
  Wrench,
  Stethoscope,
  Briefcase as JobIcon,
  Bell,
  CheckCircle,
  Clock,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HomeProps {
  onNavigate: (tab: string) => void;
  onOpenCounselor: () => void;
}

export default function Home({ onNavigate, onOpenCounselor }: HomeProps) {
  const { currentUser } = useAuth();
  
  const userName = currentUser?.displayName || currentUser?.name || 'Kiran';

  const categories = [
    { name: 'Engineering', count: '45+ Options', icon: Settings, color: 'text-blue-600 bg-blue-50' },
    { name: 'Medical', count: '25+ Options', icon: BriefcaseMedical, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Management', count: '20+ Options', icon: JobIcon, color: 'text-amber-600 bg-amber-50' },
    { name: 'Design', count: '15+ Options', icon: PenTool, color: 'text-purple-600 bg-purple-50' },
    { name: 'Law', count: '10+ Options', icon: Scale, color: 'text-teal-600 bg-teal-50' },
    { name: 'Commerce', count: '18+ Options', icon: TrendingUp, color: 'text-orange-600 bg-orange-50' },
    { name: 'Science', count: '22+ Options', icon: FlaskConical, color: 'text-indigo-600 bg-indigo-50' },
    { name: 'Diploma', count: '30+ Courses', icon: BookOpen, color: 'text-rose-600 bg-rose-50' },
    { name: 'Polytechnic', count: '12+ Options', icon: Wrench, color: 'text-cyan-600 bg-cyan-50' },
    { name: 'ITI', count: '40+ Trades', icon: Target, color: 'text-fuchsia-600 bg-fuchsia-50' },
    { name: 'Paramedical', count: '15+ Courses', icon: Stethoscope, color: 'text-sky-600 bg-sky-50' },
    { name: 'Vocational', count: 'Explore all', icon: HeartPulse, color: 'text-lime-600 bg-lime-50' },
  ];

  const recommendations = [
    { name: 'Computer Science Engineer', desc: 'High Demand • Great Future', match: '82%', color: 'text-emerald-600', iconColor: 'text-indigo-600 bg-indigo-50' },
    { name: 'Data Scientist', desc: 'High Growth • Future Ready', match: '78%', color: 'text-emerald-600', iconColor: 'text-blue-600 bg-blue-50' },
    { name: 'UI/UX Designer', desc: 'Creative • In Demand', match: '72%', color: 'text-emerald-600', iconColor: 'text-purple-600 bg-purple-50' },
  ];

  const opportunities = [
    { title: 'National Scholarship Test 2026', type: 'Scholarship', date: 'Closes in 5 days', color: 'text-amber-600 bg-amber-50' },
    { title: 'Tech Internship at Google', type: 'Internship', date: 'Apply by Aug 30', color: 'text-blue-600 bg-blue-50' },
    { title: 'IIT Madras BS Degree Admission', type: 'Admissions', date: 'Opens Sep 1', color: 'text-purple-600 bg-purple-50' },
  ];

  const savedItems = [
    { title: 'IIT Bombay', type: 'College', icon: Building2 },
    { title: 'Software Engineering', type: 'Career', icon: Target },
    { title: 'JEE Advanced', type: 'Exam', icon: CalendarDays },
  ];

  const reminders = [
    { title: 'Complete Profile Details', time: 'Today', urgent: true },
    { title: 'Register for Aptitude Test', time: 'Tomorrow', urgent: false },
    { title: 'Upload 10th Marksheet', time: 'In 3 days', urgent: false },
  ];

  return (
    <div className="space-y-6 font-sans pb-10">
      
      {/* 1. Hero Banner with Inline Search */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-center min-h-[320px] shadow-lg">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block opacity-40 mix-blend-overlay" 
             style={{ 
               backgroundImage: 'url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80")', 
               backgroundSize: 'cover', 
               backgroundPosition: 'center',
               maskImage: 'linear-gradient(to right, transparent, black)'
             }}>
        </div>
        
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="flex items-center gap-2 text-blue-200 font-medium">
            <span>Welcome back, {userName}!</span>
            <span className="text-xl">👋</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Your Future Begins Here
          </h1>
          
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-md pt-2 pb-2">
            Explore the best career paths, top colleges, exams and opportunities tailored just for you.
          </p>

          {/* Inline Search */}
          <div className="relative max-w-md w-full my-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3.5 bg-white rounded-xl text-sm placeholder-slate-400 focus:outline-none shadow-lg text-slate-900 font-medium"
              placeholder="Search careers, colleges, courses, or exams..."
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button 
              onClick={() => onNavigate('streams')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-900/20"
            >
              Explore Pathways <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('quiz')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer backdrop-blur-sm"
            >
              <Award className="w-4 h-4" /> Take Aptitude Test
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Actions */}
      <div className="flex overflow-x-auto pb-2 gap-3 hide-scrollbar">
        {[
          { label: 'Find a Career', icon: Target, route: 'jobs' },
          { label: 'Find a College', icon: Building2, route: 'colleges' },
          { label: 'Explore Courses', icon: BookOpen, route: 'streams' },
          { label: 'Find Exams', icon: CalendarDays, route: 'exams' },
          { label: 'Take Aptitude Test', icon: Award, route: 'quiz' },
          { label: 'Find Jobs', icon: Briefcase, route: 'jobs' },
        ].map((action, idx) => (
          <button 
            key={idx}
            onClick={() => onNavigate(action.route)}
            className="flex items-center gap-2 shrink-0 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 px-5 py-2.5 rounded-full text-sm font-bold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer shadow-sm"
          >
            <action.icon className="w-4 h-4" /> {action.label}
          </button>
        ))}
      </div>

      {/* 3. Career Progress & Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Career Progress Module (Takes 2 cols) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div>
            <div className="flex items-center gap-2 font-bold text-sm mb-1 text-blue-100">
              <TrendingUp className="w-4 h-4" /> Career Progress
            </div>
            <h3 className="text-2xl font-black mb-1">Software Engineer</h3>
            <p className="text-xs text-blue-200">Current Level: Class 12th</p>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span>Career Readiness</span>
              <span>45%</span>
            </div>
            <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-blue-200 mt-2 font-medium">
              <span>Aptitude Score: 850</span>
              <span>Skills Match: Good</span>
            </div>
          </div>
        </div>

        {/* Career Match */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm mb-4">
            <div className="p-1.5 bg-blue-50 rounded-lg"><Target className="w-4 h-4 text-blue-600" /></div>
            Career Match
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-black text-slate-900">82%</div>
              <div className="text-emerald-500 font-bold text-xs mt-1">Great Match! 🎉</div>
            </div>
          </div>
        </div>

        {/* Colleges Shortlisted */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm mb-4">
            <div className="p-1.5 bg-purple-50 rounded-lg"><Building2 className="w-4 h-4 text-purple-600" /></div>
            Colleges
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-black text-slate-900">12</div>
              <div className="text-slate-500 text-xs mt-1">Saved</div>
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm mb-4">
            <div className="p-1.5 bg-emerald-50 rounded-lg"><CalendarDays className="w-4 h-4 text-emerald-600" /></div>
            Exams
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-black text-slate-900">3</div>
              <div className="text-slate-500 text-xs mt-1">Upcoming</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Explore by Categories */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Explore by Categories</h2>
          <button onClick={() => onNavigate('streams')} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <button key={idx} onClick={() => onNavigate('streams')} className="border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-slate-50/50 hover:bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all text-center group cursor-pointer">
              <div className={`p-3 rounded-2xl ${cat.color} group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-[13px]">{cat.name}</h3>
                <p className="text-[10px] text-slate-500 mt-1">{cat.count}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Two Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recommended Careers */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Recommended Careers</h2>
              <button onClick={() => onNavigate('jobs')} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-center justify-between border border-slate-100 p-4 rounded-2xl bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${rec.iconColor} shrink-0`}>
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{rec.name}</h3>
                      <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{rec.desc}</p>
                    </div>
                  </div>
                  <div className={`font-black text-xs ${rec.color} bg-emerald-50 px-2 py-1 rounded-md`}>
                    {rec.match}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Opportunities & Recent Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Latest Opportunities */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-5">Latest Opportunities</h2>
              <div className="space-y-4">
                {opportunities.map((opp, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${opp.color} shrink-0 mt-0.5`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm leading-tight">{opp.title}</h4>
                      <div className="flex gap-2 text-[11px] font-medium mt-1.5">
                        <span className="text-slate-500">{opp.type}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-blue-600">{opp.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Items */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-base font-bold text-slate-900">Recent & Saved</h2>
                <button onClick={() => onNavigate('settings')} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg"><ArrowRight className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                {savedItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-slate-200 transition-colors cursor-pointer">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <item.icon className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-800">{item.title}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{item.type}</div>
                    </div>
                    <div className="ml-auto">
                      <Bookmark className="w-4 h-4 text-blue-600 fill-blue-600/20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* Profile Completion */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4">Profile Status</h2>
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-black text-blue-600">43%</span>
              <span className="text-xs font-bold text-slate-500 mb-1">Incomplete</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '43%' }}></div>
            </div>
            <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
              You are missing <strong>Education Details</strong> and <strong>Location Preferences</strong>. Add them to improve recommendations.
            </p>
            <button onClick={() => onNavigate('settings')} className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs py-2.5 rounded-xl transition-colors">
              Continue Profile
            </button>
          </div>

          {/* Reminders & Deadlines */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-500" /> Reminders
            </h2>
            <div className="space-y-4">
              {reminders.map((rem, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1 rounded-full ${rem.urgent ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400'}`}>
                    {rem.urgent ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${rem.urgent ? 'text-slate-900' : 'text-slate-600'}`}>{rem.title}</div>
                    <div className={`text-[10px] font-bold mt-0.5 ${rem.urgent ? 'text-rose-600' : 'text-slate-400'}`}>{rem.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Counselor Banner */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="bg-white/10 w-fit p-3 rounded-2xl mb-4 backdrop-blur-md border border-white/10">
              <Bot className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">Need Guidance?</h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Chat with our AI Counselor for personalized college, course, and exam recommendations based on your profile.
            </p>
            <button onClick={onOpenCounselor} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-sm py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
              Ask AI Counselor
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
