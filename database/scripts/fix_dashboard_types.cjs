const fs = require('fs');
let content = fs.readFileSync('src/components/StudentDashboard.tsx', 'utf8');

content = content.replace(/{exam.category \|\| exam.type}/g, '{(exam as any).category || (exam as any).type}');
content = content.replace(/{exam.fullName}/g, '{(exam as any).fullName}');

fs.writeFileSync('src/components/StudentDashboard.tsx', content);
