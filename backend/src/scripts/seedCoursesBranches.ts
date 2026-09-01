import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Course from '../models/Course.js';
import Branch from '../models/Branch.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const seedCoursesBranches = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Seeding Courses & Branches...');

    // Fetch combinations to link to
    const combos = await SubjectCombination.find({}).lean();
    const getComboIds = (slugs: string[]) => {
      return slugs.map(slug => combos.find(c => c.slug === slug)?._id).filter(Boolean);
    };

    // Define Courses
    const coursesData = [
      {
        name: 'B.E. / B.Tech',
        courseLevel: 'Undergraduate',
        duration: '4 Years',
        eligibility: '10+2 with Physics, Mathematics and Chemistry/Biology/Computer Science with minimum 45%',
        eligibleCombinations: getComboIds(['pcmc', 'pcmb', 'pcme', 'pcms', 'pcmg']),
        order: 1
      },
      {
        name: 'B.Sc (Bachelor of Science)',
        courseLevel: 'Undergraduate',
        duration: '3-4 Years',
        eligibility: '10+2 Science with minimum 50%',
        eligibleCombinations: getComboIds(['pcmc', 'pcmb', 'pcme', 'pcms', 'pcb', 'pcbh', 'pcmg']),
        order: 2
      },
      {
        name: 'BCA (Bachelor of Computer Applications)',
        courseLevel: 'Undergraduate',
        duration: '3 Years',
        eligibility: '10+2 in any stream (Mathematics/Computer Science preferred) with 50%',
        eligibleCombinations: getComboIds(['pcmc', 'pcme', 'ceba', 'seba', 'meba', 'msba']),
        order: 3
      },
      {
        name: 'B.Com (Bachelor of Commerce)',
        courseLevel: 'Undergraduate',
        duration: '3 Years',
        eligibility: '10+2 Commerce/Science with minimum 50%',
        eligibleCombinations: getComboIds(['ceba', 'seba', 'meba', 'msba', 'pcmb', 'pcmc']),
        order: 4
      },
      {
        name: 'BBA (Bachelor of Business Administration)',
        courseLevel: 'Undergraduate',
        duration: '3 Years',
        eligibility: '10+2 in any stream with minimum 50%',
        eligibleCombinations: getComboIds(['ceba', 'seba', 'meba', 'msba', 'pcmb', 'pcmc', 'heps', 'hesp']),
        order: 5
      }
    ];

    const createdCourses = [];
    for (const c of coursesData) {
      const slug = createSlug(c.name);
      let course = await Course.findOne({ slug });
      if (!course) {
        course = await Course.create({ ...c, slug });
      } else {
        await Course.updateOne({ slug }, { $set: { eligibleCombinations: c.eligibleCombinations } });
      }
      createdCourses.push(course);
    }

    // Define Branches
    const beCourse = createdCourses.find(c => c.slug === createSlug('B.E. / B.Tech'));
    const bscCourse = createdCourses.find(c => c.slug === createSlug('B.Sc (Bachelor of Science)'));
    const bcaCourse = createdCourses.find(c => c.slug === createSlug('BCA (Bachelor of Computer Applications)'));
    
    const branchesData = [];

    if (beCourse) {
      branchesData.push(
        { courseId: beCourse._id, name: 'Computer Science & Engineering', duration: '4 Years', order: 1 },
        { courseId: beCourse._id, name: 'Information Science & Engineering', duration: '4 Years', order: 2 },
        { courseId: beCourse._id, name: 'Electronics & Communication Engineering', duration: '4 Years', order: 3 },
        { courseId: beCourse._id, name: 'Mechanical Engineering', duration: '4 Years', order: 4 },
        { courseId: beCourse._id, name: 'Civil Engineering', duration: '4 Years', order: 5 },
        { courseId: beCourse._id, name: 'Artificial Intelligence & Machine Learning', duration: '4 Years', order: 6 }
      );
    }

    if (bscCourse) {
      branchesData.push(
        { courseId: bscCourse._id, name: 'B.Sc in Computer Science', duration: '3 Years', order: 1 },
        { courseId: bscCourse._id, name: 'B.Sc in Physics, Chemistry, Mathematics (PCM)', duration: '3 Years', order: 2 },
        { courseId: bscCourse._id, name: 'B.Sc in Biotechnology', duration: '3 Years', order: 3 }
      );
    }
    
    if (bcaCourse) {
       branchesData.push(
         { courseId: bcaCourse._id, name: 'BCA General', duration: '3 Years', order: 1 },
         { courseId: bcaCourse._id, name: 'BCA in Data Science', duration: '3 Years', order: 2 }
       );
    }

    for (const b of branchesData) {
      const slug = createSlug(b.name);
      let branch = await Branch.findOne({ slug, courseId: b.courseId });
      if (!branch) {
        await Branch.create({ ...b, slug });
      }
    }

    console.log('Successfully seeded Courses & Branches and connected them to Subject Combinations.');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding courses and branches:', error);
    process.exit(1);
  }
};

seedCoursesBranches();
