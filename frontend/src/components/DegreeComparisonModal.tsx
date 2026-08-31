import React from 'react';
import { X } from 'lucide-react';
import { StructuredDegree } from '../types';

interface DegreeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  degrees: StructuredDegree[];
}

export default function DegreeComparisonModal({ isOpen, onClose, degrees }: DegreeComparisonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#2d1b69] to-[#5136a8] text-white">
          <div>
            <h2 className="text-2xl font-black">Compare Degrees</h2>
            <p className="text-purple-200 text-sm mt-1 font-medium">Side-by-side comparison of your selected degrees</p>
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
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 h-24 flex items-center">Duration & Level</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[120px] flex items-center">Eligibility</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex items-center">Admission Routes</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[120px] flex items-center">Core Subjects</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex items-center">Career Options</div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex items-center">Higher Studies</div>
            </div>

            {/* Degree Columns */}
            {degrees.map((degree, idx) => (
               <div key={degree._id} className="col-span-1 flex flex-col gap-4">
                  
                  {/* Header Card */}
                  <div className={`p-6 rounded-2xl border-2 shadow-sm h-28 flex flex-col justify-center ${
                     idx === 0 ? 'bg-purple-50 border-purple-200' :
                     idx === 1 ? 'bg-orange-50 border-orange-200' :
                     'bg-blue-50 border-blue-200'
                  }`}>
                     <h3 className="text-xl font-black text-gray-900 leading-tight line-clamp-2">{degree.name}</h3>
                     <p className="text-xs font-bold text-gray-500 uppercase mt-2">{degree.category}</p>
                  </div>

                  {/* Duration & Level */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 h-24 flex flex-col justify-center gap-1">
                     <span className="font-bold text-gray-900">{degree.duration}</span>
                     <span className="text-sm text-gray-500">{degree.level}</span>
                  </div>

                  {/* Eligibility */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[120px] flex flex-col justify-center">
                     <p className="text-sm text-gray-800 font-medium mb-2">{degree.eligibility?.qualification || 'N/A'}</p>
                     {degree.eligibility?.details && (
                        <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">{degree.eligibility.details}</p>
                     )}
                  </div>

                  {/* Admission Routes */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex items-center">
                     <div className="flex flex-wrap gap-2">
                        {degree.admissionRoutes && degree.admissionRoutes.length > 0 ? degree.admissionRoutes.map(route => (
                           <span key={route} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-200 rounded-md">{route}</span>
                        )) : <span className="text-sm text-gray-500">N/A</span>}
                     </div>
                  </div>

                  {/* Core Subjects */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[120px] flex items-center">
                     <div className="flex flex-wrap gap-2">
                        {degree.subjects && degree.subjects.length > 0 ? degree.subjects.map(sub => (
                           <span key={sub} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md">{sub}</span>
                        )) : <span className="text-sm text-gray-500">N/A</span>}
                     </div>
                  </div>

                  {/* Career Options */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex items-center">
                     <div className="flex flex-wrap gap-2">
                        {degree.careers && degree.careers.length > 0 ? degree.careers.map(career => (
                           <span key={career} className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold rounded-md">{career}</span>
                        )) : <span className="text-sm text-gray-500">N/A</span>}
                     </div>
                  </div>
                  
                  {/* Higher Studies */}
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[100px] flex items-center">
                     <div className="flex flex-wrap gap-2">
                        {degree.higherStudies && degree.higherStudies.length > 0 ? degree.higherStudies.map(study => (
                           <span key={study} className="px-2 py-1 bg-orange-50 text-orange-700 border border-orange-100 text-xs font-bold rounded-md">{study}</span>
                        )) : <span className="text-sm text-gray-500">N/A</span>}
                     </div>
                  </div>

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
