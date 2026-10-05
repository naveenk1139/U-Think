import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Target, CheckCircle, Clock, GraduationCap, Briefcase, Zap, BookOpen, Map, AlertCircle, ArrowRight, X, Star, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyRoadmap() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        // Force evaluation to ensure we use the latest profile/marks data
        const genRes = await axios.post('/student-roadmap/generate', { studentId: currentUser.id });
        setRoadmaps([genRes.data]);
      } catch (genErr: any) {
        if (genErr.response?.data?.error === 'INCOMPLETE_PROFILE') {
          setError('INCOMPLETE_PROFILE');
        } else {
           const res = await axios.get('/student-roadmap/my-roadmaps');
           if (res.data && res.data.length > 0) setRoadmaps(res.data);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoadmap();
  }, [currentUser]);

  // Group steps into 4 Stages based on sequence
  const stages = [
    { id: 'Q1', title: 'Foundation', steps: [] as any[], color: 'text-yellow-400', accent: 'bg-yellow-400' },
    { id: 'Q2', title: 'Preparation', steps: [] as any[], color: 'text-orange-500', accent: 'bg-orange-500' },
    { id: 'Q3', title: 'Specialization', steps: [] as any[], color: 'text-purple-400', accent: 'bg-purple-400' },
    { id: 'Q4', title: 'Career Launch', steps: [] as any[], color: 'text-emerald-400', accent: 'bg-emerald-400' },
  ];

  if (!loading && roadmaps.length > 0 && roadmaps[0].steps && Array.isArray(roadmaps[0].steps)) {
    roadmaps[0].steps.forEach((step: any, index: number) => {
      if (step.type === 'Foundation') stages[0].steps.push(step);
      else if (step.type === 'Exam' || (step.type === 'Skill' && index < 4)) stages[1].steps.push(step);
      else if (step.type === 'Degree' || step.type === 'Project' || step.type === 'Skill') stages[2].steps.push(step);
      else stages[3].steps.push(step);
    });
    
    // Fallback if some stages are empty due to step types
    if (stages[3].steps.length === 0 && stages[2].steps.length > 1) {
        const lastStep = stages[2].steps.pop();
        if (lastStep) stages[3].steps.push(lastStep);
    }
  }

  const currentYear = new Date().getFullYear();

  if (!currentUser) return <div className="p-8 text-center text-slate-500">Please log in to view your roadmap.</div>;

  if (error === 'INCOMPLETE_PROFILE') {
    return (
      <div className="min-h-screen bg-[#111111] p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full p-8 bg-[#1a1a1a] rounded-3xl border border-rose-900/50 shadow-2xl text-center">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
          <p className="text-gray-400 mb-6">We need your latest academic details and career goals to generate an accurate roadmap.</p>
          
          <div className="bg-[#222222] rounded-xl p-4 mb-6 inline-block text-left w-64 border border-gray-800">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Profile Completion: {currentUser.profileCompletion || 0}%</p>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
              <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${currentUser.profileCompletion || 0}%` }}></div>
            </div>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Career Goals</li>
              <li>• Academic Information</li>
              <li>• Skills & Interests</li>
            </ul>
          </div>
          
          <button onClick={() => navigate('/profile')} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-colors">
            Update Profile
          </button>
        </div>
      </div>
    );
  }

  if (!loading && roadmaps.length === 0) return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-2xl font-bold text-white">No Roadmaps Found</h2>
      <p className="text-gray-400 mt-2">Go to the U-Think Education Tree, find a Career, and save it to generate your roadmap!</p>
    </div>
  );

  const activeRoadmap = roadmaps[0] || {};

  return (
    <div className="min-h-screen bg-[#111111] text-gray-200 p-6 md:p-12 font-sans overflow-x-hidden">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Personalized Education & Career Roadmap
        </h1>
        {loading ? (
           <div className="h-6 w-96 bg-gray-800 rounded mx-auto mt-4 animate-pulse"></div>
        ) : (
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Dynamically generated for <span className="text-white font-semibold">{currentUser.name}</span> targeting <span className="text-white font-semibold">{activeRoadmap.targetCareerName}</span>.
          </p>
        )}
        
        {!loading && activeRoadmap.skillGaps && activeRoadmap.skillGaps.length > 0 && (
          <div className="inline-block bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 text-left">
             <div className="flex items-center gap-2 mb-2 text-yellow-400 font-bold text-sm uppercase tracking-wider">
               <Zap className="w-4 h-4" /> Top Skill Gaps Identified
             </div>
             <div className="flex gap-4 flex-wrap justify-center">
               {activeRoadmap.skillGaps.slice(0,3).map((gap: any, i: number) => (
                 <div key={i} className="text-xs bg-[#222222] px-3 py-1.5 rounded-lg border border-gray-700">
                   <span className="text-gray-300">{gap.skillName}</span>
                   <span className="text-yellow-500 ml-2 border-l border-gray-700 pl-2">Req: {gap.requiredLevel}</span>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>

      {/* Roadmap Visualization */}
      <div className="max-w-[1400px] mx-auto relative">
        
        {/* Horizontal Dashed Line (Top) */}
        <div className="absolute top-10 left-0 w-full border-t-2 border-dashed border-gray-600/50 z-0 hidden md:block"></div>
        <div className="absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-emerald-400 opacity-20 z-0 hidden md:block"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {stages.map((stage, sIndex) => (
            <div key={stage.id} className="flex flex-col relative">
              
              {/* Stage Header */}
              <div className="flex gap-4 items-baseline mb-8">
                <div className={`text-5xl md:text-6xl font-black ${stage.color} tracking-tighter`}>
                  {stage.id}
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl font-bold ${stage.color}`}>{currentYear + sIndex}</span>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stage.title}</span>
                </div>
              </div>
              
              {/* Vertical Decorative Lines & Steps Container */}
              <div className="flex relative pl-4 md:pl-0 flex-grow">
                {/* Vertical Lines */}
                <div className="flex gap-1.5 mr-6 flex-shrink-0 h-full py-2">
                  <div className={`w-1 h-3/4 ${stage.accent} rounded-full opacity-80 mt-8`}></div>
                  <div className="w-1 h-full bg-blue-500 rounded-full opacity-60"></div>
                  <div className={`w-1 h-2/3 ${sIndex % 2 === 0 ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full opacity-70 mt-16`}></div>
                  <div className="w-1 h-4/5 bg-purple-500 rounded-full opacity-50 mt-4"></div>
                </div>
                
                {/* Steps Stack */}
                <div className="flex flex-col gap-5 w-full pt-4">
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="bg-[#222222] rounded-lg p-5 border-l-4 border-gray-700 h-32 animate-pulse flex flex-col justify-between">
                          <div className="h-6 w-3/4 bg-gray-700 rounded mb-4"></div>
                          <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
                          <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : stage.steps.map((step, idx) => {
                    const isCompleted = step.status === 'COMPLETED';
                    const isCurrent = step.status === 'CURRENT' || step.status === 'IN_PROGRESS';
                    
                    return (
                      <div 
                        key={step.stepId} 
                        className={`bg-[#222222] rounded-lg p-5 border-l-4 transition-transform hover:-translate-y-1 hover:shadow-2xl ${
                          isCompleted ? 'border-l-gray-500 opacity-70' : 
                          isCurrent ? `border-l-${stage.color.split('-')[1]}-500 shadow-[0_0_15px_rgba(255,255,255,0.05)] bg-[#2a2a2a]` : 
                          `border-l-gray-700`
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`font-bold text-lg leading-tight ${isCurrent ? 'text-white' : 'text-gray-200'}`}>
                            {step.title}
                          </h3>
                          {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-2" />}
                        </div>
                        
                        <p className="text-xs text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                          {step.description}
                        </p>
                        
                        {isCurrent && (
                          <div className="flex gap-2 mt-3 mb-4">
                            <button
                              onClick={async () => {
                                try {
                                  await axios.put('/student-roadmap/step/status', {
                                    stepId: step.stepId,
                                    status: 'COMPLETED'
                                  });
                                  // Refresh roadmap to get new next-best-action
                                  const res = await axios.get('/student-roadmap/my-roadmaps');
                                  if (res.data && res.data.length > 0) setRoadmaps(res.data);
                                } catch (e) {
                                  console.error(e);
                                }
                              }}
                              className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white px-3 py-1.5 rounded transition-colors"
                            >
                              Mark Completed
                            </button>
                            <button
                              onClick={async () => {
                                try {
                                  await axios.put('/student-roadmap/step/status', {
                                    stepId: step.stepId,
                                    status: 'FAILED',
                                    payload: { topic: step.title }
                                  });
                                  // Refresh roadmap to get remedial steps
                                  const res = await axios.get('/student-roadmap/my-roadmaps');
                                  if (res.data && res.data.length > 0) setRoadmaps(res.data);
                                } catch (e) {
                                  console.error(e);
                                }
                              }}
                              className="text-[10px] font-bold bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white px-3 py-1.5 rounded transition-colors"
                            >
                              Report Issue / Failure
                            </button>
                          </div>
                        )}
                        
                        {step.recommendedExams && step.recommendedExams.length > 0 && (
                          <div className="mb-3">
                            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Target Exams:</span>
                            <div className="flex flex-wrap gap-1">
                              {step.recommendedExams.map((exam: string, i: number) => (
                                <span key={i} className="text-[10px] bg-[#111111] border border-gray-700 text-gray-300 px-2 py-0.5 rounded">
                                  {exam}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {step.requiredSkills && step.requiredSkills.length > 0 && (
                          <div className="mb-3">
                            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Skills:</span>
                            <div className="flex flex-wrap gap-1">
                              {step.requiredSkills.slice(0,3).map((skill: string, i: number) => (
                                <span key={i} className="text-[10px] bg-[#333333] text-gray-300 px-2 py-0.5 rounded">
                                  {skill}
                                </span>
                              ))}
                              {step.requiredSkills.length > 3 && <span className="text-[10px] text-gray-500 px-1">+{step.requiredSkills.length - 3}</span>}
                            </div>
                          </div>
                        )}
                        
                        {step.recommendedCourses && step.recommendedCourses.length > 0 && (
                          <div className="mb-3">
                            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Degrees:</span>
                            <div className="flex flex-wrap gap-1">
                              {step.recommendedCourses.slice(0,2).map((course: string, i: number) => (
                                <span key={i} className="text-[10px] bg-[#111111] border border-gray-700 text-gray-300 px-2 py-0.5 rounded line-clamp-1">
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {stage.steps.length === 0 && !loading && (
                    <div className="bg-[#1a1a1a] border border-gray-800 border-dashed rounded-lg p-5 text-center text-gray-500 text-sm">
                      No milestones for this stage.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

