const fs = require('fs');
const file = './src/components/ExamsDirectory.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add state
content = content.replace(
  /const \[specCategoryFilter, setSpecCategoryFilter\] = useState<string>\('all'\);/,
  `const [specCategoryFilter, setSpecCategoryFilter] = useState<string>('all');
  const [examLevelFilter, setExamLevelFilter] = useState<'ALL' | 'UG' | 'PG'>('ALL');`
);

// Add the filter bar in activeTab === 'exams'
const examsUI = `{activeTab === 'exams' && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 p-4 md:px-6 rounded-2xl border border-slate-300 shadow-sm mb-6">
          <div className="space-y-0.5">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              📝 Exam Level Filter
            </h3>
            <p className="text-xs font-medium text-slate-600">
              Filter entrance exams by Undergraduate (UG) or Postgraduate (PG) level.
            </p>
          </div>
          <div className="flex bg-slate-200/50 p-1 rounded-xl">
            {(['ALL', 'UG', 'PG'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setExamLevelFilter(mode)}
                className={\`px-4 py-2 rounded-lg text-xs font-bold transition-all \${
                  examLevelFilter === mode ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }\`}
              >
                {mode === 'ALL' ? 'All Exams' : mode + ' Exams'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Exams Tab Grid */}
      {activeTab === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {EXAMS_DB.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
            .filter(e => examLevelFilter === 'ALL' || (e as any).level === examLevelFilter)
            .map(exam => (`;

content = content.replace(
  /{activeTab === 'exams' && \(\s*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">\s*{EXAMS_DB.filter\(e => e.name.toLowerCase\(\).includes\(searchQuery.toLowerCase\(\)\) \|\| e.fullName.toLowerCase\(\).includes\(searchQuery.toLowerCase\(\)\)\).map\(exam => \(/,
  examsUI
);

// We also need to update the "No Matches Found" condition for exams
content = content.replace(
  /activeTab === 'exams' && EXAMS_DB.filter\(e => e.name.toLowerCase\(\).includes\(searchQuery.toLowerCase\(\)\) \|\| e.fullName.toLowerCase\(\).includes\(searchQuery.toLowerCase\(\)\)\).length === 0/,
  `activeTab === 'exams' && EXAMS_DB.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.fullName.toLowerCase().includes(searchQuery.toLowerCase())).filter(e => examLevelFilter === 'ALL' || (e as any).level === examLevelFilter).length === 0`
);

fs.writeFileSync(file, content);
console.log('Added exam level filter UI');
