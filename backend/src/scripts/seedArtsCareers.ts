import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import Career from '../models/Career.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const seedArtsCareers = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Seeding Arts Careers...');

    const careersData = [
      {
        name: 'Historian',
        industry: 'Humanities',
        skills: ['Research', 'Writing', 'Analytical Thinking', 'History'],
        salaryRange: '₹4,00,000 - ₹12,00,000',
        futureScope: 'Steady demand in academia and research'
      },
      {
        name: 'Journalist',
        industry: 'Media',
        skills: ['Writing', 'Communication', 'Research', 'Interpersonal Skills'],
        salaryRange: '₹3,00,000 - ₹15,00,000',
        futureScope: 'Evolving with digital media'
      },
      {
        name: 'Psychologist',
        industry: 'Healthcare',
        skills: ['Empathy', 'Communication', 'Analytical Thinking', 'Counseling'],
        salaryRange: '₹4,00,000 - ₹18,00,000',
        futureScope: 'High demand due to mental health awareness'
      },
      {
        name: 'Political Analyst',
        industry: 'Government',
        skills: ['Analytical Thinking', 'Research', 'Communication', 'Policy Analysis'],
        salaryRange: '₹5,00,000 - ₹20,00,000',
        futureScope: 'High demand in think tanks and media'
      }
    ];

    for (const c of careersData) {
      const slug = createSlug(c.name);
      let career = await Career.findOne({ slug });
      if (!career) {
        career = await Career.create({ ...c, slug, active: true });
        console.log(`Created career: ${c.name}`);
      } else {
        console.log(`Career already exists: ${c.name}`);
      }
    }

    console.log('Successfully seeded Arts Careers.');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding careers:', error);
    process.exit(1);
  }
};

seedArtsCareers();
