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
  const [selectedStep, setSelectedStep] = useState<any | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        // Ask for regeneration/re-evaluation
        const genRes = await axios.post('/student-roadmap/generate', { studentId: currentUser.id });
        setRoadmaps([genRes.data]);
      } catch (genErr: any) {
        if (genErr.response?.data?.error === 'INCOMPLETE_PROFILE') {
          setError('INCOMPLETE_PROFILE');
        } else {
           // Fallback if generation fails but they have an old one
           const res = await axios.get('/student-roadmap/my-roadmaps');
           if (res.data && res.data.length > 0) setRoadmaps(res.data);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoadmap();
  }, [currentUser]);

  if (!currentUser) return <div className="p-8 text-center text-slate-500">Please log in to view your roadmap.</div>;
  if (loading) return (
    <div className="p-16 text-center max-w-lg mx-auto mt-10 space-y-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto"></div>
      <div className="text-slate-600 font-medium">
        <p className="mb-2 text-lg text-slate-800">Analyzing your profile...</p>
        <div className="text-sm space-y-1 text-left inline-block w-48">
          <p>✓ Academic profile</p>
          <p>✓ Interests & Skills</p>
          <p>✓ Career goals</p>
          <p>✓ Eligibility mapping</p>
        </div>
        <p className="mt-4 text-xs">Generating personalized roadmap...</p>
      </div>
    </div>
  );

  if (error === 'INCOMPLETE_PROFILE') {
    return (
      <div className="max-w-2xl mx-auto p-8 mt-12 bg-white rounded-3xl border border-rose-100 shadow-xl text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Complete Your Profile</h2>
        <p className="text-slate-600 mb-6">We need more information to generate an accurate personalized roadmap.</p>
        
        <div className="bg-slate-50 rounded-xl p-4 mb-6 inline-block text-left w-64">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Profile Completion: {currentUser.profileCompletion || 0}%</p>
          <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
            <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${currentUser.profileCompletion || 0}%` }}></div>
          </div>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Career Goals</li>
            <li>• Academic Information</li>
            <li>• Skills & Interests</li>
          </ul>
        </div>
        
        <button onClick={() => navigate('/profile')} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-colors">
          Complete Profile
        </button>
      </div>
    );
  }

  if (roadmaps.length === 0) return (
    <div className="p-8 max-w-4xl mx-auto text-center mt-20">
      <h2 className="text-2xl font-bold text-slate-800">No Roadmaps Found</h2>
      <p className="text-slate-600 mt-2">Go to the U-Think Education Tree, find a Career, and save it to generate your roadmap!</p>
    </div>
  );

  const activeRoadmap = roadmaps[0];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 pb-24">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Target className="w-64 h-64" />
        </div>
        <div className="relative z-10 w-full md:w-2/3">
          <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Personalized Roadmap
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-2 leading-tight">Goal: {activeRoadmap.targetCareerName}</h1>
          <p className="text-indigo-200 mb-6 text-lg">Current Stage: <span className="font-semibold text-white">{activeRoadmap.currentPhase}</span></p>
          
          <div className="w-full bg-slate-800/50 rounded-full h-4 mb-2 overflow-hidden backdrop-blur-sm border border-slate-700">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: `${activeRoadmap.overallProgress}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-indigo-300 font-bold px-1">
            <span>START</span>
            <span>{activeRoadmap.overallProgress}% COMPLETED</span>
            <span>GOAL</span>
          </div>
        </div>
        
        {/* Mobile Skill Gaps Summary */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0 md:ml-8 relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <h3 className="font-bold text-white flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Top Skill Gaps
                </h3>
                {activeRoadmap.skillGaps && activeRoadmap.skillGaps.length > 0 ? (
                    <div className="space-y-2">
                        {activeRoadmap.skillGaps.slice(0, 3).map((gap: any, i: number) => (
                            <div key={i} className="text-sm flex justify-between items-center border-b border-white/10 pb-2 last:border-0 last:pb-0">
                                <span className="text-indigo-100">{gap.skillName}</span>
                                <span className="text-xs bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded border border-amber-400/30">Target: {gap.requiredLevel}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-indigo-200">You have no critical skill gaps!</p>
                )}
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: The Visual Roadmap */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-10">
            <Map className="w-6 h-6 text-indigo-600" />
            Your Journey
          </h2>
          
          <div className="relative">
            {/* The continuous line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 transform md:-translate-x-1/2 rounded-full z-0"></div>
            
            <div className="space-y-12">
              {activeRoadmap.steps && activeRoadmap.steps.map((step: any, index: number) => {
                const Icon = getStepIcon(step.type);
                const isCompleted = step.status === 'COMPLETED';
                const isCurrent = step.status === 'CURRENT' || step.status === 'IN_PROGRESS';
                const isNext = step.status === 'NEXT';
                const isLocked = step.status === 'LOCKED';
                
                // Determine left or right alignment for desktop
                const isEven = index % 2 === 0;
                
                let statusColor = 'bg-slate-100 text-slate-500 border-slate-200';
                let iconColor = 'bg-slate-200 text-slate-400';
                if (isCompleted) {
                    statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    iconColor = 'bg-emerald-500 text-white';
                } else if (isCurrent) {
                    statusColor = 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-lg shadow-indigo-100';
                    iconColor = 'bg-indigo-600 text-white ring-4 ring-indigo-100';
                } else if (isNext) {
                    statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
                    iconColor = 'bg-amber-400 text-white';
                }
                
                return (
                  <div key={step.stepId} className={`relative z-10 flex items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}>
                    
                    {/* Center Icon */}
                    <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${iconColor} ${isCurrent ? 'scale-110' : ''}`}>
                            {isCompleted ? <CheckCircle className="w-6 h-6" /> : isLocked ? <CheckCircle className="w-6 h-6 opacity-50" /> : <Icon className="w-5 h-5" />}
                        </div>
                    </div>
                    
                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 pl-16 md:pl-0' : 'md:pl-12 pl-16'}`}>
                        <div 
                            onClick={() => setSelectedStep(step)}
                            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl ${statusColor} ${isLocked ? 'opacity-70' : ''} bg-white group`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide ${isCompleted ? 'bg-emerald-100 text-emerald-800' : isCurrent ? 'bg-indigo-100 text-indigo-800' : isNext ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                                    {step.status === 'IN_PROGRESS' ? 'CURRENT' : step.status}
                                </span>
                                {step.estimatedDuration && (
                                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                        <Clock className="w-3 h-3" />
                                        {step.estimatedDuration}
                                    </span>
                                )}
                            </div>
                            
                            <h3 className={`text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors ${isCompleted ? 'text-slate-800' : 'text-slate-700'}`}>
                                {step.title}
                            </h3>
                            
                            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{step.description}</p>
                            
                            <div className="flex items-center text-indigo-600 text-sm font-semibold group-hover:gap-2 transition-all gap-1">
                                View Details <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Right Side: Step Details Panel (Sticky) */}
        <div className="w-full md:w-1/3">
            <div className="sticky top-24">
                {selectedStep ? (
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className={`p-6 text-white ${selectedStep.status === 'COMPLETED' ? 'bg-emerald-600' : selectedStep.status === 'CURRENT' || selectedStep.status === 'IN_PROGRESS' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                            <div className="flex justify-between items-start">
                                <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider backdrop-blur-sm">
                                    {selectedStep.type}
                                </span>
                                <button onClick={() => setSelectedStep(null)} className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <h3 className="text-2xl font-bold mt-4">{selectedStep.title}</h3>
                        </div>
                        
                        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                                <p className="text-slate-700 text-sm">{selectedStep.description}</p>
                            </div>
                            
                            {selectedStep.whyRecommended && (
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                                    <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                                        <Star className="w-3 h-3" /> Why Recommended
                                    </h4>
                                    <p className="text-indigo-900 text-sm">{selectedStep.whyRecommended}</p>
                                </div>
                            )}

                            {selectedStep.requiredSkills && selectedStep.requiredSkills.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Required Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedStep.requiredSkills.map((skill: string, i: number) => (
                                            <span key={i} className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedStep.recommendedExams && selectedStep.recommendedExams.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                                        <FileText className="w-3 h-3" /> Target Exams
                                    </h4>
                                    <div className="space-y-2">
                                        {selectedStep.recommendedExams.map((exam: string, i: number) => (
                                            <div key={i} className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between group cursor-pointer hover:border-indigo-300">
                                                <span className="font-semibold text-sm text-slate-800">{exam}</span>
                                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {selectedStep.recommendedCourses && selectedStep.recommendedCourses.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                                        <GraduationCap className="w-3 h-3" /> Related Degrees
                                    </h4>
                                    <div className="space-y-2">
                                        {selectedStep.recommendedCourses.map((course: string, i: number) => (
                                            <div key={i} className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between group cursor-pointer hover:border-indigo-300">
                                                <span className="font-semibold text-sm text-slate-800">{course}</span>
                                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center text-slate-400">
                        <Map className="w-12 h-12 mb-4 text-slate-300" />
                        <p>Click on any milestone in your roadmap to view detailed recommendations and requirements.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

function getStepIcon(type: string) {
  switch (type) {
    case 'Foundation': return BookOpen;
    case 'Exam': return Clock;
    case 'Degree': return GraduationCap;
    case 'Skill': return Zap;
    case 'Career': return Briefcase;
    case 'Project': return Target;
    default: return CheckCircle;
  }
}
