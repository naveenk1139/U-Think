import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import College from '../models/College.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const autonomousColleges = [
  { name: "Acharya Bangalore B School", address: "No. 3, Linghadheeranahalli, Andrahall Main Road, Off Magadi Road, Bangalore-560091" },
  { name: "College of Fine Arts, Karnataka Chitrakala", address: "Parishath, Art Complex, Kumara Krupa Road, Bangalore-56001" },
  { name: "Govt. First Grade College, Vijayanagara", address: "Hampinagar Ward, Bangalore" },
  { name: "Government Science College", address: "Nrupathunga Road, Bangalore-560 001" },
  { name: "Indian Academy Degree College", address: "Hennur Cross, Hennur Main Road, Kalyan Nagar, Bangalore-560 043" },
  { name: "IFIM College", address: "#8P & 9P, Kiadb Industrial Area, Electronics City Phase-I, Bangalore" },
  { name: "Jyoti Nivas College", address: "Hosur Road, Bangalore-560 095" },
  { name: "Kristu Jayanti College", address: "K. Narayanapura, Kothanur (PO) Bangalore-560077" },
  { name: "Koshys Institute of Management Studies", address: "31/1, Kadusonnapana Halli, Hennur-Bagalur Road, Kannur P.O, Bengaluru - 562 149" },
  { name: "Krupanidhi College of Management", address: "12/1, Chikkabellandur, Carmelaram Post, Varthur Hobli, off Sarjapur Road, Bangalore -560035" },
  { name: "Maharani Lakshmi Ammanni College for Women", address: "Malleswaram Post, Bangalore-560 012" },
  { name: "Maharani Women's Arts, Commerce and Management College", address: "Seshadri Road, Bengaluru-560 001" },
  { name: "Mount Carmel College", address: "# 58, Palace Road, Bangalore-560052" },
  { name: "NMKRV College for Women", address: "III Block, Jayanagar, Bangalore-560011" },
  { name: "Padmashree Institute of Management and Sciences", address: "149, Padmashree campus, Kommaghatta, Kengeri, Bangalore" },
  { name: "RNS First Grade College", address: "Dr. Vishnunagar Road, Channasandra, RR Nagar Post, Bangalore-560 098" },
  { name: "Smt. Vishindevi Harbhagwandas Dhanoomal Central Institute of Home Science", address: "Seshadri Road, Bangalore-560 001" },
  { name: "St. Claret College", address: "PO Bo-1355, MES Ring Road, Jalahalli, Bangalore-560013" },
  { name: "St Francis De Sales College", address: "Electronics City Post, Bangalore" },
  { name: "St. Joseph's College of Commerce", address: "63, Brigade Road, Bangalore-560025" },
  { name: "St. Joseph's College", address: "36, Lalbagh Road, Bangalore-560027" },
  { name: "St. Joseph's Evening College", address: "35, Museum Road, Bangalore-560 025" },
  { name: "Surana College", address: "No. 16, South End Road, Bangalore-560 004" },
  { name: "The National College, Jayanagar", address: "Bangalore-560070" },
  { name: "The National Degree College, Vanivilas Road", address: "Basavangudi, Bangalore-560004" },
  { name: "T. John College", address: "#88/1, Kammanahalli, Gottigere Post, Bannerghatta Road, Bangalore-560 083" },
  { name: "B.M.S. College for Women", address: "Bugle Rock Road, Basavagudi, Bengaluru-560 004" },
  { name: "International Institute of Business Studies", address: "Bangalore North, Jala Hobli, Bangalore – 562157" },
  { name: "Jain College", address: "No.15, Vasavi Temple Road, V.V. Puram, Bengaluru – 560004" },
  { name: "MS Ramaiah College of Arts, Science and Commerce", address: "MSRIT Post, MSR Nagar, Mathikere, Bengaluru – 560 054" },
  { name: "Presidency College", address: "33/2 C&D, Kempapura Bengaluru-560 024" },
  { name: "RV Institute of Management", address: "CA-17, 36th Cross, 26th Main, Jayanagar 4th T Block, Bengaluru-560 041" },
  { name: "Krupanidhi Degree College", address: "12/1Chikkabellandur, Carmelaram Post, Varthur Hobli, off Sarjapur Road, Bangalore 560035" },
  { name: "Silicon City College", address: "K.R. Puram, Bangalore-560036" },
  { name: "S.E.A. College of Science, Commerce and Arts", address: "Ekta Nagar, A. Krishnappa Circle, Devasandara Main Road, Virgo Nagar Post, Ayyappanagar Circle, K.R. Puram, Bangalore-560049" },
  { name: "Govt. Arts College", address: "Chitradurga-577 501" },
  { name: "Shrishaila Jagadguru Vageesha Panditaradhya College", address: "Harihar-577601" },
  { name: "K.L.E. Society's P.C. Jabin Science College", address: "Vidyanagar, Hubli -580031" },
  { name: "Government College, Vidya Nagar Main Rd", address: "Sedam Road, Kalaburagi, Gulbarga" },
  { name: "B.M.S. College of Law", address: "Bull Temple Road, Basavanagudi, Bengaluru-560 019" },
  { name: "JSS Law College", address: "New Kantharaj Urs Road, Kuvempunagar, Mysore-570 023" },
  { name: "Government Arts and Science College", address: "Kajubag, Uttara Kannada, Karwar – 581301" }
];

const insertUgcColleges = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Inserting UGC Autonomous Colleges...');

    let newCount = 0;
    
    for (const college of autonomousColleges) {
      const slug = createSlug(college.name);
      const existing = await College.findOne({ slug });

      if (!existing) {
        // Determine district from address
        let district = 'Bangalore Urban';
        const addressLower = college.address.toLowerCase();
        if (addressLower.includes('chitradurga')) district = 'Chitradurga';
        if (addressLower.includes('harihar') || addressLower.includes('davanagere')) district = 'Davanagere';
        if (addressLower.includes('hubli') || addressLower.includes('dharwad')) district = 'Dharwad';
        if (addressLower.includes('kalaburagi') || addressLower.includes('gulbarga')) district = 'Kalaburagi';
        if (addressLower.includes('mysore') || addressLower.includes('mysuru')) district = 'Mysuru';
        if (addressLower.includes('karwar') || addressLower.includes('uttara kannada')) district = 'Uttara Kannada';

        const generatedId = `UGC-AUTO-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        await College.create({
          collegeId: generatedId,
          source: 'ugc',
          sourceId: generatedId,
          name: college.name,
          categories: ['Degree'],
          subCategory: 'Degree',
          district: district,
          state: 'Karnataka',
          city: district,
          address: college.address,
          establishedYear: 2000,
          ownership: 'Private',
          accreditation: 'UGC Autonomous',
          latitude: 12.9716,
          longitude: 77.5946,
          active: true,
          facilities: ['Library', 'Labs', 'Hostel', 'Sports']
        });
        newCount++;
        console.log(`Inserted: ${college.name}`);
      } else {
        // Update existing to mark as autonomous
        await College.updateOne(
          { _id: existing._id },
          { $addToSet: { accreditation: 'UGC Autonomous' } }
        );
        console.log(`Updated existing: ${college.name}`);
      }
    }

    console.log(`\nOperation completed! Inserted ${newCount} new autonomous colleges.`);
    process.exit(0);
  } catch (error) {
    console.error('Error inserting UGC colleges:', error);
    process.exit(1);
  }
};

insertUgcColleges();
