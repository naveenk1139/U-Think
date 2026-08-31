import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Calendar, Building, Info, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { StructuredExam } from '../types';

export default function ExamDetail() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState<StructuredExam | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchExam();
  }, [examId]);

  const fetchExam = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/exams/info/${examId}`);
      if (res.ok) {
        const data = await res.json();
        setExam(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-[#2B3B94]"></div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Exam Not Found</h2>
        <button onClick={() => navigate('/exams')} className="mt-4 text-blue-600 font-bold hover:underline">Return to Exams Directory</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1c2968] to-[#2B3B94] text-white pt-10 pb-24 px-6 md:px-12 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-[1200px] mx-auto relative z-10">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-200 hover:text-white font-semibold transition-colors mb-8">
               <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 bg-blue-500/30 border border-blue-400/30 rounded-lg text-blue-100 text-xs font-black uppercase tracking-widest">{exam.level} Level</span>
                     <span className="px-3 py-1 bg-emerald-500/30 border border-emerald-400/30 rounded-lg text-emerald-100 text-xs font-black uppercase tracking-widest">{exam.category}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{exam.name}</h1>
                  <p className="text-xl text-blue-100/90 max-w-2xl font-medium">{exam.type} conducted by {exam.conductingBody}</p>
               </div>
               <div className="flex gap-3 shrink-0">
                  <button onClick={() => setSaved(!saved)} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${saved ? 'bg-emerald-500 text-white border border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`}>
                     <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} /> {saved ? 'Saved' : 'Save Exam'}
                  </button>
                  <button className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-white text-[#2B3B94] hover:bg-gray-100 transition-colors shadow-xl">
                     <Calendar className="w-5 h-5" /> Set Reminder
                  </button>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 -mt-12 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Main Details) */}
            <div className="lg:col-span-2 space-y-8">
               
               {/* Quick Info Grid */}
               <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                     <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Target</div>
                     <div className="font-bold text-gray-900">{exam.ugPg}</div>
                  </div>
                  <div>
                     <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mode</div>
                     <div className="font-bold text-gray-900">{exam.examMode || 'N/A'}</div>
                  </div>
                  <div>
                     <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status</div>
                     <div className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> {exam.status}</div>
                  </div>
                  <div>
                     <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Website</div>
                     <a href={`https://${exam.officialWebsite}`} target="_blank" rel="noreferrer" className="font-bold text-blue-600 hover:underline line-clamp-1">{exam.officialWebsite}</a>
                  </div>
               </div>

               {/* Eligibility */}
               <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                  <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                     <div className="bg-blue-50 text-blue-600 p-2 rounded-lg"><Info className="w-5 h-5" /></div> Eligibility Criteria
                  </h3>
                  <div className="space-y-6">
                     <div>
                        <h4 className="font-bold text-gray-900 mb-2">Qualification Required</h4>
                        <p className="text-gray-600 leading-relaxed">{exam.eligibility?.qualification || 'Not specified'}</p>
                     </div>
                     {exam.eligibility?.ageCriteria && (
                        <div>
                           <h4 className="font-bold text-gray-900 mb-2">Age Criteria</h4>
                           <p className="text-gray-600 leading-relaxed">{exam.eligibility.ageCriteria}</p>
                        </div>
                     )}
                     {exam.eligibility?.details && (
                        <div>
                           <h4 className="font-bold text-gray-900 mb-2">Additional Details</h4>
                           <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">{exam.eligibility.details}</p>
                        </div>
                     )}
                  </div>
               </div>

               {/* Subjects & Application */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                     <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <div className="bg-purple-50 text-purple-600 p-2 rounded-lg"><FileText className="w-5 h-5" /></div> Subjects
                     </h3>
                     <div className="flex flex-wrap gap-2">
                        {exam.subjects && exam.subjects.length > 0 ? exam.subjects.map(sub => (
                           <span key={sub} className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-800 font-bold rounded-lg text-sm">{sub}</span>
                        )) : <p className="text-gray-500">Not specified</p>}
                     </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                     <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <div className="bg-orange-50 text-orange-600 p-2 rounded-lg"><Building className="w-5 h-5" /></div> Accepted For
                     </h3>
                     <p className="text-gray-700 font-medium leading-relaxed">{exam.acceptedFor || 'Not specified'}</p>
                  </div>
               </div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">
               
               {/* Important Dates */}
               <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                  <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                     <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg"><Calendar className="w-5 h-5" /></div> Important Dates
                  </h3>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200">
                     <div className="relative flex items-start gap-4">
                        <div className="w-5 h-5 rounded-full bg-[#2B3B94] border-4 border-white shrink-0 mt-0.5 shadow-sm z-10"></div>
                        <div>
                           <div className="font-bold text-gray-900">Application Window</div>
                           <div className="text-sm text-gray-500 mt-1">{exam.importantDates?.applicationStart || 'TBA'} - {exam.importantDates?.applicationEnd || 'TBA'}</div>
                        </div>
                     </div>
                     <div className="relative flex items-start gap-4">
                        <div className="w-5 h-5 rounded-full bg-orange-500 border-4 border-white shrink-0 mt-0.5 shadow-sm z-10"></div>
                        <div>
                           <div className="font-bold text-gray-900">Exam Date</div>
                           <div className="text-sm text-[#2B3B94] font-bold mt-1 bg-blue-50 px-3 py-1.5 rounded-lg inline-block">{exam.importantDates?.examDate || 'TBA'}</div>
                        </div>
                     </div>
                     <div className="relative flex items-start gap-4">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-white shrink-0 mt-0.5 shadow-sm z-10"></div>
                        <div>
                           <div className="font-bold text-gray-900">Result Date</div>
                           <div className="text-sm text-gray-500 mt-1">{exam.importantDates?.resultDate || 'TBA'}</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Explore Related */}
               <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                  <h3 className="font-black text-gray-900 mb-6">Explore Further</h3>
                  <button onClick={() => navigate(`/colleges?category=${exam.category}`)} className="w-full bg-[#2B3B94] hover:bg-blue-800 text-white py-3 rounded-xl font-bold transition-colors mb-3">
                     View Participating Colleges
                  </button>
                  <button onClick={() => window.open(`https://${exam.officialWebsite}`, '_blank')} className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-3 rounded-xl font-bold transition-colors">
                     Visit Official Website
                  </button>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
}
