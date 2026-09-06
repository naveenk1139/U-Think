import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPathwayTree, EducationLevelData, PathwayData } from '../../api/pathwayApi';
import { 
  GraduationCap, Building, Wrench, Briefcase, BookOpen, ArrowRight, 
  Map, Monitor, Layers, HeartPulse, HardHat, FileText, CalendarDays,
  Target, ChevronRight, Activity, ArrowUpRight, Compass, CheckCircle,
  FlaskConical, BarChart3, Palette, Rocket
} from 'lucide-react';

export default function After10thMap() {
  const [levelData, setLevelData] = useState<EducationLevelData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const data = await getPathwayTree('after-10th');
        if (data && data.length > 0) {
          setLevelData(data[0]);
        }
      } catch (error) {
        console.error('Failed to load map data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTree();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-[80vh] bg-[#F7F9FC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  const pathways = levelData?.pathways || [];

  const getPathwayIcon = (slug: string) => {
    if (slug.includes('puc')) return <GraduationCap className="w-7 h-7 text-blue-500" />;
    if (slug.includes('diploma')) return <FileText className="w-7 h-7 text-orange-500" />;
    if (slug.includes('it-polytechnic') || slug.includes('iti')) return <Wrench className="w-7 h-7 text-purple-500" />;
    if (slug.includes('paramedical')) return <HeartPulse className="w-7 h-7 text-emerald-500" />;
    if (slug.includes('vocational')) return <GraduationCap className="w-7 h-7 text-pink-500" />; // Used Cap as fallback for pink icon in image
    if (slug.includes('apprenticeship')) return <HardHat className="w-7 h-7 text-yellow-500" />;
    return <Layers className="w-7 h-7 text-gray-500" />;
  };

  const getPathwayBg = (slug: string) => {
    if (slug.includes('puc')) return 'bg-blue-50 border-blue-100';
    if (slug.includes('diploma')) return 'bg-orange-50 border-orange-100';
    if (slug.includes('it-polytechnic') || slug.includes('iti')) return 'bg-purple-50 border-purple-100';
    if (slug.includes('paramedical')) return 'bg-emerald-50 border-emerald-100';
    if (slug.includes('vocational')) return 'bg-pink-50 border-pink-100';
    if (slug.includes('apprenticeship')) return 'bg-yellow-50 border-yellow-100';
    return 'bg-gray-50 border-gray-100';
  };

  const getPathwayFeatures = (slug: string) => {
    if (slug.includes('puc')) return ['Science', 'Commerce', 'Arts / Humanities'];
    if (slug.includes('diploma')) return ['Engineering & Technology', 'Paramedical / Allied Health', 'Commercial / Management', 'Other Diploma Programs'];
    if (slug.includes('it-polytechnic') || slug.includes('iti')) return ['Engineering Trades', 'Non-Engineering Trades', 'Craftsmen Training', 'Industry-oriented Programs'];
    if (slug.includes('paramedical')) return ['Healthcare Support', 'Medical Technology', 'Allied Health Sciences', 'Community Health'];
    if (slug.includes('vocational')) return ['Skill-based Short-term Programs', 'Job-oriented Training', 'Government & Private Programs', 'Multiple Trade Options'];
    if (slug.includes('apprenticeship')) return ['On-the-job Training', 'Industry Collaboration', 'Stipend Based Programs', 'Employment Opportunities'];
    return [];
  };

  const getPathwayDuration = (slug: string) => {
    if (slug.includes('puc')) return '2 Years (11th and 12th)';
    if (slug.includes('diploma')) return '3 Years (Varies by course)';
    if (slug.includes('it-polytechnic') || slug.includes('iti')) return '1 - 2 Years';
    if (slug.includes('paramedical')) return '2 - 3 Years';
    if (slug.includes('vocational')) return '6 Months - 2 Years';
    if (slug.includes('apprenticeship')) return '6 Months - 2 Years';
    return 'Varies';
  };

  const getPathwayActionText = (slug: string) => {
    if (slug.includes('diploma')) return 'Explore Diploma Courses';
    if (slug.includes('it-polytechnic') || slug.includes('iti')) return 'Explore IT / Polytechnic';
    if (slug.includes('apprenticeship')) return 'Explore Programs';
    return 'Explore Courses';
  };

  const getPathwayRoute = (slug: string) => {
    return `/pathways/after-10th/${slug}`;
  };

  // Enforce specific order: PUC, Diploma, IT, Paramedical, Vocational, Apprenticeship
  const orderedSlugs = ['puc-11th-12th', 'diploma', 'it-polytechnic', 'paramedical-allied-health', 'vocational-education', 'apprenticeship-skill-training'];
  const orderedPathways = orderedSlugs.map(slug => pathways.find(p => p.slug === slug)).filter(Boolean) as PathwayData[];

  return (
    <div className="w-full bg-[#F7F9FC] min-h-screen font-sans pb-20">
      <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-6 pt-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-6 flex-wrap">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigate('/streams')} className="hover:text-blue-600 transition-colors">Pathways & Streams</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900">After 10th</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Main Content Area (8/12) */}
          <div className="xl:col-span-8 2xl:col-span-9 space-y-8">
            
            {/* Header */}
            <div>
              <h1 className="text-3xl font-black text-[#0B1536] mb-2 tracking-tight">Popular Pathways After 10th</h1>
              <p className="text-[15px] text-gray-600 font-medium">Explore the best education pathways based on your interests, strengths and career goals.</p>
            </div>

            {/* Pathways Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {orderedPathways.map((pathway) => {
                const icon = getPathwayIcon(pathway.slug);
                const bgClass = getPathwayBg(pathway.slug);
                const features = getPathwayFeatures(pathway.slug);
                const durationText = getPathwayDuration(pathway.slug);
                const actionText = pathway.slug.includes('puc') ? 'Explore Streams' : getPathwayActionText(pathway.slug);
                
                return (
                  <div key={pathway._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${bgClass} border`}>
                        {icon}
                      </div>
                      <div className="pt-1">
                        <h3 className="font-black text-gray-900 text-[17px] leading-tight mb-1">{pathway.name}</h3>
                        <p className="text-xs font-bold text-gray-500 line-clamp-1">{durationText}</p>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6 flex-1">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[13px] font-bold text-gray-700">
                          <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 fill-blue-600 stroke-white" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => navigate(getPathwayRoute(pathway.slug))}
                      className="flex items-center justify-between text-blue-600 text-[14px] font-black transition-colors hover:text-blue-700 mt-auto w-full group"
                    >
                      <span>{actionText} <ArrowRight className="w-4 h-4 inline-block ml-1" /></span>
                      <ArrowRight className="w-4 h-4 text-blue-300 group-hover:text-blue-600 transition-colors" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Featured Streams */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Featured Streams (After 10th – 12th)</h2>
                <button onClick={() => navigate('/pathways/after-10th/puc-11th-12th')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  View All Streams <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <FlaskConical className="w-7 h-7" />
                    </div>
                    <div className="pt-1">
                      <h3 className="font-black text-gray-900 text-lg mb-1">Science</h3>
                      <div className="text-[13px] font-bold text-gray-600 leading-tight mb-0.5">6 major combinations</div>
                      <div className="text-[11px] font-bold text-gray-400">PCM, PCB, PCMB + more</div>
                    </div>
                  </div>
                  <button onClick={() => navigate(`/pathways/after-10th/puc-11th-12th/science`)} className="text-[13px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-1.5 ml-[72px]">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-7 h-7" />
                    </div>
                    <div className="pt-1">
                      <h3 className="font-black text-gray-900 text-lg mb-1">Commerce</h3>
                      <div className="text-[13px] font-bold text-gray-600 leading-tight mb-0.5">7 major combinations</div>
                      <div className="text-[11px] font-bold text-gray-400">With Math, Without Math + more</div>
                    </div>
                  </div>
                  <button onClick={() => navigate(`/pathways/after-10th/puc-11th-12th/commerce`)} className="text-[13px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-1.5 ml-[72px]">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Palette className="w-7 h-7" />
                    </div>
                    <div className="pt-1">
                      <h3 className="font-black text-gray-900 text-lg mb-1">Arts / Humanities</h3>
                      <div className="text-[13px] font-bold text-gray-600 leading-tight mb-0.5">4 subjects</div>
                      <div className="text-[11px] font-bold text-gray-400">History, Economics + more</div>
                    </div>
                  </div>
                  <button onClick={() => navigate(`/pathways/after-10th/puc-11th-12th/arts`)} className="text-[13px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-1.5 ml-[72px]">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Education Journey */}
            <div className="pt-6 pb-12">
              <h2 className="text-[22px] font-black text-gray-900 mb-5 tracking-tight">Your Education Journey</h2>
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <div className="relative flex justify-between px-2">
                  {/* Progress Line */}
                  <div className="absolute top-6 left-12 right-12 h-[3px] bg-gray-100 rounded-full z-0"></div>
                  
                  {/* Steps */}
                  {[
                    { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', title: '10th', desc: 'Complete 10th' },
                    { icon: GraduationCap, color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-100', title: 'Choose Pathway', desc: 'Select your path' },
                    { icon: Layers, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100', title: 'Stream', desc: 'Explore streams' },
                    { icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', title: 'Course', desc: 'Choose a course' },
                    { icon: Monitor, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100', title: 'Branch', desc: 'Explore specializations' },
                    { icon: Briefcase, color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-100', title: 'Career', desc: 'Explore career options' },
                    { icon: Rocket, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-100', title: 'Jobs', desc: 'Find job opportunities' }
                  ].map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center group w-24">
                      <div className={`w-12 h-12 rounded-full ${step.bg} ${step.border} border-2 flex items-center justify-center mb-3 transition-transform group-hover:scale-110 bg-white`}>
                        <step.icon className={`w-5 h-5 ${step.color}`} />
                      </div>
                      <div className="text-center w-full">
                        <div className="text-[13px] font-black text-gray-900 mb-1">{step.title}</div>
                        <div className="text-[10px] font-bold text-gray-500 leading-tight">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar (4/12) */}
          <div className="xl:col-span-4 2xl:col-span-3 space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="font-black text-gray-900 text-[15px]">Quick Actions</h3>
                <button className="text-[12px] font-black text-blue-600 flex items-center gap-1 hover:underline">
                  See All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3 flex flex-col gap-1">
                {[
                  { icon: Building, title: 'Find Colleges', subtitle: 'Explore colleges for your pathway', color: 'text-emerald-500', bg: 'bg-emerald-50', link: '/colleges' },
                  { icon: Activity, title: 'Compare Pathways', subtitle: 'Compare different education paths', color: 'text-purple-500', bg: 'bg-purple-50', link: '/pathways/after-10th/compare' },
                  { icon: Monitor, title: 'Eligibility Checker', subtitle: 'Check your eligibility', color: 'text-orange-500', bg: 'bg-orange-50', link: '#' },
                  { icon: Briefcase, title: 'Explore Careers', subtitle: 'See career options after 10th', color: 'text-blue-500', bg: 'bg-blue-50', link: '/jobs' },
                  { icon: Target, title: 'Aptitude Test', subtitle: 'Discover your strengths', color: 'text-pink-500', bg: 'bg-pink-50', link: '/quiz' },
                  { icon: FileText, title: 'Download Report', subtitle: 'Get your personalized report', color: 'text-blue-500', bg: 'bg-blue-50', link: '#' },
                ].map((action, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => action.link !== '#' ? navigate(action.link) : null}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${action.bg} ${action.color} flex items-center justify-center shrink-0`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-black text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</div>
                      <div className="text-[11px] font-bold text-gray-500 mt-0.5">{action.subtitle}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-600 opacity-100 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Latest Updates */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="font-black text-gray-900 text-[15px]">Latest Updates</h3>
                <button className="text-[12px] font-black text-blue-600 flex items-center gap-1 hover:underline">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-5 flex flex-col gap-6">
                {[
                  { tag: 'JEE', title: 'JEE Main 2025 Registration Opens', date: 'Apr 12, 2025', color: 'bg-blue-50 text-blue-600' },
                  { tag: 'NEET', title: 'NEET 2025 Application Form Released', date: 'Mar 28, 2025', color: 'bg-pink-50 text-pink-600' },
                  { tag: 'CUET', title: 'CUET 2025 Exam Dates Announced', date: 'Mar 15, 2025', color: 'bg-purple-50 text-purple-600' },
                  { tag: 'SKILL', title: 'New Skill Development Programs for 10th Pass', date: 'Mar 10, 2025', color: 'bg-orange-50 text-orange-600' },
                ].map((update, idx) => (
                  <div key={idx} className="flex gap-4 cursor-pointer group">
                    <div className={`text-[11px] font-black px-2.5 py-1 rounded-md h-fit uppercase tracking-wider shrink-0 ${update.color}`}>
                      {update.tag}
                    </div>
                    <div>
                      <div className="text-[13px] font-black text-gray-900 leading-snug group-hover:text-blue-600 transition-colors mb-1">{update.title}</div>
                      <div className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" /> {update.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aptitude CTA */}
            <div className="bg-[#0B1536] rounded-2xl p-7 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 text-3xl">
                  💡
                </div>
                <h3 className="text-base font-black text-white mb-2.5 leading-tight">
                  Not sure which path is right for you?
                </h3>
                <p className="text-[13px] font-medium text-blue-200 mb-6 leading-relaxed">
                  Take the U-THINK aptitude assessment and get personalized pathway recommendations.
                </p>
                <button 
                  onClick={() => navigate('/quiz')}
                  className="w-full bg-white hover:bg-gray-50 text-[#0B1536] font-black text-[13px] py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Take Aptitude Test <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
