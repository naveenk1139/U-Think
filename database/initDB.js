/**
 * MongoDB Database Setup & Initialization Script
 * 
 * Usage:
 *   node database/initDB.js [optional_mongodb_uri]
 * 
 * Example:
 *   node database/initDB.js
 *   node database/initDB.js "mongodb+srv://user:pass@cluster.mongodb.net/uthink"
 */

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const MONGODB_URI = process.argv[2] || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

// ─── Define Schemas ───────────────────────────────────────────────

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true, index: true },
    email: { type: String },
    displayName: { type: String },
    photoURL: { type: String },
    bio: { type: String, default: '' },
    streamPreference: { type: String, default: '' },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const QuizResultSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    answers: [
      {
        question: String,
        category: String,
        choiceText: String,
      },
    ],
    analysisText: { type: String, required: true },
    recommendedStreams: [{ type: String }],
  },
  { timestamps: true }
);

const SavedPathwaySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    specId: { type: String, required: true },
    specName: { type: String, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const TrackedExamSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    examId: { type: String, required: true },
    examName: { type: String, required: true },
    examDate: { type: String, default: '' },
    status: {
      type: String,
      enum: ['upcoming', 'preparing', 'appeared', 'completed'],
      default: 'upcoming',
    },
  },
  { timestamps: true }
);

const ReminderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    type: {
      type: String,
      enum: ['exam', 'application', 'result', 'general'],
      default: 'general',
    },
    isDone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ExamSchema = new mongoose.Schema(
  {
    examId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    description: String,
    eligibility: String,
    website: String,
  },
  { timestamps: true }
);

// Models
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const QuizResult = mongoose.models.QuizResult || mongoose.model('QuizResult', QuizResultSchema);
const SavedPathway = mongoose.models.SavedPathway || mongoose.model('SavedPathway', SavedPathwaySchema);
const TrackedExam = mongoose.models.TrackedExam || mongoose.model('TrackedExam', TrackedExamSchema);
const Reminder = mongoose.models.Reminder || mongoose.model('Reminder', ReminderSchema);
const Exam = mongoose.models.Exam || mongoose.model('Exam', ExamSchema);

// Initial Sample Data for Entrance Exams
const initialExams = [
  {
    examId: 'neet-ug',
    name: 'NEET-UG (National Eligibility cum Entrance Test)',
    category: 'Medical',
    level: 'National',
    description: 'Mandatory single entrance examination for admission to MBBS/BDS/BAMS/BHMS courses across India.',
    eligibility: '10+2 with Physics, Chemistry, Biology/Biotechnology (Min 50% aggregate)',
    website: 'https://neet.nta.nic.in',
  },
  {
    examId: 'jee-main',
    name: 'JEE Main (Joint Entrance Examination Main)',
    category: 'Engineering',
    level: 'National',
    description: 'National level engineering entrance test for admission into NITs, IIITs, CFTIs, and eligibility for JEE Advanced.',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry/Biotech/CS',
    website: 'https://jeemain.nta.nic.in',
  },
  {
    examId: 'jee-advanced',
    name: 'JEE Advanced',
    category: 'Engineering',
    level: 'National',
    description: 'Premier entrance test for securing undergraduate engineering admissions in Indian Institutes of Technology (IITs).',
    eligibility: 'Top 2.5 lakh qualifiers in JEE Main Paper 1',
    website: 'https://jeeadv.ac.in',
  },
  {
    examId: 'clat-ug',
    name: 'CLAT UG (Common Law Admission Test)',
    category: 'Law',
    level: 'National',
    description: 'National level entrance examination for admission to 5-year integrated BA LLB / BBA LLB courses at 22 NLUs.',
    eligibility: '10+2 or equivalent with minimum 45% marks (40% for SC/ST)',
    website: 'https://consortiumofnlus.ac.in',
  },
  {
    examId: 'cuet-ug',
    name: 'CUET UG (Common University Entrance Test)',
    category: 'General Degree',
    level: 'National',
    description: 'Unified national entrance assessment for undergraduate degree admissions in Central Universities and participating colleges.',
    eligibility: '10+2 passed or appearing in relevant discipline stream',
    website: 'https://cuet.samarth.ac.in',
  },
  {
    examId: 'nidata-design',
    name: 'NID DAT (Design Aptitude Test)',
    category: 'Design & Vocational',
    level: 'National',
    description: 'Entrance exam for 4-year Bachelor of Design (B.Des) programs across National Institutes of Design.',
    eligibility: '10+2 passed or appearing in any stream (Science, Commerce, Arts)',
    website: 'https://admissions.nid.edu',
  },
  {
    examId: 'keam-engg',
    name: 'KEAM (Kerala Engineering Architecture Medical)',
    category: 'Engineering & Pharmacy',
    level: 'State (Kerala)',
    description: 'State-level entrance examination for engineering and pharmacy degree admissions in Kerala state institutions.',
    eligibility: '10+2 with Physics, Chemistry and Mathematics',
    website: 'https://cee.kerala.gov.in',
  },
  {
    examId: 'ap-eapcet',
    name: 'AP EAPCET (Andhra Pradesh Engineering Agricultural and Pharmacy)',
    category: 'Engineering & Agriculture',
    level: 'State (Andhra Pradesh)',
    description: 'State entrance exam for engineering, agriculture, and pharmacy degree admissions in Andhra Pradesh.',
    eligibility: '10+2 with Mathematics/Biology, Physics, Chemistry',
    website: 'https://cets.apsche.ap.gov.in',
  },
  {
    examId: 'ts-eamcet',
    name: 'TG EAPCET (Telangana Engineering Agriculture and Pharmacy)',
    category: 'Engineering & Pharmacy',
    level: 'State (Telangana)',
    description: 'State entrance test for admissions to professional engineering, agriculture, and pharmacy courses in Telangana.',
    eligibility: '10+2 with Physics, Mathematics/Biology, Chemistry',
    website: 'https://eapcet.tsche.ac.in',
  },
  {
    examId: 'polycet',
    name: 'POLYCET (Diploma Polytechnic Entrance Test)',
    category: 'Polytechnic Diploma',
    level: 'State Level',
    description: 'State entrance exam for 3-year Polytechnic Diploma courses in Engineering and Non-Engineering streams after 10th.',
    eligibility: 'Passed 10th SSC or equivalent examination with Science and Math',
    website: 'https://polycet.sbtet.ap.gov.in',
  },
];

