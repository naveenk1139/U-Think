import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
import Pathway from '../../models/Pathway.js';
import Stream from '../../models/Stream.js';
import Course from '../../models/Course.js';

const removeEmptyPathways = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected for cleaning empty pathways.');

  const pathways = await Pathway.find({});
  let removed = 0;

  for (const p of pathways) {
    // Check if any streams exist for this pathway
    const streamCount = await Stream.countDocuments({ pathwayId: p._id.toString() });
    
    // Check if any courses are directly assigned to this pathway category
    const courseCount = await Course.countDocuments({ category: p.slug });

    if (streamCount === 0 && courseCount === 0) {
      console.log(`Removing empty pathway: ${p.name} (${p.slug})`);
      await Pathway.deleteOne({ _id: p._id });
      removed++;
    }
  }

  console.log(`Successfully removed ${removed} empty duplicate pathways.`);
  process.exit(0);
};

removeEmptyPathways().catch(console.error);
