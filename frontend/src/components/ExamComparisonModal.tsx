import React from 'react';
import { X, Check, XCircle } from 'lucide-react';
import { StructuredExam } from '../types';

interface ExamComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  exams: StructuredExam[];
}

export default function ExamComparisonModal({ isOpen, onClose, exams }: ExamComparisonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#1c2968] to-[#2B3B94] text-white">
          <div>
            <h2 className="text-2xl font-black">Compare Exams</h2>
            <p className="text-blue-200 text-sm mt-1 font-medium">Side-by-side comparison of your selected exams</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-gray-50/50 p-8">
          <div className="grid grid-cols-4 gap-4">
            {/* Row Headers */}
            <div className="col-span-1 flex flex-col gap-4 font-bold text-gray-500 text-sm uppercase tracking-wider">
               <div className="h-28"></div> {/* Spacer for header */}
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 h-24 flex items-center">Level & Type</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 h-24 flex items-center">Conducting Body</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[120px] flex items-center">Eligibility</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 h-24 flex items-center">Exam Mode</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex items-center">Subjects</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex items-center">Important Dates</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex items-center">Accepted For</div>
            </div>

            {/* Exam Columns */}
            {exams.map((exam, idx) => (
               <div key={exam._id} className="col-span-1 flex flex-col gap-4">
                  
                  {/* Header Card */}
                  <div className={`p-6 rounded-2xl border-2 shadow-sm h-28 flex flex-col justify-center ${
                     idx === 0 ? 'bg-blue-50 border-blue-200' :
                     idx === 1 ? 'bg-purple-50 border-purple-200' :
                     'bg-emerald-50 border-emerald-200'
                  }`}>
                     <h3 className="text-xl font-black text-gray-900 leading-tight">{exam.name}</h3>
                     <p className="text-xs font-bold text-gray-500 uppercase mt-2">{exam.category}</p>
                  </div>

                  {/* Level */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 h-24 flex flex-col justify-center gap-1">
                     <span className="font-bold text-gray-900">{exam.level}</span>
                     <span className="text-sm text-gray-500">{exam.type}</span>
                  </div>

                  {/* Conducting Body */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 h-24 flex items-center text-sm font-semibold text-gray-800">
                     {exam.conducting_body || 'N/A'}
                  </div>

                  {/* Eligibility */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[120px] flex flex-col justify-center">
                     <p className="text-sm text-gray-800 font-medium mb-2">{exam.eligibility?.minimum_qualification || 'N/A'}</p>
                     {exam.eligibility?.age_requirement && (
                        <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">{exam.eligibility.age_requirement}</p>
                     )}
                  </div>

                  {/* Exam Mode */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 h-24 flex items-center text-sm font-semibold text-gray-800">
                     {exam.exam_mode?.join(', ') || 'N/A'}
                  </div>

                  {/* Subjects */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex items-center">
                     <div className="flex flex-wrap gap-2">
                        {exam.subjects && exam.subjects.length > 0 ? exam.subjects.map(sub => (
                           <span key={sub} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-200 rounded-md">{sub}</span>
                        )) : <span className="text-sm text-gray-500">N/A</span>}
                     </div>
                  </div>

                  {/* Dates */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex flex-col justify-center gap-2">
                     <div className="text-xs">
                        <span className="font-bold text-gray-500 uppercase">App Start:</span> <span className="font-semibold text-gray-900">{exam.importantDates?.application_start ? new Date(exam.importantDates.application_start).toLocaleDateString() : 'TBA'}</span>
                     </div>
                     <div className="text-xs">
                        <span className="font-bold text-gray-500 uppercase">Exam:</span> <span className="font-semibold text-[#2B3B94]">{exam.importantDates?.exam_date ? new Date(exam.importantDates.exam_date).toLocaleDateString() : 'TBA'}</span>
                     </div>
                  </div>

                  {/* Accepted For */}
                     {exam.description || 'N/A'}

               </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white flex justify-end">
           <button onClick={onClose} className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors">
              Close Comparison
           </button>
        </div>
      </div>
    </div>
  );
}
