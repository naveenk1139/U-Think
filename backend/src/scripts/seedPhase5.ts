import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Degree from '../models/Degree.js';
import Branch from '../models/Branch.js';
import Specialization from '../models/Specialization.js';
import EducationPathRelation from '../models/EducationPathRelation.js';
import College from '../models/College.js';
import CollegeCourse from '../models/CollegeCourse.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

const seedPhase5 = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');
    console.log('Seeding Phase 5 Undergrad Data...');

    // 1. Fetch existing Degrees
    const btech = await Degree.findOne({ slug: 'btech' });
    const mbbs = await Degree.findOne({ slug: 'mbbs' });

    if (!btech || !mbbs) {
      throw new Error('Run seedPhase4.ts first! Degrees not found.');
    }

    // 2. Create Branches
    let cse = await Branch.findOne({ slug: 'computer-science-engineering' });
    if (!cse) {
      cse = await Branch.create({
        name: 'Computer Science & Engineering',
        slug: 'computer-science-engineering',
        description: 'Study of computation, algorithms, and software design.',
        duration: '4 Years',
        eligibility: '10+2 PCM with minimum 60%',
        order: 1,
        active: true
      });
    }

    let ece = await Branch.findOne({ slug: 'electronics-communication' });
    if (!ece) {
      ece = await Branch.create({
        name: 'Electronics & Communication Engineering',
        slug: 'electronics-communication',
        description: 'Study of electronic devices, circuits, and communication equipment.',
        duration: '4 Years',
        eligibility: '10+2 PCM with minimum 60%',
        order: 2,
        active: true
      });
    }

    let genMed = await Branch.findOne({ slug: 'general-medicine' });
    if (!genMed) {
      genMed = await Branch.create({
        name: 'General Medicine',
        slug: 'general-medicine',
        description: 'General MBBS study.',
        duration: '5.5 Years',
        eligibility: '10+2 PCB with NEET',
        order: 1,
        active: true
      });
    }

    // 3. Link Degrees to Branches via EducationPathRelation
    const linkDegreeBranch = async (degreeId: string, branchId: string) => {
      const exists = await EducationPathRelation.findOne({ sourceId: degreeId, targetId: branchId });
      if (!exists) {
        await EducationPathRelation.create({
          sourceType: 'Degree',
          sourceId: degreeId,
          targetType: 'Branch',
          targetId: branchId,
          relationType: 'ENABLES'
        });
      }
    };
    await linkDegreeBranch(btech._id.toString(), cse._id.toString());
    await linkDegreeBranch(btech._id.toString(), ece._id.toString());
    await linkDegreeBranch(mbbs._id.toString(), genMed._id.toString());

    // 4. Create Specializations
    let aiml = await Specialization.findOne({ slug: 'ai-ml' });
    if (!aiml) {
      aiml = await Specialization.create({
        branchId: cse._id,
        name: 'Artificial Intelligence & Machine Learning',
        slug: 'ai-ml',
        description: 'Focus on AI models, neural networks, and deep learning.'
      });
    }
    
    let ds = await Specialization.findOne({ slug: 'data-science' });
    if (!ds) {
      ds = await Specialization.create({
        branchId: cse._id,
        name: 'Data Science',
        slug: 'data-science',
        description: 'Focus on data analytics, big data, and statistical modeling.'
      });
    }

    // 5. Create Colleges
    let iitb = await College.findOne({ slug: 'iit-bombay' });
    if (!iitb) {
      iitb = await College.create({
        name: 'Indian Institute of Technology (IIT) Bombay',
        slug: 'iit-bombay',
        shortName: 'IIT Bombay',
        sourceId: 'COL_IITB',
        instituteType: 'Government',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        establishedYear: 1958,
        active: true
      });
    }

    let aiims = await College.findOne({ slug: 'aiims-delhi' });
    if (!aiims) {
      aiims = await College.create({
        name: 'All India Institute of Medical Sciences (AIIMS) Delhi',
        slug: 'aiims-delhi',
        shortName: 'AIIMS Delhi',
        sourceId: 'COL_AIIMS',
        instituteType: 'Government',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        establishedYear: 1956,
        active: true
      });
    }

    // 6. Map Colleges to Branches/Specializations (CollegeCourse)
    let cseCourse = await CollegeCourse.findOne({ collegeId: iitb._id, branchId: cse._id });
    if (!cseCourse) {
      await CollegeCourse.create({
        collegeId: iitb._id,
        branchId: cse._id,
        degreeName: 'B.Tech',
        branchName: cse.name,
        duration: '4 Years',
        academicYear: '2023-24',
        mode: 'Full-Time',
        fees: '10 Lakhs',
        entranceExamRequired: true,
        active: true
      });
    }

    let mbbsCourse = await CollegeCourse.findOne({ collegeId: aiims._id, branchId: genMed._id });
    if (!mbbsCourse) {
      await CollegeCourse.create({
        collegeId: aiims._id,
        branchId: genMed._id,
        degreeName: 'MBBS',
        branchName: genMed.name,
        duration: '5.5 Years',
        academicYear: '2023-24',
        mode: 'Full-Time',
        fees: '10 Thousand',
        entranceExamRequired: true,
        active: true
      });
    }

    console.log('Phase 5 seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedPhase5();
