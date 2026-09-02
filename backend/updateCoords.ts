import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import College from './src/models/College.js';

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

async function updateCoordinates() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/uthink';
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    const colleges = await College.find({ latitude: { $exists: false } });
    console.log(`Found ${colleges.length} colleges missing coordinates.`);

    let updated = 0;
    for (const college of colleges) {
      const distName = (college.district || '').toLowerCase();
      const coords = MOCK_COORDS[distName] || { lat: 15.3173, lng: 75.7139 };
      
      const randomLat = coords.lat + (Math.random() - 0.5) * 0.1;
      const randomLng = coords.lng + (Math.random() - 0.5) * 0.1;

      college.latitude = randomLat;
      college.longitude = randomLng;
      await college.save();
      updated++;
    }

    console.log(`Successfully updated ${updated} colleges with mock coordinates.`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating coordinates:', error);
    process.exit(1);
  }
}

updateCoordinates();