async function initializeDatabase() {
  console.log(`\n======================================================`);
  console.log(`🍃 U-THINK MongoDB Database Initialization`);
  console.log(`======================================================`);
  console.log(`Connecting to: ${MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@')}`);

  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'uthink' });
    console.log(`✅ Successfully connected to MongoDB server!`);

    // Ensure Indexes for all collections
    console.log(`\n📦 Initializing Collections & Creating Indexes...`);
    await User.createIndexes();
    await QuizResult.createIndexes();
    await SavedPathway.createIndexes();
    await TrackedExam.createIndexes();
    await Reminder.createIndexes();
    await Exam.createIndexes();
    console.log(`  - Users collection (Indexes: uid)`);
    console.log(`  - QuizResults collection (Indexes: userId)`);
    console.log(`  - SavedPathways collection (Indexes: userId)`);
    console.log(`  - TrackedExams collection (Indexes: userId)`);
    console.log(`  - Reminders collection (Indexes: userId)`);
    console.log(`  - Exams collection (Indexes: examId)`);

    // Seed Initial Exams
    console.log(`\n🌱 Seeding Initial Entrance Exams Catalog...`);
    for (const examData of initialExams) {
      await Exam.findOneAndUpdate(
        { examId: examData.examId },
        examData,
        { upsert: true, new: true }
      );
    }
    const totalExams = await Exam.countDocuments();
    console.log(`✅ ${totalExams} entrance exams cataloged in database.`);

    // Database Status Summary
    const stats = {
      usersCount: await User.countDocuments(),
      quizResultsCount: await QuizResult.countDocuments(),
      savedPathwaysCount: await SavedPathway.countDocuments(),
      trackedExamsCount: await TrackedExam.countDocuments(),
      remindersCount: await Reminder.countDocuments(),
      examsCount: totalExams,
    };

    console.log(`\n======================================================`);
    console.log(`🎉 MongoDB "uthink" Database is READY!`);
    console.log(`======================================================`);
    console.log(`📊 Current Database Stats:`);
    console.log(`   • Users:         ${stats.usersCount}`);
    console.log(`   • Quiz Results:  ${stats.quizResultsCount}`);
    console.log(`   • Saved Pathways:${stats.savedPathwaysCount}`);
    console.log(`   • Tracked Exams: ${stats.trackedExamsCount}`);
    console.log(`   • Reminders:     ${stats.remindersCount}`);
    console.log(`   • Exams Catalog: ${stats.examsCount}`);
    console.log(`======================================================\n`);

    await mongoose.disconnect();
    console.log(`Disconnected cleanly from MongoDB.`);
  } catch (err) {
    console.error(`❌ MongoDB Initialization Failed:`);
    console.error(err.message);
    if (err.message.includes('ECONNREFUSED')) {
      console.log(`\n💡 Tip: Make sure MongoDB service is running locally on port 27017,`);
      console.log(`   or pass your MongoDB Atlas cloud connection URI:`);
      console.log(`   node database/initDB.js "mongodb+srv://<username>:<password>@cluster.mongodb.net/uthink"\n`);
    }
    process.exit(1);
  }
}

initializeDatabase();
