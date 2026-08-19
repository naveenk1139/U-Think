import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AssessmentQuestion from '../models/AssessmentQuestion';
import CareerProfile from '../models/CareerProfile';

// Load environment variables
dotenv.config();

const questions = [
  {
    questionText: 'A machine suddenly stops working. What would you do first?',
    category: 'Scenario',
    targetEducationLevels: ['POST_10TH', '12TH_SCIENCE', 'DIPLOMA', 'ITI'],
    options: [
      { text: 'Check the power source and visible mechanical faults.', dimensionWeights: { technical: 8, problem_solving: 7, mechanical: 10 } },
      { text: 'Consult the manual and look up error codes.', dimensionWeights: { analytical: 8, research: 7, logical: 6 } },
      { text: 'Call a technician and manage the workflow around the breakdown.', dimensionWeights: { leadership: 7, communication: 8, business: 5 } },
      { text: 'Try to redesign the workflow so we don\'t rely on it.', dimensionWeights: { creativity: 9, problem_solving: 8 } }
    ]
  },
  {
    questionText: 'Which activity would you enjoy the most during a weekend?',
    category: 'Preference',
    targetEducationLevels: ['POST_10TH', '12TH_COMMERCE', '12TH_ARTS', '12TH_SCIENCE', 'DEGREE'],
    options: [
      { text: 'Building a custom PC or coding a script.', dimensionWeights: { technical: 10, analytical: 7 } },
      { text: 'Reading about the stock market or business strategies.', dimensionWeights: { business: 10, analytical: 6, numerical: 7 } },
      { text: 'Writing a blog, designing art, or storytelling.', dimensionWeights: { creativity: 10, communication: 8 } },
      { text: 'Volunteering at a local clinic or animal shelter.', dimensionWeights: { biological: 9, social: 10 } }
    ]
  },
  {
    questionText: 'If you were given a massive dataset of customer behavior, what would you do?',
    category: 'Logical',
    targetEducationLevels: ['12TH_SCIENCE', '12TH_COMMERCE', 'DEGREE', 'ENGINEERING'],
    options: [
      { text: 'Write an algorithm to predict future behavior.', dimensionWeights: { technical: 9, numerical: 8, analytical: 10 } },
      { text: 'Analyze it to find ways to increase revenue.', dimensionWeights: { business: 10, numerical: 7, analytical: 8 } },
      { text: 'Create a beautiful visual infographic to explain the data.', dimensionWeights: { creativity: 10, communication: 8 } },
      { text: 'Investigate if the data collection violated user privacy.', dimensionWeights: { analytical: 7, social: 9 } } // Law/Policy
    ]
  },
  {
    questionText: 'How do you prefer to solve a complex math problem?',
    category: 'Numerical',
    targetEducationLevels: ['POST_10TH', '12TH_SCIENCE', 'ENGINEERING'],
    options: [
      { text: 'Apply standard formulas step-by-step.', dimensionWeights: { numerical: 8, logical: 7 } },
      { text: 'Write a computer program to calculate it for me.', dimensionWeights: { technical: 10, analytical: 8, numerical: 6 } },
      { text: 'Visualize it using graphs or geometry.', dimensionWeights: { spatial: 10, creativity: 6, numerical: 7 } },
      { text: 'Relate it to real-world physics or financial examples.', dimensionWeights: { business: 5, scientific: 8, numerical: 9 } }
    ]
  },
  {
    questionText: 'You are leading a team project. The deadline is tomorrow and half the work is left. What is your reaction?',
    category: 'Situational',
    targetEducationLevels: ['12TH_COMMERCE', '12TH_ARTS', 'MANAGEMENT', 'DEGREE'],
    options: [
      { text: 'Take charge, reassign tasks efficiently, and motivate the team.', dimensionWeights: { leadership: 10, communication: 9, problem_solving: 8 } },
      { text: 'Sit down and do the hardest technical parts myself to ensure quality.', dimensionWeights: { technical: 8, analytical: 7, leadership: 4 } },
      { text: 'Negotiate with the client/teacher for a strategic extension.', dimensionWeights: { business: 9, communication: 10, problem_solving: 7 } },
      { text: 'Brainstorm a creative shortcut that meets the core requirements.', dimensionWeights: { creativity: 10, problem_solving: 9 } }
    ]
  }
];

