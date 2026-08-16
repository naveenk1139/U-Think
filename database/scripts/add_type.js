const fs = require('fs');
const content = fs.readFileSync('src/data/exams.ts', 'utf8');

const newContent = `export interface ExamInfo {
  id: string;
  name: string;
  fullName?: string;
  conductingBody?: string;
  purpose?: string;
  category: string;
  level: string;
  type?: string;
  difficulty?: number;
  eligibility?: string;
}

` + content.replace('export const EXAMS_DB = [', 'export const EXAMS_DB: ExamInfo[] = [');

fs.writeFileSync('src/data/exams.ts', newContent);
