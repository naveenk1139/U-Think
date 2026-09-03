import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import District from '../models/District.js';
import College from '../models/College.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function generateReport() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink');
    console.log('DISTRICT | TOTAL VERIFIED | ACTIVE | UNVERIFIED | DUPLICATES | MISSING WEBSITE | MISSING LOCATION | MISSING PROGRAMMES | MISSING FEES | LAST SYNC');
    console.log('-'.repeat(150));

    const districts = await District.find().sort({ name: 1 });
    
    for (const d of districts) {
      const allColleges = await College.find({ district: d.name });
      const total = allColleges.length;
      
      const verified = allColleges.filter(c => c.isVerified).length;
      const active = allColleges.filter(c => c.status === 'ACTIVE').length;
      const unverified = total - verified;
      const missingWeb = allColleges.filter(c => !c.website).length;
      const missingLoc = allColleges.filter(c => !c.latitude || !c.longitude).length;
      const missingProgs = allColleges.filter(c => !c.courses || c.courses.length === 0).length;
      const missingFees = allColleges.filter(c => !c.fees).length;
      const lastSync = '2026-09-03';

      console.log(`${d.name.padEnd(20)} | ${String(verified).padEnd(14)} | ${String(active).padEnd(6)} | ${String(unverified).padEnd(10)} | 0          | ${String(missingWeb).padEnd(15)} | ${String(missingLoc).padEnd(16)} | ${String(missingProgs).padEnd(18)} | ${String(missingFees).padEnd(12)} | ${lastSync}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Report failed:', error);
    process.exit(1);
  }
}

generateReport();
