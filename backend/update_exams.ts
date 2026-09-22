import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const examSchema = new Schema({}, { strict: false });
const Exam = mongoose.model('Exam', examSchema);

mongoose.connect('mongodb://127.0.0.1:27017/uthink').then(async () => {
  const result = await Exam.updateMany({ status: { $exists: false } }, { $set: { status: 'ACTIVE' } });
  console.log('Updated Exams:', result);
  mongoose.disconnect();
}).catch(console.error);
