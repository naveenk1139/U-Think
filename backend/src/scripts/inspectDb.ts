import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, disconnectDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function inspectDb() {
  try {
    await connectDB();
    console.log('\n🔍 Database Inspection Started\n');

    const db = mongoose.connection.db;
    if (!db) {
        throw new Error('Database connection is not established');
    }

    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections.\n`);

    const stats = [];
    for (const collection of collections) {
      const coll = db.collection(collection.name);
      const count = await coll.countDocuments();
      stats.push({ name: collection.name, count });
    }

    // Sort by count descending
    stats.sort((a, b) => b.count - a.count);

    console.table(stats);

    // Sample from Colleges
    const collegesCollection = db.collection('colleges');
    const collegeCount = await collegesCollection.countDocuments();
    if (collegeCount > 0) {
        console.log('\n📚 Sample College Document:');
        const sampleCollege = await collegesCollection.findOne({});
        console.log(JSON.stringify(sampleCollege, null, 2));
    } else {
        console.log('\n⚠️ No colleges found in database.');
    }

    console.log('\n✅ Database Inspection Completed');
  } catch (error) {
    console.error('❌ Error inspecting database:', error);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
}

inspectDb();
