import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, BookOpen, Award, Briefcase, Users, MessageSquareCode, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onOpenCounselor: () => void;
}

export default function Header({ onOpenCounselor }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [customPhotoURL, setCustomPhotoURL] = useState(localStorage.getItem('custom_photo_url') || null);

  useEffect(() => {
    const handleProfileUpdate = () => {
      setCustomPhotoURL(localStorage.getItem('custom_photo_url'));
    };
    window.addEventListener('profile_updated', handleProfileUpdate);
    return () => window.removeEventListener('profile_updated', handleProfileUpdate);
  }, []);

  // Derive active tab from URL
  const activeTab = location.pathname.replace('/', '') || 'home';

  const navItems = [
    { id: 'home', label: 'Home Feed', icon: HomeIcon, path: '/' },
    { id: 'streams', label: 'Pathways & Streams', icon: BookOpen, path: '/streams' },
    { id: 'exams', label: 'Exams & Degrees', icon: GraduationCap, path: '/exams' },
    { id: 'quiz', label: 'Aptitude Assessment', icon: Award, path: '/quiz' },
    { id: 'jobs', label: 'Job Explorer', icon: Briefcase, path: '/jobs' },
    { id: 'mentorship', label: 'Industry Mentors', icon: Users, path: '/mentorship' },
  ];

  const goTo = (path: string) => navigate(path);

  const displayName = currentUser?.name || 'User';
  const avatarSrc = customPhotoURL || currentUser?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=2563EB&color=fff&size=64`;

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => goTo('/')}>
            <img 
              src="/logo.png" 
              alt="U THINK Logo" 
              className="h-16 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loops
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 100'%3E%3Crect width='400' height='100' fill='%232563eb' rx='20'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='32' font-weight='bold' fill='white'%3EU THINK GUIDE%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id ||
                (item.id === 'exams' && (activeTab === 'degrees' || activeTab === 'specializations' || activeTab === 'specialization_detail'));
              return (
                <button
                  id={`nav-${item.id}`}
                  key={item.id}
                  onClick={() => goTo(item.path)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: User & AI Counselor */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-3 pr-2 border-r border-slate-200 shrink-0">
                <img
                  onClick={() => goTo('/dashboard')}
                  src={avatarSrc}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-blue-100 shrink-0 cursor-pointer object-cover"
                />
                <div className="flex flex-col items-start justify-center shrink-0">
                  <button
                    onClick={() => goTo('/dashboard')}
                    className="text-sm font-bold text-slate-700 hover:text-blue-600 cursor-pointer transition-colors leading-tight whitespace-nowrap"
                  >
                    {displayName}
                  </button>
                  <button
                    onClick={logout}
                    className="text-[11px] font-semibold text-slate-500 hover:text-red-600 cursor-pointer transition-colors whitespace-nowrap"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => goTo('/login')}
                className="hidden sm:block text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            <button
              id="btn-trigger-counselor"
              onClick={onOpenCounselor}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            >
              <MessageSquareCode className="h-4 w-4 text-emerald-400 shrink-0" />
              Ask AI Counselor
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden bg-slate-50 border-t border-slate-100 overflow-x-auto">
        <div className="flex items-center px-4 py-2 gap-2 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id ||
              (item.id === 'exams' && (activeTab === 'degrees' || activeTab === 'specializations' || activeTab === 'specialization_detail'));
            return (
              <button
                id={`nav-mobile-${item.id}`}
                key={item.id}
                onClick={() => goTo(item.path)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
