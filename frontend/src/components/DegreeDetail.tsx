import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Briefcase, ChevronRight, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { StructuredDegree } from '../types';

export default function DegreeDetail() {
  const { degreeId } = useParams();
  const navigate = useNavigate();
  const [degree, setDegree] = useState<StructuredDegree | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDegree();
  }, [degreeId]);

  const fetchDegree = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/degrees/${degreeId}`);
      if (res.ok) {
        const data = await res.json();
        setDegree(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!degree) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Degree Not Found</h2>
        <button onClick={() => navigate('/degrees')} className="mt-4 text-purple-600 font-bold hover:underline">Return to Degrees Directory</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d1b69] to-[#5136a8] text-white pt-10 pb-24 px-6 md:px-12 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-[1200px] mx-auto relative z-10">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-purple-200 hover:text-white font-semibold transition-colors mb-8">
               <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
               <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 bg-purple-500/30 border border-purple-400/30 rounded-lg text-purple-100 text-xs font-black uppercase tracking-widest">{degree.level} Level</span>
                     <span className="px-3 py-1 bg-orange-500/30 border border-orange-400/30 rounded-lg text-orange-100 text-xs font-black uppercase tracking-widest">{degree.category}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{degree.name}</h1>
                  <p className="text-xl text-purple-100/90 font-medium leading-relaxed">{degree.overview}</p>
               </div>
               <div className="flex gap-3 shrink-0">
                  <button onClick={() => navigate(`/colleges?category=${degree.category}`)} className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-white text-purple-900 hover:bg-gray-100 transition-colors shadow-xl">
                     <GraduationCap className="w-5 h-5" /> Explore Colleges
                  </button>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 -mt-12 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Main Details) */}
            <div className="lg:col-span-2 space-y-8">
               
               {/* Quick Info */}
               <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2 text-gray-500">
                        <Clock className="w-5 h-5" /> <span className="font-bold uppercase tracking-wider text-xs">Duration</span>
                     </div>
                     <div className="text-xl font-black text-gray-900">{degree.duration}</div>
                  </div>
                  <div className="w-px bg-gray-100 hidden md:block"></div>
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2 text-gray-500">
                        <BookOpen className="w-5 h-5" /> <span className="font-bold uppercase tracking-wider text-xs">Admission</span>
                     </div>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {degree.admissionRoutes && degree.admissionRoutes.length > 0 ? degree.admissionRoutes.map(route => (
                           <span key={route} className="px-2 py-1 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-md">{route}</span>
                        )) : <span className="font-bold text-gray-900">Merit-based</span>}
                     </div>
                  </div>
               </div>

               {/* Eligibility */}
               <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                  <h3 className="text-xl font-black text-gray-900 mb-6">Eligibility Criteria</h3>
                  <div className="space-y-4">
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-bold">1</div>
                        <div>
                           <h4 className="font-bold text-gray-900 mb-1">Qualification Required</h4>
                           <p className="text-gray-600">{degree.eligibility?.qualification || 'Not specified'}</p>
                        </div>
                     </div>
                     {degree.eligibility?.details && (
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-bold">2</div>
                           <div>
                              <h4 className="font-bold text-gray-900 mb-1">Additional Requirements</h4>
                              <p className="text-gray-600">{degree.eligibility.details}</p>
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               {/* Subjects */}
               <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                  <h3 className="text-xl font-black text-gray-900 mb-6">Core Subjects & Specializations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <h4 className="font-bold text-gray-700 mb-4 border-b border-gray-100 pb-2">Major Subjects</h4>
                        <ul className="space-y-3">
                           {degree.subjects && degree.subjects.length > 0 ? degree.subjects.map((sub, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> {sub}
                              </li>
                           )) : <li className="text-gray-500">Not specified</li>}
                        </ul>
                     </div>
                     <div>
                        <h4 className="font-bold text-gray-700 mb-4 border-b border-gray-100 pb-2">Available Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                           {degree.specializations && degree.specializations.length > 0 ? degree.specializations.map((spec, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-lg">{spec}</span>
                           )) : <span className="text-gray-500">General degree (No specific specializations)</span>}
                        </div>
                     </div>
                  </div>
               </div>

            </div>

            {/* Right Column (Career Path Sidebar) */}
            <div className="space-y-8">
               
               {/* Career Options */}
               <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                  <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                     <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg"><Briefcase className="w-5 h-5" /></div> Career Options
                  </h3>
                  <div className="flex flex-col gap-3">
                     {degree.careers && degree.careers.length > 0 ? degree.careers.map((career, idx) => (
                        <button key={idx} onClick={() => navigate(`/jobs?role=${encodeURIComponent(career)}`)} className="text-left w-full p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors flex justify-between items-center group">
                           <span className="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{career}</span>
                           <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
                        </button>
                     )) : <p className="text-gray-500">Not specified</p>}
                  </div>
               </div>

               {/* Higher Studies */}
               <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                  <h3 className="text-xl font-black text-gray-900 mb-6">Higher Studies Flow</h3>
                  <div className="space-y-4">
                     <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl flex items-center justify-center font-black text-purple-900 text-center">
                        {degree.name}
                     </div>
                     <div className="flex justify-center text-gray-300">
                        <ArrowLeft className="w-6 h-6 -rotate-90" />
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        {degree.higherStudies && degree.higherStudies.length > 0 ? degree.higherStudies.map((study, idx) => (
                           <div key={idx} className="bg-white border border-gray-200 p-3 rounded-lg flex items-center justify-center font-bold text-sm text-gray-800 text-center shadow-sm">
                              {study}
                           </div>
                        )) : <div className="col-span-2 text-center text-gray-500 text-sm">Not specified</div>}
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
}
