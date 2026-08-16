const connectDB = require('../connection');
const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  examId: String,
  name: String,
  category: String,
  level: String,
  description: String,
});

const Exam = mongoose.models.Exam || mongoose.model('Exam', ExamSchema);

const sampleExams = [
  {
    examId: 'neet-ug',
    name: 'NEET-UG',
    category: 'Medical',
    level: 'National',
    description: 'National Eligibility cum Entrance Test for Undergraduate medical courses across India.',
  },
  {
    examId: 'jee-main',
    name: 'JEE Main',
    category: 'Engineering',
    level: 'National',
    description: 'Joint Entrance Examination Main for admission to NITs, IIITs and CFTIs.',
  },
  {
    examId: 'clat-ug',
    name: 'CLAT UG',
    category: 'Law',
    level: 'National',
    description: 'Common Law Admission Test for undergraduate law programs at 22 NLUs.',
  },
  {
    examId: 'cuet-ug',
    name: 'CUET UG',
    category: 'General',
    level: 'National',
    description: 'Common University Entrance Test for admission to Central Universities across India.',
  },
];

async function seed() {
  await connectDB();
  console.log('🌱 Seeding sample entrance exams...');
  await Exam.deleteMany({});
  await Exam.insertMany(sampleExams);
  console.log('✅ Sample exams seeded successfully.');
  process.exit(0);
}

seed();
