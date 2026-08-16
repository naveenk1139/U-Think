const fs = require('fs');
const file = './src/components/ExamsDirectory.tsx';
let content = fs.readFileSync(file, 'utf8');

const medicalInfoUI = `
          {/* Medical Levels Info Block */}
          {specCategoryFilter === 'med' && (
            <div className="w-full bg-slate-900 text-slate-100 p-6 md:p-8 rounded-[2rem] mb-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="text-9xl">⚕️</span>
              </div>
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                    <span className="text-red-500">🏥</span> MEDICAL EDUCATION HIERARCHY
                  </h3>
                  <p className="text-slate-400 font-medium mt-2 text-sm md:text-base max-w-2xl">
                    A comprehensive structural breakdown of medical qualifications from foundation to super-specialty degrees.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Level 1</h4>
                    <h5 className="text-lg font-black text-white mb-2">Undergraduate (UG) Degrees</h5>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-emerald-400 mt-0.5">•</span> Allopathy — Modern Medicine (MBBS)
                      </li>
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-emerald-400 mt-0.5">•</span> AYUSH — Traditional Medicine Systems (BAMS, BHMS, etc.)
                      </li>
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-emerald-400 mt-0.5">•</span> Veterinary Sciences
                      </li>
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-emerald-400 mt-0.5">•</span> Allied Health / Paramedical UG Degrees
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Level 2</h4>
                    <h5 className="text-lg font-black text-white mb-2">Postgraduate (PG) Degrees</h5>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-blue-400 mt-0.5">•</span> MD — Doctor of Medicine (Non-Surgical | 3 Years)
                      </li>
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-blue-400 mt-0.5">•</span> MS — Master of Surgery (Surgical | 3 Years)
                      </li>
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-blue-400 mt-0.5">•</span> MDS — Master of Dental Surgery (3 Years)
                      </li>
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-blue-400 mt-0.5">•</span> DNB — Diplomate of National Board (3 Years)
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Level 3 (Highest)</h4>
                    <h5 className="text-lg font-black text-white mb-2">Super Specialty Degrees</h5>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-purple-400 mt-0.5">•</span> DM — Doctorate of Medicine (Non-Surgical Super Specialty | 3 Years)
                      </li>
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-purple-400 mt-0.5">•</span> MCh — Master of Chirurgiae (Surgical Super Specialty | 3 Years)
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Level 4</h4>
                    <h5 className="text-lg font-black text-white mb-2">Research & Doctorate</h5>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-amber-400 mt-0.5">•</span> POSTGRADUATE DIPLOMAS (After MBBS | 2 Years)
                      </li>
                      <li className="flex items-start gap-2 text-sm font-medium text-slate-300">
                        <span className="text-amber-400 mt-0.5">•</span> PhD / Fellowship Programs
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
`;

content = content.replace(
  /{activeTab === 'specializations' && \(\s*<div className="flex flex-col lg:flex-row gap-8 animate-fade-in w-full items-start">\s*\{\/\* Vertical Degree Sidebar \/ Filters for Specialization Hub \*\/\}/,
  `{activeTab === 'specializations' && (
        <div className="flex flex-col lg:flex-row gap-8 animate-fade-in w-full items-start">
          {/* Vertical Degree Sidebar / Filters for Specialization Hub */}`
);

// We need to inject this right after `<div className="flex-1 w-full">`
content = content.replace(
  /\{\/\* Grid of Specializations \*\/\}\s*<div className="flex-1 w-full">/,
  `{/* Grid of Specializations */}
          <div className="flex-1 w-full">
${medicalInfoUI}`
);

fs.writeFileSync(file, content);
console.log('Added medical hierarchy levels UI');
