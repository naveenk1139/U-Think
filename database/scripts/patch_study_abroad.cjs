const fs = require('fs');
let content = fs.readFileSync('src/components/ExamsDirectory.tsx', 'utf8');

const replacement = `              'RESEARCH': [
                { title: 'Research, NET & PhD Entrance', filter: (e: any) => e.category === 'Research, NET & PhD Entrance' },
              ],
              'STUDY_ABROAD': [
                { title: 'Study Abroad (MS, MBA) & Language Proficiency', filter: (e: any) => e.category === 'Study Abroad & Language Proficiency' },
              ],
              'GOVT': [`;

content = content.replace(/              'RESEARCH': \[\s*\{ title: 'Research, NET & PhD Entrance', filter: \(e: any\) => e.category === 'Research, NET & PhD Entrance' \},\s*\],\s*'GOVT': \[/, replacement);

content = content.replace("                { title: 'Study Abroad (MS, MBA) & Language Proficiency', filter: (e: any) => e.category === 'Study Abroad & Language Proficiency' },\n", "");

fs.writeFileSync('src/components/ExamsDirectory.tsx', content);
