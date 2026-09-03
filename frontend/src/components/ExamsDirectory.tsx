import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, BookOpen, GraduationCap, Award, Building, Bookmark, Filter, ChevronDown, CheckCircle2, ChevronRight, HelpCircle, Star, Sparkles, X, Loader2 } from 'lucide-react';
import { StructuredExam } from '../types';
import { getExams, getExamRecommendations, saveExam, unsaveExam, getSavedExams } from '../api/examApi';
import ExamComparisonModal from './ExamComparisonModal';

interface ExamsDirectoryProps {
  initialTab?: 'exams' | 'degrees' | 'specializations' | 'compare' | 'saved';
}

const EDUCATION_LEVELS = [
  { value: 'All', label: 'All Levels' },
  { value: 'AFTER_10TH', label: 'After 10th' },
  { value: 'AFTER_12TH', label: 'After 12th' },
  { value: 'UNDERGRADUATE', label: 'Undergraduate' },
  { value: 'AFTER_DEGREE', label: 'After Degree' },
  { value: 'POSTGRADUATE', label: 'Postgraduate' },
  { value: 'PROFESSIONAL', label: 'Professional' },
  { value: 'RESEARCH', label: 'Research' }
];

const STREAMS = [
  { value: 'All', label: 'All Streams' },
  { value: 'PCM', label: 'Science (PCM)' },
  { value: 'PCB', label: 'Science (PCB)' },
  { value: 'COMMERCE', label: 'Commerce' },
  { value: 'ARTS', label: 'Arts' },
  { value: 'HUMANITIES', label: 'Humanities' },
  { value: 'ANY_STREAM', label: 'Any Stream' }
];

const CATEGORIES = [
  'All', 'ENGINEERING', 'MEDICAL', 'LAW', 'MANAGEMENT', 'COMMERCE', 'SCIENCE', 'ARTS', 'DEFENCE', 'GOVERNMENT'
];

