import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MapPin, Building2, GraduationCap, DollarSign, 
  Award, Heart, Share2, ChevronRight, CheckCircle, BookOpen,
  Briefcase, Star, Clock, X, Map, Bell, GitCompare, ShieldCheck, Zap, Bot, Loader2, BadgeCheck, ExternalLink, Navigation, Compass, SlidersHorizontal, List as ListIcon, Map as MapIcon, Info, Sparkles
} from 'lucide-react';
import { fetchColleges, fetchAiRecommendations, fetchCollegeStats, fetchDistrictStats, fetchFilterOptions, fetchDistricts, College } from '../api/collegeApi';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function CollegesDirectory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters State
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedTaluk, setSelectedTaluk] = useState('All Taluks');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedEducationLevels, setSelectedEducationLevels] = useState<string[]>([]);
  const [selectedInstitutionTypes, setSelectedInstitutionTypes] = useState<string[]>([]);
  const [selectedCourseCategories, setSelectedCourseCategories] = useState<string[]>([]);
  const [selectedEntranceExam, setSelectedEntranceExam] = useState('Any Exam');
  const [feeRange, setFeeRange] = useState(10000000);
  
  const [sortBy, setSortBy] = useState('Relevance');
  const [viewMode, setViewMode] = useState<'List' | 'Map'>('List');
  
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  const [colleges, setColleges] = useState<College[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCollegesCount, setTotalCollegesCount] = useState(0);
  const [aiScores, setAiScores] = useState<Record<string, {score: number, rationale: string}>>({});
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { currentUser } = useAuth();
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  
  const [districtStatsList, setDistrictStatsList] = useState<any[]>([]);
  const [filterOptionsData, setFilterOptionsData] = useState<any>(null);
  const [districtsList, setDistrictsList] = useState<any[]>([]);
  const [taluksList, setTaluksList] = useState<any[]>([]);
  const [searchCourse, setSearchCourse] = useState('');

  // Maps configuration
  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });
  const [selectedMapCollege, setSelectedMapCollege] = useState<College | null>(null);

  const openOfficialWebsite = (url: string | undefined, e: React.MouseEvent) => {
    e.stopPropagation();
    if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const openMaps = (college: College, e: React.MouseEvent) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${college.name} ${college.city || ''} ${college.district || ''}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  useEffect(() => {
    const params: any = {};
    if (searchQuery) params.q = searchQuery;
    // Apply relevant filters to stats fetch if needed
    fetchCollegeStats(params).then(setStats).catch(console.error);
    fetchDistrictStats().then(data => setDistrictStatsList(data.districts)).catch(console.error);
    fetchFilterOptions().then(setFilterOptionsData).catch(console.error);
    fetchDistricts().then(setDistrictsList).catch(console.error);
  }, [searchQuery]);

  useEffect(() => {
    if (selectedDistrict !== 'All Districts') {
      const dist = districtsList.find(d => d.name === selectedDistrict);
      if (dist) {
        import('../api/collegeApi').then(({ fetchTaluks }) => {
          fetchTaluks(dist._id).then(setTaluksList).catch(console.error);
        });
      }
    } else {
      setTaluksList([]);
      setSelectedTaluk('All Taluks');
    }
  }, [selectedDistrict, districtsList]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedDistrict, selectedTaluk, selectedCity, selectedEducationLevels, selectedInstitutionTypes, selectedCourseCategories, selectedEntranceExam, feeRange, searchCourse]);

  useEffect(() => {
    const loadColleges = async () => {
      setIsLoading(true);
      try {
        const params: any = {
          q: searchQuery,
          district: selectedDistrict !== 'All Districts' ? selectedDistrict : undefined,
          taluk: selectedTaluk !== 'All Taluks' ? selectedTaluk : undefined,
          city: selectedCity !== 'All Cities' ? selectedCity : undefined,
          course: searchCourse || undefined,
          education_level: selectedEducationLevels.length > 0 ? selectedEducationLevels.join(',') : undefined,
          type: selectedInstitutionTypes.length > 0 ? selectedInstitutionTypes.join(',') : undefined,
          category: selectedCourseCategories.length > 0 ? selectedCourseCategories.join(',') : undefined,
          sortBy: sortBy,
          page: page,
          limit: 20
        };
        const response = await import('../api/collegeApi').then(m => m.fetchColleges(params));
        setColleges(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalCollegesCount(response.pagination?.total || 0);
      } catch (error) {
        console.error('Failed to fetch colleges:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      loadColleges();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedDistrict, selectedTaluk, selectedCity, selectedEducationLevels, selectedInstitutionTypes, selectedCourseCategories, sortBy, page, searchCourse]);

  const toggleFilter = (setFilter: React.Dispatch<React.SetStateAction<string[]>>, filterList: string[], value: string) => {
    if (filterList.includes(value)) {
      setFilter(filterList.filter(item => item !== value));
    } else {
      setFilter([...filterList, value]);
    }
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedColleges(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(c => c !== id));
    } else if (compareList.length < 4) {
      setCompareList(prev => [...prev, id]);
    } else {
      console.warn("You can only compare up to 4 colleges.");
    }
  };

  const handleAiRecommendClick = async () => {
    if (colleges.length === 0) return;
    
    setIsAiThinking(true);
    try {
      const collegesToScore = colleges.slice(0, 50);
      const scores = await fetchAiRecommendations(currentUser, collegesToScore);
      setAiScores(scores);
      setSortBy('AI Match Score');
    } catch (error) {
      console.error('Failed to fetch AI recommendations:', error);
      setAiError('AI recommendations are temporarily unavailable.');
      setSortBy('Relevance');
    } finally {
      setIsAiThinking(false);
    }
  };

  const getCount = (arr: any[], name: string) => arr?.find(item => item.name === name)?.count || 0;
  const getCountByStartsWith = (arr: any[], prefix: string) => arr?.find(item => item.name.startsWith(prefix))?.count || 0;

  const educationLevels = [
    { label: 'After 10th (PUC, Diploma, ITI)', value: 'After 10th', count: getCountByStartsWith(filterOptionsData?.educationLevels, 'After 10th') },
    { label: 'After 12th (UG)', value: 'After 12th', count: getCountByStartsWith(filterOptionsData?.educationLevels, 'After 12th') },
    { label: 'Postgraduate (PG)', value: 'Postgraduate', count: getCountByStartsWith(filterOptionsData?.educationLevels, 'Postgraduate') },
    { label: 'Professional (Medical, Law etc.)', value: 'Professional', count: getCountByStartsWith(filterOptionsData?.educationLevels, 'Professional') },
    { label: 'Research (PhD)', value: 'Research', count: getCountByStartsWith(filterOptionsData?.educationLevels, 'Research') }
  ];

  const institutionTypes = [
    { label: 'University', value: 'University', count: getCount(filterOptionsData?.types, 'University') },
    { label: 'Government College', value: 'Government', count: getCount(filterOptionsData?.types, 'Government') },
    { label: 'Private College', value: 'Private', count: getCount(filterOptionsData?.types, 'Private') },
    { label: 'Autonomous', value: 'Autonomous', count: getCount(filterOptionsData?.types, 'Autonomous') }
  ];

  const courseCategories = [
    { label: 'Engineering', value: 'Engineering', count: getCount(filterOptionsData?.categories, 'Engineering') },
    { label: 'Medical', value: 'Medical', count: getCount(filterOptionsData?.categories, 'Medical') },
    { label: 'Nursing', value: 'Nursing', count: getCount(filterOptionsData?.categories, 'Nursing') },
    { label: 'Pharmacy', value: 'Pharmacy', count: getCount(filterOptionsData?.categories, 'Pharmacy') },
    { label: 'Management', value: 'Management', count: getCount(filterOptionsData?.categories, 'Management') }
  ];

  const topDistricts = districtStatsList.slice(0, 5).map((d: any) => ({
    name: d.district,
    count: d.institutionCount
  }));

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-10">
      
      {/* 1. Hero Banner */}
      <div className="w-full relative h-[380px] bg-slate-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        
        <div className="max-w-[1536px] mx-auto px-4 md:px-8 h-full relative z-10 flex flex-col justify-center pt-8">
          
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 w-full">
            {/* Left Side Content */}
            <div className="w-full lg:w-2/3 xl:w-3/5">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Explore Colleges in Karnataka</h1>
              <p className="text-slate-300 text-base md:text-lg mb-6">Discover verified colleges, institutes and courses across all 31 districts of Karnataka.</p>
              
              {/* Pill Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button className="px-5 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full">All</button>
                {['After 10th', 'After 12th', 'Diploma', 'ITI', 'Degree', 'Postgraduate', 'Professional', 'Research'].map(tab => (
                  <button key={tab} className="px-5 py-1.5 bg-white text-slate-700 hover:bg-slate-100 text-sm font-bold rounded-full transition-colors">
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-xl p-1.5 flex items-center w-full max-w-4xl shadow-xl">
                <div className="flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search college name, course, city, district or exam..." 
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 py-3 px-3 font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['Engineering in Bengaluru', 'Nursing colleges', 'Diploma in Mysuru', 'BCA in Mangaluru', 'Medical colleges', 'ITI in Hubballi'].map(tag => (
                  <button key={tag} className="px-3 py-1 bg-slate-800/60 backdrop-blur-sm border border-slate-700 text-slate-300 text-xs font-semibold rounded-full hover:bg-slate-700 transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side Stats Panel */}
            <div className="hidden lg:flex flex-col gap-3 w-[400px]">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Building2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-white leading-none">{stats?.total?.toLocaleString() || 0}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Colleges & Institutes</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-white leading-none">{stats?.totalDistricts || 0}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Districts</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <BookOpen className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-white leading-none">{stats?.totalCourses || 0}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Courses</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col justify-center">
                  <div className="flex items-start gap-2 mb-1">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">Verified Data</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">From AISHE, KEA, DTE & Official Sources</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Button */}
              <button className="bg-slate-900/40 backdrop-blur-md border border-white/10 hover:bg-slate-800/60 rounded-xl p-4 flex items-center justify-between transition-colors group">
                <div className="text-left">
                  <div className="text-lg font-black text-white">Karnataka</div>
                  <div className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1 mt-0.5">
                    Explore by District <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
                {/* Silhouette Placeholder */}
                <div className="w-12 h-16 opacity-60">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-blue-400">
                    <path d="M45.5,10 C48,12 49,15 50,18 C52,22 55,25 58,26 C62,27 65,30 67,34 C69,38 72,40 75,41 C78,42 80,45 80,49 C80,52 79,56 77,59 C75,63 71,67 69,70 C66,75 62,78 59,81 C55,85 52,88 48,89 C43,90 38,91 34,89 C29,87 25,83 22,79 C18,74 15,69 13,64 C11,59 10,54 11,49 C12,44 14,39 17,35 C20,30 24,26 28,23 C33,20 38,15 42,12 C43.5,11 44.5,10 45.5,10 Z"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="max-w-[1536px] mx-auto px-4 md:px-8 mt-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: FILTERS (col-span-3) */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Filters Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black flex items-center gap-2 text-slate-800">
                <SlidersHorizontal className="w-5 h-5" /> Filters
              </h2>
              <button 
                onClick={() => {
                  setSelectedDistrict('All Districts (31)');
                  setSelectedCity('All Cities');
                  setSelectedEducationLevels([]);
                  setSelectedInstitutionTypes([]);
                  setSelectedCourseCategories([]);
                  setSelectedEntranceExam('Any Exam');
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {/* District, Taluk, City & Course */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">District</label>
                  <select 
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedTaluk('All Taluks'); // Reset Taluk
                    }}
                  >
                    <option>All Districts (31)</option>
                    {districtsList.map(d => (
                      <option key={d._id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Taluk</label>
                  <select 
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm disabled:bg-slate-100 disabled:text-slate-400"
                    value={selectedTaluk}
                    onChange={(e) => setSelectedTaluk(e.target.value)}
                    disabled={selectedDistrict === 'All Districts'}
                  >
                    <option>All Taluks</option>
                    {taluksList.map(t => (
                      <option key={t._id} value={t._id}>{t.name}</option>
                    ))}
                  </select>
                  {selectedDistrict === 'All Districts' && (
                    <p className="text-[10px] text-slate-500 mt-1">Select a district to view taluks</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">City</label>
                  <select 
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option>All Cities</option>
                    <option>Bengaluru</option>
                    <option>Hubballi</option>
                    <option>Mangaluru</option>
                    <option>Mysuru</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Search Course</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="e.g. Computer Science, MBBS" 
                      className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                      value={searchCourse}
                      onChange={(e) => setSearchCourse(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Education Level */}
              <div className="border-t border-slate-200 pt-5">
                <label className="text-xs font-bold text-slate-800 block mb-3 uppercase tracking-wider">Education Level</label>
                <div className="space-y-2.5">
                  {educationLevels.map(level => (
                    <label key={level.value} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={selectedEducationLevels.includes(level.value)}
                          onChange={() => toggleFilter(setSelectedEducationLevels, selectedEducationLevels, level.value)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{level.label}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{level.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Institution Type */}
              <div className="border-t border-slate-200 pt-5">
                <label className="text-xs font-bold text-slate-800 block mb-3 uppercase tracking-wider">Institution Type</label>
                <div className="space-y-2.5">
                  {institutionTypes.map(type => (
                    <label key={type.value} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={selectedInstitutionTypes.includes(type.value)}
                          onChange={() => toggleFilter(setSelectedInstitutionTypes, selectedInstitutionTypes, type.value)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{type.label}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{type.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Course Category */}
              <div className="border-t border-slate-200 pt-5">
                <label className="text-xs font-bold text-slate-800 block mb-3 uppercase tracking-wider">Course Category</label>
                <div className="space-y-2.5">
                  {courseCategories.map(cat => (
                    <label key={cat.value} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={selectedCourseCategories.includes(cat.value)}
                          onChange={() => toggleFilter(setSelectedCourseCategories, selectedCourseCategories, cat.value)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{cat.label}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{cat.count}</span>
                    </label>
                  ))}
                  <button className="text-xs font-bold text-blue-600 mt-1 block">Show more...</button>
                </div>
              </div>

              {/* Fee Range */}
              <div className="border-t border-slate-200 pt-5">
                <label className="text-xs font-bold text-slate-800 block mb-3 uppercase tracking-wider">Fee Range (per year)</label>
                <input 
                  type="range" 
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" 
                  min="0" 
                  max="10000000" 
                  value={feeRange}
                  onChange={(e) => setFeeRange(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-slate-500 font-medium mt-2">
                  <span>Any</span>
                  <span>₹ 10,00,000+</span>
                </div>
              </div>

              {/* Entrance Exam */}
              <div className="border-t border-slate-200 pt-5">
                <label className="text-xs font-bold text-slate-800 block mb-2 uppercase tracking-wider">Entrance Exam</label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                  value={selectedEntranceExam}
                  onChange={(e) => setSelectedEntranceExam(e.target.value)}
                >
                  <option>Any Exam</option>
                  <option>KCET</option>
                  <option>COMEDK UGET</option>
                  <option>NEET UG</option>
                  <option>PGCET</option>
                </select>
              </div>

              {/* Complete Your Profile Widget */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm mt-8">
                <h4 className="text-sm font-black text-slate-800 mb-3">Complete Your Profile</h4>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="flex justify-between text-xs font-bold mb-3">
                  <span className="text-blue-600">100%</span>
                  <span className="text-slate-600">Complete</span>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Get better college recommendations tailored to your background.
                </p>
                <button className="w-full py-2 bg-white border border-slate-300 text-blue-600 hover:bg-slate-50 rounded-lg text-sm font-bold transition-colors">
                  View Profile &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT FEED (col-span-6) */}
          <div className="xl:col-span-6">
            
            {/* Feed Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="text-slate-700 font-medium">
                Showing <span className="font-bold text-slate-900">{totalCollegesCount > 0 ? (page - 1) * 20 + 1 : 0}-{Math.min(page * 20, totalCollegesCount)}</span> of <span className="font-bold text-blue-600">{totalCollegesCount}</span> institutions in Karnataka
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium">Sort by</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 text-sm font-semibold text-slate-800 rounded-lg px-3 py-1.5 outline-none focus:border-blue-500 shadow-sm"
                >
                  <option>Relevance</option>
                  <option>AI Match Score</option>
                  <option>Distance</option>
                  <option>NIRF Ranking</option>
                  <option>Fees: Low to High</option>
                </select>
              </div>
            </div>

            {/* Error Message if AI fails */}
            {aiError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl mb-6 text-sm font-semibold flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  <span>{aiError}</span>
                </div>
                <button onClick={() => setAiError(null)} className="hover:text-rose-800"><X className="w-4 h-4" /></button>
              </div>
            )}

            {/* College Cards Feed */}
            <div className="space-y-5">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                  <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
                  <p className="font-semibold">Loading institutions...</p>
                </div>
              ) : colleges.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-slate-400 bg-white rounded-2xl border border-slate-200">
                  <Building2 className="w-12 h-12 mb-4 text-slate-300" />
                  <p className="font-bold text-lg text-slate-600">No colleges found</p>
                  <p className="text-sm">Try adjusting your filters or search query.</p>
                </div>
              ) : (
                colleges.map((college) => (
                  <div 
                    key={college._id} 
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col sm:flex-row group"
                  >
                    {/* Left: Image */}
                    <Link to={`/colleges/${college.slug || college.sourceId}`} className="w-full sm:w-[220px] h-[200px] sm:h-auto relative shrink-0 block">
                      <img 
                        src={college.image || "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"} 
                        alt={college.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      {/* Photo Badge overlay */}
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {college.district || college.city || 'Karnataka'}
                      </div>
                    </Link>
                    
                    {/* Middle: Details */}
                    <div className="flex-1 p-5 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-slate-100">
                      <div>
                        <Link to={`/colleges/${college.slug || college.sourceId}`}>
                          <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                            {college.name}
                          </h3>
                        </Link>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {college.isVerified !== false && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle className="w-3.5 h-3.5" /> Verified
                            </span>
                          )}
                          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {college.city}{college.district ? `, ${college.district}` : ''}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{college.ownership || college.type || 'Institution'}</span>
                          {college.institutionType && <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{college.institutionType}</span>}
                          {college.categories && college.categories.map((cat, i) => (
                            <span key={i} className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md">{cat}</span>
                          ))}
                        </div>
                        
                        <p className="text-sm font-semibold text-slate-700 line-clamp-1">
                          {college.programs && college.programs.length > 0 
                            ? `${college.programs[0]} (${college.specializations?.slice(0, 5).join(', ')}${college.specializations?.length > 5 ? ` +${college.specializations.length - 5} more` : ''})`
                            : college.courses && college.courses.length > 0
                              ? college.courses.join(', ')
                              : 'Various Courses Available'}
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions & Fees */}
                    <div className="w-full sm:w-[240px] bg-slate-50 p-5 flex flex-col justify-between shrink-0">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Fees (per year)</div>
                          <button 
                            onClick={(e) => toggleSave(college._id, e)}
                            className={`p-1.5 rounded-full transition-colors ${savedColleges.includes(college._id) ? 'bg-rose-100 text-rose-500' : 'text-slate-400 hover:bg-slate-200'}`}
                          >
                            <Heart className="w-5 h-5" fill={savedColleges.includes(college._id) ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <div className="text-base font-black text-slate-900 mb-1">
                          {college.fees?.tuition ? `${college.fees.tuition}` : '₹ 40,000 - 2,50,000'}
                        </div>
                        <div className="text-[10px] font-medium text-slate-400">(Estimated)</div>
                      </div>

                      <div className="space-y-3 mt-6">
                        <div className="flex items-center gap-4 text-xs font-bold">
                          <button 
                            onClick={(e) => openOfficialWebsite(college.officialWebsiteUrl, e)}
                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Official Website
                          </button>
                          <button 
                            onClick={(e) => openMaps(college, e)}
                            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5" /> View on Maps
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-2">
                          <button 
                            onClick={() => navigate(`/colleges/${college.slug || college.sourceId}`)}
                            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                          >
                            View Details
                          </button>
                          <button 
                            onClick={(e) => toggleCompare(college._id, e)}
                            className={`px-3 py-2 border rounded-lg text-sm font-bold transition-colors flex items-center gap-1 ${compareList.includes(college._id) ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                            title="Compare"
                          >
                            <GitCompare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || isLoading}
                  className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl font-bold transition-all disabled:opacity-50 shadow-sm"
                >
                  Previous
                </button>
                
                <div className="hidden sm:flex gap-1.5">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = page;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (page <= 3) pageNum = i + 1;
                    else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = page - 2 + i;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
                          page === pageNum 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || isLoading}
                  className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl font-bold transition-all disabled:opacity-50 shadow-sm"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: MAP & WIDGETS (col-span-3) */}
          <div className="xl:col-span-3 space-y-6 hidden xl:block">
            
            {/* Map Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-bold text-slate-800 text-sm">Colleges in Karnataka</h3>
                <div className="flex bg-slate-200 p-0.5 rounded-lg">
                  <button 
                    onClick={() => setViewMode('List')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold transition-colors ${viewMode === 'List' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <ListIcon className="w-3.5 h-3.5" /> List
                  </button>
                  <button 
                    onClick={() => setViewMode('Map')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold transition-colors ${viewMode === 'Map' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <MapIcon className="w-3.5 h-3.5" /> Map
                  </button>
                </div>
              </div>
              <div className="relative h-[250px] w-full bg-slate-100 cursor-pointer overflow-hidden group">
                {isMapLoaded ? (
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={{ lat: 15.3173, lng: 75.7139 }} // Karnataka center
                    zoom={6}
                    options={{ disableDefaultUI: true, zoomControl: true }}
                  >
                    {colleges.filter(c => c.latitude && c.longitude).map((college) => (
                      <Marker
                        key={college._id}
                        position={{ lat: college.latitude, lng: college.longitude }}
                        onClick={() => setSelectedMapCollege(college)}
                      />
                    ))}
                    {selectedMapCollege && selectedMapCollege.latitude && selectedMapCollege.longitude && (
                      <InfoWindow
                        position={{ lat: selectedMapCollege.latitude, lng: selectedMapCollege.longitude }}
                        onCloseClick={() => setSelectedMapCollege(null)}
                      >
                        <div className="p-2 cursor-pointer" onClick={() => navigate(`/colleges/${selectedMapCollege.slug}`)}>
                          <p className="font-bold text-sm text-blue-600 hover:underline">{selectedMapCollege.name}</p>
                          <p className="text-xs text-gray-500">{selectedMapCollege.district}</p>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Top Districts Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-4">Top Districts by Colleges</h3>
              <div className="space-y-4">
                {topDistricts.map((district, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                      <span>{district.name}</span>
                      <span>{district.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(district.count / 1500) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View All 31 Districts &rarr;
              </button>
            </div>

            {/* AI Recommendations Widget */}
            <div className="bg-white border border-purple-100 rounded-2xl p-5 shadow-sm shadow-purple-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                  <Sparkles className="w-4 h-4" /> AI College Recommendations
                </div>
                <span className="bg-purple-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">New</span>
              </div>
              
              <p className="text-xs text-slate-600 mb-5 leading-relaxed relative z-10 font-medium">
                Get personalized college suggestions based on your profile, marks, interests and budget.
              </p>
              
              <button 
                onClick={handleAiRecommendClick}
                disabled={isAiThinking}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-purple-500/30 flex items-center justify-center gap-2 relative z-10 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAiThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                {isAiThinking ? 'AI is analyzing...' : 'Get AI Recommendations \u2192'}
              </button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Trusted Sources Footer */}
      <div className="max-w-[1536px] mx-auto px-4 md:px-8 mt-12 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 pt-8 border-t border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trusted Data Sources</span>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {['AISHE', 'UGC', 'AICTE', 'DTE Karnataka', 'KEA', 'CollegeDB', 'Official Websites', 'Google Maps'].map(source => (
              <div key={source} className="flex items-center gap-1.5 text-slate-500 font-bold text-sm grayscale hover:grayscale-0 hover:text-blue-600 transition-all cursor-pointer">
                <CheckCircle className="w-4 h-4 opacity-70" /> {source}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
