import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Share2, Compass, Bookmark, Clock, ShieldAlert,
  BookOpen, Building2, Search, Settings, GraduationCap, ChevronDown, ListFilter,
  Monitor, CheckCircle2, ChevronRight, Download, Info
} from 'lucide-react';
import { getStreamDetails, StreamData, CourseData } from '../../api/pathwayApi';

export default function DiplomaStreamDetail() {
  const { levelSlug, pathwaySlug, streamSlug } = useParams<{ levelSlug: string, pathwaySlug: string, streamSlug: string }>();
  const navigate = useNavigate();
  
  const [stream, setStream] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Courses');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Specific state for the 3-column layout "Courses" view
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeInnerTab, setActiveInnerTab] = useState('Subjects');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        if (streamSlug) {
          const data = await getStreamDetails(streamSlug);
          setStream(data);
          if (data && data.courses && data.courses.length > 0) {
            setActiveCourseId(data.courses[0]._id);
          }
        }
      } catch (error) {
        console.error('Error fetching stream:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [streamSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-[80vh] bg-[#F7F9FC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-[60vh] bg-[#F7F9FC]">
        <Compass className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Stream not found</h2>
        <p className="text-gray-500 mb-6 font-medium">The stream you are looking for does not exist.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const tabs = ['Overview', 'Courses', 'Branches', 'Specializations', 'Subjects', 'Careers', 'Colleges'];
  const innerTabs = ['Overview', 'Subjects', 'Branches', 'Specializations', 'Careers', 'Colleges'];

  const courses = stream.courses || [];
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCourse = courses.find(c => c._id === activeCourseId) || courses[0];

  return (
    <div className="w-full bg-[#F7F9FC] min-h-screen font-sans pb-20">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 pt-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-4 flex-wrap">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/streams')} className="hover:text-blue-600 transition-colors">Pathways & Streams</button>
          <span>/</span>
          <button onClick={() => navigate(`/pathways/${levelSlug}`)} className="hover:text-blue-600 transition-colors capitalize">
            {(levelSlug || '').replace(/-/g, ' ')}
          </button>
          <span>/</span>
          <button onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}`)} className="hover:text-blue-600 transition-colors capitalize">
            {(pathwaySlug || '').replace(/-/g, ' ')}
          </button>
          <span>/</span>
          <span className="text-blue-600">{stream.name}</span>
        </div>

        {/* Back Link */}
        <div className="mb-4">
           <button onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}`)} className="text-xs font-bold text-blue-700 flex items-center gap-1.5 hover:underline">
             <ArrowLeft className="w-3.5 h-3.5" /> Back to {(pathwaySlug || '').replace(/-/g, ' ')}
           </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6 relative overflow-hidden flex flex-col lg:flex-row gap-6 justify-between items-start">
          <div className="flex-1 max-w-2xl relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 shadow-sm">
                <Monitor className="w-7 h-7"/>
              </div>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">
                {stream.name}
              </h1>
            </div>
            
            <p className="text-sm font-medium text-gray-600 leading-relaxed max-w-xl mb-0">
              {stream.description || `Explore diploma courses in ${stream.name}. Choose a course to view subjects, branches, specializations, careers and colleges.`}
            </p>
          </div>

          {/* Floating Badge (Decorative) */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/4 bg-blue-50/80 backdrop-blur border border-blue-100 rounded-xl px-5 py-3 transform rotate-[-3deg] shadow-sm">
             <p className="text-sm font-black text-blue-800 italic">"Build your<br/>digital future"</p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10 w-full lg:w-auto mt-2 lg:mt-0">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm">
              <Settings className="w-4 h-4" /> Compare Courses (2)
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm">
              <Bookmark className="w-4 h-4 text-gray-400" /> Save Stream
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl transition-colors shadow-sm shrink-0">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-1 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm mb-6 max-w-5xl">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-xs font-bold transition-colors flex-1 text-center ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Info Cards */}
        {activeTab === 'Courses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden group">
               <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                 <Clock className="w-6 h-6"/>
               </div>
               <div>
                 <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">Popular Duration</div>
                 <div className="text-sm font-black text-gray-900">{stream.duration || 'Typically 3 Years'}</div>
                 <div className="text-[10px] font-medium text-gray-500 mt-0.5">(Varies by course/state)</div>
               </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
               <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                 <GraduationCap className="w-6 h-6"/>
               </div>
               <div>
                 <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">Eligibility</div>
                 <div className="text-sm font-black text-gray-900 line-clamp-1">{stream.eligibility || 'After 10th'}</div>
                 <div className="text-[10px] font-medium text-gray-500 mt-0.5">(Program specific)</div>
               </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
               <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                 <BookOpen className="w-6 h-6"/>
               </div>
               <div>
                 <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">Total Courses</div>
                 <div className="text-sm font-black text-gray-900">{courses.length ? `${courses.length}+` : 'Data unavailable'}</div>
                 <div className="text-[10px] font-medium text-gray-500 mt-0.5">(In database)</div>
               </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
               <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                 <Building2 className="w-6 h-6"/>
               </div>
               <div>
                 <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">Career Opportunities</div>
                 <div className="text-xs font-black text-gray-900 leading-tight">Software, IT Support,<br/>Networking, Cyber Security,<br/>Data Science & more</div>
               </div>
            </div>
          </div>
        )}

        {/* Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* LEFT & MIDDLE (Courses Active State) */}
          {activeTab === 'Courses' ? (
            <>
              {/* Left Column: Course List */}
              <div className="xl:col-span-4 flex flex-col gap-4">
                <h2 className="text-lg font-black text-gray-900">Diploma Courses in {stream.name} ({filteredCourses.length})</h2>
                
                {/* Search & Filters */}
                <div className="flex gap-2">
                   <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                     <input 
                       type="text" 
                       placeholder="Search courses..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 focus:border-blue-500 rounded-lg text-xs font-medium outline-none transition-all shadow-sm"
                     />
                   </div>
                </div>
                <div className="flex gap-2 mb-2">
                   <button className="flex items-center justify-between px-2 py-1.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-colors flex-1">
                     All States <ChevronDown className="w-3 h-3 ml-1" />
                   </button>
                   <button className="flex items-center justify-between px-2 py-1.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-colors flex-1">
                     All Institutions <ChevronDown className="w-3 h-3 ml-1" />
                   </button>
                   <button className="flex items-center justify-between px-2 py-1.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-colors flex-1">
                     Most Relevant <ChevronDown className="w-3 h-3 ml-1" />
                   </button>
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-3">
                  {filteredCourses.length > 0 ? filteredCourses.map(course => (
                    <div 
                      key={course._id}
                      onClick={() => setActiveCourseId(course._id)}
                      className={`bg-white rounded-xl border ${activeCourseId === course._id ? 'border-blue-500 shadow-md ring-1 ring-blue-500' : 'border-gray-200 shadow-sm hover:border-blue-300'} p-4 flex items-center justify-between cursor-pointer transition-all`}
                    >
                       <div className="flex gap-4 items-center overflow-hidden">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${activeCourseId === course._id ? 'bg-blue-100 text-blue-600' : 'bg-blue-50 text-blue-500'}`}>
                             <Monitor className="w-5 h-5"/>
                          </div>
                          <div className="min-w-0">
                            <h3 className={`text-sm font-black truncate ${activeCourseId === course._id ? 'text-blue-700' : 'text-gray-900'}`}>
                              {course.name}
                            </h3>
                            <p className="text-[10px] text-gray-500 font-medium mb-1 truncate">{stream.name}</p>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-600">
                               <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-gray-400"/> {course.duration || '3 Years'}</div>
                               <div className="flex items-center gap-1"><GraduationCap className="w-3 h-3 text-gray-400"/> After 10th</div>
                               <div className="flex items-center gap-1"><Building2 className="w-3 h-3 text-gray-400"/> Engineering</div>
                            </div>
                          </div>
                       </div>
                       <ChevronRight className={`w-4 h-4 shrink-0 ${activeCourseId === course._id ? 'text-blue-600' : 'text-gray-300'}`} />
                    </div>
                  )) : (
                    <div className="text-center py-10 bg-white border border-gray-200 rounded-xl shadow-sm">
                       <p className="text-sm font-bold text-gray-500">No verified courses match your filters.</p>
                    </div>
                  )}
                </div>
                
                {/* Pagination placeholder */}
                {filteredCourses.length > 0 && (
                  <div className="flex justify-center gap-2 mt-2">
                     <button className="w-7 h-7 flex items-center justify-center rounded bg-blue-600 text-white text-xs font-bold shadow-sm">1</button>
                     <button className="w-7 h-7 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold shadow-sm">2</button>
                     <button className="w-7 h-7 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold shadow-sm">3</button>
                     <button className="w-7 h-7 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold shadow-sm"><ChevronRight className="w-3 h-3"/></button>
                  </div>
                )}
              </div>

              {/* Middle Column: Course Detail Panel */}
              <div className="xl:col-span-5 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
                {activeCourse ? (
                  <>
                    <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                       <div className="flex gap-4">
                         <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Monitor className="w-6 h-6"/>
                         </div>
                         <div>
                            <h2 className="text-lg font-black text-gray-900 leading-snug">{activeCourse.name}</h2>
                            <p className="text-xs text-gray-500 font-medium">{stream.name}</p>
                         </div>
                       </div>
                       <div className="flex gap-2 shrink-0">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50">
                             <Bookmark className="w-3.5 h-3.5"/> Save
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 bg-blue-50/50">
                             <Settings className="w-3.5 h-3.5"/> Compare
                          </button>
                       </div>
                    </div>
                    
                    {/* Inner Tabs */}
                    <div className="flex overflow-x-auto border-b border-gray-100 hide-scrollbar">
                       {innerTabs.map(tab => (
                         <button
                           key={tab}
                           onClick={() => setActiveInnerTab(tab)}
                           className={`whitespace-nowrap px-5 py-3 text-xs font-bold border-b-2 transition-colors ${
                             activeInnerTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                           }`}
                         >
                           {tab}
                         </button>
                       ))}
                    </div>

                    {/* Detail Content Area */}
                    <div className="p-6 flex-1 bg-[#F9FAFB]/50">
                       {activeInnerTab === 'Subjects' && (
                         <div>
                           <h3 className="text-sm font-black text-gray-900 mb-3">Subjects (Typical Curriculum)</h3>
                           
                           <div className="bg-purple-50 rounded-lg p-3 mb-5 border border-purple-100 flex gap-3 items-start">
                              <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5"/>
                              <p className="text-[11px] font-medium text-purple-900 leading-relaxed">
                                Note: Subjects may vary by state, institution and curriculum. Please check the official syllabus of the respective board/institution.
                              </p>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              {/* Year 1 */}
                              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-emerald-100/60 px-4 py-2 text-xs font-black text-emerald-800 text-center border-b border-emerald-100">
                                  Year 1
                                </div>
                                <div className="p-4">
                                  <ul className="space-y-2 text-[10px] font-bold text-gray-600">
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Engineering Mathematics - I</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Engineering Physics</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Engineering Chemistry</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Engineering Drawing</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Basic Electrical Engineering</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Computer Fundamentals</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Workshop Practice</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Communication Skills</li>
                                  </ul>
                                </div>
                              </div>
                              {/* Year 2 */}
                              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-emerald-100/60 px-4 py-2 text-xs font-black text-emerald-800 text-center border-b border-emerald-100">
                                  Year 2
                                </div>
                                <div className="p-4">
                                  <ul className="space-y-2 text-[10px] font-bold text-gray-600">
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Data Structures</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Programming in C</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Digital Electronics</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Computer Organization</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Database Management Systems</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Object Oriented Programming</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Operating Systems</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"/> Web Technologies</li>
                                  </ul>
                                </div>
                              </div>
                              {/* Year 3 */}
                              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-purple-100/60 px-4 py-2 text-xs font-black text-purple-800 text-center border-b border-purple-100">
                                  Year 3
                                </div>
                                <div className="p-4">
                                  <ul className="space-y-2 text-[10px] font-bold text-gray-600">
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0"/> Software Engineering</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0"/> Computer Networks</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0"/> Mobile Application Development</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0"/> Cyber Security Fundamentals</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0"/> Cloud Computing (Elective)</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0"/> Artificial Intelligence (Elective)</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0"/> Project Work</li>
                                    <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0"/> Industrial Training</li>
                                  </ul>
                                </div>
                              </div>
                           </div>
                         </div>
                       )}

                       {activeInnerTab !== 'Subjects' && (
                         <div className="text-center py-16">
                           <Compass className="w-10 h-10 text-gray-300 mx-auto mb-3"/>
                           <h4 className="text-sm font-bold text-gray-900 mb-1">{activeInnerTab}</h4>
                           <p className="text-xs text-gray-500 font-medium">Verified data for {activeCourse.name} will appear here.</p>
                         </div>
                       )}
                    </div>

                    {/* Bottom Quick Actions */}
                    <div className="p-4 border-t border-gray-100 bg-white grid grid-cols-4 gap-4">
                       <button className="flex flex-col items-center text-center group">
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-1.5 group-hover:bg-blue-50 transition-colors">
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600"/>
                          </div>
                          <span className="text-[10px] font-black text-gray-900">View Full Details</span>
                          <span className="text-[9px] font-medium text-gray-500 leading-tight mt-0.5">Course overview, eligibility, admission</span>
                       </button>
                       <button className="flex flex-col items-center text-center group">
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-1.5 group-hover:bg-emerald-50 transition-colors">
                            <Building2 className="w-4 h-4 text-emerald-500"/>
                          </div>
                          <span className="text-[10px] font-black text-gray-900">Find Colleges</span>
                          <span className="text-[9px] font-medium text-gray-500 leading-tight mt-0.5">Colleges offering this course</span>
                       </button>
                       <button className="flex flex-col items-center text-center group">
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-1.5 group-hover:bg-blue-50 transition-colors">
                            <Compass className="w-4 h-4 text-blue-500"/>
                          </div>
                          <span className="text-[10px] font-black text-gray-900">Explore Careers</span>
                          <span className="text-[9px] font-medium text-gray-500 leading-tight mt-0.5">Jobs and career opportunities</span>
                       </button>
                       <button className="flex flex-col items-center text-center group">
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-1.5 group-hover:bg-orange-50 transition-colors">
                            <ShieldAlert className="w-4 h-4 text-orange-500"/>
                          </div>
                          <span className="text-[10px] font-black text-gray-900">Check Eligibility</span>
                          <span className="text-[9px] font-medium text-gray-500 leading-tight mt-0.5">Verify your eligibility</span>
                       </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                    <Monitor className="w-12 h-12 text-gray-200 mb-4" />
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Select a course</h3>
                    <p className="text-xs text-gray-500 font-medium">Choose a diploma course from the list to view detailed information.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
             <div className="xl:col-span-9 text-center py-32 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <Compass className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{activeTab} Section</h3>
                <p className="text-sm text-gray-500 font-medium max-w-md mx-auto">
                  Switch back to the <button onClick={() => setActiveTab('Courses')} className="text-blue-600 hover:underline">Courses tab</button> to view the detailed stream explorer and specific curriculums.
                </p>
             </div>
          )}

          {/* RIGHT SIDEBAR */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-black text-gray-900 text-sm">Quick Actions</h3>
                <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
                  See All <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="flex flex-col">
                {[
                  { icon: Building2, title: 'Find Colleges', subtitle: 'Explore colleges for diploma courses', color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/colleges' },
                  { icon: Settings, title: 'Compare Courses', subtitle: 'Compare different diploma courses', color: 'text-purple-600', bg: 'bg-purple-50', link: '#' },
                  { icon: ShieldAlert, title: 'Eligibility Checker', subtitle: 'Check your eligibility', color: 'text-orange-600', bg: 'bg-orange-50', link: '#' },
                  { icon: Compass, title: 'Explore Careers', subtitle: 'See career options after diploma', color: 'text-blue-600', bg: 'bg-blue-50', link: '/jobs' },
                  { icon: BookOpen, title: 'Download Syllabus', subtitle: 'Get course syllabus (if available)', color: 'text-red-600', bg: 'bg-red-50', link: '#' },
                  { icon: Download, title: 'Download Report', subtitle: 'Get your personalized report', color: 'text-blue-600', bg: 'bg-blue-50', link: '#' },
                ].map((action, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => action.link !== '#' ? navigate(action.link) : null}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                  >
                    <div className={`w-8 h-8 rounded-lg ${action.bg} ${action.color} flex items-center justify-center shrink-0`}>
                      <action.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-gray-900">{action.title}</div>
                      <div className="text-[10px] font-medium text-gray-500 mt-0.5 leading-tight">{action.subtitle}</div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-300 ml-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* Related Streams */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-black text-gray-900 text-sm">Related Diploma Streams</h3>
              </div>
              <div className="flex flex-col">
                 <div onClick={() => navigate('/pathways/after-10th/diploma/electrical-electronics')} className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0"><span className="text-sm font-black">⚡</span></div>
                    <div>
                       <h4 className="text-xs font-black text-gray-900 leading-tight">Electrical & Electronics</h4>
                       <p className="text-[9px] font-medium text-gray-500 mt-0.5">Work with power, electronics and modern tech</p>
                    </div>
                 </div>
                 <div onClick={() => navigate('/pathways/after-10th/diploma/mechanical-automobile')} className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"><Settings className="w-4 h-4"/></div>
                    <div>
                       <h4 className="text-xs font-black text-gray-900 leading-tight">Mechanical & Automobile</h4>
                       <p className="text-[9px] font-medium text-gray-500 mt-0.5">Design, build and drive innovation</p>
                    </div>
                 </div>
                 <div onClick={() => navigate('/pathways/after-10th/diploma/civil-construction')} className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0"><Building2 className="w-4 h-4"/></div>
                    <div>
                       <h4 className="text-xs font-black text-gray-900 leading-tight">Civil & Construction</h4>
                       <p className="text-[9px] font-medium text-gray-500 mt-0.5">Create infrastructure for a better tomorrow</p>
                    </div>
                 </div>
                 <div onClick={() => navigate('/pathways/after-10th/diploma/design-architecture')} className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center shrink-0"><span className="text-sm font-black">🎨</span></div>
                    <div>
                       <h4 className="text-xs font-black text-gray-900 leading-tight">Design & Architecture</h4>
                       <p className="text-[9px] font-medium text-gray-500 mt-0.5">Turn creativity into real-world careers</p>
                    </div>
                 </div>
                 <div onClick={() => navigate('/pathways/after-10th/diploma/chemical-allied')} className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center shrink-0"><span className="text-sm font-black">⚗️</span></div>
                    <div>
                       <h4 className="text-xs font-black text-gray-900 leading-tight">Chemical & Allied</h4>
                       <p className="text-[9px] font-medium text-gray-500 mt-0.5">Explore materials, processes and solutions</p>
                    </div>
                 </div>
              </div>
              <div className="p-3 border-t border-gray-100 text-center">
                 <button className="text-[10px] font-bold text-blue-600 hover:underline">View All Streams →</button>
              </div>
            </div>

            {/* Compare Drawer Preview */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-gray-900 text-sm">Compare Courses (2/4)</h3>
                  <button className="text-[10px] font-bold text-blue-600 hover:underline">Clear All</button>
               </div>
               <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                     <div className="flex items-center gap-2 overflow-hidden">
                        <Monitor className="w-3 h-3 text-blue-600 shrink-0"/>
                        <span className="text-[11px] font-bold text-gray-900 truncate">Diploma in Computer Science & Engg.</span>
                     </div>
                     <button className="text-red-500 hover:text-red-700 font-black text-sm shrink-0 px-1">×</button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                     <div className="flex items-center gap-2 overflow-hidden">
                        <Monitor className="w-3 h-3 text-blue-600 shrink-0"/>
                        <span className="text-[11px] font-bold text-gray-900 truncate">Diploma in Information Technology</span>
                     </div>
                     <button className="text-red-500 hover:text-red-700 font-black text-sm shrink-0 px-1">×</button>
                  </div>
               </div>
               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-sm">
                  Compare Now →
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
