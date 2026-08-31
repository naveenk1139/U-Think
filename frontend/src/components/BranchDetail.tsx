import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBranchBySlug, BranchDetailData } from '../api/branchApi';
import { ArrowLeft, BookOpen, GraduationCap, Briefcase, IndianRupee, Target, ChevronRight, Building } from 'lucide-react';

const BranchDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [branch, setBranch] = useState<BranchDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getBranchBySlug(slug)
        .then(setBranch)
        .catch(err => {
          console.error(err);
          setError('Branch details not found.');
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1C64F2]"></div>
      </div>
    );
  }

  if (error || !branch) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg mb-4">{error || 'Branch not found'}</p>
        <button onClick={() => navigate('/pathways')} className="text-blue-600 font-bold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Pathways
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      {/* HEADER SECTION */}
      <div className="bg-[#2B3B94] text-white pt-16 pb-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm font-bold mb-8">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-widest mb-4">
            <GraduationCap className="w-4 h-4" />
            {branch.courseId?.name || 'Course'}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">{branch.name}</h1>
          <p className="text-blue-100 max-w-2xl text-lg leading-relaxed">
            {branch.description || `Explore detailed information about ${branch.name}, including related careers, required skills, and top colleges.`}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Overview */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Program Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Duration</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{branch.duration || '3-4 Years'}</div>
                </div>
                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/50">
                  <div className="flex items-center gap-3 mb-2">
                    <IndianRupee className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Avg. Fees</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{branch.averageFees || '₹50,000 - ₹2,000,000'}</div>
                </div>
              </div>
              
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Eligibility</h3>
              <p className="text-gray-700 leading-relaxed mb-8">{branch.eligibility || 'Passed 10+2 with required subjects.'}</p>
              
              {branch.requiredSkills && branch.requiredSkills.length > 0 && (
                <>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Core Skills Required
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {branch.requiredSkills.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg border border-gray-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CAREERS SECTION */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Related Careers</h2>
              <p className="text-gray-500 mb-8">Career opportunities you can pursue after completing this branch.</p>
              
              {branch.relatedCareers && branch.relatedCareers.length > 0 ? (
                <div className="space-y-4">
                  {branch.relatedCareers.map(career => (
                    <div key={career._id} className="border border-gray-100 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{career.industry || 'General'}</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{career.name}</h4>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {career.skills?.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-md">{skill}</span>
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100 text-center">
                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Avg. Salary</div>
                        <div className="text-lg font-black text-emerald-700">{career.salaryRange || '₹4L - ₹15L'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
                  <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No specific careers mapped yet. This branch opens up diverse opportunities.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (Colleges) */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-[#1C64F2] to-blue-700 rounded-3xl p-8 text-white shadow-lg">
              <Building className="w-8 h-8 text-blue-200 mb-4" />
              <h3 className="text-xl font-black mb-2">Find Colleges</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">Discover top colleges and universities offering {branch.name}.</p>
              <button onClick={() => navigate('/colleges')} className="w-full bg-white text-blue-700 hover:bg-gray-50 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                View Colleges <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BranchDetail;
