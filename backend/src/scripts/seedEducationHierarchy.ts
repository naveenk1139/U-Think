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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const seedEducationHierarchy = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Seeding Education Hierarchy (10th -> Pathways -> Streams -> Combinations)...');

    // 1. Education Level
    let after10thLevel = await EducationLevel.findOne({ slug: 'after-10th' });
    if (!after10thLevel) {
      after10thLevel = await EducationLevel.create({
        name: 'After 10th',
        slug: 'after-10th',
        description: 'Post-10th / SSLC education level',
        order: 1
      });
    }

    // 2. Pathways
    const pathwaysData = [
      { name: 'PUC / 11th-12th', duration: '2 Years', eligibility: 'Passed 10th/SSLC', order: 1 },
      { name: 'Diploma / Polytechnic', duration: '3 Years', eligibility: 'Passed 10th/SSLC with minimum 35%', order: 2 },
      { name: 'ITI', duration: '1-2 Years', eligibility: 'Passed 10th/SSLC', order: 3 },
      { name: 'Paramedical / Allied Health', duration: '2-3 Years', eligibility: 'Passed 10th/SSLC', order: 4 },
      { name: 'Vocational Education', duration: '1-2 Years', eligibility: 'Passed 10th/SSLC', order: 5 },
      { name: 'Apprenticeship / Skill Training', duration: '6 Months - 2 Years', eligibility: 'Passed 10th/SSLC', order: 6 },
      { name: 'Open Schooling', duration: 'Flexible', eligibility: 'Passed 10th/SSLC equivalent', order: 7 }
    ];

    const createdPathways: any = {};
    for (const p of pathwaysData) {
      const slug = createSlug(p.name);
      let pathway = await Pathway.findOne({ slug, educationLevelId: after10thLevel._id });
      if (!pathway) {
        pathway = await Pathway.create({ ...p, slug, educationLevelId: after10thLevel._id });
      }
      createdPathways[slug] = pathway;
    }

    // 3. PUC Streams
    const pucPathwayId = createdPathways['puc-11th-12th']._id;
    const streamsData = [
      { name: 'Science', pathwayId: pucPathwayId, duration: '2 Years', order: 1 },
      { name: 'Commerce', pathwayId: pucPathwayId, duration: '2 Years', order: 2 },
      { name: 'Arts / Humanities', pathwayId: pucPathwayId, duration: '2 Years', order: 3 },
      { name: 'Vocational', pathwayId: pucPathwayId, duration: '2 Years', order: 4 }
    ];

    const createdStreams: any = {};
    for (const s of streamsData) {
      const slug = createSlug(s.name);
      let stream = await Stream.findOne({ slug, pathwayId: s.pathwayId });
      if (!stream) {
        stream = await Stream.create({ ...s, slug });
      }
      createdStreams[slug] = stream;
    }

    // Helper to get or create subject
    const getSubject = async (name: string) => {
      let subj = await Subject.findOne({ slug: createSlug(name) });
      if (!subj) subj = await Subject.create({ name, slug: createSlug(name) });
      return subj._id;
    };

    // 4. Subject Combinations
    const scienceStreamId = createdStreams['science']._id;
    const commerceStreamId = createdStreams['commerce']._id;
    const artsStreamId = createdStreams['arts-humanities']._id;

    const combinationsData = [
      // Science
      { name: 'PCMB', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'] },
      { name: 'PCMC', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'] },
      { name: 'PCME', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Mathematics', 'Electronics'] },
      { name: 'PCMS', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Mathematics', 'Statistics'] },
      { name: 'PCB', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Biology'] },
      { name: 'PCBH', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Biology', 'Home Science'] },
      { name: 'PCMG', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Mathematics', 'Geology'] },
      
      // Commerce
      { name: 'CEBA', streamId: commerceStreamId, subjects: ['Computer Science', 'Economics', 'Business Studies', 'Accountancy'] },
      { name: 'SEBA', streamId: commerceStreamId, subjects: ['Statistics', 'Economics', 'Business Studies', 'Accountancy'] },
      { name: 'MEBA', streamId: commerceStreamId, subjects: ['Basic Mathematics', 'Economics', 'Business Studies', 'Accountancy'] },
      { name: 'MSBA', streamId: commerceStreamId, subjects: ['Mathematics', 'Statistics', 'Business Studies', 'Accountancy'] },
      
      // Arts
      { name: 'HEPS', streamId: artsStreamId, subjects: ['History', 'Economics', 'Political Science', 'Sociology'] },
      { name: 'HESP', streamId: artsStreamId, subjects: ['History', 'Economics', 'Sociology', 'Psychology'] }
    ];

    for (const [index, c] of combinationsData.entries()) {
      const slug = createSlug(c.name);
      
      const subjIds = [];
      for (const subjName of c.subjects) {
        subjIds.push(await getSubject(subjName));
      }

      let combo = await SubjectCombination.findOne({ slug, streamId: c.streamId });
      if (!combo) {
        await SubjectCombination.create({
          name: c.name,
          slug,
          streamId: c.streamId,
          subjects: subjIds,
          order: index + 1
        });
      }
    }

    console.log('Successfully seeded Education Hierarchy (Pathways, Streams, Subject Combinations).');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding education hierarchy:', error);
    process.exit(1);
  }
};

seedEducationHierarchy();
