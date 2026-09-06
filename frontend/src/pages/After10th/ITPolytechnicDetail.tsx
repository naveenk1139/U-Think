import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPathwayBySlug, PathwayData } from '../../api/pathwayApi';
import { 
  ArrowLeft, Clock, GraduationCap, Share2, Heart, Wrench, Building2, 
  ChevronRight, BookOpen, Settings, Settings2, ShieldCheck, Map,
  ArrowRight, CheckCircle, Target
} from 'lucide-react';


// Polytechnic Stream icon mapping
const getIconForStream = (slug: string) => {
  if (slug.includes('computer')) return <BookOpen className="w-6 h-6 text-blue-500" />;
  if (slug.includes('electrical')) return <Wrench className="w-6 h-6 text-orange-500" />;
  if (slug.includes('mechanical')) return <Settings className="w-6 h-6 text-red-500" />;
  if (slug.includes('civil')) return <Building2 className="w-6 h-6 text-emerald-500" />;
  if (slug.includes('design')) return <Settings2 className="w-6 h-6 text-purple-500" />;
  if (slug.includes('chemical')) return <ShieldCheck className="w-6 h-6 text-fuchsia-500" />;
  return <Map className="w-6 h-6 text-gray-500" />;
};

export default function ITPolytechnicDetail() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  
  const [itiPathway, setItiPathway] = useState<PathwayData | null>(null);
  const [diplomaPathway, setDiplomaPathway] = useState<PathwayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchPathways = async () => {
      setLoading(true);
      try {
        const [iti, diploma] = await Promise.all([
          getPathwayBySlug('it-polytechnic'),
          getPathwayBySlug('diploma-polytechnic')
        ]);
        setItiPathway(iti);
        setDiplomaPathway(diploma);
      } catch (error) {
        console.error('Error fetching pathways:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPathways();
  }, []);

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'IT / Polytechnic Pathway',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'iti-trades', label: 'ITI Trades' },
    { id: 'polytechnic-courses', label: 'Polytechnic Courses' },
    { id: 'branches', label: 'Branches' },
    { id: 'specializations', label: 'Specializations' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'careers', label: 'Careers' },
    { id: 'colleges', label: 'Colleges' },
    { id: 'admission', label: 'Admission' },
    { id: 'compare', label: 'Compare' },
  ];

  // Derive Data
  const engineeringTrades = itiPathway?.streams.find(s => s.slug.includes('engineering'))?.courses || [];
  const nonEngineeringTrades = itiPathway?.streams.find(s => s.slug.includes('non-engineering'))?.courses || [];
  const polytechnicStreams = diplomaPathway?.streams || [];

  return (
    <div className="bg-[#F7F9FC] min-h-screen font-sans pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/streams')} className="hover:text-blue-600 transition-colors">Pathways & Streams</button>
          <span>/</span>
          <button onClick={() => navigate('/pathways/after-10th')} className="hover:text-blue-600 transition-colors">After 10th</button>
          <span>/</span>
          <span className="text-gray-900">IT / Polytechnic</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-purple-200">
                  <Wrench className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-[#1e293b] mb-1">IT / Polytechnic</h1>
                  <p className="text-sm font-medium text-gray-600">Explore technical and skill-based courses after 10th through ITI and Polytechnic.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={handleSave}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${
                    isSaved ? 'bg-purple-600 text-white shadow-sm' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  Save Pathway <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex overflow-x-auto hide-scrollbar gap-1 border-b border-gray-200 bg-white rounded-t-xl px-2 pt-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-lg' 
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-t-lg'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* FILTERED CONTENT BASED ON TABS */}
            {(activeTab === 'overview' || activeTab === 'iti-trades' || activeTab === 'polytechnic-courses') && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Info Banner */}
                {(activeTab === 'overview') && (
                  <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-4 flex gap-4 shadow-sm items-start">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex flex-col items-center justify-center text-white font-black text-xs shrink-0 mt-0.5">i</div>
                    <div className="text-sm font-medium text-gray-700 leading-relaxed">
                      <strong>IT / Polytechnic</strong> includes ITI (Industrial Training Institute) and Polytechnic (Diploma in Engineering & Technology).<br/>
                      Both provide skill-based and technical education after 10th, leading to good career opportunities.
                    </div>
                  </div>
                )}

                {/* Main Two Cards */}
                {(activeTab === 'overview') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* ITI Card */}
                    <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                      <div className="flex gap-4 items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                          <Settings className="w-6 h-6 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-gray-900">ITI (Industrial Training Institute)</h3>
                          <p className="text-xs font-medium text-gray-600 mt-1">Short-term skill-based programs (1-2 years) focused on practical training for specific trades.</p>
                        </div>
                      </div>
                      <div className="space-y-2.5 mb-6 mt-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <CheckCircle className="w-4 h-4 text-blue-500" /> 1-2 Years Duration
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <CheckCircle className="w-4 h-4 text-blue-500" /> NCVT / SCVT Certification
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <CheckCircle className="w-4 h-4 text-blue-500" /> Job-oriented Training
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <CheckCircle className="w-4 h-4 text-blue-500" /> Govt. & Private ITIs
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button 
                          onClick={() => handleTabChange('iti-trades')}
                          className="bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 transition-colors border border-pink-200"
                        >
                          Explore ITI Trades <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Polytechnic Card */}
                    <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                      <div className="flex gap-4 items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                          <Building2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-gray-900">Polytechnic (Diploma)</h3>
                          <p className="text-xs font-medium text-gray-600 mt-1">3-year diploma programs in engineering and technology with industry-relevant skills.</p>
                        </div>
                      </div>
                      <div className="space-y-2.5 mb-6 mt-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500" /> 3 Years Duration
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500" /> Technical & Practical Knowledge
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500" /> Multiple Branches & Specializations
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500" /> Good Career & Higher Education Options
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button 
                          onClick={() => handleTabChange('polytechnic-courses')}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 transition-colors border border-emerald-200"
                        >
                          Explore Polytechnic Courses <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ITI Trades Section */}
                {(activeTab === 'overview' || activeTab === 'iti-trades') && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-black text-gray-900">ITI Trades</h2>
                      <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                        View All Trades <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Engineering Trades */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                            <Wrench className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-gray-900">Engineering Trades</h3>
                            <p className="text-[11px] font-medium text-gray-500">Practical skills in technical fields</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 flex-1">
                          {engineeringTrades.map(course => (
                            <div 
                              key={course._id} 
                              className="flex items-start gap-1.5 text-xs font-bold text-gray-600 cursor-pointer group"
                              onClick={() => navigate(`/courses/${course.slug}`)}
                            >
                              <Wrench className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5 group-hover:text-orange-600 transition-colors" />
                              <span className="line-clamp-2 leading-tight group-hover:text-orange-600 group-hover:underline transition-colors">{course.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                          <button className="text-xs font-bold text-blue-600 flex items-center gap-1 ml-auto hover:underline">
                            View All Engineering Trades <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Non-Engineering Trades */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                            <Settings2 className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-gray-900">Non-Engineering Trades</h3>
                            <p className="text-[11px] font-medium text-gray-500">Skill-based trades for various industries</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 flex-1">
                          {nonEngineeringTrades.map(course => (
                            <div 
                              key={course._id} 
                              className="flex items-start gap-1.5 text-xs font-bold text-gray-600 cursor-pointer group"
                              onClick={() => navigate(`/courses/${course.slug}`)}
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5 group-hover:text-purple-600 transition-colors" />
                              <span className="line-clamp-2 leading-tight group-hover:text-purple-600 group-hover:underline transition-colors">{course.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                          <button className="text-xs font-bold text-blue-600 flex items-center gap-1 ml-auto hover:underline">
                            View All Non-Engineering Trades <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Polytechnic Streams Section */}
                {(activeTab === 'overview' || activeTab === 'polytechnic-courses') && (
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-black text-gray-900">Polytechnic Streams</h2>
                      <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                        View All Streams <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {polytechnicStreams.map(stream => (
                        <div key={stream._id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                          <div className="flex items-start gap-3 mb-4 border-b border-gray-100 pb-3">
                            <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0">
                              {getIconForStream(stream.slug)}
                            </div>
                            <h3 className="text-sm font-black text-gray-900 leading-snug">{stream.name}</h3>
                          </div>
                          
                          <div className="space-y-4 flex-1">
                            {stream.courses?.map(course => (
                              <div key={course._id} className="text-xs font-bold text-gray-600">
                                <div 
                                  className="flex items-start gap-2 mb-1 cursor-pointer group"
                                  onClick={() => navigate(`/courses/${course.slug}`)}
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1 shrink-0 group-hover:bg-blue-600 transition-colors"></div>
                                  <span className="leading-snug group-hover:text-blue-600 group-hover:underline transition-colors">{course.name}</span>
                                </div>
                                {course.branches && course.branches.length > 0 && (
                                  <div className="pl-3.5 space-y-1 mt-1 border-l border-gray-100 ml-0.5">
                                    {course.branches.map((branch: any) => (
                                      <div 
                                        key={branch._id} 
                                        className="flex items-start gap-1.5 text-[10px] font-medium text-gray-500 cursor-pointer group"
                                        onClick={() => navigate(`/branches/${branch.slug}`)}
                                      >
                                        <ChevronRight className="w-3 h-3 text-gray-300 shrink-0 group-hover:text-blue-500 transition-colors" />
                                        <span className="leading-snug group-hover:text-blue-600 group-hover:underline transition-colors">{branch.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <button 
                              onClick={() => navigate(`/pathways/after-10th/diploma/course-explorer?stream=${stream.slug}`)}
                              className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline w-max"
                            >
                              View Courses <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Other Generic Tab Placeholders */}
            {['branches', 'specializations', 'subjects', 'admission', 'careers', 'colleges', 'compare'].includes(activeTab) && (
               <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm animate-in fade-in">
                 <ShieldCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                 <h2 className="text-lg font-black text-gray-900 mb-2 capitalize">{activeTab} Info</h2>
                 <p className="text-sm font-medium text-gray-500">Detailed information regarding {activeTab.replace('-', ' ')} for ITI & Polytechnic will appear here.</p>
               </div>
            )}

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-gray-900">Quick Actions</h3>
                <span className="text-[10px] font-bold text-blue-600 cursor-pointer hover:underline">See All →</span>
              </div>
              <div className="space-y-1">
                {[
                  { icon: Building2, color: 'text-emerald-500', title: 'Find Colleges', sub: 'Explore colleges for IT / Polytechnic', route: '/colleges?pathway=it-polytechnic' },
                  { icon: Settings2, color: 'text-purple-500', title: 'Compare Courses', sub: 'Compare different diploma/ITI courses', route: '/pathways/after-10th/compare' },
                  { icon: ShieldCheck, color: 'text-orange-500', title: 'Eligibility Checker', sub: 'Check your eligibility', route: '/quiz' },
                  { icon: BookOpen, color: 'text-blue-500', title: 'Explore Careers', sub: 'See career options after IT / Polytechnic', route: '/jobs' },
                  { icon: Target, color: 'text-pink-500', title: 'Aptitude Test', sub: 'Discover your strengths', route: '/quiz' },
                  { icon: Share2, color: 'text-blue-500', title: 'Download Report', sub: 'Get your personalized report', action: handleShare }
                ].map((action, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => action.route ? navigate(action.route) : action.action?.()}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 ${action.color}`}>
                        <action.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</h4>
                        <p className="text-[10px] font-medium text-gray-500">{action.sub}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Related Pathways */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4">Related Pathways</h3>
              <div className="space-y-1">
                {[
                  { icon: BookOpen, color: 'text-blue-500', title: 'PUC (11th-12th)', sub: 'Explore higher secondary education', route: '/pathways/after-10th/puc-11th-12th' },
                  { icon: Settings, color: 'text-orange-500', title: 'Diploma', sub: '3 years technical programs', route: '/pathways/after-10th/diploma' },
                  { icon: Heart, color: 'text-emerald-500', title: 'Paramedical / Allied Health', sub: 'Healthcare and medical courses', route: '/pathways/after-10th/paramedical-allied-health' },
                  { icon: Wrench, color: 'text-pink-500', title: 'Vocational Education', sub: 'Skill-based short-term programs', route: '/pathways/after-10th/vocational-education' },
                  { icon: BookOpen, color: 'text-blue-500', title: 'Apprenticeship / Skill Training', sub: 'On-the-job learning programs', route: '/pathways/after-10th/apprenticeship-skill-training' }
                ].map((pathway, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => navigate(pathway.route)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 ${pathway.color}`}>
                        <pathway.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">{pathway.title}</h4>
                        <p className="text-[10px] font-medium text-gray-500">{pathway.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aptitude Promo */}
            <div className="bg-[#0b1b3d] rounded-2xl p-6 text-center relative overflow-hidden border border-blue-900">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
              <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-purple-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
              
              <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-5 h-5 text-yellow-500" />
              </div>
              <h3 className="text-sm font-black text-white mb-2">Not sure if IT / Polytechnic is right for you?</h3>
              <p className="text-[11px] font-medium text-blue-200 mb-4">Take the U-THINK aptitude assessment and get personalized pathway recommendations.</p>
              <button 
                onClick={() => navigate('/quiz')}
                className="w-full bg-white hover:bg-gray-100 text-[#0b1b3d] font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Take Aptitude Test <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
