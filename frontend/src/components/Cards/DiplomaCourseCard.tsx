import React from 'react';
import { Clock, GraduationCap, Settings, Image as ImageIcon, Bookmark, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DiplomaCourseCardProps {
  course: any;
  onSave?: (courseId: string) => void;
  onCompare?: (courseId: string) => void;
}

export const DiplomaCourseCard: React.FC<DiplomaCourseCardProps> = ({ course, onSave, onCompare }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Image Placeholder */}
      <div className="h-40 bg-gray-100 relative group overflow-hidden">
        {/* Placeholder for real image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          <ImageIcon className="w-12 h-12 opacity-50" />
        </div>
        <button 
          onClick={() => onSave && onSave(course._id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 shadow-sm z-10 transition-colors"
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[15px] font-black text-gray-900 mb-4 leading-snug line-clamp-2">
          {course.name}
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {course.duration || '3 Years'}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
            <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
            <span className="line-clamp-1">{course.eligibility || 'Class 10th Pass'}</span>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
            <Settings className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500">Engineering & Technology</span>
          </div>
          {course.higherStudyArea && (
            <div className="col-span-2 flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
               <div className="w-3.5 h-3.5 flex items-center justify-center bg-gray-100 rounded text-[8px]">⌨️</div>
               <span className="line-clamp-1">{course.higherStudyArea}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2 mt-auto border-t border-gray-100">
          <button 
          onClick={() => navigate(`/pathways/after-10th/diploma/engineering-technology/course/${course.slug}`)}
          className="flex-1 border border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
        >
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </button>
          <button 
            onClick={() => onCompare && onCompare(course._id)}
            className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-blue-600 text-[11px] font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" /> Compare
          </button>
        </div>
      </div>
    </div>
  );
};
