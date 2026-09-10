import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

import Exam from '../src/models/Exam.js';
import ExamYear from '../src/models/ExamYear.js';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/u_think';

// Helper for generating standard dates
const generateDates = (offsetMonths) => {
  const base = new Date();
  base.setMonth(base.getMonth() + offsetMonths);
  
  return {
    registration_start: new Date(base.getTime() - 60 * 24 * 60 * 60 * 1000), // 2 months before
    registration_end: new Date(base.getTime() - 30 * 24 * 60 * 60 * 1000),   // 1 month before
    exam_start: base,
    result_date: new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000)         // 1 month after
  };
};

const verifiedExams = [
  // --- ENGINEERING ---
  {
    canonical_slug: 'jee-main',
    exam_name: 'Joint Entrance Examination (Main)',
    short_name: 'JEE Main',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass or appearing',
    streams: ['PCM'],
    exam_categories: ['Engineering', 'Architecture'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'National Testing Agency (NTA)',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://jeemain.nta.ac.in/',
    description: 'JEE Main is a national level entrance exam conducted for admission to NITs, IIITs, CFTIs, and other participating engineering institutions.',
    eligibility: 'Must have passed Class 12 with Physics, Mathematics, and one of Chemistry/Biology/Biotechnology/Technical Vocational subject.',
    attempt_limit: 3,
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Twice a year',
    target_courses: ['B.Tech', 'B.E.', 'B.Arch', 'B.Planning'],
    target_degrees: ['Bachelor of Technology', 'Bachelor of Architecture'],
    verification_status: 'VERIFIED',
    source_name: 'NTA Official Website'
  },
  {
    canonical_slug: 'jee-advanced',
    exam_name: 'Joint Entrance Examination (Advanced)',
    short_name: 'JEE Advanced',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass',
    streams: ['PCM'],
    exam_categories: ['Engineering', 'Architecture'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'IITs on behalf of JAB',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://jeeadv.ac.in/',
    description: 'JEE Advanced is the sole admission test for undergraduate programs at all Indian Institutes of Technology (IITs).',
    eligibility: 'Must be among the top 2.5 lakh successful candidates in B.E./B.Tech. paper of JEE (Main).',
    attempt_limit: 2,
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Once a year',
    target_courses: ['B.Tech', 'B.S.', 'B.Arch', 'Dual Degree'],
    verification_status: 'VERIFIED',
    source_name: 'JEE Advanced Official'
  },
  {
    canonical_slug: 'bitsat',
    exam_name: 'BITS Admission Test',
    short_name: 'BITSAT',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'],
    exam_categories: ['Engineering', 'Pharmacy'],
    exam_type: 'Entrance Exam',
    ownership: 'PRIVATE',
    conducting_body: 'BITS Pilani',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://bitsadmission.com/',
    description: 'A computer-based admission test conducted by BITS Pilani for integrated first-degree programmes.',
    eligibility: 'Passed 12th with minimum 75% aggregate marks in PCM/PCB and at least 60% in each subject.',
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Twice a year',
    target_courses: ['B.E.', 'B.Pharm', 'M.Sc. (Integrated)'],
    verification_status: 'VERIFIED',
    source_name: 'BITS Admission Official'
  },
  {
    canonical_slug: 'kcet',
    exam_name: 'Karnataka Common Entrance Test',
    short_name: 'KCET',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'],
    exam_categories: ['Engineering', 'Agriculture', 'Pharmacy'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'Karnataka Examinations Authority (KEA)',
    state: 'Karnataka',
    applicable_states: ['Karnataka'],
    official_website: 'https://cetonline.karnataka.gov.in/kea/',
    description: 'State level entrance exam for admission to Engineering, Pharmacy, Agriculture, and other professional courses in Karnataka.',
    eligibility: 'Pass in 2nd PUC / 12th standard with Physics, Mathematics, and one optional subject.',
    exam_mode: ['Offline'],
    exam_frequency: 'Once a year',
    target_courses: ['B.Tech', 'B.Pharm', 'B.Sc. Agriculture', 'B.V.Sc'],
    verification_status: 'VERIFIED'
  },
  {
    canonical_slug: 'comedk-uget',
    exam_name: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka UGET',
    short_name: 'COMEDK UGET',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass',
    streams: ['PCM'],
    exam_categories: ['Engineering'],
    exam_type: 'Entrance Exam',
    ownership: 'PRIVATE',
    conducting_body: 'COMEDK',
    state: 'Karnataka',
    applicable_states: ['All India'],
    official_website: 'https://www.comedk.org/',
    description: 'Entrance exam for undergraduate engineering courses at COMEDK member institutions in Karnataka.',
    eligibility: 'Passed 12th std/PUC with minimum 45% marks in Physics, Chemistry and Mathematics (40% for SC/ST/OBC of Karnataka).',
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Once a year',
    target_courses: ['B.E.', 'B.Tech'],
    verification_status: 'VERIFIED'
  },
  {
    canonical_slug: 'mht-cet',
    exam_name: 'Maharashtra Health and Technical Common Entrance Test',
    short_name: 'MHT CET',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'],
    exam_categories: ['Engineering', 'Pharmacy', 'Agriculture'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'State Common Entrance Test Cell, Maharashtra',
    state: 'Maharashtra',
    applicable_states: ['Maharashtra', 'All India'],
    official_website: 'https://cetcell.mahacet.org/',
    description: 'State level entrance test for admission to B.E./B.Tech, B.Pharm, and Agriculture courses in Maharashtra.',
    eligibility: 'Passed HSC or equivalent examination with Physics and Mathematics/Biology.',
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Once a year',
    verification_status: 'VERIFIED'
  },

  // --- MEDICAL ---
  {
    canonical_slug: 'neet-ug',
    exam_name: 'National Eligibility cum Entrance Test (Undergraduate)',
    short_name: 'NEET UG',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass or appearing with PCB',
    streams: ['PCB'],
    exam_categories: ['Medical', 'Dental', 'AYUSH', 'Nursing'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'National Testing Agency (NTA)',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://exams.nta.ac.in/NEET/',
    description: 'NEET UG is the single national level medical entrance exam for admission to MBBS, BDS, BAMS, BHMS, and BSMS courses in Indian medical colleges.',
    eligibility: 'Must have passed Class 12 with Physics, Chemistry, Biology/Biotechnology, and English with minimum 50% aggregate (for UR category).',
    age_min: 17,
    attempt_limit: 0,
    exam_mode: ['Pen and Paper based (Offline)'],
    exam_frequency: 'Once a year',
    target_courses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Sc Nursing'],
    verification_status: 'VERIFIED',
    source_name: 'NTA NEET Official'
  },
  {
    canonical_slug: 'neet-pg',
    exam_name: 'National Eligibility cum Entrance Test (Postgraduate)',
    short_name: 'NEET PG',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'MBBS Degree',
    streams: ['OTHER'],
    exam_categories: ['Medical'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'National Board of Examinations (NBE)',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://nbe.edu.in/',
    description: 'Eligibility-cum-ranking examination for admission to various MD/MS and PG Diploma Courses.',
    eligibility: 'MBBS degree or Provisional MBBS Pass Certificate recognized by NMC and completed 1 year of internship.',
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Once a year',
    target_courses: ['MD', 'MS', 'PG Diploma'],
    verification_status: 'VERIFIED'
  },

  // --- UNIVERSITY / GENERAL UG ---
  {
    canonical_slug: 'cuet-ug',
    exam_name: 'Common University Entrance Test (Undergraduate)',
    short_name: 'CUET UG',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM', 'ARTS', 'COMMERCE', 'HUMANITIES', 'PCM', 'PCB'],
    exam_categories: ['University', 'Arts', 'Commerce', 'Science', 'Humanities', 'Management'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'National Testing Agency (NTA)',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://exams.nta.ac.in/CUET-UG/',
    description: 'CUET UG is conducted for admission into all UG Programmes in all Central Universities, State Universities, Deemed Universities, and Private Universities.',
    eligibility: 'Must have passed Class 12. Subject requirements vary by university and specific course chosen.',
    exam_mode: ['Computer Based Test (CBT)', 'Pen & Paper'],
    exam_frequency: 'Once a year',
    target_courses: ['B.A.', 'B.Sc', 'B.Com', 'BBA', 'Integrated M.A.'],
    verification_status: 'VERIFIED'
  },

  // --- LAW ---
  {
    canonical_slug: 'clat-ug',
    exam_name: 'Common Law Admission Test',
    short_name: 'CLAT',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM'],
    exam_categories: ['Law'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'Consortium of National Law Universities',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://consortiumofnlus.ac.in/',
    description: 'CLAT is a national level entrance exam for admissions to undergraduate (UG) and postgraduate (PG) law programmes offered by 24 National Law Universities in India.',
    eligibility: 'Forty-five percent (45%) marks or its equivalent grade in case of candidates belonging to General / OBC / PWD / NRI / PIO / OCI categories.',
    exam_mode: ['Offline'],
    exam_frequency: 'Once a year',
    target_courses: ['BA LLB', 'BBA LLB', 'B.Com LLB', 'B.Sc LLB'],
    verification_status: 'VERIFIED'
  },
  {
    canonical_slug: 'mhcet-law',
    exam_name: 'Maharashtra Common Entrance Test for Law',
    short_name: 'MHCET Law',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM'],
    exam_categories: ['Law'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'State Common Entrance Test Cell, Maharashtra',
    state: 'Maharashtra',
    applicable_states: ['Maharashtra'],
    official_website: 'https://cetcell.mahacet.org/',
    description: 'State level entrance exam for admission to 5-year integrated LLB programs in Maharashtra.',
    eligibility: 'Minimum 45% marks in 12th standard.',
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Once a year',
    target_courses: ['LLB (5 Years)'],
    verification_status: 'VERIFIED'
  },

  // --- MANAGEMENT ---
  {
    canonical_slug: 'cat',
    exam_name: 'Common Admission Test',
    short_name: 'CAT',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Management'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'IIMs',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://iimcat.ac.in/',
    description: 'CAT is a national level management aptitude test conducted by the IIMs primarily for admission to their MBA/PGDM programs.',
    eligibility: 'Bachelor\'s Degree with at least 50% marks or equivalent CGPA (45% for SC, ST and PwD).',
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Once a year',
    target_courses: ['MBA', 'PGDM', 'FPM'],
    verification_status: 'VERIFIED'
  },

  // --- UPSC / CIVIL SERVICES ---
  {
    canonical_slug: 'upsc-cse',
    exam_name: 'Civil Services Examination',
    short_name: 'UPSC CSE',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['UPSC', 'Government', 'Civil Services'],
    exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'Union Public Service Commission (UPSC)',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://upsc.gov.in/',
    description: 'Nationwide competitive examination in India conducted by the UPSC for recruitment to various Civil Services of the Government of India, including the IAS, IFS, and IPS.',
    eligibility: 'Must hold a degree of any of Universities incorporated by an Act of the Central or State Legislature in India.',
    age_min: 21,
    age_max: 32,
    attempt_limit: 6,
    exam_mode: ['Offline'],
    exam_frequency: 'Once a year',
    verification_status: 'VERIFIED'
  },

  // --- SSC ---
  {
    canonical_slug: 'ssc-cgl',
    exam_name: 'Combined Graduate Level Examination',
    short_name: 'SSC CGL',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['SSC', 'Government'],
    exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'Staff Selection Commission (SSC)',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://ssc.nic.in/',
    description: 'SSC CGL is conducted to recruit staff to various posts in ministries, departments and organisations of the Government of India.',
    eligibility: 'Bachelor\'s Degree from a recognized University or equivalent.',
    age_min: 18,
    age_max: 32,
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Once a year',
    verification_status: 'VERIFIED'
  },
  
  // --- BANKING ---
  {
    canonical_slug: 'ibps-po',
    exam_name: 'IBPS Probationary Officer',
    short_name: 'IBPS PO',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Banking', 'Government'],
    exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'Institute of Banking Personnel Selection (IBPS)',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://www.ibps.in/',
    description: 'Recruitment exam for the post of Probationary Officers (PO)/Management Trainees (MT) in Participating Banks.',
    eligibility: 'A Degree (Graduation) in any discipline from a University recognized by the Govt. Of India.',
    age_min: 20,
    age_max: 30,
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Once a year',
    verification_status: 'VERIFIED'
  },

  // --- DEFENCE ---
  {
    canonical_slug: 'nda',
    exam_name: 'National Defence Academy and Naval Academy Examination',
    short_name: 'NDA',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: 'Class 12th Pass or appearing',
    streams: ['PCM', 'ANY_STREAM'],
    exam_categories: ['Defence', 'UPSC'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'Union Public Service Commission (UPSC)',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://upsc.gov.in/',
    description: 'National level entrance exam for admission to the Army, Navy and Air Force wings of the NDA and Indian Naval Academy Course.',
    eligibility: '12th Class pass for Army Wing. 12th Class pass with Physics, Chemistry and Mathematics for Air Force and Naval Wings.',
    age_min: 16.5,
    age_max: 19.5,
    exam_mode: ['Offline'],
    exam_frequency: 'Twice a year',
    verification_status: 'VERIFIED'
  },
  
  // --- POSTGRADUATE ENG/SCIENCE ---
  {
    canonical_slug: 'gate',
    exam_name: 'Graduate Aptitude Test in Engineering',
    short_name: 'GATE',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['PCM'],
    exam_categories: ['Engineering', 'Science', 'Architecture'],
    exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT',
    conducting_body: 'IISc and seven IITs on behalf of NCB-GATE, Department of Higher Education',
    state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://gate2025.iitr.ac.in/',
    description: 'GATE is a national level exam that primarily tests the comprehensive understanding of various undergraduate subjects in engineering and science.',
    eligibility: 'Currently studying in 3rd or higher years of any undergraduate degree program OR has already completed any government approved degree program in Engineering / Technology / Architecture / Science / Commerce / Arts.',
    exam_mode: ['Computer Based Test (CBT)'],
    exam_frequency: 'Once a year',
    target_courses: ['M.Tech', 'M.E.', 'Ph.D'],
    verification_status: 'VERIFIED'
  }
];

async function seedDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    // Clear existing
    console.log('Clearing existing exam data...');
    await Exam.deleteMany({});
    await ExamYear.deleteMany({});
    
    // Insert new exams
    console.log('Inserting verified exams...');
    for (const examData of verifiedExams) {
      const exam = await Exam.create(examData);
      
      // Generate some dates for upcoming deadlines
      const yearData = {
        exam_id: exam._id,
        year: 2026, // Current or upcoming year
        ...generateDates(Math.floor(Math.random() * 6) + 1), // Offset by 1 to 6 months
        status: 'CONFIRMED'
      };
      
      await ExamYear.create(yearData);
      console.log(`Inserted ${exam.short_name}`);
    }

    console.log(`\nSuccessfully seeded ${verifiedExams.length} verified exams with deadlines.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDB();
