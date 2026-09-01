import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import College from '../models/College.js';
import { connectDB } from '../config/db.js';
import { massiveRealColleges } from './realCollegesDataMassive.js';
import District from '../models/District.js';
import State from '../models/State.js';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const run = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Inserting massive dataset...');
    
    const karnataka = await State.findOne({ name: 'Karnataka' });
    const allDistricts = await District.find({ stateId: karnataka?._id });
    const districtMap = allDistricts.reduce((acc, d) => ({ ...acc, [d.slug]: d._id }), {} as Record<string, any>);

    let count = 0;
    for (const data of massiveRealColleges) {
      const distSlug = slugify(data.district, { lower: true });
      const districtId = districtMap[distSlug];
      
      const exists = await College.findOne({ name: data.name });
      if (!exists) {
        await College.create({
          ...data,
          slug: slugify(data.name, { lower: true }),
          state: 'Karnataka',
          stateRef: karnataka?._id,
          districtRef: districtId,
          status: 'ACTIVE',
          source: 'gemini-pro-knowledge'
        });
        count++;
      }
    }
    
    console.log(`Successfully inserted ${count} colleges from the massive dataset.`);
    process.exit(0);
  } catch (error) {
    console.error('Error inserting dataset:', error);
    process.exit(1);
  }
};

run();
