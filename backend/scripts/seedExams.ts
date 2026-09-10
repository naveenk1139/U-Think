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

const generateDates = (offsetMonths) => {
  const base = new Date();
  base.setMonth(base.getMonth() + offsetMonths);
  return {
    registration_start: new Date(base.getTime() - 60 * 24 * 60 * 60 * 1000),
    registration_end: new Date(base.getTime() - 30 * 24 * 60 * 60 * 1000),
    exam_start: base,
    result_date: new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000)
  };
};

const examsList = [
  // ================= ENGINEERING =================
  {
    canonical_slug: 'jee-main', exam_name: 'Joint Entrance Examination (Main)', short_name: 'JEE Main',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass or appearing',
    streams: ['PCM'], exam_categories: ['Engineering', 'Architecture'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Testing Agency (NTA)', state: 'All India',
    applicable_states: ['All India'],
    official_website: 'https://jeemain.nta.ac.in/', official_application_url: 'https://jeemain.nta.ac.in/',
    description: 'JEE Main is a national level entrance exam conducted for admission to NITs, IIITs, CFTIs, and other participating engineering institutions.',
    eligibility: 'Must have passed Class 12 with Physics, Mathematics, and one of Chemistry/Biology/Biotechnology/Technical Vocational subject.',
    attempt_limit: 3, exam_mode: ['Online'], exam_frequency: 'Twice a year', fees: '1000 INR (Gen Male)', duration: '3 Hours',
    target_courses: ['B.Tech', 'B.E.', 'B.Arch', 'B.Planning'], verification_status: 'VERIFIED', officialSource: 'NTA'
  },
  {
    canonical_slug: 'jee-advanced', exam_name: 'Joint Entrance Examination (Advanced)', short_name: 'JEE Advanced',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM'], exam_categories: ['Engineering', 'Architecture'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'IITs on behalf of JAB', state: 'All India',
    official_website: 'https://jeeadv.ac.in/', official_application_url: 'https://jeeadv.ac.in/',
    description: 'JEE Advanced is the sole admission test for undergraduate programs at all Indian Institutes of Technology (IITs).',
    eligibility: 'Must be among the top 2.5 lakh successful candidates in B.E./B.Tech. paper of JEE (Main).',
    attempt_limit: 2, exam_mode: ['Online'], exam_frequency: 'Once a year', fees: '3200 INR', duration: '6 Hours (2 Papers)',
    target_courses: ['B.Tech', 'B.S.', 'B.Arch', 'Dual Degree'], verification_status: 'VERIFIED', officialSource: 'IIT JAB'
  },
  {
    canonical_slug: 'bitsat', exam_name: 'BITS Admission Test', short_name: 'BITSAT',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'], exam_categories: ['Engineering', 'Pharmacy'], exam_type: 'Entrance Exam',
    ownership: 'PRIVATE', conducting_body: 'BITS Pilani', state: 'All India',
    official_website: 'https://bitsadmission.com/', official_application_url: 'https://bitsadmission.com/',
    eligibility: 'Passed 12th with minimum 75% aggregate marks in PCM/PCB.',
    exam_mode: ['Online'], exam_frequency: 'Twice a year', target_courses: ['B.E.', 'B.Pharm'], verification_status: 'VERIFIED', officialSource: 'BITS Pilani'
  },
  {
    canonical_slug: 'viteee', exam_name: 'Vellore Institute of Technology Engineering Entrance Examination', short_name: 'VITEEE',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'], exam_categories: ['Engineering'], exam_type: 'Entrance Exam',
    ownership: 'PRIVATE', conducting_body: 'VIT', state: 'All India',
    official_website: 'https://viteee.vit.ac.in/', official_application_url: 'https://viteee.vit.ac.in/',
    eligibility: 'Minimum 60% in Physics, Chemistry, and Mathematics/Biology in Class 12.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['B.Tech'], verification_status: 'VERIFIED', officialSource: 'VIT'
  },
  {
    canonical_slug: 'srmjeee', exam_name: 'SRM Joint Engineering Entrance Examination', short_name: 'SRMJEEE',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'], exam_categories: ['Engineering'], exam_type: 'Entrance Exam',
    ownership: 'PRIVATE', conducting_body: 'SRM Institute of Science and Technology', state: 'All India',
    official_website: 'https://applications.srmist.edu.in/', official_application_url: 'https://applications.srmist.edu.in/',
    eligibility: 'Passed 10+2 with minimum 60% aggregate in PCM/PCB.',
    exam_mode: ['Online'], exam_frequency: 'Multiple phases', target_courses: ['B.Tech'], verification_status: 'VERIFIED', officialSource: 'SRM'
  },
  {
    canonical_slug: 'comedk-uget', exam_name: 'COMEDK UGET', short_name: 'COMEDK',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM'], exam_categories: ['Engineering'], exam_type: 'Entrance Exam',
    ownership: 'PRIVATE', conducting_body: 'COMEDK', state: 'Karnataka',
    official_website: 'https://www.comedk.org/', official_application_url: 'https://www.comedk.org/',
    eligibility: 'Passed 12th std/PUC with minimum 45% marks in PCM.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['B.E.', 'B.Tech'], verification_status: 'VERIFIED', officialSource: 'COMEDK'
  },
  {
    canonical_slug: 'kcet', exam_name: 'Karnataka Common Entrance Test', short_name: 'KCET',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'], exam_categories: ['Engineering', 'Agriculture', 'Pharmacy'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Karnataka Examinations Authority (KEA)', state: 'Karnataka',
    official_website: 'https://cetonline.karnataka.gov.in/kea/', official_application_url: 'https://cetonline.karnataka.gov.in/kea/',
    eligibility: 'Pass in 2nd PUC / 12th standard with Physics, Mathematics, and one optional subject.',
    exam_mode: ['Offline'], exam_frequency: 'Once a year', target_courses: ['B.Tech', 'B.Pharm', 'B.Sc. Agriculture', 'B.V.Sc'], verification_status: 'VERIFIED', officialSource: 'KEA'
  },
  {
    canonical_slug: 'mht-cet', exam_name: 'Maharashtra Health and Technical Common Entrance Test', short_name: 'MHT CET',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'], exam_categories: ['Engineering', 'Pharmacy', 'Agriculture'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'State Common Entrance Test Cell, Maharashtra', state: 'Maharashtra',
    official_website: 'https://cetcell.mahacet.org/', official_application_url: 'https://cetcell.mahacet.org/',
    eligibility: 'Passed HSC or equivalent examination with Physics and Mathematics/Biology.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'Mah CET Cell'
  },
  {
    canonical_slug: 'wbjee', exam_name: 'West Bengal Joint Entrance Examinations', short_name: 'WBJEE',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM'], exam_categories: ['Engineering', 'Pharmacy', 'Architecture'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'WBJEEB', state: 'West Bengal',
    official_website: 'https://wbjeeb.nic.in/', official_application_url: 'https://wbjeeb.nic.in/',
    eligibility: 'Passed 10+2 with Physics and Mathematics along with any one of Chemistry/Biotechnology/Biology/Computer Science/Computer Application as compulsory subjects.',
    exam_mode: ['Offline'], exam_frequency: 'Once a year', target_courses: ['B.Tech', 'B.Pharm', 'B.Arch'], verification_status: 'VERIFIED', officialSource: 'WBJEEB'
  },
  {
    canonical_slug: 'keam', exam_name: 'Kerala Engineering Architecture Medical', short_name: 'KEAM',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'], exam_categories: ['Engineering', 'Pharmacy', 'Architecture', 'Medical'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'CEE Kerala', state: 'Kerala',
    official_website: 'https://cee.kerala.gov.in/', official_application_url: 'https://cee.kerala.gov.in/',
    eligibility: 'Passed Higher Secondary Examination, Kerala, or equivalent.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['B.Tech', 'B.Arch', 'B.Pharm', 'MBBS (Via NEET)'], verification_status: 'VERIFIED', officialSource: 'CEE Kerala'
  },
  {
    canonical_slug: 'ap-eapcet', exam_name: 'Andhra Pradesh Engineering, Agriculture and Pharmacy Common Entrance Test', short_name: 'AP EAPCET',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'], exam_categories: ['Engineering', 'Agriculture', 'Pharmacy'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'JNTU Kakinada on behalf of APSCHE', state: 'Andhra Pradesh',
    official_website: 'https://cets.apsche.ap.gov.in/', official_application_url: 'https://cets.apsche.ap.gov.in/',
    eligibility: 'Passed 10+2 or equivalent with Physics, Mathematics, and Chemistry/Biology.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['B.Tech', 'B.Pharm', 'B.Sc Agriculture'], verification_status: 'VERIFIED', officialSource: 'APSCHE'
  },
  {
    canonical_slug: 'gate', exam_name: 'Graduate Aptitude Test in Engineering', short_name: 'GATE',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['PCM'], exam_categories: ['Engineering', 'Science', 'Architecture'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'IITs/IISc', state: 'All India',
    official_website: 'https://gate.iitk.ac.in/', official_application_url: 'https://gate.iitk.ac.in/',
    description: 'GATE is a national level exam that primarily tests the comprehensive understanding of various undergraduate subjects in engineering and science.',
    eligibility: 'Currently studying in 3rd or higher years of any undergraduate degree program.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['M.Tech', 'M.E.', 'Ph.D'], verification_status: 'VERIFIED', officialSource: 'IIT'
  },

  // ================= MEDICAL & HEALTH SCIENCES =================
  {
    canonical_slug: 'neet-ug', exam_name: 'National Eligibility cum Entrance Test (Undergraduate)', short_name: 'NEET UG',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass with PCB',
    streams: ['PCB'], exam_categories: ['Medical', 'Dental', 'AYUSH', 'Nursing'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Testing Agency (NTA)', state: 'All India',
    official_website: 'https://exams.nta.ac.in/NEET/', official_application_url: 'https://exams.nta.ac.in/NEET/',
    eligibility: 'Must have passed Class 12 with Physics, Chemistry, Biology/Biotechnology, and English with minimum 50% aggregate (for UR category).',
    age_min: 17, exam_mode: ['Offline'], exam_frequency: 'Once a year', target_courses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Sc Nursing'], verification_status: 'VERIFIED', officialSource: 'NTA'
  },
  {
    canonical_slug: 'neet-pg', exam_name: 'National Eligibility cum Entrance Test (Postgraduate)', short_name: 'NEET PG',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'MBBS Degree',
    streams: ['OTHER'], exam_categories: ['Medical'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Board of Examinations (NBE)', state: 'All India',
    official_website: 'https://nbe.edu.in/', official_application_url: 'https://nbe.edu.in/',
    eligibility: 'MBBS degree or Provisional MBBS Pass Certificate recognized by NMC and completed 1 year of internship.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['MD', 'MS', 'PG Diploma'], verification_status: 'VERIFIED', officialSource: 'NBEMS'
  },
  {
    canonical_slug: 'neet-ss', exam_name: 'National Eligibility cum Entrance Test (Super Speciality)', short_name: 'NEET SS',
    status: 'ACTIVE', education_level: 'POSTGRADUATE', minimum_education: 'MD/MS/DNB Degree',
    streams: ['OTHER'], exam_categories: ['Medical'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Board of Examinations (NBE)', state: 'All India',
    official_website: 'https://nbe.edu.in/', official_application_url: 'https://nbe.edu.in/',
    eligibility: 'Postgraduate degree (MD/MS/DNB) in a relevant specialty.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['DM', 'MCh'], verification_status: 'VERIFIED', officialSource: 'NBEMS'
  },
  {
    canonical_slug: 'ini-cet', exam_name: 'Institute of National Importance Combined Entrance Test', short_name: 'INI-CET',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'MBBS Degree',
    streams: ['OTHER'], exam_categories: ['Medical'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'AIIMS, New Delhi', state: 'All India',
    official_website: 'https://aiimsexams.ac.in/', official_application_url: 'https://aiimsexams.ac.in/',
    eligibility: 'MBBS degree recognized by NMC with 55% aggregate marks and completed 12 months compulsory rotating internship.',
    exam_mode: ['Online'], exam_frequency: 'Twice a year', target_courses: ['MD', 'MS', 'MDS', 'DM', 'MCh'], verification_status: 'VERIFIED', officialSource: 'AIIMS'
  },

  // ================= UNIVERSITY / UG =================
  {
    canonical_slug: 'cuet-ug', exam_name: 'Common University Entrance Test (Undergraduate)', short_name: 'CUET UG',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM', 'ARTS', 'COMMERCE', 'HUMANITIES', 'PCM', 'PCB'], exam_categories: ['University', 'Arts', 'Commerce', 'Science', 'Humanities', 'Management'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Testing Agency (NTA)', state: 'All India',
    official_website: 'https://exams.nta.ac.in/CUET-UG/', official_application_url: 'https://exams.nta.ac.in/CUET-UG/',
    eligibility: 'Must have passed Class 12. Subject requirements vary by university and specific course chosen.',
    exam_mode: ['Online', 'Offline'], exam_frequency: 'Once a year', target_courses: ['B.A.', 'B.Sc', 'B.Com', 'BBA', 'Integrated M.A.'], verification_status: 'VERIFIED', officialSource: 'NTA'
  },
  {
    canonical_slug: 'cuet-pg', exam_name: 'Common University Entrance Test (Postgraduate)', short_name: 'CUET PG',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['University', 'Arts', 'Commerce', 'Science', 'Humanities', 'Management'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Testing Agency (NTA)', state: 'All India',
    official_website: 'https://pgcuet.samarth.ac.in/', official_application_url: 'https://pgcuet.samarth.ac.in/',
    eligibility: 'Bachelor\'s Degree in relevant discipline.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['M.A.', 'M.Sc', 'M.Com', 'MBA', 'MCA'], verification_status: 'VERIFIED', officialSource: 'NTA'
  },

  // ================= SCIENCE & RESEARCH =================
  {
    canonical_slug: 'iiser-aptitude-test', exam_name: 'IISER Aptitude Test', short_name: 'IAT',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'], exam_categories: ['Science', 'Research'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'IISERs', state: 'All India',
    official_website: 'https://iiseradmission.in/', official_application_url: 'https://iiseradmission.in/',
    eligibility: 'Passed Class 12 with science stream (at least 3 subjects from Physics, Chemistry, Mathematics, Biology).',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['BS-MS Dual Degree', 'BS Degree'], verification_status: 'VERIFIED', officialSource: 'IISER'
  },
  {
    canonical_slug: 'nest', exam_name: 'National Entrance Screening Test', short_name: 'NEST',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'], exam_categories: ['Science', 'Research'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'NISER Bhubaneswar and UM-DAE CEBS', state: 'All India',
    official_website: 'https://www.nestexam.in/', official_application_url: 'https://www.nestexam.in/',
    eligibility: 'Passed 12th standard or equivalent with at least 60% marks in aggregate.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['Integrated M.Sc.'], verification_status: 'VERIFIED', officialSource: 'NISER'
  },
  {
    canonical_slug: 'csir-net', exam_name: 'Joint CSIR-UGC NET', short_name: 'CSIR NET',
    status: 'ACTIVE', education_level: 'POSTGRADUATE', minimum_education: 'Master\'s Degree in Science',
    streams: ['PCM', 'PCB', 'OTHER'], exam_categories: ['Science', 'Research', 'Teaching'], exam_type: 'Eligibility Test',
    ownership: 'GOVERNMENT', conducting_body: 'National Testing Agency (NTA)', state: 'All India',
    official_website: 'https://csirnet.nta.nic.in/', official_application_url: 'https://csirnet.nta.nic.in/',
    eligibility: 'M.Sc. or equivalent degree/ Integrated BS-MS/ BS-4 years/ B.E./ B. Tech/ B. Pharma/ MBBS with at least 55% marks for General (UR)/General-EWS.',
    exam_mode: ['Online'], exam_frequency: 'Twice a year', target_courses: ['JRF', 'Assistant Professor'], verification_status: 'VERIFIED', officialSource: 'NTA'
  },
  {
    canonical_slug: 'ugc-net', exam_name: 'UGC National Eligibility Test', short_name: 'UGC NET',
    status: 'ACTIVE', education_level: 'POSTGRADUATE', minimum_education: 'Master\'s Degree',
    streams: ['ARTS', 'COMMERCE', 'HUMANITIES', 'ANY_STREAM'], exam_categories: ['Arts', 'Humanities', 'Commerce', 'Teaching'], exam_type: 'Eligibility Test',
    ownership: 'GOVERNMENT', conducting_body: 'National Testing Agency (NTA)', state: 'All India',
    official_website: 'https://ugcnet.nta.nic.in/', official_application_url: 'https://ugcnet.nta.nic.in/',
    eligibility: 'Master’s degree or equivalent with at least 55% marks (50% for reserved categories).',
    exam_mode: ['Online'], exam_frequency: 'Twice a year', target_courses: ['JRF', 'Assistant Professor'], verification_status: 'VERIFIED', officialSource: 'NTA'
  },

  // ================= LAW =================
  {
    canonical_slug: 'clat-ug', exam_name: 'Common Law Admission Test', short_name: 'CLAT',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM'], exam_categories: ['Law'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Consortium of National Law Universities', state: 'All India',
    official_website: 'https://consortiumofnlus.ac.in/', official_application_url: 'https://consortiumofnlus.ac.in/',
    eligibility: 'Forty-five percent (45%) marks or its equivalent grade in case of candidates belonging to General / OBC / PWD / NRI / PIO / OCI categories.',
    exam_mode: ['Offline'], exam_frequency: 'Once a year', target_courses: ['BA LLB', 'BBA LLB', 'B.Com LLB', 'B.Sc LLB'], verification_status: 'VERIFIED', officialSource: 'Consortium of NLUs'
  },
  {
    canonical_slug: 'ailet', exam_name: 'All India Law Entrance Test', short_name: 'AILET',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM'], exam_categories: ['Law'], exam_type: 'Entrance Exam',
    ownership: 'UNIVERSITY', conducting_body: 'NLU Delhi', state: 'Delhi', applicable_states: ['All India'],
    official_website: 'https://nationallawuniversitydelhi.in/', official_application_url: 'https://nationallawuniversitydelhi.in/',
    eligibility: 'Senior Secondary School Examination (10+2 system) or equivalent examination with not less than 45% of marks.',
    exam_mode: ['Offline'], exam_frequency: 'Once a year', target_courses: ['BA LLB (Hons)'], verification_status: 'VERIFIED', officialSource: 'NLU Delhi'
  },
  {
    canonical_slug: 'mhcet-law', exam_name: 'Maharashtra Common Entrance Test for Law', short_name: 'MHCET Law',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM'], exam_categories: ['Law'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'State Common Entrance Test Cell, Maharashtra', state: 'Maharashtra',
    official_website: 'https://cetcell.mahacet.org/', official_application_url: 'https://cetcell.mahacet.org/',
    eligibility: 'Minimum 45% marks in 12th standard.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['LLB (5 Years)'], verification_status: 'VERIFIED', officialSource: 'Mah CET Cell'
  },

  // ================= MANAGEMENT =================
  {
    canonical_slug: 'cat', exam_name: 'Common Admission Test', short_name: 'CAT',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['Management'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'IIMs', state: 'All India',
    official_website: 'https://iimcat.ac.in/', official_application_url: 'https://iimcat.ac.in/',
    eligibility: 'Bachelor\'s Degree with at least 50% marks or equivalent CGPA.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['MBA', 'PGDM', 'FPM'], verification_status: 'VERIFIED', officialSource: 'IIM'
  },
  {
    canonical_slug: 'xat', exam_name: 'Xavier Aptitude Test', short_name: 'XAT',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['Management'], exam_type: 'Entrance Exam',
    ownership: 'PRIVATE', conducting_body: 'XLRI Jamshedpur', state: 'All India',
    official_website: 'https://xatonline.in/', official_application_url: 'https://xatonline.in/',
    eligibility: 'Recognized Bachelor’s degree of minimum three years duration or equivalent in any discipline.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['MBA', 'PGDM'], verification_status: 'VERIFIED', officialSource: 'XLRI'
  },
  {
    canonical_slug: 'mat', exam_name: 'Management Aptitude Test', short_name: 'MAT',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['Management'], exam_type: 'Entrance Exam',
    ownership: 'PRIVATE', conducting_body: 'All India Management Association (AIMA)', state: 'All India',
    official_website: 'https://mat.aima.in/', official_application_url: 'https://mat.aima.in/',
    eligibility: 'Graduates in any discipline.',
    exam_mode: ['Online', 'Offline', 'CBT', 'PBT', 'IBT'], exam_frequency: '4 times a year', target_courses: ['MBA', 'PGDM'], verification_status: 'VERIFIED', officialSource: 'AIMA'
  },
  {
    canonical_slug: 'cmat', exam_name: 'Common Management Admission Test', short_name: 'CMAT',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['Management'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Testing Agency (NTA)', state: 'All India',
    official_website: 'https://exams.nta.ac.in/CMAT/', official_application_url: 'https://exams.nta.ac.in/CMAT/',
    eligibility: 'Bachelor’s degree in any discipline.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['MBA', 'PGDM'], verification_status: 'VERIFIED', officialSource: 'NTA'
  },

  // ================= DESIGN & ARCHITECTURE =================
  {
    canonical_slug: 'nift-entrance', exam_name: 'NIFT Entrance Examination', short_name: 'NIFT',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM'], exam_categories: ['Design', 'Fashion'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Institute of Fashion Technology', state: 'All India',
    official_website: 'https://www.nift.ac.in/', official_application_url: 'https://exams.nta.ac.in/NIFT/',
    eligibility: 'The +2 level examination in the 10+2 pattern of examination of any recognized Central/State Board of Secondary Examination.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['B.Des', 'B.F.Tech'], verification_status: 'VERIFIED', officialSource: 'NIFT / NTA'
  },
  {
    canonical_slug: 'nid-dat', exam_name: 'NID Design Aptitude Test', short_name: 'NID DAT',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM'], exam_categories: ['Design'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Institute of Design', state: 'All India',
    official_website: 'https://admissions.nid.edu/', official_application_url: 'https://admissions.nid.edu/',
    eligibility: 'Passed or appearing for higher secondary (10+2) qualifying examinations.',
    exam_mode: ['Offline'], exam_frequency: 'Once a year', target_courses: ['B.Des'], verification_status: 'VERIFIED', officialSource: 'NID'
  },
  {
    canonical_slug: 'nata', exam_name: 'National Aptitude Test in Architecture', short_name: 'NATA',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM'], exam_categories: ['Architecture'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Council of Architecture (CoA)', state: 'All India',
    official_website: 'https://www.nata.in/', official_application_url: 'https://www.nata.in/',
    eligibility: 'Passed 10+2 examination with Physics, Chemistry and Mathematics as compulsory subjects.',
    exam_mode: ['Online'], exam_frequency: 'Multiple phases', target_courses: ['B.Arch'], verification_status: 'VERIFIED', officialSource: 'CoA'
  },
  
  // ================= HOTEL MANAGEMENT & PHARMACY & AGRICULTURE =================
  {
    canonical_slug: 'nchm-jee', exam_name: 'NCHMCT Joint Entrance Examination', short_name: 'NCHM JEE',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM'], exam_categories: ['Hotel Management', 'Hospitality'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Testing Agency (NTA)', state: 'All India',
    official_website: 'https://exams.nta.ac.in/NCHM/', official_application_url: 'https://exams.nta.ac.in/NCHM/',
    eligibility: 'A pass in 10+2 system of Senior Secondary examination or its equivalent with English as one of the subjects.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['B.Sc. (HHA)'], verification_status: 'VERIFIED', officialSource: 'NTA'
  },
  {
    canonical_slug: 'gpat', exam_name: 'Graduate Pharmacy Aptitude Test', short_name: 'GPAT',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'B.Pharm Degree',
    streams: ['OTHER'], exam_categories: ['Pharmacy'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Board of Examinations (NBEMS)', state: 'All India',
    official_website: 'https://natboard.edu.in/', official_application_url: 'https://natboard.edu.in/',
    eligibility: 'Bachelor’s degree in Pharmacy (4 years after 10+2, including lateral entry candidates).',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['M.Pharm'], verification_status: 'VERIFIED', officialSource: 'NBEMS'
  },
  {
    canonical_slug: 'icar-aieea-ug', exam_name: 'ICAR AIEEA (UG) through CUET', short_name: 'ICAR AIEEA UG',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['PCM', 'PCB'], exam_categories: ['Agriculture'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'National Testing Agency (NTA) via CUET', state: 'All India',
    official_website: 'https://icar.org.in/', official_application_url: 'https://exams.nta.ac.in/CUET-UG/',
    eligibility: '10+2 examination or equivalent with Physics, Chemistry and Biology/Mathematics/Agriculture.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['B.Sc. (Hons.) Agriculture'], verification_status: 'VERIFIED', officialSource: 'ICAR/NTA'
  },

  // ================= DEFENCE =================
  {
    canonical_slug: 'nda', exam_name: 'National Defence Academy and Naval Academy Examination', short_name: 'NDA/NA',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass or appearing',
    streams: ['PCM', 'ANY_STREAM'], exam_categories: ['Defence', 'UPSC', 'Government'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Union Public Service Commission (UPSC)', state: 'All India',
    official_website: 'https://upsc.gov.in/', official_application_url: 'https://upsconline.nic.in/',
    eligibility: '12th Class pass for Army Wing. 12th Class pass with Physics, Chemistry and Mathematics for Air Force and Naval Wings.',
    age_min: 16.5, age_max: 19.5, exam_mode: ['Offline'], exam_frequency: 'Twice a year', verification_status: 'VERIFIED', officialSource: 'UPSC'
  },
  {
    canonical_slug: 'cds', exam_name: 'Combined Defence Services Examination', short_name: 'CDS',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM', 'PCM'], exam_categories: ['Defence', 'UPSC', 'Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Union Public Service Commission (UPSC)', state: 'All India',
    official_website: 'https://upsc.gov.in/', official_application_url: 'https://upsconline.nic.in/',
    eligibility: 'Degree of a recognized University or equivalent. For INA: Degree in Engineering. For AFA: Degree with Physics and Math at 10+2 level.',
    age_min: 19, age_max: 25, exam_mode: ['Offline'], exam_frequency: 'Twice a year', verification_status: 'VERIFIED', officialSource: 'UPSC'
  },
  {
    canonical_slug: 'afcat', exam_name: 'Air Force Common Admission Test', short_name: 'AFCAT',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM', 'PCM'], exam_categories: ['Defence', 'Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Indian Air Force', state: 'All India',
    official_website: 'https://afcat.cdac.in/', official_application_url: 'https://afcat.cdac.in/',
    eligibility: 'Minimum 50% marks each in Maths and Physics at 10+2 level and Graduation with minimum three years degree course in any discipline.',
    age_min: 20, age_max: 24, exam_mode: ['Online'], exam_frequency: 'Twice a year', verification_status: 'VERIFIED', officialSource: 'IAF'
  },

  // ================= CIVIL SERVICES & UPSC =================
  {
    canonical_slug: 'upsc-cse', exam_name: 'Civil Services Examination', short_name: 'UPSC CSE',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['UPSC', 'Government', 'Civil Services'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Union Public Service Commission (UPSC)', state: 'All India',
    official_website: 'https://upsc.gov.in/', official_application_url: 'https://upsconline.nic.in/',
    eligibility: 'Must hold a degree of any of Universities incorporated by an Act of the Central or State Legislature in India.',
    age_min: 21, age_max: 32, attempt_limit: 6, exam_mode: ['Offline'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'UPSC'
  },
  {
    canonical_slug: 'upsc-ies', exam_name: 'Engineering Services Examination', short_name: 'UPSC ESE/IES',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Engineering Degree',
    streams: ['PCM'], exam_categories: ['UPSC', 'Engineering', 'Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Union Public Service Commission (UPSC)', state: 'All India',
    official_website: 'https://upsc.gov.in/', official_application_url: 'https://upsconline.nic.in/',
    eligibility: 'Degree in Engineering from a University incorporated by an Act of the Central or State Legislature in India.',
    age_min: 21, age_max: 30, exam_mode: ['Offline'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'UPSC'
  },

  // ================= SSC =================
  {
    canonical_slug: 'ssc-cgl', exam_name: 'Combined Graduate Level Examination', short_name: 'SSC CGL',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['SSC', 'Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Staff Selection Commission (SSC)', state: 'All India',
    official_website: 'https://ssc.gov.in/', official_application_url: 'https://ssc.gov.in/',
    eligibility: 'Bachelor\'s Degree from a recognized University or equivalent.',
    age_min: 18, age_max: 32, exam_mode: ['Online'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'SSC'
  },
  {
    canonical_slug: 'ssc-chsl', exam_name: 'Combined Higher Secondary (10+2) Level Examination', short_name: 'SSC CHSL',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM'], exam_categories: ['SSC', 'Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Staff Selection Commission (SSC)', state: 'All India',
    official_website: 'https://ssc.gov.in/', official_application_url: 'https://ssc.gov.in/',
    eligibility: 'Candidates must have passed 12th Standard or equivalent examination from a recognized Board or University.',
    age_min: 18, age_max: 27, exam_mode: ['Online'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'SSC'
  },
  {
    canonical_slug: 'ssc-je', exam_name: 'Junior Engineer Examination', short_name: 'SSC JE',
    status: 'ACTIVE', education_level: 'UNDERGRADUATE', minimum_education: 'Diploma in Engineering',
    streams: ['PCM'], exam_categories: ['SSC', 'Engineering', 'Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Staff Selection Commission (SSC)', state: 'All India',
    official_website: 'https://ssc.gov.in/', official_application_url: 'https://ssc.gov.in/',
    eligibility: 'Degree or Diploma in Civil / Electrical / Mechanical Engineering.',
    age_min: 18, age_max: 32, exam_mode: ['Online'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'SSC'
  },

  // ================= BANKING & INSURANCE =================
  {
    canonical_slug: 'ibps-po', exam_name: 'IBPS Probationary Officer', short_name: 'IBPS PO',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['Banking', 'Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Institute of Banking Personnel Selection (IBPS)', state: 'All India',
    official_website: 'https://www.ibps.in/', official_application_url: 'https://www.ibps.in/',
    eligibility: 'A Degree (Graduation) in any discipline from a University recognized by the Govt. Of India.',
    age_min: 20, age_max: 30, exam_mode: ['Online'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'IBPS'
  },
  {
    canonical_slug: 'ibps-clerk', exam_name: 'IBPS Clerk Examination', short_name: 'IBPS Clerk',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['Banking', 'Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Institute of Banking Personnel Selection (IBPS)', state: 'All India',
    official_website: 'https://www.ibps.in/', official_application_url: 'https://www.ibps.in/',
    eligibility: 'A Degree (Graduation) in any discipline from a University recognized by the Govt. Of India.',
    age_min: 20, age_max: 28, exam_mode: ['Online'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'IBPS'
  },
  {
    canonical_slug: 'sbi-po', exam_name: 'SBI Probationary Officer', short_name: 'SBI PO',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['Banking', 'Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'State Bank of India (SBI)', state: 'All India',
    official_website: 'https://sbi.co.in/web/careers', official_application_url: 'https://sbi.co.in/web/careers',
    eligibility: 'Graduation in any discipline from a recognized University or any equivalent qualification.',
    age_min: 21, age_max: 30, attempt_limit: 4, exam_mode: ['Online'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'SBI'
  },

  // ================= RAILWAYS =================
  {
    canonical_slug: 'rrb-ntpc', exam_name: 'Railway Recruitment Board Non-Technical Popular Categories', short_name: 'RRB NTPC',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass or Degree (varies by post)',
    streams: ['ANY_STREAM'], exam_categories: ['Railways', 'Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Railway Recruitment Boards (RRB)', state: 'All India',
    official_website: 'https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,4,1244', official_application_url: 'https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,4,1244',
    eligibility: '12th (+2 Stage) or its equivalent examination OR University Degree or its equivalent.',
    age_min: 18, age_max: 33, exam_mode: ['Online'], exam_frequency: 'Varies', verification_status: 'VERIFIED', officialSource: 'Indian Railways'
  },

  // ================= STATE EXAMS =================
  {
    canonical_slug: 'appsc-group-1', exam_name: 'APPSC Group 1 Services', short_name: 'APPSC Group 1',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['State Government', 'Civil Services'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Andhra Pradesh Public Service Commission (APPSC)', state: 'Andhra Pradesh',
    official_website: 'https://psc.ap.gov.in/', official_application_url: 'https://psc.ap.gov.in/',
    eligibility: 'Degree of a University in India established or incorporated by or under a Central Act or a State Act.',
    age_min: 18, age_max: 42, exam_mode: ['Offline'], exam_frequency: 'Varies', verification_status: 'VERIFIED', officialSource: 'APPSC'
  },
  {
    canonical_slug: 'tspsc-group-1', exam_name: 'TSPSC Group 1 Services', short_name: 'TSPSC Group 1',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['State Government', 'Civil Services'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Telangana State Public Service Commission (TSPSC)', state: 'Telangana',
    official_website: 'https://www.tspsc.gov.in/', official_application_url: 'https://www.tspsc.gov.in/',
    eligibility: 'Degree of a University in India established or incorporated by or under a Central Act or a State Act.',
    age_min: 18, age_max: 44, exam_mode: ['Offline'], exam_frequency: 'Varies', verification_status: 'VERIFIED', officialSource: 'TSPSC'
  },
  {
    canonical_slug: 'tnpsc-group-1', exam_name: 'TNPSC Group 1 Services', short_name: 'TNPSC Group 1',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['State Government', 'Civil Services'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Tamil Nadu Public Service Commission (TNPSC)', state: 'Tamil Nadu',
    official_website: 'https://www.tnpsc.gov.in/', official_application_url: 'https://apply.tnpscexams.in/',
    eligibility: 'Applicants should possess a degree of any of the Universities incorporated by an Act of the Central or State Legislature in India.',
    age_min: 21, age_max: 34, exam_mode: ['Offline'], exam_frequency: 'Varies', verification_status: 'VERIFIED', officialSource: 'TNPSC'
  },
  {
    canonical_slug: 'kpsc-kas', exam_name: 'KPSC Karnataka Administrative Service', short_name: 'KPSC KAS',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['State Government', 'Civil Services'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Karnataka Public Service Commission (KPSC)', state: 'Karnataka',
    official_website: 'https://kpsc.kar.nic.in/', official_application_url: 'https://kpsc.kar.nic.in/',
    eligibility: 'Must possess a Bachelor’s degree from a University established by Law in India.',
    age_min: 21, age_max: 35, exam_mode: ['Offline'], exam_frequency: 'Varies', verification_status: 'VERIFIED', officialSource: 'KPSC'
  },
  {
    canonical_slug: 'mpsc-state-services', exam_name: 'MPSC State Services Examination (Rajyaseva)', short_name: 'MPSC Rajyaseva',
    status: 'ACTIVE', education_level: 'AFTER_DEGREE', minimum_education: 'Bachelor\'s Degree',
    streams: ['ANY_STREAM'], exam_categories: ['State Government', 'Civil Services'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Maharashtra Public Service Commission (MPSC)', state: 'Maharashtra',
    official_website: 'https://mpsc.gov.in/', official_application_url: 'https://mpsconline.gov.in/',
    eligibility: 'Must hold a Degree of any University incorporated by an Act of the Central or State Legislature in India.',
    age_min: 19, age_max: 38, exam_mode: ['Offline'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'MPSC'
  },
  {
    canonical_slug: 'up-police-constable', exam_name: 'UP Police Constable Recruitment', short_name: 'UP Police Constable',
    status: 'ACTIVE', education_level: 'AFTER_12TH', minimum_education: 'Class 12th Pass',
    streams: ['ANY_STREAM'], exam_categories: ['Police & Uniformed Services', 'State Government'], exam_type: 'Recruitment Exam',
    ownership: 'GOVERNMENT', conducting_body: 'Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB)', state: 'Uttar Pradesh',
    official_website: 'https://uppbpb.gov.in/', official_application_url: 'https://uppbpb.gov.in/',
    eligibility: 'Passed 12th (Intermediate) class from a recognized Board in India.',
    age_min: 18, age_max: 25, exam_mode: ['Offline'], exam_frequency: 'Varies', verification_status: 'VERIFIED', officialSource: 'UPPRPB'
  },

  // ================= AFTER 10TH =================
  {
    canonical_slug: 'jeecup', exam_name: 'UP Joint Entrance Examination Council (Polytechnic)', short_name: 'UP JEECUP',
    status: 'ACTIVE', education_level: 'AFTER_10TH', minimum_education: 'Class 10th Pass',
    streams: ['ANY_STREAM'], exam_categories: ['Polytechnic', 'State Government'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'JEECUP', state: 'Uttar Pradesh',
    official_website: 'https://jeecup.admissions.nic.in/', official_application_url: 'https://jeecup.admissions.nic.in/',
    eligibility: '10th Passed with minimum 35% marks.',
    exam_mode: ['Online'], exam_frequency: 'Once a year', target_courses: ['Diploma in Engineering'], verification_status: 'VERIFIED', officialSource: 'JEECUP'
  },
  {
    canonical_slug: 'jharkhand-pece', exam_name: 'Jharkhand Polytechnic Entrance Competitive Examination', short_name: 'PECE',
    status: 'ACTIVE', education_level: 'AFTER_10TH', minimum_education: 'Class 10th Pass',
    streams: ['ANY_STREAM'], exam_categories: ['Polytechnic', 'State Government'], exam_type: 'Entrance Exam',
    ownership: 'GOVERNMENT', conducting_body: 'JCECEB', state: 'Jharkhand',
    official_website: 'https://jceceb.jharkhand.gov.in/', official_application_url: 'https://jceceb.jharkhand.gov.in/',
    eligibility: 'Passed 10th standard or equivalent examination with at least 35% marks.',
    exam_mode: ['Offline'], exam_frequency: 'Once a year', target_courses: ['Diploma in Engineering'], verification_status: 'VERIFIED', officialSource: 'JCECEB'
  },
  {
    canonical_slug: 'ntse', exam_name: 'National Talent Search Examination', short_name: 'NTSE',
    status: 'ACTIVE', education_level: 'AFTER_10TH', minimum_education: 'Class 10th Student',
    streams: ['ANY_STREAM'], exam_categories: ['Scholarship', 'After 10th'], exam_type: 'Scholarship Exam',
    ownership: 'GOVERNMENT', conducting_body: 'NCERT', state: 'All India',
    official_website: 'https://ncert.nic.in/', official_application_url: 'https://ncert.nic.in/',
    eligibility: 'Students studying in Class X in recognized schools are eligible to appear for the Stage-I examination.',
    exam_mode: ['Offline'], exam_frequency: 'Once a year', verification_status: 'VERIFIED', officialSource: 'NCERT'
  }
];

async function seedDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    console.log('Clearing existing exam data...');
    await Exam.deleteMany({});
    await ExamYear.deleteMany({});
    
    console.log('Inserting verified exams...');
    for (const examData of examsList) {
      const exam = await Exam.create(examData);
      
      const yearData = {
        exam_id: exam._id,
        year: 2026,
        ...generateDates(Math.floor(Math.random() * 6) + 1),
        status: 'CONFIRMED'
      };
      
      await ExamYear.create(yearData);
      console.log(`Inserted ${exam.short_name} with official URL: ${exam.official_website}`);
    }

    console.log(`\nSuccessfully seeded ${examsList.length} verified exams with deadlines and official URLs.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDB();
