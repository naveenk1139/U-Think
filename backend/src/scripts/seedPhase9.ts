import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exam from '../models/Exam.js';
import Degree from '../models/Degree.js';
import ExamDegreeMap from '../models/ExamDegreeMap.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/u-think';

async function seedExams() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    try {
      await mongoose.connection.collection('exams').dropIndex('examId_1');
    } catch (e) { }
    try {
      await mongoose.connection.collection('exams').dropIndex('slug_1');
    } catch (e) { }

    // 1. Create a dummy Entrance Exam
    const jee = await Exam.findOneAndUpdate(
      { canonical_slug: 'jee-main' },
      {
        exam_name: 'JEE Main (Joint Entrance Examination)',
        canonical_slug: 'jee-main',
        exam_type: 'Entrance',
        conducting_body: 'NTA',
        status: 'ACTIVE',
        education_level: 'AFTER_12TH',
        minimum_education: '12th Class with PCM',
        streams: ['PCM'],
        exam_categories: ['Engineering'],
        ownership: 'GOVERNMENT',
        description: 'National level engineering entrance exam for NITs, IIITs and GFTIs.',
        eligibility: '12th Class with PCM',
        official_website: 'https://jeemain.nta.nic.in/'
      },
      { new: true, upsert: true }
    );
    console.log('Upserted Exam:', jee.exam_name);

    // 2. Find any Degree
    const btech = await Degree.findOne();
    if (!btech) {
      console.log('No degree found. Run seedPhase5 first.');
      process.exit(1);
    }

    // 3. Map Exam to Degree
    await ExamDegreeMap.findOneAndUpdate(
      { exam_id: jee._id, degree_id: btech._id },
      {
        eligibility_condition: 'Required for admission into central government funded institutions and many state/private colleges.',
        mandatory_or_optional: 'Mandatory',
        admission_role: 'Entrance Exam'
      },
      { upsert: true }
    );
    console.log(`Mapped ${jee.exam_name} to ${btech.name}`);

    // Create a second exam for Medicine if MBBS exists
    const neet = await Exam.findOneAndUpdate(
      { canonical_slug: 'neet-ug' },
      {
        exam_name: 'NEET UG (National Eligibility cum Entrance Test)',
        canonical_slug: 'neet-ug',
        exam_type: 'Entrance',
        conducting_body: 'NTA',
        status: 'ACTIVE',
        education_level: 'AFTER_12TH',
        minimum_education: '12th Class with PCB',
        streams: ['PCB'],
        exam_categories: ['Medical'],
        ownership: 'GOVERNMENT',
        description: 'Single national level medical entrance exam.',
        eligibility: '12th Class with PCB',
        official_website: 'https://neet.nta.nic.in/'
      },
      { new: true, upsert: true }
    );
    
    const mbbs = await Degree.findOne({ name: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)' });
    if (mbbs) {
      await ExamDegreeMap.findOneAndUpdate(
        { exam_id: neet._id, degree_id: mbbs._id },
        {
          eligibility_condition: 'Mandatory for all medical admissions in India.',
          mandatory_or_optional: 'Mandatory',
          admission_role: 'Entrance Exam'
        },
        { upsert: true }
      );
      console.log(`Mapped ${neet.exam_name} to ${mbbs.name}`);
    }

    console.log('Exams seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedExams();
