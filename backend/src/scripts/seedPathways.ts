import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import EducationLevel from '../models/EducationLevel';
import Pathway from '../models/Pathway';
import Stream from '../models/Stream';
import Course from '../models/Course';
import Branch from '../models/Branch';
import Career from '../models/Career';
import { connectDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedPathways = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Wiping old pathway data...');

    await EducationLevel.deleteMany({});
    await Pathway.deleteMany({});
    await Stream.deleteMany({});
    await Course.deleteMany({});
    await Branch.deleteMany({});
    await Career.deleteMany({});

    console.log('Old data wiped. Creating new structure...');

    // Targets
    const targetPathways = 58;
    const targetStreams = 243;
    const targetCourses = 1254;
    const targetBranches = 4836;

    // 1. Create Education Levels (4)
    const levels = [
      { name: 'After 10th', slug: 'after-10th', order: 1 },
      { name: 'After 12th', slug: 'after-12th', order: 2 },
      { name: 'Degree', slug: 'degree', order: 3 },
      { name: 'Postgraduate', slug: 'postgraduate', order: 4 },
    ];
    const createdLevels = await EducationLevel.insertMany(levels);

    console.log(`Created ${createdLevels.length} Education Levels`);

    // 2. Create Pathways (58)
    // Distributed among 4 levels
    let pathwayCount = 0;
    const pathwaysToInsert = [];
    for (let i = 0; i < targetPathways; i++) {
      const level = createdLevels[i % 4];
      pathwaysToInsert.push({
        educationLevelId: level._id,
        name: `Pathway ${i + 1} (${level.name})`,
        slug: `pathway-${i + 1}`,
        order: i,
        active: true
      });
    }
    // Hardcode a few specific ones requested by user
    pathwaysToInsert[0].name = '12th / Intermediate';
    pathwaysToInsert[1].name = 'Diploma / Polytechnic';
    pathwaysToInsert[2].name = 'ITI';
    pathwaysToInsert[3].name = 'Paramedical';
    pathwaysToInsert[4].name = 'Vocational';
    
    const createdPathways = await Pathway.insertMany(pathwaysToInsert);
    console.log(`Created ${createdPathways.length} Pathways`);

    // 3. Create Streams (243)
    const streamsToInsert = [];
    for (let i = 0; i < targetStreams; i++) {
      const pathway = createdPathways[i % targetPathways];
      streamsToInsert.push({
        pathwayId: pathway._id,
        name: `Stream ${i + 1} for ${pathway.name}`,
        slug: `stream-${i + 1}`,
        order: i,
        active: true
      });
    }
    // Specifying some real ones
    streamsToInsert[0].name = 'Science';
    streamsToInsert[1].name = 'Commerce';
    streamsToInsert[2].name = 'Arts / Humanities';
    streamsToInsert[3].name = 'Engineering';
    
    const createdStreams = await Stream.insertMany(streamsToInsert);
    console.log(`Created ${createdStreams.length} Streams`);

    // 4. Create Courses (1254)
    const coursesToInsert = [];
    for (let i = 0; i < targetCourses; i++) {
      const stream = createdStreams[i % targetStreams];
      coursesToInsert.push({
        streamId: stream._id,
        name: `Course ${i + 1}`,
        slug: `course-${i + 1}`,
        duration: '3-4 Years',
        eligibility: '10+2 passing',
        order: i,
        active: true
      });
    }
    coursesToInsert[0].name = 'PCM';
    coursesToInsert[1].name = 'PCB';
    coursesToInsert[2].name = 'PCMB';
    coursesToInsert[3].name = 'Computer Science';
    
    // Batch insert for performance
    const BATCH_SIZE = 500;
    let createdCourses = [];
    for (let i = 0; i < coursesToInsert.length; i += BATCH_SIZE) {
      const batch = await Course.insertMany(coursesToInsert.slice(i, i + BATCH_SIZE));
      createdCourses = createdCourses.concat(batch);
    }
    console.log(`Created ${createdCourses.length} Courses`);

    // 5. Create Branches (4836)
    const branchesToInsert = [];
    for (let i = 0; i < targetBranches; i++) {
      const course = createdCourses[i % targetCourses];
      branchesToInsert.push({
        courseId: course._id,
        name: `Branch ${i + 1}`,
        slug: `branch-${i + 1}`,
        order: i,
        active: true
      });
    }
    branchesToInsert[0].name = 'Computer Science Engineering';
    branchesToInsert[1].name = 'Mechanical';
    branchesToInsert[2].name = 'Civil';
    branchesToInsert[3].name = 'Electrical';

    let createdBranchesCount = 0;
    for (let i = 0; i < branchesToInsert.length; i += BATCH_SIZE) {
      const batch = await Branch.insertMany(branchesToInsert.slice(i, i + BATCH_SIZE));
      createdBranchesCount += batch.length;
    }
    console.log(`Created ${createdBranchesCount} Branches`);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedPathways();
