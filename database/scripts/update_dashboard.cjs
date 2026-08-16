const fs = require('fs');

const path = 'src/components/StudentDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "import { useTrackedExams } from '../hooks/useTrackedExams';",
  "import { useTrackedExams } from '../hooks/useTrackedExams';\nimport { useSavedPathways } from '../hooks/useSavedPathways';\nimport { useReminders } from '../hooks/useReminders';\nimport { EditProfileModal } from './EditProfileModal';\nimport { useState, useEffect } from 'react';"
);

content = content.replace(
  "const { trackedExams } = useTrackedExams();",
  "const { trackedExams } = useTrackedExams();\n  const { savedPathways } = useSavedPathways();\n  const { reminders } = useReminders();\n  const [isEditModalOpen, setIsEditModalOpen] = useState(false);\n  const [userTarget, setUserTarget] = useState(localStorage.getItem('user_target') || 'JEE Advanced');\n\n  useEffect(() => {\n    const handleProfileUpdate = () => {\n      setUserTarget(localStorage.getItem('user_target') || 'JEE Advanced');\n    };\n    window.addEventListener('profile_updated', handleProfileUpdate);\n    return () => window.removeEventListener('profile_updated', handleProfileUpdate);\n  }, []);"
);

content = content.replace(
  "<Target className=\"w-3.5 h-3.5\" /> Target: JEE Advanced",
  "<Target className=\"w-3.5 h-3.5\" /> Target: {userTarget}"
);

content = content.replace(
  "<button className=\"flex-1 md:flex-none bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors\">",
  "<button onClick={() => setIsEditModalOpen(true)} className=\"flex-1 md:flex-none bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer\">"
);

// update saved pathways block
const oldPathwaysBlock = `{[
                { title: 'B.Tech in Artificial Intelligence', type: 'Degree', institute: 'Top IITs/NITs', match: '92%' },
                { title: 'BCA + MCA Integrated', type: 'Pathway', institute: 'Private Universities', match: '88%' }
              ].map((item, idx) => (`;

const newPathwaysBlock = `{savedPathways.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-500">No pathways saved yet.</p>
                  <p className="text-xs text-slate-400 mt-1">Explore Streams and Degrees to save your favorites.</p>
                </div>
              ) : savedPathways.map((item, idx) => (`;

content = content.replace(oldPathwaysBlock, newPathwaysBlock);


// Update reminders block
const oldRemindersBlock = `<div className="pl-4 border-l-2 border-rose-500 relative">
                <div className="absolute w-2 h-2 bg-rose-500 rounded-full -left-[5px] top-1"></div>
                <p className="text-xs font-bold text-rose-600 mb-0.5">Tomorrow, 11:59 PM</p>
                <h4 className="text-sm font-semibold text-slate-900">JEE Main Session 1 Registration Ends</h4>
              </div>
              <div className="pl-4 border-l-2 border-amber-500 relative">
                <div className="absolute w-2 h-2 bg-amber-500 rounded-full -left-[5px] top-1"></div>
                <p className="text-xs font-bold text-amber-600 mb-0.5">In 3 Days</p>
                <h4 className="text-sm font-semibold text-slate-900">NTSE Scholarship Form Deadline</h4>
              </div>
              <div className="pl-4 border-l-2 border-slate-200 relative">
                <div className="absolute w-2 h-2 bg-slate-300 rounded-full -left-[5px] top-1"></div>
                <p className="text-xs font-bold text-slate-400 mb-0.5">Next Week</p>
                <h4 className="text-sm font-semibold text-slate-600">Counseling Session with Dr. Sharma</h4>
              </div>`;

const newRemindersBlock = `{reminders.length === 0 ? (
                <div className="text-center p-4">
                  <p className="text-sm font-bold text-slate-500">No active reminders.</p>
                </div>
              ) : reminders.map(examId => {
                const exam = EXAMS_DB.find(e => e.id === examId);
                if (!exam) return null;
                return (
                  <div key={exam.id} className="pl-4 border-l-2 border-amber-500 relative cursor-pointer hover:bg-slate-50 p-2 -ml-2 rounded-r-lg" onClick={() => {
                      window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { detail: { tab: 'exams', search: exam.name } }));
                    }}>
                    <div className="absolute w-2 h-2 bg-amber-500 rounded-full -left-[5px] top-3"></div>
                    <p className="text-xs font-bold text-amber-600 mb-0.5">Upcoming</p>
                    <h4 className="text-sm font-semibold text-slate-900">{exam.name} Deadline</h4>
                  </div>
                );
              })}`;

content = content.replace(oldRemindersBlock, newRemindersBlock);

content = content.replace("</div>\n    </div>\n  );\n}", "</div>\n      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />\n    </div>\n  );\n}");

fs.writeFileSync(path, content);
