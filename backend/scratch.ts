import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    // We don't need the full schema, just the collection name
    const College = mongoose.model('College', new mongoose.Schema({}, { strict: false }));
    
    const categories = await College.aggregate([
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } }
    ]);
    console.log("Categories:", JSON.stringify(categories, null, 2));
    
    const types = await College.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    console.log("Types:", JSON.stringify(types, null, 2));

  } finally {
    await mongoose.disconnect();
  }
}

run();
