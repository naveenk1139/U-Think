import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, GraduationCap, Award, Building, ArrowRight, Bookmark, Filter, ChevronDown, CheckCircle2, ChevronRight, HelpCircle, Star, Sparkles } from 'lucide-react';
import { StructuredExam, StructuredDegree } from '../types';
import ExamComparisonModal from './ExamComparisonModal';
import DegreeComparisonModal from './DegreeComparisonModal';

interface ExamsDirectoryProps {
  initialTab?: 'exams' | 'degrees' | 'specializations' | 'compare' | 'saved';
}

const EDUCATION_LEVELS = ['All', 'After 10th', '12th / PUC', 'Diploma', 'ITI', 'UG', 'PG', 'PhD', 'Working Professional'];
const CATEGORIES = [
  'All', 'Engineering', 'Medical', 'Paramedical', 'Science', 'Commerce', 'Management', 
  'Law', 'Design', 'Arts / Humanities', 'Architecture', 'Agriculture', 'Pharmacy', 'Nursing', 'Vocational'
];
const EXAM_LEVELS = ['All', 'National', 'State', 'University', 'Institute', 'International', 'Government', 'Professional'];
const EXAM_TYPES = ['All', 'Entrance Exam', 'Admission Test', 'Professional Qualification', 'Government Recruitment', 'Scholarship Exam', 'Certification', 'Study Abroad'];

