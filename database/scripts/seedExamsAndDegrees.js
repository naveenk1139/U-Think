const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../backend/.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

async function seedExamsAndDegrees() {
  console.log(`\n======================================================`);
  console.log(`📝 Seeding Exams & Degrees Database...`);
  console.log(`======================================================`);

  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'uthink' });
    console.log(`✅ Connected to MongoDB.`);
    const db = mongoose.connection.db;

    console.log(`🗑️ Clearing old exams and degrees data...`);
    await db.collection('exams').deleteMany({});
    await db.collection('degrees').deleteMany({});

    // ==========================================
    // EXAMS DATA
    // ==========================================
    const examsData = [
      // ENGINEERING
      {
        examId: 'exam-jee-main',
        name: 'JEE Main',
        level: 'National',
        educationLevel: ['After 12th', '12TH_SCIENCE'],
        category: 'Engineering',
        type: 'Entrance Exam',
        ugPg: 'UG',
        streams: ['Science', 'PCMB', 'PCMC'],
        courses: ['B.E', 'B.Tech', 'B.Arch', 'B.Plan'],
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        eligibility: {
          qualification: 'Passed 10+2 with Physics, Mathematics, and Chemistry/Biology/Biotechnology.',
          ageCriteria: 'No age limit for candidates who have passed 12th equivalent.',
          details: 'Top 2,50,000 candidates qualify for JEE Advanced.'
        },
        importantDates: {
          applicationStart: 'November 2025',
          applicationEnd: 'December 2025',
          examDate: 'January 2026 / April 2026',
          resultDate: 'February 2026 / May 2026'
        },
        officialWebsite: 'jeemain.nta.ac.in',
        lastUpdated: new Date().toISOString(),
        conductingBody: 'National Testing Agency (NTA)',
        examMode: 'Computer Based Test (CBT)',
        applicationProcess: 'Online application via NTA portal.',
        acceptedFor: 'NITs, IIITs, CFTIs, and qualifying for JEE Advanced',
        status: 'Active'
      },
      {
        examId: 'exam-jee-adv',
        name: 'JEE Advanced',
        level: 'National',
        educationLevel: ['After 12th', '12TH_SCIENCE'],
        category: 'Engineering',
        type: 'Entrance Exam',
        ugPg: 'UG',
        streams: ['Science'],
        courses: ['B.Tech', 'B.S', 'Dual Degree'],
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        eligibility: {
          qualification: 'Must rank in top 2,50,000 in JEE Main.',
          ageCriteria: 'Must have been born on or after October 1, 2001 (5 years relaxation for SC/ST/PwD).',
          details: 'Maximum of two attempts in two consecutive years.'
        },
        importantDates: {
          applicationStart: 'May 2026',
          applicationEnd: 'May 2026',
          examDate: 'June 2026',
          resultDate: 'June 2026'
        },
        officialWebsite: 'jeeadv.ac.in',
        lastUpdated: new Date().toISOString(),
        conductingBody: 'IITs (Joint Admission Board)',
        examMode: 'Computer Based Test (CBT)',
        applicationProcess: 'Online registration for JEE Main qualified candidates.',
        acceptedFor: 'IITs',
        status: 'Active'
      },
      {
        examId: 'exam-kcet',
        name: 'KCET',
        level: 'State',
        educationLevel: ['After 12th', '12TH_SCIENCE'],
        category: 'Engineering',
        type: 'Entrance Exam',
        ugPg: 'UG',
        streams: ['Science'],
        courses: ['B.E', 'B.Tech', 'B.Pharm', 'B.Sc Agriculture'],
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
        eligibility: {
          qualification: 'Passed 2nd PUC / 12th standard with Physics and Mathematics as compulsory subjects.',
          ageCriteria: 'Varies by course (e.g., minimum 17 years for Pharmacy).',
          details: 'Candidates must have studied in Karnataka for a minimum of 7 years.'
        },
        importantDates: {
          applicationStart: 'January 2026',
          applicationEnd: 'February 2026',
          examDate: 'April 2026',
          resultDate: 'May 2026'
        },
        officialWebsite: 'cetonline.karnataka.gov.in/kea',
        lastUpdated: new Date().toISOString(),
        conductingBody: 'Karnataka Examinations Authority (KEA)',
        examMode: 'Offline (Pen and Paper)',
        applicationProcess: 'Online via KEA portal.',
        acceptedFor: 'Government and Private Engineering/Pharmacy Colleges in Karnataka',
        status: 'Active'
      },
      // MEDICAL
      {
        examId: 'exam-neet-ug',
        name: 'NEET-UG',
        level: 'National',
        educationLevel: ['After 12th', '12TH_SCIENCE'],
        category: 'Medical',
        type: 'Entrance Exam',
        ugPg: 'UG',
        streams: ['Science', 'PCB', 'PCMB'],
        courses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BUMS', 'B.Sc Nursing'],
        subjects: ['Physics', 'Chemistry', 'Biology (Botany & Zoology)'],
        eligibility: {
          qualification: 'Passed 10+2 with PCB and English core subjects.',
          ageCriteria: 'Minimum 17 years at the time of admission.',
          details: 'Mandatory for admission to all medical colleges in India including AIIMS & JIPMER.'
        },
        importantDates: {
          applicationStart: 'February 2026',
          applicationEnd: 'March 2026',
          examDate: 'May 2026',
          resultDate: 'June 2026'
        },
        officialWebsite: 'neet.nta.nic.in',
        lastUpdated: new Date().toISOString(),
        conductingBody: 'National Testing Agency (NTA)',
        examMode: 'Offline (Pen and Paper)',
        applicationProcess: 'Online application via NTA portal.',
        acceptedFor: 'All Medical Colleges in India',
        status: 'Active'
      },
      {
        examId: 'exam-neet-pg',
        name: 'NEET-PG',
        level: 'National',
        educationLevel: ['Degree', 'UG'],
        category: 'Medical',
        type: 'Entrance Exam',
        ugPg: 'PG',
        streams: ['Medical'],
        courses: ['MD', 'MS', 'PG Diploma'],
        subjects: ['Clinical', 'Pre-Clinical', 'Para-Clinical'],
        eligibility: {
          qualification: 'MBBS degree or provisional MBBS pass certificate.',
          ageCriteria: 'No upper age limit.',
          details: 'Must have completed one year of internship.'
        },
        importantDates: {
          applicationStart: 'January 2026',
          applicationEnd: 'February 2026',
          examDate: 'March 2026',
          resultDate: 'April 2026'
        },
        officialWebsite: 'nbe.edu.in',
        lastUpdated: new Date().toISOString(),
        conductingBody: 'National Board of Examinations (NBE)',
        examMode: 'Computer Based Test (CBT)',
        applicationProcess: 'Online via NBE portal.',
        acceptedFor: 'MD/MS programs across India',
        status: 'Active'
      },
      // LAW
      {
        examId: 'exam-clat',
        name: 'CLAT',
        level: 'National',
        educationLevel: ['After 12th', 'Degree'],
        category: 'Law',
        type: 'Entrance Exam',
        ugPg: 'UG',
        streams: ['Arts', 'Commerce', 'Science'],
        courses: ['BA LLB', 'BBA LLB', 'B.Com LLB', 'B.Sc LLB', 'LLM'],
        subjects: ['English', 'Current Affairs', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
        eligibility: {
          qualification: '10+2 for UG program; LLB for PG program.',
          ageCriteria: 'No upper age limit.',
          details: 'Minimum 45% marks in qualifying exam (40% for SC/ST).'
        },
        importantDates: {
          applicationStart: 'July 2025',
          applicationEnd: 'November 2025',
          examDate: 'December 2025',
          resultDate: 'December 2025'
        },
        officialWebsite: 'consortiumofnlus.ac.in',
        lastUpdated: new Date().toISOString(),
        conductingBody: 'Consortium of National Law Universities',
        examMode: 'Offline (Pen and Paper)',
        applicationProcess: 'Online application via official website.',
        acceptedFor: 'National Law Universities (NLUs) in India',
        status: 'Active'
      },
      // MANAGEMENT
      {
        examId: 'exam-cat',
        name: 'CAT',
        level: 'National',
        educationLevel: ['Degree', 'UG'],
        category: 'Management',
        type: 'Entrance Exam',
        ugPg: 'PG',
        streams: ['Any Degree'],
        courses: ['MBA', 'PGDM'],
        subjects: ['Verbal Ability (VARC)', 'Data Interpretation (DILR)', 'Quantitative Aptitude (QA)'],
        eligibility: {
          qualification: 'Bachelor\'s degree with at least 50% marks (45% for SC/ST/PwD).',
          ageCriteria: 'No age limit.',
          details: 'Final year undergraduate students can also apply.'
        },
        importantDates: {
          applicationStart: 'August 2025',
          applicationEnd: 'September 2025',
          examDate: 'November 2025',
          resultDate: 'January 2026'
        },
        officialWebsite: 'iimcat.ac.in',
        lastUpdated: new Date().toISOString(),
        conductingBody: 'Indian Institutes of Management (IIMs)',
        examMode: 'Computer Based Test (CBT)',
        applicationProcess: 'Online application via CAT website.',
        acceptedFor: 'IIMs and top B-Schools in India',
        status: 'Active'
      },
      // DESIGN
      {
        examId: 'exam-nid-dat',
        name: 'NID DAT',
        level: 'National',
        educationLevel: ['After 12th', 'Degree'],
        category: 'Design',
        type: 'Entrance Exam',
        ugPg: 'UG',
        streams: ['Any Stream'],
        courses: ['B.Des', 'M.Des'],
        subjects: ['Visual Design', 'Thematic Colour Arrangement', 'Memory Drawing', 'Proportions', 'Abstract Symbolism'],
        eligibility: {
          qualification: '10+2 for B.Des; Bachelor\'s degree in any discipline for M.Des.',
          ageCriteria: 'Upper age limit of 20 years for B.Des (relaxations apply).',
          details: 'Candidates from Science, Arts, Commerce can apply.'
        },
        importantDates: {
          applicationStart: 'October 2025',
          applicationEnd: 'December 2025',
          examDate: 'December 2025',
          resultDate: 'February 2026'
        },
        officialWebsite: 'admissions.nid.edu',
        lastUpdated: new Date().toISOString(),
        conductingBody: 'National Institute of Design (NID)',
        examMode: 'Offline (Pen and Paper)',
        applicationProcess: 'Online application.',
        acceptedFor: 'NID campuses in India',
        status: 'Active'
      }
    ];

    await db.collection('exams').insertMany(examsData.map(e => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date()
    })));

    // ==========================================
    // DEGREES DATA
    // ==========================================
    const degreesData = [
      // ENGINEERING
      {
        degreeId: 'deg-be-cse',
        name: 'B.E. Computer Science & Engineering',
        level: 'UG',
        category: 'Engineering',
        duration: '4 Years',
        eligibility: {
          qualification: '12th / PUC (Science stream) with PCM.',
          details: 'Usually requires minimum 45-50% aggregate in Physics, Chemistry, and Mathematics.'
        },
        admissionRoutes: ['JEE Main', 'KCET', 'COMEDK', 'Direct Admission (Management Quota)'],
        subjects: ['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'AI', 'Machine Learning'],
        specializations: ['Artificial Intelligence', 'Cyber Security', 'Data Science', 'Cloud Computing'],
        careers: ['Software Engineer', 'Data Engineer', 'Cloud Architect', 'Systems Analyst', 'Full Stack Developer'],
        higherStudies: ['M.Tech', 'MS (Abroad)', 'MBA'],
        overview: 'A flagship engineering degree focusing on computational theory, software design, and hardware-software integration.'
      },
      // MEDICAL
      {
        degreeId: 'deg-mbbs',
        name: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
        level: 'UG',
        category: 'Medical',
        duration: '5.5 Years (including 1 year internship)',
        eligibility: {
          qualification: '12th / PUC with PCB (Physics, Chemistry, Biology) and English.',
          details: 'Minimum 50% aggregate in PCB (40% for reserved categories).'
        },
        admissionRoutes: ['NEET-UG'],
        subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pharmacology', 'Pathology', 'General Medicine', 'Surgery'],
        specializations: ['Not applicable at UG level (General Physician)'],
        careers: ['General Physician', 'Medical Officer', 'Resident Doctor', 'Clinical Researcher'],
        higherStudies: ['MD', 'MS', 'DNB', 'FRCS/MRCP (UK)'],
        overview: 'The primary medical degree in India that certifies a student to practice as a doctor.'
      },
      // LAW
      {
        degreeId: 'deg-ba-llb',
        name: 'BA LLB (5-Year Integrated Law)',
        level: 'UG',
        category: 'Law',
        duration: '5 Years',
        eligibility: {
          qualification: '12th / PUC from any stream (Arts, Commerce, Science).',
          details: 'Usually minimum 45% marks in 12th board exams.'
        },
        admissionRoutes: ['CLAT', 'AILET', 'LSAT India', 'State Law Entrance Exams'],
        subjects: ['Constitutional Law', 'Criminal Law', 'Corporate Law', 'Property Law', 'Political Science', 'History'],
        specializations: ['Corporate Law', 'Criminal Law', 'Intellectual Property Law', 'Human Rights'],
        careers: ['Advocate', 'Corporate Counsel', 'Legal Advisor', 'Judge (after judicial services exam)', 'Public Prosecutor'],
        higherStudies: ['LLM', 'MBA', 'Civil Services'],
        overview: 'An integrated dual-degree program combining arts subjects with comprehensive legal education.'
      },
      // ARTS
      {
        degreeId: 'deg-ba-psych',
        name: 'B.A. Psychology',
        level: 'UG',
        category: 'Arts / Humanities',
        duration: '3 Years (or 4 Years for Honours)',
        eligibility: {
          qualification: '12th / PUC from any stream.',
          details: 'Admissions based on 12th marks or CUET for central universities.'
        },
        admissionRoutes: ['CUET', 'Merit-based admission'],
        subjects: ['General Psychology', 'Developmental Psychology', 'Abnormal Psychology', 'Social Psychology', 'Research Methodology'],
        specializations: ['Clinical Psychology (at PG level)', 'Counseling', 'Industrial Psychology'],
        careers: ['Counselor', 'HR Professional', 'Market Researcher', 'Rehabilitation Specialist'],
        higherStudies: ['M.A. Psychology', 'M.Sc. Clinical Psychology', 'MBA'],
        overview: 'A foundational degree exploring human behavior, mental processes, and psychological theories.'
      },
      // MANAGEMENT
      {
        degreeId: 'deg-bba',
        name: 'Bachelor of Business Administration (BBA)',
        level: 'UG',
        category: 'Management',
        duration: '3 Years (or 4 Years for Honours)',
        eligibility: {
          qualification: '12th / PUC from any stream.',
          details: 'Minimum 50% aggregate is typically required.'
        },
        admissionRoutes: ['CUET', 'IPMAT', 'SET', 'Christ University Entrance', 'Merit-based'],
        subjects: ['Principles of Management', 'Marketing Management', 'Financial Accounting', 'Business Law', 'Organizational Behavior'],
        specializations: ['Finance', 'Marketing', 'Human Resources', 'International Business', 'Business Analytics'],
        careers: ['Marketing Executive', 'Financial Analyst', 'HR Manager', 'Sales Manager', 'Entrepreneur'],
        higherStudies: ['MBA', 'PGDM', 'M.Com', 'M.Sc Finance'],
        overview: 'A professional undergraduate degree focusing on business principles and management skills.'
      },
      // DIPLOMA
      {
        degreeId: 'deg-dip-mech',
        name: 'Diploma in Mechanical Engineering',
        level: 'Diploma',
        category: 'Engineering',
        duration: '3 Years',
        eligibility: {
          qualification: '10th / SSLC pass.',
          details: 'Must have studied Mathematics and Science in 10th.'
        },
        admissionRoutes: ['State Polytechnic Entrance Exams', 'Merit-based counseling'],
        subjects: ['Engineering Mechanics', 'Thermodynamics', 'Fluid Mechanics', 'Manufacturing Processes', 'Machine Drawing'],
        specializations: ['Automobile', 'Production', 'Tool & Die Making'],
        careers: ['Junior Engineer', 'Maintenance Technician', 'CAD Draftsman', 'Production Supervisor'],
        higherStudies: ['B.E/B.Tech (Lateral Entry directly to 2nd year)'],
        overview: 'A technical diploma providing practical knowledge of mechanical systems, design, and manufacturing.'
      },
      // ITI
      {
        degreeId: 'deg-iti-electrician',
        name: 'ITI Electrician',
        level: 'ITI',
        category: 'Vocational',
        duration: '2 Years',
        eligibility: {
          qualification: '10th / SSLC pass.',
          details: 'Must have studied Mathematics and Science.'
        },
        admissionRoutes: ['Merit-based state counseling'],
        subjects: ['Trade Theory', 'Trade Practical', 'Engineering Drawing', 'Workshop Calculation & Science', 'Employability Skills'],
        specializations: ['Industrial Wiring', 'Motor Winding', 'Domestic Wiring'],
        careers: ['Electrician', 'Lineman', 'Maintenance Technician', 'Panel Board Wirer'],
        higherStudies: ['Diploma in Electrical Engineering', 'Apprenticeship (NTC/NAC)'],
        overview: 'A vocational training program focusing on electrical wiring, equipment installation, and maintenance.'
      },
      // COMMERCE
      {
        degreeId: 'deg-ca',
        name: 'Chartered Accountancy (CA)',
        level: 'Professional',
        category: 'Commerce',
        duration: '4.5 - 5 Years',
        eligibility: {
          qualification: '12th pass (for Foundation route) or Graduates (for Direct Entry).',
          details: 'Requires passing the CA Foundation exam.'
        },
        admissionRoutes: ['CA Foundation Exam'],
        subjects: ['Accounting', 'Business Laws', 'Taxation', 'Auditing', 'Financial Management', 'Strategic Management'],
        specializations: ['Taxation', 'Auditing', 'Corporate Finance'],
        careers: ['Chartered Accountant', 'Auditor', 'Tax Consultant', 'Financial Advisor', 'Chief Financial Officer (CFO)'],
        higherStudies: ['CFA', 'CMA', 'MBA Finance'],
        overview: 'One of the most prestigious professional qualifications in India focusing on accounting, taxation, and auditing.'
      }
    ];

    await db.collection('degrees').insertMany(degreesData.map(d => ({
      ...d,
      createdAt: new Date(),
      updatedAt: new Date()
    })));

    console.log(`✅ Successfully seeded Exams and Degrees database!`);
    
    // Summary
    const examsCount = await db.collection('exams').countDocuments();
    const degreesCount = await db.collection('degrees').countDocuments();
    console.log(`📊 Stats: ${examsCount} Exams | ${degreesCount} Degrees inserted.`);
    
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedExamsAndDegrees();
