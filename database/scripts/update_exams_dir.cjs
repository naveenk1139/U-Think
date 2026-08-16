const fs = require('fs');
const content = fs.readFileSync('src/components/ExamsDirectory.tsx', 'utf8');
const lines = content.split('\n');

const newLines = [];
let i = 0;
let inExamsDb = false;

while (i < lines.length) {
    if (lines[i].startsWith('const EXAMS_DB = [')) {
        inExamsDb = true;
        newLines.push("import { EXAMS_DB } from '../data/exams';");
    }

    if (inExamsDb) {
        if (lines[i].startsWith('];')) {
            inExamsDb = false;
        }
        i++;
        continue;
    }
    
    newLines.push(lines[i]);
    i++;
}

fs.writeFileSync('src/components/ExamsDirectory.tsx', newLines.join('\n'));
