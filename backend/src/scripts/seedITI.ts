import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import Course from '../models/Course.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const seedITI = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Seeding ITI Trades...');

    const itPolyPathway = await Pathway.findOne({ slug: 'it-polytechnic' });
    if (!itPolyPathway) {
      console.error('IT / Polytechnic pathway not found! Ensure seedEducationHierarchy.ts was run and ITI was renamed.');
      process.exit(1);
    }

    // 1. Create Streams (Engineering vs Non-Engineering) under IT/Polytechnic Pathway
    const streamsData = [
      { name: 'Engineering Trades', description: 'Practical skills in technical fields', order: 1 },
      { name: 'Non-Engineering Trades', description: 'Skill-based trades for various industries', order: 2 }
    ];

    const streamMap: any = {};
    for (const s of streamsData) {
      const slug = createSlug(s.name);
      let stream = await Stream.findOne({ slug, pathwayId: itPolyPathway._id });
      if (!stream) {
        stream = await Stream.create({ ...s, slug, pathwayId: itPolyPathway._id });
      }
      streamMap[s.name] = stream;
    }

    // 2. Create ITI Courses (Trades)
    const engineeringTrades = [
      'Electrician',
      'Fitter',
      'Mechanic Motor Vehicle',
      'Turner',
      'Machinist',
      'Welder',
      'Electronics Mechanic',
      'Refrigeration & Air Conditioning Technician',
      'Draughtsman Mechanical',
      'Draughtsman Civil',
      'COPA - Computer Operator and Programming Assistant',
      'Mechanic Diesel',
      'Instrument Mechanic',
      'Wireman',
      'Technician Mechatronics',
      'Solar Technician',
      'ICT System Maintenance'
    ];

    const nonEngineeringTrades = [
      'Computer Operator & Programming Assistant',
      'Stenographer',
      'Secretarial Assistant',
      'Dress Making',
      'Sewing Technology',
      'Fashion Design & Technology',
      'Food Production',
      'Health & Sanitary Inspector',
      'Cosmetology',
      'Plumber',
      'Baker & Confectioner',
      'Front Office Assistant'
    ];

    let orderCount = 1;
    for (const tradeName of engineeringTrades) {
      const slug = createSlug(tradeName);
      const existing = await Course.findOne({ slug, streamId: streamMap['Engineering Trades']._id });
      if (!existing) {
        await Course.create({
          name: tradeName,
          slug,
          streamId: streamMap['Engineering Trades']._id,
          duration: '1-2 Years',
          eligibility: 'Class 10th Pass',
          description: `ITI certification in ${tradeName}`,
          active: true,
          order: orderCount++
        });
      }
    }

    orderCount = 1;
    for (const tradeName of nonEngineeringTrades) {
      const slug = createSlug(tradeName);
      const existing = await Course.findOne({ slug, streamId: streamMap['Non-Engineering Trades']._id });
      if (!existing) {
        await Course.create({
          name: tradeName,
          slug,
          streamId: streamMap['Non-Engineering Trades']._id,
          duration: '1-2 Years',
          eligibility: 'Class 10th Pass',
          description: `ITI certification in ${tradeName}`,
          active: true,
          order: orderCount++
        });
      }
    }

    console.log('Successfully seeded ITI Trades.');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding ITI:', error);
    process.exit(1);
  }
};

seedITI();
