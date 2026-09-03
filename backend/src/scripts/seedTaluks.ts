import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Taluk from '../models/Taluk.js';
import District from '../models/District.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const talukData: Record<string, string[]> = {
  'Bagalkot': ['Badami', 'Bagalkot', 'Bilagi', 'Hungund', 'Jamkhandi', 'Mudhol'],
  'Bengaluru Rural': ['Devanahalli', 'Doddaballapura', 'Hoskote', 'Nelamangala'],
  'Bengaluru Urban': ['Bengaluru North', 'Bengaluru South', 'Bengaluru East', 'Anekal'],
  'Belagavi': ['Athani', 'Belagavi', 'Chikodi', 'Gokak', 'Hukkeri', 'Khanapur', 'Parasgad', 'Ramdurg', 'Raybag', 'Sampgaon'],
  'Ballari': ['Ballari', 'Hadagalli', 'Hagaribommanahalli', 'Harapanahalli', 'Hospet', 'Kudligi', 'Sandur', 'Siruguppa'],
  'Bidar': ['Aurad', 'Basavakalyan', 'Bhalki', 'Bidar', 'Homnabad'],
  'Vijayapura': ['Badami', 'Basavana Bagevadi', 'Bijapur', 'Bilgi', 'Hungund', 'Indi', 'Jamkhandi', 'Muddebihal', 'Mudhol', 'Sindgi', 'Talikoti'],
  'Chamarajanagar': ['Chamarajanagar', 'Gundlupet', 'Kollegal', 'Yelandur'],
  'Chikkaballapur': ['Bagepalli', 'Chikkaballapur', 'Chintamani', 'Gauribidanur', 'Gudibanda', 'Sidlaghatta'],
  'Chikkamagaluru': ['Chikkamagaluru', 'Kadur', 'Koppa', 'Mudigere', 'Tarikere'],
  'Chitradurga': ['Chitradurga', 'Hiriyur', 'Hosadurga', 'Holalkere', 'Molakalmuru', 'Challakere'],
  'Dakshina Kannada': ['Bantwal', 'Belthangady', 'Mangaluru', 'Puttur', 'Sullia'],
  'Davanagere': ['Davanagere', 'Channagiri', 'Harapanahalli', 'Honnali', 'Jagalur'],
  'Dharwad': ['Byadagi', 'Dharwad', 'Hangal', 'Hirekerur', 'Kalghatgi', 'Savanur'],
  'Gadag': ['Gadag', 'Gajendragad', 'Mundargi', 'Nargund', 'Ron'],
  'Kalaburagi': ['Afzalpur', 'Aland', 'Chittapur', 'Jevargi', 'Kalaburagi', 'Sedam'],
  'Hassan': ['Alur', 'Arakalagud', 'Belur', 'Hassan', 'Sakaleshpura'],
  'Haveri': ['Byadagi', 'Hangal', 'Haveri', 'Hirekerur', 'Ranebennur', 'Savanur', 'Shiggavi'],
  'Kodagu': ['Madikeri', 'Somwarpet', 'Virajpet'],
  'Kolar': ['Bangarapet', 'Kolar', 'Malur', 'Mulbagal'],
  'Koppal': ['Gangavathi', 'Karatagi', 'Koppal', 'Kushtagi'],
  'Mandya': ['Krishnarajpet', 'Maddur', 'Mandya', 'Malavalli', 'Nagamangala', 'Pandavapura', 'Srirangapatna'],
  'Mysuru': ['Hunsur', 'Krishnarajanagara', 'Mysuru', 'Nanjangud', 'Periyapatna', 'Tirumakudalu Narasipura'],
  'Raichur': ['Devadurga', 'Lingasugur', 'Manvi', 'Raichur', 'Sindhanur'],
  'Ramanagara': ['Channapatna', 'Kanakapura', 'Magadi', 'Ramanagara'],
  'Shivamogga': ['Bhadravathi', 'Hosanagara', 'Sagara', 'Shikaripura', 'Shivamogga', 'Soraba', 'Thirthahalli'],
  'Tumakuru': ['Chikkanayakanahalli', 'Gubbi', 'Koratagere', 'Kunigal', 'Madhugiri', 'Pavagada', 'Sira', 'Tiptur', 'Tumakuru', 'Turuvekere'],
  'Udupi': ['Kundapura', 'Udupi'],
  'Uttara Kannada': ['Ankola', 'Bhatkal', 'Haliyal', 'Honnavar', 'Karwar', 'Kumta', 'Mundgod', 'Siddapur', 'Sirsi', 'Supa', 'Yellapur'],
  'Vijayanagara': ['Hadagalli', 'Hagaribommanahalli', 'Harapanahalli', 'Hospet', 'Kudligi', 'Sandur', 'Siruguppa'],
  'Yadgir': ['Shahapur', 'Shorapur', 'Yadgir']
};

const createSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function seedTaluks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink');
    console.log('Connected to MongoDB');

    try {
      await Taluk.collection.drop();
      console.log('Dropped existing taluks collection');
    } catch (e) {
      console.log('Taluks collection does not exist yet');
    }

    let totalInserted = 0;

    for (const [districtName, taluks] of Object.entries(talukData)) {
      const district = await District.findOne({ name: districtName });
      
      if (!district) {
        console.warn(`Warning: District ${districtName} not found in database. Skipping its taluks.`);
        continue;
      }

      for (const talukName of taluks) {
        const slug = createSlug(`${districtName}-${talukName}`);
        
        await Taluk.findOneAndUpdate(
          { slug, districtId: district._id },
          { 
            name: talukName, 
            slug, 
            districtId: district._id
          },
          { upsert: true, new: true }
        );
        totalInserted++;
      }
      console.log(`Seeded ${taluks.length} taluks for ${districtName}`);
    }

    console.log(`\nSuccessfully processed ${totalInserted} taluks.`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed taluks:', error);
    process.exit(1);
  }
}

seedTaluks();
