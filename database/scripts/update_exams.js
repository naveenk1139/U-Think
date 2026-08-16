const fs = require('fs');
const file = './src/components/ExamsDirectory.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const EXAMS_DB = \[([\s\S]*?)\];/;
const match = content.match(regex);
if (match) {
  let examsStr = match[1];
  // add level: 'UG' to existing exams
  examsStr = examsStr.replace(/eligibility: '([^']+)'/g, "eligibility: '$1', level: 'UG'");
  
  // Now add some PG exams
  examsStr += `,
  { id: '13', name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', type: 'Engineering', difficulty: 5, eligibility: 'Bachelor\\'s Degree', level: 'PG' },
  { id: '14', name: 'CAT', fullName: 'Common Admission Test for IIMs', type: 'Management', difficulty: 5, eligibility: 'Bachelor\\'s Degree', level: 'PG' },
  { id: '15', name: 'NEET PG', fullName: 'National Eligibility cum Entrance Test for Post Graduation', type: 'Medical', difficulty: 5, eligibility: 'MBBS/BDS', level: 'PG' },
  { id: '16', name: 'UPSC CSE', fullName: 'Civil Services Examination', type: 'General', difficulty: 5, eligibility: 'Bachelor\\'s Degree', level: 'PG' },
  { id: '17', name: 'INI CET', fullName: 'Institute of National Importance Combined Entrance Test', type: 'Medical', difficulty: 5, eligibility: 'MBBS', level: 'PG' },
  { id: '18', name: 'CLAT PG', fullName: 'Common Law Admission Test for LLM', type: 'Law', difficulty: 4, eligibility: 'LLB', level: 'PG' },
  { id: '19', name: 'CUET (PG)', fullName: 'Common University Entrance Test for Post Graduation', type: 'General', difficulty: 3, eligibility: 'Bachelor\\'s Degree', level: 'PG' },
  { id: '20', name: 'MAT / XAT / CMAT', fullName: 'Management Aptitude Tests', type: 'Management', difficulty: 4, eligibility: 'Bachelor\\'s Degree', level: 'PG' }`;
  
  content = content.replace(regex, `const EXAMS_DB = [\n${examsStr}\n];`);
  
  fs.writeFileSync(file, content);
  console.log('Updated EXAMS_DB successfully.');
}
