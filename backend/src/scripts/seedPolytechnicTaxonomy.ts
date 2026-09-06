import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import Course from '../models/Course.js';
import Branch from '../models/Branch.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const taxonomy = [
  {
    stream: 'Computer & IT',
    courses: [
      {
        name: 'Diploma in Computer Science & Engineering',
        specializations: [
          'Software Development', 'Web Development', 'Mobile Application Development',
          'AI & Machine Learning', 'Data Science', 'Cyber Security', 'Cloud Computing',
          'Networking', 'Database Systems', 'IoT', 'DevOps'
        ]
      },
      { name: 'Diploma in Information Technology' },
      { name: 'Diploma in Computer Engineering' },
      { name: 'Diploma in Software Engineering' },
      { name: 'Diploma in Computer Applications' },
      { name: 'Diploma in Networking' },
      { name: 'Diploma in Cyber Security' },
      { name: 'Diploma in Cloud Computing' },
      { name: 'Diploma in Data Science' },
      { name: 'Diploma in AI & Machine Learning' }
    ]
  },
  {
    stream: 'Electrical & Electronics',
    courses: [
      {
        name: 'Electrical & Electronics Engineering - EEE',
        specializations: ['Power Systems', 'Electrical Machines', 'Industrial Automation', 'Control Systems', 'Renewable Energy', 'Electrical Design']
      },
      { name: 'Electrical Engineering' },
      {
        name: 'Electronics & Communication Engineering - ECE',
        specializations: ['Communication Systems', 'Embedded Systems', 'VLSI', 'IoT', 'Robotics', 'Instrumentation', 'Electronics Design']
      },
      { name: 'Electronics Engineering' },
      { name: 'Electronics & Instrumentation' },
      { name: 'Electrical Power Systems' }
    ]
  },
  {
    stream: 'Mechanical & Automobile',
    courses: [
      {
        name: 'Mechanical Engineering',
        specializations: ['Manufacturing', 'Production', 'CAD/CAM', 'Machine Design', 'Thermal Engineering', 'Industrial Automation', 'Mechatronics']
      },
      {
        name: 'Automobile Engineering',
        specializations: ['Vehicle Engineering', 'Automotive Electronics', 'Vehicle Maintenance', 'Automobile Design', 'EV Technology', 'Automotive Manufacturing']
      },
      { name: 'Mechatronics Engineering' },
      { name: 'Robotics & Automation' },
      { name: 'Production Engineering' },
      { name: 'Manufacturing Engineering' },
      { name: 'Tool & Die Engineering' },
      { name: 'Industrial Engineering' }
    ]
  },
  {
    stream: 'Civil & Construction',
    courses: [
      {
        name: 'Civil Engineering',
        specializations: ['Structural Engineering', 'Construction', 'Transportation', 'Geotechnical', 'Environmental', 'Surveying', 'Water Resources', 'Building Technology']
      },
      { name: 'Construction Technology' },
      { name: 'Civil & Environmental Engineering' },
      { name: 'Surveying' },
      { name: 'Building Technology' }
    ]
  },
  {
    stream: 'Design & Architecture',
    courses: [
      { name: 'Architecture Assistantship' },
      { name: 'Interior Design', specializations: ['Interior Design', 'Architectural Drafting', '3D Design', 'CAD Design', 'Graphic Design', 'Animation', 'Fashion Technology'] },
      { name: 'Fashion Design' },
      { name: 'Commercial Art' },
      { name: 'Graphic Design' },
      { name: 'Multimedia & Animation' },
      { name: 'Product Design' }
    ]
  },
  {
    stream: 'Chemical & Allied',
    courses: [
      { name: 'Chemical Engineering' },
      { name: 'Textile Technology' },
      { name: 'Food Technology' },
      { name: 'Polymer Technology' },
      { name: 'Biotechnology' }
    ]
  },
  {
    stream: 'Agriculture & Allied',
    courses: [
      { name: 'Agricultural Engineering' },
      { name: 'Agriculture' },
      { name: 'Horticulture' },
      { name: 'Food Technology' },
      { name: 'Agricultural Processing' }
    ]
  },
  {
    stream: 'Other Technical Streams',
    courses: [
      { name: 'Mining Engineering' },
      { name: 'Petroleum Technology' },
      { name: 'Instrumentation Technology' },
      { name: 'Biomedical Engineering' },
      { name: 'Refrigeration & Air Conditioning' },
      { name: 'Environmental Technology' },
      { name: 'Printing Technology' }
    ]
  }
];

const seedPolytechnic = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Seeding Polytechnic Taxonomy...');

    const pathway = await Pathway.findOne({ slug: 'diploma' });
    if (!pathway) {
      console.error('Diploma pathway not found!');
      process.exit(1);
    }

    // Wipe old generic streams and their courses
    const legacyStreams = await Stream.find({ pathwayId: pathway._id });
    if (legacyStreams.length > 0) {
      for (const legacyStream of legacyStreams) {
        await Course.deleteMany({ streamId: legacyStream._id });
      }
      await Stream.deleteMany({ pathwayId: pathway._id });
      console.log('Removed all legacy streams for diploma.');
    }

    // Clear branches that might belong to these
    // This is a fresh seed for polytechnic
    for (const [streamIndex, streamData] of taxonomy.entries()) {
      const streamSlug = createSlug(streamData.stream);
      let stream = await Stream.findOne({ slug: streamSlug, pathwayId: pathway._id });
      
      if (!stream) {
        stream = await Stream.create({
          name: streamData.stream,
          slug: streamSlug,
          pathwayId: pathway._id,
          duration: '3 Years',
          eligibility: 'Class 10th Pass',
          description: `Explore diploma courses in ${streamData.stream}`,
          order: streamIndex + 1
        });
      }

      for (const [courseIndex, courseData] of streamData.courses.entries()) {
        const courseSlug = createSlug(courseData.name);
        
        let course = await Course.findOne({ slug: courseSlug, streamId: stream._id });
        if (!course) {
          course = await Course.create({
            name: courseData.name,
            slug: courseSlug,
            streamId: stream._id,
            duration: '3 Years',
            eligibility: 'Class 10th Pass',
            description: `Diploma program in ${courseData.name}`,
            order: courseIndex + 1,
            active: true
          });
        }

        if (courseData.specializations && courseData.specializations.length > 0) {
          for (const [specIndex, specName] of courseData.specializations.entries()) {
            const branchSlug = createSlug(`${courseData.name}-${specName}`);
            let branch = await Branch.findOne({ slug: branchSlug, courseId: course._id });
            
            if (!branch) {
              await Branch.create({
                name: specName,
                slug: branchSlug,
                courseId: course._id,
                streamId: stream._id,
                pathwayId: pathway._id,
                description: `Specialization in ${specName}`,
                order: specIndex + 1,
                active: true
              });
            }
          }
        }
      }
    }

    console.log('Successfully seeded Polytechnic Taxonomy.');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding Polytechnic Taxonomy:', error);
    process.exit(1);
  }
};

seedPolytechnic();
