const fs = require('fs');
let content = fs.readFileSync('src/components/ExamsDirectory.tsx', 'utf8');
content = content.replace("import { useReminders } from '../hooks/useTrackedExams';", "import { useReminders } from '../hooks/useReminders';");
fs.writeFileSync('src/components/ExamsDirectory.tsx', content);
