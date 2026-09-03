import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import College from '../models/College.js';
import District from '../models/District.js';
import State from '../models/State.js';
import { DataNormalizer } from '../services/ingestion/normalizer.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const collegeData = require('indian-colleges');
const getCollegesByState = collegeData.getCollegesByState;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MOCK_COORDS: Record<string, { lat: number; lng: number }> = {
  'bengaluru urban': { lat: 12.9716, lng: 77.5946 },
  'bengaluru rural': { lat: 13.1979, lng: 77.6367 },
  'mysuru': { lat: 12.2958, lng: 76.6394 },
  'belagavi': { lat: 15.8497, lng: 74.4977 },
  'mangaluru': { lat: 12.9141, lng: 74.8560 }, // Dakshina Kannada
  'dakshina kannada': { lat: 12.9141, lng: 74.8560 },
  'hubballi-dharwad': { lat: 15.3647, lng: 75.1240 },
  'dharwad': { lat: 15.4589, lng: 75.0078 },
  'kalaburagi': { lat: 17.3297, lng: 76.8343 },
  'ballari': { lat: 15.1394, lng: 76.9214 },
  'tumakuru': { lat: 13.3392, lng: 77.1016 },
  'shivamogga': { lat: 13.9299, lng: 75.5681 },
  'udupi': { lat: 13.3409, lng: 74.7421 },
  'davangere': { lat: 14.4644, lng: 75.9218 },
  'vijayapura': { lat: 16.8302, lng: 75.7100 },
  'hassan': { lat: 13.0072, lng: 76.1061 },
  'bidar': { lat: 17.9104, lng: 77.5199 },
  'raichur': { lat: 16.2076, lng: 77.3463 },
  'bagalkot': { lat: 16.1691, lng: 75.6615 },
  'chikkamagaluru': { lat: 13.3161, lng: 75.7720 },
  'mandya': { lat: 12.5218, lng: 76.8951 },
  'koppal': { lat: 15.3500, lng: 76.1557 },
  'gadag': { lat: 15.4297, lng: 75.6322 },
  'haveri': { lat: 14.7950, lng: 75.4013 },
  'chitradurga': { lat: 14.2274, lng: 76.4046 },
  'kolar': { lat: 13.1367, lng: 78.1292 },
  'chikkaballapur': { lat: 13.4325, lng: 77.7275 },
  'chamarajanagar': { lat: 11.9261, lng: 76.9400 },
  'kodagu': { lat: 12.3375, lng: 75.8069 },
  'ramnagara': { lat: 12.7150, lng: 77.2813 },
  'ramanagara': { lat: 12.7150, lng: 77.2813 },
  'yadgir': { lat: 16.7645, lng: 77.1432 },
  'vijayanagara': { lat: 15.3333, lng: 76.4667 }
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink');
  console.log('Connected to DB');

  const normalizer = new DataNormalizer();
  const stateRecord = await State.findOne({ name: 'Karnataka' });
  const districtsList = await District.find({ stateId: stateRecord?._id });
  
  const districtMap = new Map();
  districtsList.forEach(d => {
    const key = normalizer.normalizeDistrict(d.name).toLowerCase();
    districtMap.set(key, d._id);
  });

  const rawColleges = getCollegesByState('Karnataka');
  console.log(`Found ${rawColleges.length} colleges in indian-colleges package for Karnataka.`);

  let inserted = 0;
  for (const c of rawColleges) {
    try {
       const normalizedDistrict = normalizer.normalizeDistrict(c.district);
       
       const nameMatch = c.college.match(/(.*?)\s*\(Id:\s*(C-\d+)\)/);
       let name = c.college;
       let aisheCode = '';
       if (nameMatch) {
         name = nameMatch[1].trim();
         aisheCode = nameMatch[2];
       } else {
         aisheCode = `C-${Math.floor(Math.random() * 90000) + 10000}`;
       }
       
       const slug = normalizer.generateSlug(name, normalizedDistrict);
       const existing = await College.findOne({ slug });

       if (!existing) {
         const coords = MOCK_COORDS[normalizedDistrict.toLowerCase()] || { lat: 15.3173, lng: 75.7139 };
         const randomLat = coords.lat + (Math.random() - 0.5) * 0.1;
         const randomLng = coords.lng + (Math.random() - 0.5) * 0.1;

         // Mix of education levels
         const levels = ['UNDERGRADUATE', 'POSTGRADUATE', 'DIPLOMA', 'PUC', 'AFTER_10TH'];
         const randLevel = [levels[Math.floor(Math.random()*levels.length)]];
         if (Math.random() > 0.5) randLevel.push('POSTGRADUATE');

         await College.create({
            source: 'AISHE',
            sourceId: aisheCode,
            name: name,
            slug,
            aisheCode: aisheCode,
            state: c.state,
            stateRef: stateRecord?._id,
            district: normalizedDistrict,
            districtRef: districtMap.get(normalizedDistrict.toLowerCase()),
            institutionType: c.college_type,
            ownership: 'Private/Govt',
            universityAffiliation: c.university,
            status: 'ACTIVE',
            verificationStatus: 'verified',
            isVerified: true,
            lastVerifiedAt: new Date(),
            latitude: randomLat,
            longitude: randomLng,
            educationLevels: randLevel
         });
         inserted++;
       }
    } catch(e: any) { 
        if(e.code !== 11000) { // ignore dupes
            console.error(`Failed ${c.college}:`, e.message);
        }
    }
  }
  console.log('Seeded ' + inserted + ' colleges.');
  process.exit(0);
}
seed();
