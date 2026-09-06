import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStreamDetails, StreamData, SubjectCombinationData } from '../../api/pathwayApi';
import { 
  ArrowLeft, Clock, GraduationCap, Target, Briefcase, Share2, 
  Heart, ShieldAlert, ArrowRight, BookOpen, Compass, 
  Building2, FlaskConical, CheckCircle, Target as TargetIcon,
  ChevronRight, Download, Plus, Book, Stethoscope, Microscope, Settings
} from 'lucide-react';

const CombinationDetail: React.FC = () => {
  const { levelSlug, pathwaySlug, streamSlug, comboSlug } = useParams<{ levelSlug: string, pathwaySlug: string, streamSlug: string, comboSlug: string }>();
  const navigate = useNavigate();
  const [stream, setStream] = useState<StreamData | null>(null);
  const [combo, setCombo] = useState<SubjectCombinationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchDetail = async () => {
      if (!streamSlug || !comboSlug) return;
      try {
        setLoading(true);
        const streamData = await getStreamDetails(streamSlug);
        setStream(streamData);
        
        const foundCombo = streamData.subjectCombinations?.find(c => c.slug === comboSlug);
        if (foundCombo) {
          setCombo(foundCombo);
        }
      } catch (error) {
        console.error('Failed to load combination detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [streamSlug, comboSlug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: combo ? `${combo.name} - U-THINK` : 'U-THINK Pathway',
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-[80vh] bg-[#F7F9FC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!combo || !stream) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-[60vh] bg-[#F7F9FC]">
        <Compass className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Combination not found</h2>
        <p className="text-gray-500 mb-6 font-medium">The subject combination you are looking for does not exist.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const subjectNames = combo.subjects?.map(s => s.name).join(', ') || '';
  
  // Collect all unique careers from courses -> branches -> relatedCareers
  const careers = new Set<string>();
  combo.ugCourses?.forEach(course => {
    course.branches?.forEach(branch => {
      branch.relatedCareers?.forEach(c => careers.add(c.name));
      branch.careerOpportunities?.forEach(c => careers.add(c));
    });
  });
  const careerArr = Array.from(careers).slice(0, 4);

  // Derive higher education areas
  const higherEdAreas = new Map<string, any[]>();
  combo.ugCourses?.forEach(course => {
    // If we have higherStudyArea, use it, else categorize loosely based on course name
    let area = course.higherStudyArea;
    if (!area) {
      if (course.name.includes('Tech') || course.name.includes('Engineering')) area = 'Engineering';
      else if (course.name.includes('MBBS') || course.name.includes('BDS') || course.name.includes('Medical')) area = 'Medical';
      else if (course.name.includes('Science') || course.name.includes('BSc')) area = 'Life Sciences';
      else area = 'Other Programs';
    }
    
    if (!higherEdAreas.has(area)) higherEdAreas.set(area, []);
    higherEdAreas.get(area)?.push(course);
  });

  const getAreaIcon = (area: string) => {
    if (area === 'Engineering') return <Settings className="w-5 h-5 text-blue-600" />;
    if (area === 'Medical') return <Stethoscope className="w-5 h-5 text-rose-600" />;
    if (area === 'Life Sciences') return <Microscope className="w-5 h-5 text-emerald-600" />;
    if (area === 'Computer & Data') return <TargetIcon className="w-5 h-5 text-purple-600" />;
    return <Building2 className="w-5 h-5 text-purple-600" />;
  };

  const getAreaBg = (area: string) => {
    if (area === 'Engineering') return 'bg-blue-50 border-blue-100';
    if (area === 'Medical') return 'bg-rose-50 border-rose-100';
    if (area === 'Life Sciences') return 'bg-emerald-50 border-emerald-100';
    if (area === 'Computer & Data') return 'bg-purple-50 border-purple-100';
    return 'bg-purple-50 border-purple-100';
  };

  const tabs = ['Overview', 'Subjects', 'Practicals', 'Courses', 'Careers', 'Entrance Exams', 'Compare', 'Colleges', 'More'];

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
          <button onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}/${streamSlug}`)} className="hover:text-blue-600 transition-colors">
            {stream.name}
          </button>
          <span>/</span>
          <span className="text-gray-900">{combo.name}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm mb-6 relative overflow-hidden flex flex-col lg:flex-row gap-8 justify-between">
          <div className="flex-1 max-w-2xl relative z-10">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-blue-600 hover:underline font-bold text-xs mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to {stream.name}
            </button>
            
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
              {combo.name} – {subjectNames}
            </h1>
            
            <p className="text-sm font-medium text-gray-600 leading-relaxed max-w-xl">
              {combo.description || `${combo.name} is a flexible ${stream.name} combination that keeps multiple pathways open based on your subjects.`}
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0 relative z-10 justify-start w-full lg:w-auto">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`w-full lg:w-[220px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm ${
                isSaved ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} /> {isSaved ? 'Saved Combination' : 'Save Combination'}
            </button>
            <div className="flex gap-3 w-full lg:w-[220px]">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-bold text-sm transition-colors">
                 Compare
              </button>
              <button onClick={handleShare} className="shrink-0 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-bold text-sm transition-colors" title="Share">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Decorative bubble based on stream */}
          <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none transform translate-x-1/4 translate-y-1/4">
             <FlaskConical size={300} />
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
             <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
               <Clock className="w-5 h-5"/>
             </div>
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Duration</div>
             <div className="text-xs font-black text-gray-900">{combo.duration || '2 Years'}</div>
             <div className="text-[10px] text-gray-500">(11th and 12th)</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
             <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
               <GraduationCap className="w-5 h-5"/>
             </div>
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Stream</div>
             <div className="text-xs font-black text-gray-900">{stream.name}</div>
             <div className="text-[10px] text-gray-500">PUC / Class 11-12</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
             <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-2">
               <BookOpen className="w-5 h-5"/>
             </div>
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Subjects</div>
             <div className="text-xs font-black text-gray-900 line-clamp-2 leading-tight">{subjectNames}</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
             <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
               <ShieldAlert className="w-5 h-5"/>
             </div>
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Eligibility</div>
             <div className="text-xs font-black text-gray-900 line-clamp-2 leading-tight">{combo.eligibility || stream.eligibility || 'Varies by board'}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
             <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
               <Briefcase className="w-5 h-5"/>
             </div>
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Career Opportunities</div>
             <div className="text-xs font-black text-gray-900 line-clamp-2 leading-tight">
               {careerArr.length > 0 ? careerArr.join(', ') : 'Various fields'}
             </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Area (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
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

            {/* Subjects in PCMB */}
            <section id="subjects">
              <h2 className="text-xl font-black text-gray-900 mb-5">Subjects in {combo.name}</h2>
              {combo.subjects && combo.subjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {combo.subjects.map((subj, idx) => {
                    const colors = [
                      'bg-blue-50/50 border-blue-100', 
                      'bg-rose-50/50 border-rose-100', 
                      'bg-emerald-50/50 border-emerald-100', 
                      'bg-orange-50/50 border-orange-100',
                      'bg-purple-50/50 border-purple-100'
                    ];
                    const iconColors = ['text-blue-600', 'text-rose-600', 'text-emerald-600', 'text-orange-600', 'text-purple-600'];
                    
                    const c = colors[idx % colors.length];
                    const ic = iconColors[idx % iconColors.length];
                    
                    return (
                      <div key={subj._id} className={`border rounded-2xl p-5 ${c} flex flex-col h-full`}>
                         <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                               <Book className={`w-5 h-5 ${ic}`} />
                            </div>
                            <h3 className={`text-sm font-black ${ic}`}>{subj.name}</h3>
                         </div>
                         <p className="text-xs font-medium text-gray-600 mb-4 line-clamp-3 flex-1">
                           {subj.description || `Study key concepts in ${subj.name}, covering theory and practical applications.`}
                         </p>
                         <button className={`text-xs font-bold ${ic} hover:underline flex items-center gap-1 mt-auto w-max`}>
                           View Subject Details <ArrowRight className="w-3.5 h-3.5" />
                         </button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 text-sm font-medium">
                  No subjects detailed for this combination.
                </div>
              )}
            </section>

            {/* Why Choose? */}
            <section>
              <h2 className="text-lg font-black text-gray-900 mb-4">Why Choose {combo.name}?</h2>
              <div className="flex flex-wrap gap-3">
                 {[
                   { text: `Keeps multiple pathways open`, color: 'bg-blue-50 text-blue-700 border-blue-100' },
                   { text: `Builds strong analytical skills`, color: 'bg-orange-50 text-orange-700 border-orange-100' },
                   { text: `Flexible career opportunities`, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                   { text: `Good foundation for competitive exams`, color: 'bg-purple-50 text-purple-700 border-purple-100' }
                 ].map((badge, i) => (
                   <div key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold ${badge.color}`}>
                     <CheckCircle className="w-4 h-4 shrink-0" /> {badge.text}
                   </div>
                 ))}
              </div>
            </section>

            {/* Higher Education Pathways */}
            <section id="courses">
              <h2 className="text-xl font-black text-gray-900 mb-5">Higher Education Pathways</h2>
              {Array.from(higherEdAreas.keys()).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from(higherEdAreas.entries()).map(([area, courses]) => (
                    <div key={area} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 transition-colors group shadow-sm flex flex-col">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${getAreaBg(area)}`}>
                        {getAreaIcon(area)}
                      </div>
                      <h3 className="text-sm font-black text-gray-900 mb-1">{area}</h3>
                      <p className="text-[11px] font-bold text-gray-500 mb-4 line-clamp-2 flex-1">
                        {courses.map(c => c.name).slice(0, 3).join(', ')}
                        {courses.length > 3 ? '...' : ''}
                      </p>
                      <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center justify-between group-hover:underline w-full mt-auto">
                        View All <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 text-sm font-medium">
                  No higher education pathways currently mapped.
                </div>
              )}
            </section>

            {/* Popular Courses */}
            <section>
              <h2 className="text-lg font-black text-gray-900 mb-4">Popular Courses After {combo.name}</h2>
              {combo.ugCourses && combo.ugCourses.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {combo.ugCourses.slice(0, 6).map((course) => (
                      <div key={course._id} className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex items-center gap-3 mb-3">
                           <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                             <GraduationCap className="w-6 h-6 text-gray-400" />
                           </div>
                           <div>
                             <h3 className="text-sm font-black text-gray-900 line-clamp-1">{course.name}</h3>
                             <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center w-max mt-1">
                               Degree
                             </div>
                           </div>
                         </div>
                         <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-4">
                           <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.branches?.[0]?.duration || '3-4 Years'}</div>
                         </div>
                         <button onClick={() => navigate(`/courses/${course.slug}`)} className="w-full mt-auto bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 text-[11px] font-bold py-2 rounded-lg transition-colors border border-gray-200 hover:border-blue-200">
                           View Details
                         </button>
                      </div>
                    ))}
                 </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 text-sm font-medium">
                  No popular courses listed for this combination yet.
                </div>
              )}
            </section>

          </div>

          {/* Right Rail (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-black text-gray-900 text-sm mb-4">Quick Actions</h3>
              <div className="space-y-1.5">
                {[
                  { title: 'Find Colleges', desc: `Explore colleges for ${combo.name}`, icon: Building2, color: 'text-teal-600', bg: 'bg-teal-50', path: '/colleges' },
                  { title: 'Compare Combinations', desc: 'Compare with others', icon: Plus, color: 'text-purple-600', bg: 'bg-purple-50', path: '#' },
                  { title: 'Eligibility Checker', desc: 'Check your eligibility', icon: CheckCircle, color: 'text-orange-600', bg: 'bg-orange-50', path: '#' },
                  { title: 'Explore Careers', desc: 'See career options', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', path: '/jobs' },
                  { title: 'Entrance Exams', desc: 'Find relevant entrance exams', icon: Target, color: 'text-rose-600', bg: 'bg-rose-50', path: '/exams' },
                  { title: 'Download Report', desc: 'Get your personalized report', icon: Download, color: 'text-indigo-600', bg: 'bg-indigo-50', path: '#' }
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

            {/* Related Combinations */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-gray-900 text-sm">Related Combinations</h3>
                <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {stream.subjectCombinations?.filter(c => c._id !== combo._id).slice(0, 5).map((related) => {
                  const rSubjNames = related.subjects?.map(s => s.name).join(', ') || '';
                  return (
                    <div key={related._id} className="flex gap-3 cursor-pointer group" onClick={() => navigate(`/pathways/${levelSlug}/${pathwaySlug}/${streamSlug}/${related.slug}`)}>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-700 font-black text-[10px]">
                        {related.name.substring(0, 4)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">{related.name}</div>
                        <div className="text-[10px] font-medium text-gray-500 line-clamp-1 truncate">{rSubjNames}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 mt-1" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Aptitude CTA */}
            <div className="bg-gradient-to-br from-[#0B1F44] to-blue-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden text-center">
              <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 mx-auto mb-4">
                <TargetIcon className="w-6 h-6"/>
              </div>
              <h3 className="font-black text-sm text-white mb-2">Not sure if {combo.name} is right for you?</h3>
              <p className="text-[11px] text-blue-200 font-medium leading-relaxed mb-5">
                Take the U-THINK aptitude assessment to get personalized recommendations based on your interests and goals.
              </p>
              <button onClick={() => navigate('/quiz')} className="w-full bg-blue-600 hover:bg-blue-500 border border-blue-400 text-white text-xs font-black py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2">
                Take Aptitude Test <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CombinationDetail;
