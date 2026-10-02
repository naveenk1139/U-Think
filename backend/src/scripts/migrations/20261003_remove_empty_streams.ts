import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
import Stream from '../../models/Stream.js';
import Course from '../../models/Course.js';

const removeEmptyStreams = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected for cleaning empty streams.');

  const streams = await Stream.find({});
  let removed = 0;

  for (const s of streams) {
    // Check if any courses are assigned to this stream by slug or ID
    const count = await Course.countDocuments({ 
      $or: [
        { stream: s.slug },
        { stream: s._id.toString() }
      ]
    });

    if (count === 0) {
      console.log(`Removing empty stream: ${s.name} (${s.slug})`);
      await Stream.deleteOne({ _id: s._id });
      removed++;
    }
  }

  console.log(`Successfully removed ${removed} empty duplicate streams.`);
  process.exit(0);
};

removeEmptyStreams().catch(console.error);
