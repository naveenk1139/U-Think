import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { 
  Search, ChevronRight, BookOpen, Brain, Briefcase, 
  GraduationCap, Settings, Wrench, PlusSquare, Palette, 
  Users, Factory, Award, CheckCircle, ArrowRight, 
  Heart, Map, Activity, BarChart, X, ArrowLeft
} from 'lucide-react';

interface Pathway {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

interface Stream {
  _id: string;
  name: string;
  slug: string;
  pathwayId: string;
}

interface Course {
  _id: string;
  name: string;
  slug: string;
  category: string;
  stream: string;
  duration?: string;
  eligibility?: string;
  careers?: string[];
  higherEducation?: string[];
  subjects?: string[];
  type?: string;
}

const PATHWAY_CONFIG: Record<string, { icon: any, color: string, bg: string, text: string, subtitle: string }> = {
  'puc': { icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', text: 'PUC / 11th–12th', subtitle: 'Science, Commerce and Arts pathways' },
  'diploma': { icon: Settings, color: 'text-amber-500', bg: 'bg-amber-50', text: 'Diploma / Polytechnic', subtitle: 'Engineering and technical diploma programs' },
  'iti': { icon: Wrench, color: 'text-emerald-500', bg: 'bg-emerald-50', text: 'ITI & Trade Training', subtitle: 'Skill-based technical trades' },
  'paramedical': { icon: PlusSquare, color: 'text-rose-500', bg: 'bg-rose-50', text: 'Paramedical & Allied Health', subtitle: 'Healthcare-related education pathways' },
  'vocational': { icon: Palette, color: 'text-purple-500', bg: 'bg-purple-50', text: 'Vocational Education', subtitle: 'Job-oriented vocational programs' },
  'apprenticeship': { icon: Users, color: 'text-sky-500', bg: 'bg-sky-50', text: 'Apprenticeship & Skill Training', subtitle: 'Industry-oriented practical training' },
  'industry-training': { icon: Factory, color: 'text-indigo-500', bg: 'bg-indigo-50', text: 'Industry Training', subtitle: 'Industry-specific training programs' },
  'certificate': { icon: Award, color: 'text-green-600', bg: 'bg-green-50', text: 'Certificate Courses', subtitle: 'Short-term certificate and skill programs' },
};

export default function PathwaysExplorer() {
  const navigate = useNavigate();
  
  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  
  const [selectedPathway, setSelectedPathway] = useState<Pathway | null>(null);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState<boolean>(false);
  
  const [showEligibility, setShowEligibility] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [eligibilityScore, setEligibilityScore] = useState('');
  const [eligibilityResult, setEligibilityResult] = useState<'pass' | 'fail' | null>(null);
  const [eligibilityMessage, setEligibilityMessage] = useState('');
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [timelineData, setTimelineData] = useState<any>(null);
  const [loadingTimeline, setLoadingTimeline] = useState(false);

  const [loading, setLoading] = useState(true);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [pRes, sRes, cRes] = await Promise.all([
        api.get('/api/pathways'),
        api.get('/api/streams'),
        api.get('/api/courses')
      ]);
      // Force order according to mock requirements
      const orderedSlugs = ['puc', 'diploma', 'iti', 'paramedical', 'vocational', 'apprenticeship', 'industry-training', 'certificate'];
      const fetchedPathways = pRes.data?.data || pRes.data || [];
      const sortedPathways = [...fetchedPathways].sort((a, b) => {
        let idxA = orderedSlugs.indexOf(a.slug);
        let idxB = orderedSlugs.indexOf(b.slug);
        if (idxA === -1) idxA = 999;
        if (idxB === -1) idxB = 999;
        return idxA - idxB;
      });
      
      setPathways(sortedPathways);
      setStreams(sRes.data?.data || sRes.data || []);
      setCourses(cRes.data?.data || cRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStreamsForPathway = (pId: string) => streams.filter(s => s.pathwayId === pId);
  const getCoursesForStream = (sSlug: string) => courses.filter(c => c.stream === sSlug);
  const getCoursesForPathway = (pSlug: string) => courses.filter(c => c.category === pSlug);

  const getOptionsCount = (pathway: Pathway) => {
    const pStreams = getStreamsForPathway(pathway._id);
    if (pStreams.length > 0) {
      // Return count of all courses across these streams
      return pStreams.reduce((acc, s) => acc + getCoursesForStream(s.slug).length, 0);
    }
    // Return count of courses directly linked to pathway
    return getCoursesForPathway(pathway.slug).length;
  };

  const getActiveStep = () => {
    if (showCourseDetails) return 4;
    if (selectedCourse) return 4;
    if (selectedStream || (selectedPathway && getStreamsForPathway(selectedPathway._id).length === 0)) return 3;
    if (selectedPathway) return 2;
    return 1;
  };

  const activeStep = getActiveStep();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="text-slate-900 font-sans pb-24">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl shadow-xl relative overflow-hidden mb-8 w-full">
        <div className="relative z-10 px-6 py-8 md:py-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-semibold tracking-wide text-blue-100">
              <GraduationCap className="w-3.5 h-3.5" />
              Education Pathway Navigator
            </div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight text-white tracking-tight">
              Where do I go <span className="text-yellow-400">after 10th?</span>
            </h1>
            <p className="text-blue-100 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
              Explore your education options from 10th standard to higher education and career. Discover pathways, streams, courses, skills and job opportunities and build your personalized education journey.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-900/50">
                <Brain className="w-4 h-4" /> Find My Best Pathway
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
                <BarChart className="w-4 h-4" /> Take Aptitude Assessment
              </button>
            </div>
          </div>
          
          {/* Visual Pathway Concept */}
          <div className="hidden lg:flex flex-1 justify-center items-center relative">
            <svg viewBox="0 0 400 300" className="w-full max-w-[320px] drop-shadow-2xl">
              <path d="M 50 250 Q 150 250 200 180 T 350 100" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12" strokeLinecap="round" strokeDasharray="10 10"/>
              <path d="M 50 250 Q 150 250 200 180 T 350 100" fill="none" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round" className="animate-pulse"/>
              
              <g transform="translate(50, 250)">
                <circle r="16" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="4"/>
                <text y="-25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">10th</text>
              </g>
              
              <g transform="translate(140, 210)">
                <circle r="14" fill="#1E3A8A" stroke="#FBBF24" strokeWidth="4"/>
                <text y="-25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Pathway</text>
              </g>
              
              <g transform="translate(240, 150)">
                <circle r="14" fill="#1E3A8A" stroke="#34D399" strokeWidth="4"/>
                <text y="-25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Stream</text>
              </g>
              
              <g transform="translate(350, 100)">
                <circle r="18" fill="#1E3A8A" stroke="#A78BFA" strokeWidth="4"/>
                <text y="-30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Career</text>
                <path d="M-6,-4 L-6,6 L6,6 L6,-4 Z M-4,-6 L4,-6" fill="white" />
              </g>
            </svg>
          </div>
          
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="w-full">

        {/* Progress Indicator */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-100 -translate-y-1/2 z-0 hidden md:block"></div>
          <div 
            className="absolute top-1/2 left-10 h-1 bg-blue-600 -translate-y-1/2 z-0 hidden md:block transition-all duration-500" 
            style={{ width: `${(activeStep - 1) * 25}%` }}
          ></div>
          
          {[
            { step: 1, label: 'Choose Pathway' },
            { step: 2, label: 'Select Stream' },
            { step: 3, label: 'Choose Course' },
            { step: 4, label: 'View Details' },
            { step: 5, label: 'Plan Career' }
          ].map(s => (
            <div key={s.step} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors shadow-sm
                ${activeStep === s.step ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 
                  activeStep > s.step ? 'bg-blue-100 text-blue-600 border border-blue-200' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}
              >
                {activeStep > s.step ? <CheckCircle className="w-5 h-5" /> : s.step}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider hidden md:block
                ${activeStep === s.step ? 'text-blue-700' : activeStep > s.step ? 'text-blue-500' : 'text-slate-400'}`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {!showCourseDetails ? (
          <div className="space-y-10">
            {/* STEP 1: CHOOSE PATHWAY */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-blue-100 text-blue-700 font-black px-3 py-1 rounded-lg text-sm">Step 1</span>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Choose Your Pathway</h2>
                  <p className="text-slate-500 text-sm">Select the education route you want to explore after 10th.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pathways.map(p => {
                  const conf = PATHWAY_CONFIG[p.slug] || { icon: GraduationCap, color: 'text-slate-600', bg: 'bg-slate-50', text: p.name, subtitle: 'Explore this pathway' };
                  const isSelected = selectedPathway?._id === p._id;
                  const Icon = conf.icon;
                  
                  return (
                    <button
                      key={p._id}
                      onClick={() => {
                        setSelectedPathway(p);
                        setSelectedStream(null);
                        setSelectedCourse(null);
                      }}
                      className={`text-left rounded-2xl p-5 border-2 transition-all flex flex-col h-full bg-white relative group
                        ${isSelected ? 'border-blue-500 shadow-md ring-1 ring-blue-500' : 'border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${conf.bg} ${conf.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <ArrowRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-blue-500 translate-x-1' : 'text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1'}`} />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2">{conf.text}</h3>
                      <p className="text-slate-500 text-xs flex-grow mb-4 leading-relaxed">{conf.subtitle}</p>
                      <div className={`text-xs font-bold inline-flex items-center px-2.5 py-1 rounded-full w-max
                        ${isSelected ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600'}`}>
                        {getOptionsCount(p)} options
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: SELECT STREAM */}
            {selectedPathway && getStreamsForPathway(selectedPathway._id).length > 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 border-t border-slate-200 pt-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-emerald-100 text-emerald-700 font-black px-3 py-1 rounded-lg text-sm">Step 2</span>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Select a Stream</h2>
                    <p className="text-slate-500 text-sm">Choose your focused area of study within {selectedPathway.name}.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {getStreamsForPathway(selectedPathway._id).map(s => (
                    <button
                      key={s._id}
                      onClick={() => {
                        setSelectedStream(s);
                        setSelectedCourse(null);
                      }}
                      className={`p-6 rounded-2xl text-left transition-all border-2 flex items-center justify-between group
                        ${selectedStream?._id === s._id ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'}`}
                    >
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{s.name}</h3>
                        <p className="text-emerald-600 text-xs font-semibold mt-1">{getCoursesForStream(s.slug).length} Combinations/Courses</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${selectedStream?._id === s._id ? 'text-emerald-600' : 'text-slate-300 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform'}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: CHOOSE COURSE */}
            {(selectedStream || (selectedPathway && getStreamsForPathway(selectedPathway._id).length === 0)) && (
              <div className="animate-in fade-in slide-in-from-bottom-4 border-t border-slate-200 pt-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-purple-100 text-purple-700 font-black px-3 py-1 rounded-lg text-sm">Step 3</span>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Explore Courses</h2>
                    <p className="text-slate-500 text-sm">Select a specific course, combination, or trade to view details.</p>
                  </div>
                  
                  {/* View Toggles & Filters */}
                  <div className="ml-auto bg-slate-100 p-1 rounded-xl hidden md:flex items-center">
                    <button className="px-4 py-1.5 rounded-lg bg-white shadow-sm text-purple-700 font-bold text-sm">Card View</button>
                    <button className="px-4 py-1.5 rounded-lg text-slate-500 font-bold text-sm hover:text-slate-700 hover:bg-slate-200/50 transition-colors">Tree View</button>
                    <button className="px-4 py-1.5 rounded-lg text-slate-500 font-bold text-sm hover:text-slate-700 hover:bg-slate-200/50 transition-colors">Flow View</button>
                  </div>
                </div>

                <div className="mb-6 flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" placeholder="Search combinations, careers, or interests..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-purple-500 focus:bg-white transition-colors text-sm font-medium" />
                  </div>
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-purple-500 text-sm font-medium text-slate-700">
                    <option>Any Eligibility</option>
                    <option>10th Pass (35%)</option>
                    <option>10th Merit (75%+)</option>
                  </select>
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-purple-500 text-sm font-medium text-slate-700">
                    <option>Any Duration</option>
                    <option>6 Months - 1 Year</option>
                    <option>2 Years</option>
                    <option>3 Years</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(selectedStream ? getCoursesForStream(selectedStream.slug) : (selectedPathway ? getCoursesForPathway(selectedPathway.slug) : [])).map(c => (
                    <div key={c._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                      <div className="mb-4 flex-grow">
                        <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">{c.type || 'Course'}</div>
                        <h3 className="font-black text-xl text-slate-900 mb-3">{c.name}</h3>
                        
                        <div className="space-y-2 mb-4">
                          {c.duration && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Duration</span>
                              <span className="font-semibold text-slate-800">{c.duration}</span>
                            </div>
                          )}
                          {c.eligibility && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Eligibility</span>
                              <span className="font-semibold text-slate-800">{c.eligibility}</span>
                            </div>
                          )}
                        </div>

                        {c.subjects && c.subjects.length > 0 && (
                          <div className="mb-4">
                            <span className="text-xs font-semibold text-slate-500 block mb-1">Key Subjects</span>
                            <p className="text-sm text-slate-700 leading-snug">
                              {c.subjects.slice(0, 4).join(' • ')} {c.subjects.length > 4 && '...'}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">
                        <button 
                          onClick={() => {
                            setSelectedCourse(c);
                            setShowCourseDetails(true);
                          }}
                          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                        >
                          View Details
                        </button>
                        <button className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm transition-colors">
                          Compare
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {(selectedStream ? getCoursesForStream(selectedStream.slug) : (selectedPathway ? getCoursesForPathway(selectedPathway.slug) : [])).length === 0 && (
                    <div className="col-span-full p-12 text-center text-slate-500 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                      <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <h3 className="font-bold text-slate-700 mb-1">No courses found</h3>
                      <p className="text-sm">Detailed courses for this section are being updated in the database.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* STEP 4: COURSE DETAILS FULL VIEW */
          <div className="animate-in slide-in-from-right-8 fade-in">
            <button 
              onClick={() => setShowCourseDetails(false)}
              className="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to courses
            </button>

            {selectedCourse && (
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                {/* Detail Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 sm:p-12 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                      {selectedPathway?.name} {selectedStream && <><ChevronRight className="w-3 h-3"/> {selectedStream.name}</>}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black mb-4">{selectedCourse.name}</h2>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-300">
                      {selectedCourse.duration && <span className="bg-white/10 px-3 py-1 rounded-full">{selectedCourse.duration}</span>}
                      {selectedCourse.type && <span className="bg-white/10 px-3 py-1 rounded-full">{selectedCourse.type}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => setShowEligibility(true)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" /> Check My Eligibility
                    </button>
                    <button 
                      onClick={() => showToast('Pathway saved to your profile!')}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Heart className="w-4 h-4" /> Save Pathway
                    </button>
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-10">
                    
                    <section>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                        <BookOpen className="w-5 h-5 text-blue-600" /> Curriculum & Subjects
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.subjects ? selectedCourse.subjects.map(s => (
                          <span key={s} className="bg-blue-50 text-blue-800 border border-blue-100 px-3 py-1.5 rounded-lg text-sm font-semibold">{s}</span>
                        )) : <p className="text-slate-500 italic">No specific subjects listed.</p>}
                      </div>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Activity className="w-5 h-5 text-orange-600" /> Required Skills & Certifications
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-bold text-slate-700 mb-2">Core Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCourse.skills && selectedCourse.skills.length > 0 ? selectedCourse.skills.map(s => (
                              <span key={s} className="bg-orange-50 text-orange-800 border border-orange-100 px-3 py-1 rounded-full text-xs font-bold">{s}</span>
                            )) : <p className="text-slate-500 text-sm italic">General skills apply.</p>}
                          </div>
                        </div>
                        {selectedCourse.certifications && selectedCourse.certifications.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-slate-700 mb-2">Recommended Certifications</h4>
                            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                              {selectedCourse.certifications.map(c => <li key={c}>{c}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Brain className="w-5 h-5 text-purple-600" /> Higher Education Opportunities
                      </h3>
                      {selectedCourse.higherEducation && selectedCourse.higherEducation.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedCourse.higherEducation.map(h => (
                            <li key={h} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <GraduationCap className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                              <span className="text-slate-800 font-medium text-sm">{h}</span>
                            </li>
                          ))}
                        </ul>
                      ) : <p className="text-slate-500 italic">General progression paths available.</p>}
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Briefcase className="w-5 h-5 text-emerald-600" /> Career & Job Roles
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-bold text-slate-700 mb-2">Career Opportunities</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCourse.careers && selectedCourse.careers.length > 0 ? selectedCourse.careers.map(c => (
                              <span key={c} className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1.5 rounded-lg text-sm font-semibold">{c}</span>
                            )) : <p className="text-slate-500 text-sm italic">Various sector-specific roles.</p>}
                          </div>
                        </div>
                        {selectedCourse.jobRoles && selectedCourse.jobRoles.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-slate-700 mb-2">Relevant Job Roles</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedCourse.jobRoles.map(j => (
                                <span key={j} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-semibold">{j}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedCourse.industries && selectedCourse.industries.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-slate-700 mb-2">Target Industries</h4>
                            <p className="text-sm text-slate-600">{selectedCourse.industries.join(', ')}</p>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Quick Facts</h4>
                      <dl className="space-y-4">
                        {selectedCourse.duration && (
                          <div>
                            <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Duration</dt>
                            <dd className="text-sm font-bold text-slate-800">{selectedCourse.duration}</dd>
                          </div>
                        )}
                        <div>
                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Eligibility Criteria</dt>
                          <dd className="text-sm font-bold text-slate-800">{selectedCourse.eligibility || 'Check specific institution'}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Admission Process</dt>
                          <dd className="text-sm font-medium text-slate-800">
                            {selectedCourse.admissionRoute && selectedCourse.admissionRoute.length > 0 
                              ? selectedCourse.admissionRoute.join(', ') 
                              : 'Merit / Entrance based'}
                          </dd>
                        </div>
                        {selectedCourse.entranceExams && selectedCourse.entranceExams.length > 0 && (
                          <div>
                            <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Entrance Exams</dt>
                            <dd className="text-sm font-medium text-purple-700">{selectedCourse.entranceExams.join(', ')}</dd>
                          </div>
                        )}
                        {selectedCourse.fees && (
                          <div>
                            <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Estimated Fees</dt>
                            <dd className="text-sm font-medium text-slate-800">{selectedCourse.fees}</dd>
                          </div>
                        )}
                        {selectedCourse.institutions && selectedCourse.institutions.length > 0 && (
                          <div>
                            <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Top Colleges</dt>
                            <dd className="text-sm font-medium text-slate-800">{selectedCourse.institutions.join(', ')}</dd>
                          </div>
                        )}
                        {selectedCourse.source && (
                          <div className="pt-2 mt-2 border-t border-slate-200">
                            <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Data Source</dt>
                            <dd className="text-xs text-slate-600 flex items-center gap-1">
                              {selectedCourse.verificationStatus === 'VERIFIED' && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                              {selectedCourse.sourceUrl ? (
                                <a href={selectedCourse.sourceUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{selectedCourse.source}</a>
                              ) : (
                                selectedCourse.source
                              )}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                      <h4 className="font-bold text-blue-900 mb-2">Simulate Your Future</h4>
                      <p className="text-sm text-blue-700 mb-4">See how choosing {selectedCourse.name} affects your career trajectory 10 years from now.</p>
                      <button 
                        onClick={async () => {
                          setShowSimulator(true);
                          setLoadingTimeline(true);
                          try {
                            const res = await api.get(`/api/simulator/timeline/${selectedCourse.slug}`);
                            setTimelineData(res.data.timeline);
                          } catch (err) {
                            console.error(err);
                          } finally {
                            setLoadingTimeline(false);
                          }
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <Activity className="w-4 h-4" /> What-If Simulator
                      </button>
                    </div>

                    <button 
                      onClick={() => showToast(`${selectedCourse.name} added to your Roadmap!`)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Map className="w-5 h-5" /> Add to My Roadmap
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl z-50 animate-in slide-in-from-bottom-8">
          {toastMsg}
        </div>
      )}

      {/* Eligibility Modal */}
      {showEligibility && selectedCourse && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl">
            <button onClick={() => { setShowEligibility(false); setEligibilityResult(null); setEligibilityScore(''); }} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Eligibility Check</h2>
            <p className="text-slate-600 text-sm mb-6">Let's see if you qualify for {selectedCourse.name}.</p>
            
            {!eligibilityResult ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">What is your expected 10th/12th Percentage?</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 75" 
                    value={eligibilityScore}
                    onChange={(e) => setEligibilityScore(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500 font-medium"
                  />
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
                  <span className="font-bold text-slate-800">Standard Requirement:</span> {selectedCourse.eligibility || 'Minimum pass percentage.'}
                </div>
                <button 
                  onClick={async () => {
                    const score = parseInt(eligibilityScore);
                    if (!score || score < 0 || score > 100) return;
                    setCheckingEligibility(true);
                    try {
                      const res = await api.post('/api/simulator/eligibility/check', {
                        courseSlug: selectedCourse.slug,
                        score
                      });
                      setEligibilityResult(res.data.status);
                      setEligibilityMessage(res.data.message);
                    } catch (err) {
                      setEligibilityResult(score >= 35 ? 'pass' : 'fail');
                      setEligibilityMessage('Default calculation applied (API Error).');
                    } finally {
                      setCheckingEligibility(false);
                    }
                  }}
                  disabled={checkingEligibility}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl transition-colors"
                >
                  {checkingEligibility ? 'Checking...' : 'Verify Eligibility'}
                </button>
              </div>
            ) : (
              <div className="text-center py-6 animate-in zoom-in-95">
                {eligibilityResult === 'pass' ? (
                  <>
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">You're Eligible!</h3>
                    <p className="text-slate-600">{eligibilityMessage}</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Almost There</h3>
                    <p className="text-slate-600">{eligibilityMessage}</p>
                  </>
                )}
                <button 
                  onClick={() => { setShowEligibility(false); setEligibilityResult(null); setEligibilityScore(''); }}
                  className="mt-6 w-full bg-slate-900 text-white font-bold py-3 rounded-xl"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Simulator Modal */}
      {showSimulator && selectedCourse && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 text-white rounded-3xl w-full max-w-2xl p-8 relative shadow-2xl border border-slate-800">
            <button onClick={() => setShowSimulator(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-black">Future Simulator</h2>
            </div>
            <p className="text-slate-400 text-sm mb-10">Projected 10-year trajectory if you choose {selectedCourse.name}.</p>
            
            <div className="space-y-0 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-emerald-500">
              
              {loadingTimeline ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                  <p className="text-slate-400">Generating AI timeline...</p>
                </div>
              ) : timelineData ? (
                timelineData.map((item: any, i: number) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8 animate-in slide-in-from-bottom-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 
                      ${item.color === 'blue' ? 'bg-blue-500' : item.color === 'purple' ? 'bg-purple-500' : 'bg-emerald-500'}`}>
                      {item.icon === 'BookOpen' ? <BookOpen className="w-5 h-5"/> : item.icon === 'GraduationCap' ? <GraduationCap className="w-5 h-5"/> : <Briefcase className="w-5 h-5"/>}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-800/50 p-5 rounded-2xl border border-slate-700 backdrop-blur-sm">
                      <div className={`font-bold text-sm mb-1 ${item.color === 'blue' ? 'text-blue-400' : item.color === 'purple' ? 'text-purple-400' : 'text-emerald-400'}`}>{item.period}</div>
                      <h4 className="font-black text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-500">Failed to load timeline.</div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
