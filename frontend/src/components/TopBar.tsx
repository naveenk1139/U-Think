import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, LogOut, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
          const res = await axios.get(`http://localhost:5000/api/pathways/search?q=${searchQuery}`);
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

  return (
    <div className="h-20 bg-background-secondary border-b border-border px-8 flex items-center justify-between sticky top-0 z-40">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl" ref={searchContainerRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-muted" />
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
            className="block w-full pl-11 pr-10 py-3 bg-input border border-input-border rounded-2xl text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Search careers, courses, branches..."
          />
          {isSearching && (
             <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
             </div>
          )}
        </div>
        
        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-16 w-full max-w-2xl bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
            <div className="p-2">
              {searchResults.map((result, idx) => (
                <button
                   key={idx}
                   onClick={() => handleSearchResultClick(result)}
                   className="w-full text-left px-4 py-3 hover:bg-background-secondary rounded-xl flex items-center justify-between group transition-colors"
                >
                   <div className="flex flex-col">
                      <span className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{result.name}</span>
                      <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider mt-0.5">{result.type}</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 ml-4">
        {/* Notifications */}
        <button className="relative p-2 text-text-muted hover:text-text-secondary transition-colors cursor-pointer">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-border"></span>
        </button>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 cursor-pointer pl-6 border-l border-border"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 shrink-0">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold text-lg">
                  {(currentUser?.displayName || currentUser?.name || 'K').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-bold text-text-primary leading-tight">
                {currentUser?.displayName || currentUser?.name || 'kiran'}
              </span>
              <span className="text-[10px] text-text-muted font-medium">
                {currentUser?.educationLevel || 'Class 12th'}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-text-muted hidden md:block" />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-card border border-border rounded-xl shadow-lg py-2 z-50">
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
