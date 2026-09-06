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

    const pathwaysData = [
      { name: 'PUC / 11th-12th', duration: '2 Years', eligibility: 'Passed 10th/SSLC', order: 1 },
      { name: 'Diploma / Polytechnic', duration: '3 Years', eligibility: 'Passed 10th/SSLC with minimum 35%', order: 2 },
      { name: 'IT / Polytechnic', duration: '1-2 Years', eligibility: 'Passed 10th/SSLC', order: 3 },
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
      { name: 'Science', slug: 'science', pathwayId: pucPathwayId, duration: '2 Years', order: 1, description: 'Explore science subject combinations.' },
      { name: 'Commerce', slug: 'commerce', pathwayId: pucPathwayId, duration: '2 Years', order: 2, description: 'Explore Commerce subject combinations and discover pathways in accounting, finance, economics, business, management, banking and entrepreneurship.', eligibility: 'Passed 10th/SSLC' },
      { name: 'Arts / Humanities', slug: 'arts', pathwayId: pucPathwayId, duration: '2 Years', order: 3, description: 'Explore humanities and social science subject combinations and discover pathways to law, civil services, psychology, journalism, design, education, social sciences, management and more.', eligibility: 'Passed 10th/SSLC' },
      { name: 'Vocational', slug: 'vocational', pathwayId: pucPathwayId, duration: '2 Years', order: 4 }
    ];

    const createdStreams: any = {};
    for (const s of streamsData) {
      const slug = s.slug || createSlug(s.name);
      let stream = await Stream.findOne({ slug, pathwayId: s.pathwayId });
      if (!stream) {
        stream = await Stream.create({ ...s, slug });
      } else {
        await Stream.updateOne({ _id: stream._id }, { $set: { description: s.description, eligibility: s.eligibility } });
        stream = await Stream.findById(stream._id);
      }
      createdStreams[slug] = stream;
    }

    // Helper to get or create subject
    const getSubject = async (name: string, description?: string) => {
      let subj = await Subject.findOne({ slug: createSlug(name) });
      if (!subj) subj = await Subject.create({ name, slug: createSlug(name), description });
      return subj._id;
    };

    // 4. Subject Combinations
    const scienceStreamId = createdStreams['science']._id;
    const commerceStreamId = createdStreams['commerce']._id;
    const artsStreamId = createdStreams['arts']._id;

    const combinationsData = [
      // Science
      { name: 'PCMB', streamId: scienceStreamId, description: 'PCMB is a flexible Science combination that keeps both Engineering/Technology and Medical/Life Science pathways open.', eligibility: 'Varies by board/college (Check specific requirements)', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'] },
      { name: 'PCMC', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'] },
      { name: 'PCME', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Mathematics', 'Electronics'] },
      { name: 'PCMS', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Mathematics', 'Statistics'] },
      { name: 'PCB', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Biology'] },
      { name: 'PCBH', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Biology', 'Home Science'] },
      { name: 'PCMG', streamId: scienceStreamId, subjects: ['Physics', 'Chemistry', 'Mathematics', 'Geology'] },
      
      // Commerce
      { name: 'Commerce with Mathematics', slug: 'commerce-with-math', streamId: commerceStreamId, description: 'Ideal for students aiming for CA, Finance, Economics, and Management.', eligibility: 'Passed 10th/SSLC', subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'] },
      { name: 'Commerce without Mathematics', slug: 'commerce-without-math', streamId: commerceStreamId, description: 'Suitable for Business, Management, Marketing, and Accounting pathways without advanced math requirements.', eligibility: 'Passed 10th/SSLC', subjects: ['Accountancy', 'Business Studies', 'Economics', 'Language'] },
      { name: 'CEBA', streamId: commerceStreamId, subjects: ['Computer Science', 'Economics', 'Business Studies', 'Accountancy'] },
      { name: 'SEBA', streamId: commerceStreamId, subjects: ['Statistics', 'Economics', 'Business Studies', 'Accountancy'] },
      { name: 'MEBA', streamId: commerceStreamId, subjects: ['Basic Mathematics', 'Economics', 'Business Studies', 'Accountancy'] },
      { name: 'Commerce + Entrepreneurship', streamId: commerceStreamId, subjects: ['Accountancy', 'Business Studies', 'Economics', 'Entrepreneurship'] },
      
      // Arts
      { name: 'HEPS (History, Economics, Political Science, Sociology)', slug: 'heps', streamId: artsStreamId, description: 'A robust combination for Law, Civil Services, and Social Sciences.', eligibility: 'Passed 10th/SSLC', subjects: ['History', 'Economics', 'Political Science', 'Sociology'] },
      { name: 'History + Geography + Political Science', streamId: artsStreamId, subjects: ['History', 'Geography', 'Political Science'] },
      { name: 'Psychology + Sociology + Political Science', streamId: artsStreamId, subjects: ['Psychology', 'Sociology', 'Political Science'] },
      { name: 'Economics + Political Science + Sociology', streamId: artsStreamId, subjects: ['Economics', 'Political Science', 'Sociology'] },
      { name: 'HESP', streamId: artsStreamId, subjects: ['History', 'Economics', 'Sociology', 'Psychology'] }
    ];

    for (const [index, c] of combinationsData.entries()) {
      const slug = c.slug || createSlug(c.name);
      
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
          description: (c as any).description,
          eligibility: (c as any).eligibility,
          subjects: subjIds,
          order: index + 1
        });
      } else {
        await SubjectCombination.updateOne({ _id: combo._id }, { $set: { description: (c as any).description, eligibility: (c as any).eligibility } });
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
