import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPathwayBySlug, PathwayData } from '../../api/pathwayApi';
import { ArrowLeft, Clock, GraduationCap, CheckCircle, Target, Briefcase, Share2, Heart, ShieldAlert, ArrowRight, BookOpen, Compass, ChevronRight } from 'lucide-react';

const PathwayDetail: React.FC = () => {
  const { slug, levelSlug } = useParams<{ slug: string; levelSlug?: string }>();
  const navigate = useNavigate();
  const [pathway, setPathway] = useState<PathwayData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await getPathwayBySlug(slug);
        setPathway(data);
      } catch (error) {
        console.error('Failed to load pathway detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-screen bg-[#F7F9FC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!pathway) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-[60vh] bg-[#F7F9FC]">
        <Compass className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Pathway not found</h2>
        <p className="text-gray-500 mb-6 font-medium">The pathway you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => navigate('/streams')} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors"
        >
          Return to Explorer
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F9FC] min-h-screen font-sans pb-20">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 pt-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/streams')} className="hover:text-blue-600 transition-colors">Pathways & Streams</button>
          <span>/</span>
          <span className="text-gray-900">{pathway.name}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm mb-8 relative overflow-hidden">
          {/* Background Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1 max-w-2xl">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-blue-600 hover:underline font-bold text-xs mb-5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">{pathway.name}</h1>
              
              <p className="text-sm font-medium text-gray-600 leading-relaxed mb-8">
                {pathway.description || 'Explore streams, courses, and career options available under this pathway.'}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><Clock className="w-4 h-4"/></div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Duration</div>
                    <div className="text-xs font-black text-gray-900">{pathway.duration || 'Not specified'}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><ShieldAlert className="w-4 h-4"/></div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Eligibility</div>
                    <div className="text-xs font-black text-gray-900">{pathway.eligibility || 'Passed 10th'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3 shrink-0">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm">
                Explore Streams
              </button>
              <div className="flex gap-3">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-bold text-sm transition-colors">
                  <Heart className="w-4 h-4" /> Save
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-bold text-sm transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Streams Section */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-black text-gray-900">Available Streams / Trades</h2>
                <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{pathway.streams?.length || 0}</span>
              </div>
              
              {pathway.streams && pathway.streams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pathway.streams.map((stream, idx) => {
                    const icons = [Target, Briefcase, BookOpen, GraduationCap];
                    const colors = ['text-blue-600 bg-blue-50 border-blue-100', 'text-emerald-600 bg-emerald-50 border-emerald-100', 'text-purple-600 bg-purple-50 border-purple-100', 'text-orange-600 bg-orange-50 border-orange-100'];
                    const c = colors[idx % colors.length];
                    const tColor = c.split(' ')[0];
                    const Icon = icons[idx % icons.length];
                    
                    return (
                      <div key={stream._id} className="bg-white border border-gray-200 hover:border-blue-300 rounded-2xl p-5 transition-all shadow-sm group cursor-pointer" onClick={() => navigate(`/pathways/${levelSlug || 'after-10th'}/${pathway.slug}/${stream.slug}`)}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${c}`}>
                          <Icon className="w-5 h-5"/>
                        </div>
                        <h3 className="text-sm font-black text-gray-900 mb-1">{stream.name}</h3>
                        <p className="text-[11px] font-medium text-gray-500 mb-4 line-clamp-2">
                          {stream.description || 'Explore the courses and career opportunities available in this stream.'}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className={`text-[10px] font-bold ${tColor} flex items-center gap-1 group-hover:underline`}>
                            View Details <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 text-sm font-medium">
                  No verified streams available for this pathway yet.
                </div>
              )}
            </section>
            
            {/* General Info placeholder */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
               <h2 className="text-base font-black text-gray-900 mb-4">Why Choose {pathway.name}?</h2>
               <p className="text-xs font-medium text-gray-600 leading-relaxed mb-4">
                 Choosing the right educational pathway is critical for your future. The {pathway.name} pathway offers specialized focus, robust career opportunities, and acts as a stepping stone to higher education or immediate employment depending on the stream chosen.
               </p>
               <ul className="space-y-3">
                 <li className="flex items-start gap-2 text-xs font-medium text-gray-700">
                   <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Strong foundation for specialized higher education.
                 </li>
                 <li className="flex items-start gap-2 text-xs font-medium text-gray-700">
                   <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Diverse career opportunities across multiple industries.
                 </li>
                 <li className="flex items-start gap-2 text-xs font-medium text-gray-700">
                   <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Structured curriculum aligned with modern industry needs.
                 </li>
               </ul>
            </section>

          </div>

          {/* Right Rail Context */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-black text-gray-900 text-sm mb-4">Explore More</h3>
              <div className="space-y-2">
                <button onClick={() => navigate('/colleges')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0"><BookOpen className="w-4 h-4"/></div>
                    <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Find Colleges</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                </button>
                <button onClick={() => navigate('/jobs')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Briefcase className="w-4 h-4"/></div>
                    <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Explore Careers</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                </button>
                <button onClick={() => navigate('/exams')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0"><Target className="w-4 h-4"/></div>
                    <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Entrance Exams</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                </button>
              </div>
            </div>

            <div className="bg-[#0B1F44] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden text-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 mx-auto mb-3">
                <Compass className="w-5 h-5"/>
              </div>
              <h3 className="font-black text-sm text-white mb-2">Need Guidance?</h3>
              <p className="text-[10px] text-blue-200 font-medium leading-relaxed mb-4">
                Take our aptitude test to see if {pathway.name} is the right fit for your skills and interests.
              </p>
              <button onClick={() => navigate('/quiz')} className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                Take Aptitude Test
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PathwayDetail;
