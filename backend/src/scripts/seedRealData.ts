import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import EducationLevel from '../models/EducationLevel.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import Course from '../models/Course.js';
import Branch from '../models/Branch.js';
import Specialization from '../models/Specialization.js';
import College from '../models/College.js';
import Career from '../models/Career.js';
import { realColleges } from './realCollegesData.js';
import { massiveRealColleges } from './realCollegesDataMassive.js';
import { State, District, Taluk, City } from '../models/Geography.js';
import Exam from '../models/Exam.js';
import Subject from '../models/Subject.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Trade from '../models/Trade.js';
import JobRole from '../models/JobRole.js';
import Industry from '../models/Industry.js';
import State from '../models/State.js';
import District from '../models/District.js';
import Taluk from '../models/Taluk.js';
import City from '../models/City.js';
import CollegeCourse from '../models/CollegeCourse.js';
import { connectDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const seedRealData = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Wiping old data...');

    // Wipe existing data
    await EducationLevel.deleteMany({});
    await Pathway.deleteMany({});
    await Stream.deleteMany({});
    await Course.deleteMany({});
    await Branch.deleteMany({});
    await Specialization.deleteMany({});
    await College.deleteMany({});
    await Career.deleteMany({});
    await Exam.deleteMany({});
    await Subject.deleteMany({});
    await SubjectCombination.deleteMany({});
    await Trade.deleteMany({});
    await JobRole.deleteMany({});
    await Industry.deleteMany({});
    await State.deleteMany({});
    await District.deleteMany({});
    await Taluk.deleteMany({});
    await City.deleteMany({});
    await CollegeCourse.deleteMany({});

    console.log('Old data wiped. Creating comprehensive, fully connected taxonomy...');

    // ==========================================
    // INDUSTRIES
    // ==========================================
    const itIndustry = await Industry.create({ name: 'IT & Technology', slug: 'it-tech' });
    const healthcareIndustry = await Industry.create({ name: 'Healthcare & Medicine', slug: 'healthcare-medicine' });
    const engineeringIndustry = await Industry.create({ name: 'Engineering & Construction', slug: 'engineering-construction' });
    const financeIndustry = await Industry.create({ name: 'Finance & Banking', slug: 'finance-banking' });

    // ==========================================
    // CAREERS & JOB ROLES
    // ==========================================
    const swEngCareer = await Career.create({ name: 'Software Engineering', slug: 'software-engineering', industry: 'IT & Technology', salaryRange: '₹4L - ₹20L+', skills: ['Programming', 'Problem Solving', 'Algorithms'] });
    const swEngJob = await JobRole.create({ careerId: swEngCareer._id, industryId: itIndustry._id, name: 'Software Engineer', slug: 'software-engineer', averageSalary: '₹8L' });

    const doctorCareer = await Career.create({ name: 'Medicine', slug: 'medicine', industry: 'Healthcare & Medicine', salaryRange: '₹6L - ₹30L+', skills: ['Patient Care', 'Medical Knowledge'] });
    const doctorJob = await JobRole.create({ careerId: doctorCareer._id, industryId: healthcareIndustry._id, name: 'Doctor', slug: 'doctor', averageSalary: '₹12L' });

    const electricianCareer = await Career.create({ name: 'Electrical Technician', slug: 'electrical-technician', industry: 'Engineering & Construction', salaryRange: '₹2L - ₹6L', skills: ['Wiring', 'Safety Protocols'] });
    const electricianJob = await JobRole.create({ careerId: electricianCareer._id, industryId: engineeringIndustry._id, name: 'Electrician', slug: 'electrician', averageSalary: '₹3L' });

    // ==========================================
    // EXAMS
    // ==========================================
    const jeeMain = await Exam.create({ examId: 'jee-main', name: 'JEE Main', level: 'National', category: 'Engineering', type: 'Entrance Exam', ugPg: 'UG', status: 'Active' });
    const neetUg = await Exam.create({ examId: 'neet-ug', name: 'NEET UG', level: 'National', category: 'Medical', type: 'Entrance Exam', ugPg: 'UG', status: 'Active' });
    const kcet = await Exam.create({ examId: 'kcet', name: 'KCET', level: 'State', category: 'Engineering', type: 'Entrance Exam', ugPg: 'UG', status: 'Active' });

    // ==========================================
    // GEOGRAPHY
    // ==========================================
    const karnataka = await State.create({ name: 'Karnataka', slug: 'karnataka', code: 'KA', country: 'India' });
    
    // Create Districts
    const districtsData = [
      { name: 'Bagalkot', division: 'Belagavi' },
      { name: 'Ballari (Bellary)', division: 'Kalaburagi' },
      { name: 'Belagavi (Belgaum)', division: 'Belagavi' },
      { name: 'Bengaluru (Bangalore) Rural', division: 'Bengaluru' },
      { name: 'Bengaluru (Bangalore) Urban', division: 'Bengaluru' },
      { name: 'Bidar', division: 'Kalaburagi' },
      { name: 'Chamarajanagar', division: 'Mysuru' },
      { name: 'Chikballapur', division: 'Bengaluru' },
      { name: 'Chikkamagaluru (Chikmagalur)', division: 'Mysuru' },
      { name: 'Chitradurga', division: 'Bengaluru' },
      { name: 'Dakshina Kannada', division: 'Mysuru' },
      { name: 'Davanagere', division: 'Bengaluru' },
      { name: 'Dharwad', division: 'Belagavi' },
      { name: 'Gadag', division: 'Belagavi' },
      { name: 'Hassan', division: 'Mysuru' },
      { name: 'Haveri', division: 'Belagavi' },
      { name: 'Kalaburagi (Gulbarga)', division: 'Kalaburagi' },
      { name: 'Kodagu', division: 'Mysuru' },
      { name: 'Kolar', division: 'Bengaluru' },
      { name: 'Koppal', division: 'Kalaburagi' },
      { name: 'Mandya', division: 'Mysuru' },
      { name: 'Mysuru (Mysore)', division: 'Mysuru' },
      { name: 'Raichur', division: 'Kalaburagi' },
      { name: 'Ramanagara', division: 'Bengaluru' },
      { name: 'Shivamogga (Shimoga)', division: 'Bengaluru' },
      { name: 'Tumakuru (Tumkur)', division: 'Bengaluru' },
      { name: 'Udupi', division: 'Mysuru' },
      { name: 'Uttara Kannada (Karwar)', division: 'Belagavi' },
      { name: 'Vijayapura (Bijapur)', division: 'Belagavi' },
      { name: 'Yadgir', division: 'Kalaburagi' }
    ];

    const createdDistricts = await Promise.all(districtsData.map(d => 
      District.create({ name: d.name, slug: slugify(d.name), division: d.division, stateId: karnataka._id })
    ));
    const districtMap: Record<string, mongoose.Types.ObjectId> = {};
    createdDistricts.forEach(d => districtMap[d.slug] = d._id as mongoose.Types.ObjectId);

    const bangaloreUrbanId = districtMap['bengaluru-bangalore-urban'];

    // Create some Cities
    const cityBangalore = await City.create({ name: 'Bangalore', slug: 'bangalore', districtId: bangaloreUrbanId, stateId: karnataka._id });

    // ==========================================
    // COLLEGES
    // ==========================================
    const createdCollegesMap: Record<string, any> = {};
    for (const data of realColleges) {
      const distSlug = slugify(data.district);
      const districtId = districtMap[distSlug];
      
      const college = await College.create({
        ...data,
        slug: slugify(data.name),
        state: 'Karnataka',
        stateRef: karnataka._id,
        districtRef: districtId,
        status: 'ACTIVE',
        source: 'seed'
      });
      createdCollegesMap[data.sourceId] = college;
    }

    // Seed the massive dataset
    console.log(`Seeding ${massiveRealColleges.length} massive dataset colleges...`);
    for (const data of massiveRealColleges) {
      const distSlug = slugify(data.district);
      const districtId = districtMap[distSlug];
      
      const college = await College.create({
        ...data,
        slug: slugify(data.name),
        state: 'Karnataka',
        stateRef: karnataka._id,
        districtRef: districtId,
        status: 'ACTIVE',
        source: 'gemini-pro-knowledge'
      });
      createdCollegesMap[data.sourceId || slugify(data.name)] = college;
    }

    // ==========================================
    // SUBJECTS
    // ==========================================
    const subjectsData = [
      { name: 'Physics', slug: 'physics' },
      { name: 'Chemistry', slug: 'chemistry' },
      { name: 'Mathematics', slug: 'mathematics' },
      { name: 'Biology', slug: 'biology' },
      { name: 'Computer Science', slug: 'computer-science' },
      { name: 'Electronics', slug: 'electronics' },
      { name: 'Statistics', slug: 'statistics' },
      { name: 'Home Science', slug: 'home-science' },
      { name: 'Geology', slug: 'geology' },
      { name: 'History', slug: 'history' },
      { name: 'Economics', slug: 'economics' },
      { name: 'Political Science', slug: 'political-science' },
      { name: 'Sociology', slug: 'sociology' },
      { name: 'Business Studies', slug: 'business-studies' },
      { name: 'Accountancy', slug: 'accountancy' }
    ];
    const createdSubjects = await Subject.insertMany(subjectsData);
    const subMap: Record<string, string> = {};
    createdSubjects.forEach(s => subMap[s.slug] = (s._id as any).toString());

    // ==========================================
    // EDUCATION LEVELS & PATHWAYS
    // ==========================================
    const after10 = await EducationLevel.create({ name: 'After 10th', slug: 'after-10th', order: 1 });
    const after12 = await EducationLevel.create({ name: 'After 12th', slug: 'after-12th', order: 2 });
    const diplomaLevel = await EducationLevel.create({ name: 'Diploma', slug: 'diploma', order: 3 });
    const itiLevel = await EducationLevel.create({ name: 'ITI', slug: 'iti', order: 4 });
    const ugLevel = await EducationLevel.create({ name: 'Undergraduate / UG', slug: 'ug', order: 5 });
    const pgLevel = await EducationLevel.create({ name: 'Postgraduate / PG', slug: 'pg', order: 6 });

    // 1. PUC / 11th-12th
    const pathwayPUC = await Pathway.create({ educationLevelId: after10._id, name: 'PUC / 11th–12th', slug: 'puc', duration: '2 Years', order: 1 });
    
    // Streams for PUC
    const scienceStream = await Stream.create({ pathwayId: pathwayPUC._id, name: 'Science', slug: 'science', order: 1, duration: '2 Years' });
    const commerceStream = await Stream.create({ pathwayId: pathwayPUC._id, name: 'Commerce', slug: 'commerce', order: 2, duration: '2 Years' });
    const artsStream = await Stream.create({ pathwayId: pathwayPUC._id, name: 'Arts / Humanities', slug: 'arts', order: 3, duration: '2 Years' });
    const vocPucStream = await Stream.create({ pathwayId: pathwayPUC._id, name: 'Vocational', slug: 'vocational-puc', order: 4, duration: '2 Years' });

    // 2. Diploma / Polytechnic
    const pathwayDiploma = await Pathway.create({ educationLevelId: after10._id, name: 'Diploma / Polytechnic', slug: 'diploma', duration: '3 Years', order: 2 });
    const dipEngStream = await Stream.create({ pathwayId: pathwayDiploma._id, name: 'Engineering', slug: 'engineering', order: 1 });
    const dipNonEngStream = await Stream.create({ pathwayId: pathwayDiploma._id, name: 'Non-Engineering', slug: 'non-engineering', order: 2 });

    // 3. ITI
    const pathwayITI = await Pathway.create({ educationLevelId: after10._id, name: 'ITI', slug: 'iti', duration: '1-2 Years', order: 3 });
    const itiTradesStream = await Stream.create({ pathwayId: pathwayITI._id, name: 'ITI Trades', slug: 'trades', order: 1 });

    // 4. Paramedical / Allied Health
    const pathwayPara = await Pathway.create({ educationLevelId: after10._id, name: 'Paramedical / Allied Health', slug: 'paramedical', duration: '2-3 Years', order: 4 });
    const paraStream = await Stream.create({ pathwayId: pathwayPara._id, name: 'Paramedical Programs', slug: 'programs', order: 1 });

    // ==========================================
    // SUBJECT COMBINATIONS (for PUC)
    // ==========================================
    const pcmb = await SubjectCombination.create({ streamId: scienceStream._id, name: 'PCMB', slug: 'pcmb', subjects: [subMap['physics'], subMap['chemistry'], subMap['mathematics'], subMap['biology']], eligibility: 'Passed 10th / SSLC' });
    const pcmc = await SubjectCombination.create({ streamId: scienceStream._id, name: 'PCMC / PCMCs', slug: 'pcmc', subjects: [subMap['physics'], subMap['chemistry'], subMap['mathematics'], subMap['computer-science']], eligibility: 'Passed 10th / SSLC' });
    const pcme = await SubjectCombination.create({ streamId: scienceStream._id, name: 'PCME', slug: 'pcme', subjects: [subMap['physics'], subMap['chemistry'], subMap['mathematics'], subMap['electronics']] });
    
    const ceba = await SubjectCombination.create({ streamId: commerceStream._id, name: 'CEBA', slug: 'ceba', subjects: [subMap['computer-science'], subMap['economics'], subMap['business-studies'], subMap['accountancy']] });
    const seba = await SubjectCombination.create({ streamId: commerceStream._id, name: 'SEBA', slug: 'seba', subjects: [subMap['statistics'], subMap['economics'], subMap['business-studies'], subMap['accountancy']] });

    const heps = await SubjectCombination.create({ streamId: artsStream._id, name: 'HEPS', slug: 'heps', subjects: [subMap['history'], subMap['economics'], subMap['political-science'], subMap['sociology']] });

    // ==========================================
    // COURSES (UG)
    // ==========================================
    const btech = await Course.create({
      name: 'B.E / B.Tech', slug: 'btech', courseLevel: 'Undergraduate', duration: '4 Years',
      higherStudyArea: 'Engineering & Technology',
      eligibleCombinations: [pcmb._id, pcmc._id, pcme._id],
    });
    
    const mbbs = await Course.create({
      name: 'MBBS', slug: 'mbbs', courseLevel: 'Undergraduate', duration: '5.5 Years',
      higherStudyArea: 'Medical',
      eligibleCombinations: [pcmb._id],
    });

    const bcom = await Course.create({
      name: 'B.Com', slug: 'bcom', courseLevel: 'Undergraduate', duration: '3 Years',
      higherStudyArea: 'Commerce & Business',
      eligibleCombinations: [ceba._id, seba._id],
    });

    // ==========================================
    // BRANCHES (Under Courses)
    // ==========================================
    const btechCS = await Branch.create({
      courseId: btech._id, name: 'Computer Science', slug: 'computer-science', duration: '4 Years',
      relatedExams: [jeeMain._id, kcet._id],
      relatedCareers: [swEngCareer._id]
    });
    
    const btechMech = await Branch.create({
      courseId: btech._id, name: 'Mechanical Engineering', slug: 'mechanical-engineering', duration: '4 Years',
      relatedExams: [jeeMain._id, kcet._id]
    });

    const mbbsBranch = await Branch.create({
      courseId: mbbs._id, name: 'Medicine and Surgery', slug: 'medicine-and-surgery', duration: '5.5 Years',
      relatedExams: [neetUg._id],
      relatedCareers: [doctorCareer._id]
    });

    // Add branches to Colleges for backward compatibility with pathway feature
    const rvce = createdCollegesMap['rvce-01'];
    const bmsce = createdCollegesMap['bmsce-01'];
    const bmc = createdCollegesMap['bmcri-02'];
    
    if (rvce) {
      await College.updateOne({ _id: rvce._id }, { $push: { offeredBranchesRef: btechCS._id } });
      await College.updateOne({ _id: rvce._id }, { $push: { offeredBranchesRef: btechMech._id } });
      await CollegeCourse.create({ collegeId: rvce._id, courseId: btech._id, branchId: btechCS._id, duration: '4 Years', fees: '₹10L', academicYear: '2024-25', intake: 120, eligibility: '10+2 with 45% in PCM', programType: 'UG', entranceExamId: kcet._id });
      await CollegeCourse.create({ collegeId: rvce._id, courseId: btech._id, branchId: btechMech._id, duration: '4 Years', fees: '₹10L', academicYear: '2024-25', intake: 60, eligibility: '10+2 with 45% in PCM', programType: 'UG', entranceExamId: kcet._id });
    }
    if (bmsce) {
      await College.updateOne({ _id: bmsce._id }, { $push: { offeredBranchesRef: btechCS._id } });
      await CollegeCourse.create({ collegeId: bmsce._id, courseId: btech._id, branchId: btechCS._id, duration: '4 Years', fees: '₹8L', academicYear: '2024-25', intake: 180, eligibility: '10+2 with 45% in PCM', programType: 'UG', entranceExamId: kcet._id });
    }
    if (bmc) {
      await College.updateOne({ _id: bmc._id }, { $push: { offeredBranchesRef: mbbsBranch._id } });
      await CollegeCourse.create({ collegeId: bmc._id, courseId: mbbs._id, branchId: mbbsBranch._id, duration: '5.5 Years', fees: '₹1L', academicYear: '2024-25', intake: 250, eligibility: '10+2 with PCB, NEET UG', programType: 'UG', entranceExamId: neetUg._id });
    }

    // ==========================================
    // DIPLOMA COURSES & BRANCHES (Connected directly to Stream)
    // ==========================================
    const dipEngCourse = await Course.create({
      name: 'Diploma in Engineering', slug: 'diploma-engineering', courseLevel: 'Diploma', duration: '3 Years',
      streamId: dipEngStream._id
    });
    const dipCS = await Branch.create({
      courseId: dipEngCourse._id, name: 'Computer Science Engineering', slug: 'computer-science-engineering', duration: '3 Years',
      relatedCareers: [swEngCareer._id]
    });

    // ==========================================
    // ITI TRADES (Connected to ITI Stream)
    // ==========================================
    await Trade.create({
      streamId: itiTradesStream._id, name: 'Electrician', slug: 'electrician', duration: '2 Years',
      eligibility: '10th Pass', minimumQualification: '10th',
      apprenticeshipOpportunities: true
    });
    await Trade.create({
      streamId: itiTradesStream._id, name: 'Fitter', slug: 'fitter', duration: '2 Years',
      eligibility: '10th Pass', minimumQualification: '10th',
    });

    console.log('Database seeding completed successfully. The complete graph is now connected!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedRealData();
