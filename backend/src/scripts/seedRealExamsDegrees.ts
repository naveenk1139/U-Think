import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Exam from '../models/Exam';
import Degree from '../models/Degree';
import ExamDegreeMap from '../models/ExamDegreeMap';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../../.env') }); // This is for root, wait, let's just use path.join(process.cwd(), '.env')
dotenv.config({ path: path.join(process.cwd(), '.env') });

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding Real Exams & Degrees...');
  } catch (err: any) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

const realExams = [
  {
    examId: 'EX-JEE-MAIN-001',
    slug: 'jee-main',
    name: 'Joint Entrance Examination (Main)',
    short_name: 'JEE Main',
    category: 'Engineering',
    sub_category: 'B.Tech/B.Arch',
    level: 'National',
    education_stage: ['After 12th', 'UG'],
    description: 'JEE Main is a national-level engineering entrance exam conducted by NTA for admission to NITs, IIITs, CFTIs, and qualifying for JEE Advanced.',
    conducting_body: 'National Testing Agency (NTA)',
    official_website_url: 'https://jeemain.nta.nic.in/',
    official_application_url: 'https://jeemain.nta.nic.in/',
    official_notification_url: 'https://jeemain.nta.nic.in/information-bulletin/',
    eligibility: {
      minimum_qualification: '10+2 passed or appearing',
      required_subjects: ['Physics', 'Mathematics', 'Chemistry/Biology/Biotechnology/Technical Vocational subject'],
      minimum_marks: '75% for General, 65% for SC/ST (for NITs/IIITs)',
      attempt_rules: '3 consecutive years from the year of passing 12th',
    },
    exam_mode: ['computer_based'],
    importantDates: {
      application_start: new Date('2024-11-01'),
      application_end: new Date('2024-12-04'),
      exam_date: new Date('2025-01-24'), // Session 1
    },
    application_fee: 'INR 1000 for Gen Boys, INR 800 for Girls/Gen-EWS/OBC-NCL, INR 500 for SC/ST/PwD',
    academic_year: '2025-26',
    status: 'Application Closed',
    source_name: 'NTA Official',
    source_url: 'https://jeemain.nta.nic.in/',
    last_verified_at: new Date('2025-01-01')
  },
  {
    examId: 'EX-KCET-002',
    slug: 'kcet',
    name: 'Karnataka Common Entrance Test',
    short_name: 'KCET',
    category: 'Engineering',
    sub_category: 'B.Tech/B.Pharm/Agriculture',
    level: 'State',
    education_stage: ['After 12th', 'UG'],
    description: 'KCET is a state-level entrance exam conducted by Karnataka Examination Authority (KEA) for admission to Engineering, Pharmacy, and Agriculture courses in Karnataka.',
    conducting_body: 'Karnataka Examination Authority (KEA)',
    official_website_url: 'https://cetonline.karnataka.gov.in/kea/',
    eligibility: {
      minimum_qualification: '10+2 passed or appearing',
      required_subjects: ['Physics', 'Mathematics', 'Chemistry'],
      minimum_marks: '45% for General, 40% for reserved categories in optional subjects',
    },
    exam_mode: ['offline'],
    importantDates: {
      application_start: new Date('2025-01-10'),
      application_end: new Date('2025-02-10'),
      exam_date: new Date('2025-04-18'),
    },
    academic_year: '2025-26',
    status: 'Application Open',
    source_name: 'KEA Official',
    last_verified_at: new Date('2025-01-15')
  },
  {
    examId: 'EX-NEET-UG-003',
    slug: 'neet-ug',
    name: 'National Eligibility cum Entrance Test (UG)',
    short_name: 'NEET UG',
    category: 'Medical',
    sub_category: 'MBBS/BDS/AYUSH',
    level: 'National',
    education_stage: ['After 12th', 'UG'],
    description: 'NEET UG is the single national-level medical entrance exam conducted by NTA for admission to MBBS, BDS, and AYUSH courses.',
    conducting_body: 'National Testing Agency (NTA)',
    official_website_url: 'https://neet.nta.nic.in/',
    eligibility: {
      minimum_qualification: '10+2 passed or appearing',
      required_subjects: ['Physics', 'Chemistry', 'Biology/Biotechnology', 'English'],
      minimum_marks: '50% (General), 40% (SC/ST/OBC), 45% (General-PwD)',
      age_requirement: 'Minimum 17 years as on 31st Dec of admission year',
    },
    exam_mode: ['offline'],
    importantDates: {
      exam_date: new Date('2025-05-05'),
    },
    academic_year: '2025-26',
    status: 'TBA',
    source_name: 'NTA Official',
    last_verified_at: new Date('2025-01-01')
  },
  {
    examId: 'EX-CUET-UG-004',
    slug: 'cuet-ug',
    name: 'Common University Entrance Test (UG)',
    short_name: 'CUET UG',
    category: 'University Admission',
    level: 'National',
    education_stage: ['After 12th', 'UG'],
    description: 'A single window opportunity to students seeking admission in any of the Central Universities (CUs) or other participating organizations across the country.',
    conducting_body: 'National Testing Agency (NTA)',
    official_website_url: 'https://exams.nta.ac.in/CUET-UG/',
    exam_mode: ['hybrid'],
    academic_year: '2025-26',
    status: 'TBA'
  },
  {
    examId: 'EX-UPSC-CSE-005',
    slug: 'upsc-cse',
    name: 'Civil Services Examination',
    short_name: 'UPSC CSE',
    category: 'Government Exams',
    sub_category: 'IAS/IPS/IFS Recruitment',
    level: 'National',
    education_stage: ['After Degree', 'Recruitment'],
    description: 'Nationwide competitive examination in India conducted by the Union Public Service Commission for recruitment to various Civil Services of the Government of India.',
    conducting_body: 'Union Public Service Commission',
    official_website_url: 'https://upsc.gov.in/',
    eligibility: {
      minimum_qualification: 'Any Degree from a recognized university',
      age_requirement: '21 to 32 years (General)',
      attempt_rules: '6 attempts (General), 9 (OBC), Unlimited (SC/ST)',
      nationality_rules: 'Must be a citizen of India for IAS, IFS, IPS'
    },
    exam_mode: ['offline'],
    academic_year: '2025-26',
    status: 'Application Closed'
  }
];