const profiles = [
  {
    careerName: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems.',
    targetEducationLevels: ['12TH_SCIENCE', 'DIPLOMA', 'ENGINEERING', 'DEGREE'],
    requiredDimensions: { technical: 85, analytical: 80, problem_solving: 85, logical: 80, numerical: 70 },
    recommendedCourses: ['B.E. Computer Science', 'B.Tech IT', 'BCA', 'B.Sc Computer Science'],
    entranceExams: ['JEE Main', 'KCET', 'COMEDK', 'BITSAT'],
    roadmap: ['12th Science / Diploma', 'B.E. / B.Tech in CSE', 'Learn Programming & DSA', 'Software Developer', 'Senior Engineer']
  },
  {
    careerName: 'Data Scientist',
    description: 'Analyze complex data to help organizations make better decisions.',
    targetEducationLevels: ['12TH_SCIENCE', '12TH_COMMERCE', 'ENGINEERING', 'DEGREE'],
    requiredDimensions: { analytical: 90, numerical: 85, technical: 80, business: 60, logical: 85 },
    recommendedCourses: ['B.E. AI & Data Science', 'B.Sc Statistics', 'B.Tech CSE'],
    entranceExams: ['JEE Main', 'KCET'],
    roadmap: ['12th Science/Commerce', 'Degree in Math/Stats/CS', 'Master Python/R & ML', 'Data Analyst', 'Data Scientist']
  },
  {
    careerName: 'Doctor (MBBS)',
    description: 'Diagnose and treat medical conditions, improving patient health.',
    targetEducationLevels: ['12TH_SCIENCE', 'MEDICAL'],
    requiredDimensions: { biological: 90, scientific: 85, social: 70, analytical: 80, communication: 75 },
    recommendedCourses: ['MBBS', 'BDS', 'BAMS'],
    entranceExams: ['NEET'],
    roadmap: ['12th Science (PCB)', 'NEET Exam', 'MBBS (5.5 Years)', 'Internship', 'Specialization (MD/MS)']
  },
  {
    careerName: 'Chartered Accountant (CA)',
    description: 'Manage financial accounts, taxation, and auditing for businesses.',
    targetEducationLevels: ['12TH_COMMERCE', 'COMMERCE', 'DEGREE'],
    requiredDimensions: { numerical: 90, business: 85, analytical: 85, logical: 75 },
    recommendedCourses: ['B.Com', 'BBA Finance', 'CA Foundation'],
    entranceExams: ['CA Foundation', 'CUET'],
    roadmap: ['12th Commerce', 'CA Foundation', 'CA Intermediate', 'Articleship', 'CA Final']
  },
  {
    careerName: 'UI/UX Designer',
    description: 'Design intuitive and aesthetically pleasing digital interfaces.',
    targetEducationLevels: ['POST_10TH', '12TH_ARTS', '12TH_SCIENCE', 'DESIGN'],
    requiredDimensions: { creativity: 90, spatial: 85, technical: 60, communication: 75, analytical: 70 },
    recommendedCourses: ['B.Des', 'B.Sc Animation', 'BFA'],
    entranceExams: ['NID DAT', 'UCEED', 'NIFT'],
    roadmap: ['12th Any Stream', 'Design Degree', 'Build Portfolio', 'Junior Designer', 'Senior UI/UX Designer']
  },
  {
    careerName: 'Business Consultant',
    description: 'Advise companies on how to improve efficiency and profitability.',
    targetEducationLevels: ['12TH_COMMERCE', 'MANAGEMENT', 'DEGREE'],
    requiredDimensions: { business: 90, leadership: 85, communication: 90, analytical: 80, problem_solving: 85 },
    recommendedCourses: ['BBA', 'B.Com', 'MBA'],
    entranceExams: ['CAT', 'MAT', 'CUET'],
    roadmap: ['12th Commerce/Arts', 'BBA/B.Com', 'MBA from Top B-School', 'Consultant', 'Partner']
  }
];

const seedAssessmentData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/uthink';
    await mongoose.connect(mongoUri, { dbName: 'uthink' });
    console.log('Connected to MongoDB.');

    console.log('Clearing old assessment data...');
    await AssessmentQuestion.deleteMany({});
    await CareerProfile.deleteMany({});

    console.log('Inserting questions...');
    await AssessmentQuestion.insertMany(questions);

    console.log('Inserting career profiles...');
    await CareerProfile.insertMany(profiles);

    console.log('Successfully seeded Assessment Data!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedAssessmentData();
