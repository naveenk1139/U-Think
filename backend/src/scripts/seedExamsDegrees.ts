import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exam from '../models/Exam';
import Degree from '../models/Degree';

dotenv.config();

const exams = [
  // Engineering
  {
    examId: 'ex-jee-main',
    name: 'JEE Main',
    level: 'National',
    educationLevel: ['12TH_SCIENCE'],
    category: 'Engineering',
    type: 'Entrance Exam',
    ugPg: 'UG',
    streams: ['Science'],
    courses: ['B.E', 'B.Tech', 'B.Arch', 'B.Planning'],
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    eligibility: {
      qualification: 'Passed 10+2 with Physics and Mathematics as compulsory subjects.',
      ageCriteria: 'No age limit for candidates who have passed 12th.',
      details: 'Candidates should have secured at least 75% marks in the 12th class.'
    },
    importantDates: {
      applicationStart: 'November 2026',
      applicationEnd: 'December 2026',
      examDate: 'January 2027',
      resultDate: 'February 2027'
    },
    officialWebsite: 'jeemain.nta.nic.in',
    lastUpdated: '19 August 2026',
    conductingBody: 'National Testing Agency (NTA)',
    examMode: 'Online (CBT)',
    applicationProcess: 'Online application via NTA website.',
    acceptedFor: 'NITs, IIITs, CFTIs, and qualifying for JEE Advanced',
    status: 'Active'
  },
  {
    examId: 'ex-kcet',
    name: 'KCET (Karnataka Common Entrance Test)',
    level: 'State',
    educationLevel: ['12TH_SCIENCE'],
    category: 'Engineering',
    type: 'Entrance Exam',
    ugPg: 'UG',
    streams: ['Science'],
    courses: ['B.E', 'B.Tech', 'B.Pharm', 'B.Sc Agriculture'],
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    eligibility: {
      qualification: 'Passed 2nd PUC / 12th standard or equivalent.',
      ageCriteria: 'Minimum 17 years for medical/allied courses.',
      details: 'Must have studied in Karnataka for a minimum of 7 years.'
    },
    importantDates: {
      applicationStart: 'February 2027',
      applicationEnd: 'March 2027',
      examDate: 'April 2027',
      resultDate: 'May 2027'
    },
    officialWebsite: 'cetonline.karnataka.gov.in/kea',
    lastUpdated: '19 August 2026',
    conductingBody: 'Karnataka Examinations Authority (KEA)',
    examMode: 'Offline (OMR)',
    applicationProcess: 'Online application via KEA website.',
    acceptedFor: 'Government seats in Karnataka colleges',
    status: 'Active'
  },
  // Medical
  {
    examId: 'ex-neet',
    name: 'NEET-UG',
    level: 'National',
    educationLevel: ['12TH_SCIENCE'],
    category: 'Medical',
    type: 'Entrance Exam',
    ugPg: 'UG',
    streams: ['Science'],
    courses: ['MBBS', 'BDS', 'BAMS', 'BHMS'],
    subjects: ['Physics', 'Chemistry', 'Biology (Botany & Zoology)'],
    eligibility: {
      qualification: 'Passed 10+2 with PCB and English.',
      ageCriteria: 'Minimum 17 years at the time of admission.',
      details: '50% marks in PCB for General category.'
    },
    importantDates: {
      applicationStart: 'February 2027',
      applicationEnd: 'March 2027',
      examDate: 'May 2027',
      resultDate: 'June 2027'
    },
    officialWebsite: 'neet.nta.nic.in',
    lastUpdated: '19 August 2026',
    conductingBody: 'National Testing Agency (NTA)',
    examMode: 'Offline (Pen and Paper)',
    applicationProcess: 'Online registration.',
    acceptedFor: 'All medical and dental colleges in India',
    status: 'Active'
  },
  // Law
  {
    examId: 'ex-clat',
    name: 'CLAT (Common Law Admission Test)',
    level: 'National',
    educationLevel: ['12TH_ARTS', '12TH_COMMERCE', '12TH_SCIENCE'],
    category: 'Law',
    type: 'Entrance Exam',
    ugPg: 'UG',
    streams: ['Arts', 'Commerce', 'Science'],
    courses: ['BA LLB', 'BBA LLB', 'B.Com LLB'],
    subjects: ['English', 'Current Affairs', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
    eligibility: {
      qualification: '10+2 or equivalent examination.',
      ageCriteria: 'No upper age limit.',
      details: 'Minimum 45% marks.'
    },
    importantDates: {
      applicationStart: 'July 2026',
      applicationEnd: 'November 2026',
      examDate: 'December 2026',
      resultDate: 'December 2026'
    },
    officialWebsite: 'consortiumofnlus.ac.in',
    lastUpdated: '19 August 2026',
    conductingBody: 'Consortium of National Law Universities',
    examMode: 'Offline',
    applicationProcess: 'Online application.',
    acceptedFor: '22 National Law Universities',
    status: 'Active'
  },
  // Design
  {
    examId: 'ex-nid',
    name: 'NID DAT (Design Aptitude Test)',
    level: 'National',
    educationLevel: ['12TH_ARTS', '12TH_COMMERCE', '12TH_SCIENCE'],
    category: 'Design',
    type: 'Entrance Exam',
    ugPg: 'UG',
    streams: ['Arts', 'Commerce', 'Science'],
    courses: ['B.Des'],
    subjects: ['Design Problem Solving', 'Visual Sense', 'Observation & Perception', 'Environmental Awareness'],
    eligibility: {
      qualification: 'Passed or appearing for 10+2.',
      ageCriteria: 'Upper age limit applies (e.g. 20 years).',
      details: 'Any stream.'
    },
    importantDates: {
      applicationStart: 'September 2026',
      applicationEnd: 'November 2026',
      examDate: 'December 2026 (Prelims)',
      resultDate: 'February 2027'
    },
    officialWebsite: 'admissions.nid.edu',
    lastUpdated: '19 August 2026',
    conductingBody: 'National Institute of Design',
    examMode: 'Offline (Paper-based)',
    applicationProcess: 'Online application.',
    acceptedFor: 'NID campuses',
    status: 'Active'
  },
  // Management
  {
    examId: 'ex-cat',
    name: 'CAT (Common Admission Test)',
    level: 'National',
    educationLevel: ['UG', 'DEGREE'],
    category: 'Management',
    type: 'Entrance Exam',
    ugPg: 'PG',
    streams: ['Any Degree'],
    courses: ['MBA', 'PGDM'],
    subjects: ['Verbal Ability', 'Data Interpretation', 'Logical Reasoning', 'Quantitative Ability'],
    eligibility: {
      qualification: 'Bachelor\'s Degree.',
      ageCriteria: 'No age limit.',
      details: 'Minimum 50% marks or equivalent CGPA.'
    },
    importantDates: {
      applicationStart: 'August 2026',
      applicationEnd: 'September 2026',
      examDate: 'November 2026',
      resultDate: 'January 2027'
    },
    officialWebsite: 'iimcat.ac.in',
    lastUpdated: '19 August 2026',
    conductingBody: 'IIMs',
    examMode: 'Online (CBT)',
    applicationProcess: 'Online application.',
    acceptedFor: 'IIMs and top B-Schools',
    status: 'Active'
  }
];

const degrees = [
  // Engineering Degree
  {
    degreeId: 'deg-be-cse',
    name: 'B.E. Computer Science and Engineering',
    level: 'UG',
    category: 'Engineering',
    duration: '4 Years',
    eligibility: {
      qualification: '10+2 with Physics, Mathematics, and Chemistry/Computer Science.',
      details: 'Minimum 45-50% marks depending on the state/college rules.'
    },
    admissionRoutes: ['JEE Main', 'KCET', 'COMEDK UGET', 'Management Quota'],
    subjects: ['Data Structures', 'Operating Systems', 'Algorithms', 'Database Management', 'Computer Networks', 'AI/ML'],
    specializations: ['AI & Machine Learning', 'Cyber Security', 'Data Science', 'Cloud Computing'],
    careers: ['Software Engineer', 'Data Scientist', 'Systems Architect', 'Full Stack Developer'],
    higherStudies: ['M.Tech', 'MS (Abroad)', 'MBA'],
    overview: 'A premier undergraduate engineering program focusing on computing systems, software development, and modern technologies like AI and Data Science.'
  },
  // ITI
  {
    degreeId: 'deg-iti-fitter',
    name: 'ITI Fitter',
    level: 'ITI',
    category: 'Vocational',
    duration: '2 Years',
    eligibility: {
      qualification: 'Passed 10th class.',
      details: 'Minimum passing marks.'
    },
    admissionRoutes: ['State ITI Counselling', 'Direct Admission'],
    subjects: ['Trade Theory', 'Trade Practical', 'Engineering Drawing', 'Workshop Calculation & Science', 'Employability Skills'],
    specializations: ['Industrial Machinery Fitter', 'Pipe Fitter'],
    careers: ['Maintenance Technician', 'Mechanical Fitter', 'Machine Operator'],
    higherStudies: ['Diploma in Mechanical Engineering (Lateral Entry)', 'Apprenticeship (NTC)'],
    overview: 'A highly practical trade course teaching students how to assemble, maintain, and fix mechanical equipment and machinery.'
  },
  // Diploma
  {
    degreeId: 'deg-dip-mech',
    name: 'Diploma in Mechanical Engineering',
    level: 'Diploma',
    category: 'Engineering',
    duration: '3 Years',
    eligibility: {
      qualification: 'Passed 10th class with Science and Mathematics.',
      details: 'Minimum 35% marks.'
    },
    admissionRoutes: ['State Polytechnic Entrance (e.g., TS POLYCET)', 'Direct Merit-based Admission'],
    subjects: ['Thermodynamics', 'Fluid Mechanics', 'Strength of Materials', 'Manufacturing Technology', 'CAD'],
    specializations: ['Automobile', 'Production', 'Mechatronics'],
    careers: ['Junior Engineer', 'Quality Control Inspector', 'Production Supervisor'],
    higherStudies: ['B.E/B.Tech (Lateral Entry directly to 2nd year)'],
    overview: 'A polytechnic program providing applied engineering skills for manufacturing, design, and mechanical systems operations.'
  },
  // Medical
  {
    degreeId: 'deg-mbbs',
    name: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    level: 'UG',
    category: 'Medical',
    duration: '5.5 Years (including internship)',
    eligibility: {
      qualification: '10+2 with PCB (Physics, Chemistry, Biology) and English.',
      details: 'Minimum 50% aggregate in PCB for general category.'
    },
    admissionRoutes: ['NEET-UG Counselling'],
    subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pharmacology', 'Pathology', 'General Medicine', 'Surgery'],
    specializations: ['General Medicine', 'Surgery', 'Pediatrics'],
    careers: ['General Physician', 'Medical Officer', 'Clinical Researcher'],
    higherStudies: ['MD/MS', 'DNB', 'Fellowships'],
    overview: 'The fundamental medical degree required to practice allopathic medicine and surgery in India.'
  },
  // Arts / Law
  {
    degreeId: 'deg-ballb',
    name: 'B.A. LL.B. (Integrated Law)',
    level: 'UG',
    category: 'Law',
    duration: '5 Years',
    eligibility: {
      qualification: '10+2 in any stream.',
      details: 'Minimum 45% aggregate marks.'
    },
    admissionRoutes: ['CLAT', 'AILET', 'LSAT India', 'State Law CETs'],
    subjects: ['Political Science', 'History', 'Constitutional Law', 'Criminal Law', 'Corporate Law', 'Contracts'],
    specializations: ['Corporate Law', 'Criminal Law', 'Intellectual Property Rights'],
    careers: ['Corporate Lawyer', 'Litigator', 'Legal Advisor', 'Civil Judge'],
    higherStudies: ['LL.M', 'PhD'],
    overview: 'An integrated undergraduate program combining a Bachelor of Arts with a Bachelor of Laws, designed for students pursuing legal careers straight after 12th.'
  }
];

const seedExamsDegrees = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/uthink';
    await mongoose.connect(mongoUri, { dbName: 'uthink' });
    console.log('Connected to MongoDB.');

    console.log('Clearing old exams and degrees data...');
    await Exam.deleteMany({});
    await Degree.deleteMany({});

    console.log('Inserting Exams...');
    await Exam.insertMany(exams);

    console.log('Inserting Degrees...');
    await Degree.insertMany(degrees);

    console.log(`Successfully seeded ${exams.length} Exams and ${degrees.length} Degrees!`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedExamsDegrees();
