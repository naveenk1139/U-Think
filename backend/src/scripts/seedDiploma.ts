import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import EducationLevel from '../models/EducationLevel.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import Course from '../models/Course.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const seedDiploma = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Seeding Diploma Pathway...');

    let after10thLevel = await EducationLevel.findOne({ slug: 'after-10th' });
    if (!after10thLevel) {
      after10thLevel = await EducationLevel.create({
        name: 'After 10th',
        slug: 'after-10th',
        description: 'Post-10th / SSLC education level',
        order: 1
      });
    }

    let pathway = await Pathway.findOne({ slug: 'diploma', educationLevelId: after10thLevel._id });
    if (!pathway) {
      pathway = await Pathway.create({ 
        name: 'Diploma / Polytechnic', 
        slug: 'diploma', 
        duration: '3 Years', 
        eligibility: 'Passed 10th/SSLC with minimum 35%', 
        order: 2,
        educationLevelId: after10thLevel._id 
      });
    }

    let stream = await Stream.findOne({ slug: 'engineering-technology', pathwayId: pathway._id });
    if (!stream) {
      stream = await Stream.create({ 
        name: 'Engineering & Technology (Diploma)', 
        slug: 'engineering-technology', 
        pathwayId: pathway._id, 
        duration: '3 Years', 
        eligibility: 'Class 10th Pass',
        description: 'Explore diploma courses in core engineering and technology such as Automobile, Electrical, Electronics, Computer Science, Civil, Mechanical and more.',
        order: 1 
      });
    } else {
      await Stream.updateOne({ _id: stream._id }, { 
        $set: { 
          name: 'Engineering & Technology (Diploma)',
          duration: '3 Years',
          eligibility: 'Class 10th Pass',
          description: 'Explore diploma courses in core engineering and technology such as Automobile, Electrical, Electronics, Computer Science, Civil, Mechanical and more.'
        } 
      });
    }

    const coursesData = [
      {
        name: 'Diploma in Automobile Engineering',
        duration: '3 Years',
        eligibility: 'Class 10th Pass',
        description: 'Focuses on vehicle design, manufacturing, and mechanics.',
        higherStudyArea: 'Mechanics, Automotive Systems, Design', // Using this for skills display as per UI
        subjects: ['Mechanics', 'Automotive Systems', 'Design']
      },
      {
        name: 'Diploma in Electrical & Electronics Engineering (EEE)',
        duration: '3 Years',
        eligibility: 'Class 10th Pass',
        description: 'Covers core electrical systems, electronics, and power.',
        higherStudyArea: 'Electrical Systems, Electronics, Power',
        subjects: ['Electrical Systems', 'Electronics', 'Power']
      },
      {
        name: 'Diploma in Computer Science & Engineering (CSE)',
        duration: '3 Years',
        eligibility: 'Class 10th Pass',
        description: 'Covers programming, software development, and networks.',
        higherStudyArea: 'Programming, Networking, Software',
        subjects: ['Programming', 'Networking', 'Software']
      },
      {
        name: 'Diploma in Mechanical Engineering',
        duration: '3 Years',
        eligibility: 'Class 10th Pass',
        description: 'Focuses on machines, thermodynamics, and manufacturing.',
        higherStudyArea: 'Mechanics, Manufacturing, Design',
        subjects: ['Mechanics', 'Manufacturing', 'Design']
      },
      {
        name: 'Diploma in Civil Engineering',
        duration: '3 Years',
        eligibility: 'Class 10th Pass',
        description: 'Covers infrastructure construction, planning, and surveying.',
        higherStudyArea: 'Construction, Structures, Surveying',
        subjects: ['Construction', 'Structures', 'Surveying']
      },
      {
        name: 'Diploma in Electronics & Communication Engineering',
        duration: '3 Years',
        eligibility: 'Class 10th Pass',
        description: 'Focuses on electronics, communication circuits, and VLSI.',
        higherStudyArea: 'Electronics, Communication, VLSI',
        subjects: ['Electronics', 'Communication', 'VLSI']
      },
      {
        name: 'Diploma in Mechatronics',
        duration: '3 Years',
        eligibility: 'Class 10th Pass',
        description: 'A blend of mechanical, electronics, and software engineering.',
        higherStudyArea: 'Mechanical, Electronics, Automation',
        subjects: ['Mechanical', 'Electronics', 'Automation']
      },
      {
        name: 'Diploma in Renewable Energy Technology',
        duration: '3 Years',
        eligibility: 'Class 10th Pass',
        description: 'Focuses on sustainable and clean energy sources.',
        higherStudyArea: 'Solar, Wind, Energy Systems',
        subjects: ['Solar', 'Wind', 'Energy Systems']
      }
    ];

    for (const [index, c] of coursesData.entries()) {
      const slug = createSlug(c.name);
      
      let course = await Course.findOne({ slug, streamId: stream._id });
      if (!course) {
        await Course.create({
          name: c.name,
          slug,
          streamId: stream._id,
          duration: c.duration,
          eligibility: c.eligibility,
          description: c.description,
          higherStudyArea: c.higherStudyArea,
          subjects: c.subjects,
          order: index + 1
        });
      } else {
        await Course.updateOne({ _id: course._id }, {
          $set: {
            name: c.name,
            duration: c.duration,
            eligibility: c.eligibility,
            description: c.description,
            higherStudyArea: c.higherStudyArea,
            subjects: c.subjects,
            order: index + 1
          }
        });
      }
    }

    console.log('Successfully seeded Diploma Pathway and Courses.');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding Diploma hierarchy:', error);
    process.exit(1);
  }
};

seedDiploma();
