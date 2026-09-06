import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStreamDetails, StreamData } from '../../api/pathwayApi';
import { 
  ArrowLeft, Clock, GraduationCap, Target, Briefcase, Share2, 
  Heart, ShieldAlert, ArrowRight, BookOpen, Compass, Search, 
  ChevronRight, Building2, FlaskConical, CheckCircle, Download,
  Target as TargetIcon, Lightbulb, MapPin, Calendar, FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ScienceStreamDetail: React.FC = () => {
  const { levelSlug, pathwaySlug, streamSlug } = useParams<{ levelSlug: string, pathwaySlug: string, streamSlug: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [stream, setStream] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Combinations');
  const [isSaved, setIsSaved] = useState(false);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: stream ? `${stream.name} Stream - U-THINK` : 'U-THINK Pathway',
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    if (!currentUser) {
      alert("Please log in to save this stream.");
      // Ideally redirect or open auth modal, e.g., navigate('/login') or open modal.
      return;
    }
    setIsSaved(!isSaved);
    // Real implementation would call save API here.
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-[80vh] bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-[60vh] bg-white">
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

  // Generate tabs based on actual combinations
  const tabs = ['All Combinations'];
  const combinations = stream.subjectCombinations || [];
  
  // Try to find the core known tabs if they exist, otherwise just use top 4
  const knownTabs = ['PCM', 'PCB', 'PCMB', 'PCMC'];
  const availableKnown = knownTabs.filter(kt => combinations.some(c => c.name.toUpperCase() === kt));
  availableKnown.forEach(t => tabs.push(t));
  
  // Fill remaining slots up to 4 if needed
  const otherTopCombos = [...combinations]
    .filter(c => !knownTabs.includes(c.name.toUpperCase()))
    .slice(0, 4 - availableKnown.length);
  otherTopCombos.forEach(c => tabs.push(c.name));
  
  if (combinations.length > tabs.length - 1) {
    tabs.push('Other Combinations');
  }

  // Filtering
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
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans pb-16">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-5">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/streams')} className="hover:text-blue-600 transition-colors">Pathways & Streams</button>
          <span>/</span>
          <button onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}`)} className="hover:text-blue-600 transition-colors capitalize">
            {(pathwaySlug || 'PUC (11th-12th)').replace(/-/g, ' ').toUpperCase()}
          </button>
          <span>/</span>
          <span className="text-gray-900 font-bold">{stream.name}</span>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}`)}
          className="flex items-center gap-1.5 text-blue-700 hover:text-blue-800 hover:underline font-bold text-sm mb-4 transition-colors w-max"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" /> Back to {(pathwaySlug || 'PUC').toUpperCase()}
        </button>

        {/* Hero Section */}
        <div className="bg-white border border-gray-200 rounded-[20px] p-8 shadow-sm mb-6 flex flex-col xl:flex-row gap-8 justify-between relative overflow-hidden">
          <div className="flex-1 max-w-3xl z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-[42px] font-extrabold text-[#0B1F44] tracking-tight mb-3">
              {stream.name} Stream
            </h1>
            <p className="text-[15px] font-medium text-gray-600 leading-relaxed max-w-2xl">
              {stream.description || 'Explore different subject combinations under Science. Choose the right combination based on your interests and career goals.'}
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0 z-10 xl:items-end justify-center">
            <button className="w-full xl:w-[240px] flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm">
              Compare Combinations
            </button>
            <div className="flex gap-3 w-full xl:w-[240px]">
              <button 
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-bold text-sm transition-colors"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-blue-600 text-blue-600' : ''}`} /> {isSaved ? 'Saved' : 'Save Stream'}
              </button>
              <button onClick={handleShare} className="shrink-0 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 w-[52px] py-3 rounded-xl font-bold text-sm transition-colors" title="Share">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Decorative Badge */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-0">
             <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
               <FlaskConical className="w-7 h-7 text-[#2563EB]" />
             </div>
             <div className="text-[#4b71be] font-medium italic text-lg leading-snug w-48 font-serif">
               "Science today<br/>Better opportunities<br/>tomorrow"
             </div>
          </div>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-[16px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
             <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
               <Clock className="w-6 h-6 stroke-[2]"/>
             </div>
             <div>
               <div className="text-[11px] font-bold text-gray-900 mb-0.5">Duration</div>
               <div className="text-[13px] font-medium text-gray-600">{stream.duration || '2 Years (11th and 12th)'}</div>
             </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-[16px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
             <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
               <GraduationCap className="w-6 h-6 stroke-[2]"/>
             </div>
             <div>
               <div className="text-[11px] font-bold text-gray-900 mb-0.5">Eligibility</div>
               <div className="text-[13px] font-medium text-gray-600 leading-tight">
                 {stream.eligibility || 'Minimum 35% marks\n(varies by board/college)'}
               </div>
             </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[16px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
             <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
               <BookOpen className="w-6 h-6 stroke-[2]"/>
             </div>
             <div>
               <div className="text-[11px] font-bold text-gray-900 mb-0.5">Subjects</div>
               <div className="text-[13px] font-medium text-gray-600 leading-tight">Physics, Chemistry +<br/>Mathematics / Biology / Others</div>
             </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[16px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
             <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
               <Building2 className="w-6 h-6 stroke-[2]"/>
             </div>
             <div>
               <div className="text-[11px] font-bold text-gray-900 mb-0.5">Career Opportunities</div>
               <div className="text-[13px] font-medium text-gray-600 leading-tight">Engineering, Medical, Research,<br/>Defence, Technology & more</div>
             </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
          
          {/* Main Column */}
          <div className="space-y-6 min-w-0">
            
            {/* Tabs and Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 md:pb-0">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                      activeTab === tab 
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20' 
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="relative min-w-[260px] shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search combinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-transparent border-none outline-none text-[13px] font-medium placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Combinations Title */}
            <h2 className="text-[17px] font-bold text-[#0B1F44]">
              {stream.name} Combinations ({filteredCombos.length})
            </h2>

            {/* Combination Cards */}
            {filteredCombos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCombos.map((combo) => {
                  const subjectNames = combo.subjects?.map(s => s.name).join(', ') || 'Subjects vary';
                  
                  // Collect unique careers
                  const careers = new Set<string>();
                  combo.ugCourses?.forEach(course => {
                    course.branches?.forEach(branch => {
                      branch.careerOpportunities?.forEach(c => careers.add(c));
                      branch.relatedCareers?.forEach(rc => careers.add(rc.name));
                    });
                  });
                  const careerArr = Array.from(careers).slice(0, 4);

                  // Extract short abbreviation (like PCM)
                  const abbr = combo.name.split(' ')[0];

                  // Determine color scheme based on common combinations
                  let colorScheme = { bg: 'bg-blue-50', text: 'text-[#2563EB]' };
                  if (abbr.includes('B') && !abbr.includes('M')) colorScheme = { bg: 'bg-emerald-50', text: 'text-emerald-600' };
                  else if (abbr.includes('MB')) colorScheme = { bg: 'bg-purple-50', text: 'text-purple-600' };
                  else if (abbr.includes('C') && abbr.length > 3) colorScheme = { bg: 'bg-orange-50', text: 'text-orange-600' };
                  else if (abbr.includes('E')) colorScheme = { bg: 'bg-teal-50', text: 'text-teal-600' };
                  else if (abbr === 'Other' || combo.name.includes('Other')) colorScheme = { bg: 'bg-pink-50', text: 'text-pink-600' };

                  return (
                    <div key={combo._id} className="bg-white border border-gray-200 rounded-[16px] p-6 flex flex-col shadow-sm hover:border-blue-300 transition-colors group">
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`w-[46px] h-[46px] rounded-[14px] ${colorScheme.bg} ${colorScheme.text} flex items-center justify-center shrink-0 font-black text-sm tracking-wide`}>
                            {abbr}
                          </div>
                          <div className="min-w-0 pr-2">
                            <h3 className="text-[15px] font-bold text-[#0B1F44] flex items-center gap-1 leading-snug group-hover:text-[#2563EB] transition-colors truncate">
                              {combo.name} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                            </h3>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-[13px] font-medium text-gray-600 mb-6 flex-1 line-clamp-2">
                        {combo.description || `Ideal for pursuing careers in related fields. Keeps options open for higher education in ${careerArr.length > 0 ? careerArr[0] : 'various sectors'}.`}
                      </p>

                      <div className="flex items-start gap-4 mb-6 pt-4 border-t border-gray-100">
                        <div className="flex flex-col gap-1 w-24 shrink-0">
                          <div className="flex items-center gap-1.5 text-gray-500">
                            <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span className="text-[11px] font-bold">{combo.subjects?.length || 'Varies'} Subjects</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start gap-1.5 text-gray-500">
                            <Briefcase className="w-3.5 h-3.5 stroke-[2.5] mt-0.5" />
                            <span className="text-[11px] font-bold line-clamp-2 leading-tight">
                              {careerArr.length > 0 ? careerArr.join(', ') + ' + more' : 'Various career options'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}/${streamSlug}/${combo.slug}`)}
                          className="flex-[1.5] bg-[#2563EB] hover:bg-blue-700 text-white text-[13px] font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                        >
                          View Details <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <button className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-[#2563EB] text-[13px] font-bold py-2.5 rounded-lg transition-colors">
                          Compare
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-[16px] p-12 text-center shadow-sm">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-gray-900 font-bold mb-1">No combinations found</h3>
                <p className="text-gray-500 text-sm font-medium">Try adjusting your search terms or filters.</p>
              </div>
            )}

            {/* Bottom Aptitude CTA Banner */}
            <div className="bg-blue-50 border border-blue-100 rounded-[16px] p-6 flex flex-col md:flex-row items-center gap-6 mt-6">
              <div className="w-[60px] h-[60px] rounded-[16px] bg-blue-100 flex items-center justify-center shrink-0">
                <Lightbulb className="w-8 h-8 text-blue-600 fill-blue-600/20" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-[#0B1F44] font-bold text-lg mb-1">Not sure which combination is right for you?</h3>
                <p className="text-gray-600 text-sm font-medium">
                  Take our aptitude test to get personalized recommendations based on your interests, strengths and career goals.
                </p>
              </div>
              <button 
                onClick={() => navigate('/quiz')}
                className="shrink-0 bg-[#2563EB] hover:bg-blue-700 text-white text-[13px] font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors w-full md:w-auto justify-center shadow-sm"
              >
                Take Aptitude Test <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
            
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-[16px] p-5 shadow-sm">
              <h3 className="font-extrabold text-[#0B1F44] text-[15px] mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { title: 'Find Colleges', desc: `Explore colleges for ${stream.name} stream`, icon: BookOpen, color: 'text-teal-600', bg: 'bg-teal-50', path: '/colleges' },
                  { title: 'Compare Combinations', desc: 'Compare different subject combinations', icon: TargetIcon, color: 'text-purple-600', bg: 'bg-purple-50', path: '#' },
                  { title: 'Eligibility Checker', desc: 'Check your eligibility', icon: CheckCircle, color: 'text-orange-600', bg: 'bg-orange-50', path: '#' },
                  { title: 'Explore Careers', desc: 'See career options', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', path: '/jobs' },
                  { title: 'Entrance Exams', desc: 'Find relevant entrance exams', icon: Target, color: 'text-rose-600', bg: 'bg-rose-50', path: '/exams' },
                  { title: 'Download Report', desc: 'Get personalized report', icon: Download, color: 'text-indigo-600', bg: 'bg-indigo-50', path: '#' }
                ].map((action, i) => (
                  <button key={i} onClick={() => { if(action.path !== '#') navigate(action.path); }} className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 border border-transparent transition-colors group text-left">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-[10px] ${action.bg} ${action.color} flex items-center justify-center shrink-0`}>
                        <action.icon className="w-4 h-4 stroke-[2.5]"/>
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-[#0B1F44] group-hover:text-blue-600 transition-colors">{action.title}</div>
                        <div className="text-[11px] font-medium text-gray-500 leading-tight">{action.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Related Streams */}
            <div className="bg-white border border-gray-200 rounded-[16px] p-5 shadow-sm">
              <h3 className="font-extrabold text-[#0B1F44] text-[15px] mb-4">Related Streams</h3>
              <div className="space-y-3">
                <div className="flex gap-3.5 cursor-pointer group p-1" onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}/commerce`)}>
                  <div className="w-[42px] h-[42px] rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#0B1F44] group-hover:text-blue-600 transition-colors">Commerce</div>
                    <div className="text-[11px] font-medium text-gray-500 line-clamp-1">For business, finance and management careers</div>
                  </div>
                </div>
                
                <div className="flex gap-3.5 cursor-pointer group p-1" onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}/arts`)}>
                  <div className="w-[42px] h-[42px] rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <TargetIcon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#0B1F44] group-hover:text-blue-600 transition-colors">Arts / Humanities</div>
                    <div className="text-[11px] font-medium text-gray-500 line-clamp-1">For social sciences, law, design and more</div>
                  </div>
                </div>
                
                <div className="flex gap-3.5 cursor-pointer group p-1" onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}/vocational`)}>
                  <div className="w-[42px] h-[42px] rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <TargetIcon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#0B1F44] group-hover:text-blue-600 transition-colors">Vocational</div>
                    <div className="text-[11px] font-medium text-gray-500 line-clamp-1">Skill-based programs with practical learning</div>
                  </div>
                </div>
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
                {/* Normally map real API data here. Since we lack it, fallback gracefully. */}
                <div className="flex gap-3 cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-1">
                      Karnataka PUC 2025 Timetable Released
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">Mar 15, 2025</div>
                  </div>
                </div>
                
                <div className="flex gap-3 cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-1">
                      State-wise Subject Combination Guide
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">Mar 10, 2025</div>
                  </div>
                </div>
                
                <div className="flex gap-3 cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-1">
                      Top Careers After Science
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">Mar 06, 2025</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Promotion Banner */}
            <div className="bg-[#0B1F44] rounded-[16px] p-6 text-white relative overflow-hidden shadow-lg">
               <div className="absolute top-0 right-0 p-4">
                 <div className="w-8 h-8 text-yellow-400 opacity-80">
                   <TargetIcon className="w-full h-full fill-current" />
                 </div>
               </div>
               <h3 className="text-base font-extrabold mb-2 max-w-[180px]">Plan Your Future with U-THINK</h3>
               <p className="text-[12px] text-blue-200 font-medium leading-relaxed mb-5">
                 Get personalized college, career and exam recommendations based on your stream.
               </p>
               <button onClick={() => navigate('/jobs')} className="w-full bg-white text-[#0B1F44] hover:bg-gray-100 text-[13px] font-bold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-1.5 shadow-sm">
                 Explore Careers <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
               </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ScienceStreamDetail;
