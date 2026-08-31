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
import Exam from '../models/Exam.js';
import Subject from '../models/Subject.js';
import SubjectCombination from '../models/SubjectCombination.js';
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
    await College.deleteMany({ source: 'seed' });
    await Career.deleteMany({});
    await Exam.deleteMany({});
    await Subject.deleteMany({});
    await SubjectCombination.deleteMany({});

    console.log('Old data wiped. Creating comprehensive taxonomy...');

    // ==========================================
    // EXAMS & CAREERS (Basic setup)
    // ==========================================
    const examsData = [
      { examId: 'jee-main', name: 'JEE Main', level: 'National', category: 'Engineering', type: 'Entrance Exam' },
      { examId: 'neet-ug', name: 'NEET UG', level: 'National', category: 'Medical', type: 'Entrance Exam' }
    ];
    await Exam.insertMany(examsData);

    const careersData = [
      { name: 'Software Engineer', slug: 'software-engineer', industry: 'IT / Tech', salaryRange: '₹4L - ₹20L+', skills: ['Programming', 'Problem Solving'] },
      { name: 'Data Scientist', slug: 'data-scientist', industry: 'IT / Tech', salaryRange: '₹6L - ₹25L+', skills: ['Python', 'Machine Learning', 'Math'] },
      { name: 'Civil Engineer', slug: 'civil-engineer', industry: 'Construction', salaryRange: '₹3L - ₹12L+', skills: ['AutoCAD', 'Structural Design'] },
      { name: 'Doctor (MBBS)', slug: 'doctor-mbbs', industry: 'Healthcare', salaryRange: '₹6L - ₹30L+', skills: ['Medical Knowledge', 'Patient Care'] }
    ];
    const createdCareers = await Career.insertMany(careersData);
    const swEngId = createdCareers[0]._id;
    const dataSciId = createdCareers[1]._id;
    const civilEngId = createdCareers[2]._id;
    const doctorId = createdCareers[3]._id;

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
      { name: 'Geology', slug: 'geology' }
    ];
    const createdSubjects = await Subject.insertMany(subjectsData);
    const subMap: Record<string, string> = {};
    createdSubjects.forEach(s => subMap[s.slug] = (s._id as any).toString());

    // ==========================================
    // EDUCATION LEVELS & PATHWAYS & STREAMS
    // ==========================================
    const after10 = await EducationLevel.create({ name: 'After 10th', slug: 'after-10th', order: 1 });
    const after12 = await EducationLevel.create({ name: 'After 12th', slug: 'after-12th', order: 2 });

    // 1. PUC / 11th-12th
    const pathway12th = await Pathway.create({ educationLevelId: after10._id, name: '12th / PUC / Intermediate', slug: '12th-intermediate', duration: '2 Years', order: 1 });
    const scienceStream = await Stream.create({ pathwayId: pathway12th._id, name: 'Science', slug: '12th-science', order: 1, duration: '2 Years', typicalStructure: ['I PUC', 'II PUC'] });
    const commerceStream = await Stream.create({ pathwayId: pathway12th._id, name: 'Commerce', slug: '12th-commerce', order: 2, duration: '2 Years' });
    const artsStream = await Stream.create({ pathwayId: pathway12th._id, name: 'Arts / Humanities', slug: '12th-arts', order: 3, duration: '2 Years' });

    // 2. Diploma / Polytechnic
    const pathwayDiploma = await Pathway.create({ educationLevelId: after10._id, name: 'Diploma / Polytechnic', slug: 'diploma-polytechnic', duration: '3 Years', order: 2 });
    const engDiploma = await Stream.create({ pathwayId: pathwayDiploma._id, name: 'Engineering', slug: 'diploma-eng', order: 1 });
    const nonEngDiploma = await Stream.create({ pathwayId: pathwayDiploma._id, name: 'Non-Engineering', slug: 'diploma-non-eng', order: 2 });
    const specDiploma = await Stream.create({ pathwayId: pathwayDiploma._id, name: 'Specialised Diploma', slug: 'diploma-spec', order: 3 });

    // 3. ITI
    const pathwayITI = await Pathway.create({ educationLevelId: after10._id, name: 'ITI (Industrial Training Institute)', slug: 'iti', duration: '1-2 Years', order: 3 });
    const itiStream = await Stream.create({ pathwayId: pathwayITI._id, name: 'ITI Trades', slug: 'iti-trades', order: 1 });

    // 4. Paramedical / Allied Health
    const pathwayParamedical = await Pathway.create({ educationLevelId: after10._id, name: 'Paramedical / Allied Health', slug: 'paramedical', duration: '2-3 Years', order: 4 });
    const paraStream = await Stream.create({ pathwayId: pathwayParamedical._id, name: 'Paramedical Programs', slug: 'para-programs', order: 1 });

    // 5. Vocational / Skill Education
    const pathwayVocational = await Pathway.create({ educationLevelId: after10._id, name: 'Vocational / Skill Education', slug: 'vocational', duration: 'Varies', order: 5 });
    const vocStream = await Stream.create({ pathwayId: pathwayVocational._id, name: 'Vocational Sectors', slug: 'voc-sectors', order: 1 });

    // 6. Apprenticeship / Skill Training
    const pathwayApprentice = await Pathway.create({ educationLevelId: after10._id, name: 'Apprenticeship / Skill Training', slug: 'apprenticeship', duration: 'Varies', order: 6 });
    const appStream = await Stream.create({ pathwayId: pathwayApprentice._id, name: 'Apprenticeship Sectors', slug: 'app-sectors', order: 1 });

    // 7. Other recognised pathways
    const pathwayOther = await Pathway.create({ educationLevelId: after10._id, name: 'Other Recognised Pathways', slug: 'other-pathways', duration: 'Varies', order: 7 });
    const otherStream = await Stream.create({ pathwayId: pathwayOther._id, name: 'Alternative Pathways', slug: 'other-streams', order: 1 });

    // ==========================================
    // SUBJECT COMBINATIONS (And mapped Trades/Programs for dynamic drilldown UI)
    // ==========================================
    const combinationsData = [
      // SCIENCE
      { streamId: scienceStream._id, name: 'PCMB', slug: 'pcmb', subjects: [subMap['physics'], subMap['chemistry'], subMap['mathematics'], subMap['biology']], eligibility: 'Passed 10th / SSLC or equivalent.' },
      { streamId: scienceStream._id, name: 'PCMC / PCMCs', slug: 'pcmc', subjects: [subMap['physics'], subMap['chemistry'], subMap['mathematics'], subMap['computer-science']], eligibility: 'Passed 10th / SSLC or equivalent.' },
      { streamId: scienceStream._id, name: 'PCME', slug: 'pcme', subjects: [subMap['physics'], subMap['chemistry'], subMap['mathematics'], subMap['electronics']], eligibility: 'Passed 10th / SSLC or equivalent.' },
      { streamId: scienceStream._id, name: 'PCMS / SPCM', slug: 'pcms', subjects: [subMap['physics'], subMap['chemistry'], subMap['mathematics'], subMap['statistics']], eligibility: 'Passed 10th / SSLC or equivalent.' },
      { streamId: scienceStream._id, name: 'PCB / Biology-oriented', slug: 'pcb', subjects: [subMap['physics'], subMap['chemistry'], subMap['biology']], eligibility: 'Passed 10th / SSLC or equivalent.' },
      { streamId: scienceStream._id, name: 'PCBH', slug: 'pcbh', subjects: [subMap['physics'], subMap['chemistry'], subMap['biology'], subMap['home-science']], eligibility: 'Passed 10th / SSLC or equivalent.' },
      { streamId: scienceStream._id, name: 'PCMG', slug: 'pcmg', subjects: [subMap['physics'], subMap['chemistry'], subMap['mathematics'], subMap['geology']], eligibility: 'Passed 10th / SSLC or equivalent.' },

      // COMMERCE
      { streamId: commerceStream._id, name: 'CEBA / Computer Science', slug: 'ceba', subjects: [] },
      { streamId: commerceStream._id, name: 'SEBA', slug: 'seba', subjects: [] },
      { streamId: commerceStream._id, name: 'MEBA', slug: 'meba', subjects: [] },
      { streamId: commerceStream._id, name: 'MSBA', slug: 'msba', subjects: [] },
      { streamId: commerceStream._id, name: 'Other approved combinations', slug: 'com-other', subjects: [] },

      // ARTS
      { streamId: artsStream._id, name: 'HEPS', slug: 'heps', subjects: [] },
      { streamId: artsStream._id, name: 'HESP', slug: 'hesp', subjects: [] },
      { streamId: artsStream._id, name: 'History', slug: 'arts-history', subjects: [] },
      { streamId: artsStream._id, name: 'Economics', slug: 'arts-economics', subjects: [] },
      { streamId: artsStream._id, name: 'Political Science', slug: 'arts-political', subjects: [] },
      { streamId: artsStream._id, name: 'Sociology', slug: 'arts-sociology', subjects: [] },
      { streamId: artsStream._id, name: 'Psychology', slug: 'arts-psychology', subjects: [] },
      { streamId: artsStream._id, name: 'Languages', slug: 'arts-languages', subjects: [] },

      // DIPLOMA - ENG
      { streamId: engDiploma._id, name: 'Computer Science', slug: 'dip-cs', subjects: [] },
      { streamId: engDiploma._id, name: 'Information Science', slug: 'dip-is', subjects: [] },
      { streamId: engDiploma._id, name: 'Electronics & Communication', slug: 'dip-ec', subjects: [] },
      { streamId: engDiploma._id, name: 'Electrical', slug: 'dip-ee', subjects: [] },
      { streamId: engDiploma._id, name: 'Mechanical', slug: 'dip-mech', subjects: [] },
      { streamId: engDiploma._id, name: 'Civil', slug: 'dip-civil', subjects: [] },
      { streamId: engDiploma._id, name: 'Automobile', slug: 'dip-auto', subjects: [] },
      { streamId: engDiploma._id, name: 'Mechatronics', slug: 'dip-mechatronics', subjects: [] },
      { streamId: engDiploma._id, name: 'Instrumentation', slug: 'dip-inst', subjects: [] },
      { streamId: engDiploma._id, name: 'Chemical', slug: 'dip-chem', subjects: [] },
      { streamId: engDiploma._id, name: 'Other approved diploma branches', slug: 'dip-other-eng', subjects: [] },

      // DIPLOMA - NON ENG
      { streamId: nonEngDiploma._id, name: 'Commercial Practice', slug: 'dip-comm', subjects: [] },
      { streamId: nonEngDiploma._id, name: 'Computer Applications', slug: 'dip-ca', subjects: [] },
      { streamId: nonEngDiploma._id, name: 'Other programs', slug: 'dip-other-non', subjects: [] },

      // DIPLOMA - SPEC
      { streamId: specDiploma._id, name: 'Agriculture', slug: 'dip-agri', subjects: [] },
      { streamId: specDiploma._id, name: 'Pharmacy', slug: 'dip-pharm', subjects: [] },
      { streamId: specDiploma._id, name: 'Health-related', slug: 'dip-health', subjects: [] },
      { streamId: specDiploma._id, name: 'Other recognised programs', slug: 'dip-spec-other', subjects: [] },

      // ITI
      { streamId: itiStream._id, name: 'Electrician', slug: 'iti-electrician', subjects: [] },
      { streamId: itiStream._id, name: 'Fitter', slug: 'iti-fitter', subjects: [] },
      { streamId: itiStream._id, name: 'Welder', slug: 'iti-welder', subjects: [] },
      { streamId: itiStream._id, name: 'COPA', slug: 'iti-copa', subjects: [] },
      { streamId: itiStream._id, name: 'Mechanic', slug: 'iti-mechanic', subjects: [] },
      { streamId: itiStream._id, name: 'Electronics Mechanic', slug: 'iti-elec-mech', subjects: [] },
      { streamId: itiStream._id, name: 'Turner', slug: 'iti-turner', subjects: [] },
      { streamId: itiStream._id, name: 'Machinist', slug: 'iti-machinist', subjects: [] },
      { streamId: itiStream._id, name: 'Plumber', slug: 'iti-plumber', subjects: [] },
      { streamId: itiStream._id, name: 'Draughtsman', slug: 'iti-draughtsman', subjects: [] },
      { streamId: itiStream._id, name: 'Refrigeration & Air Conditioning', slug: 'iti-rac', subjects: [] },
      { streamId: itiStream._id, name: 'Other ITI trades', slug: 'iti-other', subjects: [] },

      // PARAMEDICAL
      { streamId: paraStream._id, name: 'Medical Laboratory Technology', slug: 'para-mlt', subjects: [] },
      { streamId: paraStream._id, name: 'Medical Imaging / Radiology', slug: 'para-radiology', subjects: [] },
      { streamId: paraStream._id, name: 'Dialysis Technology', slug: 'para-dialysis', subjects: [] },
      { streamId: paraStream._id, name: 'Health Inspector', slug: 'para-inspector', subjects: [] },
      { streamId: paraStream._id, name: 'Ophthalmic Technology', slug: 'para-ophthalmic', subjects: [] },
      { streamId: paraStream._id, name: 'OT & Anaesthesia Technology', slug: 'para-ot', subjects: [] },
      { streamId: paraStream._id, name: 'Medical Record Technology', slug: 'para-record', subjects: [] },
      { streamId: paraStream._id, name: 'Dental Mechanic', slug: 'para-dental-mech', subjects: [] },
      { streamId: paraStream._id, name: 'Dental Hygiene', slug: 'para-dental-hyg', subjects: [] },
      { streamId: paraStream._id, name: 'Other recognised programs', slug: 'para-other', subjects: [] },

      // VOCATIONAL
      { streamId: vocStream._id, name: 'IT / Computer Applications', slug: 'voc-it', subjects: [] },
      { streamId: vocStream._id, name: 'Retail', slug: 'voc-retail', subjects: [] },
      { streamId: vocStream._id, name: 'Tourism', slug: 'voc-tourism', subjects: [] },
      { streamId: vocStream._id, name: 'Hospitality', slug: 'voc-hospitality', subjects: [] },
      { streamId: vocStream._id, name: 'Fashion', slug: 'voc-fashion', subjects: [] },
      { streamId: vocStream._id, name: 'Beauty & Wellness', slug: 'voc-beauty', subjects: [] },
      { streamId: vocStream._id, name: 'Media', slug: 'voc-media', subjects: [] },
      { streamId: vocStream._id, name: 'Healthcare', slug: 'voc-health', subjects: [] },
      { streamId: vocStream._id, name: 'Agriculture', slug: 'voc-agri', subjects: [] },
      { streamId: vocStream._id, name: 'Other vocational programs', slug: 'voc-other', subjects: [] },

      // APPRENTICESHIP
      { streamId: appStream._id, name: 'Technical trades', slug: 'app-tech', subjects: [] },
      { streamId: appStream._id, name: 'Manufacturing', slug: 'app-mfg', subjects: [] },
      { streamId: appStream._id, name: 'Electrical', slug: 'app-ee', subjects: [] },
      { streamId: appStream._id, name: 'Automotive', slug: 'app-auto', subjects: [] },
      { streamId: appStream._id, name: 'IT', slug: 'app-it', subjects: [] },
      { streamId: appStream._id, name: 'Service-sector skills', slug: 'app-service', subjects: [] },

      // OTHER
      { streamId: otherStream._id, name: 'Open schooling', slug: 'oth-open', subjects: [] },
      { streamId: otherStream._id, name: 'Skill-development programs', slug: 'oth-skill', subjects: [] },
      { streamId: otherStream._id, name: 'Job-oriented certificate programs', slug: 'oth-job', subjects: [] },
      { streamId: otherStream._id, name: 'Other approved alternatives', slug: 'oth-other', subjects: [] },
    ];
    const createdCombinations = await SubjectCombination.insertMany(combinationsData);
    const comboMap: Record<string, string> = {};
    createdCombinations.forEach(c => comboMap[c.slug] = (c._id as any).toString());

    // ==========================================
    // DATA MAPPING FOR COURSES & BRANCHES
    // ==========================================
    const comboMappings: Record<string, Record<string, string[]>> = {
      pcmb: {
        'Engineering & Technology': ['Computer Science Engineering', 'Artificial Intelligence & Machine Learning', 'Data Science', 'Information Science', 'Electronics & Communication', 'Electrical & Electronics', 'Mechanical', 'Civil', 'Chemical', 'Aerospace', 'Biotechnology', 'Biomedical Engineering'],
        'Medical': ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BSMS', 'BUMS', 'Veterinary'],
        'Allied Health Sciences': ['B.Sc Nursing', 'BPT', 'B.Sc Medical Laboratory Technology', 'B.Sc Radiology', 'B.Sc Imaging Technology', 'B.Sc Operation Theatre Technology', 'B.Sc Emergency Care', 'Optometry', 'Cardiac Care'],
        'Pharmacy': ['B.Pharm', 'Pharm.D'],
        'Agriculture': ['B.Sc Agriculture', 'Horticulture', 'Forestry', 'Sericulture', 'Fisheries'],
        'Pure Science': ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Biology', 'B.Sc Statistics', 'B.Sc Geology'],
        'Computer / IT': ['BCA', 'B.Sc Computer Science', 'B.Sc Data Science', 'B.Sc AI', 'B.Sc Cyber Security']
      },
      pcmc: {
        'Engineering & Technology': ['Computer Science', 'AI & Machine Learning', 'Data Science', 'Cyber Security', 'Information Science', 'Software Engineering', 'Cloud Computing', 'Information Technology', 'Computer Applications', 'Electronics & Communication', 'Electrical Engineering', 'Robotics', 'Automation', 'Mechanical', 'Civil', 'Architecture']
      },
      pcme: {
        'Engineering & Technology': ['Electronics & Communication', 'Electrical & Electronics', 'Electronics Engineering', 'Embedded Systems', 'VLSI', 'Robotics', 'Automation', 'Mechatronics', 'Instrumentation', 'Computer Engineering', 'Telecommunications']
      },
      pcms: {
        'Data & Mathematical Sciences': ['Statistics', 'Data Science', 'Data Analytics', 'Mathematics', 'Actuarial Science', 'Economics', 'Computer Science', 'Artificial Intelligence', 'Financial Analytics']
      },
      pcb: {
        'Medical & Life Sciences': ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Physiotherapy', 'Allied Health', 'Biotechnology', 'Microbiology', 'Biochemistry', 'Zoology', 'Botany']
      },
      pcbh: {
        'Home Science & Nutrition': ['Nutrition & Dietetics', 'Food Science', 'Home Science', 'Human Development', 'Family Resource Management', 'Nursing', 'Allied Health', 'Life Sciences']
      },
      pcmg: {
        'Earth Sciences & Environment': ['Geology', 'Earth Science', 'Geophysics', 'Environmental Science', 'Mining Engineering', 'Civil Engineering', 'Petroleum / Energy-related fields', 'Geography', 'Earth & Environmental Research']
      }
    };

    const areaNamesMap: Record<string, string> = {
      'Engineering & Technology': 'B.E. / B.Tech Degrees',
      'Medical': 'Medical Degrees',
      'Allied Health Sciences': 'Allied Health Degrees',
      'Pharmacy': 'Pharmacy Degrees',
      'Agriculture': 'Agriculture Degrees',
      'Pure Science': 'Pure Science Degrees',
      'Computer / IT': 'Computer / IT Degrees',
      'Data & Mathematical Sciences': 'Data & Mathematical Degrees',
      'Medical & Life Sciences': 'Medical & Life Sciences Degrees',
      'Home Science & Nutrition': 'Home Science & Nutrition Degrees',
      'Earth Sciences & Environment': 'Earth Sciences & Environment Degrees'
    };

    const areaBranches: Record<string, Set<string>> = {};
    const areaCombos: Record<string, Set<string>> = {};

    Object.entries(comboMappings).forEach(([comboSlug, areaMap]) => {
      Object.entries(areaMap).forEach(([area, branches]) => {
        if (!areaBranches[area]) areaBranches[area] = new Set();
        if (!areaCombos[area]) areaCombos[area] = new Set();
        branches.forEach(b => areaBranches[area].add(b));
        areaCombos[area].add(comboMap[comboSlug]);
      });
    });

    const coursesToInsert = Object.keys(areaBranches).map(area => ({
      name: areaNamesMap[area] || `Degrees in ${area}`,
      slug: slugify(`course-${area}`),
      courseLevel: 'Undergraduate',
      higherStudyArea: area,
      eligibleCombinations: Array.from(areaCombos[area])
    }));

    const createdCourses = await Course.insertMany(coursesToInsert);
    const courseObjMap: Record<string, string> = {};
    createdCourses.forEach(c => courseObjMap[c.higherStudyArea!] = (c._id as any).toString());

    const branchesToInsert: any[] = [];
    Object.keys(areaBranches).forEach(area => {
      const courseId = courseObjMap[area];
      Array.from(areaBranches[area]).forEach(branchName => {
        branchesToInsert.push({
          courseId,
          name: branchName,
          slug: slugify(`branch-${area}-${branchName}`)
        });
      });
    });

    await Branch.insertMany(branchesToInsert);

    console.log('Successfully seeded fully normalized taxonomy with requested hierarchical branches!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedRealData();
