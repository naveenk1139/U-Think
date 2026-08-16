const fs = require('fs');
let content = fs.readFileSync('src/data/exams.ts', 'utf8');

content = content.replace(/\\n/g, '\n');

fs.writeFileSync('src/data/exams.ts', content);
