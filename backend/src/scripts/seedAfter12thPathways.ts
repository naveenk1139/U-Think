import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pathway from '../models/Pathway.js';
import EducationLevel from '../models/EducationLevel.js';
import Stream from '../models/Stream.js';
import Course from '../models/Course.js';
import Branch from '../models/Branch.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/uthink';

async function seedAfter12th() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    const level12 = await EducationLevel.findOne({ slug: 'after-12th' });
    if (!level12) {
      console.log('Error: After 12th level not found!');
      return;
    }

    // 1. Engineering Pathway
    const engineeringPathway = await Pathway.create({
      educationLevelId: level12._id,
      name: 'Engineering / Technology',
      slug: 'engineering-ug',
      duration: '4 Years',
      entryRequirement: '12th Science (PCM)',
      description: 'Undergraduate professional degree in engineering',
      order: 1
    });

    const btechStream = await Stream.create({
      pathwayId: engineeringPathway._id,
      name: 'B.Tech / B.E.',
      slug: 'btech',
      order: 1,
      description: 'Bachelor of Technology / Bachelor of Engineering'
    });

    const btechCourse = await Course.create({
      streamId: btechStream._id,
      name: 'B.Tech Core',
      slug: 'btech-core',
      duration: '4 Years',
      eligibility: '12th PCM with min 45%',
      description: 'Core engineering streams',
      order: 1
    });

    await Branch.create({
      courseId: btechCourse._id,
      name: 'Computer Science & Engineering',
      slug: 'btech-cse',
      duration: '4 Years',
      specializations: ['Artificial Intelligence', 'Cyber Security', 'Data Science'],
      careerOpportunities: ['Software Engineer', 'Data Scientist'],
      exampleInstitutions: ['RVCE Bangalore', 'BMSCE Bangalore']
    });

    await Branch.create({
      courseId: btechCourse._id,
      name: 'Electronics & Communication',
      slug: 'btech-ece',
      duration: '4 Years',
      specializations: ['VLSI Design', 'Embedded Systems'],
      careerOpportunities: ['Electronics Engineer', 'Network Engineer'],
      exampleInstitutions: ['PES University', 'MSRIT']
    });

    // 2. Medical Pathway
    const medicalPathway = await Pathway.create({
      educationLevelId: level12._id,
      name: 'Medical & Allied Sciences',
      slug: 'medical-ug',
      duration: '4.5 - 5.5 Years',
      entryRequirement: '12th Science (PCB)',
      description: 'Degrees in Medicine, Surgery, and Allied Healthcare',
      order: 2
    });

    const mbbsStream = await Stream.create({
      pathwayId: medicalPathway._id,
      name: 'MBBS / BDS',
      slug: 'mbbs-bds',
      order: 1,
      description: 'Core Medical & Dental Degrees'
    });

    const mbbsCourse = await Course.create({
      streamId: mbbsStream._id,
      name: 'MBBS',
      slug: 'mbbs',
      duration: '5.5 Years',
      eligibility: '12th PCB with NEET UG qualification',
      description: 'Bachelor of Medicine, Bachelor of Surgery',
      order: 1
    });

    await Branch.create({
      courseId: mbbsCourse._id,
      name: 'General Medicine',
      slug: 'mbbs-general',
      duration: '5.5 Years',
      specializations: ['Cardiology (PG)', 'Neurology (PG)'],
      careerOpportunities: ['Doctor', 'Surgeon'],
      exampleInstitutions: ['BMCRI Bangalore', 'KIMS Hubli']
    });

    // 3. Commerce Pathway
    const commercePathway = await Pathway.create({
      educationLevelId: level12._id,
      name: 'Commerce & Management',
      slug: 'commerce-ug',
      duration: '3 - 4 Years',
      entryRequirement: '12th (Any Stream, preferably Commerce)',
      description: 'Undergraduate degrees in Commerce, Business, and Finance',
      order: 3
    });

    const bcomStream = await Stream.create({
      pathwayId: commercePathway._id,
      name: 'B.Com / BBA',
      slug: 'bcom-bba',
      order: 1,
      description: 'Bachelor of Commerce and Business Administration'
    });

    const bcomCourse = await Course.create({
      streamId: bcomStream._id,
      name: 'B.Com',
      slug: 'bcom-ug',
      duration: '3 Years (4 Years Honors)',
      eligibility: '12th Pass',
      description: 'Bachelor of Commerce',
      order: 1
    });

    await Branch.create({
      courseId: bcomCourse._id,
      name: 'B.Com General',
      slug: 'bcom-general',
      duration: '3 Years',
      specializations: ['Accounting', 'Finance', 'Taxation'],
      careerOpportunities: ['Accountant', 'Financial Analyst'],
      exampleInstitutions: ['Mount Carmel College', 'St. Josephs']
    });

    console.log('✅ After 12th Pathways Seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAfter12th();