import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import Career from '../models/Career.js';
import JobRole from '../models/JobRole.js';
import CareerPath from '../models/CareerPath.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const seedCareersAndJobs = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Seeding Careers & Jobs...');

    const careersData = [
      {
        name: 'Software Developer',
        industry: 'Information Technology',
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        salaryRange: '₹3,00,000 - ₹15,00,000',
        futureScope: 'High demand, growing rapidly'
      },
      {
        name: 'Data Scientist',
        industry: 'Information Technology',
        skills: ['Python', 'SQL', 'Machine Learning', 'Data Analysis'],
        salaryRange: '₹5,00,000 - ₹20,00,000',
        futureScope: 'Extremely high demand'
      }
    ];

    const createdCareers = [];
    for (const c of careersData) {
      const slug = createSlug(c.name);
      let career = await Career.findOne({ slug });
      if (!career) {
        career = await Career.create({ ...c, slug });
      }
      createdCareers.push(career);
    }

    const jobsData = [
      {
        name: 'Junior Software Engineer',
        industryId: null,
        careerId: createdCareers.find(c => c.slug === createSlug('Software Developer'))?._id,
        description: 'Entry level developer',
        averageSalary: '₹4,00,000',
        requiredSkills: ['JavaScript', 'React']
      },
      {
        name: 'Senior Software Engineer',
        industryId: null,
        careerId: createdCareers.find(c => c.slug === createSlug('Software Developer'))?._id,
        description: 'Experienced developer',
        averageSalary: '₹12,00,000',
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'System Design']
      }
    ];

    const createdJobs = [];
    for (const j of jobsData) {
      const slug = createSlug(j.name);
      let job = await JobRole.findOne({ slug });
      if (!job) {
        job = await JobRole.create({ ...j, slug });
      }
      createdJobs.push(job);
    }

    if (createdCareers.length > 0 && createdJobs.length > 0) {
      let careerPath = await CareerPath.findOne({ careerId: createdCareers[0]._id });
      if (!careerPath) {
        await CareerPath.create({
          careerId: createdCareers[0]._id,
          startJobRoleId: createdJobs[0]._id,
          nextJobRoles: [createdJobs[1]._id],
          typicalDuration: '3-5 Years'
        });
      }
    }

    console.log('Successfully seeded Careers & Jobs.');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding careers and jobs:', error);
    process.exit(1);
  }
};

seedCareersAndJobs();
