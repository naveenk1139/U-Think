import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Subject from '../models/Subject.js';
import Course from '../models/Course.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

async function seedCombinations() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB for seeding combinations');

    const allStreams = await Stream.find();
    
    // Ensure we have some subjects
    let genSubject = await Subject.findOne({ name: 'General Studies' });
    if (!genSubject) {
      genSubject = await Subject.create({
        name: 'General Studies',
        slug: 'general-studies',
        description: 'Core general studies'
      });
    }

    let coreSubject = await Subject.findOne({ name: 'Core Specialization' });
    if (!coreSubject) {
      coreSubject = await Subject.create({
        name: 'Core Specialization',
        slug: 'core-specialization',
        description: 'Main focus subject'
      });
    }

    for (const stream of allStreams) {
      const combos = await SubjectCombination.find({ streamId: stream._id });
      if (combos.length === 0) {
        // Create a generic combination for this stream
        const comboName = `${stream.name.substring(0, 4)} Combo`;
        
        await SubjectCombination.create({
          streamId: stream._id,
          name: comboName,
          slug: `${stream.slug}-combo`,
          description: `Standard subject combination for ${stream.name}`,
          subjects: [genSubject._id, coreSubject._id],
          active: true
        });
        console.log(`Created combination for stream: ${stream.name}`);
      }
    }

    console.log('Done seeding combinations for streams.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedCombinations();
