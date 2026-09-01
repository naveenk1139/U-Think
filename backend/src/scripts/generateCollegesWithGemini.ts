import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { syncCollegesToDB } from '../services/collegeDbService.js';
import { connectDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const districts = [
  'Bengaluru Urban', 'Mysuru', 'Belagavi', 'Dakshina Kannada', 
  'Udupi', 'Shivamogga', 'Tumakuru', 'Hassan', 'Mandya', 'Ballari', 
  'Kalaburagi', 'Davanagere', 'Dharwad', 'Vijayapura', 'Raichur', 
  'Kolar', 'Chikkaballapur', 'Chitradurga', 'Kodagu', 'Uttara Kannada', 
  'Bagalkot', 'Bidar', 'Chamarajanagar', 'Gadag', 'Haveri', 'Koppal', 
  'Ramanagara', 'Yadgir', 'Chikkamagaluru', 'Bengaluru Rural'
];

const generateForDistrict = async (district: string) => {
  const prompt = `You are a strict data extraction tool. List exactly 20 REAL, verified higher education colleges (Engineering, Medical, Degree, Management, Diploma, ITI) located in the district of ${district}, Karnataka, India. 
DO NOT MAKE UP FAKE COLLEGES. Only use real institutions.
Return a pure JSON array of objects with the following schema:
[{
  "name": "College Name",
  "city": "City Name",
  "district": "${district}",
  "state": "Karnataka",
  "type": "Private or Government",
  "categories": ["Engineering", "Medical", "Management", "Science", "Commerce", "Arts", "Diploma", "ITI"], // pick applicable
  "establishedYear": 2000,
  "courses": ["BE", "BSc", "BCom"],
  "specializations": ["Computer Science", "Civil"],
  "website": "www.example.com",
  "nirfRank": 100 // if applicable, else null
}]
Return ONLY the JSON array. Do not include markdown codeblocks or any other text.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            temperature: 0.1, // low temp for factual data
        }
    });

    let text = response.text || '[]';
    // Clean up potential markdown formatting
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const colleges = JSON.parse(text);
    return colleges;
  } catch (error) {
    console.error(`Failed to generate for ${district}:`, error);
    return [];
  }
};

const run = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Starting Gemini College Generation...');

    let totalImported = 0;

    for (const district of districts) {
      console.log(`Generating colleges for ${district}...`);
      const generated = await generateForDistrict(district);
      
      if (generated && generated.length > 0) {
        // Map to our DB schema format
        const normalized = generated.map((c: any) => ({
          source: 'gemini-pro',
          sourceId: `gemini-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          name: c.name,
          city: c.city,
          district: c.district,
          state: c.state,
          type: c.type,
          categories: c.categories || [],
          establishedYear: c.establishedYear,
          courses: c.courses || [],
          specializations: c.specializations || [],
          website: c.website,
          nirfRank: c.nirfRank,
          isVerified: true
        }));

        await syncCollegesToDB(normalized);
        totalImported += normalized.length;
        console.log(`Successfully synced ${normalized.length} colleges for ${district}. Total: ${totalImported}`);
      } else {
        console.log(`No colleges generated for ${district}.`);
      }
      
      // Wait a bit to avoid rate limits
      await new Promise(r => setTimeout(r, 3000));
    }

    console.log(`Finished! Successfully imported ${totalImported} real colleges via Gemini Pro.`);
    process.exit(0);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
};

run();
