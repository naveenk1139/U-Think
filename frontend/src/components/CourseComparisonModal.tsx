import React from 'react';
import { CourseData } from '../api/pathwayApi';
import { X, Check } from 'lucide-react';

interface CourseComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: CourseData[];
}

const CourseComparisonModal: React.FC<CourseComparisonModalProps> = ({ isOpen, onClose, courses }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#2B3B94] p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-black">Compare Courses</h2>
            <p className="text-blue-200 text-sm mt-1">Comparing {courses.length} selected courses</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1">
          {courses.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No courses selected for comparison.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className="p-4 border-b-2 border-gray-100 font-bold text-gray-500 uppercase tracking-widest text-xs w-48">Feature</th>
                    {courses.map(course => (
                      <th key={course._id} className="p-4 border-b-2 border-blue-500 bg-blue-50/30 font-black text-[#2B3B94] text-lg w-1/3">
                        {course.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  
                  <tr>
                    <td className="p-4 font-bold text-gray-700 bg-gray-50/50">Level</td>
                    {courses.map(course => (
                      <td key={course._id} className="p-4 font-medium text-gray-900">{course.courseLevel || 'Undergraduate'}</td>
                    ))}
                  </tr>
                  
                  <tr>
                    <td className="p-4 font-bold text-gray-700 bg-gray-50/50">Duration</td>
                    {courses.map(course => (
                      <td key={course._id} className="p-4 font-medium text-gray-900">{course.duration || '3-4 Years'}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-gray-700 bg-gray-50/50">Entrance Required</td>
                    {courses.map(course => (
                      <td key={course._id} className="p-4 font-medium text-gray-900">
                        {course.entranceRequired === false ? (
                          <span className="text-emerald-600 flex items-center gap-1"><Check className="w-4 h-4"/> Optional</span>
                        ) : (
                          <span className="text-amber-600 font-bold">Likely Required</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-gray-700 bg-gray-50/50">Available Branches</td>
                    {courses.map(course => (
                      <td key={course._id} className="p-4 font-medium text-gray-900">
                        {course.branches?.length ? (
                          <ul className="list-disc pl-4 space-y-1">
                            {course.branches.slice(0, 5).map(b => (
                              <li key={b._id}>{b.name}</li>
                            ))}
                            {course.branches.length > 5 && <li className="text-blue-500 font-bold">+{course.branches.length - 5} more</li>}
                          </ul>
                        ) : 'General / Fixed'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-gray-700 bg-gray-50/50">Subjects / Focus</td>
                    {courses.map(course => (
                      <td key={course._id} className="p-4 font-medium text-gray-600 leading-relaxed">
                        {course.description || 'Specialised curriculum focusing on core concepts and practical application in the chosen branch.'}
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseComparisonModal;
