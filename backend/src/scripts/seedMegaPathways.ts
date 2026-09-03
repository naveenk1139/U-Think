import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import Subject from '../models/Subject.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Trade from '../models/Trade.js';
import Course from '../models/Course.js';
import Branch from '../models/Branch.js';
import ExamSchedule from '../models/ExamSchedule.js';
import EducationLevel from '../models/EducationLevel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

const runSeed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    // Clean up existing data for clean re-seeding
    await Pathway.deleteMany({});
    await Stream.deleteMany({});
    await Subject.deleteMany({});
    await SubjectCombination.deleteMany({});
    await Trade.deleteMany({});
    await Course.deleteMany({});
    await Branch.deleteMany({});
    await ExamSchedule.deleteMany({});

    // Fetch Level
    let level10 = await EducationLevel.findOne({ slug: 'after-10th' });
    let level12 = await EducationLevel.findOne({ slug: 'after-12th' });

    // 1. PATHWAYS
    const pucPathway = await Pathway.create({
      educationLevelId: level10?._id,
      name: 'PUC (11th-12th)',
      slug: 'puc',
      duration: '2 Years (11th and 12th)',
      entryRequirement: 'SSLC / 10th Pass from any recognized board',
      description: 'Pre-University Course (KSEAB)',
      eligibility: 'Minimum 35% marks in aggregate (varies by college)',
      order: 1
    });

    const itiPathway = await Pathway.create({
      educationLevelId: level10?._id,
      name: 'ITI (Industrial Training Institute)',
      slug: 'iti',
      duration: '1-2 Years',
      entryRequirement: 'SSLC/10th Pass',
      description: 'Skill-based technical training affiliated to NCVT',
      order: 2
    });

    const diplomaPathway = await Pathway.create({
      educationLevelId: level10?._id,
      name: 'Diploma / Polytechnic',
      slug: 'diploma',
      duration: '3 Years',
      entryRequirement: 'SSLC/10th Pass',
      description: 'Technical education regulated by DTE Karnataka',
      eligibility: '10th pass with minimum 35% marks',
      order: 3
    });

    // 2. STREAMS
    const pucScience = await Stream.create({ pathwayId: pucPathway._id, name: 'Science', slug: 'science', order: 1 });
    const pucCommerce = await Stream.create({ pathwayId: pucPathway._id, name: 'Commerce', slug: 'commerce', order: 2 });
    const pucArts = await Stream.create({ pathwayId: pucPathway._id, name: 'Arts / Humanities', slug: 'arts', order: 3 });
    const pucVocational = await Stream.create({ pathwayId: pucPathway._id, name: 'Vocational', slug: 'vocational', order: 4 });
    
    const itiEngineering = await Stream.create({ pathwayId: itiPathway._id, name: 'Engineering Trades', slug: 'iti-engineering', order: 1 });
    const itiNonEngineering = await Stream.create({ pathwayId: itiPathway._id, name: 'Non-Engineering Trades', slug: 'iti-non-engineering', order: 2 });
    
    const diplomaEngineering = await Stream.create({ pathwayId: diplomaPathway._id, name: 'Engineering Branches', slug: 'diploma-engineering', order: 1 });

    // 3. SUBJECTS
    const subData = [
      { name: 'Physics', slug: 'physics', weight: '70% Theory, 30% Practical', prac: '2 Papers (Theory + Practical)' },
      { name: 'Chemistry', slug: 'chemistry', weight: '70% Theory, 30% Practical', prac: '2 Papers (Theory + Practical)' },
      { name: 'Mathematics', slug: 'mathematics', weight: '80% Theory, 20% Internal', prac: '3 Papers' },
      { name: 'Biology', slug: 'biology', weight: '70% Theory, 30% Practical', prac: '2 Papers (Theory + Practical)' },
      { name: 'Computer Science', slug: 'computer-science', weight: '60% Theory, 40% Practical', prac: '3 Papers (Theory + Practical + Project)' },
      { name: 'Statistics', slug: 'statistics', weight: '60% Theory, 40% Practical', prac: '2 Papers' },
      { name: 'Electronics', slug: 'electronics', weight: '60% Theory, 40% Practical', prac: '2 Papers (Theory + Practical)' },
      { name: 'Accountancy', slug: 'accountancy', weight: '70% Theory, 30% Practical', prac: '2 Papers (Theory + Practical)' },
      { name: 'Business Studies', slug: 'business-studies', weight: '80% Theory, 20% Internal', prac: '2 Papers' },
      { name: 'Economics', slug: 'economics', weight: '80% Theory, 20% Internal', prac: '2 Papers' },
      { name: 'History', slug: 'history', weight: '80% Theory, 20% Internal', prac: 'N/A' },
      { name: 'Political Science', slug: 'political-science', weight: '80% Theory, 20% Internal', prac: 'N/A' },
      { name: 'Sociology', slug: 'sociology', weight: '80% Theory, 20% Internal', prac: 'N/A' },
      { name: 'Psychology', slug: 'psychology', weight: '80% Theory, 20% Practical', prac: '2 Papers' },
      { name: 'Kannada', slug: 'kannada', weight: '80% Theory, 20% Internal', prac: 'N/A' },
      { name: 'English', slug: 'english', weight: '80% Theory, 20% Internal', prac: 'N/A' },
    ];
    
    const subjectMap: Record<string, mongoose.Types.ObjectId> = {};
    for (const s of subData) {
      const sub = await Subject.create({ name: s.name, slug: s.slug, syllabusWeightage: s.weight, practicalComponent: s.prac });
      subjectMap[s.slug] = sub._id;
    }

    // 4. SUBJECT COMBINATIONS
    const comboData = [
      { name: 'PCMB', slug: 'pcmb', stream: pucScience._id, subs: ['physics', 'chemistry', 'mathematics', 'biology'] },
      { name: 'PCMSc', slug: 'pcmsc', stream: pucScience._id, subs: ['physics', 'chemistry', 'mathematics', 'computer-science'] },
      { name: 'PCMS', slug: 'pcms', stream: pucScience._id, subs: ['physics', 'chemistry', 'mathematics', 'statistics'] },
      { name: 'PCME', slug: 'pcme', stream: pucScience._id, subs: ['physics', 'chemistry', 'mathematics', 'electronics'] },
      { name: 'PCBA', slug: 'pcba', stream: pucScience._id, subs: ['physics', 'chemistry', 'biology', 'computer-science'] },
      { name: 'PCBSc', slug: 'pcbsc', stream: pucScience._id, subs: ['physics', 'chemistry', 'biology', 'statistics'] },
      
      { name: 'Commerce with Mathematics', slug: 'commerce-math', stream: pucCommerce._id, subs: ['accountancy', 'business-studies', 'economics', 'mathematics'] },
      { name: 'Commerce without Mathematics', slug: 'commerce-nomath', stream: pucCommerce._id, subs: ['accountancy', 'business-studies', 'economics', 'statistics'] },
      
      { name: 'HEP', slug: 'hep', stream: pucArts._id, subs: ['history', 'economics', 'political-science'] },
      { name: 'HEPS', slug: 'heps', stream: pucArts._id, subs: ['history', 'economics', 'political-science', 'sociology'] },
      { name: 'Psychology Combination', slug: 'psych', stream: pucArts._id, subs: ['psychology', 'sociology', 'economics'] },
      { name: 'Languages', slug: 'languages', stream: pucArts._id, subs: ['kannada', 'english'] }
    ];

    const comboMap: Record<string, mongoose.Types.ObjectId> = {};
    for (const c of comboData) {
      const mappedSubs = c.subs.map(slug => subjectMap[slug]);
      const sc = await SubjectCombination.create({
        streamId: c.stream, name: c.name, slug: c.slug, subjects: mappedSubs
      });
      comboMap[c.slug] = sc._id;
    }

    // 5. ITI TRADES
    const itiTradesData = [
      { stream: itiEngineering._id, name: 'Fitter', slug: 'fitter', duration: '2 Years', salary: '₹1.2 - 1.8 Lakh/Year', opps: ['Manufacturing', 'Assembly', 'Maintenance', 'Production', 'Quality Control'] },
      { stream: itiEngineering._id, name: 'Electrician', slug: 'electrician', duration: '2 Years', salary: '₹1.5 - 2.0 Lakh/Year', opps: ['Electrical Work', 'Maintenance', 'Panel Board', 'Control Systems'] },
      { stream: itiEngineering._id, name: 'Electronic Mechanic', slug: 'electronic-mechanic', duration: '2 Years', salary: '₹1.8 - 2.5 Lakh/Year', opps: ['Consumer Electronics', 'Telecom', 'Service Centers'] },
      { stream: itiEngineering._id, name: 'Welder (Gas & Electric)', slug: 'welder', duration: '1 Year', salary: '₹1.2 - 1.5 Lakh/Year', opps: ['Construction', 'Fabrication', 'Ship Building'] },
      { stream: itiEngineering._id, name: 'Turner', slug: 'turner', duration: '2 Years', salary: '₹1.4 - 1.8 Lakh/Year', opps: ['Manufacturing', 'Machining', 'Tool Making'] },
      { stream: itiEngineering._id, name: 'Mechanic Motor Vehicle', slug: 'mmv', duration: '2 Years', salary: '₹1.8 - 2.5 Lakh/Year', opps: ['Automobile Service', 'Garage', 'Dealerships'] },
      
      { stream: itiNonEngineering._id, name: 'Computer Operator & Programming Assistant (COPA)', slug: 'copa', duration: '1 Year', salary: '₹1.2 - 1.8 Lakh/Year', opps: ['Office Administration', 'Data Entry', 'IT Support'] },
      { stream: itiNonEngineering._id, name: 'Sewing Technology / Fashion Design', slug: 'sewing', duration: '1 Year', salary: '₹1.0 - 1.5 Lakh/Year', opps: ['Garment Industry', 'Tailoring', 'Fashion Design'] }
    ];

    for (const t of itiTradesData) {
      await Trade.create({
        streamId: t.stream, name: t.name, slug: t.slug, duration: t.duration, averageStartingSalary: t.salary, careerOpportunities: t.opps
      });
    }

    // 6. COURSES (UG paths connected to Subject Combinations via eligibleCombinations)
    // Create UG Courses
    const mbbsCourse = await Course.create({ name: 'MBBS', slug: 'mbbs', duration: '5.5 Years', eligibleCombinations: [comboMap['pcmb'], comboMap['pcba'], comboMap['pcbsc']], active: true });
    const bdsCourse = await Course.create({ name: 'BDS', slug: 'bds', duration: '5 Years', eligibleCombinations: [comboMap['pcmb'], comboMap['pcba'], comboMap['pcbsc']], active: true });
    const btechCourse = await Course.create({ name: 'BE/BTech', slug: 'be-btech', duration: '4 Years', eligibleCombinations: [comboMap['pcmsc'], comboMap['pcms'], comboMap['pcme'], comboMap['pcba']], active: true });
    const bscCourse = await Course.create({ name: 'BSc', slug: 'bsc', duration: '3 Years', eligibleCombinations: [comboMap['pcmb'], comboMap['pcmsc'], comboMap['pcms'], comboMap['pcme'], comboMap['pcba'], comboMap['pcbsc']], active: true });
    const bcomCourse = await Course.create({ name: 'BCom', slug: 'bcom', duration: '3 Years', eligibleCombinations: [comboMap['commerce-math'], comboMap['commerce-nomath']], active: true });
    const baCourse = await Course.create({ name: 'BA', slug: 'ba', duration: '3 Years', eligibleCombinations: [comboMap['hep'], comboMap['heps'], comboMap['psych'], comboMap['languages']], active: true });
    const bbaCourse = await Course.create({ name: 'BBA', slug: 'bba', duration: '3 Years', eligibleCombinations: [comboMap['commerce-math'], comboMap['commerce-nomath']], active: true });
    const llbCourse = await Course.create({ name: 'LLB', slug: 'llb', duration: '3/5 Years', eligibleCombinations: [comboMap['commerce-nomath'], comboMap['hep'], comboMap['heps']], active: true });

    // 7. BRANCHES (Specializations mapped to Courses)
    // For BE/BTech
    await Branch.create({ courseId: btechCourse._id, name: 'Computer Science Engineering', slug: 'cse', duration: '4 Years', specializations: ['AI/ML', 'Data Science', 'Cyber Security', 'Cloud Computing', 'IoT'], careerOpportunities: ['Software Engineering', 'Full Stack Development', 'Mobile App'] });
    await Branch.create({ courseId: btechCourse._id, name: 'Electronics & Communication', slug: 'ece', duration: '4 Years', specializations: ['VLSI', 'Embedded Systems', 'Wireless Communication'], careerOpportunities: ['Signal Processing', 'IoT', 'Telecommunication'] });
    await Branch.create({ courseId: btechCourse._id, name: 'Data Science', slug: 'btech-data-science', duration: '4 Years', specializations: ['Big Data', 'Analytics', 'Machine Learning'], careerOpportunities: ['Data Engineering', 'Business Intelligence'] });

    // For BSc
    await Branch.create({ courseId: bscCourse._id, name: 'BSc Computer Science', slug: 'bsc-cs', duration: '3 Years', specializations: ['Programming', 'Networking', 'Database'], careerOpportunities: ['Web Development', 'Mobile App Development'] });
    await Branch.create({ courseId: bscCourse._id, name: 'BSc Statistics', slug: 'bsc-stats', duration: '3 Years', specializations: ['Mathematical Statistics', 'Applied Statistics', 'Biostatistics'], careerOpportunities: ['Data Science', 'Actuarial Science'] });

    // For BCom
    await Branch.create({ courseId: bcomCourse._id, name: 'Accounting & Finance', slug: 'bcom-af', duration: '3 Years', specializations: ['Financial Accounting', 'Cost Accounting', 'Management Accounting'], careerOpportunities: ['Auditing', 'Taxation', 'Corporate Finance'] });

    // Diploma Branches (directly under Diploma Engineering Stream)
    await Branch.create({ streamId: diplomaEngineering._id, name: 'Civil Engineering', slug: 'diploma-civil', duration: '3 Years', specializations: ['Building Construction', 'Transportation', 'Environmental'], exampleInstitutions: ['GPT Tumkur', 'GPT Ranebennur'] });
    await Branch.create({ streamId: diplomaEngineering._id, name: 'Mechanical Engineering', slug: 'diploma-mech', duration: '3 Years', specializations: ['Manufacturing', 'Thermal', 'Design'], exampleInstitutions: ['GPT Tumkur'] });

    // 8. EXAM SCHEDULE
    const exams = [
      { stream: pucScience._id, type: 'Main 2026', subject: 'Statistics', date: 'March 2, 2026', time: '10:15 AM - 1:30 PM' },
      { stream: pucScience._id, type: 'Main 2026', subject: 'Physics', date: 'March 6, 2026', time: '10:15 AM - 1:30 PM' },
      { stream: pucScience._id, type: 'Main 2026', subject: 'Chemistry', date: 'March 9, 2026', time: '10:15 AM - 1:30 PM' },
      { stream: pucScience._id, type: 'Main 2026', subject: 'Mathematics', date: 'March 14, 2026', time: '10:15 AM - 1:30 PM' },
      { stream: pucScience._id, type: 'Main 2026', subject: 'Biology', date: 'March 16, 2026', time: '10:15 AM - 1:30 PM' },
      { stream: pucScience._id, type: 'Improvement 2026', subject: 'Biology', date: 'April 27, 2026', time: '10:15 AM - 1:30 PM' },
      
      { stream: pucCommerce._id, type: 'Main 2026', subject: 'Business Studies', date: 'March 7, 2026', time: '10:15 AM - 1:30 PM' },
      { stream: pucCommerce._id, type: 'Main 2026', subject: 'Accountancy', date: 'March 14, 2026', time: '10:15 AM - 1:30 PM' }
    ];

    for (const ex of exams) {
      await ExamSchedule.create({
        streamId: ex.stream, examType: ex.type, subjectName: ex.subject, date: ex.date, time: ex.time
      });
    }

    console.log('Seed Mega Pathways Successfully Completed.');
    process.exit(0);

  } catch (err) {
    console.error('Error during mega seeding:', err);
    process.exit(1);
  }
};

runSeed();