const realDegrees = [
  {
    degreeId: 'DEG-BTECH-CSE-001',
    slug: 'btech-computer-science-engineering',
    name: 'Bachelor of Technology in Computer Science & Engineering',
    short_name: 'B.Tech CSE',
    degree_type: 'B.Tech',
    level: 'UG',
    discipline: 'Engineering',
    stream: 'Engineering & Technology',
    branch: 'Computer Science',
    duration: 4,
    duration_unit: 'Years',
    mode: ['Full-time'],
    eligibility: {
      required_subjects: ['Physics', 'Mathematics', 'Chemistry/Biology/Technical Vocational'],
      minimum_marks: '45% for general category',
    },
    entrance_required: true,
    admission_method: ['Entrance Exam', 'Management Quota', 'Lateral Entry (for Diploma holders)'],
    recognition: {
      regulator: 'AICTE',
    },
    description: 'B.Tech in Computer Science and Engineering involves the study of computer architecture, software development, data structures, and networking.',
    career_options: ['Software Engineer', 'Data Scientist', 'Systems Analyst', 'Cloud Engineer'],
    higher_study_options: ['M.Tech CSE', 'MS in Computer Science', 'MBA'],
    source_name: 'AICTE Handbook',
    last_verified_at: new Date('2025-01-01')
  },
  {
    degreeId: 'DEG-MBBS-002',
    slug: 'mbbs',
    name: 'Bachelor of Medicine and Bachelor of Surgery',
    short_name: 'MBBS',
    degree_type: 'MBBS',
    level: 'UG',
    discipline: 'Medical',
    stream: 'Medicine',
    duration: 5.5, // 4.5 + 1 year internship
    duration_unit: 'Years',
    mode: ['Full-time'],
    eligibility: {
      required_subjects: ['Physics', 'Chemistry', 'Biology', 'English'],
      minimum_marks: '50% in PCB for General',
    },
    entrance_required: true,
    admission_method: ['Entrance Exam'],
    recognition: {
      regulator: 'NMC', // National Medical Commission
    },
    description: 'An undergraduate medical degree that equips students with the knowledge and skills required to practice medicine and surgery.',
    career_options: ['Medical Officer', 'General Physician', 'Surgeon (post-PG)'],
    higher_study_options: ['MD', 'MS', 'DNB', 'PG Diploma'],
    last_verified_at: new Date('2025-01-01')
  },
  {
    degreeId: 'DEG-BCOM-003',
    slug: 'bcom-general',
    name: 'Bachelor of Commerce',
    short_name: 'B.Com',
    degree_type: 'B.Com',
    level: 'UG',
    discipline: 'Commerce',
    stream: 'Commerce & Management',
    duration: 3,
    duration_unit: 'Years',
    mode: ['Full-time', 'Distance', 'Online'],
    eligibility: {
      required_subjects: ['Commerce/Science in 12th'],
    },
    entrance_required: false,
    admission_method: ['Merit-based (12th marks)', 'Entrance Exam (University specific)'],
    recognition: {
      regulator: 'UGC',
    },
    career_options: ['Accountant', 'Financial Analyst', 'Tax Consultant'],
    higher_study_options: ['M.Com', 'MBA', 'CA (Professional)', 'CMA', 'CS'],
  },
  {
    degreeId: 'DEG-MTECH-CSE-004',
    slug: 'mtech-computer-science-engineering',
    name: 'Master of Technology in Computer Science & Engineering',
    short_name: 'M.Tech CSE',
    degree_type: 'M.Tech',
    level: 'PG',
    discipline: 'Engineering',
    branch: 'Computer Science',
    duration: 2,
    duration_unit: 'Years',
    mode: ['Full-time'],
    eligibility: {
      required_subjects: ['B.Tech/B.E in relevant branch or MCA/M.Sc'],
      minimum_marks: '50% for general category',
    },
    entrance_required: true,
    admission_method: ['Entrance Exam'],
    recognition: {
      regulator: 'AICTE',
    },
    career_options: ['Senior Software Engineer', 'Research Scientist', 'Professor (after PhD)'],
    higher_study_options: ['PhD'],
  },
  {
    degreeId: 'DEG-BALLB-005',
    slug: 'ba-llb-integrated',
    name: 'Bachelor of Arts & Bachelor of Legislative Law (Integrated)',
    short_name: 'BA LLB',
    degree_type: 'Integrated Law',
    level: 'UG',
    discipline: 'Law',
    duration: 5,
    duration_unit: 'Years',
    mode: ['Full-time'],
    eligibility: {
      minimum_marks: '45% in 10+2',
    },
    entrance_required: true,
    admission_method: ['Entrance Exam (CLAT, AILET, LSAT, State CET)'],
    recognition: {
      regulator: 'BCI', // Bar Council of India
    },
    career_options: ['Advocate', 'Legal Advisor', 'Corporate Lawyer', 'Judiciary'],
    higher_study_options: ['LLM', 'Judiciary Exams'],
  }
];

