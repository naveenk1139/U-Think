import mongoose from 'mongoose';
import Pathway from './src/models/Pathway';
import Stream from './src/models/Stream';
import Course from './src/models/Course';
import dotenv from 'dotenv';

dotenv.config();

const SEED_DATA = [
  {
    pathway: { name: 'PUC / 11th–12th', slug: 'puc', order: 1 },
    streams: [
      {
        name: 'Science', slug: 'puc-science',
        courses: [
          { name: 'PCMB', type: 'Combination', slug: 'pcmb', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'], duration: '2 Years', eligibility: '10th / SSLC' },
          { name: 'PCMC', type: 'Combination', slug: 'pcmc', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'], duration: '2 Years', eligibility: '10th / SSLC' },
          { name: 'PCME', type: 'Combination', slug: 'pcme', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Electronics'], duration: '2 Years', eligibility: '10th / SSLC' },
          { name: 'PCMS', type: 'Combination', slug: 'pcms', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Statistics'], duration: '2 Years', eligibility: '10th / SSLC' },
          { name: 'PCB', type: 'Combination', slug: 'pcb', subjects: ['Physics', 'Chemistry', 'Biology'], duration: '2 Years', eligibility: '10th / SSLC' }
        ]
      },
      {
        name: 'Commerce', slug: 'puc-commerce',
        courses: [
          { name: 'CEBA', type: 'Combination', slug: 'ceba', subjects: ['Computer Science', 'Economics', 'Business Studies', 'Accountancy'], duration: '2 Years', eligibility: '10th / SSLC' },
          { name: 'SEBA', type: 'Combination', slug: 'seba', subjects: ['Statistics', 'Economics', 'Business Studies', 'Accountancy'], duration: '2 Years', eligibility: '10th / SSLC' },
          { name: 'EBAC', type: 'Combination', slug: 'ebac', subjects: ['Economics', 'Business Studies', 'Accountancy', 'Computer Science'], duration: '2 Years', eligibility: '10th / SSLC' }
        ]
      },
      {
        name: 'Arts / Humanities', slug: 'puc-arts',
        courses: [
          { name: 'History, Economics, Political Science, Sociology', type: 'Combination', slug: 'heps', subjects: ['History', 'Economics', 'Political Science', 'Sociology'], duration: '2 Years', eligibility: '10th / SSLC' }
        ]
      }
    ]
  },
  {
    pathway: { name: 'Diploma / Polytechnic', slug: 'diploma', order: 2 },
    streams: [
      {
        name: 'Engineering Diploma', slug: 'engineering-diploma',
        courses: [
          { name: 'Computer Science Engineering', type: 'Branch', slug: 'diploma-cse', duration: '3 Years', eligibility: '10th Pass' },
          { name: 'Civil Engineering', type: 'Branch', slug: 'diploma-civil', duration: '3 Years', eligibility: '10th Pass' },
          { name: 'Mechanical Engineering', type: 'Branch', slug: 'diploma-mech', duration: '3 Years', eligibility: '10th Pass' }
        ]
      }
    ]
  },
  {
    pathway: { name: 'Undergraduate Degree', slug: 'undergraduate', order: 3 },
    streams: [
      {
        name: 'Engineering & Technology', slug: 'ug-engineering',
        courses: [
          { 
            name: 'B.Tech / BE', type: 'Course', slug: 'btech', duration: '4 Years', eligibility: '12th Science (PCM)',
            children: [
              { name: 'Computer Science', type: 'Specialization', slug: 'btech-cse', 
                children: [
                  { name: 'AI & ML', type: 'Branch', slug: 'btech-cse-aiml', duration: '4 Years', eligibility: '12th Science' },
                  { name: 'Data Science', type: 'Branch', slug: 'btech-cse-ds', duration: '4 Years', eligibility: '12th Science' }
                ]
              },
              { name: 'Electronics & Communication', type: 'Specialization', slug: 'btech-ece' }
            ]
          }
        ]
      }
    ]
  },
  {
    pathway: { name: 'ITI & Trade Training', slug: 'iti', order: 4 },
    streams: [
      {
        name: 'Electrical Trades', slug: 'iti-electrical',
        courses: [
          { name: 'Electrician', type: 'Trade', slug: 'iti-electrician', duration: '2 Years', eligibility: '10th Pass' }
        ]
      }
    ]
  }
];

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1/uthink');
  
  for (const data of SEED_DATA) {
    let pathway = await Pathway.findOne({ slug: data.pathway.slug });
    if (!pathway) {
      pathway = await Pathway.create(data.pathway);
    }
    
    for (const streamData of data.streams) {
      let stream = await Stream.findOne({ slug: streamData.slug });
      if (!stream) {
        stream = await Stream.create({ ...streamData, pathwayId: pathway._id, courses: undefined });
      }
      
      const createCourses = async (courses: any[], parentId?: mongoose.Types.ObjectId) => {
        for (const courseData of courses) {
          let course = await Course.findOne({ slug: courseData.slug });
          if (!course) {
            course = await Course.create({ 
              name: courseData.name,
              slug: courseData.slug,
              type: courseData.type,
              streamId: stream._id,
              parentId: parentId,
              duration: courseData.duration,
              eligibility: courseData.eligibility,
              subjects: courseData.subjects
            });
          } else {
            // Update existing
            await Course.updateOne({ _id: course._id }, {
              type: courseData.type,
              streamId: stream._id,
              parentId: parentId,
              duration: courseData.duration,
              eligibility: courseData.eligibility,
              subjects: courseData.subjects
            });
          }
          
          if (courseData.children) {
            await createCourses(courseData.children, course._id);
          }
        }
      };
      
      if (streamData.courses) {
        await createCourses(streamData.courses);
      }
    }
  }
  
  console.log('Seed completed!');
  process.exit(0);
}

seed();
