import mongoose from 'mongoose';
import District from '../models/District.js';
import State from '../models/State.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

async function seedGeography() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for Geography Seeding');

    const dataPath = path.join(process.cwd(), 'geoData.json');
    if (!fs.existsSync(dataPath)) {
      console.log('geoData.json not found. Exiting.');
      process.exit(1);
    }

    const geoData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Create State
    let state = await State.findOne({ name: geoData.state.name });
    if (!state) {
      state = await State.create({
        name: geoData.state.name,
        slug: geoData.state.name.toLowerCase().replace(/\s+/g, '-'),
        active: true
      });
      console.log(`Created state: ${state.name}`);
    }

    // Create Districts
    let createdCount = 0;
    for (const d of geoData.districts) {
      const slug = d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      let district = await District.findOne({ slug });
      if (!district) {
        district = await District.create({
          name: d.name,
          slug: slug,
          stateId: state._id,
          active: true
        });
        createdCount++;
      }
    }
    console.log(`Created ${createdCount} new districts.`);

  } catch (error) {
    console.error('Error seeding geography:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

seedGeography();
