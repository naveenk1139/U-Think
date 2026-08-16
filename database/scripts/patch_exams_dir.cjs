const fs = require('fs');
let content = fs.readFileSync('src/components/ExamsDirectory.tsx', 'utf8');

// Insert useTrackedExams import
if (!content.includes('useTrackedExams')) {
  content = content.replace("import { Search, BookOpen", "import { useTrackedExams } from '../hooks/useTrackedExams';\nimport { Search, BookOpen");
}

// Inside component, call hook
if (!content.includes('const { trackedExams, toggleTrackedExam, isTracked } = useTrackedExams()')) {
  content = content.replace("const [categorySearchQuery, setCategorySearchQuery] = useState('');", "const [categorySearchQuery, setCategorySearchQuery] = useState('');\n  const { trackedExams, toggleTrackedExam, isTracked } = useTrackedExams();");
}

// Add Bookmark icon import
if (!content.includes('Bookmark,')) {
  content = content.replace("Award, Filter, ArrowRight, X }", "Award, Filter, ArrowRight, X, Bookmark }");
}

// Add bookmark button to the modal header
const modalHeaderTarget = `              <button
                onClick={() => setSelectedExamForModal(null)}`;

const modalHeaderReplacement = `              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTrackedExam(selectedExamForModal.id)}
                  className={\`p-2.5 rounded-xl transition-all border flex items-center gap-2 text-xs font-black \${
                    isTracked(selectedExamForModal.id) 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }\`}
                >
                  <Bookmark className={\`w-4 h-4 \${isTracked(selectedExamForModal.id) ? 'fill-indigo-500 text-indigo-500' : ''}\`} />
                  <span className="hidden sm:inline">{isTracked(selectedExamForModal.id) ? 'Saved' : 'Save Exam'}</span>
                </button>
                <button
                  onClick={() => setSelectedExamForModal(null)}`;

content = content.replace(modalHeaderTarget, modalHeaderReplacement);

// Close the div we added around the buttons
const modalHeaderCloseTarget = `                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>`;

const modalHeaderCloseReplacement = `                <X className="w-5 h-5 text-slate-400" />
              </button>
              </div>
            </div>`;

content = content.replace(modalHeaderCloseTarget, modalHeaderCloseReplacement);


fs.writeFileSync('src/components/ExamsDirectory.tsx', content);