export default function ExamsDirectory({ initialTab = 'exams' }: ExamsDirectoryProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'exams' | 'degrees' | 'specializations' | 'compare' | 'saved'>(initialTab);
  
  const [exams, setExams] = useState<StructuredExam[]>([]);
  const [degrees, setDegrees] = useState<StructuredDegree[]>([]);
  
  // Filters
  const [search, setSearch] = useState('');
  const [edLevel, setEdLevel] = useState('All');
  const [category, setCategory] = useState('All');
  const [examLevel, setExamLevel] = useState('All');
  const [examType, setExamType] = useState('All');
  
  const [loading, setLoading] = useState(true);
  
  // Comparison state
  const [selectedExams, setSelectedExams] = useState<StructuredExam[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<StructuredDegree[]>([]);
  const [isCompareExamModalOpen, setIsCompareExamModalOpen] = useState(false);
  const [isCompareDegreeModalOpen, setIsCompareDegreeModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [search, edLevel, category, examLevel, examType, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'exams') {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        
        // Map UI names to DB names roughly
        const mappedEdLevel = edLevel === '12th / PUC' ? 'After 12th' : edLevel;
        if (edLevel !== 'All') query.append('educationLevel', mappedEdLevel);
        
        if (category !== 'All') query.append('category', category);
        if (examLevel !== 'All') query.append('level', examLevel);
        if (examType !== 'All') query.append('type', examType);
        
        const res = await fetch(`http://localhost:5000/api/exams?${query.toString()}`);
        if(res.ok) {
           const data = await res.json();
           setExams(data);
        }
      } else if (activeTab === 'degrees') {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (category !== 'All') query.append('category', category);
        if (edLevel !== 'All') {
             query.append('level', edLevel);
        }
        
        const res = await fetch(`http://localhost:5000/api/degrees?${query.toString()}`);
        if(res.ok) {
           const data = await res.json();
           setDegrees(data);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
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

  const toggleDegreeComparison = (degree: StructuredDegree) => {
    if (selectedDegrees.some(d => d._id === degree._id)) {
      setSelectedDegrees(selectedDegrees.filter(d => d._id !== degree._id));
    } else {
      if (selectedDegrees.length < 3) {
        setSelectedDegrees([...selectedDegrees, degree]);
      } else {
        alert("You can only compare up to 3 degrees at a time.");
      }
    }
  };

  const renderExamCard = (exam: StructuredExam) => {
    const isSelected = selectedExams.some(e => e._id === exam._id);
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
           <button className="text-gray-400 hover:text-blue-600 bg-white shadow-sm border border-gray-200 rounded-md p-1.5">
             <Bookmark className="w-4 h-4" />
           </button>
        </div>

        <div className="flex gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
            {exam.name.charAt(0)}
          </div>
          <div className="pr-16">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{exam.name}</h3>
            <div className="flex flex-wrap gap-2 mt-2.5">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100">{exam.category}</span>
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-200">{exam.level}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
           <div>
             <span className="text-xs font-semibold text-gray-500 uppercase">For</span>
             <p className="text-sm font-medium text-gray-800">{exam.ugPg} {exam.category}</p>
           </div>
           <div>
             <span className="text-xs font-semibold text-gray-500 uppercase">Conducting Body</span>
             <p className="text-sm font-medium text-gray-800 line-clamp-1">{exam.conductingBody}</p>
           </div>
           <div>
             <span className="text-xs font-semibold text-gray-500 uppercase">Status</span>
             <p className="text-sm font-medium text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> {exam.status}</p>
           </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
           <button onClick={() => navigate(`/exams/${exam.examId}`)} className="flex-1 bg-[#2B3B94] hover:bg-blue-800 text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
             View Details
           </button>
           <button onClick={() => window.open(`https://${exam.officialWebsite}`, '_blank')} className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-bold border border-gray-200 transition-colors">
             Official Site
           </button>
        </div>
      </div>
    );
  };

  const renderDegreeCard = (degree: StructuredDegree) => {
    const isSelected = selectedDegrees.some(d => d._id === degree._id);
    return (
      <div key={degree._id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-purple-200 hover:-translate-y-1 transition-all relative flex flex-col h-full">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
           <label className="flex items-center gap-1.5 cursor-pointer bg-white/90 px-2.5 py-1 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <input 
                  type="checkbox" 
                  className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-600"
                  checked={isSelected}
                  onChange={() => toggleDegreeComparison(degree)}
              />
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Compare</span>
           </label>
           <button className="text-gray-400 hover:text-purple-600 bg-white shadow-sm border border-gray-200 rounded-md p-1.5">
             <Bookmark className="w-4 h-4" />
           </button>
        </div>

        <div className="flex gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="pr-16">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{degree.name}</h3>
            <div className="flex flex-wrap gap-2 mt-2.5">
              <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-purple-100">{degree.level}</span>
              <span className="px-2.5 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-orange-100">{degree.duration}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-6 line-clamp-2 flex-grow">{degree.overview}</p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
           <button onClick={() => navigate(`/degrees/${degree.degreeId}`)} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
             View Details
           </button>
           <button onClick={() => navigate(`/colleges?category=${degree.category}`)} className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-bold border border-gray-200 transition-colors">
             Colleges
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
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Complete Explorer
            </div>
            <h1 className="text-4xl md:text-[46px] font-black mb-4 leading-[1.1] tracking-tight">
              Explore Exams & <br/>Degrees Directory
            </h1>
            <p className="text-blue-100/90 mb-10 max-w-xl text-[15px] leading-relaxed pr-8 font-medium">
              Find the right entrance exam, degree and career pathway for you. Search across Engineering, Medical, Law, Design, ITI, and more.
            </p>
            
            <div className="relative mb-4 max-w-[500px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search exams, degrees, courses, careers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all font-medium"
              />
            </div>
          </div>
          
          <div className="hidden lg:block relative z-10 w-1/3">
             <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/> Recommended For You</h3>
                <div className="space-y-3">
                   <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 cursor-pointer transition-colors">
                     <div className="text-xs text-blue-200 font-bold mb-1">95% Match</div>
                     <div className="text-white font-bold text-sm">Computer Science Engineering</div>
                   </div>
                   <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 cursor-pointer transition-colors">
                     <div className="text-xs text-blue-200 font-bold mb-1">Recommended Exam</div>
                     <div className="text-white font-bold text-sm">JEE Main</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'exams', label: 'Exams Hub', icon: BookOpen },
            { id: 'degrees', label: 'Degrees & Profiles', icon: GraduationCap },
            { id: 'specializations', label: 'Specializations Hub', icon: Award },
            { id: 'compare', label: 'Compare', icon: Building },
            { id: 'saved', label: 'Saved', icon: Bookmark }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-[#2B3B94] shadow-sm border border-gray-200' 
                  : 'bg-transparent text-gray-500 hover:bg-gray-200/50 hover:text-gray-900'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : ''}`} /> {tab.label}
            </button>
          ))}
        </div>

        {/* FILTERS */}
        {(activeTab === 'exams' || activeTab === 'degrees') && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 flex flex-wrap items-center gap-4 shadow-sm">
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
                  {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l === 'All' ? 'All Levels' : l}</option>)}
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

            {activeTab === 'exams' && (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Exam Level</span>
                  <div className="relative group">
                    <select 
                      value={examLevel} 
                      onChange={e => setExamLevel(e.target.value)}
                      className="appearance-none bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-[#2B3B94] cursor-pointer min-w-[160px]"
                    >
                      {EXAM_LEVELS.map(l => <option key={l} value={l}>{l === 'All' ? 'All Exam Levels' : l}</option>)}
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Exam Type</span>
                  <div className="relative group">
                    <select 
                      value={examType} 
                      onChange={e => setExamType(e.target.value)}
                      className="appearance-none bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-[#2B3B94] cursor-pointer min-w-[160px]"
                    >
                      {EXAM_TYPES.map(l => <option key={l} value={l}>{l === 'All' ? 'All Types' : l}</option>)}
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            <div className="ml-auto flex items-end h-full mt-5">
              <button 
                onClick={() => { setEdLevel('All'); setCategory('All'); setExamLevel('All'); setExamType('All'); setSearch(''); }}
                className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors px-4 py-2"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* CONTENT GRID */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-[#2B3B94]"></div>
          </div>
        ) : (
          <>
            {activeTab === 'exams' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {exams.length > 0 ? exams.map(renderExamCard) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                    <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No exams found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'degrees' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {degrees.length > 0 ? degrees.map(renderDegreeCard) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                    <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No degrees found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab !== 'exams' && activeTab !== 'degrees' && (
               <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-500">This section is currently under development.</p>
               </div>
            )}
          </>
        )}
      </div>

      {/* FLOATING ACTION BAR FOR EXAM COMPARISON */}
      {selectedExams.length > 0 && activeTab === 'exams' && (
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
                  <span className="max-w-[80px] truncate">{exam.name}</span>
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

      {/* FLOATING ACTION BAR FOR DEGREE COMPARISON */}
      {selectedDegrees.length > 0 && activeTab === 'degrees' && (
         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#2d1b69] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 z-50 animate-in slide-in-from-bottom-10 border border-purple-400/20">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-200 font-black">
                {selectedDegrees.length}
              </span>
              <span className="font-bold">Degrees Selected</span>
            </div>
            
            <div className="flex gap-2">
              {selectedDegrees.map(degree => (
                <div key={degree._id} className="bg-black/20 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <span className="max-w-[100px] truncate">{degree.name}</span>
                  <button onClick={() => toggleDegreeComparison(degree)} className="hover:text-red-400 text-gray-400">&times;</button>
                </div>
              ))}
            </div>

            <div className="w-px h-8 bg-white/10 mx-2"></div>

            <button 
              onClick={() => setSelectedDegrees([])} 
              className="text-sm font-semibold text-purple-200 hover:text-white transition-colors"
            >
              Clear
            </button>
            <button 
              onClick={() => setIsCompareDegreeModalOpen(true)}
              disabled={selectedDegrees.length < 2}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                selectedDegrees.length >= 2 
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20' 
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

      {isCompareDegreeModalOpen && (
         <DegreeComparisonModal 
            isOpen={isCompareDegreeModalOpen} 
            onClose={() => setIsCompareDegreeModalOpen(false)} 
            degrees={selectedDegrees} 
         />
      )}
    </div>
  );
}
