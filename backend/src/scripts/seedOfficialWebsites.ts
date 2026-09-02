import mongoose from 'mongoose';
import dotenv from 'dotenv';
import College from '../models/College';

// Load env vars
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

const verifiedWebsites = [
  {
    name: 'R.V. College of Engineering (RVCE)',
    url: 'https://www.rvce.edu.in/',
    source: 'Verified by AI'
  },
  {
    nameRegex: /B\.M\.S\. College of Engineering|BMS College/i,
    url: 'https://bmsce.ac.in/',
    source: 'Verified by AI'
  },
  {
    nameRegex: /Christ University/i,
    url: 'https://christuniversity.in/',
    source: 'Verified by AI'
  },
  {
    nameRegex: /Ramaiah Institute of Technology|MSRIT/i,
    url: 'https://www.msrit.edu/',
    source: 'Verified by AI'
  },
  {
    nameRegex: /PES University|PES Institute of Technology/i,
    url: 'https://pes.edu/',
    source: 'Verified by AI'
  },
  {
    nameRegex: /Bangalore University/i,
    url: 'https://bangaloreuniversity.ac.in/',
    source: 'Verified by AI'
  },
  {
    nameRegex: /Visvesvaraya Technological University|VTU/i,
    url: 'https://vtu.ac.in/',
    source: 'Verified by AI'
  }
];

async function seedOfficialWebsites() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
    
    let updatedCount = 0;

    for (const data of verifiedWebsites) {
      const result = await College.updateMany(
        { name: data.name },
        { 
          $set: {
            officialWebsiteUrl: data.url,
            websiteVerified: true,
            websiteSource: data.source,
            websiteVerifiedAt: new Date()
          }
        }
      );
      
      if (result.modifiedCount > 0) {
        console.log(`✅ Updated ${result.modifiedCount} college(s) matching ${data.name} with URL: ${data.url}`);
        updatedCount += result.modifiedCount;
      } else {
        console.log(`⚠️ No colleges found matching ${data.name}`);
      }
    }

    console.log(`\n🎉 Finished! Successfully updated ${updatedCount} colleges with official website URLs.`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected.');
    process.exit(0);
  }
}

seedOfficialWebsites();
