import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, GraduationCap, Award, MapPin, Building, ArrowRight, Bookmark, Filter, ChevronDown, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { StructuredExam, StructuredDegree } from '../types';

interface ExamsDirectoryProps {
  initialTab?: 'exams' | 'degrees' | 'specializations';
  onNavigateToSpec?: (specId: string) => void;
  onNavigateToJobExplorer?: (role: string) => void;
}

const EDUCATION_LEVELS = ['All', 'After 10th', '12TH_SCIENCE', '12TH_ARTS', '12TH_COMMERCE', 'Diploma', 'ITI', 'UG', 'PG', 'PhD'];
const CATEGORIES = ['All', 'Engineering', 'Medical', 'Management', 'Commerce', 'Law', 'Design', 'Science', 'Arts', 'Architecture', 'Agriculture', 'Pharmacy', 'Nursing', 'Paramedical', 'Vocational'];
const EXAM_LEVELS = ['All', 'National', 'State', 'University', 'Institute', 'Government'];

export default function ExamsDirectory({ initialTab = 'exams', onNavigateToSpec, onNavigateToJobExplorer }: ExamsDirectoryProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'exams' | 'degrees' | 'specializations' | 'compare' | 'saved'>(initialTab);
  
  const [exams, setExams] = useState<StructuredExam[]>([]);
  const [degrees, setDegrees] = useState<StructuredDegree[]>([]);
  
  const [search, setSearch] = useState('');
  const [edLevel, setEdLevel] = useState('All');
  const [category, setCategory] = useState('All');
  const [examLevel, setExamLevel] = useState('All');
  
  const [loading, setLoading] = useState(true);
  const [expandedExam, setExpandedExam] = useState<string | null>(null);
  const [expandedDegree, setExpandedDegree] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [search, edLevel, category, examLevel, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'exams') {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (edLevel !== 'All') query.append('educationLevel', edLevel);
        if (category !== 'All') query.append('category', category);
        if (examLevel !== 'All') query.append('level', examLevel);
        
        const res = await fetch(`http://localhost:5000/api/exams?${query.toString()}`);
        const data = await res.json();
        setExams(data);
      } else if (activeTab === 'degrees') {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (category !== 'All') query.append('category', category);
        if (edLevel !== 'All') {
           // Basic mapping
           if (edLevel === 'UG' || edLevel === 'PG' || edLevel === 'Diploma' || edLevel === 'ITI') {
             query.append('level', edLevel);
           }
        }
        
        const res = await fetch(`http://localhost:5000/api/degrees?${query.toString()}`);
        const data = await res.json();
        setDegrees(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const renderExamCard = (exam: StructuredExam) => {
    const isExpanded = expandedExam === exam._id;
    
    return (
      <div key={exam._id} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              {exam.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{exam.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">{exam.category}</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">{exam.level}</span>
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md">{exam.status}</span>
              </div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-blue-600">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">Conducting Body: {exam.conductingBody}</p>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Eligibility</h4>
              <p className="text-sm text-slate-600">{exam.eligibility?.qualification}</p>
              <p className="text-xs text-slate-500">{exam.eligibility?.details}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Important Dates</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>Application: {exam.importantDates?.applicationStart} - {exam.importantDates?.applicationEnd}</li>
                <li>Exam Date: {exam.importantDates?.examDate}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Subjects & Mode</h4>
              <p className="text-sm text-slate-600">Mode: {exam.examMode}</p>
              <p className="text-sm text-slate-600">Subjects: {exam.subjects?.join(', ')}</p>
            </div>
            <div className="flex gap-2 pt-2">
               <a href={`https://${exam.officialWebsite}`} target="_blank" rel="noreferrer" className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-semibold text-center transition-colors">
                 Official Website
               </a>
               <button onClick={() => navigate(`/colleges?category=${exam.category}`)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                 Explore Colleges
               </button>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setExpandedExam(isExpanded ? null : exam._id)}
          className="mt-4 w-full text-center text-sm font-bold text-blue-600 hover:text-blue-700 py-2 flex items-center justify-center gap-1"
        >
          {isExpanded ? 'Show Less' : 'View Details'} <ChevronDown className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    );
  };

  const renderDegreeCard = (degree: StructuredDegree) => {
    const isExpanded = expandedDegree === degree._id;
    
    return (
      <div key={degree._id} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{degree.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md">{degree.level}</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">{degree.category}</span>
                <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-md">{degree.duration}</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{degree.overview}</p>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Eligibility</h4>
              <p className="text-sm text-slate-600">{degree.eligibility?.qualification}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Admission Routes</h4>
              <div className="flex flex-wrap gap-2">
                {degree.admissionRoutes?.map(route => (
                  <span key={route} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">{route}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Career Options</h4>
              <div className="flex flex-wrap gap-2">
                {degree.careers?.map(career => (
                  <button key={career} onClick={() => navigate(`/jobs?role=${encodeURIComponent(career)}`)} className="px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold rounded-md cursor-pointer transition-colors">
                    {career}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
               <button onClick={() => navigate(`/colleges?category=${degree.category}`)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                 Explore Colleges
               </button>
               <button onClick={() => navigate(`/mentorship`)} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                 Talk to Mentor
               </button>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setExpandedDegree(isExpanded ? null : degree._id)}
          className="mt-4 w-full text-center text-sm font-bold text-purple-600 hover:text-purple-700 py-2 flex items-center justify-center gap-1"
        >
          {isExpanded ? 'Show Less' : 'View Details'} <ChevronDown className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Header section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Exams & Degrees Explorer</h1>
              <p className="text-slate-500 mt-1">Find the right entrance exam, degree, and career pathway for you.</p>
            </div>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search exams, degrees, courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none font-medium"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>
          
          {/* Main Tabs */}
          <div className="flex gap-6 mt-8 border-b border-slate-100">
            <button
              onClick={() => setActiveTab('exams')}
              className={`pb-4 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'exams' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Exams Hub
            </button>
            <button
              onClick={() => setActiveTab('degrees')}
              className={`pb-4 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'degrees' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Degrees & Profiles
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <Filter className="w-4 h-4" /> Filters:
          </div>
          
          <div className="relative group">
             <select 
               value={edLevel} 
               onChange={e => setEdLevel(e.target.value)}
               className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg pl-3 pr-8 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
             >
               {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l === 'All' ? 'All Education Levels' : l}</option>)}
             </select>
             <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <div className="relative group">
             <select 
               value={category} 
               onChange={e => setCategory(e.target.value)}
               className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg pl-3 pr-8 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
             >
               {CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
             </select>
             <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {activeTab === 'exams' && (
            <div className="relative group">
               <select 
                 value={examLevel} 
                 onChange={e => setExamLevel(e.target.value)}
                 className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg pl-3 pr-8 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
               >
                 {EXAM_LEVELS.map(l => <option key={l} value={l}>{l === 'All' ? 'All Exam Levels' : l}</option>)}
               </select>
               <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          )}
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'exams' && exams.length > 0 && exams.map(renderExamCard)}
            {activeTab === 'exams' && exams.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500">
                No exams found matching your criteria. Try adjusting your filters.
              </div>
            )}
            
            {activeTab === 'degrees' && degrees.length > 0 && degrees.map(renderDegreeCard)}
            {activeTab === 'degrees' && degrees.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500">
                No degrees found matching your criteria. Try adjusting your filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
