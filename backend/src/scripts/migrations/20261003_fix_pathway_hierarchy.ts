import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected for Migration.');
};

const runMigration = async () => {
  await connectDB();
  const db = mongoose.connection.db;
  
  console.log('--- MIGRATION START ---');
  
  // 1. Identify canonical slugs
  const canonicalSlugs = [
    'puc', 'diploma', 'iti', 'paramedical', 'vocational', 
    'apprenticeship', 'industry-training', 'certificate'
  ];
  
  // 2. Ensure all canonical pathways exist and are active
  const pathwaysColl = db.collection('pathways');
  
  const canonicalMap: Record<string, any> = {};
  
  for (const slug of canonicalSlugs) {
    let pathway = await pathwaysColl.findOne({ slug });
    if (!pathway) {
      console.log(`Creating missing canonical pathway: ${slug}`);
      const res = await pathwaysColl.insertOne({
        name: slug.toUpperCase(),
        slug,
        active: true,
        order: canonicalSlugs.indexOf(slug) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      pathway = await pathwaysColl.findOne({ _id: res.insertedId });
    } else {
      await pathwaysColl.updateOne({ _id: pathway._id }, { $set: { active: true } });
      console.log(`Activated canonical pathway: ${slug}`);
    }
    canonicalMap[slug] = pathway;
  }
  
  // Fix naming for canonicals just in case
  await pathwaysColl.updateOne({ slug: 'puc' }, { $set: { name: 'PUC / 11th-12th' } });
  
  // 3. Deactivate competing/duplicate pathways so they don't show up in the UI
  const duplicateSlugs = [
    'puc-11th-12th', 'it-polytechnic', 'engineering-diploma', 'non-engineering-diploma',
    'healthcare-allied-diploma', 'skill-vocational', 'distance-education'
  ];
  const deactRes = await pathwaysColl.updateMany(
    { slug: { $in: duplicateSlugs } },
    { $set: { active: false } }
  );
  console.log(`Deactivated ${deactRes.modifiedCount} duplicate pathways.`);
  
  // 4. Ensure Science, Commerce, Arts are active and linked to canonical 'puc'
  const streamsColl = db.collection('streams');
  const pucId = canonicalMap['puc']._id;
  
  const canonicalStreams = ['puc-science', 'puc-commerce', 'puc-arts'];
  for (const streamSlug of canonicalStreams) {
    let stream = await streamsColl.findOne({ slug: streamSlug });
    if (stream) {
      await streamsColl.updateOne(
        { _id: stream._id },
        { $set: { active: true, pathwayId: pucId } }
      );
      console.log(`Activated and mapped canonical stream: ${streamSlug} to PUC`);
    } else {
      console.log(`Warning: Canonical stream ${streamSlug} not found!`);
    }
  }
  
  // 5. Deactivate duplicate streams under PUC (like "Core PUC / 11th-12th")
  const dupStreamRes = await streamsColl.updateMany(
    { slug: 'core-puc-11th-12th' },
    { $set: { active: false } }
  );
  console.log(`Deactivated ${dupStreamRes.modifiedCount} duplicate streams.`);
  
  console.log('--- MIGRATION COMPLETE ---');
  process.exit(0);
};

runMigration().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
