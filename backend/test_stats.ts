import mongoose from 'mongoose';
import dotenv from 'dotenv';
import College from './src/models/College';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink');
  
  const total = await College.countDocuments();
  const aisheMatch = await College.countDocuments({ source: 'aishe' });
  const hasWebsite = await College.countDocuments({ officialWebsiteUrl: { $exists: true, $ne: null } });
  
  // Try to find if aisheCode exists in schema by checking if any doc has it
  const sample = await College.findOne({ sourceId: { $exists: true } });
  
  console.log('--- DATABASE INSPECTION REPORT ---');
  console.log(`1. Total College Records: ${total}`);
  console.log(`2. Current Database/Collection: uthink / colleges`);
  console.log(`3. Existing AISHE fields: Used 'source: aishe' and 'sourceId' (${aisheMatch} colleges match AISHE source)`);
  console.log(`4. Existing official website fields: ${hasWebsite} colleges have officialWebsiteUrl`);
  
  process.exit(0);
}

run();
