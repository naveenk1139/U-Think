import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2, BookOpen, GraduationCap, Building, Target, Briefcase, Map } from 'lucide-react';
import axios from '../api/axios'; // Or use native axios if not configured

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/search?q=${encodeURIComponent(query)}`);
        setResults(response.data.results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Pathway': return <Map className="w-4 h-4 text-purple-500" />;
      case 'Stream': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'Trade': return <BookOpen className="w-4 h-4 text-orange-500" />;
      case 'Course': return <GraduationCap className="w-4 h-4 text-emerald-500" />;
      case 'Branch': return <GraduationCap className="w-4 h-4 text-teal-500" />;
      case 'Institution': return <Building className="w-4 h-4 text-indigo-500" />;
      case 'Exam': return <Target className="w-4 h-4 text-red-500" />;
      case 'Career': return <Briefcase className="w-4 h-4 text-amber-500" />;
      default: return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(url);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search courses, colleges..."
          className="w-full sm:w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setResults([]); }}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && query && (
        <div className="absolute top-full mt-2 w-full sm:w-96 right-0 sm:right-auto bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="max-h-96 overflow-y-auto p-2">
            {loading ? (
              <div className="flex items-center justify-center py-8 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result._id}`}
                    onClick={() => handleSelect(result.url)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-left transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-sm font-bold text-gray-900 truncate">{result.name}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{result.type}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-sm font-medium text-gray-500">
                No results found for "{query}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
