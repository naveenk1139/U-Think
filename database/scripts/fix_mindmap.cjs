const fs = require('fs');
const file = './src/components/ExamsDirectory.tsx';
let content = fs.readFileSync(file, 'utf8');

// Undo hiding left column
content = content.replace(
  /\{\/\* LEFT COLUMN: SEARCH DIRECTORY \*\/\}\n\s*\{degreeViewMode === 'list' && \(\n\s*<div className="lg:col-span-4/,
  `{/* LEFT COLUMN: SEARCH DIRECTORY */}
        <div className="lg:col-span-4`
);
content = content.replace(
  /<\/div>\n\s*\}\)\n\s*\{\/\* RIGHT COLUMN:/,
  `</div>\n\n        {/* RIGHT COLUMN:`
);
content = content.replace(
  /<div className=\{\`\$\{degreeViewMode === 'list' \? 'lg:col-span-8' : 'lg:col-span-12'\} flex flex-col gap-6\`\} id="domain-profile-panel">/,
  `<div className="lg:col-span-8 flex flex-col gap-6" id="domain-profile-panel">`
);

// We had this in the original file: 
// </div>
//         </div>
//         )}

const oldStr1 = `</div>
        </div>
        )}

        {/* RIGHT COLUMN: DOMAIN DETAIL OVERVIEW & PATHWAYS */}
        <div className={\`\${degreeViewMode === 'list' ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col gap-6\`} id="domain-profile-panel">`;
const newStr1 = `</div>
        </div>

        {/* RIGHT COLUMN: DOMAIN DETAIL OVERVIEW & PATHWAYS */}
        <div className="lg:col-span-8 flex flex-col gap-6" id="domain-profile-panel">`;

content = content.replace(oldStr1, newStr1);

fs.writeFileSync(file, content);
console.log('Restored left column in Mind Map mode');
