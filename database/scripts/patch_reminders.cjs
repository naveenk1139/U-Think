const fs = require('fs');
let content = fs.readFileSync('src/components/ExamsDirectory.tsx', 'utf8');

if (!content.includes('useReminders')) {
  content = content.replace("import { useTrackedExams }", "import { useTrackedExams } from '../hooks/useTrackedExams';\nimport { useReminders }");
}

if (!content.includes('Bell')) {
  content = content.replace("Bookmark } from 'lucide-react'", "Bookmark, Bell } from 'lucide-react'");
}

if (!content.includes('hasReminder')) {
  content = content.replace("const { trackedExams, toggleTrackedExam, isTracked } = useTrackedExams();", "const { trackedExams, toggleTrackedExam, isTracked } = useTrackedExams();\n  const { hasReminder, toggleReminder } = useReminders();");
}

const toggleButtonReplacement = `              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleReminder(selectedExamForModal.id, selectedExamForModal.name)}
                  className={\`p-2.5 rounded-xl transition-all border flex items-center gap-2 text-xs font-black \${
                    hasReminder(selectedExamForModal.id) 
                      ? 'bg-amber-50 border-amber-200 text-amber-600 shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }\`}
                >
                  <Bell className={\`w-4 h-4 \${hasReminder(selectedExamForModal.id) ? 'fill-amber-500 text-amber-500' : ''}\`} />
                  <span className="hidden sm:inline">{hasReminder(selectedExamForModal.id) ? 'Reminder On' : 'Set Reminder'}</span>
                </button>
                <button
                  onClick={() => toggleTrackedExam(selectedExamForModal.id)}`;

content = content.replace(`              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTrackedExam(selectedExamForModal.id)}`, toggleButtonReplacement);

fs.writeFileSync('src/components/ExamsDirectory.tsx', content);
