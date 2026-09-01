import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import College from '../models/College.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const aisheColleges = [
  { name: "AACHARYA FIRST GRADE COLLEGE", district: "Hassan", universityAffiliation: "Hassan University", type: "Affiliated College" },
  { name: "Aadarsha Chitrakala Mahavidyalaya, Indi", district: "Vijayapura", universityAffiliation: "Kannada University, Hampi, Kamalapura", type: "Recognized Center" },
  { name: "AADYA AVIATION COLLEGE", district: "Bengaluru Urban", universityAffiliation: "BENGALURU NORTH UNIVERSITY", type: "Affiliated College" },
  { name: "AADYA COLLEGE OF PHARMACY", district: "Chitradurga", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "AAFFINITY COLLEGE OF NURSING", district: "Bengaluru South", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "AALIYAH COLLEGE OF NURSING", district: "Dakshina Kannada", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Abbas Khan College for Women,Durga Complex, OTC Road, Cubban Pet, Bangalore-560 002.", district: "Bengaluru Urban", universityAffiliation: "BENGALURU CITY UNIVERSITY", type: "Affiliated College" },
  { name: "ABBS SCHOOL OF LAW", district: "Bengaluru Urban", universityAffiliation: "Karnataka State Law University, Hubli", type: "Affiliated College" },
  { name: "ABDUS SALAM MEMORIAL DEGREE COLLEGE", district: "Ballari", universityAffiliation: "Vijayanagara Sri Krishnadevaraya University, Bellary", type: "Affiliated College" },
  { name: "Abhaya College of Nursing", district: "Bengaluru Urban", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Abhaya Group of Institution", district: "Bengaluru Urban", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "ABHINAVA BHARATHI COLLEGE OF PHARMACY", district: "Mandya", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "ABHYUDAYA SCIENCE AND COMMERCE DEGREE COLLEGE MUDDEBIHAL", district: "Vijayapura", universityAffiliation: "Rani Channamma University, Belagavi", type: "Affiliated College" },
  { name: "A.B.S.M. INSTITUTE OF DENTAL SCIENCES", district: "Dakshina Kannada", universityAffiliation: "NITTE Unversity, Mangalore", type: "Constituent / University College" },
  { name: "Acharya B M Reddy College of Pharmacy", district: "Bengaluru Urban", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Acharya College of Imaging Technology, Bangalore", district: "Bengaluru Urban", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Acharya College of MHA", district: "Bengaluru Urban", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Acharya College of MLT", district: "Bengaluru Urban", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Acharya College of Nursing", district: "Bengaluru Urban", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Acharya Deshbhushan Ayurvedic Medical College", district: "Belagavi", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Acharya Institute of Management and Science, Ist Stage, Peenya Industrial Estate, Bangalore-58", district: "Bengaluru Urban", universityAffiliation: "Bangalore University, Bangalore", type: "Affiliated College" },
  { name: "Acharya Institute of Physiotherapy", district: "Bengaluru Urban", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Acharya Institute of Technology, BANGALORE", district: "Bengaluru Urban", universityAffiliation: "Visvesvaraya Technological University, Belagavi", type: "Affiliated College" },
  { name: "Acharya Inst. of Health Sciences", district: "Bengaluru Urban", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Acharya Patashala College of Arts and Science, N.R. colony, Bangalore-19", district: "Bengaluru Urban", universityAffiliation: "BENGALURU CITY UNIVERSITY", type: "Affiliated College" },
  { name: "Acharya Patashala Evening College. N.R. Colony, Bangalore-19", district: "Bengaluru Urban", universityAffiliation: "BENGALURU CITY UNIVERSITY", type: "Affiliated College" },
  { name: "ACHARYA PATHASALA COLLEGE OF COMMERCE", district: "Bengaluru Urban", universityAffiliation: "BENGALURU CITY UNIVERSITY", type: "Affiliated College" },
  { name: "Acharyas Bangalore B School, No.3, Lingadeeranahalli, Bangalore -91 (Acharya Institute of Science, No.01, Chola Nagar, R.T. Nagar post, Bangalore-32)", district: "Bengaluru Urban", universityAffiliation: "Bangalore University, Bangalore", type: "Affiliated College" },
  { name: "Acharya School of Design", district: "Bengaluru Urban", universityAffiliation: "BENGALURU CITY UNIVERSITY", type: "Affiliated College" },
  { name: "ACHARYA SCHOOL OF LAW", district: "Bengaluru Rural", universityAffiliation: "Karnataka State Law University, Hubli", type: "Affiliated College" },
  { name: "Acharya Shri Gunadhara Nandi Maharajar Arts and Commerce College Navagraha Teerth Kshetra Varur", district: "Dharwad", universityAffiliation: "Karnataka University, Dharwad", type: "Affiliated College" },
  { name: "ACHARYA'S NR INSTITUTE OF PHYSIOTHERAPY", district: "Bengaluru Urban", universityAffiliation: "Rajiv Gandhi University of Health Sciences, Bangalore", type: "Affiliated College" },
  { name: "Acharya's NRV School of Architecture, BANGALORE", district: "Bengaluru Urban", universityAffiliation: "Visvesvaraya Technological University, Belagavi", type: "Affiliated College" }
];

const insertAisheColleges = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Inserting AISHE Colleges...');

    let newCount = 0;
    
    for (const college of aisheColleges) {
      const existing = await College.findOne({ name: college.name });

      if (!existing) {
        const generatedId = `AISHE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        let district = college.district;
        if (district === 'Bengaluru Urban' || district === 'Bengaluru South') {
            district = 'Bangalore Urban';
        }
        if (district === 'Bengaluru Rural') {
            district = 'Bangalore Rural';
        }
        
        await College.create({
          collegeId: generatedId,
          source: 'aishe',
          sourceId: generatedId,
          name: college.name,
          categories: ['Degree'],
          subCategory: 'Degree',
          district: district,
          state: 'Karnataka',
          city: district,
          establishedYear: 2000,
          ownership: 'Private',
          institutionType: college.type,
          universityAffiliation: college.universityAffiliation,
          latitude: 12.9716,
          longitude: 77.5946,
          active: true,
          facilities: ['Library', 'Labs']
        });
        newCount++;
        console.log(`Inserted: ${college.name}`);
      } else {
        console.log(`Skipped existing: ${college.name}`);
      }
    }

    console.log(`\nOperation completed! Inserted ${newCount} new AISHE colleges.`);
    process.exit(0);
  } catch (error) {
    console.error('Error inserting AISHE colleges:', error);
    process.exit(1);
  }
};

insertAisheColleges();
