import React, { useState, useEffect, useRef } from 'react';
import { BadgeCheck, Download, Fingerprint, Map, BrainCircuit, Activity, BookOpen, ShieldCheck, QrCode } from 'lucide-react';
import api from '../../api/axios';

export default function CareerPassport() {
  const [passport, setPassport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPassport = async () => {
      try {
        const response = await api.get('/api/passport');
        if (response.data.success) {
          setPassport(response.data.passport);
        }
      } catch (err) {
        setError('Failed to load Career Passport.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPassport();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !passport) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">{error || 'Passport data not available.'}</div>
    );
  }

  const { profile, verifiedSkills, activeTarget, stabilityScore } = passport;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans min-h-screen bg-slate-100/50 print:bg-white print:p-0 print:m-0">
      
      {/* Non-Printable Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 print:hidden">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white">
            <BadgeCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Career Passport</h1>
            <p className="text-slate-500 font-medium text-sm">Your unified, verified academic identity and roadmap.</p>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-sm"
        >
          <Download className="w-4 h-4" /> Save / Print PDF
        </button>
      </div>

      {/* Printable Passport Container */}
      <div ref={printRef} className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-900 print:shadow-none print:border-none print:rounded-none">
        
        {/* Passport Header */}
        <div className="bg-slate-900 text-white p-8 pb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
            <Fingerprint className="w-64 h-64" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 relative z-10 items-center md:items-start">
            <img src={profile.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl bg-slate-800" />
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-black tracking-tight mb-2 uppercase">{profile.name}</h2>
              <div className="inline-block bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 px-4 py-1.5 rounded-full font-bold tracking-widest text-sm mb-4">
                ID: {passport.passportId}
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Email / Contact</span>
                  <span className="font-semibold">{profile.email}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Issued Date</span>
                  <span className="font-semibold">{new Date(passport.issuedAt).toLocaleDateString('en-GB')}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block bg-white p-2 rounded-xl">
              <QrCode className="w-20 h-20 text-slate-900" />
            </div>
          </div>
        </div>

        {/* Passport Body */}
        <div className="p-8 bg-amber-50/30 relative">
          
          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <BadgeCheck className="w-96 h-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            
            {/* Left Column: Target & Stability */}
            <div className="space-y-8">
              <section>
                <h3 className="flex items-center gap-2 text-lg font-black text-slate-900 border-b-2 border-slate-200 pb-2 mb-4">
                  <Map className="w-5 h-5 text-indigo-600" /> Active Vector
                </h3>
                {activeTarget ? (
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Target Career</p>
                    <p className="text-xl font-black text-indigo-600 mb-4">{activeTarget.careerName}</p>
                    
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Current Phase</p>
                        <p className="font-bold text-slate-900">{activeTarget.currentPhase}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Roadmap Prog.</p>
                        <p className="font-bold text-slate-900">{activeTarget.completedSteps} / {activeTarget.totalSteps}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-sm">No active GPS route set.</p>
                )}
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-black text-slate-900 border-b-2 border-slate-200 pb-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" /> AI Clearance
                </h3>
                {stabilityScore ? (
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                    <div className="shrink-0 text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center text-xl font-black text-emerald-600">
                        {stabilityScore.score}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Stability Rating</p>
                      <p className={`text-xs font-bold uppercase px-2 py-1 inline-block rounded-md ${
                        stabilityScore.confidence === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {stabilityScore.confidence} Confidence
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-sm">Clearance analysis pending.</p>
                )}
              </section>
            </div>

            {/* Right Column: Verified Skills */}
            <div className="space-y-8">
              <section>
                <h3 className="flex items-center gap-2 text-lg font-black text-slate-900 border-b-2 border-slate-200 pb-2 mb-4">
                  <BrainCircuit className="w-5 h-5 text-purple-600" /> Verified Competencies
                </h3>
                {verifiedSkills && verifiedSkills.length > 0 ? (
                  <div className="space-y-3">
                    {verifiedSkills.map((skill: any, idx: number) => (
                      <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-slate-900">{skill.skillName}</p>
                          <p className="text-xs font-semibold text-slate-500">{skill.category} • {skill.level}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase text-slate-400">Strength</p>
                          <p className="font-black text-purple-600">{skill.strengthScore}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-sm">No verified skills recorded in the database yet.</p>
                )}
              </section>
            </div>

          </div>
        </div>
        
        {/* Passport Footer */}
        <div className="bg-slate-100 p-4 text-center border-t border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            OFFICIAL U-THINK CAREER PASSPORT • DIGITALLY VERIFIED
          </p>
        </div>
      </div>
    </div>
  );
}
