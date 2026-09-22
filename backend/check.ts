import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const examSchema = new Schema({}, { strict: false });
const Exam = mongoose.model('Exam', examSchema);

mongoose.connect('mongodb://127.0.0.1:27017/uthink').then(async () => {
  const total = await Exam.countDocuments({});
  const active = await Exam.countDocuments({ status: 'ACTIVE' });
  const allStatuses = await Exam.distinct('status');
  console.log('Total Exams:', total);
  console.log('Active Exams:', active);
  console.log('Statuses:', allStatuses);
  
  if (active === 0 && total > 0) {
    const sample = await Exam.findOne();
    console.log('Sample exam status:', sample.status);
  }
  
  mongoose.disconnect();
}).catch(console.error);
