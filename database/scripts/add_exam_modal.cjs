const fs = require('fs');
let content = fs.readFileSync('src/components/ExamsDirectory.tsx', 'utf8');

const modal = `
      {/* Exam details modal */}
      {selectedExamForModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div className="space-y-1.5 pr-4">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {selectedExamForModal.category || selectedExamForModal.type}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Level: {selectedExamForModal.level}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-tight">
                  {selectedExamForModal.name}
                </h3>
                {selectedExamForModal.fullName && (
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                    {selectedExamForModal.fullName}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedExamForModal(null)}
                className="p-2 hover:bg-slate-200/60 rounded-xl transition-colors shrink-0"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto bg-white flex-1 custom-scrollbar">
              <div className="space-y-6">
                
                {selectedExamForModal.purpose && (
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      PURPOSE & SCOPE
                    </h4>
                    <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {selectedExamForModal.purpose}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedExamForModal.conductingBody && (
                    <div className="p-4 bg-white border border-slate-200 rounded-2xl">
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        CONDUCTING BODY
                      </h4>
                      <p className="text-sm font-bold text-slate-800">
                        {selectedExamForModal.conductingBody}
                      </p>
                    </div>
                  )}
                  {selectedExamForModal.eligibility && (
                    <div className="p-4 bg-white border border-slate-200 rounded-2xl">
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        ELIGIBILITY
                      </h4>
                      <p className="text-sm font-bold text-slate-800">
                        {selectedExamForModal.eligibility}
                      </p>
                    </div>
                  )}
                  {selectedExamForModal.difficulty && (
                    <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col justify-center">
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        DIFFICULTY
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-bold text-slate-800">
                          {selectedExamForModal.difficulty} / 5
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/80 flex items-center justify-end gap-3 rounded-b-[2rem]">
              <button
                onClick={() => setSelectedExamForModal(null)}
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-200/50 rounded-xl text-xs font-black transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace('{/* Course Pathways details modal */}', modal + '\n      {/* Course Pathways details modal */}');
fs.writeFileSync('src/components/ExamsDirectory.tsx', content);
