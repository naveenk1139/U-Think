import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getPathwayBySlug, PathwayData } from '../../api/pathwayApi';
import { 
  ArrowLeft, Clock, GraduationCap, Share2, Heart, Wrench, Building2, 
  ChevronRight, BookOpen, Settings, Settings2, ShieldCheck, Map,
  ArrowRight, CheckCircle, Target, Search, Palette, Zap, Beaker, Leaf, Monitor, Component, Briefcase,
  FileText, CalendarDays, Lightbulb
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';


// Polytechnic Stream icon mapping
const getIconForStream = (slug: string) => {
  if (slug.includes('computer') || slug.includes('it')) return <Monitor className="w-6 h-6 text-[#2563EB]" />;
  if (slug.includes('electrical')) return <Zap className="w-6 h-6 text-[#D97706]" />;
  if (slug.includes('mechanical')) return <Settings className="w-6 h-6 text-[#BE123C]" />;
  if (slug.includes('civil')) return <Building2 className="w-6 h-6 text-[#059669]" />;
  if (slug.includes('design') || slug.includes('architecture')) return <Palette className="w-6 h-6 text-[#7C3AED]" />;
  if (slug.includes('chemical')) return <Beaker className="w-6 h-6 text-[#DB2777]" />;
  if (slug.includes('agriculture')) return <Leaf className="w-6 h-6 text-[#16A34A]" />;
  return <Component className="w-6 h-6 text-[#EA580C]" />;
};

const DiplomaDetail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  
  const [pathway, setPathway] = useState<PathwayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isSaved, setIsSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('All States');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPathwayData = async () => {
      try {
        setLoading(true);
        const data = await getPathwayBySlug('diploma');
        setPathway(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load Diploma pathway:', err);
        setError('Unable to load diploma data.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPathwayData();
  }, []);

  const handleTabChange = (tabId: string) => {
    if (tabId === 'overview') {
      setSearchParams(new URLSearchParams());
    } else {
      setSearchParams({ tab: tabId });
    }
  };

  const handleSaveToggle = () => {
    if (!currentUser) {
      alert("Please log in to save this pathway.");
      return;
    }
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Diploma (Polytechnic) - U-THINK',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Share error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-[80vh] bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error || !pathway) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-[60vh] bg-white">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Error</h2>
        <p className="text-gray-500 mb-6 font-medium">{error || 'Pathway not found'}</p>
        <button 
          onClick={() => navigate('/pathways/after-10th')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors"
        >
          Back to Pathways
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'streams', label: 'Streams' },
    { id: 'courses', label: 'Courses' },
    { id: 'branches', label: 'Branches' },
    { id: 'specializations', label: 'Specializations' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'admission', label: 'Admission' },
    { id: 'careers', label: 'Careers' },
    { id: 'colleges', label: 'Colleges' },
    { id: 'compare', label: 'Compare' },
  ];

  const polytechnicStreams = pathway.streams || [];

  // Filter streams based on search query
  const filteredStreams = polytechnicStreams.filter(stream => 
    stream.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stream.courses?.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans pb-16">
      
      <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500 mb-5">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/pathways/after-10th')} className="hover:text-blue-600 transition-colors">Pathways & Streams</button>
          <span>/</span>
          <button onClick={() => navigate('/pathways/after-10th')} className="hover:text-blue-600 transition-colors">After 10th</button>
          <span>/</span>
          <span className="text-gray-900">Diploma (Polytechnic)</span>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate('/pathways/after-10th')}
          className="flex items-center gap-1.5 text-blue-700 hover:text-blue-800 hover:underline font-bold text-sm mb-4 transition-colors w-max"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" /> Back to After 10th
        </button>

        {/* Hero Section */}
        <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm mb-6 flex flex-col gap-6 relative overflow-hidden">
          
          <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
            <div className="flex-1 max-w-4xl z-10">
              <h1 className="text-3xl md:text-[38px] font-extrabold text-[#0B1F44] tracking-tight mb-2">
                Diploma (Polytechnic) Courses
              </h1>
              <p className="text-[14px] font-medium text-gray-600 leading-relaxed max-w-3xl">
                Explore diploma courses, streams, branches and specializations after 10th. Choose the right technical pathway based on your interests, strengths and career goals.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 shrink-0 z-10 w-full xl:w-auto">
              <button 
                onClick={() => navigate('/pathways/after-10th/compare')}
                className="w-full xl:w-[220px] flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
              >
                <Settings2 className="w-4 h-4" /> Compare Courses
              </button>
              <div className="flex gap-2.5 w-full xl:w-[220px]">
                <button 
                  onClick={handleSaveToggle}
                  className={`flex-1 flex items-center justify-center gap-2 border px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    isSaved ? 'bg-blue-50 text-[#2563EB] border-blue-200' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} /> {isSaved ? 'Saved' : 'Save Pathway'}
                </button>
                <button 
                  onClick={handleShare} 
                  className="shrink-0 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 w-11 py-2.5 rounded-xl font-bold text-sm transition-colors" 
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Floating Badge (Decorative) */}
          <div className="hidden xl:flex absolute top-4 right-[250px] items-center gap-3 bg-blue-50/50 rounded-2xl p-3 border border-blue-100/50 z-0">
             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
               <Building2 className="w-6 h-6 text-[#EA580C]" />
             </div>
             <div className="text-blue-800 font-medium italic text-[15px] leading-snug font-serif pr-2">
               "Skills today<br/>Better career<br/>tomorrow"
             </div>
          </div>

          {/* Info Cards Row inside Hero */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            <div className="bg-gray-50/50 border border-gray-100 rounded-[14px] p-4 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-emerald-100/60 text-emerald-600 flex items-center justify-center shrink-0">
                 <Clock className="w-6 h-6 stroke-[2]"/>
               </div>
               <div>
                 <div className="text-[12px] font-extrabold text-gray-900 mb-0.5">Duration</div>
                 <div className="text-[13px] font-bold text-gray-900 leading-tight">Usually 3 Years</div>
                 <div className="text-[10px] font-medium text-gray-500">(Varies by course/state)</div>
               </div>
            </div>
            
            <div className="bg-gray-50/50 border border-gray-100 rounded-[14px] p-4 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-purple-100/60 text-purple-600 flex items-center justify-center shrink-0">
                 <GraduationCap className="w-6 h-6 stroke-[2]"/>
               </div>
               <div>
                 <div className="text-[12px] font-extrabold text-gray-900 mb-0.5">Eligibility</div>
                 <div className="text-[13px] font-bold text-gray-900 leading-tight">10th Pass</div>
                 <div className="text-[10px] font-medium text-gray-500">(Varies by board/state)</div>
               </div>
            </div>

            <div className="bg-gray-50/50 border border-gray-100 rounded-[14px] p-4 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-orange-100/60 text-orange-600 flex items-center justify-center shrink-0">
                 <BookOpen className="w-6 h-6 stroke-[2]"/>
               </div>
               <div>
                 <div className="text-[12px] font-extrabold text-gray-900 mb-0.5">Streams</div>
                 <div className="text-[13px] font-bold text-gray-900 leading-tight">{pathway.streams?.length || 8} Major Streams</div>
                 <div className="text-[10px] font-medium text-gray-500">(Multiple specializations)</div>
               </div>
            </div>

            <div className="bg-gray-50/50 border border-gray-100 rounded-[14px] p-4 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-blue-100/60 text-[#2563EB] flex items-center justify-center shrink-0">
                 <Briefcase className="w-6 h-6 stroke-[2]"/>
               </div>
               <div>
                 <div className="text-[12px] font-extrabold text-gray-900 mb-0.5">Career Opportunities</div>
                 <div className="text-[11px] font-medium text-gray-600 leading-tight">Technical roles, Higher studies, Government jobs & more</div>
               </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 pb-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => handleTabChange(t.id)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                activeTab === t.id 
                  ? 'bg-[#2563EB] text-white shadow-sm' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Info Banner */}
        <div className="bg-purple-50 border border-purple-100 rounded-[16px] p-4 flex items-start gap-3 mb-6 shadow-sm">
          <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
            i
          </div>
          <p className="text-[13px] text-purple-900 font-medium leading-relaxed pt-0.5">
            <span className="font-extrabold">Diploma (Polytechnic)</span> provides technical and practical education after 10th through specialized diploma programs. Explore streams, courses, branches and career opportunities. Course availability, duration, eligibility and admission criteria may vary by state and institution.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
          
          {/* MAIN COLUMN */}
          <div className="space-y-8 min-w-0">
            
            {(activeTab === 'overview' || activeTab === 'streams') && (
              <div>
                {/* Search and Filters Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0B1F44] tracking-tight">Diploma Streams</h2>
                    <p className="text-[13px] font-medium text-gray-600">Explore diploma streams and select a stream to discover courses, branches, specializations and careers.</p>
                  </div>
                  
                  <div className="flex gap-3 shrink-0">
                    <div className="relative w-full md:w-[260px] bg-white rounded-lg border border-gray-200 shadow-sm flex items-center">
                      <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search diploma courses or branches..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-transparent border-none outline-none text-[12px] font-bold placeholder:text-gray-400"
                      />
                    </div>
                    <select 
                      value={stateFilter}
                      onChange={(e) => setStateFilter(e.target.value)}
                      className="bg-white border border-gray-200 text-gray-700 text-[13px] font-bold rounded-lg px-4 py-2.5 focus:outline-none shadow-sm cursor-pointer appearance-none pr-8 relative"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                    >
                      <option value="All States">All States</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                  </div>
                </div>

                {filteredStreams.length === 0 ? (
                  <div className="bg-white border border-gray-200 rounded-[16px] p-12 text-center shadow-sm">
                    <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-gray-900 font-bold mb-1">No streams found</h3>
                    <p className="text-gray-500 text-sm font-medium">Try adjusting your search terms or filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredStreams.map(stream => {
                      // Determine colors based on stream slug
                      let colorScheme = { bg: 'bg-orange-50/50', border: 'border-orange-100', iconBg: 'bg-white', dot: 'bg-orange-500' };
                      if (stream.slug.includes('computer')) colorScheme = { bg: 'bg-blue-50/40', border: 'border-blue-100', iconBg: 'bg-white', dot: 'bg-[#2563EB]' };
                      else if (stream.slug.includes('electrical')) colorScheme = { bg: 'bg-yellow-50/40', border: 'border-yellow-100', iconBg: 'bg-white', dot: 'bg-[#D97706]' };
                      else if (stream.slug.includes('mechanical')) colorScheme = { bg: 'bg-pink-50/40', border: 'border-pink-100', iconBg: 'bg-white', dot: 'bg-[#BE123C]' };
                      else if (stream.slug.includes('civil')) colorScheme = { bg: 'bg-emerald-50/40', border: 'border-emerald-100', iconBg: 'bg-white', dot: 'bg-[#059669]' };
                      else if (stream.slug.includes('design')) colorScheme = { bg: 'bg-purple-50/40', border: 'border-purple-100', iconBg: 'bg-white', dot: 'bg-[#7C3AED]' };
                      else if (stream.slug.includes('chemical')) colorScheme = { bg: 'bg-pink-50/30', border: 'border-pink-100', iconBg: 'bg-white', dot: 'bg-[#DB2777]' };
                      else if (stream.slug.includes('agriculture')) colorScheme = { bg: 'bg-green-50/40', border: 'border-green-100', iconBg: 'bg-white', dot: 'bg-[#16A34A]' };

                      return (
                        <div key={stream._id} className={`rounded-[16px] border ${colorScheme.border} ${colorScheme.bg} p-5 flex flex-col hover:shadow-md transition-shadow`}>
                          
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-xl ${colorScheme.iconBg} shadow-sm border border-gray-100 flex items-center justify-center shrink-0`}>
                              {getIconForStream(stream.slug)}
                            </div>
                            <div>
                              <h3 className="text-[15px] font-extrabold text-[#0B1F44] leading-tight mb-1">{stream.name}</h3>
                              <p className="text-[12px] font-medium text-gray-600 leading-snug line-clamp-2">
                                {stream.description || 'Build your future with specialized technical skills.'}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2.5 flex-1 pl-1">
                            {stream.courses?.slice(0, 5).map(course => (
                              <div 
                                key={course._id} 
                                className="flex items-center gap-2 text-[12px] font-bold text-[#0B1F44] cursor-pointer hover:text-blue-600 transition-colors"
                                onClick={() => navigate(`/courses/${course.slug}`)}
                              >
                                <div className={`w-1.5 h-1.5 rounded-full ${colorScheme.dot} shrink-0`}></div>
                                <span className="truncate">{course.name}</span>
                              </div>
                            ))}
                            {stream.courses && stream.courses.length > 5 && (
                              <div className="text-[12px] font-bold text-gray-500 pl-3.5">+ {stream.courses.length - 5} more</div>
                            )}
                            {(!stream.courses || stream.courses.length === 0) && (
                              <div className="text-[12px] font-bold text-gray-400 pl-3.5 italic">Courses coming soon...</div>
                            )}
                          </div>

                          <div className="mt-5 pt-4 flex items-center justify-between border-t border-gray-200/50">
                            <span className="text-[12px] font-extrabold text-blue-800/70">{stream.courses?.length || 0} courses</span>
                            <button 
                              onClick={() => navigate(`/pathways/after-10th/diploma/${stream.slug}`)}
                              className="text-[13px] font-extrabold text-[#2563EB] hover:text-blue-800 flex items-center gap-1 transition-colors"
                            >
                              View Courses <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Popular / Featured Diploma Courses */}
            {(activeTab === 'overview' || activeTab === 'courses') && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-extrabold text-[#0B1F44]">Featured Diploma Courses</h2>
                  <button onClick={() => handleTabChange('courses')} className="text-[12px] font-bold text-[#2563EB] hover:underline flex items-center">
                    View All Courses <ArrowRight className="w-3.5 h-3.5 ml-0.5 stroke-[2.5]" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {/* Generate Featured courses deterministically from the first 4 available courses in the data */}
                  {pathway.streams?.flatMap(s => s.courses || []).slice(0, 4).map((course, idx) => {
                    const icons = [Monitor, Settings, Zap, Building2, Wrench, Beaker];
                    const bgColors = ['bg-blue-50', 'bg-pink-50', 'bg-orange-50', 'bg-emerald-50'];
                    const textColors = ['text-blue-600', 'text-pink-600', 'text-orange-600', 'text-emerald-600'];
                    const Icon = icons[idx % icons.length];
                    
                    return (
                      <div 
                        key={course._id || idx}
                        onClick={() => navigate(`/courses/${course.slug}`)}
                        className="bg-white border border-gray-200 rounded-[14px] p-4 shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-blue-200 group flex flex-col justify-between"
                      >
                        <div>
                          <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 mb-3 ${bgColors[idx % bgColors.length]}`}>
                            <Icon className={`w-5 h-5 ${textColors[idx % textColors.length]}`} />
                          </div>
                          <h3 className="text-[13px] font-extrabold text-[#0B1F44] leading-tight group-hover:text-[#2563EB] transition-colors mb-2 line-clamp-2">{course.name}</h3>
                          <p className="text-[11px] font-medium text-gray-500 mb-4">{course.branches?.length || 0} branches available</p>
                        </div>
                        <button className="text-[11px] font-bold text-[#2563EB] flex items-center gap-1 hover:underline mt-auto pt-3 border-t border-gray-100">
                          View Details <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Other Generic Tab Placeholders */}
            {activeTab !== 'overview' && activeTab !== 'streams' && activeTab !== 'courses' && (
              <div className="bg-white rounded-[16px] p-16 text-center border border-gray-200 shadow-sm">
                 <ShieldCheck className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                 <h2 className="text-xl font-extrabold text-[#0B1F44] mb-2 capitalize">{activeTab} Details</h2>
                 <p className="text-sm font-medium text-gray-500 max-w-md mx-auto">
                   Detailed information regarding {activeTab.replace('-', ' ')} for Diploma (Polytechnic) courses will appear here. Navigate using the tabs or view specific streams.
                 </p>
              </div>
            )}

            {/* Education Journey */}
            {(activeTab === 'overview') && (
              <div className="mt-8 bg-white border border-gray-200 rounded-[16px] p-6 shadow-sm overflow-hidden relative">
                <h3 className="text-lg font-extrabold text-[#0B1F44] mb-8">Your Education Journey</h3>
                
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute top-6 left-8 right-8 h-0.5 bg-gray-100 z-0"></div>
                  
                  <div className="flex justify-between items-start relative z-10 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2 gap-4">
                    {[
                      { step: '10th', desc: 'Complete 10th', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                      { step: 'Choose Pathway', desc: 'Select your path', icon: Target, color: 'text-pink-500', bg: 'bg-pink-50' },
                      { step: 'Diploma', desc: 'Choose a stream', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { step: 'Course', desc: 'Select a course', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { step: 'Branch', desc: 'Explore specializations', icon: Monitor, color: 'text-purple-600', bg: 'bg-purple-50' },
                      { step: 'Career', desc: 'Explore career options', icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-50' },
                      { step: 'Jobs', desc: 'Find job opportunities', icon: Search, color: 'text-teal-500', bg: 'bg-teal-50' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center min-w-[90px] cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center mb-3 shadow-sm group-hover:border-blue-100 group-hover:scale-110 transition-all z-10 relative">
                          <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                        </div>
                        <span className="text-[12px] font-extrabold text-[#0B1F44] text-center mb-1 group-hover:text-[#2563EB] transition-colors">{item.step}</span>
                        <span className="text-[10px] font-medium text-gray-500 text-center leading-tight">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-[16px] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-[#0B1F44] text-[15px]">Quick Actions</h3>
                <button className="text-[11px] font-bold text-[#2563EB] hover:underline flex items-center">
                  See All <ArrowRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {[
                  { title: 'Find Colleges', desc: 'Explore colleges for diploma courses', icon: BookOpen, color: 'text-teal-600', bg: 'bg-teal-50', path: '/colleges' },
                  { title: 'Compare Courses', desc: 'Compare different diploma courses', icon: Settings2, color: 'text-purple-600', bg: 'bg-purple-50', path: '/pathways/after-10th/compare' },
                  { title: 'Eligibility Checker', desc: 'Check your eligibility', icon: ShieldCheck, color: 'text-orange-600', bg: 'bg-orange-50', path: '/quiz' },
                  { title: 'Explore Careers', desc: 'See career options after diploma', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', path: '/jobs' },
                  { title: 'Entrance / Admission', desc: 'Find admission process & dates', icon: Target, color: 'text-pink-600', bg: 'bg-pink-50', path: '#' },
                  { title: 'Download Report', desc: 'Get your personalized report', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50', path: '#' }
                ].map((action, i) => (
                  <button key={i} onClick={() => { if(action.path !== '#') navigate(action.path); }} className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 border border-transparent transition-colors group text-left">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg ${action.bg} ${action.color} flex items-center justify-center shrink-0`}>
                        <action.icon className="w-4 h-4 stroke-[2.5]"/>
                      </div>
                      <div>
                        <div className="text-[13px] font-extrabold text-[#0B1F44] group-hover:text-[#2563EB] transition-colors">{action.title}</div>
                        <div className="text-[11px] font-medium text-gray-500 leading-tight">{action.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#2563EB] transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Related Pathways */}
            <div className="bg-white border border-gray-200 rounded-[16px] p-5 shadow-sm">
              <h3 className="font-extrabold text-[#0B1F44] text-[15px] mb-4">Related Pathways</h3>
              <div className="space-y-3">
                {[
                  { title: 'PUC (11th-12th)', sub: 'Explore higher secondary education', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', route: '/pathways/after-10th/puc-11th-12th' },
                  { title: 'ITI (Industrial Training Institute)', sub: 'Explore ITI trades', icon: Settings, color: 'text-orange-600', bg: 'bg-orange-50', route: '/pathways/after-10th/it-polytechnic' },
                  { title: 'Paramedical / Allied Health', sub: 'Healthcare and medical courses', icon: Heart, color: 'text-emerald-600', bg: 'bg-emerald-50', route: '/pathways/after-10th/paramedical-allied-health' },
                  { title: 'Vocational Education', sub: 'Skill-based short-term programs', icon: Target, color: 'text-pink-600', bg: 'bg-pink-50', route: '/pathways/after-10th/vocational-education' },
                  { title: 'Apprenticeship / Skill Training', sub: 'On-the-job learning programs', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', route: '/pathways/after-10th/apprenticeship-skill-training' }
                ].map((pathway, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => navigate(pathway.route)}
                    className="flex gap-3.5 cursor-pointer group p-1"
                  >
                    <div className={`w-[38px] h-[38px] rounded-xl ${pathway.bg} ${pathway.color} flex items-center justify-center shrink-0`}>
                      <pathway.icon className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-extrabold text-[#0B1F44] group-hover:text-[#2563EB] transition-colors">{pathway.title}</div>
                      <div className="text-[11px] font-medium text-gray-500 line-clamp-1">{pathway.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Updates */}
            <div className="bg-white border border-gray-200 rounded-[16px] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-[#0B1F44] text-[15px]">Latest Updates</h3>
                <button className="text-[11px] font-bold text-[#2563EB] hover:underline flex items-center">
                  View All <ArrowRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3 cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold text-[#0B1F44] group-hover:text-[#2563EB] transition-colors leading-snug mb-1">
                      Diploma Admission 2025 - Key Dates
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">Apr 12, 2025</div>
                  </div>
                </div>
                
                <div className="flex gap-3 cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold text-[#0B1F44] group-hover:text-[#2563EB] transition-colors leading-snug mb-1">
                      New Diploma Courses in Emerging Tech
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">Mar 28, 2025</div>
                  </div>
                </div>
                
                <div className="flex gap-3 cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold text-[#0B1F44] group-hover:text-[#2563EB] transition-colors leading-snug mb-1">
                      State-wise Polytechnic Seat Matrix
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">Mar 15, 2025</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Promotion Banner */}
            <div className="bg-[#0B1F44] rounded-[16px] p-6 text-white relative overflow-hidden shadow-lg">
               <div className="absolute top-0 right-0 p-4">
                 <div className="w-8 h-8 text-yellow-400 opacity-80">
                   <Lightbulb className="w-full h-full fill-current" />
                 </div>
               </div>
               <h3 className="text-[14px] font-extrabold mb-2 max-w-[200px] leading-snug">Not sure which diploma path is right for you?</h3>
               <p className="text-[11px] text-blue-200 font-medium leading-relaxed mb-5">
                 Take the U-THINK aptitude test to get personalized pathway recommendations.
               </p>
               <button onClick={() => navigate('/quiz')} className="w-full bg-white text-[#0B1F44] hover:bg-gray-100 text-[13px] font-bold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-1.5 shadow-sm">
                 Take Aptitude Test <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
               </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DiplomaDetail;
