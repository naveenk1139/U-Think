import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  Map, 
  Building2, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Users, 
  Target, 
  Bookmark, 
  Bell, 
  Heart, 
  Settings,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const NavItem = ({ icon: Icon, label, path }: { icon: any, label: string, path: string }) => (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
        isActive(path) 
          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive(path) ? 'text-white' : 'text-slate-400'}`} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="w-64 h-screen bg-slate-50 border-r border-slate-200 flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <img 
          src="/logo.png" 
          alt="U THINK Logo" 
          className="h-12 w-auto object-contain drop-shadow-sm"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loops
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%232563eb' rx='20'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='white'%3EUT%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="flex flex-col">
          <span className="text-lg font-black font-sans text-slate-900 tracking-tight whitespace-nowrap">
            U THINK
          </span>
          <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
            Post-10th Guide
          </span>
        </div>
      </div>

      <div className="flex-1 px-4 space-y-6">
        {/* Primary Navigation */}
        <div className="space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" />
          <NavItem icon={Home} label="Explore Home" path="/" />
          <NavItem icon={Map} label="Pathways & Streams" path="/streams" />
          <NavItem icon={Building2} label="Colleges" path="/colleges" />
          <NavItem icon={GraduationCap} label="Exams & Degrees" path="/exams" />
          <NavItem icon={Award} label="Aptitude Assessment" path="/quiz" />
          <NavItem icon={Briefcase} label="Job Explorer" path="/jobs" />
          <NavItem icon={Users} label="Industry Mentors" path="/mentorship" />
        </div>

        {/* Secondary Navigation */}
        <div className="pt-4 border-t border-slate-200 space-y-1">
          <NavItem icon={Target} label="Aptitude Test" path="/quiz" />
          <NavItem icon={Bookmark} label="Saved Jobs" path="/saved-jobs" />
          <NavItem icon={Bell} label="Reminders" path="/reminders" />
          <NavItem icon={Heart} label="Interests" path="/interests" />
          <NavItem icon={Settings} label="Settings" path="/settings" />
        </div>
      </div>

      {/* Profile Completion Widget */}
      <div className="p-4 mt-auto">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-900">Complete Your Profile</h4>
            <UserCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mb-2 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '43%' }}></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-3">
            <span className="text-blue-600">43%</span>
            <span>Complete</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight mb-3">
            Complete your profile to get better AI recommendations.
          </p>
          <button className="w-full text-xs font-bold text-blue-600 flex items-center justify-center gap-1 hover:text-blue-700 transition-colors cursor-pointer">
            Continue Profile <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