const seedRealData = async () => {
  await connectDB();

  console.log('Clearing old Exams, Degrees, and Mappings...');
  await Exam.deleteMany({});
  await Degree.deleteMany({});
  await ExamDegreeMap.deleteMany({});

  console.log('Inserting verified Real Exams...');
  const insertedExams = await Exam.insertMany(realExams);
  console.log(`Inserted ${insertedExams.length} Exams.`);

  console.log('Inserting verified Real Degrees...');
  const insertedDegrees = await Degree.insertMany(realDegrees);
  console.log(`Inserted ${insertedDegrees.length} Degrees.`);

  // Create Mapping Logic
  console.log('Creating Exam ↔ Degree Mappings...');
  const jee = insertedExams.find(e => e.slug === 'jee-main');
  const kcet = insertedExams.find(e => e.slug === 'kcet');
  const neet = insertedExams.find(e => e.slug === 'neet-ug');

  const btechCSE = insertedDegrees.find(d => d.slug === 'btech-computer-science-engineering');
  const mbbs = insertedDegrees.find(d => d.slug === 'mbbs');

  const mappings = [];
  if (jee && btechCSE) {
    mappings.push({
      exam_id: jee._id,
      degree_id: btechCSE._id,
      mandatory_or_optional: 'Alternative',
      admission_role: 'Entrance Exam',
      eligibility_condition: 'Required for NITs/IIITs, optional for private state colleges under management quota.',
    });
  }
  
  if (kcet && btechCSE) {
    mappings.push({
      exam_id: kcet._id,
      degree_id: btechCSE._id,
      mandatory_or_optional: 'Alternative',
      admission_role: 'Entrance Exam',
      eligibility_condition: 'Required for Government Quota seats in Karnataka engineering colleges.',
    });
  }

  if (neet && mbbs) {
    mappings.push({
      exam_id: neet._id,
      degree_id: mbbs._id,
      mandatory_or_optional: 'Mandatory',
      admission_role: 'Entrance Exam',
      eligibility_condition: 'Absolutely mandatory for all MBBS admissions in India.',
    });
  }

  const insertedMappings = await ExamDegreeMap.insertMany(mappings);
  console.log(`Created ${insertedMappings.length} Exam-Degree Mappings.`);

  console.log('Seed completed successfully!');
  process.exit(0);
};

seedRealData().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
