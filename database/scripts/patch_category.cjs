const fs = require('fs');
let content = fs.readFileSync('src/components/ExamsDirectory.tsx', 'utf8');

const target = `{ title: 'Design & Architecture (PG)', filter: (e: any) => e.category === 'Design & Architecture (PG)' },`;
const replacement = `{ title: 'Design & Architecture (PG)', filter: (e: any) => e.category === 'Design & Architecture (PG)' },
                { title: 'Study Abroad (MS, MBA) & Language Proficiency', filter: (e: any) => e.category === 'Study Abroad & Language Proficiency' },`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/ExamsDirectory.tsx', content);
