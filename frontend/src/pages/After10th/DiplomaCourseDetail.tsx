import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseBySlug, getRelatedCourses, CourseDetailData } from '../../api/courseApi';
import { 
  ArrowLeft, Clock, GraduationCap, Briefcase, Bookmark, Settings, 
  CheckCircle, ArrowRight, BookOpen, AlertCircle, BookmarkCheck
} from 'lucide-react';
import { DiplomaCourseCard } from '../../components/Cards/DiplomaCourseCard';

export default function DiplomaCourseDetail() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetailData | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<CourseDetailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  useEffect(() => {
    if (courseSlug) {
      setLoading(true);
      getCourseBySlug(courseSlug)
        .then(data => {
          setCourse(data);
          // Fetch related courses in the same stream
          if (data.streamId) {
            getRelatedCourses(data.streamId, 4).then(related => {
              // Exclude current course from related
              setRelatedCourses(related.filter(c => c.slug !== data.slug).slice(0, 3));
            });
          }
        })
        .catch(err => {
          console.error(err);
          setError('Course details not found.');
        })
        .finally(() => setLoading(false));
    }
  }, [courseSlug]);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, you would make an API call here to save to the user's profile
  };

  const handleCompare = () => {
    setIsCompared(!isCompared);
    // In a real app, this would add the course to a comparison store
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500 font-bold mb-4">{error || 'Course not found'}</p>
        <button onClick={() => navigate(-1)} className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F9FC] min-h-screen font-sans pb-20">
      {/* Header Section */}
      <div className="bg-[#1e293b] text-white pt-8 pb-20 px-4 sm:px-8 relative overflow-hidden">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto relative z-10 mb-8 flex items-center gap-2 text-[11px] font-bold text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/pathways')} className="hover:text-white transition-colors">Pathways & Streams</button>
          <span>/</span>
          <button onClick={() => navigate('/pathways/after-10th/diploma')} className="hover:text-white transition-colors">Diploma</button>
          <span>/</span>
          <span className="text-gray-200">{course.name}</span>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between gap-8 items-start md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold mb-4 uppercase tracking-widest border border-blue-500/30">
              Diploma Course
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight tracking-tight">
              {course.name}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm font-semibold text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> {course.duration || '3 Years'}
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-orange-400" /> {course.eligibility || 'Class 10th Pass'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleCompare}
              className={`flex-1 md:flex-none border font-bold text-xs py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm ${
                isCompared 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : 'bg-[#2b3b54] border-gray-600 text-white hover:bg-[#334155]'
              }`}
            >
              {isCompared ? <CheckCircle className="w-4 h-4" /> : <Settings className="w-4 h-4" />} 
              {isCompared ? 'Added to Compare' : 'Compare'}
            </button>
            <button 
              onClick={handleSave}
              className={`flex-1 md:flex-none border font-bold text-xs py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm ${
                isSaved 
                  ? 'bg-emerald-600 border-emerald-500 text-white' 
                  : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />} 
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-10 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Details) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
            <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Course Overview
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              {course.description || "Detailed overview for this course is currently not available."}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
            <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" /> Subjects Covered
            </h2>
            {course.subjects && course.subjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.subjects.map((subject, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    {subject}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-200">
                <AlertCircle className="w-5 h-5" /> Information not available / verification required
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
            <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-600" /> Skills & Higher Study
            </h2>
            {course.higherStudyArea && course.higherStudyArea.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {course.higherStudyArea.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-200">
                <AlertCircle className="w-5 h-5" /> Information not available / verification required
              </div>
            )}
          </div>

          {/* Missing Data Sections exactly as requested */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 opacity-75">
            <h2 className="text-lg font-black text-gray-900 mb-4">Practical / Lab Components</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 bg-gray-100 p-4 rounded-xl">
              <AlertCircle className="w-5 h-5" /> Information not available / verification required
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 opacity-75">
            <h2 className="text-lg font-black text-gray-900 mb-4">Admission Process & Entrance</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 bg-gray-100 p-4 rounded-xl">
              <AlertCircle className="w-5 h-5" /> Information not available / verification required
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          <div className="bg-blue-950 rounded-2xl p-6 border border-blue-900 shadow-md">
            <h3 className="text-sm font-black text-white mb-2">Find Colleges</h3>
            <p className="text-xs font-medium text-blue-200 mb-4">Looking for colleges offering {course.name}? Explore our verified directory.</p>
            <button 
              onClick={() => navigate('/colleges')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Search Colleges <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {relatedCourses.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-black text-gray-900 mb-4 pb-3 border-b border-gray-100">Related Courses</h3>
              <div className="space-y-4">
                {relatedCourses.map(related => (
                  <div key={related._id} className="group cursor-pointer" onClick={() => navigate(`/pathways/after-10th/diploma/engineering-technology/course/${related.slug}`)}>
                    <h4 className="text-xs font-black text-gray-900 group-hover:text-blue-600 leading-snug mb-1 transition-colors">{related.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                      <Clock className="w-3 h-3 text-gray-400" /> {related.duration || '3 Years'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
