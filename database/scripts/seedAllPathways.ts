import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ESM if needed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../backend/.env') });

import { connectDB, disconnectDB } from '../../backend/src/config/db.js';
import EducationLevel from '../../backend/src/models/EducationLevel.js';
import Pathway from '../../backend/src/models/Pathway.js';
import Stream from '../../backend/src/models/Stream.js';
import SubjectCombination from '../../backend/src/models/SubjectCombination.js';
import Subject from '../../backend/src/models/Subject.js';
import Course from '../../backend/src/models/Course.js';
import Branch from '../../backend/src/models/Branch.js';

async function seedData() {
  try {
    console.log('Connecting to database using connectDB()...');
    await connectDB();
    console.log('Connected to MongoDB');

    console.log('Clearing old records...');
    await EducationLevel.deleteMany({});
    await Pathway.deleteMany({});
    await Stream.deleteMany({});
    await Subject.deleteMany({});
    await SubjectCombination.deleteMany({});
    await Course.deleteMany({});
    await Branch.deleteMany({});

    // --------------------------------------------------
    // 1. Education Levels
    // --------------------------------------------------
    console.log('Seeding Education Levels...');
    const edLevels = await EducationLevel.insertMany([
      { name: '10th / SSLC', slug: '10th', order: 0 },
      { name: 'After 10th', slug: 'after-10th', order: 1 },
      { name: 'After 12th', slug: 'after-12th', order: 2 },
      { name: 'Diploma', slug: 'diploma', order: 3 },
      { name: 'ITI', slug: 'iti', order: 4 },
      { name: 'UG', slug: 'ug', order: 5 },
      { name: 'PG', slug: 'pg', order: 6 },
      { name: 'PhD / Research', slug: 'phd', order: 7 },
      { name: 'Working Professional', slug: 'professional', order: 8 }
    ]);
    const after10thId = edLevels.find(e => e.slug === 'after-10th')?._id;
    
    // --------------------------------------------------
    // 2. Pathways for 'After 10th'
    // --------------------------------------------------
    console.log('Seeding Pathways...');
    const pathways = await Pathway.insertMany([
      { educationLevelId: after10thId, name: 'PUC / 11th-12th', slug: 'puc', duration: '2 years', order: 1 },
      { educationLevelId: after10thId, name: 'Diploma / Polytechnic', slug: 'diploma-after-10th', duration: '3 years', order: 2 },
      { educationLevelId: after10thId, name: 'ITI', slug: 'iti-after-10th', duration: '1-2 years', order: 3 },
      { educationLevelId: after10thId, name: 'Paramedical / Allied Health', slug: 'paramedical', duration: '2-3 years', order: 4 },
      { educationLevelId: after10thId, name: 'Vocational Education', slug: 'vocational-10th', duration: 'Varies', order: 5 },
      { educationLevelId: after10thId, name: 'Apprenticeship', slug: 'apprenticeship', duration: 'Varies', order: 6 },
      { educationLevelId: after10thId, name: 'Open Schooling / Other', slug: 'open-schooling', duration: 'Flexible', order: 7 }
    ]);
    const pucId = pathways.find(p => p.slug === 'puc')?._id;
    const diplomaId = pathways.find(p => p.slug === 'diploma-after-10th')?._id;
    const itiId = pathways.find(p => p.slug === 'iti-after-10th')?._id;
    const paramedicalId = pathways.find(p => p.slug === 'paramedical')?._id;
    const vocationalPathId = pathways.find(p => p.slug === 'vocational-10th')?._id;

    // --------------------------------------------------
    // 3. Streams
    // --------------------------------------------------
    console.log('Seeding Streams...');
    const streams = await Stream.insertMany([
      // PUC Streams
      { pathwayId: pucId, name: 'Science', slug: 'science', duration: '2 years', order: 1 },
      { pathwayId: pucId, name: 'Commerce', slug: 'commerce', duration: '2 years', order: 2 },
      { pathwayId: pucId, name: 'Arts / Humanities', slug: 'arts', duration: '2 years', order: 3 },
      { pathwayId: pucId, name: 'Vocational', slug: 'vocational-puc', duration: '2 years', order: 4 },
      
      // Diploma Streams
      { pathwayId: diplomaId, name: 'Engineering Diploma', slug: 'diploma-engineering', duration: '3 years', order: 1 },
      { pathwayId: diplomaId, name: 'Non-Engineering Diploma', slug: 'diploma-non-eng', duration: '3 years', order: 2 },
      
      // ITI Streams
      { pathwayId: itiId, name: 'Engineering Trades', slug: 'iti-engineering', duration: '1-2 years', order: 1 },
      { pathwayId: itiId, name: 'Non-Engineering Trades', slug: 'iti-non-eng', duration: '1-2 years', order: 2 },
      
      // Paramedical Streams
      { pathwayId: paramedicalId, name: 'Allied Health Sciences', slug: 'allied-health', duration: '2-3 years', order: 1 },
      
      // Vocational Streams
      { pathwayId: vocationalPathId, name: 'Skill Training & Vocational', slug: 'skill-training', duration: 'Varies', order: 1 }
    ]);
    
    const scienceId = streams.find(s => s.slug === 'science')?._id;
    const commerceId = streams.find(s => s.slug === 'commerce')?._id;
    const artsId = streams.find(s => s.slug === 'arts')?._id;
    const vocPucId = streams.find(s => s.slug === 'vocational-puc')?._id;
    const dipEngId = streams.find(s => s.slug === 'diploma-engineering')?._id;
    const itiEngId = streams.find(s => s.slug === 'iti-engineering')?._id;
    const alliedHealthId = streams.find(s => s.slug === 'allied-health')?._id;
    const vocSkillId = streams.find(s => s.slug === 'skill-training')?._id;

    // --------------------------------------------------
    // 4. Subjects
    // --------------------------------------------------
    console.log('Seeding Subjects...');
    const subjects = await Subject.insertMany([
      // Science
      { name: 'Physics', slug: 'physics', type: 'Core' },
      { name: 'Chemistry', slug: 'chemistry', type: 'Core' },
      { name: 'Mathematics', slug: 'mathematics', type: 'Core' },
      { name: 'Biology', slug: 'biology', type: 'Core' },
      { name: 'Computer Science', slug: 'computer-science', type: 'Elective' },
      { name: 'Electronics', slug: 'electronics', type: 'Elective' },
      { name: 'Statistics', slug: 'statistics', type: 'Elective' },
      { name: 'Home Science', slug: 'home-science', type: 'Elective' },
      { name: 'Geology', slug: 'geology', type: 'Elective' },
      
      // Commerce
      { name: 'Accountancy', slug: 'accountancy', type: 'Core' },
      { name: 'Business Studies', slug: 'business-studies', type: 'Core' },
      { name: 'Economics', slug: 'economics', type: 'Core' },
      
      // Arts / Humanities
      { name: 'History', slug: 'history', type: 'Core' },
      { name: 'Political Science', slug: 'political-science', type: 'Core' },
      { name: 'Sociology', slug: 'sociology', type: 'Core' },
      { name: 'Psychology', slug: 'psychology', type: 'Elective' },
      { name: 'Geography', slug: 'geography', type: 'Elective' },
      { name: 'Philosophy', slug: 'philosophy', type: 'Elective' }
    ]);
    const sub = (slug: string) => subjects.find(s => s.slug === slug)?._id;

    // --------------------------------------------------
    // 5. Subject Combinations
    // --------------------------------------------------
    console.log('Seeding Subject Combinations...');
    
    // 5.1 Science Combinations
    const scienceCombos = await SubjectCombination.insertMany([
      { streamId: scienceId, slug: 'pcmb', name: 'PCMB (Physics, Chemistry, Maths, Biology)', subjects: [sub('physics'), sub('chemistry'), sub('mathematics'), sub('biology')] },
      { streamId: scienceId, slug: 'pcmc', name: 'PCMC (Physics, Chemistry, Maths, Computer Science)', subjects: [sub('physics'), sub('chemistry'), sub('mathematics'), sub('computer-science')] },
      { streamId: scienceId, slug: 'pcme', name: 'PCME (Physics, Chemistry, Maths, Electronics)', subjects: [sub('physics'), sub('chemistry'), sub('mathematics'), sub('electronics')] },
      { streamId: scienceId, slug: 'pcms', name: 'PCMS (Physics, Chemistry, Maths, Statistics)', subjects: [sub('physics'), sub('chemistry'), sub('mathematics'), sub('statistics')] },
      { streamId: scienceId, slug: 'pcb', name: 'PCB (Physics, Chemistry, Biology)', subjects: [sub('physics'), sub('chemistry'), sub('biology')] },
      { streamId: scienceId, slug: 'pcbh', name: 'PCBH (Physics, Chemistry, Biology, Home Science)', subjects: [sub('physics'), sub('chemistry'), sub('biology'), sub('home-science')] },
      { streamId: scienceId, slug: 'pcmg', name: 'PCMG (Physics, Chemistry, Maths, Geology)', subjects: [sub('physics'), sub('chemistry'), sub('mathematics'), sub('geology')] }
    ]);
    
    // 5.2 Commerce Combinations
    const commerceCombos = await SubjectCombination.insertMany([
      { streamId: commerceId, slug: 'ceba', name: 'CEBA (Computer Science, Economics, Business Studies, Accountancy)', subjects: [sub('computer-science'), sub('economics'), sub('business-studies'), sub('accountancy')] },
      { streamId: commerceId, slug: 'seba', name: 'SEBA (Statistics, Economics, Business Studies, Accountancy)', subjects: [sub('statistics'), sub('economics'), sub('business-studies'), sub('accountancy')] },
      { streamId: commerceId, slug: 'meba', name: 'MEBA (Mathematics, Economics, Business Studies, Accountancy)', subjects: [sub('mathematics'), sub('economics'), sub('business-studies'), sub('accountancy')] },
      { streamId: commerceId, slug: 'msba', name: 'MSBA (Mathematics, Statistics, Business Studies, Accountancy)', subjects: [sub('mathematics'), sub('statistics'), sub('business-studies'), sub('accountancy')] }
    ]);

    // 5.3 Arts Combinations
    const artsCombos = await SubjectCombination.insertMany([
      { streamId: artsId, slug: 'heps', name: 'HEPS (History, Economics, Political Science, Sociology)', subjects: [sub('history'), sub('economics'), sub('political-science'), sub('sociology')] },
      { streamId: artsId, slug: 'hesp', name: 'HESP (History, Economics, Sociology, Psychology)', subjects: [sub('history'), sub('economics'), sub('sociology'), sub('psychology')] },
      { streamId: artsId, slug: 'hepg', name: 'HEPG (History, Economics, Political Science, Geography)', subjects: [sub('history'), sub('economics'), sub('political-science'), sub('geography')] }
    ]);
    
    const pcmbId = scienceCombos.find(c => c.slug === 'pcmb')?._id;
    const pcbId = scienceCombos.find(c => c.slug === 'pcb')?._id;
    const pcmcId = scienceCombos.find(c => c.slug === 'pcmc')?._id;
    
    const cebaId = commerceCombos.find(c => c.slug === 'ceba')?._id;
    const sebaId = commerceCombos.find(c => c.slug === 'seba')?._id;
    const mebaId = commerceCombos.find(c => c.slug === 'meba')?._id;
    
    const hepsId = artsCombos.find(c => c.slug === 'heps')?._id;

    // --------------------------------------------------
    // 6. Courses
    // --------------------------------------------------
    console.log('Seeding Courses...');
    const courses = await Course.insertMany([
      // Science Courses
      { streamId: scienceId, name: 'Engineering (B.E / B.Tech)', slug: 'engineering-ug', courseLevel: 'UG', duration: '4 Years', active: true, eligibleCombinations: [pcmbId, pcmcId, scienceCombos.find(c => c.slug === 'pcme')?._id, scienceCombos.find(c => c.slug === 'pcms')?._id] },
      { streamId: scienceId, name: 'Medical (MBBS)', slug: 'medical-mbbs', courseLevel: 'UG', duration: '5.5 Years', active: true, eligibleCombinations: [pcmbId, pcbId] },
      { streamId: scienceId, name: 'Dental (BDS)', slug: 'bds', courseLevel: 'UG', duration: '5 Years', active: true, eligibleCombinations: [pcmbId, pcbId] },
      { streamId: scienceId, name: 'Ayurveda (BAMS)', slug: 'bams', courseLevel: 'UG', duration: '5.5 Years', active: true, eligibleCombinations: [pcmbId, pcbId] },
      { streamId: scienceId, name: 'Pharmacy (B.Pharm)', slug: 'pharmacy-ug', courseLevel: 'UG', duration: '4 Years', active: true, eligibleCombinations: [pcmbId, pcbId] },
      { streamId: scienceId, name: 'Bachelor of Science (B.Sc)', slug: 'bsc', courseLevel: 'UG', duration: '3-4 Years', active: true, eligibleCombinations: [pcmbId, pcmcId, pcbId] },
      
      // Commerce Courses
      { streamId: commerceId, name: 'Bachelor of Commerce (B.Com)', slug: 'bcom', courseLevel: 'UG', duration: '3-4 Years', active: true, eligibleCombinations: [cebaId, sebaId, mebaId] },
      { streamId: commerceId, name: 'Bachelor of Business Administration (BBA)', slug: 'bba', courseLevel: 'UG', duration: '3-4 Years', active: true, eligibleCombinations: [cebaId, sebaId, mebaId] },
      { streamId: commerceId, name: 'Chartered Accountancy (CA)', slug: 'ca', courseLevel: 'Professional', duration: '4-5 Years', active: true, eligibleCombinations: [cebaId, sebaId, mebaId] },
      { streamId: commerceId, name: 'Company Secretary (CS)', slug: 'cs', courseLevel: 'Professional', duration: '3-4 Years', active: true, eligibleCombinations: [cebaId, sebaId, mebaId] },
      { streamId: commerceId, name: 'Cost and Management Accountancy (CMA)', slug: 'cma', courseLevel: 'Professional', duration: '3-4 Years', active: true, eligibleCombinations: [cebaId, sebaId, mebaId] },
      
      // Arts Courses
      { streamId: artsId, name: 'Bachelor of Arts (BA)', slug: 'ba', courseLevel: 'UG', duration: '3-4 Years', active: true, eligibleCombinations: [hepsId, artsCombos.find(c => c.slug === 'hesp')?._id] },
      { streamId: artsId, name: 'Bachelor of Fine Arts (BFA)', slug: 'bfa', courseLevel: 'UG', duration: '3-4 Years', active: true, eligibleCombinations: [hepsId] },
      { streamId: artsId, name: 'Bachelor of Design (B.Des)', slug: 'bdes', courseLevel: 'UG', duration: '4 Years', active: true, eligibleCombinations: [hepsId] },
      { streamId: artsId, name: 'Law (BA LLB)', slug: 'ba-llb', courseLevel: 'UG', duration: '5 Years', active: true, eligibleCombinations: [hepsId] },
      
      // Vocational PUC Courses
      { streamId: vocPucId, name: 'Vocational Degree (B.Voc)', slug: 'bvoc', courseLevel: 'UG', duration: '3 Years', active: true },

      // Diploma Courses (These act like courses under Diploma stream)
      { streamId: dipEngId, name: 'Diploma in Engineering', slug: 'diploma-engineering-course', courseLevel: 'Diploma', duration: '3 Years', active: true },
      
      // ITI Courses (These act like courses under ITI stream)
      { streamId: itiEngId, name: 'ITI Engineering Trades', slug: 'iti-engineering-course', courseLevel: 'Certificate', duration: '1-2 Years', active: true },
      
      // Paramedical Courses
      { streamId: alliedHealthId, name: 'Diploma in Paramedical Sciences', slug: 'paramedical-diploma', courseLevel: 'Diploma', duration: '2-3 Years', active: true },
      
      // Vocational Courses
      { streamId: vocSkillId, name: 'Vocational Certification', slug: 'vocational-cert', courseLevel: 'Certificate', duration: '6 Months - 1 Year', active: true }
    ]);
    
    const engCourseId = courses.find(c => c.slug === 'engineering-ug')?._id;
    const bscCourseId = courses.find(c => c.slug === 'bsc')?._id;
    const bcomCourseId = courses.find(c => c.slug === 'bcom')?._id;
    const baCourseId = courses.find(c => c.slug === 'ba')?._id;
    const dipEngCourseId = courses.find(c => c.slug === 'diploma-engineering-course')?._id;
    const itiEngCourseId = courses.find(c => c.slug === 'iti-engineering-course')?._id;
    const paramedicalCourseId = courses.find(c => c.slug === 'paramedical-diploma')?._id;
    const vocationalCourseId = courses.find(c => c.slug === 'vocational-cert')?._id;

    // --------------------------------------------------
    // 7. Branches / Specializations
    // --------------------------------------------------
    console.log('Seeding Branches...');
    const branches = await Branch.insertMany([
      // Engineering Branches
      { courseId: engCourseId, name: 'Computer Science & Engineering', slug: 'cse', active: true },
      { courseId: engCourseId, name: 'Information Science & Engineering', slug: 'ise', active: true },
      { courseId: engCourseId, name: 'Artificial Intelligence & Machine Learning', slug: 'aiml', active: true },
      { courseId: engCourseId, name: 'Electronics & Communication', slug: 'ece', active: true },
      { courseId: engCourseId, name: 'Mechanical Engineering', slug: 'me', active: true },
      
      // B.Sc Branches
      { courseId: bscCourseId, name: 'B.Sc Biotechnology', slug: 'bsc-biotech', active: true },
      { courseId: bscCourseId, name: 'B.Sc Computer Science', slug: 'bsc-cs', active: true },
      { courseId: bscCourseId, name: 'B.Sc Agriculture', slug: 'bsc-agri', active: true },
      
      // B.Com Branches
      { courseId: bcomCourseId, name: 'B.Com General', slug: 'bcom-gen', active: true },
      { courseId: bcomCourseId, name: 'B.Com Accounting & Finance', slug: 'bcom-af', active: true },
      { courseId: bcomCourseId, name: 'B.Com Banking & Insurance', slug: 'bcom-bi', active: true },
      { courseId: bcomCourseId, name: 'B.Com Taxation', slug: 'bcom-tax', active: true },

      // BA Branches
      { courseId: baCourseId, name: 'BA History', slug: 'ba-history', active: true },
      { courseId: baCourseId, name: 'BA Political Science', slug: 'ba-political-science', active: true },
      { courseId: baCourseId, name: 'BA Psychology', slug: 'ba-psychology', active: true },
      { courseId: baCourseId, name: 'BA Economics', slug: 'ba-economics', active: true },
      { courseId: baCourseId, name: 'BA Journalism', slug: 'ba-journalism', active: true },
      
      // Diploma Engineering Branches
      { courseId: dipEngCourseId, name: 'Computer Science Engineering', slug: 'dip-cse', active: true },
      { courseId: dipEngCourseId, name: 'Electronics & Communication', slug: 'dip-ece', active: true },
      { courseId: dipEngCourseId, name: 'Mechanical Engineering', slug: 'dip-me', active: true },
      { courseId: dipEngCourseId, name: 'Civil Engineering', slug: 'dip-ce', active: true },
      
      // ITI Trades
      { courseId: itiEngCourseId, name: 'Electrician', slug: 'iti-electrician', active: true },
      { courseId: itiEngCourseId, name: 'Fitter', slug: 'iti-fitter', active: true },
      { courseId: itiEngCourseId, name: 'Welder', slug: 'iti-welder', active: true },
      { courseId: itiEngCourseId, name: 'COPA (Computer Operator)', slug: 'iti-copa', active: true },
      
      // Paramedical Branches
      { courseId: paramedicalCourseId, name: 'Medical Laboratory Technology (MLT)', slug: 'para-mlt', active: true },
      { courseId: paramedicalCourseId, name: 'Radiology / Medical Imaging', slug: 'para-radiology', active: true },
      { courseId: paramedicalCourseId, name: 'Operation Theatre Technology', slug: 'para-ott', active: true },
      
      // Vocational Branches
      { courseId: vocationalCourseId, name: 'Retail Management', slug: 'voc-retail', active: true },
      { courseId: vocationalCourseId, name: 'Tourism & Hospitality', slug: 'voc-tourism', active: true },
      { courseId: vocationalCourseId, name: 'Beauty & Wellness', slug: 'voc-beauty', active: true },
      { courseId: vocationalCourseId, name: 'Fashion Design', slug: 'voc-fashion', active: true }
    ]);
    
    console.log('\n--- SEED COMPLETE ---');
    console.log(`Education Levels: ${edLevels.length}`);
    console.log(`Pathways: ${pathways.length}`);
    console.log(`Streams: ${streams.length}`);
    console.log(`Subjects: ${subjects.length}`);
    console.log(`Subject Combinations: ${scienceCombos.length + commerceCombos.length + artsCombos.length}`);
    console.log(`Courses: ${courses.length}`);
    console.log(`Branches: ${branches.length}`);
    
    await disconnectDB();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedData();
