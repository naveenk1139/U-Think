import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: './.env' });

// Import the Exam model directly here to avoid dependency issues for the standalone script
const examSchema = new mongoose.Schema({}, { strict: false });
const Exam = mongoose.model('Exam', examSchema);

const examsData = [
  // ==========================================
  // AFTER 10TH EXAMS
  // ==========================================
  {
    canonical_slug: 'ntse',
    exam_name: 'National Talent Search Examination (NTSE)',
    short_name: 'NTSE',
    status: 'ACTIVE',
    education_level: 'AFTER_10TH',
    minimum_education: '10th Studying',
    streams: ['ANY_STREAM'],
    exam_categories: ['Scholarship'],
    conducting_body: 'NCERT',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'A national-level scholarship program in India to identify and recognize students with high intellect and academic talent.',
    eligibility: 'Students studying in Class 10 in recognized schools.',
    target_courses: ['Scholarship for 11th, 12th, and beyond']
  },
  {
    canonical_slug: 'jeecup',
    exam_name: 'Joint Entrance Examination Council (Polytechnic), Uttar Pradesh',
    short_name: 'JEECUP',
    status: 'ACTIVE',
    education_level: 'AFTER_10TH',
    minimum_education: '10th Pass',
    streams: ['ANY_STREAM'],
    exam_categories: ['Engineering', 'Diploma'],
    conducting_body: 'JEECUP',
    ownership: 'GOVERNMENT',
    state: 'Uttar Pradesh',
    description: 'State-level examination for admission to diploma courses in Engineering, Technology, and Management.',
    eligibility: 'Passed 10th standard with a minimum of 35% marks.',
    target_courses: ['Diploma in Engineering']
  },

  // ==========================================
  // AFTER 12TH EXAMS (UNDERGRADUATE)
  // ==========================================
  // Engineering
  {
    canonical_slug: 'jee-advanced',
    exam_name: 'Joint Entrance Examination Advanced',
    short_name: 'JEE Advanced',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['PCM'],
    exam_categories: ['Engineering'],
    conducting_body: 'IITs',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'The sole prerequisite for admission to the Indian Institutes of Technology (IITs).',
    eligibility: 'Must have qualified JEE Main and rank among the top 2.5 lakh candidates.',
    target_courses: ['B.Tech', 'B.E.', 'B.Arch', 'Integrated M.Tech']
  },
  {
    canonical_slug: 'bitsat',
    exam_name: 'Birla Institute of Technology and Science Admission Test',
    short_name: 'BITSAT',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['PCM', 'PCB'],
    exam_categories: ['Engineering', 'Pharmacy'],
    conducting_body: 'BITS Pilani',
    ownership: 'PRIVATE',
    state: 'All India',
    description: 'University level entrance exam for admission to engineering, pharmacy, and sciences programs at BITS campuses.',
    eligibility: 'Passed 12th standard with Physics, Chemistry, and Mathematics/Biology with at least 75% aggregate marks.',
    target_courses: ['B.E.', 'B.Pharm', 'M.Sc.']
  },
  {
    canonical_slug: 'viteee',
    exam_name: 'VIT Engineering Entrance Examination',
    short_name: 'VITEEE',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['PCM', 'PCB'],
    exam_categories: ['Engineering'],
    conducting_body: 'VIT University',
    ownership: 'UNIVERSITY',
    state: 'All India',
    description: 'Entrance exam for admission to B.Tech programs at VIT campuses.',
    eligibility: 'Passed 12th standard with Physics, Chemistry, and Mathematics/Biology with a minimum aggregate of 60%.',
    target_courses: ['B.Tech']
  },
  // Medical
  {
    canonical_slug: 'neet-ug',
    exam_name: 'National Eligibility cum Entrance Test (UG)',
    short_name: 'NEET UG',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['PCB'],
    exam_categories: ['Medical'],
    conducting_body: 'NTA',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'The sole entrance test for admission to MBBS, BDS, and other undergraduate medical courses in approved/recognized Medical/Dental Colleges in India.',
    eligibility: '12th Pass with Physics, Chemistry, and Biology/Biotechnology.',
    target_courses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BUMS']
  },
  // Law
  {
    canonical_slug: 'ailet',
    exam_name: 'All India Law Entrance Test',
    short_name: 'AILET',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['ANY_STREAM'],
    exam_categories: ['Law'],
    conducting_body: 'NLU Delhi',
    ownership: 'UNIVERSITY',
    state: 'Delhi',
    description: 'National-level entrance exam conducted by National Law University, Delhi for admission to its law programs.',
    eligibility: 'Passed 10+2 or equivalent examination with a minimum of 45% marks.',
    target_courses: ['B.A. LL.B. (Hons.)']
  },
  // Defense
  {
    canonical_slug: 'nda',
    exam_name: 'National Defence Academy & Naval Academy Examination',
    short_name: 'NDA & NA',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass/Studying',
    streams: ['PCM', 'ANY_STREAM'],
    exam_categories: ['Defense'],
    conducting_body: 'UPSC',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Entrance exam for admission to the Army, Navy and Air Force wings of the NDA and Indian Naval Academy Course.',
    eligibility: '12th pass. Physics and Maths required for Air Force and Navy.',
    target_courses: ['Defense Training & Cadet degrees']
  },
  // Design / Architecture
  {
    canonical_slug: 'nata',
    exam_name: 'National Aptitude Test in Architecture',
    short_name: 'NATA',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['PCM'],
    exam_categories: ['Architecture'],
    conducting_body: 'Council of Architecture (CoA)',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'National level examination for admission to undergraduate courses in Architecture.',
    eligibility: 'Passed 10+2 scheme of examination with Physics, Chemistry and Mathematics or passed 10+3 Diploma Examination with Mathematics.',
    target_courses: ['B.Arch']
  },
  {
    canonical_slug: 'nift',
    exam_name: 'NIFT Entrance Exam',
    short_name: 'NIFT',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['ANY_STREAM'],
    exam_categories: ['Design', 'Fashion'],
    conducting_body: 'National Institute of Fashion Technology',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Entrance exam for admission to design, management, and technology programs at NIFT campuses.',
    eligibility: 'Passed 10+2 from a recognized board.',
    target_courses: ['B.Des', 'B.FTech']
  },
  // Management / Commerce
  {
    canonical_slug: 'ipmat',
    exam_name: 'Integrated Program in Management Aptitude Test',
    short_name: 'IPMAT',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['ANY_STREAM'],
    exam_categories: ['Management'],
    conducting_body: 'IIM Indore',
    ownership: 'AUTONOMOUS',
    state: 'All India',
    description: 'Entrance exam for the 5-Year Integrated Program in Management at IIMs.',
    eligibility: 'Passed 12th standard with a minimum of 60% marks.',
    target_courses: ['BBA + MBA (Integrated)']
  },
  {
    canonical_slug: 'ca-foundation',
    exam_name: 'CA Foundation',
    short_name: 'CA Foundation',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['COMMERCE', 'ANY_STREAM'],
    exam_categories: ['Commerce', 'Professional'],
    conducting_body: 'ICAI',
    ownership: 'AUTONOMOUS',
    state: 'All India',
    description: 'Entry-level examination for the Chartered Accountancy course in India.',
    eligibility: 'Passed Class 12th examination.',
    target_courses: ['Chartered Accountancy']
  },
  
  // ==========================================
  // AFTER DEGREE (POSTGRADUATE & PROFESSIONAL)
  // ==========================================
  // Management
  {
    canonical_slug: 'cat',
    exam_name: 'Common Admission Test',
    short_name: 'CAT',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Management'],
    conducting_body: 'IIMs',
    ownership: 'AUTONOMOUS',
    state: 'All India',
    description: 'National-level management aptitude test for admission to MBA/PGDM programs in IIMs and other top B-schools.',
    eligibility: 'Bachelor\'s degree with at least 50% marks or equivalent CGPA.',
    target_courses: ['MBA', 'PGDM']
  },
  {
    canonical_slug: 'xat',
    exam_name: 'Xavier Aptitude Test',
    short_name: 'XAT',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Management'],
    conducting_body: 'XLRI Jamshedpur',
    ownership: 'PRIVATE',
    state: 'All India',
    description: 'National-level management entrance examination for admission to XLRI and other associated institutes.',
    eligibility: 'Recognized Bachelor’s Degree of minimum three years duration or equivalent.',
    target_courses: ['MBA', 'PGDM']
  },
  // Engineering/Science
  {
    canonical_slug: 'gate',
    exam_name: 'Graduate Aptitude Test in Engineering',
    short_name: 'GATE',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['OTHER'], // B.E./B.Tech/B.Sc
    exam_categories: ['Engineering', 'Science'],
    conducting_body: 'IISc & IITs',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Examination that primarily tests the comprehensive understanding of various undergraduate subjects in engineering and science.',
    eligibility: 'Currently studying in the 3rd or higher years of any undergraduate degree program OR completed a government-approved degree.',
    target_courses: ['M.Tech', 'M.E.', 'Ph.D.', 'PSU Jobs']
  },
  // Government / Civil Services
  {
    canonical_slug: 'upsc-cse',
    exam_name: 'UPSC Civil Services Examination',
    short_name: 'UPSC CSE',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Civil Services', 'Government Jobs'],
    conducting_body: 'UPSC',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Nationwide competitive examination in India conducted for recruitment to various Civil Services of the Government of India, including IAS, IFS, and IPS.',
    eligibility: 'A degree from a recognized university.',
    target_courses: ['IAS', 'IPS', 'IFS', 'IRS']
  },
  {
    canonical_slug: 'ssc-cgl',
    exam_name: 'Staff Selection Commission Combined Graduate Level',
    short_name: 'SSC CGL',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Government Jobs'],
    conducting_body: 'SSC',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Examination conducted to recruit staff to various posts in ministries, departments and organizations of the Government of India.',
    eligibility: 'Bachelor’s degree in any discipline.',
    target_courses: ['Group B and C Government Posts']
  },
  {
    canonical_slug: 'ibps-po',
    exam_name: 'IBPS Probationary Officer',
    short_name: 'IBPS PO',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Banking'],
    conducting_body: 'IBPS',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Common Written Examination for recruitment of Probationary Officers/Management Trainees in participating public sector banks.',
    eligibility: 'A Degree (Graduation) in any discipline from a University recognized by the Govt Of India.',
    target_courses: ['Bank PO']
  },
  // PG Medical / Law
  {
    canonical_slug: 'neet-pg',
    exam_name: 'National Eligibility cum Entrance Test (Postgraduate)',
    short_name: 'NEET PG',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'MBBS Degree',
    streams: ['OTHER'],
    exam_categories: ['Medical'],
    conducting_body: 'NBE',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Single eligibility cum entrance examination for admission to MD/MS/PG Diploma courses.',
    eligibility: 'MBBS degree or Provisional MBBS Pass Certificate recognized as per the provisions of the Indian Medical Council Act.',
    target_courses: ['MD', 'MS', 'PG Diploma']
  },
  {
    canonical_slug: 'clat-pg',
    exam_name: 'Common Law Admission Test for LLM',
    short_name: 'CLAT PG',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'LLB Degree',
    streams: ['OTHER'],
    exam_categories: ['Law'],
    conducting_body: 'Consortium of NLUs',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Centralized national level entrance test for admissions to postgraduate degree program (LLM).',
    eligibility: 'LLB Degree or an equivalent examination with a minimum of 50% marks.',
    target_courses: ['LLM']
  },
  {
    canonical_slug: 'cuet-pg',
    exam_name: 'Common University Entrance Test (Postgraduate)',
    short_name: 'CUET PG',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['General', 'Science', 'Arts', 'Commerce'],
    conducting_body: 'NTA',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'National level entrance exam for admission to PG programs in Central and participating Universities.',
    eligibility: 'Bachelor\'s degree in relevant subject depending on the applied course.',
    target_courses: ['M.A.', 'M.Sc.', 'M.Com.', 'MCA', 'B.Ed.']
  }
];

const seedExams = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';
    console.log(`Connecting to database at ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log(`Starting to seed ${examsData.length} exams...`);

    let added = 0;
    let updated = 0;

    for (const examData of examsData) {
      const existing = await Exam.findOne({ canonical_slug: examData.canonical_slug });
      if (existing) {
        await Exam.updateOne({ canonical_slug: examData.canonical_slug }, { $set: examData });
        updated++;
        console.log(`Updated: ${examData.exam_name}`);
      } else {
        await Exam.create(examData);
        added++;
        console.log(`Added: ${examData.exam_name}`);
      }
    }

    console.log(`\nSeed Complete! Added: ${added}, Updated: ${updated}`);
    
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedExams();
