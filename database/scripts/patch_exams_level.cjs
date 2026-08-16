const fs = require('fs');
let content = fs.readFileSync('src/data/exams.ts', 'utf8');

content = content.replace(/"category": "Study Abroad & Language Proficiency",\s*"level": "PG"/g, '"category": "Study Abroad & Language Proficiency",\n    "level": "STUDY_ABROAD"');

fs.writeFileSync('src/data/exams.ts', content);
