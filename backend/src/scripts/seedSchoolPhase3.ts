import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import Board from '../models/Board.js';
import AcademicYear from '../models/AcademicYear.js';
import SchoolClass from '../models/SchoolClass.js';
import Syllabus from '../models/Syllabus.js';
import Unit from '../models/Unit.js';
import Chapter from '../models/Chapter.js';
import Topic from '../models/Topic.js';
import Subject from '../models/Subject.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedSchoolData = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Seeding Phase 3 School Data...');

    // 1. Board
    let cbse = await Board.findOne({ slug: 'cbse' });
    if (!cbse) {
      cbse = await Board.create({ name: 'CBSE', slug: 'cbse', type: 'Central' });
    }

    let karnataka = await Board.findOne({ slug: 'karnataka-state-board' });
    if (!karnataka) {
      karnataka = await Board.create({ name: 'Karnataka State Board', slug: 'karnataka-state-board', type: 'State' });
    }

    // 2. Academic Year
    let ay2026 = await AcademicYear.findOne({ name: '2026-2027' });
    if (!ay2026) {
      ay2026 = await AcademicYear.create({ name: '2026-2027', isCurrent: true });
    }

    // 3. Classes 1 to 10
    const classes = [];
    for (let i = 1; i <= 10; i++) {
      let schoolClass = await SchoolClass.findOne({ gradeLevel: i });
      if (!schoolClass) {
        schoolClass = await SchoolClass.create({ name: `Class ${i}`, slug: `class-${i}`, gradeLevel: i });
      }
      classes.push(schoolClass);
    }
    const class10 = classes[9];

    // 4. Subjects
    let math = await Subject.findOne({ slug: 'mathematics' });
    if (!math) {
      math = await Subject.create({ name: 'Mathematics', slug: 'mathematics', type: 'Core' });
    }
    let science = await Subject.findOne({ slug: 'science' });
    if (!science) {
      science = await Subject.create({ name: 'Science', slug: 'science', type: 'Core' });
    }

    // 5. Syllabus (CBSE Class 10 Math)
    let mathSyllabus = await Syllabus.findOne({ boardId: cbse._id, classId: class10._id, subjectId: math._id });
    if (!mathSyllabus) {
      mathSyllabus = await Syllabus.create({ boardId: cbse._id, classId: class10._id, subjectId: math._id, academicYearId: ay2026._id });
    }

    // 6. Units
    let algebraUnit = await Unit.findOne({ syllabusId: mathSyllabus._id, name: 'Algebra' });
    if (!algebraUnit) {
      algebraUnit = await Unit.create({ syllabusId: mathSyllabus._id, name: 'Algebra', order: 1 });
    }

    // 7. Chapters
    let polynomials = await Chapter.findOne({ unitId: algebraUnit._id, name: 'Polynomials' });
    if (!polynomials) {
      polynomials = await Chapter.create({ unitId: algebraUnit._id, name: 'Polynomials', order: 1 });
    }
    
    // 8. Topics
    let zeroesTopic = await Topic.findOne({ chapterId: polynomials._id, name: 'Zeroes of a Polynomial' });
    if (!zeroesTopic) {
      await Topic.create({ chapterId: polynomials._id, name: 'Zeroes of a Polynomial', order: 1, learningOutcomes: ['Understand the geometrical meaning of zeroes.'] });
    }

    console.log('Phase 3 seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedSchoolData();