export default function ExamsDirectory({ initialTab = 'exams' }: ExamsDirectoryProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activeTab, setActiveTab] = useState<'exams' | 'degrees' | 'specializations' | 'compare' | 'saved'>(initialTab);
  
  const [exams, setExams] = useState<StructuredExam[]>([]);
  const [totalExams, setTotalExams] = useState(0);
  const [savedExamIds, setSavedExamIds] = useState<Set<string>>(new Set());
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [edLevel, setEdLevel] = useState(searchParams.get('level') || 'All');
  const [stream, setStream] = useState(searchParams.get('stream') || 'All');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  
  const [loading, setLoading] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState<StructuredExam[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);
  
  const [selectedExams, setSelectedExams] = useState<StructuredExam[]>([]);
  const [isCompareExamModalOpen, setIsCompareExamModalOpen] = useState(false);

  // Load Saved Exams
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const saved = await getSavedExams();
        setSavedExamIds(new Set(saved.map(e => e._id)));
      } catch (err) {
        console.log("Not logged in or error fetching saved exams");
      }
    };
    fetchSaved();
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'exams') {
        const data = await getExams({
          search: search || undefined,
          education_level: edLevel !== 'All' ? edLevel : undefined,
          stream: stream !== 'All' ? stream : undefined,
          category: category !== 'All' ? category : undefined,
          page: 1,
          limit: 50
        });
        setExams(data.items);
        setTotalExams(data.total);

        // Update URL
        const params: any = {};
        if (search) params.search = search;
        if (edLevel !== 'All') params.level = edLevel;
        if (stream !== 'All') params.stream = stream;
        if (category !== 'All') params.category = category;
        setSearchParams(params);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [search, edLevel, stream, category, activeTab, setSearchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // AI Recommendations
  useEffect(() => {
    const fetchRecs = async () => {
      if (edLevel !== 'All' || stream !== 'All' || category !== 'All') {
        setLoadingAi(true);
        try {
          const recs = await getExamRecommendations({
            education_level: edLevel !== 'All' ? edLevel : undefined,
            stream: stream !== 'All' ? stream : undefined,
            category: category !== 'All' ? category : undefined
          });
          setAiRecommendations(recs.items);
        } catch (e) {
          console.error(e);
        }
        setLoadingAi(false);
      } else {
        setAiRecommendations([]);
      }
    };
    fetchRecs();
  }, [edLevel, stream, category]);

  const toggleSave = async (examId: string) => {
    try {
      if (savedExamIds.has(examId)) {
        await unsaveExam(examId);
        setSavedExamIds(prev => {
          const next = new Set(prev);
          next.delete(examId);
          return next;
        });
      } else {
        await saveExam(examId);
        setSavedExamIds(prev => new Set(prev).add(examId));
      }
    } catch (err) {
      alert("Please login to save exams.");
    }
  };

  const toggleExamComparison = (exam: StructuredExam) => {
    if (selectedExams.some(e => e._id === exam._id)) {
      setSelectedExams(selectedExams.filter(e => e._id !== exam._id));
    } else {
      if (selectedExams.length < 3) {
        setSelectedExams([...selectedExams, exam]);
      } else {
        alert("You can only compare up to 3 exams at a time.");
      }
    }
  };

  const clearAllFilters = () => {
    setSearch('');
    setEdLevel('All');
    setStream('All');
    setCategory('All');
  };

  const hasActiveFilters = search || edLevel !== 'All' || stream !== 'All' || category !== 'All';

  const renderExamCard = (exam: StructuredExam) => {
    const isSelected = selectedExams.some(e => e._id === exam._id);
    const isSaved = savedExamIds.has(exam._id);

    return (
      <div key={exam._id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-blue-200 hover:-translate-y-1 transition-all relative flex flex-col h-full">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
           <label className="flex items-center gap-1.5 cursor-pointer bg-white/90 px-2.5 py-1 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600"
                  checked={isSelected}
                  onChange={() => toggleExamComparison(exam)}
              />
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Compare</span>
           </label>
           <button onClick={() => toggleSave(exam._id)} className={`shadow-sm border rounded-md p-1.5 transition-colors ${isSaved ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-400 hover:text-blue-600'}`}>
             <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
           </button>
        </div>

        <div className="flex gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
            {exam.exam_name.charAt(0)}
          </div>
          <div className="pr-16">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{exam.short_name || exam.exam_name}</h3>
            <div className="flex flex-wrap gap-2 mt-2.5">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100">
                {exam.education_level.replace('_', ' ')}
              </span>
              {exam.streams[0] && (
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-purple-100">
                  {exam.streams[0]}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
           <div>
             <span className="text-xs font-semibold text-gray-500 uppercase">Conducting Body</span>
             <p className="text-sm font-medium text-gray-800 line-clamp-1">{exam.conducting_body}</p>
           </div>
           <div>
             <span className="text-xs font-semibold text-gray-500 uppercase">Status</span>
             <p className="text-sm font-medium text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> {exam.status}</p>
           </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
           <button onClick={() => navigate(`/exams/${exam.canonical_slug}`)} className="flex-1 bg-[#2B3B94] hover:bg-blue-800 text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
             View Details
           </button>
           <button onClick={() => window.open(exam.official_website, '_blank')} className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-bold border border-gray-200 transition-colors">
             Official Site
           </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-32">
      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HERO SECTION */}
        <div className="bg-gradient-to-br from-[#1c2968] to-[#2B3B94] rounded-[32px] p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between mb-8 shadow-sm">
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          
          <div className="text-white max-w-2xl z-10 w-full relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-100 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Real, Verified Data Only
            </div>
            <h1 className="text-4xl md:text-[46px] font-black mb-4 leading-[1.1] tracking-tight">
              Explore Entrance & <br/>Competitive Exams
            </h1>
            <p className="text-blue-100/90 mb-10 max-w-xl text-[15px] leading-relaxed pr-8 font-medium">
              Discover verified exams based on your education level, stream, category, and career goal.
            </p>
            
            <div className="relative mb-4 max-w-[500px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                type="text"
                placeholder='Try "12th PCM", "medical", "law after 12th"...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all font-medium"
              />
            </div>
          </div>
          
          <div className="hidden lg:block relative z-10 w-1/3">
             <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/> AI Recommendations
                </h3>
                {loadingAi ? (
                   <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-white"/></div>
                ) : aiRecommendations.length > 0 ? (
                  <div className="space-y-3">
                     {aiRecommendations.map(rec => (
                       <div key={rec._id} onClick={() => navigate(`/exams/${rec.canonical_slug}`)} className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 cursor-pointer transition-colors">
                         <div className="text-xs text-blue-200 font-bold mb-1 line-clamp-1">{rec.recommendation_reason}</div>
                         <div className="text-white font-bold text-sm">{rec.short_name || rec.exam_name}</div>
                       </div>
                     ))}
                  </div>
                ) : (
                  <div className="text-sm text-blue-200">
                     Select your Education Level and Stream in the filters below to get personalized recommendations.
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-700 font-bold mr-2">
            <Filter className="w-5 h-5 text-[#2B3B94]" /> Filters:
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Education Level</span>
            <div className="relative group">
              <select 
                value={edLevel} 
                onChange={e => setEdLevel(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-[#2B3B94] cursor-pointer min-w-[160px]"
              >
                {EDUCATION_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Stream</span>
            <div className="relative group">
              <select 
                value={stream} 
                onChange={e => setStream(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-[#2B3B94] cursor-pointer min-w-[160px]"
              >
                {STREAMS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Category</span>
            <div className="relative group">
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-[#2B3B94] cursor-pointer min-w-[160px]"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ACTIVE FILTER CHIPS */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-semibold text-gray-500 mr-2">Active Filters:</span>
            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                Search: {search}
                <button onClick={() => setSearch('')} className="hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
              </span>
            )}
            {edLevel !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                Level: {EDUCATION_LEVELS.find(l => l.value === edLevel)?.label}
                <button onClick={() => setEdLevel('All')} className="hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
              </span>
            )}
            {stream !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                Stream: {STREAMS.find(s => s.value === stream)?.label}
                <button onClick={() => setStream('All')} className="hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
              </span>
            )}
            {category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                Category: {category}
                <button onClick={() => setCategory('All')} className="hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
              </span>
            )}
            <button 
              onClick={clearAllFilters}
              className="text-xs font-bold text-gray-500 hover:text-gray-900 ml-2 underline"
            >
              Clear All
            </button>
          </div>
        )}

        {/* REAL-TIME COUNT */}
        <div className="mb-4">
           <h2 className="text-xl font-bold text-gray-900">
             {loading ? 'Loading...' : `Showing ${totalExams} ${hasActiveFilters ? 'exams matching your filters' : 'verified exams'}`}
           </h2>
        </div>

        {/* CONTENT GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 h-[300px] animate-pulse">
                <div className="flex gap-4 mb-5">
                   <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                   <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="h-3 bg-gray-200 rounded w-full"></div>
                   <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {exams.length > 0 ? exams.map(renderExamCard) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No verified exams match your current filters.</h3>
                <p className="text-gray-500 mb-6">We only show officially verified examination data. Try adjusting your search criteria.</p>
                <button onClick={clearAllFilters} className="bg-[#2B3B94] text-white px-6 py-2.5 rounded-xl font-bold text-sm">
                   Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FLOATING ACTION BAR FOR EXAM COMPARISON */}
      {selectedExams.length > 0 && (
         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1c2968] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 z-50 animate-in slide-in-from-bottom-10 border border-blue-400/20">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-200 font-black">
                {selectedExams.length}
              </span>
              <span className="font-bold">Exams Selected</span>
            </div>
            
            <div className="flex gap-2">
              {selectedExams.map(exam => (
                <div key={exam._id} className="bg-black/20 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <span className="max-w-[80px] truncate">{exam.short_name || exam.exam_name}</span>
                  <button onClick={() => toggleExamComparison(exam)} className="hover:text-red-400 text-gray-400">&times;</button>
                </div>
              ))}
            </div>

            <div className="w-px h-8 bg-white/10 mx-2"></div>

            <button 
              onClick={() => setSelectedExams([])} 
              className="text-sm font-semibold text-blue-200 hover:text-white transition-colors"
            >
              Clear
            </button>
            <button 
              onClick={() => setIsCompareExamModalOpen(true)}
              disabled={selectedExams.length < 2}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                selectedExams.length >= 2 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              Compare Now
            </button>
         </div>
      )}

      {isCompareExamModalOpen && (
         <ExamComparisonModal 
            isOpen={isCompareExamModalOpen} 
            onClose={() => setIsCompareExamModalOpen(false)} 
            exams={selectedExams} 
         />
      )}
    </div>
  );
}
