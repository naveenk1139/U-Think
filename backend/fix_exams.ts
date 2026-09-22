import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const examSchema = new Schema({}, { strict: false });
const Exam = mongoose.model('Exam', examSchema);

const fixExams = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/uthink');

  const exams = await Exam.find({});
  for (const exam of exams) {
    const doc = exam.toObject();
    const update: any = {};
    
    // Convert name -> exam_name
    if (doc.name && !doc.exam_name) update.exam_name = doc.name;
    
    // Setup missing required fields
    update.education_level = 'AFTER_12TH';
    update.minimum_education = '12th Pass';
    update.conducting_body = 'NTA';
    update.eligibility = '12th Pass with required percentage';
    
    // Set streams and categories based on existing category
    if (doc.category === 'Medical') {
      update.streams = ['PCB'];
      update.exam_categories = ['Medical'];
    } else if (doc.category === 'Engineering') {
      update.streams = ['PCM'];
      update.exam_categories = ['Engineering'];
    } else if (doc.category === 'Law') {
      update.streams = ['ANY_STREAM'];
      update.exam_categories = ['Law'];
      update.conducting_body = 'Consortium of NLUs';
    } else {
      update.streams = ['ANY_STREAM'];
      update.exam_categories = ['General'];
    }
    
    await Exam.updateOne({ _id: exam._id }, { $set: update });
  }

  console.log('Fixed exams');
  await mongoose.disconnect();
};

fixExams().catch(console.error);
