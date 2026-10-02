import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
import Course from '../../models/Course.js';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected for safe course seeding.');
};

const seedSafeCourses = async () => {
  await connectDB();
  
  // 1. We will NOT delete existing courses. We will only insert or update the pathway-specific courses.
  const coursesToCreate = [
    // SCIENCE COMBINATIONS
    {
      streamSlug: 'puc-science',
      name: 'PCMB',
      slug: 'pcmb',
      type: 'Combination',
      level: 'PUC',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
      careers: ['Doctor', 'Engineer', 'Biotechnologist', 'Scientist', 'Pharmacist', 'Agriculturist'],
      higherEducation: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BVSc', 'B.Sc.', 'B.Sc. Nursing', 'B.Pharm', 'Engineering'],
    },
    {
      streamSlug: 'puc-science',
      name: 'PCMC',
      slug: 'pcmc',
      type: 'Combination',
      level: 'PUC',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
      careers: ['Software Engineering', 'Data', 'AI/ML', 'Cybersecurity', 'Cloud', 'DevOps', 'Web Development'],
      higherEducation: ['B.E./B.Tech', 'BCA', 'B.Sc. Computer Science', 'B.Sc. IT'],
    },
    {
      streamSlug: 'puc-science',
      name: 'PCME',
      slug: 'pcme',
      type: 'Combination',
      level: 'PUC',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Electronics'],
      careers: ['Electronics Engineer', 'Embedded Engineer', 'Electrical Engineer', 'Automation Engineer'],
      higherEducation: ['Electrical Engineering', 'Electronics Engineering', 'ECE', 'Electrical and Electronics'],
    },
    {
      streamSlug: 'puc-science',
      name: 'PCMS',
      slug: 'pcms',
      type: 'Combination',
      level: 'PUC',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Statistics'],
      careers: ['Data Analyst', 'Statistician', 'Business Analyst', 'Research Analyst'],
      higherEducation: ['Statistics', 'Mathematics', 'Data Analytics', 'Data Science'],
    },
    {
      streamSlug: 'puc-science',
      name: 'PCMG',
      slug: 'pcmg',
      type: 'Combination',
      level: 'PUC',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Geology'],
      careers: ['Geologist', 'Geoscientist', 'Environmental Analyst'],
      higherEducation: ['Geology', 'Earth Science', 'Environmental Science'],
    },
    {
      streamSlug: 'puc-science',
      name: 'PCBH',
      slug: 'pcbh',
      type: 'Combination',
      level: 'PUC',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Home Science'],
      careers: ['Nutrition', 'Food', 'Healthcare support', 'Community programs'],
      higherEducation: ['Home Science', 'Nutrition', 'Food Science', 'Healthcare-related education'],
    },
    {
      streamSlug: 'puc-science',
      name: 'PCBS',
      slug: 'pcbs',
      type: 'Combination',
      level: 'PUC',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Statistics'],
      careers: ['Biostatistics-related roles', 'Research', 'Public health analytics'],
      higherEducation: ['Biology', 'Statistics', 'Life Sciences', 'Biostatistics', 'Public Health'],
    },

    // COMMERCE
    {
      streamSlug: 'puc-commerce',
      name: 'Commerce (General)',
      slug: 'commerce-general',
      type: 'Combination',
      level: 'PUC',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Computer Science', 'Statistics', 'Mathematics'],
      careers: ['Accountant', 'Financial Analyst', 'Banking', 'Taxation', 'Audit', 'Finance', 'Management'],
      higherEducation: ['B.Com', 'BBA', 'BBM', 'BCA', 'Economics', 'CA', 'CMA', 'CS', 'CFA'],
    },

    // ARTS
    {
      streamSlug: 'puc-arts',
      name: 'Arts / Humanities (General)',
      slug: 'arts-general',
      type: 'Combination',
      level: 'PUC',
      subjects: ['History', 'Economics', 'Political Science', 'Sociology', 'Geography', 'Psychology', 'English'],
      careers: ['Teacher', 'Journalist', 'Content Writer', 'Social Worker', 'Civil Services', 'Media'],
      higherEducation: ['BA', 'BSW', 'BFA', 'BBA/BBM', 'Law', 'Journalism', 'Mass Communication'],
    },

    // POLYTECHNIC DIPLOMAS (attaching directly to pathway)
    ...[
      'Automobile Engineering', 'Aeronautical Engineering', 'Civil Engineering', 'Mechanical Engineering', 
      'Electrical Engineering', 'Computer Science Engineering'
    ].map(branch => ({
      pathwaySlug: 'diploma',
      name: `Diploma in ${branch}`,
      slug: `diploma-${branch.toLowerCase().replace(/ /g, '-')}`,
      type: 'Course',
      level: 'Diploma',
      duration: '3 Years',
      eligibility: '10th Pass / 12th Pass',
      careers: ['Junior Engineer', 'Technician', 'Supervisor'],
    })),

    // ITI TRADES
    ...[
      'Automobile', 'Draughtsman Civil', 'Draughtsman Mechanical', 'Diesel Mechanic', 'Fitter', 'Electrician'
    ].map(trade => ({
      pathwaySlug: 'iti',
      name: `ITI - ${trade}`,
      slug: `iti-${trade.toLowerCase().replace(/ /g, '-')}`,
      type: 'Trade',
      level: 'ITI',
      duration: '1-2 Years',
      eligibility: '10th Pass',
      careers: ['Technician', 'Mechanic', 'Operator'],
    }))
  ];

  let count = 0;
  for (const c of coursesToCreate) {
    const filter = { slug: c.slug };
    const update = {
      $set: {
        name: c.name,
        slug: c.slug,
        type: c.type,
        stream: (c as any).streamSlug || null,
        category: (c as any).pathwaySlug || null,
        level: c.level,
        subjects: c.subjects || [],
        careers: c.careers || [],
        higherEducation: c.higherEducation || [],
        duration: c.duration || null,
        eligibility: c.eligibility || null
      }
    };
    await Course.updateOne(filter, update, { upsert: true });
    count++;
  }

  console.log(`Successfully safely seeded ${count} combination/trade courses.`);
  process.exit(0);
};

seedSafeCourses().catch(console.error);
