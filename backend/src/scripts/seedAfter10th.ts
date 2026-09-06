import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

import After10thPathway from '../models/After10thPathway.js';
import After10thCategory from '../models/After10thCategory.js';
import { connectDB } from '../config/db.js';

const seedData = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Clearing existing After-10th data...');
    
    await After10thPathway.deleteMany({});
    await After10thCategory.deleteMany({});

    // 1. 11th & 12th
    const xiXii = await After10thPathway.create({
      name: '11th & 12th',
      slug: '11th-12th',
      type: 'Academic',
      description: 'The standard higher secondary education academic route.',
      eligibility: '10th Pass from a recognized board',
      duration: '2 Years',
      order: 1
    });

    await After10thCategory.insertMany([
      { 
        pathwayId: xiXii._id, 
        name: 'Science', 
        slug: 'science', 
        possibleSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'], 
        majorDisciplines: ['PCM', 'PCB', 'PCMB'],
        combinations: [
          { name: 'PCM', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
          { name: 'PCB', subjects: ['Physics', 'Chemistry', 'Biology'] },
          { name: 'PCMB', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'] },
          { name: 'OTHER / BOARD-SPECIFIC COMBINATIONS', subjects: [
            'Science + Computer Science',
            'Science + Informatics Practices',
            'Science + Statistics',
            'Science + Biotechnology',
            'Science + Agriculture',
            'Science + Vocational Subjects',
            'Other combinations offered by the board'
          ] }
        ],
        order: 1 
      },
      { 
        pathwayId: xiXii._id, 
        name: 'Commerce', 
        slug: 'commerce', 
        possibleSubjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'Entrepreneurship', 'Computer Science'], 
        majorDisciplines: ['Core Commerce', 'Finance & Accounting', 'Economics & Mathematics', 'Business & Management', 'Banking & Financial Services', 'Computer / IT', 'Languages'],
        combinations: [
          { name: '1. CORE COMMERCE', subjects: ['Accountancy', 'Business Studies', 'Economics'] },
          { name: '2. MATHEMATICS & STATISTICS', subjects: ['Mathematics', 'Applied Mathematics', 'Statistics'] },
          { name: '3. FINANCE & ACCOUNTING', subjects: ['Finance', 'Banking', 'Insurance', 'Investment', 'Financial Markets'] },
          { name: '4. BUSINESS & MANAGEMENT', subjects: ['Business Management', 'Entrepreneurship', 'Marketing', 'Human Resources', 'Operations'] },
          { name: '5. ECONOMICS', subjects: ['Economics', 'Business Economics', 'Applied Economics'] },
          { name: '6. BANKING & FINANCIAL SERVICES', subjects: ['Banking', 'Insurance', 'Investment', 'Financial Services'] },
          { name: '7. COMPUTER / IT', subjects: ['Computer Science', 'Information Technology', 'Informatics Practices', 'E-Commerce'] },
          { name: '8. LANGUAGES', subjects: ['English', 'Hindi', 'Regional Languages', 'Foreign Languages'] },
          { name: '9. OTHER / BOARD-SPECIFIC', subjects: ['Entrepreneurship', 'Physical Education', 'Legal Studies', 'Other optional subjects'] },
          { name: 'POPULAR COMBINATIONS', subjects: [
            'Commerce + Accountancy + Economics',
            'Commerce + Accountancy + Business Studies',
            'Commerce + Accountancy + Economics + Mathematics',
            'Commerce + Accountancy + Economics + Computer/IT',
            'Other Board/School-Specific Combinations'
          ] }
        ],
        order: 2 
      },
      { 
        pathwayId: xiXii._id, 
        name: 'Arts / Humanities', 
        slug: 'arts-humanities', 
        possibleSubjects: ['History', 'Political Science', 'Geography', 'Sociology', 'Psychology', 'Economics'], 
        majorDisciplines: ['Humanities', 'Social Sciences', 'Fine Arts', 'Languages'],
        combinations: [
          { name: 'Humanities & Social Sciences Core', subjects: ['History', 'Political Science', 'Geography', 'Sociology', 'Psychology', 'Economics', 'Philosophy', 'Anthropology'] },
          { name: 'Languages & Literature', subjects: ['English', 'Hindi', 'Regional Languages', 'Foreign Languages'] },
          { name: 'Fine Arts', subjects: ['Painting', 'Visual Arts', 'Music', 'Dance', 'Theatre'] },
          { name: 'Media & Communication', subjects: ['Journalism', 'Mass Communication', 'Film', 'Photography', 'Advertising'] },
          { name: 'OTHER / BOARD-SPECIFIC SUBJECTS', subjects: ['Legal Studies', 'Physical Education', 'Tourism', 'Fashion Studies', 'Design', 'Computer / IT'] }
        ],
        order: 3 
      },
      { pathwayId: xiXii._id, name: 'Vocational', slug: 'vocational-12th', possibleSubjects: ['IT', 'Healthcare', 'Retail', 'Tourism'], order: 5 },
    ]);

    // 2. Diploma
    const diploma = await After10thPathway.create({
      name: 'Diploma / Polytechnic',
      slug: 'diploma',
      type: 'Technical',
      description: 'Technical polytechnic diploma courses for direct engineering or specialized industry entry.',
      eligibility: '10th Pass (minimum marks vary by state)',
      duration: '3 Years',
      order: 2
    });

    await After10thCategory.insertMany([
      { pathwayId: diploma._id, name: 'Civil Engineering', slug: 'civil', order: 1 },
      { pathwayId: diploma._id, name: 'Mechanical Engineering', slug: 'mechanical', order: 2 },
      { pathwayId: diploma._id, name: 'Electrical Engineering', slug: 'electrical', order: 3 },
      { pathwayId: diploma._id, name: 'Computer Science / IT', slug: 'computer-it', order: 4 },
      { pathwayId: diploma._id, name: 'Architecture-related', slug: 'architecture', order: 5 },
    ]);

    // 3. ITI
    const iti = await After10thPathway.create({
      name: 'ITI (Industrial Training Institute)',
      slug: 'iti',
      type: 'Trade',
      description: 'Skill-based training in specialized trades for rapid industrial employment.',
      eligibility: '10th Pass (some trades allow 8th pass)',
      duration: '1 to 2 Years',
      order: 3
    });

    await After10thCategory.insertMany([
      { pathwayId: iti._id, name: 'Electrician', slug: 'electrician', order: 1 },
      { pathwayId: iti._id, name: 'Fitter', slug: 'fitter', order: 2 },
      { pathwayId: iti._id, name: 'Mechanic (Motor Vehicle)', slug: 'mechanic', order: 3 },
      { pathwayId: iti._id, name: 'Computer Operator (COPA)', slug: 'copa', order: 4 },
      { pathwayId: iti._id, name: 'Welder', slug: 'welder', order: 5 },
    ]);

    // 4. Vocational & Skill
    const vocational = await After10thPathway.create({
      name: 'Vocational & Skill Development',
      slug: 'vocational-skill',
      type: 'Vocational',
      description: 'Short-term certificate courses focused on specialized skills for direct employment.',
      eligibility: '10th Pass',
      duration: '6 Months to 2 Years',
      order: 4
    });

    await After10thCategory.insertMany([
      { pathwayId: vocational._id, name: 'Healthcare Support', slug: 'healthcare', order: 1 },
      { pathwayId: vocational._id, name: 'Digital Skills', slug: 'digital-skills', order: 2 },
      { pathwayId: vocational._id, name: 'Beauty & Wellness', slug: 'beauty-wellness', order: 3 },
      { pathwayId: vocational._id, name: 'Hospitality', slug: 'hospitality', order: 4 },
    ]);
    
    // 5. Apprenticeship
    const apprenticeship = await After10thPathway.create({
      name: 'Apprenticeship-related',
      slug: 'apprenticeship',
      type: 'Apprenticeship',
      description: 'On-the-job training programs with stipends in various industries (NAPS).',
      eligibility: '10th Pass + minimum age requirements',
      duration: 'Varies by industry',
      order: 5
    });
    
    await After10thCategory.insertMany([
      { pathwayId: apprenticeship._id, name: 'Manufacturing Apprenticeship', slug: 'mfg-app', order: 1 },
      { pathwayId: apprenticeship._id, name: 'Service Sector Apprenticeship', slug: 'service-app', order: 2 },
    ]);

    console.log('Successfully seeded After-10th pathway data!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
