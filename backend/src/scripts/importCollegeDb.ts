import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { searchCollegesFromAPI } from '../services/collegeDbService.js';
import { connectDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const fetchAndSync = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Starting bulk import from CollegeDB...');

    let totalFetched = 0;
    const limit = 100; // Let's try 100 to speed it up
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      console.log(`Fetching page ${page}...`);
      // We pass pageSize and limit to cover our bases with the API
      const result = await searchCollegesFromAPI({ state: 'Karnataka', page, limit, pageSize: limit });
      
      if (!result || !result.colleges || result.colleges.length === 0) {
        console.log(`No more colleges found on page ${page}. Breaking.`);
        hasMore = false;
        break;
      }

      totalFetched += result.colleges.length;
      console.log(`Successfully synced ${result.colleges.length} colleges from page ${page}. Total so far: ${totalFetched}`);
      
      // Stop if the API is clearly paginated but returns less than we asked for
      if (result.colleges.length < 20) {
        console.log(`Fetched less than 20 colleges on page ${page}. Reached the end.`);
        hasMore = false;
        break;
      }

      page++;
      // Be nice to the API
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    console.log(`\nImport complete! Successfully synced ${totalFetched} colleges to our database.`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to run import script:', error);
    process.exit(1);
  }
};

fetchAndSync();
