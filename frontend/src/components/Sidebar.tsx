import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Compass, Building2, BookOpen, Search, Target, LayoutDashboard,
  Users, Award, Settings, Bell, Heart, CheckCircle, GraduationCap, Briefcase, Bookmark, ArrowRight, User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { currentUser } = useAuth();
  
  const mainMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Home, label: 'Explore Home', path: '/' },
    { icon: Compass, label: 'Pathways & Streams', path: '/streams' },
    { icon: Building2, label: 'Colleges', path: '/colleges' },
    { icon: GraduationCap, label: 'Exams & Degrees', path: '/exams' },
    { icon: Award, label: 'Aptitude Assessment', path: '/quiz' },
    { icon: Briefcase, label: 'Job Explorer', path: '/jobs' },
    { icon: Users, label: 'Industry Mentors', path: '/mentorship' },
    { icon: BookOpen, label: 'Professional Courses', path: '/professional-courses' },
  ];

  const yourSpaceItems = [
    { icon: Target, label: 'Aptitude Test', path: '/quiz' },
    { icon: Bookmark, label: 'Saved Jobs', path: '/saved-jobs' },
    { icon: Bell, label: 'Reminders', path: '/reminders' },
    { icon: Heart, label: 'Interests', path: '/interests' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto hidden xl:flex flex-col z-30 font-sans shadow-sm">
      <div className="flex-1 py-6 px-4 space-y-8">
        
        {/* MAIN MENU */}
        <div>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-3">Main Menu</h3>
          <nav className="space-y-1">
            {mainMenuItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                    {isActive && <div className="ml-auto w-1 h-1 rounded-full bg-blue-600" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* YOUR SPACE */}
        <div>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-3">Your Space</h3>
          <nav className="space-y-1">
            {yourSpaceItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
      </div>
      
      {/* Profile Completion Widget */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 mt-auto">
         <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black text-gray-900 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" /> Complete Your Profile
              </h4>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="text-xl font-black text-blue-600 leading-none">
                {currentUser?.profileCompletion || 66}%
              </div>
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${currentUser?.profileCompletion || 66}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-[9px] text-gray-500 font-medium mb-3 leading-tight">
              Complete your profile to get better recommendations.
            </p>
            
            <button className="text-blue-600 hover:text-blue-700 text-[10px] font-bold transition-colors flex items-center gap-1">
              Continue Profile <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
      </div>
    </aside>
  );
}
