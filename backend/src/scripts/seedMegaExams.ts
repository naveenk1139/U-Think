import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exam from '../models/Exam.js';
import ExamYear from '../models/ExamYear.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/uthink';

const seedExams = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clean up existing data for idempotency
    try {
      await Exam.collection.dropIndexes();
    } catch(e) {
      console.log('Indexes drop warning:', e);
    }
    await Exam.deleteMany({});
    await ExamYear.deleteMany({});
    
    console.log('Cleared existing Exam data...');

    const examsToSeed = [
      {
        canonical_slug: 'jee-main',
        exam_name: 'Joint Entrance Examination (Main)',
        short_name: 'JEE Main',
        status: 'ACTIVE',
        education_level: 'AFTER_12TH',
        minimum_education: 'Class 12th Pass or appearing',
        streams: ['PCM'],
        exam_categories: ['ENGINEERING', 'ARCHITECTURE'],
        exam_type: 'Entrance Exam',
        ownership: 'GOVERNMENT',
        conducting_body: 'National Testing Agency (NTA)',
        official_website: 'https://jeemain.nta.ac.in/',
        official_application_url: 'https://jeemain.nta.ac.in/',
        description: 'JEE Main is a national level entrance exam conducted for admission to NITs, IIITs, CFTIs, and other participating engineering institutions.',
        eligibility: 'Must have passed Class 12 with Physics, Mathematics, and one of Chemistry/Biology/Biotechnology/Technical Vocational subject.',
        attempt_limit: 3,
        exam_mode: ['Computer Based Test (CBT)'],
        exam_frequency: 'Twice a year',
        target_courses: ['B.Tech', 'B.E.', 'B.Arch', 'B.Planning'],
        target_degrees: ['Bachelor of Technology', 'Bachelor of Architecture'],
        verification_status: 'VERIFIED',
        source_name: 'NTA Official Website',
        source_url: 'https://jeemain.nta.ac.in/',
        years: [
          {
            year: 2026,
            registration_start: new Date('2025-11-01'),
            registration_end: new Date('2025-11-30'),
            exam_start: new Date('2026-01-24'),
            exam_end: new Date('2026-02-01'),
            status: 'EXPECTED',
            source_name: 'Historical Pattern'
          }
        ]
      },
      {
        canonical_slug: 'neet-ug',
        exam_name: 'National Eligibility cum Entrance Test (Undergraduate)',
        short_name: 'NEET UG',
        status: 'ACTIVE',
        education_level: 'AFTER_12TH',
        minimum_education: 'Class 12th Pass or appearing with PCB',
        streams: ['PCB'],
        exam_categories: ['MEDICAL', 'DENTAL', 'AYUSH', 'NURSING'],
        exam_type: 'Entrance Exam',
        ownership: 'GOVERNMENT',
        conducting_body: 'National Testing Agency (NTA)',
        official_website: 'https://exams.nta.ac.in/NEET/',
        official_application_url: 'https://exams.nta.ac.in/NEET/',
        description: 'NEET UG is the single national level medical entrance exam for admission to MBBS, BDS, BAMS, BHMS, and BSMS courses in Indian medical colleges.',
        eligibility: 'Must have passed Class 12 with Physics, Chemistry, Biology/Biotechnology, and English with minimum 50% aggregate (for UR category).',
        age_min: 17,
        attempt_limit: 0, // No limit
        exam_mode: ['Pen and Paper based (Offline)'],
        exam_frequency: 'Once a year',
        target_courses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Sc Nursing'],
        target_degrees: ['Bachelor of Medicine', 'Bachelor of Surgery', 'Bachelor of Dental Surgery'],
        verification_status: 'VERIFIED',
        source_name: 'NTA NEET Official',
        source_url: 'https://exams.nta.ac.in/NEET/',
        years: [
          {
            year: 2026,
            registration_start: new Date('2026-02-09'),
            registration_end: new Date('2026-03-09'),
            exam_start: new Date('2026-05-03'),
            status: 'EXPECTED',
            source_name: 'Historical Pattern'
          }
        ]
      },
      {
        canonical_slug: 'cuet-ug',
        exam_name: 'Common University Entrance Test (Undergraduate)',
        short_name: 'CUET UG',
        status: 'ACTIVE',
        education_level: 'AFTER_12TH',
        minimum_education: 'Class 12th Pass or appearing',
        streams: ['ANY_STREAM', 'ARTS', 'COMMERCE', 'HUMANITIES', 'PCM', 'PCB'],
        exam_categories: ['ARTS', 'COMMERCE', 'SCIENCE', 'HUMANITIES', 'MANAGEMENT'],
        exam_type: 'Entrance Exam',
        ownership: 'GOVERNMENT',
        conducting_body: 'National Testing Agency (NTA)',
        official_website: 'https://exams.nta.ac.in/CUET-UG/',
        official_application_url: 'https://exams.nta.ac.in/CUET-UG/',
        description: 'CUET UG is conducted for admission into all UG Programmes in all Central Universities, State Universities, Deemed Universities, and Private Universities.',
        eligibility: 'Must have passed Class 12. Subject requirements vary by university and specific course chosen.',
        exam_mode: ['Computer Based Test (CBT)', 'Pen & Paper'],
        exam_frequency: 'Once a year',
        target_courses: ['B.A.', 'B.Sc', 'B.Com', 'BBA'],
        target_degrees: ['Bachelor of Arts', 'Bachelor of Science', 'Bachelor of Commerce'],
        verification_status: 'VERIFIED',
        source_name: 'NTA CUET Official',
        source_url: 'https://exams.nta.ac.in/CUET-UG/',
        years: [
          {
            year: 2026,
            registration_start: new Date('2026-02-27'),
            registration_end: new Date('2026-03-26'),
            exam_start: new Date('2026-05-15'),
            exam_end: new Date('2026-05-31'),
            status: 'EXPECTED',
            source_name: 'Historical Pattern'
          }
        ]
      },
      {
        canonical_slug: 'gate',
        exam_name: 'Graduate Aptitude Test in Engineering',
        short_name: 'GATE',
        status: 'ACTIVE',
        education_level: 'AFTER_DEGREE',
        minimum_education: 'Bachelor\'s Degree',
        streams: ['PCM'],
        exam_categories: ['ENGINEERING', 'SCIENCE', 'ARCHITECTURE'],
        exam_type: 'Entrance Exam',
        ownership: 'GOVERNMENT',
        conducting_body: 'IISc and seven IITs on behalf of NCB-GATE, Department of Higher Education',
        official_website: 'https://gate2025.iitr.ac.in/', // Changes yearly, using latest known
        description: 'GATE is a national level exam that primarily tests the comprehensive understanding of various undergraduate subjects in engineering and science.',
        eligibility: 'Currently studying in 3rd or higher years of any undergraduate degree program OR has already completed any government approved degree program in Engineering / Technology / Architecture / Science / Commerce / Arts.',
        attempt_limit: 0,
        exam_mode: ['Computer Based Test (CBT)'],
        exam_frequency: 'Once a year',
        target_courses: ['M.Tech', 'M.E.', 'Ph.D'],
        target_degrees: ['Master of Technology', 'Doctor of Philosophy'],
        verification_status: 'VERIFIED',
        source_name: 'GATE Official',
        source_url: 'https://gate2025.iitr.ac.in/',
        years: [
          {
            year: 2026,
            registration_start: new Date('2025-08-24'),
            registration_end: new Date('2025-09-26'),
            exam_start: new Date('2026-02-07'),
            exam_end: new Date('2026-02-15'),
            status: 'EXPECTED',
            source_name: 'Historical Pattern'
          }
        ]
      },
      {
        canonical_slug: 'ca-foundation',
        exam_name: 'Chartered Accountancy Foundation Examination',
        short_name: 'CA Foundation',
        status: 'ACTIVE',
        education_level: 'AFTER_12TH',
        minimum_education: 'Class 12th Pass or appearing',
        streams: ['COMMERCE', 'ANY_STREAM'],
        exam_categories: ['COMMERCE', 'PROFESSIONAL', 'FINANCE'],
        exam_type: 'Professional Qualification',
        ownership: 'OTHER',
        conducting_body: 'Institute of Chartered Accountants of India (ICAI)',
        official_website: 'https://www.icai.org/',
        official_application_url: 'https://eservices.icai.org/',
        description: 'CA Foundation is the entry-level examination for the Chartered Accountancy course in India.',
        eligibility: 'Candidate must have passed the Class 12th examinations from a recognized board. Students from any stream can apply.',
        exam_mode: ['Pen and Paper based (Offline)'],
        exam_frequency: 'Three times a year',
        target_courses: ['CA Intermediate'],
        target_degrees: ['Chartered Accountant'],
        verification_status: 'VERIFIED',
        source_name: 'ICAI Official',
        source_url: 'https://www.icai.org/',
        years: [
          {
            year: 2026,
            exam_start: new Date('2026-01-01'), // Dates vary widely, using a placeholder logic for expected logic
            status: 'NOT_ANNOUNCED',
            source_name: 'Historical Pattern'
          }
        ]
      },
      {
        canonical_slug: 'clat',
        exam_name: 'Common Law Admission Test',
        short_name: 'CLAT',
        status: 'ACTIVE',
        education_level: 'AFTER_12TH',
        minimum_education: 'Class 12th Pass or appearing',
        streams: ['ANY_STREAM'],
        exam_categories: ['LAW'],
        exam_type: 'Entrance Exam',
        ownership: 'AUTONOMOUS',
        conducting_body: 'Consortium of National Law Universities',
        official_website: 'https://consortiumofnlus.ac.in/',
        official_application_url: 'https://consortiumofnlus.ac.in/',
        description: 'CLAT is a national level entrance exam for admissions to undergraduate and postgraduate law programmes offered by 24 National Law Universities in India.',
        eligibility: 'Candidates must have passed 10+2 with a minimum of 45% marks (40% for SC/ST).',
        exam_mode: ['Pen and Paper based (Offline)'],
        exam_frequency: 'Once a year',
        target_courses: ['BA LLB', 'BBA LLB', 'B.Com LLB'],
        target_degrees: ['Bachelor of Laws'],
        verification_status: 'VERIFIED',
        source_name: 'CLAT Consortium Official',
        source_url: 'https://consortiumofnlus.ac.in/',
        years: [
          {
            year: 2026,
            registration_start: new Date('2025-07-01'),
            registration_end: new Date('2025-11-03'),
            exam_start: new Date('2025-12-07'), // CLAT for year X usually happens in December of year X-1
            status: 'EXPECTED',
            source_name: 'Historical Pattern'
          }
        ]
      },
      {
        canonical_slug: 'upsc-cse',
        exam_name: 'UPSC Civil Services Examination',
        short_name: 'UPSC CSE',
        status: 'ACTIVE',
        education_level: 'AFTER_DEGREE',
        minimum_education: 'Bachelor\'s Degree',
        streams: ['ANY_STREAM'],
        exam_categories: ['GOVERNMENT', 'OTHER'],
        exam_type: 'Government Recruitment',
        ownership: 'GOVERNMENT',
        conducting_body: 'Union Public Service Commission (UPSC)',
        official_website: 'https://upsc.gov.in/',
        official_application_url: 'https://upsconline.nic.in/',
        description: 'The Civil Services Examination is a nationwide competitive examination in India conducted by UPSC for recruitment to various Civil Services of the Government of India, including IAS, IFS, and IPS.',
        eligibility: 'Must hold a degree from a recognised University or possess an equivalent qualification.',
        age_min: 21,
        age_max: 32,
        attempt_limit: 6, // for General category
        exam_mode: ['Pen and Paper based (Offline)'],
        exam_frequency: 'Once a year',
        target_courses: [],
        target_degrees: [],
        verification_status: 'VERIFIED',
        source_name: 'UPSC Official',
        source_url: 'https://upsc.gov.in/',
        years: [
          {
            year: 2026,
            registration_start: new Date('2026-02-10'),
            registration_end: new Date('2026-03-05'),
            exam_start: new Date('2026-05-24'), // Prelims usually end of May
            status: 'EXPECTED',
            source_name: 'Historical Pattern'
          }
        ]
      },
      {
        canonical_slug: 'ssc-cgl',
        exam_name: 'Staff Selection Commission - Combined Graduate Level',
        short_name: 'SSC CGL',
        status: 'ACTIVE',
        education_level: 'AFTER_DEGREE',
        minimum_education: 'Bachelor\'s Degree',
        streams: ['ANY_STREAM'],
        exam_categories: ['GOVERNMENT', 'OTHER'],
        exam_type: 'Government Recruitment',
        ownership: 'GOVERNMENT',
        conducting_body: 'Staff Selection Commission (SSC)',
        official_website: 'https://ssc.nic.in/',
        official_application_url: 'https://ssc.nic.in/',
        description: 'SSC CGL is conducted to recruit staff to various posts in ministries, departments and organisations of the Government of India.',
        eligibility: 'Must hold a degree from a recognised University.',
        age_min: 18,
        age_max: 32, // varies by post
        exam_mode: ['Computer Based Test (CBT)'],
        exam_frequency: 'Once a year',
        target_courses: [],
        target_degrees: [],
        verification_status: 'VERIFIED',
        source_name: 'SSC Official',
        source_url: 'https://ssc.nic.in/',
        years: [
          {
            year: 2026,
            status: 'NOT_ANNOUNCED',
            source_name: 'Historical Pattern'
          }
        ]
      },
      {
        canonical_slug: 'nda',
        exam_name: 'National Defence Academy & Naval Academy Examination',
        short_name: 'NDA',
        status: 'ACTIVE',
        education_level: 'AFTER_12TH',
        minimum_education: 'Class 12th Pass or appearing',
        streams: ['PCM', 'ANY_STREAM'], // Army wing allows any stream, Air Force/Naval requires PCM
        exam_categories: ['DEFENCE', 'GOVERNMENT'],
        exam_type: 'Entrance Exam',
        ownership: 'GOVERNMENT',
        conducting_body: 'Union Public Service Commission (UPSC)',
        official_website: 'https://upsc.gov.in/',
        official_application_url: 'https://upsconline.nic.in/',
        description: 'NDA examination is conducted for admission to the Army, Navy and Air Force wings of the NDA and Indian Naval Academy Course.',
        eligibility: 'For Army Wing: Class 12 pass. For Air Force/Naval Wings: Class 12 pass with Physics, Chemistry and Mathematics.',
        age_min: 16.5,
        age_max: 19.5,
        exam_mode: ['Pen and Paper based (Offline)'],
        exam_frequency: 'Twice a year (NDA I and NDA II)',
        target_courses: ['B.A.', 'B.Sc', 'B.Tech'],
        target_degrees: ['Bachelor of Arts', 'Bachelor of Science', 'Bachelor of Technology'],
        verification_status: 'VERIFIED',
        source_name: 'UPSC Official',
        source_url: 'https://upsc.gov.in/',
        years: [
          {
            year: 2026, // For NDA 1
            registration_start: new Date('2025-12-20'),
            registration_end: new Date('2026-01-09'),
            exam_start: new Date('2026-04-19'),
            status: 'EXPECTED',
            source_name: 'Historical Pattern'
          }
        ]
      }
    ];

    for (const examData of examsToSeed) {
      const { years, ...baseData } = examData;
      
      const exam = new Exam({
        ...baseData,
        last_verified_at: new Date()
      });
      await exam.save();
      
      if (years && years.length > 0) {
        for (const yearData of years) {
          const examYear = new ExamYear({
            exam_id: exam._id,
            ...yearData,
            last_verified_at: new Date()
          });
          await examYear.save();
        }
      }
    }

    console.log(`✅ Seeded ${examsToSeed.length} Exams successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding exams:', error);
    process.exit(1);
  }
};

seedExams();
