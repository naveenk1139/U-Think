import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pathway from '../src/models/Pathway.js';
import Stream from '../src/models/Stream.js';
import Course from '../src/models/Course.js';
import Branch from '../src/models/Branch.js';

dotenv.config({ path: '../.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  console.log('Clearing old pathways...');
  await Pathway.deleteMany({});
  await Stream.deleteMany({});
  await Course.deleteMany({});
  await Branch.deleteMany({});

  console.log('Inserting After 10th Pathway...');
  const after10th = await Pathway.create({ name: 'After 10th', level: '10th', description: 'Explore pathways immediately after Class 10th', order: 1 });
  
  const puc = await Stream.create({ pathwayId: after10th._id, name: 'PUC / 12th', description: 'Pre-University Courses', order: 1 });
  const diploma = await Stream.create({ pathwayId: after10th._id, name: 'Diploma / Polytechnic', description: '3-year technical diploma courses', order: 2 });
  const iti = await Stream.create({ pathwayId: after10th._id, name: 'ITI', description: 'Industrial Training Institute', order: 3 });
  const vocational = await Stream.create({ pathwayId: after10th._id, name: 'Vocational', description: 'Skill-based training', order: 4 });
  const paramedical = await Stream.create({ pathwayId: after10th._id, name: 'Paramedical', description: 'Allied health services', order: 5 });

  // PUC Courses
  await Course.create({ streamId: puc._id, name: 'Science (PCMB/PCM/PCB)', duration: '2 Years', order: 1 });
  await Course.create({ streamId: puc._id, name: 'Commerce (CEBA/SEBA)', duration: '2 Years', order: 2 });
  await Course.create({ streamId: puc._id, name: 'Arts / Humanities', duration: '2 Years', order: 3 });

  // Diploma Branches
  const dipCourse = await Course.create({ streamId: diploma._id, name: 'Engineering Diploma', duration: '3 Years', order: 1 });
  const dipBranches = ['Computer Science', 'Information Science', 'Electronics', 'Electrical', 'Mechanical', 'Civil', 'AI / ML', 'Data Science'];
  for (const b of dipBranches) {
    await Branch.create({ courseId: dipCourse._id, name: b, relatedCareers: ['Junior Engineer', 'Technician'] });
  }

  console.log('Inserting After 12th Pathway...');
  const after12th = await Pathway.create({ name: 'After 12th', level: '12th', description: 'Explore degrees after Class 12', order: 2 });
  
  const engineering = await Stream.create({ pathwayId: after12th._id, name: 'Engineering', order: 1 });
  const medical = await Stream.create({ pathwayId: after12th._id, name: 'Medical', order: 2 });
  const commerceStr = await Stream.create({ pathwayId: after12th._id, name: 'Commerce', order: 3 });
  const management = await Stream.create({ pathwayId: after12th._id, name: 'Management', order: 4 });
  const law = await Stream.create({ pathwayId: after12th._id, name: 'Law', order: 5 });
  const computerApps = await Stream.create({ pathwayId: after12th._id, name: 'Computer Applications', order: 6 });
  const designStr = await Stream.create({ pathwayId: after12th._id, name: 'Design', order: 7 });

  // Engineering Courses
  const beBtech = await Course.create({ streamId: engineering._id, name: 'B.E / B.Tech', duration: '4 Years', eligibility: '12th Science PCM' });
  const engBranches = [
    'Computer Science Engineering', 'Artificial Intelligence & Machine Learning', 'Data Science',
    'Information Science Engineering', 'Electronics & Communication', 'Electrical & Electronics',
    'Mechanical Engineering', 'Civil Engineering', 'Aerospace Engineering', 'Biotechnology'
  ];
  for (const b of engBranches) {
    await Branch.create({ 
      courseId: beBtech._id, 
      name: b, 
      relatedCareers: ['Software Engineer', 'Systems Engineer', 'Data Scientist'],
      relatedExams: ['JEE Main', 'KCET', 'COMEDK'],
      higherStudies: ['M.Tech', 'MBA', 'MS']
    });
  }

  // Medical Courses
  const mbbs = await Course.create({ streamId: medical._id, name: 'MBBS', duration: '5.5 Years', eligibility: '12th Science PCB' });
  await Branch.create({ courseId: mbbs._id, name: 'Medicine & Surgery', relatedCareers: ['Doctor', 'Surgeon'], relatedExams: ['NEET'] });
  
  const bds = await Course.create({ streamId: medical._id, name: 'BDS', duration: '5 Years' });
  await Branch.create({ courseId: bds._id, name: 'Dental Surgery', relatedCareers: ['Dentist'], relatedExams: ['NEET'] });
  
  const bams = await Course.create({ streamId: medical._id, name: 'BAMS / BHMS', duration: '5.5 Years' });
  await Branch.create({ courseId: bams._id, name: 'Ayurveda & Homeopathy', relatedCareers: ['Ayurvedic Doctor'], relatedExams: ['NEET'] });

  // Computer Applications
  const bca = await Course.create({ streamId: computerApps._id, name: 'BCA', duration: '3 Years' });
  await Branch.create({ courseId: bca._id, name: 'Computer Applications', relatedCareers: ['Software Developer', 'Web Developer'], higherStudies: ['MCA'] });

  // Commerce & Management
  const bcom = await Course.create({ streamId: commerceStr._id, name: 'B.Com', duration: '3 Years' });
  await Branch.create({ courseId: bcom._id, name: 'General Commerce', relatedCareers: ['Accountant', 'Financial Analyst'], higherStudies: ['M.Com', 'CA', 'MBA'] });

  const bba = await Course.create({ streamId: management._id, name: 'BBA', duration: '3 Years' });
  await Branch.create({ courseId: bba._id, name: 'Business Administration', relatedCareers: ['HR Manager', 'Marketing Executive'], higherStudies: ['MBA'] });

  // Law
  const baLlb = await Course.create({ streamId: law._id, name: 'BA LLB', duration: '5 Years' });
  await Branch.create({ courseId: baLlb._id, name: 'Integrated Law', relatedCareers: ['Lawyer', 'Legal Advisor'], relatedExams: ['CLAT'] });

  // Design
  const bdes = await Course.create({ streamId: designStr._id, name: 'B.Des', duration: '4 Years' });
  await Branch.create({ courseId: bdes._id, name: 'UI/UX Design', relatedCareers: ['UI Designer', 'UX Researcher'] });
  await Branch.create({ courseId: bdes._id, name: 'Fashion Design', relatedCareers: ['Fashion Designer'] });

  console.log('Inserting PG & PhD Pathways...');
  const pgPathway = await Pathway.create({ name: 'Postgraduate (PG)', level: 'pg', description: 'Master degrees and specializations', order: 3 });
  const phDPathway = await Pathway.create({ name: 'PhD / Research', level: 'phd', description: 'Doctorate and Research', order: 4 });

  const mtechStream = await Stream.create({ pathwayId: pgPathway._id, name: 'M.Tech / M.E', order: 1 });
  const mbaStream = await Stream.create({ pathwayId: pgPathway._id, name: 'MBA', order: 2 });
  
  const mtechCourse = await Course.create({ streamId: mtechStream._id, name: 'M.Tech', duration: '2 Years' });
  await Branch.create({ courseId: mtechCourse._id, name: 'Artificial Intelligence', relatedCareers: ['AI Researcher'] });
  
  console.log('Seed completed successfully!');
  process.exit(0);
};

seedData();
