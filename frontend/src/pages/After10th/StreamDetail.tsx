import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStreamDetails, StreamData, SubjectCombinationData } from '../../api/pathwayApi';
import { 
  ArrowLeft, Clock, GraduationCap, Target, Briefcase, Share2, 
  Heart, ShieldAlert, ArrowRight, BookOpen, Compass, Search, 
  ChevronRight, Building2, FlaskConical, Settings, Globe,
  CheckCircle, Plus
} from 'lucide-react';

const StreamDetail: React.FC = () => {
  const { levelSlug, pathwaySlug, streamSlug } = useParams<{ levelSlug: string, pathwaySlug: string, streamSlug: string }>();
  const navigate = useNavigate();
  const [stream, setStream] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Combinations');

  useEffect(() => {
    const fetchDetail = async () => {
      if (!streamSlug) return;
      try {
        setLoading(true);
        const data = await getStreamDetails(streamSlug);
        setStream(data);
      } catch (error) {
        console.error('Failed to load stream detail:', error);
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

  // Derive unique tabs from actual combinations
  const tabs = ['All Combinations'];
  const combinations = stream.subjectCombinations || [];
  
  // Just for nice UI tabs, let's pick up to 4 top combinations + "Other Combinations"
  const sortedCombos = [...combinations].sort((a, b) => b.subjects.length - a.subjects.length); // arbitrary sort
  sortedCombos.slice(0, 4).forEach(c => tabs.push(c.name));
  if (sortedCombos.length > 4) tabs.push('Other Combinations');

  // Filter logic
  const filteredCombos = combinations.filter(combo => {
    // 1. Search Query
    if (searchQuery) {
      const matchName = combo.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSubjects = combo.subjects?.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!matchName && !matchSubjects) return false;
    }
    // 2. Tab filtering
    if (activeTab === 'All Combinations') return true;
    if (activeTab === 'Other Combinations') {
       return !tabs.slice(1, -1).includes(combo.name);
    }
    return combo.name === activeTab;
  });

  return (
    <div className="w-full bg-[#F7F9FC] min-h-screen font-sans pb-20">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 pt-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-4 flex-wrap">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/streams')} className="hover:text-blue-600 transition-colors">Pathways & Streams</button>
          <span>/</span>
          <button onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}`)} className="hover:text-blue-600 transition-colors capitalize">
            {(pathwaySlug || '').replace(/-/g, ' ')}
          </button>
          <span>/</span>
          <span className="text-gray-900">{stream.name}</span>
        </div>

        {/* System Live Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="text-xs font-black text-blue-900 uppercase tracking-widest">System Live</div>
            <div className="hidden md:block w-1 h-1 bg-blue-300 rounded-full mx-1"></div>
            <div className="text-sm font-medium text-blue-800">Welcome to U-THINK. Explore and map education pathways, streams, courses and careers.</div>
          </div>
          <button onClick={() => navigate('/quiz')} className="shrink-0 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm">
            Take Aptitude Test <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm mb-6 relative overflow-hidden flex flex-col lg:flex-row gap-8 justify-between">
          <div className="flex-1 max-w-2xl relative z-10">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-blue-600 hover:underline font-bold text-xs mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to {(pathwaySlug || '').replace(/-/g, ' ').toUpperCase()}
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">{stream.name} Stream</h1>
              <div className="hidden sm:flex w-12 h-12 rounded-full bg-blue-50 items-center justify-center text-blue-600 shrink-0">
                {stream.slug === 'science' ? <FlaskConical className="w-6 h-6"/> : 
                 stream.slug === 'commerce' ? <Building2 className="w-6 h-6"/> : 
                 stream.slug === 'arts' ? <Globe className="w-6 h-6"/> : <Settings className="w-6 h-6"/>}
              </div>
            </div>
            
            <p className="text-sm font-medium text-gray-600 leading-relaxed max-w-xl">
              {stream.description || `Explore different subject combinations under ${stream.name}. Choose the right combination based on your interests and career goals.`}
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0 relative z-10 justify-start w-full lg:w-auto">
            <button className="w-full lg:w-[220px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm">
              Compare Combinations
            </button>
            <div className="flex gap-3 w-full lg:w-[220px]">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-bold text-sm transition-colors">
                <Heart className="w-4 h-4" /> Save Stream
              </button>
              <button className="shrink-0 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-bold text-sm transition-colors" title="Share">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Subtle bg decoration */}
          {stream.slug === 'science' && (
            <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none transform translate-x-1/4 translate-y-1/4">
               <FlaskConical size={300} />
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
             <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
               <Clock className="w-6 h-6"/>
             </div>
             <div>
               <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Duration</div>
               <div className="text-sm font-black text-gray-900">{stream.duration || '2 Years'}</div>
             </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
             <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
               <ShieldAlert className="w-6 h-6"/>
             </div>
             <div>
               <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Eligibility</div>
               <div className="text-sm font-black text-gray-900 line-clamp-2 leading-tight">{stream.eligibility || 'Standard entry criteria apply'}</div>
             </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
             <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
               <BookOpen className="w-6 h-6"/>
             </div>
             <div>
               <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Subjects</div>
               <div className="text-xs font-black text-gray-900 line-clamp-2 leading-tight">Core + Electives depending on combination</div>
             </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
             <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
               <Building2 className="w-6 h-6"/>
             </div>
             <div>
               <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Career Opportunities</div>
               <div className="text-xs font-black text-gray-900 line-clamp-2 leading-tight">Various fields based on specialization</div>
             </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Area (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tabs & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex overflow-x-auto hide-scrollbar gap-1">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                      activeTab === tab 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="relative min-w-[240px] shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search combinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 rounded-lg text-sm font-medium outline-none transition-all"
                />
              </div>
            </div>

            {/* Combinations Title */}
            <div className="flex items-center gap-2 pt-2">
              <h2 className="text-lg font-black text-gray-900">{stream.name} Combinations</h2>
              <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{filteredCombos.length}</span>
            </div>

            {/* Combination Cards */}
            {filteredCombos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCombos.map((combo) => {
                  const subjectNames = combo.subjects?.map(s => s.name).join(', ');
                  // Gather all unique career opportunities from branches inside ugCourses
                  const careers = new Set<string>();
                  combo.ugCourses?.forEach(course => {
                    course.branches?.forEach(branch => {
                      branch.careerOpportunities?.forEach(c => careers.add(c));
                    });
                  });
                  const careerArr = Array.from(careers).slice(0, 4);

                  return (
                    <div key={combo._id} className="bg-white border border-gray-200 hover:border-blue-300 rounded-2xl p-5 transition-all shadow-sm flex flex-col h-full group">
                      
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 font-black text-sm tracking-wider shadow-inner">
                          {combo.name.substring(0, 4)}
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                            {combo.name} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                          </h3>
                          <p className="text-xs font-bold text-gray-600 mt-0.5 line-clamp-1">
                            ({subjectNames || 'Subjects not specified'})
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-[11px] font-medium text-gray-500 mb-4 line-clamp-2">
                        {combo.description || `Ideal combination for pursuing careers in related fields. Opens doors to various specialized courses.`}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[10px] font-bold text-gray-900">{combo.subjects?.length || 0} Subjects</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[10px] font-bold text-gray-500 mb-0.5">Suitable for</div>
                            <div className="text-[10px] font-bold text-gray-900 line-clamp-2 leading-tight">
                              {careerArr.length > 0 ? careerArr.join(', ') : 'Various fields'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}/${streamSlug}/${combo.slug}`)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold py-2.5 rounded-lg flex items-center justify-center gap-1 transition-colors"
                        >
                          View Details <ArrowRight className="w-3 h-3" />
                        </button>
                        <button className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-blue-600 text-[11px] font-bold py-2.5 rounded-lg transition-colors">
                          Compare
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-500 text-sm font-medium">
                No combinations found matching your search.
              </div>
            )}
          </div>

          {/* Right Rail (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-black text-gray-900 text-sm mb-4">Quick Actions</h3>
              <div className="space-y-1.5">
                {[
                  { title: 'Find Colleges', desc: `Explore colleges for ${stream.name}`, icon: BookOpen, color: 'text-teal-600', bg: 'bg-teal-50', path: '/colleges' },
                  { title: 'Compare Combinations', desc: 'Compare subject combos', icon: Plus, color: 'text-purple-600', bg: 'bg-purple-50', path: '#' },
                  { title: 'Eligibility Checker', desc: 'Check your eligibility', icon: CheckCircle, color: 'text-orange-600', bg: 'bg-orange-50', path: '#' },
                  { title: 'Explore Careers', desc: 'See career options', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', path: '/jobs' },
                  { title: 'Entrance Exams', desc: 'Find relevant exams', icon: Target, color: 'text-rose-600', bg: 'bg-rose-50', path: '/exams' }
                ].map((action, i) => (
                  <button key={i} onClick={() => { if(action.path !== '#') navigate(action.path); }} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors group text-left">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg ${action.bg} ${action.color} flex items-center justify-center shrink-0`}>
                        <action.icon className="w-4 h-4"/>
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</div>
                        <div className="text-[10px] font-medium text-gray-500">{action.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Related Streams (Mocked siblings since we don't have direct sibling fetch yet) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-black text-gray-900 text-sm mb-4">Related Streams</h3>
              <div className="space-y-3">
                {stream.slug !== 'commerce' && (
                  <div className="flex gap-3 cursor-pointer group" onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}/commerce`)}>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">Commerce</div>
                      <div className="text-[10px] font-medium text-gray-500 line-clamp-1">For business, finance and management</div>
                    </div>
                  </div>
                )}
                {stream.slug !== 'arts' && (
                  <div className="flex gap-3 cursor-pointer group" onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}/arts`)}>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 text-purple-600">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">Arts / Humanities</div>
                      <div className="text-[10px] font-medium text-gray-500 line-clamp-1">For social sciences, law, design</div>
                    </div>
                  </div>
                )}
                {stream.slug !== 'vocational' && (
                  <div className="flex gap-3 cursor-pointer group" onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}/vocational`)}>
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-orange-600">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">Vocational</div>
                      <div className="text-[10px] font-medium text-gray-500 line-clamp-1">Skill-based programs with practical learning</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Aptitude CTA */}
            <div className="bg-gradient-to-br from-[#0B1F44] to-blue-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden text-center">
              <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 mx-auto mb-4">
                <Target className="w-6 h-6"/>
              </div>
              <h3 className="font-black text-sm text-white mb-2">Plan Your Future with U-THINK</h3>
              <p className="text-[11px] text-blue-200 font-medium leading-relaxed mb-5">
                Get personalized college, career and exam recommendations based on your stream.
              </p>
              <button onClick={() => navigate('/quiz')} className="w-full bg-white text-blue-900 hover:bg-gray-100 text-xs font-black py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2">
                Explore Careers <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StreamDetail;
