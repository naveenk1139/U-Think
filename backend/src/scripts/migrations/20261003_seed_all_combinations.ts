import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
import Course from '../../models/Course.js';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected for comprehensive course seeding.');
};

const seedComprehensiveCourses = async () => {
  await connectDB();
  
  const coursesToCreate = [
    // --- SCIENCE ADDITIONAL COMBINATIONS ---
    {
      streamSlug: 'puc-science',
      name: 'PCMB (Physics, Chemistry, Maths, Biology)',
      slug: 'pcmb-full',
      type: 'Combination',
      category: 'puc',
      level: 'PUC / 12th',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Language'],
      skills: ['Analytical Thinking', 'Problem Solving', 'Scientific Temper', 'Research'],
      certifications: ['NEET Foundation', 'JEE Foundation', 'Olympiads'],
      careers: ['Doctor', 'Engineer', 'Biotechnologist', 'Scientist', 'Pharmacist', 'Agriculturist'],
      jobRoles: ['Medical Officer', 'Software Developer', 'Research Scientist', 'Lab Technician'],
      industries: ['Healthcare', 'IT', 'Pharmaceuticals', 'Research & Development'],
      higherEducation: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BVSc', 'B.Sc.', 'B.Sc. Nursing', 'B.Pharm', 'B.E./B.Tech'],
      duration: '2 Years',
      eligibility: '10th Pass with Science & Math',
      admissionRoute: ['Merit based on 10th score'],
      entranceExams: ['None for admission to PUC'],
      fees: '₹20,000 - ₹1,00,000 per year',
      institutions: ['Govt PU Colleges', 'Private Science Academies'],
      source: 'State Pre-University Education Board',
      verificationStatus: 'VERIFIED'
    },
    // --- COMMERCE ADDITIONAL COMBINATIONS ---
    {
      streamSlug: 'puc-commerce',
      name: 'CEBA (Computer Science, Economics, Business Studies, Accountancy)',
      slug: 'ceba-commerce',
      type: 'Combination',
      category: 'puc',
      level: 'PUC / 12th',
      subjects: ['Computer Science', 'Economics', 'Business Studies', 'Accountancy', 'English', 'Language'],
      skills: ['Financial Literacy', 'Accounting', 'Data Analysis', 'Business Management'],
      certifications: ['Tally ERP', 'Basic Excel', 'Digital Marketing'],
      careers: ['Chartered Accountant (CA)', 'Company Secretary (CS)', 'Financial Analyst', 'Investment Banker', 'Data Analyst'],
      jobRoles: ['Accountant', 'Audit Assistant', 'Financial Advisor', 'Business Analyst'],
      industries: ['Banking', 'Finance', 'Corporate Sector', 'Fintech'],
      higherEducation: ['B.Com', 'BBA', 'BCA', 'CA Foundation', 'CMA Foundation', 'CS Foundation', 'BA Economics'],
      duration: '2 Years',
      eligibility: '10th Pass',
      admissionRoute: ['Merit based on 10th score'],
      entranceExams: ['None'],
      fees: '₹15,000 - ₹80,000 per year',
      institutions: ['Govt PU Colleges', 'Private Commerce Colleges'],
      source: 'State Pre-University Education Board',
      verificationStatus: 'VERIFIED'
    },
    {
      streamSlug: 'puc-commerce',
      name: 'HEBA (History, Economics, Business Studies, Accountancy)',
      slug: 'heba-commerce',
      type: 'Combination',
      category: 'puc',
      level: 'PUC / 12th',
      subjects: ['History', 'Economics', 'Business Studies', 'Accountancy', 'English', 'Language'],
      skills: ['Historical Analysis', 'Economics', 'Management', 'Accounting'],
      certifications: ['Tally ERP'],
      careers: ['Economist', 'Accountant', 'Business Administrator', 'Teacher'],
      jobRoles: ['Account Executive', 'Business Manager', 'Tax Consultant'],
      industries: ['Education', 'Banking', 'Government', 'Corporate'],
      higherEducation: ['B.Com', 'BBA', 'BA Economics', 'BA History', 'Law (LLB)'],
      duration: '2 Years',
      eligibility: '10th Pass',
      admissionRoute: ['Merit based on 10th score'],
      entranceExams: ['None'],
      fees: '₹15,000 - ₹60,000 per year',
      institutions: ['Govt PU Colleges'],
      source: 'State Pre-University Education Board',
      verificationStatus: 'VERIFIED'
    },
    // --- ARTS ADDITIONAL COMBINATIONS ---
    {
      streamSlug: 'puc-arts',
      name: 'HEPS (History, Economics, Political Science, Sociology)',
      slug: 'heps-arts',
      type: 'Combination',
      category: 'puc',
      level: 'PUC / 12th',
      subjects: ['History', 'Economics', 'Political Science', 'Sociology', 'English', 'Language'],
      skills: ['Critical Thinking', 'Social Analysis', 'Communication', 'Writing'],
      certifications: ['Content Writing', 'Public Speaking'],
      careers: ['Civil Services (IAS/IPS)', 'Lawyer', 'Journalist', 'Social Worker', 'Teacher'],
      jobRoles: ['Civil Servant', 'Legal Advisor', 'Reporter', 'HR Executive'],
      industries: ['Government', 'Media & Journalism', 'NGO', 'Education', 'Law'],
      higherEducation: ['BA', 'Integrated Law (BA LLB)', 'BSW', 'Journalism & Mass Comm'],
      duration: '2 Years',
      eligibility: '10th Pass',
      admissionRoute: ['Merit based on 10th score'],
      entranceExams: ['None'],
      fees: '₹10,000 - ₹50,000 per year',
      institutions: ['Govt PU Colleges', 'Private Arts Colleges'],
      source: 'State Pre-University Education Board',
      verificationStatus: 'VERIFIED'
    },

    // --- DIPLOMA / POLYTECHNIC ---
    {
      streamSlug: null,
      category: 'diploma',
      name: 'Diploma in Computer Science Engineering',
      slug: 'diploma-cse-full',
      type: 'Course',
      level: 'Diploma',
      subjects: ['Programming (C, C++, Java)', 'Data Structures', 'Web Development', 'Database Management System', 'Computer Networks'],
      skills: ['Coding', 'Web Development', 'Database Management', 'Networking', 'Troubleshooting'],
      certifications: ['CCNA', 'AWS Cloud Practitioner', 'Full Stack Development'],
      careers: ['Software Developer', 'System Administrator', 'Network Engineer', 'Web Developer'],
      jobRoles: ['Junior Software Engineer', 'IT Support Specialist', 'Database Administrator'],
      industries: ['IT / Software', 'Telecommunications', 'E-commerce', 'Tech Startups'],
      higherEducation: ['B.E./B.Tech (Lateral Entry directly to 2nd year)', 'BCA'],
      duration: '3 Years',
      eligibility: '10th Pass with min 35%',
      admissionRoute: ['State Polytechnic Entrance Exam', 'Merit'],
      entranceExams: ['State Polytechnic Entrance Exam'],
      fees: '₹10,000 - ₹50,000 per year',
      institutions: ['Govt Polytechnic Colleges', 'Private Engineering Colleges'],
      source: 'AICTE / Directorate of Technical Education',
      verificationStatus: 'VERIFIED'
    },
    {
      streamSlug: null,
      category: 'polytechnic-diploma',
      name: 'Diploma in Civil Engineering',
      slug: 'diploma-civil-full',
      type: 'Course',
      level: 'Diploma',
      subjects: ['Surveying', 'Construction Materials', 'Structural Mechanics', 'AutoCAD', 'Estimating and Costing'],
      skills: ['Drafting', 'Surveying', 'Project Estimation', 'AutoCAD', 'Construction Planning'],
      certifications: ['AutoCAD Civil 3D', 'Revit Architecture'],
      careers: ['Civil Engineer', 'Surveyor', 'Site Supervisor', 'Draftsman'],
      jobRoles: ['Junior Engineer (JE) in Govt', 'Site Engineer', 'AutoCAD Draftsman'],
      industries: ['Construction', 'Real Estate', 'Government (PWD, NHAI)', 'Infrastructure'],
      higherEducation: ['B.E./B.Tech in Civil (Lateral Entry)'],
      duration: '3 Years',
      eligibility: '10th Pass with min 35%',
      admissionRoute: ['State Polytechnic Entrance Exam', 'Merit'],
      entranceExams: ['State Polytechnic Entrance Exam'],
      fees: '₹10,000 - ₹50,000 per year',
      institutions: ['Govt Polytechnic Colleges'],
      source: 'AICTE',
      verificationStatus: 'VERIFIED'
    },

    // --- ITI ---
    {
      streamSlug: null,
      category: 'iti',
      name: 'ITI in Electrician',
      slug: 'iti-electrician-full',
      type: 'Trade',
      level: 'ITI',
      subjects: ['Trade Theory (Electrical)', 'Trade Practical', 'Engineering Drawing', 'Workshop Calculation and Science', 'Employability Skills'],
      skills: ['Wiring', 'Electrical Maintenance', 'Motor Winding', 'Circuit Analysis', 'Safety Practices'],
      certifications: ['National Trade Certificate (NTC)'],
      careers: ['Electrician', 'Wireman', 'Lineman', 'Maintenance Technician'],
      jobRoles: ['Electrical Technician', 'Apprentice', 'Plant Operator'],
      industries: ['Manufacturing', 'Power/Energy', 'Construction', 'Railways'],
      higherEducation: ['Diploma in Electrical Engineering (Lateral Entry)', 'Apprenticeship Training'],
      duration: '2 Years',
      eligibility: '10th Pass',
      admissionRoute: ['Merit based on 10th score'],
      entranceExams: ['None'],
      fees: '₹2,000 - ₹20,000 per year',
      institutions: ['Government ITI', 'Private ITI'],
      source: 'NCVT / DGT',
      verificationStatus: 'VERIFIED'
    },
    {
      streamSlug: null,
      category: 'iti',
      name: 'ITI in Fitter',
      slug: 'iti-fitter-full',
      type: 'Trade',
      level: 'ITI',
      subjects: ['Fitter Trade Theory', 'Fitter Practical', 'Engineering Drawing', 'Workshop Calculation'],
      skills: ['Machining', 'Welding', 'Grinding', 'Assembling', 'Reading Engineering Drawings'],
      certifications: ['National Trade Certificate (NTC)', 'Welding Certificate'],
      careers: ['Fitter', 'Machinist', 'Welder', 'Plant Maintenance Mechanic'],
      jobRoles: ['Mechanical Fitter', 'Machine Operator', 'Assembly Technician'],
      industries: ['Automotive', 'Manufacturing', 'Aerospace', 'Heavy Machinery'],
      higherEducation: ['Diploma in Mechanical Engineering', 'Apprenticeship Training'],
      duration: '2 Years',
      eligibility: '10th Pass',
      admissionRoute: ['Merit based on 10th score'],
      entranceExams: ['None'],
      fees: '₹2,000 - ₹20,000 per year',
      institutions: ['Government ITI'],
      source: 'NCVT / DGT',
      verificationStatus: 'VERIFIED'
    },

    // --- PARAMEDICAL ---
    {
      streamSlug: null,
      category: 'paramedical',
      name: 'Diploma in Medical Laboratory Technology (DMLT)',
      slug: 'dmlt-full',
      type: 'Course',
      level: 'Diploma',
      subjects: ['Anatomy & Physiology', 'Biochemistry', 'Microbiology', 'Pathology', 'Blood Banking'],
      skills: ['Sample Collection', 'Lab Equipment Operation', 'Chemical Analysis', 'Report Generation'],
      certifications: ['Phlebotomy Certification', 'Lab Safety Training'],
      careers: ['Medical Lab Technician', 'Pathology Assistant', 'Phlebotomist'],
      jobRoles: ['Lab Technician', 'Blood Bank Technician', 'Research Assistant'],
      industries: ['Hospitals', 'Diagnostic Labs', 'Research Institutes', 'Clinics'],
      higherEducation: ['B.Sc. MLT'],
      duration: '2 Years',
      eligibility: '10th Pass / 12th Pass (Science)',
      admissionRoute: ['Merit based on 10th/12th score', 'State Paramedical Board Exam'],
      entranceExams: ['Paramedical Entrance (State Level)'],
      fees: '₹30,000 - ₹80,000 per year',
      institutions: ['Medical Colleges', 'Paramedical Institutes'],
      source: 'Paramedical Board',
      verificationStatus: 'VERIFIED'
    },
    {
      streamSlug: null,
      category: 'paramedical',
      name: 'Diploma in X-Ray Technology',
      slug: 'dxt-full',
      type: 'Course',
      level: 'Diploma',
      subjects: ['Anatomy', 'Physiology', 'Radiography Physics', 'X-Ray Techniques', 'Radiation Hazards'],
      skills: ['Operating X-Ray Machines', 'Patient Positioning', 'Radiation Safety', 'Image Processing'],
      certifications: ['Radiation Safety Certificate'],
      careers: ['X-Ray Technician', 'Radiographer', 'Imaging Assistant'],
      jobRoles: ['Radiology Technician', 'Scan Technician'],
      industries: ['Hospitals', 'Diagnostic Centers', 'Orthopedic Clinics'],
      higherEducation: ['B.Sc. Medical Imaging Technology (MIT)'],
      duration: '2 Years',
      eligibility: '10th Pass / 12th Science',
      admissionRoute: ['Merit'],
      entranceExams: ['None'],
      fees: '₹25,000 - ₹75,000 per year',
      institutions: ['Medical Colleges', 'Paramedical Institutes'],
      source: 'Paramedical Board',
      verificationStatus: 'VERIFIED'
    },

    // --- VOCATIONAL (NSQF / B.Voc) ---
    {
      streamSlug: null,
      category: 'vocational',
      name: 'NSQF Level 4: IT/ITeS (Software Testing)',
      slug: 'nsqf-it-testing',
      type: 'Vocational',
      level: 'Certificate / Level 4',
      subjects: ['Software Testing Basics', 'Manual Testing', 'Defect Tracking', 'Basic Programming'],
      skills: ['Manual Testing', 'Bug Reporting', 'Test Case Writing', 'Quality Assurance'],
      certifications: ['ISTQB Foundation', 'NSQF Level 4 Certificate'],
      careers: ['QA Tester', 'Software Tester', 'Support Executive'],
      jobRoles: ['Junior QA Analyst', 'Test Engineer'],
      industries: ['IT / Software', 'Tech Startups'],
      higherEducation: ['B.Voc (Software Development)'],
      duration: '6 Months - 1 Year',
      eligibility: '10th Pass',
      admissionRoute: ['Direct Admission'],
      entranceExams: ['None'],
      fees: '₹5,000 - ₹20,000',
      institutions: ['NSDC Training Centers', 'Skill India Centers'],
      source: 'NSDC (National Skill Development Corporation)',
      verificationStatus: 'VERIFIED'
    }
  ];

  let count = 0;
  for (const c of coursesToCreate) {
    const filter = { slug: c.slug };
    const update = {
      $set: {
        name: c.name,
        slug: c.slug,
        type: c.type,
        stream: c.streamSlug || null,
        category: c.category || null,
        level: c.level,
        subjects: c.subjects || [],
        careers: c.careers || [],
        higherEducation: c.higherEducation || [],
        duration: c.duration || null,
        eligibility: c.eligibility || null,
        skills: c.skills || [],
        certifications: c.certifications || [],
        jobRoles: c.jobRoles || [],
        industries: c.industries || [],
        admissionRoute: c.admissionRoute || [],
        entranceExams: c.entranceExams || [],
        fees: c.fees || null,
        institutions: c.institutions || [],
        source: c.source || null,
        verificationStatus: c.verificationStatus || 'VERIFIED'
      }
    };
    await Course.updateOne(filter, update, { upsert: true });
    count++;
  }

  console.log(`Successfully seeded ${count} comprehensive combinations across multiple pathways.`);
  process.exit(0);
};

seedComprehensiveCourses().catch(console.error);
