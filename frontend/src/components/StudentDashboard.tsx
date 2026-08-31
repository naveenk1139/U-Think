import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Target, TrendingUp, Award, Building2, CalendarDays, 
  Briefcase, BookOpen, Bell, ArrowRight, Bot, Bookmark,
  Heart, CheckCircle, Clock, Map, Star, GraduationCap, Send, MessageSquare, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSavedJobs } from '../api/savedJobs';

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const userName = currentUser?.displayName || currentUser?.name || 'Sanjay';
  const educationLevel = currentUser?.educationLevel || 'Undergraduate';

  const [jobStats, setJobStats] = React.useState({
    saved: 0,
    applied: 0,
    interviews: 0,
    offers: 0
  });

  React.useEffect(() => {
    getSavedJobs().then(res => {
      if (res.data?.success) {
        const jobs = res.data.data;
        setJobStats({
          saved: jobs.length,
          applied: jobs.filter((j: any) => j.status === 'Applied' || j.status === 'Interview' || j.status === 'Assessment' || j.status === 'Offer' || j.status === 'Rejected').length,
          interviews: jobs.filter((j: any) => j.status === 'Interview').length,
          offers: jobs.filter((j: any) => j.status === 'Offer').length,
        });
      }
    }).catch(console.error);
  }, []);

  // Job metrics dynamically populated from backend
  const stats = [
    { label: 'Saved Jobs', value: jobStats.saved.toString(), icon: Bookmark, color: 'text-indigo-600', path: '/saved-jobs' },
    { label: 'Applications', value: jobStats.applied.toString(), icon: Send, color: 'text-primary', path: '/saved-jobs' },
    { label: 'Interviews', value: jobStats.interviews.toString(), icon: MessageSquare, color: 'text-amber-600', path: '/saved-jobs' },
    { label: 'Offers', value: jobStats.offers.toString(), icon: Trophy, color: 'text-emerald-600', path: '/saved-jobs' },
  ];

  return (
    <div className="space-y-6 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* 1. Profile Overview (Top Section) */}
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-indigo-100 flex items-center justify-center">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-black text-indigo-500">{userName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none border-2 border-white">
              PRO
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-text-primary">{userName}</h1>
              <span className="text-sm font-bold text-text-muted pb-1">{educationLevel}</span>
            </div>
            <div className="text-sm font-bold text-text-secondary flex items-center justify-center md:justify-start gap-1">
              Aspiring Engineer <div className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-1"></div>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="px-3 py-1 bg-background-secondary text-text-secondary text-[10px] font-bold rounded-lg">Engineering</span>
              <span className="px-3 py-1 bg-background-secondary text-text-secondary text-[10px] font-bold rounded-lg">AI</span>
              <span className="px-3 py-1 bg-background-secondary text-text-secondary text-[10px] font-bold rounded-lg">Tech</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary-hover rounded-xl font-bold text-sm border border-blue-100">
              <Target className="w-4 h-4" /> Target: GATE EXAM
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl font-bold text-sm border border-amber-100">
              <TrendingUp className="w-4 h-4" /> Profile Strength: 43%
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} onClick={() => navigate(stat.path)} className="bg-card border border-border rounded-2xl p-5 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none flex items-center justify-between group hover:border-blue-200 transition-colors cursor-pointer">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">
                <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} /> {stat.label}
              </div>
              <div className="text-2xl font-black text-text-primary">{stat.value}</div>
            </div>
            <button className="text-[10px] font-bold text-text-muted group-hover:text-primary transition-colors">VIEW &rarr;</button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Profile Completion */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" /> Profile Completion
              </h2>
              <span className="text-xs font-black text-primary">{currentUser?.profileCompletion || 43}% Complete</span>
            </div>
            <div className="w-full bg-background-secondary h-2.5 rounded-full overflow-hidden mb-3">
              <div className="bg-primary h-full rounded-full" style={{ width: `${currentUser?.profileCompletion || 43}%` }}></div>
            </div>
            <p className="text-[10px] text-text-muted font-medium">Complete your profile to unlock better AI recommendations and detailed career path analysis.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Career Progress */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
              <h2 className="text-sm font-bold text-text-primary mb-5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" /> Career Progress
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-text-secondary mb-1.5">
                    <span>Education Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-background-secondary h-1.5 rounded-full"><div className="bg-indigo-500 h-full rounded-full" style={{ width: '75%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-text-secondary mb-1.5">
                    <span>Skills Acquired</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-background-secondary h-1.5 rounded-full"><div className="bg-indigo-500 h-full rounded-full" style={{ width: '40%' }}></div></div>
                </div>
                <div className="pt-2">
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Career Goal</div>
                  <div className="text-sm font-black text-text-primary">{currentUser?.careerGoal || 'Senior Data Scientist'}</div>
                </div>
              </div>
            </div>

            {/* Aptitude Assessment */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
              <h2 className="text-sm font-bold text-text-primary mb-5 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> Aptitude Results
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full border-4 border-amber-100 flex items-center justify-center shrink-0">
                  <span className="text-lg font-black text-amber-600">850</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-500">Excellent Score</div>
                  <div className="text-[10px] text-text-muted mt-1">Tested on 12 Aug 2026</div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">Logical +</span>
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">Analytical +</span>
                <span className="px-2 py-1 bg-rose-50 text-rose-700 text-[10px] font-bold rounded">Verbal -</span>
              </div>
            </div>
          </div>

          {/* Career Match & Top Pathway */}
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              
              <div>
                <h2 className="text-sm font-bold text-blue-300 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Career Match
                </h2>
                <div className="text-3xl font-black text-white mb-1">{currentUser?.targetExam || 'Software Engineer'}</div>
                <div className="text-emerald-400 font-bold text-xs mb-4">92% Match • High Demand</div>
                <p className="text-xs text-text-muted leading-relaxed max-w-sm">Based on your aptitude and interests, this career offers the best growth and matches your skill profile perfectly.</p>
              </div>

              <div className="pt-6 md:pt-0 md:pl-8">
                <h2 className="text-sm font-bold text-purple-300 mb-2 flex items-center gap-2">
                  <Map className="w-4 h-4" /> Top Pathway
                </h2>
                <div className="text-xl font-black text-white mb-2">B.Tech in Computer Science</div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Complete 12th (PCM)
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <CheckCircle className="w-3.5 h-3.5 text-text-muted" /> Clear JEE Mains
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <CheckCircle className="w-3.5 h-3.5 text-text-muted" /> Enroll in Top NIT/IIT
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Explorer */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-500" /> Recommended Jobs
              </h2>
              <button className="text-xs font-bold text-primary hover:underline">View Job Explorer</button>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Junior Data Analyst', company: 'Google', match: '88%', location: 'Bangalore' },
                { title: 'Frontend Developer', company: 'Microsoft', match: '85%', location: 'Remote' },
              ].map((job, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-card rounded-lg border border-border flex items-center justify-center shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
                      <Briefcase className="w-5 h-5 text-text-muted" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-text-primary">{job.title}</div>
                      <div className="text-[10px] font-semibold text-text-muted mt-0.5">{job.company} • {job.location}</div>
                    </div>
                  </div>
                  <div className="text-xs font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">
                    {job.match}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* Reminders & Deadlines */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <h2 className="text-sm font-bold text-text-primary mb-5 flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-500" /> Reminders & Deadlines
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded-full bg-rose-100 text-rose-600">
                  <Clock className="w-3 h-3" />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary">JEE Mains Registration</div>
                  <div className="text-[10px] font-bold text-rose-600 mt-0.5">Closes Tomorrow</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded-full bg-amber-100 text-amber-600">
                  <Clock className="w-3 h-3" />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary">VITEEE Mock Test</div>
                  <div className="text-[10px] font-bold text-amber-600 mt-0.5">In 3 days</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Counselor Banner */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="bg-card/20 w-fit p-2.5 rounded-xl mb-4 backdrop-blur-sm border border-white/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base font-bold mb-2">AI Career Counselor</h3>
            <p className="text-xs text-indigo-100 mb-5 leading-relaxed">
              Get instant, personalized guidance for your exams, colleges, and career path based on your exact profile.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-counselor-with-context'))}
              className="w-full bg-card text-indigo-600 font-bold text-xs py-3 rounded-xl shadow-lg hover:bg-background transition-colors cursor-pointer"
            >
              Chat with AI
            </button>
          </div>

          {/* Saved Items */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
            <h2 className="text-sm font-bold text-text-primary mb-5 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-500" /> Recent Saved Items
            </h2>
            <div className="space-y-3">
              {[
                { title: 'IIT Madras', type: 'College', icon: Building2 },
                { title: 'GATE 2026', type: 'Exam', icon: CalendarDays },
                { title: 'Cybersecurity', type: 'Career', icon: Target },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
                  <div className="p-2 bg-card rounded-lg shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none">
                    <item.icon className="w-4 h-4 text-text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-text-primary">{item.title}</div>
                    <div className="text-[9px] font-bold text-text-muted mt-0.5 uppercase tracking-wider">{item.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
