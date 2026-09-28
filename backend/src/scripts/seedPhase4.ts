import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import EducationLevel from '../models/EducationLevel.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Subject from '../models/Subject.js';
import Degree from '../models/Degree.js';
import EducationPathRelation from '../models/EducationPathRelation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedPhase4 = async () => {
  try {
    await connectDB();
    console.log('Seeding Phase 4 Post-10th Data...');

    // 1. Education Level
    let post10th = await EducationLevel.findOne({ slug: 'post-10th' });
    if (!post10th) {
      post10th = await EducationLevel.create({ name: 'Post-10th', slug: 'post-10th', levelCode: 'L2', order: 2 });
    }

    // 2. Pathway
    let puc = await Pathway.findOne({ slug: 'puc-11th-12th' });
    if (!puc) {
      puc = await Pathway.create({ educationLevelId: post10th._id, name: '11th/12th PUC', slug: 'puc-11th-12th', order: 1 });
    }
    
    let diploma = await Pathway.findOne({ slug: 'diploma' });
    if (!diploma) {
      diploma = await Pathway.create({ educationLevelId: post10th._id, name: 'Diploma', slug: 'diploma', order: 2 });
    }

    // 3. Stream
    let science = await Stream.findOne({ pathwayId: puc._id, slug: 'science' });
    if (!science) {
      science = await Stream.create({ pathwayId: puc._id, name: 'Science', slug: 'science', order: 1 });
    }
    let commerce = await Stream.findOne({ pathwayId: puc._id, slug: 'commerce' });
    if (!commerce) {
      commerce = await Stream.create({ pathwayId: puc._id, name: 'Commerce', slug: 'commerce', order: 2 });
    }

    // 4. Subjects
    const getSubject = async (name: string, slug: string) => {
      let sub = await Subject.findOne({ slug });
      if (!sub) sub = await Subject.create({ name, slug, type: 'Core' });
      return sub;
    };
    const physics = await getSubject('Physics', 'physics');
    const chemistry = await getSubject('Chemistry', 'chemistry');
    const math = await getSubject('Mathematics', 'mathematics');
    const biology = await getSubject('Biology', 'biology');

    // 5. Subject Combinations
    let pcm = await SubjectCombination.findOne({ streamId: science._id, slug: 'pcm' });
    if (!pcm) {
      pcm = await SubjectCombination.create({ streamId: science._id, name: 'PCM (Physics, Chemistry, Math)', slug: 'pcm', subjects: [physics._id, chemistry._id, math._id] });
    }
    let pcb = await SubjectCombination.findOne({ streamId: science._id, slug: 'pcb' });
    if (!pcb) {
      pcb = await SubjectCombination.create({ streamId: science._id, name: 'PCB (Physics, Chemistry, Biology)', slug: 'pcb', subjects: [physics._id, chemistry._id, biology._id] });
    }

    // 6. Degrees
    let btech = await Degree.findOne({ slug: 'btech' });
    if (!btech) {
      btech = await Degree.create({ degreeId: 'DEG_BTECH', name: 'Bachelor of Technology (B.Tech)', slug: 'btech', type: 'Undergraduate', duration: 4, duration_unit: 'Years', level: 'UG' });
    }
    let mbbs = await Degree.findOne({ slug: 'mbbs' });
    if (!mbbs) {
      mbbs = await Degree.create({ degreeId: 'DEG_MBBS', name: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)', slug: 'mbbs', type: 'Undergraduate', duration: 5.5, duration_unit: 'Years', level: 'UG' });
    }

    // 7. Graph Relations
    // PCM -> ENABLES -> B.Tech
    let pcmToBtech = await EducationPathRelation.findOne({ sourceId: pcm._id, targetId: btech._id, relationType: 'ELIGIBLE_FOR' });
    if (!pcmToBtech) {
      await EducationPathRelation.create({
        sourceType: 'SubjectCombination', sourceId: pcm._id,
        targetType: 'Degree', targetId: btech._id,
        relationType: 'ELIGIBLE_FOR',
        minScoreRequired: 45,
        entranceExamRequired: true,
        description: 'Requires appearing for JEE Main/KCET/COMEDK'
      });
    }

    // PCB -> ENABLES -> MBBS
    let pcbToMbbs = await EducationPathRelation.findOne({ sourceId: pcb._id, targetId: mbbs._id, relationType: 'ELIGIBLE_FOR' });
    if (!pcbToMbbs) {
      await EducationPathRelation.create({
        sourceType: 'SubjectCombination', sourceId: pcb._id,
        targetType: 'Degree', targetId: mbbs._id,
        relationType: 'ELIGIBLE_FOR',
        minScoreRequired: 50,
        entranceExamRequired: true,
        description: 'Requires appearing for NEET UG'
      });
    }

    console.log('Phase 4 seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedPhase4();
