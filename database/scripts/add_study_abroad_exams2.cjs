const fs = require('fs');
let content = fs.readFileSync('src/data/exams.ts', 'utf8');

const newExams = `,
  {
    "id": "gre",
    "name": "GRE",
    "fullName": "Graduate Record Examinations",
    "conductingBody": "ETS (Educational Testing Service)",
    "purpose": "Admissions to MS, PhD, and business programs globally",
    "category": "Study Abroad & Language Proficiency",
    "level": "PG"
  },
  {
    "id": "toefl",
    "name": "TOEFL",
    "fullName": "Test of English as a Foreign Language",
    "conductingBody": "ETS",
    "purpose": "English proficiency test for study, work, and immigration",
    "category": "Study Abroad & Language Proficiency",
    "level": "PG"
  },
  {
    "id": "ielts",
    "name": "IELTS",
    "fullName": "International English Language Testing System",
    "conductingBody": "IDP / British Council",
    "purpose": "English proficiency for study, work, and immigration",
    "category": "Study Abroad & Language Proficiency",
    "level": "PG"
  },
  {
    "id": "pte",
    "name": "PTE Academic",
    "fullName": "Pearson Test of English Academic",
    "conductingBody": "Pearson",
    "purpose": "English proficiency for study abroad and immigration",
    "category": "Study Abroad & Language Proficiency",
    "level": "PG"
  },
  {
    "id": "gmat",
    "name": "GMAT",
    "fullName": "Graduate Management Admission Test",
    "conductingBody": "GMAC",
    "purpose": "Admission to MBA and management programs globally",
    "category": "Study Abroad & Language Proficiency",
    "level": "PG"
  }
];
`;

content = content.replace(/\];\s*$/, newExams);
fs.writeFileSync('src/data/exams.ts', content);
