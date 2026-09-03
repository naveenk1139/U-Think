import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import State from '../models/State.js';
import District from '../models/District.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const KARNATAKA_DISTRICTS = [
  'Bagalkot', 'Bengaluru Rural', 'Bengaluru Urban', 'Belagavi', 'Ballari', 
  'Bidar', 'Vijayapura', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 
  'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 
  'Kalaburagi', 'Hassan', 'Haveri', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 
  'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 
  'Uttara Kannada', 'Vijayanagara', 'Yadgir'
];

async function seedDistricts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink');
    console.log('Connected to MongoDB');

    // 1. Ensure State Exists
    let state = await State.findOne({ name: 'Karnataka' });
    if (!state) {
      state = await State.create({ name: 'Karnataka' });
      console.log('Created Karnataka state record');
    }

    // 2. Insert or Verify All Districts
    console.log(`Verifying/Inserting ${KARNATAKA_DISTRICTS.length} districts...`);
    let inserted = 0;
    
    for (const d of KARNATAKA_DISTRICTS) {
      const existing = await District.findOne({ name: d, stateId: state._id });
      if (!existing) {
        await District.create({
          name: d,
          slug: d.toLowerCase().replace(/ /g, '-'),
          stateId: state._id,
          state: 'Karnataka'
        });
        inserted++;
      }
    }

    console.log(`District seed complete. Inserted: ${inserted}. Total now in DB: ${await District.countDocuments()}`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDistricts();
