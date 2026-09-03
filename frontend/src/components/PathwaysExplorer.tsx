import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, ArrowRight, BookOpen, ChevronRight, Briefcase, Filter, TrendingUp, Sparkles, AlertCircle, Building, Wrench, HeartPulse, Layers, Target, Trophy, Building2, ClipboardList, Users, CheckCircle, Target as TargetIcon, PiggyBank, SearchX, MousePointerClick, Activity } from 'lucide-react';
import { getPathwayTree, getPathwayStats, getStreamDetails, searchPathways, EducationLevelData, PathwayStats, StreamData, CourseData } from '../api/pathwayApi';
import { useNavigate, useSearchParams, useParams, Link } from 'react-router-dom';
import PathwayTree from './PathwayTree';
import CourseComparisonModal from './CourseComparisonModal';

const PathwaysExplorer: React.FC = () => {
  const [educationLevels, setEducationLevels] = useState<EducationLevelData[]>([]);
  const [stats, setStats] = useState<PathwayStats | null>(null);
  const [globalStats, setGlobalStats] = useState<PathwayStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { levelSlug, pathwaySlug, streamSlug, comboSlug } = useParams();
  
  const activeLevelSlug = levelSlug || searchParams.get('level') || 'after-10th';
  
  // Try to match slugs to ids for the tree data, since the tree returns populated nested objects
  const [streamDetails, setStreamDetails] = useState<StreamData | null>(null);
  const [loadingStream, setLoadingStream] = useState(false);
  
  // Comparison State
  const [selectedCourses, setSelectedCourses] = useState<CourseData[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    duration: 'Any',
    courseType: 'Any',
    eligibility: 'Any'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const setActiveLevel = (level: string) => {
    navigate(`/pathways/${level}`);
  };

  const navigatePathway = (pathway: string | null) => {
    if (pathway) {
      navigate(`/pathways/${activeLevelSlug}/${pathway}`);
    } else {
      navigate(`/pathways/${activeLevelSlug}`);
    }
  };

  const navigateStream = (stream: string | null) => {
    if (stream) {
      navigate(`/pathways/${activeLevelSlug}/${pathwaySlug}/${stream}`);
    } else {
      navigatePathway(pathwaySlug || null);
    }
  };

  const navigateCombo = (combo: string | null) => {
     if (combo) {
         navigate(`/pathways/${activeLevelSlug}/${pathwaySlug}/${streamSlug}/${combo}`);
     } else {
         navigateStream(streamSlug || null);
     }
  };

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const [treeData, globalStatsData] = await Promise.all([
          getPathwayTree(),
          getPathwayStats()
        ]);
        setEducationLevels(treeData || []);
        setGlobalStats(globalStatsData || null);
      } catch (error) {
        console.error("Failed to fetch global pathways data", error);
      }
    };
    fetchGlobalData();
  }, []);

  useEffect(() => {
    const fetchLevelData = async () => {
      setLoading(true);
      try {
        const levelStatsData = await getPathwayStats(activeLevelSlug);
        setStats(levelStatsData);
      } catch (error) {
        console.error("Failed to fetch level stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLevelData();
  }, [activeLevelSlug]);

  useEffect(() => {
    if (streamSlug) {
      setLoadingStream(true);
      getStreamDetails(streamSlug).then(data => {
        setStreamDetails(data);
        setLoadingStream(false);
      }).catch(err => {
        console.error(err);
        setLoadingStream(false);
      });
    } else {
      setStreamDetails(null);
    }
  }, [streamSlug]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const results = await searchPathways(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error(error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const toggleCourseComparison = (course: CourseData) => {
    setSelectedCourses(prev => {
      const exists = prev.find(c => c._id === course._id);
      if (exists) {
        return prev.filter(c => c._id !== course._id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 courses at a time.");
        return prev;
      }
      return [...prev, course];
    });
  };

  const activeLevel = educationLevels?.find(l => l.slug === activeLevelSlug);
  const activePathway = activeLevel?.pathways?.find(p => p.slug === pathwaySlug);
  
  const selectedCombination = comboSlug && streamDetails?.subjectCombinations 
    ? streamDetails.subjectCombinations.find(c => c.slug === comboSlug) 
    : null;

  // Helper for icons based on name
  const getPathwayIcon = (name: string, index: number) => {
    const n = name.toLowerCase();
    if (n.includes('12') || n.includes('intermediate')) return { icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' };
    if (n.includes('diploma') || n.includes('poly')) return { icon: Building, color: 'text-blue-600', bg: 'bg-blue-100' };
    if (n.includes('iti')) return { icon: Wrench, color: 'text-green-600', bg: 'bg-green-100' };
    if (n.includes('para') || n.includes('med')) return { icon: HeartPulse, color: 'text-rose-600', bg: 'bg-rose-100' };
    if (n.includes('vocational')) return { icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-100' };
    
    // Fallbacks
    const colors = [
      { color: 'text-purple-600', bg: 'bg-purple-100' },
      { color: 'text-blue-600', bg: 'bg-blue-100' },
      { color: 'text-green-600', bg: 'bg-green-100' },
      { color: 'text-rose-600', bg: 'bg-rose-100' },
      { color: 'text-orange-600', bg: 'bg-orange-100' }
    ];
    return { icon: Layers, ...colors[index % colors.length] };
  };

  // Compute local stream stats if viewing stream
  let streamStats = { combos: 0, subjects: 0, courses: 0, branches: 0, careers: 0 };
  if (streamDetails && streamDetails.subjectCombinations) {
      streamStats.combos = streamDetails.subjectCombinations.length;
      const subSet = new Set();
      const courseSet = new Set();
      const branchSet = new Set();
      const careerSet = new Set();
      
      streamDetails.subjectCombinations.forEach(c => {
         c.subjects?.forEach(s => { if (s) subSet.add(s._id) });
         c.ugCourses?.forEach(ug => {
             if (!ug) return;
             courseSet.add(ug._id);
             ug.branches?.forEach(b => {
                 if (!b) return;
                 branchSet.add(b._id);
                 b.relatedCareers?.forEach((rc: any) => { if (rc) careerSet.add(rc._id || rc) });
             });
         });
      });
      streamStats.subjects = subSet.size;
      streamStats.courses = courseSet.size;
      streamStats.branches = branchSet.size;
      streamStats.careers = careerSet.size;
  } else if (streamDetails?.courses) {
      streamStats.courses = streamDetails.courses.length;
      const branchSet = new Set();
      const careerSet = new Set();
      streamDetails.courses.forEach(c => {
          c.branches?.forEach(b => {
              if (!b) return;
              branchSet.add(b._id);
              b.relatedCareers?.forEach((rc: any) => { if (rc) careerSet.add(rc._id || rc) });
          });
      });
      streamStats.branches = branchSet.size;
      streamStats.careers = careerSet.size;
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto w-full">
      
      {/* HERO SECTION */}
      <div className="bg-[#2B3B94] rounded-[24px] p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between mb-8 shadow-sm">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none"></div>

        <div className="text-white max-w-2xl z-10 w-full">
          <h1 className="text-4xl md:text-[42px] font-bold mb-4 leading-[1.1] tracking-tight">
            Explore Post-10th<br/>Pathways & Streams
          </h1>
          <p className="text-blue-100/90 mb-8 max-w-xl text-sm leading-relaxed pr-8">
            Choose the right education pathway after 10th. Compare 12th, Diploma, ITI, Paramedical and Vocational options and discover courses, branches and career opportunities.
          </p>
          
          <div className="relative mb-8 max-w-[480px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search pathways, streams, courses, branches, careers..." 
              className="w-full bg-[#3B4A9E]/80 border border-blue-400/30 text-white placeholder-blue-300 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search Dropdown */}
            {(searchQuery.trim().length > 1) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[300px] overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-sm text-gray-500 text-center">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <ul className="py-2">
                    {searchResults.map((result, idx) => (
                      <li key={idx}>
                        <Link 
                          to={result.type === 'Branch' || result.type === 'Course' ? `/courses/${result.slug}` : result.type === 'Career' ? `/careers` : `/pathways/${activeLevelSlug}`}
                          className="px-4 py-3 hover:bg-blue-50 flex flex-col transition-colors border-b border-gray-50 last:border-0"
                          onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                        >
                          <span className="text-sm font-bold text-gray-900">{result.name}</span>
                          <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">{result.type}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-sm text-gray-500 text-center">No results found for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => navigate('/pathways/after-10th')} className="bg-[#1C64F2] hover:bg-blue-600 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">Explore After 10th</button>
            <button onClick={() => navigate('/pathways/after-12th')} className="bg-transparent border border-blue-400/40 hover:bg-white/10 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">Explore After 12th</button>
            <button onClick={() => navigate('/pathways/degree')} className="bg-transparent border border-blue-400/40 hover:bg-white/10 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">Explore Degrees</button>
            <button onClick={() => navigate('/careers')} className="bg-transparent border border-blue-400/40 hover:bg-white/10 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">Explore Careers</button>
          </div>
        </div>
        
        <div className="absolute top-8 right-8 z-20">
          <button onClick={() => navigate('/aptitude')} className="bg-white text-[#2B3B94] px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-[0_4px_14px_rgba(0,0,0,0.1)]">
            <Sparkles className="w-4 h-4 text-yellow-500" /> Take Aptitude Test <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="hidden md:flex absolute right-4 bottom-0 top-0 w-[35%] items-end justify-center pointer-events-none z-0">
           <img 
             src="/images/education_hero_3d.jpg" 
             alt="Education" 
             className="w-[80%] object-contain mb-10 drop-shadow-2xl rounded-[32px] mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
           />
        </div>
      </div>

      {/* TOP STATS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-8">
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"><Layers className="w-4 h-4" /></div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pathways</div>
          </div>
          {stats ? <div className="text-2xl font-black text-[#2B3B94]">{stats.pathways}</div> : <div className="h-8 bg-gray-100 rounded w-12"></div>}
        </div>
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shrink-0"><BookOpen className="w-4 h-4" /></div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Streams</div>
          </div>
          {stats ? <div className="text-2xl font-black text-[#2B3B94]">{stats.streams}</div> : <div className="h-8 bg-gray-100 rounded w-12"></div>}
        </div>
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0"><GraduationCap className="w-4 h-4" /></div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Courses</div>
          </div>
          {stats ? <div className="text-2xl font-black text-emerald-600">{stats.courses.toLocaleString()}</div> : <div className="h-8 bg-gray-100 rounded w-16"></div>}
        </div>
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Building className="w-4 h-4" /></div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Branches</div>
          </div>
          {stats ? <div className="text-2xl font-black text-purple-600">{stats.branches.toLocaleString()}</div> : <div className="h-8 bg-gray-100 rounded w-16"></div>}
        </div>
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0"><Briefcase className="w-4 h-4" /></div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Careers</div>
          </div>
          {stats ? <div className="text-2xl font-black text-orange-600">{stats.careers.toLocaleString()}</div> : <div className="h-8 bg-gray-100 rounded w-16"></div>}
        </div>
      </div>

      {/* FILTERS SECTION */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-10 flex flex-wrap items-center gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-gray-700 font-bold mr-2">
          <Filter className="w-5 h-5 text-[#2B3B94]" /> Filters:
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase">Duration</span>
          <select 
            value={filters.duration} 
            onChange={(e) => setFilters({...filters, duration: e.target.value})}
            className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#2B3B94] outline-none"
          >
            <option value="Any">Any</option>
            <option value="1-2 Years">1-2 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="4+ Years">4+ Years</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase">Course Type</span>
          <select 
            value={filters.courseType} 
            onChange={(e) => setFilters({...filters, courseType: e.target.value})}
            className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#2B3B94] outline-none"
          >
            <option value="Any">Any</option>
            <option value="Degree">Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Certification">Certification</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase">Eligibility</span>
          <select 
            value={filters.eligibility} 
            onChange={(e) => setFilters({...filters, eligibility: e.target.value})}
            className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#2B3B94] outline-none"
          >
            <option value="Any">Any</option>
            <option value="10th Pass">10th Pass</option>
            <option value="12th Pass">12th Pass</option>
            <option value="UG Degree">UG Degree</option>
          </select>
        </div>

        <div className="ml-auto flex items-center gap-3">
           <button 
             onClick={() => setFilters({ duration: 'Any', courseType: 'Any', eligibility: 'Any' })}
             className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
           >
             Clear All
           </button>
           <button className="bg-[#2B3B94] text-white px-5 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-800 transition-colors">
             Apply
           </button>
        </div>
      </div>

      {/* EDUCATION LEVEL TABS */}
      <div className="mb-6">
        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">EDUCATION LEVEL</h3>
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-2">
          {educationLevels.map(level => (
            <button
              key={level._id}
              onClick={() => setActiveLevel(level.slug)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeLevelSlug === level.slug
                  ? 'bg-[#1C64F2] text-white shadow-[0_2px_10px_rgba(28,100,242,0.3)]'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1C64F2]"></div>
        </div>
      ) : activeLevel ? (
        <>
          {/* VIEW: COURSE EXPLORER (STREAM SELECTED) */}
          {streamSlug ? (
            loadingStream ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1C64F2]"></div>
              </div>
            ) : streamDetails ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-16">
                
                {/* PATHWAY TREE */}
                <PathwayTree 
                  levelSlug={activeLevelSlug} 
                  pathwaySlug={pathwaySlug} 
                  streamSlug={streamSlug} 
                  comboSlug={comboSlug}
                  levelName={activeLevel?.name}
                  pathwayName={activePathway?.name}
                  streamName={streamDetails.name}
                  comboName={selectedCombination?.name}
                />

                {/* STREAM HEADER (When viewing stream root) */}
                {!comboSlug && (
                  <>
                    <div className="bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm mb-8">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between border-b border-gray-100 pb-8 mb-8">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-[#2B3B94] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                                    <Activity className="w-8 h-8" />
                                </div>
                                <div>
                                    <div className="text-[11px] font-extrabold tracking-widest text-[#1C64F2] uppercase mb-1">STREAM</div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{streamDetails.name?.toUpperCase() || 'STREAM'}</h2>
                                    <p className="text-gray-500 mt-1">Explore {streamDetails.name || 'this stream\'s'} subject combinations, higher-education courses, branches, entrance exams and career opportunities.</p>
                                </div>
                            </div>
                        </div>

                        {/* DYNAMIC STREAM STATS */}
                        {( (streamDetails.subjectCombinations && streamDetails.subjectCombinations.length > 0) || 
                           (streamDetails.courses && streamDetails.courses.length > 0) ) && (
                            <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                                {streamStats.combos > 0 && (
                                    <>
                                        <div className="text-center px-4 border-r border-gray-200">
                                            <div className="text-2xl font-black text-gray-900">{streamStats.combos}</div>
                                            <div className="text-[10px] uppercase font-bold text-gray-500">Subject Combinations</div>
                                        </div>
                                        <div className="text-center px-4 border-r border-gray-200">
                                            <div className="text-2xl font-black text-gray-900">{streamStats.subjects}</div>
                                            <div className="text-[10px] uppercase font-bold text-gray-500">Subjects</div>
                                        </div>
                                    </>
                                )}
                                <div className="text-center px-4 border-r border-gray-200">
                                    <div className="text-2xl font-black text-emerald-600">{streamStats.courses}</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-500">Courses</div>
                                </div>
                                <div className="text-center px-4 border-r border-gray-200">
                                    <div className="text-2xl font-black text-purple-600">{streamStats.branches}</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-500">Branches</div>
                                </div>
                                <div className="text-center px-4">
                                    <div className="text-2xl font-black text-orange-600">{streamStats.careers}</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-500">Careers</div>
                                </div>
                            </div>
                        )}
                        {(streamDetails.trades && streamDetails.trades.length > 0) && (
                            <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="text-center px-4 border-r border-gray-200">
                                    <div className="text-2xl font-black text-emerald-600">{streamDetails.trades.length}</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-500">Trades</div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* COMBINATIONS CARDS GRID */}
                    {streamDetails.subjectCombinations && streamDetails.subjectCombinations.length > 0 ? (
                        <div>
                            <h3 className="font-extrabold text-xl text-gray-900 mb-6">Choose a subject combination</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {streamDetails.subjectCombinations.map(combo => (
                                    <div key={combo._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-300 hover:shadow-lg transition-all flex flex-col h-full">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{streamDetails.name}</div>
                                        <h4 className="text-2xl font-black text-[#2B3B94] mb-4">{combo.name}</h4>
                                        <ul className="space-y-2 mb-6">
                                            {combo.subjects?.map(sub => sub && (
                                                <li key={sub._id} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {sub.name}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-auto pt-5 border-t border-gray-100">
                                            <p className="text-xs text-gray-500 mb-4 font-medium line-clamp-2">Best suited for: {streamDetails.name} and related fields.</p>
                                            <button onClick={() => navigateCombo(combo.slug)} className="w-full bg-[#1C64F2] hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                                                Explore Combination <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : streamDetails.courses && streamDetails.courses.length > 0 ? (
                        <div className="bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-6 text-xl">{streamDetails.name} Courses</h3>
                            <div className="grid grid-cols-1 gap-6">
                                {streamDetails.courses.map(course => (
                                    <div key={course._id} className="border border-gray-100 rounded-xl p-6 shadow-sm hover:border-emerald-200 transition-colors relative">
                                        <div className="absolute top-4 right-4 z-10">
                                            <label className="flex items-center gap-2 cursor-pointer bg-white/90 px-2 py-1 rounded-md shadow-sm border border-gray-100">
                                                <input 
                                                    type="checkbox" 
                                                    className="w-4 h-4 text-[#2B3B94] rounded border-gray-300 focus:ring-[#2B3B94]"
                                                    checked={selectedCourses.some(c => c._id === course._id)}
                                                    onChange={() => toggleCourseComparison(course as unknown as CourseData)}
                                                />
                                                <span className="text-xs font-bold text-gray-500 uppercase">Compare</span>
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                                <GraduationCap className="w-5 h-5" />
                                            </div>
                                            <h4 className="font-bold text-lg text-gray-900">{course.name}</h4>
                                        </div>
                                        {course.description && (
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                                        )}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                          {course.duration && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                                              <Activity className="w-3.5 h-3.5" /> Duration: {course.duration}
                                            </span>
                                          )}
                                          {course.eligibility && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                                              <CheckCircle className="w-3.5 h-3.5" /> {course.eligibility}
                                            </span>
                                          )}
                                        </div>
                                        {course.branches && course.branches.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Available Branches / Options</h5>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {course.branches.map(branch => (
                                                        <li key={branch._id} 
                                                            onClick={(e) => { e.stopPropagation(); navigate(`/courses/${branch.slug}`); }}
                                                            className="text-sm font-semibold text-gray-700 flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all group">
                                                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 group-hover:bg-[#1C64F2] transition-colors"></span>
                                                          <span className="leading-tight group-hover:text-blue-700 transition-colors">{branch.name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : streamDetails.trades && streamDetails.trades.length > 0 ? (
                        <div className="bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-6 text-xl">{streamDetails.name} Trades</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {streamDetails.trades.map((trade: any) => (
                                    <div key={trade._id} className="border border-gray-100 rounded-xl p-6 shadow-sm hover:border-blue-300 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                <Wrench className="w-5 h-5" />
                                            </div>
                                            <h4 className="font-bold text-lg text-gray-900">{trade.name}</h4>
                                        </div>
                                        <div className="space-y-2 mt-4 text-sm text-gray-600">
                                            {trade.duration && <p><strong>Duration:</strong> {trade.duration}</p>}
                                            {trade.eligibility && <p><strong>Eligibility:</strong> {trade.eligibility}</p>}
                                            {trade.apprenticeshipOpportunities && <p><strong>Apprenticeship:</strong> Yes</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                         <div className="bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm text-center">
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">No Information Available</h3>
                            <p className="text-gray-500 text-sm">We are still compiling details for this stream. Please check back later.</p>
                        </div>
                    )}
                  </>
                )}

                {/* COMBINATION DETAIL VIEW */}
                {comboSlug && selectedCombination && (
                    (() => {
                        const combo = selectedCombination;
                        if (!combo) return null;
                        return (
                            <div className="bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm">
                                <div className="border-b border-gray-100 pb-8 mb-8">
                                    <div className="text-[11px] font-extrabold tracking-widest text-[#1C64F2] uppercase mb-2">SUBJECT COMBINATION</div>
                                    <h2 className="text-4xl font-black text-[#2B3B94] mb-6">{combo.name}</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-4">SUBJECTS</h4>
                                            <ul className="space-y-3">
                                                {combo.subjects?.map(sub => sub && (
                                                    <li key={sub._id} className="text-sm font-bold text-gray-800 flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> {sub.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4">ELIGIBILITY</h4>
                                            <p className="text-sm text-gray-800 font-medium leading-relaxed">
                                                {combo.eligibility || 'Passed 10th / SSLC or equivalent.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-black text-xl text-gray-900 mb-8 uppercase tracking-wide">POSSIBLE HIGHER EDUCATION AREAS</h3>
                                    
                                    {/* Group courses by higherStudyArea */}
                                    <div className="space-y-8">
                                        {Object.entries(
                                            (combo.ugCourses || []).reduce((acc: any, ug: any) => {
                                                const area = ug.higherStudyArea || 'Other';
                                                if (!acc[area]) acc[area] = [];
                                                acc[area].push(ug);
                                                return acc;
                                            }, {})
                                        ).map(([area, ugs]: [string, any]) => (
                                            <div key={area} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                                                    <GraduationCap className="w-6 h-6 text-emerald-600" />
                                                    <h4 className="font-extrabold text-lg text-gray-900 uppercase tracking-widest">{area}</h4>
                                                </div>
                                                <div className="p-6">
                                                    <div className="grid grid-cols-1 gap-6">
                                                        {ugs.map((ug: any) => (
                                                            <div key={ug._id} className="border border-gray-100 rounded-xl p-5 hover:border-emerald-200 transition-colors">
                                                                <h5 className="font-bold text-emerald-700 text-lg mb-4">{ug.name}</h5>
                                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                  {ug.branches?.map((branch: any) => (
                                                                    <li key={branch._id} 
                                                                        onClick={(e) => { e.stopPropagation(); navigate(`/courses/${branch.slug}`); }}
                                                                        className="text-sm font-semibold text-gray-700 flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all group">
                                                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 group-hover:bg-blue-500 transition-colors"></span>
                                                                      <span className="leading-tight group-hover:text-blue-700 transition-colors">{branch.name}</span>
                                                                    </li>
                                                                  ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })()
                )}

              </div>
            ) : null
          ) 

          /* VIEW: STREAMS EXPLORER (PATHWAY SELECTED) */
          : pathwaySlug && activePathway ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-16">
              <PathwayTree 
                  levelSlug={activeLevelSlug} 
                  pathwaySlug={pathwaySlug}
                  levelName={activeLevel?.name}
                  pathwayName={activePathway?.name}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activePathway.streams.map((stream, idx) => (
                  <div key={stream._id} onClick={() => navigateStream(stream.slug)} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-[280px]">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{stream.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">Explore specialized subject combinations, courses and detailed branches available under this stream.</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                        <span>{stream.comboCount || 0} Subject Combinations</span>
                        <span>{stream.courseCount || 0} Courses</span>
                      </div>
                      <button className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:text-blue-700 w-full justify-center bg-blue-50 py-2 rounded-lg mt-2">
                        Explore Stream <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )

          /* VIEW: PATHWAYS EXPLORER (DEFAULT TOP-LEVEL) */
          : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeLevel.pathways && activeLevel.pathways.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-6">
                    {activeLevel.pathways.map((pathway, i) => {
                      const ui = getPathwayIcon(pathway.name, i);
                      
                      let durationStr = pathway.duration || '2 Years';

                      return (
                        <div key={pathway._id} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col h-[380px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all group">
                          <div className={`w-10 h-10 rounded-lg ${ui.bg} ${ui.color} flex items-center justify-center mb-4 shrink-0`}>
                            <ui.icon className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{pathway.name}</h4>
                          <p className="text-[11px] text-gray-500 mb-5 font-medium">Duration: {durationStr}</p>
                          
                          <div className="flex-1 overflow-hidden">
                            <p className="text-[11px] text-gray-500 font-semibold mb-2 uppercase tracking-wider">Streams:</p>
                            <ul className="space-y-2 mb-4">
                              {pathway.streams.slice(0, 5).map(stream => (
                                <li key={stream._id} className="text-[13px] text-gray-700 flex items-start gap-2 leading-tight">
                                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0"></span>
                                  <span className="line-clamp-2">{stream.name}</span>
                                </li>
                              ))}
                              {pathway.streams.length > 5 && (
                                <li className="text-[11px] text-blue-600 font-medium pl-3 italic">
                                  + {pathway.streams.length - 5} more streams
                                </li>
                              )}
                            </ul>
                          </div>
                          
                          <button 
                            onClick={() => navigatePathway(pathway.slug)}
                            className="text-blue-600 text-[13px] font-bold flex items-center justify-center gap-1.5 mt-auto pt-3 pb-1 border border-blue-100 rounded-lg bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                          >
                            Explore Streams <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
              ) : (
                  <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-sm mb-8 min-h-[300px]">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2">No Pathways Available</h3>
                      <p className="text-gray-500 max-w-md">We are currently compiling and updating the pathways for this education level. Please check back later or explore the "After 10th" level.</p>
                      <button 
                        onClick={() => navigate('/pathways/after-10th')}
                        className="mt-6 px-6 py-2.5 bg-[#1C64F2] text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Explore After 10th
                      </button>
                  </div>
              )}
            </div>
          )}

          {/* RESTORED BOTTOM CONTENT (Flow, Why, Explores) */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            
            {/* HOW IT WORKS / FLOW */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest rounded-full mb-4">
                  The Journey
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">How to Plan Your Pathway</h2>
                <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Follow these steps to discover the perfect educational and career trajectory for your future.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto relative">
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-transparent -translate-y-1/2 z-0"></div>
                
                {[
                  { step: '01', title: 'Explore Pathways', desc: 'Browse various options like 12th, Diploma, or ITI available after 10th.', icon: Search },
                  { step: '02', title: 'Choose Stream', desc: 'Select a stream or subject combination that aligns with your interests.', icon: Target },
                  { step: '03', title: 'Find Courses', desc: 'Discover Undergraduate and Professional courses for your chosen stream.', icon: GraduationCap },
                  { step: '04', title: 'Pick Career', desc: 'Map your education directly to high-growth career opportunities.', icon: Briefcase }
                ].map((item, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300">
                       <item.icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="text-sm font-black text-gray-300 mb-1">{item.step}</div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed px-4">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* APTITUDE TEST CTA */}
            <div className="bg-gradient-to-br from-[#2B3B94] to-[#1C64F2] rounded-[32px] p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden group mb-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="max-w-2xl relative z-10 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Not sure which pathway is right for you?</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Take our AI-powered Aptitude Assessment. We analyze your strengths, interests, and personality to recommend the perfect educational stream and career path.
                </p>
              </div>
              <div className="relative z-10 w-full md:w-auto flex shrink-0">
                <button onClick={() => navigate('/aptitude')} className="w-full md:w-auto bg-white text-[#2B3B94] hover:bg-gray-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-3">
                  Take Aptitude Test <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

        </>
      ) : (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl">
          <p className="text-gray-500 text-lg">No pathways found for this level.</p>
        </div>
      )}

      {/* OVERALL OVERVIEW SECTION */}
      {globalStats && (
        <div className="mt-16 mb-8 border-t border-gray-200 pt-12">
          <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-6">Overall Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer" onClick={() => navigate('/pathways')}>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">All Pathways</p>
                <p className="text-2xl font-black text-[#2B3B94]">{globalStats.pathways}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors"><Layers className="w-5 h-5" /></div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer" onClick={() => navigate('/pathways')}>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">All Streams</p>
                <p className="text-2xl font-black text-[#2B3B94]">{globalStats.streams}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-slate-500 group-hover:text-white transition-colors"><BookOpen className="w-5 h-5" /></div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer" onClick={() => navigate('/pathways')}>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">All Courses</p>
                <p className="text-2xl font-black text-emerald-600">{globalStats.courses.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors"><GraduationCap className="w-5 h-5" /></div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer" onClick={() => navigate('/pathways')}>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">All Branches</p>
                <p className="text-2xl font-black text-purple-600">{globalStats.branches.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors"><Building className="w-5 h-5" /></div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer" onClick={() => navigate('/careers')}>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">All Careers</p>
                <p className="text-2xl font-black text-orange-600">{globalStats.careers.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Briefcase className="w-5 h-5" /></div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer" onClick={() => navigate('/colleges')}>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">All Colleges</p>
                <p className="text-2xl font-black text-teal-600">{globalStats.colleges.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors"><Building2 className="w-5 h-5" /></div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer" onClick={() => navigate('/exams')}>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">All Exams</p>
                <p className="text-2xl font-black text-amber-500">{globalStats.exams.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors"><ClipboardList className="w-5 h-5" /></div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer" onClick={() => navigate('/jobs')}>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">All Jobs</p>
                <p className="text-2xl font-black text-indigo-500">{globalStats.jobs.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><Users className="w-5 h-5" /></div>
            </div>
          </div>
        </div>
      )}
      
      </div>

      {/* Floating Action Bar for Comparison */}
      {selectedCourses.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-6 z-40 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
              {selectedCourses.length}
            </div>
            <span className="font-medium text-sm">Courses selected</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsCompareModalOpen(true)}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-full text-sm transition-colors shadow-lg shadow-emerald-500/20"
            >
              Compare Now
            </button>
            <button 
              onClick={() => setSelectedCourses([])}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-full text-sm transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      <CourseComparisonModal 
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        courses={selectedCourses}
      />
    </div>
  );
};

export default PathwaysExplorer;
