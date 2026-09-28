import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Degree from '../models/Degree.js';
import Specialization from '../models/Specialization.js';
import EducationPathRelation from '../models/EducationPathRelation.js';
import Skill from '../models/Skill.js';
import Career from '../models/Career.js';
import Job from '../models/Job.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

const seedPhase6 = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');
    console.log('Seeding Phase 6 Career & Jobs Data...');

    // 1. Get Specialization (AI/ML)
    const aimlSpec = await Specialization.findOne({ slug: 'ai-ml' });
    if (!aimlSpec) throw new Error('Run seedPhase5.ts first! Specialization not found.');

    // 2. Create PG Degree
    let mtech = await Degree.findOne({ slug: 'mtech-cs' });
    if (!mtech) {
      mtech = await Degree.create({
        degreeId: 'DEG_MTECH_CS',
        name: 'Master of Technology in Computer Science (M.Tech)',
        slug: 'mtech-cs',
        type: 'Postgraduate',
        duration: 2,
        duration_unit: 'Years',
        level: 'PG',
        active: true
      });
    }

    // Link UG Spec to PG Degree
    await EducationPathRelation.findOneAndUpdate(
      { sourceId: aimlSpec._id, targetId: mtech._id },
      {
        sourceType: 'Specialization',
        sourceId: aimlSpec._id,
        targetType: 'Degree',
        targetId: mtech._id,
        relationType: 'ENABLES'
      },
      { upsert: true, new: true }
    );

    // 3. Create Super Specialization (PhD / Deep Learning)
    let deepLearning = await Specialization.findOne({ slug: 'deep-learning' });
    if (!deepLearning) {
      deepLearning = await Specialization.create({
        branchId: aimlSpec.branchId, // reuse branch
        name: 'Deep Learning & Robotics (Super Specialization)',
        slug: 'deep-learning',
        description: 'Advanced research in robotics and deep neural networks.'
      });
    }

    // Link PG Degree to Super Specialization
    await EducationPathRelation.findOneAndUpdate(
      { sourceId: mtech._id, targetId: deepLearning._id },
      {
        sourceType: 'Degree',
        sourceId: mtech._id,
        targetType: 'Specialization',
        targetId: deepLearning._id,
        relationType: 'ENABLES'
      },
      { upsert: true, new: true }
    );

    // 4. Create Skills
    const skillNames = ['Neural Networks', 'TensorFlow', 'Python', 'Computer Vision'];
    const skills = [];
    for (const name of skillNames) {
      const slug = name.toLowerCase().replace(/ /g, '-');
      let skill = await Skill.findOne({ slug });
      if (!skill) {
        skill = await Skill.create({ name, slug, active: true });
      }
      skills.push(skill);
      
      // Link Super Spec to Skills
      await EducationPathRelation.findOneAndUpdate(
        { sourceId: deepLearning._id, targetId: skill._id },
        {
          sourceType: 'Specialization',
          sourceId: deepLearning._id,
          targetType: 'Skill',
          targetId: skill._id,
          relationType: 'ENABLES'
        },
        { upsert: true, new: true }
      );
    }

    // 5. Create Career
    let mlEngineer = await Career.findOne({ slug: 'ml-engineer' });
    if (!mlEngineer) {
      mlEngineer = await Career.create({
        name: 'Machine Learning Engineer',
        slug: 'ml-engineer',
        description: 'Designs and builds machine learning systems that learn from data.',
        industry: 'Information Technology',
        salaryRange: '8 LPA - 40 LPA',
        skills: ['Neural Networks', 'TensorFlow', 'Python'],
        futureScope: 'High Demand',
        active: true
      });
    }

    // 6. Create Job
    let mlJob = await Job.findOne({ jobId: 'JOB_GOOGLE_ML_01' });
    if (!mlJob) {
      mlJob = await Job.create({
        jobId: 'JOB_GOOGLE_ML_01',
        source: 'LinkedIn',
        sourceJobId: 'LNK_12345',
        title: 'Senior Machine Learning Engineer',
        company: 'Google',
        location: 'Bangalore, India',
        workMode: 'Hybrid',
        employmentType: 'Full Time',
        experienceLevel: '3-5 years',
        salaryMin: 2500000,
        salaryMax: 4500000,
        salaryPeriod: 'Annual',
        skills: ['Neural Networks', 'TensorFlow', 'Python'],
        qualifications: ['M.Tech in CS or related field'],
        description: 'We are looking for an ML Engineer to develop advanced AI models...',
        postedAt: new Date(),
        sourceUrl: 'https://careers.google.com/',
        category: 'Machine Learning Engineer',
        industry: 'IT',
        verified: true,
        status: 'ACTIVE',
        lastUpdated: new Date()
      });
    }

    console.log('Phase 6 seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedPhase6();
