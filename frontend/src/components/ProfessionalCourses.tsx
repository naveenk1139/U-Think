import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Star, ChevronRight, BookOpen, Clock, Wallet } from 'lucide-react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface CourseDetail {
  _id: string;
  title: string;
  slug: string;
  duration?: string;
  fees?: string;
  keySkills?: string[];
  careerOpportunities?: string[];
}

interface CourseCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

const ProfessionalCourses: React.FC = () => {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<CourseCategory | null>(null);
  const [courses, setCourses] = useState<CourseDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/courses/categories');
        setCategories(response.data);
        if (response.data.length > 0) {
          setActiveCategory(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!activeCategory) return;
    
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/courses/categories/${activeCategory._id}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [activeCategory]);

  return (
    <div className="w-full bg-gray-50 min-h-screen font-sans">
      <div className="max-w-[1600px] mx-auto w-full">
        {/* HERO SECTION */}
        <div className="bg-[#2B3B94] rounded-[24px] p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between mb-8 shadow-sm">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          
          <div className="text-white max-w-2xl z-10 w-full">
            <h1 className="text-4xl md:text-[42px] font-bold mb-4 leading-[1.1] tracking-tight">
              Professional & Short-Term Courses
            </h1>
            <p className="text-blue-100/90 mb-8 max-w-xl text-sm leading-relaxed pr-8">
              Explore high-demand, skill-based courses in Makeup, Beauty, and Digital Marketing. Jumpstart your career with specialized training and certifications.
            </p>
          </div>
          
          <div className="hidden md:flex absolute right-12 z-0">
             <Sparkles className="w-32 h-32 text-yellow-400/20" />
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="mb-8 flex space-x-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory?._id === cat._id
                  ? 'bg-[#1C64F2] text-white shadow-[0_2px_10px_rgba(28,100,242,0.3)]'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1C64F2]"></div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900">{activeCategory?.name}</h2>
              <p className="text-gray-500 mt-2">{activeCategory?.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {courses.map(course => (
                <div key={course._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> TOP RATED
                    </div>
                  </div>
                  
                  <h3 className="font-extrabold text-lg text-gray-900 mb-3 leading-tight">{course.title}</h3>
                  
                  <div className="flex flex-col gap-2 mb-6">
                    {course.duration && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <Clock className="w-4 h-4 text-gray-400" /> Duration: {course.duration}
                      </div>
                    )}
                    {course.fees && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <Wallet className="w-4 h-4 text-gray-400" /> Fees: {course.fees}
                      </div>
                    )}
                  </div>
                  
                  {course.keySkills && course.keySkills.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Key Skills Taught</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.keySkills.map((skill, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {course.careerOpportunities && course.careerOpportunities.length > 0 && (
                    <div className="mb-6 flex-1">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Career Opportunities</h4>
                      <ul className="space-y-1">
                        {course.careerOpportunities.slice(0, 3).map((opp, i) => (
                          <li key={i} className="text-xs text-gray-600 font-medium flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-blue-500"></div> {opp}
                          </li>
                        ))}
                        {course.careerOpportunities.length > 3 && (
                          <li className="text-xs text-blue-500 font-semibold pl-2.5 pt-1">
                            +{course.careerOpportunities.length - 3} more...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  <button onClick={() => navigate('/mentorship')} className="mt-auto w-full bg-[#1C64F2] hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                    Connect to Mentor <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalCourses;
