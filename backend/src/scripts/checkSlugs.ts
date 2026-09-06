import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, disconnectDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function checkSlugs() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    const pathways = await db?.collection('pathways').find({}, { projection: { name: 1, slug: 1, active: 1 } }).toArray();
    console.log('PATHWAYS:', pathways);
    const streams = await db?.collection('streams').find({}, { projection: { name: 1, slug: 1, pathwayId: 1 } }).toArray();
    console.log('STREAMS:', streams);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
}

checkSlugs();
