const fs = require('fs');
const file = './src/components/ExamsDirectory.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<span key=\{s\} className="px-2 py-1 bg-slate-950 text-slate-300 text-\[10px\] font-bold rounded-md border border-slate-700">\{s\}<\/span>/g;
const replacement = `<button key={s} onClick={() => { setSearchQuery(s); document.getElementById('specializations-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="px-2 py-1 bg-slate-950 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-[10px] font-bold rounded-md border border-slate-700 cursor-pointer">{s}</button>`;

content = content.replace(regex, replacement);

// Add id="specializations-grid" to the grid wrapper
content = content.replace(
  /\{\/\* Grid of Specializations \*\/\}\n\s*<div className="flex-1 w-full">/,
  `{/* Grid of Specializations */}
          <div className="flex-1 w-full scroll-mt-24" id="specializations-grid">`
);

fs.writeFileSync(file, content);
console.log('Fixed buttons');
