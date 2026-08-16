const fs = require('fs');
let content = fs.readFileSync('src/data/exams.ts', 'utf8');

const newExams = `,
  {
    "id": "gre-subject",
    "name": "GRE Subject Tests",
    "fullName": "Graduate Record Examinations - Subject Tests",
    "conductingBody": "ETS",
    "purpose": "Specific subject proficiency for specialized PhD programs globally",
    "category": "Study Abroad & Language Proficiency",
    "level": "STUDY_ABROAD"
  },
  {
    "id": "ea",
    "name": "Executive Assessment (EA)",
    "fullName": "Executive Assessment",
    "conductingBody": "GMAC",
    "purpose": "Admission to Executive MBA programs globally",
    "category": "Study Abroad & Language Proficiency",
    "level": "STUDY_ABROAD"
  },
  {
    "id": "gate-ae",
    "name": "GATE Aerospace Engineering (AE)",
    "fullName": "Graduate Aptitude Test in Engineering - Aerospace",
    "conductingBody": "IITs / IISc",
    "purpose": "Admission to MS/M.Tech/PhD in Aerospace Engineering in India",
    "category": "Engineering \u2014 National Level",
    "level": "PG"
  },
  {
    "id": "gmat-focus",
    "name": "GMAT Focus Edition",
    "fullName": "Graduate Management Admission Test - Focus Edition",
    "conductingBody": "GMAC",
    "purpose": "Admission to modern MBA and business MS programs globally",
    "category": "Study Abroad & Language Proficiency",
    "level": "STUDY_ABROAD"
  }
];
`;

content = content.replace(/\];\s*$/, newExams);
fs.writeFileSync('src/data/exams.ts', content);
