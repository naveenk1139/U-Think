import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const examSchema = new mongoose.Schema({}, { strict: false });
const Exam = mongoose.model('Exam', examSchema);

const examsData = [
  // ==========================================
  // KARNATAKA STATE EXAMS
  // ==========================================
  {
    canonical_slug: 'kcet',
    exam_name: 'Karnataka Common Entrance Test',
    short_name: 'KCET',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['PCM', 'PCB'],
    exam_categories: ['Engineering', 'Pharmacy', 'Agriculture'],
    conducting_body: 'KEA (Karnataka Examination Authority)',
    ownership: 'GOVERNMENT',
    state: 'Karnataka',
    description: 'State-level entrance exam for admission to Engineering, Pharmacy, Agriculture, and Veterinary courses in Karnataka.',
    eligibility: '12th standard pass with Physics, Chemistry, and Mathematics/Biology.',
    target_courses: ['B.Tech', 'B.Pharm', 'B.Sc Agriculture']
  },
  {
    canonical_slug: 'comedk-uget',
    exam_name: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
    short_name: 'COMEDK UGET',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['PCM'],
    exam_categories: ['Engineering'],
    conducting_body: 'COMEDK',
    ownership: 'PRIVATE',
    state: 'Karnataka',
    description: 'Entrance exam for undergraduate engineering courses in private engineering colleges in Karnataka.',
    eligibility: 'Passed 10+2 with Physics, Chemistry and Mathematics with a minimum of 45%.',
    target_courses: ['B.E.', 'B.Tech']
  },
  {
    canonical_slug: 'karnataka-pgcet',
    exam_name: 'Karnataka Post Graduate Common Entrance Test',
    short_name: 'Karnataka PGCET',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Management', 'Engineering', 'Computer Applications'],
    conducting_body: 'KEA',
    ownership: 'GOVERNMENT',
    state: 'Karnataka',
    description: 'State-level entrance test for admission to MBA, MCA, M.E., M.Tech, and M.Arch courses in Karnataka.',
    eligibility: 'Relevant Bachelor’s degree with a minimum of 50% marks.',
    target_courses: ['MBA', 'MCA', 'M.Tech', 'M.Arch']
  },
  {
    canonical_slug: 'kmat-karnataka',
    exam_name: 'Karnataka Management Aptitude Test',
    short_name: 'KMAT',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Management', 'Computer Applications'],
    conducting_body: 'KPPGCA',
    ownership: 'PRIVATE',
    state: 'Karnataka',
    description: 'Standardized test for admission to MBA/PGDM and MCA programs in AICTE approved university-affiliated colleges in Karnataka.',
    eligibility: 'Bachelor\'s degree with at least 50% marks.',
    target_courses: ['MBA', 'MCA']
  },
  {
    canonical_slug: 'kpsc-kas',
    exam_name: 'Karnataka Administrative Service',
    short_name: 'KPSC KAS',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Civil Services', 'Government Jobs'],
    conducting_body: 'KPSC',
    ownership: 'GOVERNMENT',
    state: 'Karnataka',
    description: 'Civil services exam for recruitment into various administrative positions within the Karnataka state government.',
    eligibility: 'Bachelor\'s degree from a recognized university.',
    target_courses: ['Group A and Group B State Services']
  },
  {
    canonical_slug: 'kartet',
    exam_name: 'Karnataka Teacher Eligibility Test',
    short_name: 'KARTET',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'D.Ed / B.Ed',
    streams: ['ANY_STREAM'],
    exam_categories: ['Teaching', 'Government Jobs'],
    conducting_body: 'Department of Public Instruction, Karnataka',
    ownership: 'GOVERNMENT',
    state: 'Karnataka',
    description: 'Eligibility test for candidates aspiring to become teachers in primary and upper primary schools in Karnataka.',
    eligibility: 'PUC with D.Ed for Primary, Degree with B.Ed for Upper Primary.',
    target_courses: ['Government Teacher']
  },

  // ==========================================
  // INTERNATIONAL EXAMS ("THE WORLD")
  // ==========================================
  {
    canonical_slug: 'sat',
    exam_name: 'Scholastic Assessment Test',
    short_name: 'SAT',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '10th/11th/12th',
    streams: ['ANY_STREAM'],
    exam_categories: ['International Undergraduate'],
    conducting_body: 'College Board',
    ownership: 'PRIVATE',
    state: 'International',
    description: 'Globally recognized college admission test that lets you show colleges what you know and how well you can apply that knowledge.',
    eligibility: 'No strict criteria, typically taken by high school students.',
    target_courses: ['Undergraduate programs in US, UK, Canada, etc.']
  },
  {
    canonical_slug: 'gre',
    exam_name: 'Graduate Record Examinations',
    short_name: 'GRE',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['International Postgraduate'],
    conducting_body: 'ETS',
    ownership: 'PRIVATE',
    state: 'International',
    description: 'Standardized test that is an admissions requirement for many graduate schools in the United States and Canada.',
    eligibility: 'Undergraduate degree.',
    target_courses: ['MS', 'Ph.D.', 'MBA (abroad)']
  },
  {
    canonical_slug: 'gmat',
    exam_name: 'Graduate Management Admission Test',
    short_name: 'GMAT',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['International Management'],
    conducting_body: 'GMAC',
    ownership: 'PRIVATE',
    state: 'International',
    description: 'Computer adaptive test intended to assess certain analytical, writing, quantitative, verbal, and reading skills in written English for use in admission to a graduate management program, such as MBA programs.',
    eligibility: 'Undergraduate degree.',
    target_courses: ['MBA', 'Masters in Finance/Management']
  },
  {
    canonical_slug: 'ielts',
    exam_name: 'International English Language Testing System',
    short_name: 'IELTS',
    status: 'ACTIVE',
    education_level: 'OTHER',
    minimum_education: 'None',
    streams: ['ANY_STREAM'],
    exam_categories: ['Language Proficiency'],
    conducting_body: 'British Council, IDP',
    ownership: 'PRIVATE',
    state: 'International',
    description: 'International standardized test of English language proficiency for non-native English language speakers.',
    eligibility: 'Anyone planning to study, work, or migrate to English-speaking countries.',
    target_courses: ['Study Abroad', 'Immigration']
  },
  {
    canonical_slug: 'toefl',
    exam_name: 'Test of English as a Foreign Language',
    short_name: 'TOEFL',
    status: 'ACTIVE',
    education_level: 'OTHER',
    minimum_education: 'None',
    streams: ['ANY_STREAM'],
    exam_categories: ['Language Proficiency'],
    conducting_body: 'ETS',
    ownership: 'PRIVATE',
    state: 'International',
    description: 'Standardized test to measure the English language ability of non-native speakers wishing to enroll in English-speaking universities.',
    eligibility: 'Anyone applying to English-speaking universities.',
    target_courses: ['Study Abroad']
  },

  // ==========================================
  // MORE ALL-INDIA EXAMS (Comprehensive)
  // ==========================================
  {
    canonical_slug: 'cmat',
    exam_name: 'Common Management Admission Test',
    short_name: 'CMAT',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Management'],
    conducting_body: 'NTA',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'National Level Entrance Examination for admission to management programs in the country.',
    eligibility: 'Bachelor’s Degree in any discipline.',
    target_courses: ['MBA', 'PGDM']
  },
  {
    canonical_slug: 'uceed',
    exam_name: 'Undergraduate Common Entrance Examination for Design',
    short_name: 'UCEED',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['ANY_STREAM'],
    exam_categories: ['Design'],
    conducting_body: 'IIT Bombay',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Entrance exam for admission to the Bachelor of Design (B.Des) programs at IITs and IIITDM.',
    eligibility: 'Passed Class 12 (or equivalent) in any stream.',
    target_courses: ['B.Des']
  },
  {
    canonical_slug: 'nchm-jee',
    exam_name: 'National Council for Hotel Management Joint Entrance Examination',
    short_name: 'NCHM JEE',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['ANY_STREAM'],
    exam_categories: ['Hospitality', 'Hotel Management'],
    conducting_body: 'NTA',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'National level entrance exam for admission to B.Sc. Course in Hospitality and Hotel Administration.',
    eligibility: 'Passed 10+2 system of Senior Secondary examination or its equivalent with English as one of the subjects.',
    target_courses: ['B.Sc. HHA']
  },
  {
    canonical_slug: 'ugc-net',
    exam_name: 'UGC National Eligibility Test',
    short_name: 'UGC NET',
    status: 'ACTIVE',
    education_level: 'POSTGRADUATE',
    minimum_education: 'Master\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Teaching', 'Research'],
    conducting_body: 'NTA',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Test to determine the eligibility for the post of Assistant Professor and/or Junior Research Fellowship award in Indian universities and colleges.',
    eligibility: 'Master’s Degree or equivalent with at least 55% marks.',
    target_courses: ['Assistant Professor', 'JRF', 'Ph.D.']
  },
  {
    canonical_slug: 'afcat',
    exam_name: 'Air Force Common Admission Test',
    short_name: 'AFCAT',
    status: 'ACTIVE',
    education_level: 'AFTER_DEGREE',
    minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM', 'PCM'],
    exam_categories: ['Defense', 'Government Jobs'],
    conducting_body: 'Indian Air Force',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Entrance exam conducted by the Indian Air Force to select candidates for Class-I Gazetted Officers in Flying and Ground Duties (Technical and Non-Technical).',
    eligibility: 'Graduation in any discipline with a minimum of 60% marks and passed Physics and Maths at 10+2 level.',
    target_courses: ['IAF Commissioned Officer']
  },
  {
    canonical_slug: 'rrb-ntpc',
    exam_name: 'Railway Recruitment Board Non-Technical Popular Categories',
    short_name: 'RRB NTPC',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH', // Some posts after 12th, some after degree
    minimum_education: '12th Pass / Bachelor\'s Degree',
    streams: ['ANY_STREAM'],
    exam_categories: ['Railways', 'Government Jobs'],
    conducting_body: 'RRB',
    ownership: 'GOVERNMENT',
    state: 'All India',
    description: 'Exam for recruiting candidates for various Non-Technical Popular Categories posts in Zonal Railways and Production Units of Indian Railways.',
    eligibility: '12th Pass or Bachelor’s degree depending on the post.',
    target_courses: ['Station Master', 'Goods Guard', 'Clerk', 'Commercial Apprentice']
  },
  // Other States
  {
    canonical_slug: 'mht-cet',
    exam_name: 'Maharashtra Health and Technical Common Entrance Test',
    short_name: 'MHT CET',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['PCM', 'PCB'],
    exam_categories: ['Engineering', 'Pharmacy'],
    conducting_body: 'State Common Entrance Test Cell, Maharashtra',
    ownership: 'GOVERNMENT',
    state: 'Maharashtra',
    description: 'State-level entrance exam in Maharashtra for admission to B.E./B.Tech, B.Pharm, and Pharm.D courses.',
    eligibility: 'Passed 10+2 with Physics, Chemistry, and Mathematics/Biology.',
    target_courses: ['B.Tech', 'B.Pharm']
  },
  {
    canonical_slug: 'ts-eamcet',
    exam_name: 'Telangana State Engineering, Agriculture & Medical Common Entrance Test',
    short_name: 'TS EAMCET',
    status: 'ACTIVE',
    education_level: 'AFTER_12TH',
    minimum_education: '12th Pass',
    streams: ['PCM', 'PCB'],
    exam_categories: ['Engineering', 'Medical', 'Agriculture'],
    conducting_body: 'JNTU Hyderabad',
    ownership: 'GOVERNMENT',
    state: 'Telangana',
    description: 'Entrance exam for admission to various undergraduate professional courses in Telangana state colleges.',
    eligibility: 'Passed 10+2 with appropriate science subjects.',
    target_courses: ['B.Tech', 'B.Sc Agriculture', 'B.Pharm']
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
