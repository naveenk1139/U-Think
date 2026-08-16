const fs = require('fs');
let content = fs.readFileSync('src/components/StudentDashboard.tsx', 'utf8');

// Insert useTrackedExams import
if (!content.includes('useTrackedExams')) {
  content = content.replace("import { useAuth }", "import { useTrackedExams } from '../hooks/useTrackedExams';\nimport { EXAMS_DB } from '../data/exams';\nimport { useAuth }");
}

// Inside component, call hook
if (!content.includes('const { trackedExams } = useTrackedExams()')) {
  content = content.replace("const { currentUser } = useAuth();", "const { currentUser } = useAuth();\n  const { trackedExams } = useTrackedExams();");
}

// Add Tracked Exams section
const trackedExamsSection = `
          {/* My Tracked Exams */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-indigo-500" />
                My Tracked Exams
              </h2>
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { detail: { tab: 'exams' } }));
                }}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
              >
                Browse Exams
              </button>
            </div>
            
            <div className="space-y-4">
              {trackedExams.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-500">No exams tracked yet.</p>
                  <p className="text-xs text-slate-400 mt-1">Bookmark exams from the Entrance Hub to see them here.</p>
                </div>
              ) : (
                trackedExams.map(examId => {
                  const exam = EXAMS_DB.find(e => e.id === examId);
                  if (!exam) return null;
                  return (
                    <div key={exam.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => {
                      window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { detail: { tab: 'exams', search: exam.name } }));
                    }}>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">
                            {exam.category || exam.type}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900">{exam.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{exam.fullName}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    </div>
                  );
                })
              )}
            </div>
          </div>
`;

content = content.replace("          {/* Actionable Career Roadmap", trackedExamsSection + "\n          {/* Actionable Career Roadmap");

fs.writeFileSync('src/components/StudentDashboard.tsx', content);
