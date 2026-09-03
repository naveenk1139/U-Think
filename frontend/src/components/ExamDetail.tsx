import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, ExternalLink, ShieldCheck, Clock, AlertCircle, FileText, CheckCircle2, Bookmark, CheckSquare, GraduationCap } from 'lucide-react';
import { StructuredExam, ExamYear } from '../types';
import { getExamBySlug, saveExam, unsaveExam, getSavedExams, trackExam } from '../api/examApi';

export default function ExamDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [exam, setExam] = useState<StructuredExam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      try {
        if (!slug) return;
        const data = await getExamBySlug(slug);
        setExam(data);

        // check if saved
        try {
          const saved = await getSavedExams();
          setIsSaved(saved.some(e => e._id === data._id));
        } catch (e) {
          // ignore
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch exam details.');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [slug]);

  const toggleSave = async () => {
    if (!exam) return;
    try {
      if (isSaved) {
        await unsaveExam(exam._id);
        setIsSaved(false);
      } else {
        await saveExam(exam._id);
        setIsSaved(true);
      }
    } catch (e) {
      alert("Please login to save exams.");
    }
  };

  const trackThisExam = async () => {
     if(!exam) return;
     try {
       await trackExam({
          examId: exam._id,
          examName: exam.short_name || exam.exam_name,
          examDate: exam.years && exam.years.length > 0 ? exam.years[0].exam_start : '',
          status: 'upcoming'
       });
       alert("Added to your tracking list successfully!");
     } catch (e) {
       alert("Please login to track exams.");
     }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#2B3B94]"></div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
         <div>
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Exam Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The requested exam could not be located.'}</p>
            <button onClick={() => navigate('/exams')} className="bg-[#2B3B94] text-white px-6 py-2 rounded-lg font-bold">Go Back to Directory</button>
         </div>
      </div>
    );
  }

  const latestYear = exam.years && exam.years.length > 0 ? exam.years[0] : null;

  // Real-time Status Calculation
  let currentStatusText = 'Status Not Available';
  let currentStatusColor = 'bg-gray-100 text-gray-700';

  if (latestYear) {
      const now = new Date().getTime();
      const regStart = latestYear.registration_start ? new Date(latestYear.registration_start).getTime() : 0;
      const regEnd = latestYear.registration_end ? new Date(latestYear.registration_end).getTime() : 0;
      const examStart = latestYear.exam_start ? new Date(latestYear.exam_start).getTime() : 0;
      const resultDate = latestYear.result_date ? new Date(latestYear.result_date).getTime() : 0;

      if (latestYear.status === 'EXPECTED' || latestYear.status === 'TENTATIVE') {
         currentStatusText = 'Dates Tentative / Expected';
         currentStatusColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      } else if (regStart && regEnd && now >= regStart && now <= regEnd) {
         currentStatusText = 'Registration Open';
         currentStatusColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
      } else if (regEnd && now > regEnd && examStart && now < examStart) {
         currentStatusText = 'Registration Closed, Exam Upcoming';
         currentStatusColor = 'bg-blue-100 text-blue-800 border-blue-200';
      } else if (examStart && now > examStart && (!resultDate || now < resultDate)) {
         currentStatusText = 'Exam Concluded, Awaiting Results';
         currentStatusColor = 'bg-purple-100 text-purple-800 border-purple-200';
      } else if (resultDate && now >= resultDate) {
         currentStatusText = 'Results Declared';
         currentStatusColor = 'bg-green-100 text-green-800 border-green-200';
      } else if (latestYear.status === 'NOT_ANNOUNCED') {
         currentStatusText = 'Not Announced Yet';
         currentStatusColor = 'bg-gray-100 text-gray-700 border-gray-200';
      }
  }

  const calculateDaysLeft = (dateString?: string) => {
     if(!dateString) return null;
     const target = new Date(dateString).getTime();
     const now = new Date().getTime();
     if(target < now) return null;
     return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  };

  const daysToExam = calculateDaysLeft(latestYear?.exam_start);
  const daysToRegEnd = calculateDaysLeft(latestYear?.registration_end);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#1c2968] text-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto relative">
          <button onClick={() => navigate('/exams')} className="absolute -top-6 left-0 text-blue-300 hover:text-white flex items-center gap-1 text-sm font-bold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Exams
          </button>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
             <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-4xl font-black text-[#2B3B94] shadow-lg shrink-0">
               {exam.exam_name.charAt(0)}
             </div>
             <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${currentStatusColor}`}>
                    {currentStatusText}
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-blue-100 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/20">
                    {exam.ownership}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-2">{exam.exam_name}</h1>
                <p className="text-xl text-blue-200 font-semibold">{exam.short_name}</p>
             </div>
             
             <div className="flex flex-col gap-3 w-full md:w-auto">
                <button onClick={toggleSave} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border ${isSaved ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} /> {isSaved ? 'Saved to Profile' : 'Save Exam'}
                </button>
                <button onClick={trackThisExam} className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#2B3B94] rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
                  <CheckSquare className="w-5 h-5" /> Track Progress
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Overview */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
               <FileText className="w-5 h-5 text-[#2B3B94]" /> About {exam.short_name || exam.exam_name}
             </h2>
             <p className="text-gray-600 leading-relaxed mb-6">{exam.description}</p>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Level</span>
                  <span className="font-semibold text-gray-900">{exam.education_level.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Streams</span>
                  <span className="font-semibold text-gray-900">{exam.streams.join(', ')}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Frequency</span>
                  <span className="font-semibold text-gray-900">{exam.exam_frequency}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Mode</span>
                  <span className="font-semibold text-gray-900">{exam.exam_mode.join(', ')}</span>
                </div>
             </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Eligibility Criteria
             </h2>
             <div className="prose max-w-none text-gray-600">
               <p className="whitespace-pre-wrap">{exam.eligibility}</p>
             </div>
             
             <div className="grid grid-cols-2 gap-4 mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
               {exam.age_min !== undefined && (
                 <div><span className="text-gray-500 text-sm">Min Age:</span> <span className="font-semibold text-gray-900">{exam.age_min} years</span></div>
               )}
               {exam.age_max !== undefined && (
                 <div><span className="text-gray-500 text-sm">Max Age:</span> <span className="font-semibold text-gray-900">{exam.age_max} years</span></div>
               )}
               {exam.attempt_limit !== undefined && (
                 <div><span className="text-gray-500 text-sm">Attempt Limit:</span> <span className="font-semibold text-gray-900">{exam.attempt_limit === 0 ? 'No Limit' : exam.attempt_limit}</span></div>
               )}
             </div>
          </div>
          
          {/* Target Courses */}
          {exam.target_courses && exam.target_courses.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <GraduationCap className="w-5 h-5 text-purple-600" /> Target Courses
               </h2>
               <div className="flex flex-wrap gap-2">
                 {exam.target_courses.map(c => (
                   <span key={c} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-semibold border border-purple-100">{c}</span>
                 ))}
               </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          
          {/* Key Dates (Next/Current Year) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
             {daysToExam !== null && (
               <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 rounded-bl-xl font-black text-sm shadow-sm">
                 {daysToExam} Days Left
               </div>
             )}
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
               <Calendar className="w-5 h-5 text-[#2B3B94]" /> 
               Key Dates {latestYear ? `(${latestYear.year})` : ''}
             </h2>

             {latestYear ? (
                <div className="space-y-5 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {latestYear.registration_start && (
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-blue-500 bg-white group-[.is-active]:bg-blue-500 text-blue-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="9" height="9"><path d="M3.788 6.788.75 3.75l1.061-1.061 1.977 1.977 4.394-4.394 1.061 1.061z" /></svg>
                      </div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
                        <div className="font-bold text-gray-800 text-sm mb-1">Registration Starts</div>
                        <div className="text-gray-500 text-xs font-semibold">{new Date(latestYear.registration_start).toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                      </div>
                    </div>
                  )}

                  {latestYear.registration_end && (
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-300 bg-white text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Clock className="w-3 h-3" />
                      </div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
                        <div className="font-bold text-gray-800 text-sm mb-1">Registration Ends</div>
                        <div className="text-gray-500 text-xs font-semibold">{new Date(latestYear.registration_end).toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                        {daysToRegEnd !== null && <div className="text-red-500 text-[10px] font-bold uppercase mt-1">Closes in {daysToRegEnd} days</div>}
                      </div>
                    </div>
                  )}

                  {latestYear.exam_start && (
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-300 bg-white text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Clock className="w-3 h-3" />
                      </div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-[#2B3B94]/20 bg-blue-50/50 shadow-sm">
                        <div className="font-bold text-[#2B3B94] text-sm mb-1">Exam Date</div>
                        <div className="text-gray-700 text-xs font-bold">{new Date(latestYear.exam_start).toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                      </div>
                    </div>
                  )}
                </div>
             ) : (
                <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-xl">
                   No official dates announced for the upcoming session yet.
                </div>
             )}
          </div>

          {/* Useful Links */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-4">Official Links</h2>
             <div className="space-y-3">
               {exam.official_website && (
                 <a href={exam.official_website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group">
                    <span className="font-semibold text-gray-700 group-hover:text-blue-700">Official Website</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                 </a>
               )}
               {exam.official_application_url && (
                 <a href={exam.official_application_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group">
                    <span className="font-semibold text-gray-700 group-hover:text-blue-700">Application Portal</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                 </a>
               )}
               {!exam.official_website && !exam.official_application_url && (
                  <span className="text-gray-500 text-sm">Links currently unavailable.</span>
               )}
             </div>
          </div>

          {/* Data Provenance (U-THINK Integrity) */}
          <div className="bg-[#2B3B94]/5 rounded-2xl p-6 border border-[#2B3B94]/10">
             <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                   <h3 className="font-bold text-gray-900 mb-1">Verified Data Provenance</h3>
                   <p className="text-xs text-gray-600 mb-3">
                     U-THINK guarantees that this data was sourced directly from the official notification. No fake dates or assumptions.
                   </p>
                   <div className="space-y-1 text-[11px] font-mono text-gray-500">
                     <div className="flex justify-between"><span>Source:</span> <span className="font-bold text-gray-700">{exam.source_name || 'Official Body'}</span></div>
                     <div className="flex justify-between"><span>Status:</span> <span className="font-bold text-emerald-600">{exam.verification_status}</span></div>
                     {exam.last_verified_at && (
                       <div className="flex justify-between"><span>Verified:</span> <span className="font-bold text-gray-700">{new Date(exam.last_verified_at).toLocaleDateString()}</span></div>
                     )}
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
