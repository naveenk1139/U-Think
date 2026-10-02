import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
import Course from '../../models/Course.js';

const fixCategories = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected for category fix.');

  const courses = await Course.find({});
  let updated = 0;
  for (const c of courses) {
    let cat = c.category;
    if (c.slug.startsWith('iti-')) cat = 'iti';
    else if (c.slug.startsWith('diploma-')) cat = 'diploma';
    else if (c.slug.startsWith('ug-')) cat = 'undergraduate';
    else if (c.slug.startsWith('pg-')) cat = 'postgraduate';
    else if (c.slug.startsWith('puc-')) cat = 'puc';
    else if (c.slug.startsWith('cert-') || c.slug.includes('certificate')) cat = 'certificate';
    else if (c.slug.includes('vocational') || c.slug.includes('nsqf')) cat = 'vocational';
    
    if (cat !== c.category) {
      c.category = cat;
      await c.save();
      updated++;
    }
  }
  console.log(`Updated categories for ${updated} courses`);
  process.exit(0);
};

fixCategories().catch(console.error);
