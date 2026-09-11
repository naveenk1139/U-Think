import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, LogOut, Loader2, ArrowRight, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../api/axios';

interface SearchResult {
  type: string;
  name: string;
  slug: string;
}

export default function TopBar() {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const res = await api.get(`/api/pathways/search?q=${searchQuery}`);
          setSearchResults(res.data);
          setShowSearchResults(true);
        } catch (error) {
          console.error(error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchResultClick = (result: SearchResult) => {
    setShowSearchResults(false);
    setSearchQuery('');
    
    switch(result.type) {
      case 'Pathway':
      case 'Stream':
        navigate(`/pathways`);
        break;
      case 'Course':
        navigate(`/courses/${result.slug}`);
        break;
      case 'Branch':
        navigate(`/branches/${result.slug}`);
        break;
      case 'Career':
        navigate(`/jobs`);
        break;
      default:
        break;
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'After 10th', path: '/streams' },
    { name: 'After 12th', path: '/pathways/after-12th' },
    { name: 'Exams', path: '/exams' },
    { name: 'Colleges', path: '/colleges' },
    { name: 'Careers', path: '/jobs' },
    { name: 'Resources', path: '/professional-courses' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="h-20 bg-[#071225] text-white border-b border-[#162A48] px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 w-full z-50">
      
      {/* Logo Area */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => navigate('/')}>
          <img 
            src="/logo.png" 
            alt="6 ASTRA Logo" 
            className="h-10 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%232563eb' rx='20'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='white'%3E6A%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="flex flex-col hidden sm:flex">
            <span className="text-lg font-black font-sans tracking-tight leading-none">
              6 ASTRA
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              AI-Powered Education & Career Guidance
            </span>
          </div>
        </div>

        {/* Horizontal Navigation */}
        <nav className="hidden lg:flex items-center gap-1 ml-4 border-l border-[#162A48] pl-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive(link.path)
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="hidden md:block relative w-64 lg:w-80" ref={searchContainerRef}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => {
              if (searchResults.length > 0) setShowSearchResults(true);
            }}
            className="block w-full pl-9 pr-8 py-2 bg-[#111F35] border border-[#243A5A] rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="Search streams, courses, careers..."
          />
          {isSearching && (
             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
             </div>
          )}
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-12 right-0 w-full max-w-lg bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="p-2 max-h-80 overflow-y-auto">
                {searchResults.map((result, idx) => (
                  <button
                     key={idx}
                     onClick={() => handleSearchResultClick(result)}
                     className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-xl flex items-center justify-between group transition-colors"
                  >
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{result.name}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-0.5">{result.type}</span>
                     </div>
                     <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-600 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button className="p-2 text-gray-300 hover:text-white transition-colors cursor-pointer hidden sm:block">
          <Moon className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="relative ml-2" ref={dropdownRef}>
          <div 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden bg-blue-600 shrink-0 border border-blue-500">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                  {(currentUser?.displayName || currentUser?.name || 'N').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100 mb-2">
                <p className="text-sm font-bold text-gray-900 truncate">{currentUser?.displayName || currentUser?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser?.email || 'user@example.com'}</p>
              </div>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                  navigate('/login');
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
