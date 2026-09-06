import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import Pathway from '../models/Pathway.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const updateITI = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Updating ITI to IT / Polytechnic...');

    await Pathway.updateOne(
      { slug: 'iti' },
      { $set: { name: 'IT / Polytechnic', slug: 'it-polytechnic' } }
    );
    
    // Clean up if it created a duplicate earlier
    const allIti = await Pathway.find({ slug: 'it-polytechnic' });
    if (allIti.length > 1) {
       await Pathway.deleteOne({ _id: allIti[1]._id }); // rough cleanup
    }

    console.log('Update successful.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating:', error);
    process.exit(1);
  }
};

updateITI();
