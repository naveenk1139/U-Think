import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Adjust path depending on your execution environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import Course from '../models/Course.js';
import EducationLevel from '../models/EducationLevel.js';

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/u-think');
    console.log('Connected to MongoDB');

    console.log('Clearing old Pathway/Stream/Course data...');
    await Course.deleteMany({});
    await Stream.deleteMany({});
    await Pathway.deleteMany({});

    // 1. Get or Create 10th Level
    let tenthLevel = await EducationLevel.findOne({ slug: '10th' });
    if (!tenthLevel) {
      tenthLevel = await EducationLevel.create({
        name: '10th Standard',
        slug: '10th',
        levelCode: 'SECONDARY',
        order: 10
      });
    }

    // 2. Create Pathways
    const pathwayData = [
      { name: 'PUC', slug: 'puc', order: 1, source: 'MDLS Chart', verificationStatus: 'VERIFIED' },
      { name: 'Polytechnic / Diploma', slug: 'diploma', order: 2, source: 'MDLS Chart', verificationStatus: 'VERIFIED' },
      { name: 'ITI', slug: 'iti', order: 3, source: 'MDLS Chart', verificationStatus: 'VERIFIED' },
      { name: 'Paramedical', slug: 'paramedical', order: 4, source: 'MDLS Chart', verificationStatus: 'VERIFIED' },
      { name: 'Vocational Courses', slug: 'vocational', order: 5, source: 'MDLS Chart', verificationStatus: 'VERIFIED' },
      { name: 'Certificate Courses', slug: 'certificate', order: 6, source: 'MDLS Chart', verificationStatus: 'VERIFIED' },
      { name: 'Industry Training', slug: 'industry-training', order: 7, source: 'MDLS Chart', verificationStatus: 'VERIFIED' },
      { name: 'Distance Education', slug: 'distance-education', order: 8, source: 'MDLS Chart', verificationStatus: 'VERIFIED' }
    ];

    const createdPathways: Record<string, any> = {};
    for (const p of pathwayData) {
      const pathway = await Pathway.create({ ...p, educationLevelId: tenthLevel._id });
      createdPathways[p.slug] = pathway;
    }

    // 3. Create Streams for PUC
    const streamData = [
      { pathwaySlug: 'puc', name: 'Science', slug: 'puc-science', order: 1, source: 'MDLS Chart' },
      { pathwaySlug: 'puc', name: 'Commerce', slug: 'puc-commerce', order: 2, source: 'MDLS Chart' },
      { pathwaySlug: 'puc', name: 'Arts', slug: 'puc-arts', order: 3, source: 'MDLS Chart' },
    ];

    const createdStreams: Record<string, any> = {};
    for (const s of streamData) {
      const pathway = createdPathways[s.pathwaySlug];
      const stream = await Stream.create({ ...s, pathwayId: pathway._id });
      createdStreams[s.slug] = stream;
    }

    // 4. Create Courses (Combinations/Diplomas/Trades)
    const coursesToCreate = [
      // SCIENCE
      {
        streamSlug: 'puc-science',
        name: 'PCMB',
        slug: 'pcmb',
        type: 'Combination',
        level: 'PUC',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
        whoShouldChoose: ['Medicine', 'Engineering', 'Biology', 'Research', 'Agriculture', 'Life Sciences', 'Healthcare', 'Biotechnology'],
        careers: ['Doctor', 'Engineer', 'Biotechnologist', 'Scientist', 'Pharmacist', 'Agriculturist'],
        higherEducation: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BVSc', 'B.Sc.', 'B.Sc. Nursing', 'B.Pharm', 'Agriculture', 'Biotechnology', 'Engineering'],
        source: 'MDLS Chart'
      },
      {
        streamSlug: 'puc-science',
        name: 'PCMC',
        slug: 'pcmc',
        type: 'Combination',
        level: 'PUC',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
        whoShouldChoose: ['Programming', 'Computers', 'Mathematics', 'Technology', 'Engineering', 'Software', 'Data', 'AI', 'Cybersecurity'],
        careers: ['Software Engineering', 'Data', 'AI/ML', 'Cybersecurity', 'Cloud', 'DevOps', 'Web Development'],
        higherEducation: ['B.E./B.Tech', 'BCA', 'B.Sc. Computer Science', 'B.Sc. IT', 'Statistics', 'Mathematics', 'Electronics'],
        source: 'MDLS Chart'
      },
      {
        streamSlug: 'puc-science',
        name: 'PCME',
        slug: 'pcme',
        type: 'Combination',
        level: 'PUC',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Electronics'],
        whoShouldChoose: ['Electronics', 'Embedded Systems', 'Automation'],
        careers: ['Electronics Engineer', 'Embedded Engineer', 'Electrical Engineer', 'Automation Engineer', 'Telecommunication Engineer', 'Hardware Engineer', 'Control Engineer'],
        higherEducation: ['Electrical Engineering', 'Electronics Engineering', 'ECE', 'Electrical and Electronics', 'Instrumentation', 'Telecommunication'],
        source: 'MDLS Chart'
      },
      {
        streamSlug: 'puc-science',
        name: 'PCMS',
        slug: 'pcms',
        type: 'Combination',
        level: 'PUC',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Statistics'],
        careers: ['Data Analyst', 'Statistician', 'Business Analyst', 'Research Analyst'],
        higherEducation: ['Statistics', 'Mathematics', 'Data Analytics', 'Data Science', 'Computer-related programs'],
        source: 'MDLS Chart'
      },
      {
        streamSlug: 'puc-science',
        name: 'PCMG',
        slug: 'pcmg',
        type: 'Combination',
        level: 'PUC',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Geology'],
        careers: ['Geologist', 'Geoscientist', 'Environmental Analyst', 'Mining-related roles', 'Researcher', 'Surveying / Earth-science roles'],
        higherEducation: ['Geology', 'Earth Science', 'Environmental Science', 'Mining-related education', 'Geoscience', 'Geography-related higher education'],
        source: 'MDLS Chart'
      },
      {
        streamSlug: 'puc-science',
        name: 'PCBH',
        slug: 'pcbh',
        type: 'Combination',
        level: 'PUC',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Home Science'],
        careers: ['Nutrition', 'Food', 'Healthcare support', 'Community programs', 'Education', 'Research'],
        higherEducation: ['Home Science', 'Nutrition', 'Food Science', 'Healthcare-related education', 'Life Sciences', 'Biology', 'Community health'],
        source: 'MDLS Chart'
      },
      {
        streamSlug: 'puc-science',
        name: 'PCBS',
        slug: 'pcbs',
        type: 'Combination',
        level: 'PUC',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Statistics'],
        careers: ['Biostatistics-related roles', 'Research', 'Public health analytics', 'Biotechnology', 'Life sciences'],
        higherEducation: ['Biology', 'Statistics', 'Life Sciences', 'Biostatistics', 'Public Health', 'Research', 'Biotechnology', 'Data-oriented biological sciences'],
        source: 'MDLS Chart'
      },

      // COMMERCE
      {
        streamSlug: 'puc-commerce',
        name: 'Commerce (General)',
        slug: 'commerce-general',
        type: 'Stream/Combination',
        level: 'PUC',
        subjects: ['Accountancy', 'Business Studies', 'Economics', 'History', 'Computer Science', 'Statistics', 'Mathematics'],
        careers: ['Accountant', 'Financial Analyst', 'Business Analyst', 'Banking', 'Taxation', 'Audit', 'Finance', 'Management', 'Sales', 'Marketing', 'Human Resources', 'Operations', 'Entrepreneurship', 'Business Development', 'Consulting'],
        higherEducation: ['B.Com', 'BBA', 'BBM', 'BCA', 'BHM', 'Economics', 'Statistics', 'CA', 'CMA', 'CS', 'CFA'],
        source: 'MDLS Chart'
      },

      // ARTS
      {
        streamSlug: 'puc-arts',
        name: 'Arts (General)',
        slug: 'arts-general',
        type: 'Stream/Combination',
        level: 'PUC',
        subjects: ['History', 'Economics', 'Political Science', 'Sociology', 'Geography', 'Education', 'Logic', 'Psychology', 'Kannada', 'English', 'Music', 'Journalism', 'Mass Communication'],
        careers: ['Teacher', 'Journalist', 'Content Writer', 'Social Worker', 'Psychology-related careers', 'Public Administration', 'Civil Services', 'Media', 'Communication', 'Human Resources', 'Marketing', 'Research', 'Education', 'Design', 'Law'],
        higherEducation: ['BA', 'BSW', 'BFA', 'BBA/BBM', 'BHM', 'Law-related pathways', 'Journalism', 'Mass Communication', 'Foreign Languages', 'Fashion', 'Interior Design', 'Education', 'Social Work'],
        source: 'MDLS Chart'
      },

      // POLYTECHNIC DIPLOMAS (attaching directly to pathway)
      ...[
        'Automobile Engineering', 'Aeronautical Engineering', 'Agricultural Engineering', 'Architecture Engineering',
        'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Electrical & Electronics Engineering',
        'Computer Science Engineering', 'Textile Technology', 'Carpet Technology', 'Fashion Technology', 'Interior Decoration',
        'Library Science', 'Telecommunication'
      ].map(branch => ({
        pathwaySlug: 'diploma',
        name: `Diploma in ${branch}`,
        slug: `diploma-${branch.toLowerCase().replace(/ /g, '-')}`,
        type: 'Course',
        level: 'Diploma',
        duration: '3 Years',
        eligibility: '10th Pass / 12th Pass',
        careers: ['Junior Engineer', 'Technician', 'Supervisor'],
        source: 'MDLS Chart'
      })),

      // ITI TRADES
      ...[
        'Automobile', 'Draughtsman Civil', 'Draughtsman Mechanical', 'Diesel Mechanic', 'Foundryman', 'Mason', 'Plumber',
        'Sheet Metal Worker', 'Welder', 'Wireman', 'Carpenter', 'Fitter', 'Surveyor', 'Lab Assistant', 'Refrigeration & Air Conditioning Mechanic',
        'Radio & TV Mechanic', 'Machine Tool Maintenance', 'Turner', 'IT & Electronics Systems Maintenance', 'Tool & Die Making',
        'Press Tools', 'Production & Manufacturing', 'Electrical', 'Electronics'
      ].map(trade => ({
        pathwaySlug: 'iti',
        name: `ITI - ${trade}`,
        slug: `iti-${trade.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`,
        type: 'Trade',
        level: 'ITI',
        duration: '1-2 Years',
        eligibility: '10th Pass',
        careers: ['Technician', 'Mechanic', 'Operator'],
        source: 'MDLS Chart'
      })),

      // PARAMEDICAL
      ...[
        'Nursing', 'Operation Theatre Technology', 'Health Inspector', 'X-Ray Technology', 'Ophthalmic Technology',
        'Dental Mechanic', 'Medical Records Technology', 'Dialysis Technology', 'Dental Hygiene', 'Medical Laboratory Technology'
      ].map(p => ({
        pathwaySlug: 'paramedical',
        name: `Diploma in ${p}`,
        slug: `paramedical-${p.toLowerCase().replace(/ /g, '-')}`,
        type: 'Course',
        level: 'Diploma',
        duration: '2-3 Years',
        eligibility: '10th / 12th Science',
        careers: ['Technician', 'Assistant', 'Paramedic'],
        source: 'MDLS Chart'
      })),

      // VOCATIONAL
      ...[
        'Air Ticketing', 'Apparel Technology', 'Fashion Technology', 'Lift Technology', 'Cyber Laws', 'Jewellery Designing',
        'Agricultural Sciences', 'Interior Designing', 'Fire and Safety', 'Hotel Management', 'Footwear Technology',
        'Dairy Technology', 'Fisheries Science', 'Electrical Technician', 'Bakery Technology', 'Beautician', 'Computer Hardware',
        'DTP', 'Tally', 'Mobile Repair', 'Retail Management', 'Two Wheeler Servicing'
      ].map(v => ({
        pathwaySlug: 'vocational',
        name: v,
        slug: `vocational-${v.toLowerCase().replace(/ /g, '-')}`,
        type: 'Course',
        level: 'Certificate/Diploma',
        source: 'MDLS Chart'
      }))
    ];

    for (const c of coursesToCreate) {
      let stream = null;
      let pathway = null;

      if ((c as any).streamSlug) {
        stream = createdStreams[(c as any).streamSlug]?.slug;
      }
      if ((c as any).pathwaySlug) {
        pathway = createdPathways[(c as any).pathwaySlug]?.slug;
      }
      
      await Course.create({ ...c, stream: stream, category: pathway });
    }

    console.log('Pathways & Streams Seed completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
