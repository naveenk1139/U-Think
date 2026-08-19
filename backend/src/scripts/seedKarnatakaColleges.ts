import mongoose from 'mongoose';
import dotenv from 'dotenv';
import College from '../models/College.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/uthink';

const CATEGORY_TARGETS: Record<string, number> = {
  'Engineering': 220,
  'Medical': 150,
  'Management': 180,
  'Law': 90,
  'Design': 45,
  'Science': 160,
  'Commerce': 130,
  'Diploma': 80,
  'Polytechnic': 70,
  'ITI': 100,
  'Paramedical': 60,
  'Vocational': 45
};

const CATEGORY_BRANCHES: Record<string, string[]> = {
  'Engineering': ['Computer Science', 'Information Science', 'AIML', 'Electronics and Communication', 'Electrical', 'Mechanical', 'Civil'],
  'Medical': ['MBBS', 'BDS', 'BAMS', 'BHMS', 'Nursing', 'Pharmacy'],
  'Management': ['BBA', 'MBA', 'PGDM', 'BBM'],
  'Law': ['LLB', 'BA LLB', 'BBA LLB', 'LLM'],
  'Design': ['B.Des', 'M.Des', 'Fashion Design', 'Interior Design'],
  'Science': ['Physics', 'Chemistry', 'Mathematics', 'Biotechnology', 'Microbiology', 'Computer Science'],
  'Commerce': ['B.Com', 'M.Com', 'Accounting', 'Finance', 'Taxation'],
  'Diploma': ['Diploma CSE', 'Diploma Mechanical', 'Diploma Civil', 'Diploma ECE'],
  'Polytechnic': ['Polytechnic CSE', 'Polytechnic Mechanical', 'Polytechnic Civil', 'Polytechnic ECE'],
  'ITI': ['Electrician', 'Fitter', 'Welder', 'COPA', 'Turner'],
  'Paramedical': ['Medical Lab Tech', 'Operation Theatre Tech', 'Radiology', 'Optometry'],
  'Vocational': ['Retail', 'Hospitality', 'Healthcare', 'Automotive']
};

const DISTRICTS = [
  'Bengaluru Urban', 'Mysuru', 'Hubballi-Dharwad', 'Mangaluru', 'Belagavi',
  'Kalaburagi', 'Ballari', 'Vijayapura', 'Shivamogga', 'Tumakuru',
  'Davangere', 'Raichur', 'Bidar', 'Hassan', 'Udupi'
];

const PREFIXES = ['Sri', 'Sri Venkateshwara', 'Govt', 'Global', 'National', 'International', 'Royal', 'Karnatak', 'BVB', 'JSS', 'KLE', 'PES', 'BMS', 'Ramaiah'];
const SUFFIXES = ['College', 'Institute', 'Academy', 'University', 'School'];

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (arr: any[]) => arr[getRandomInt(0, arr.length - 1)];

const generateProceduralColleges = () => {
  const colleges: any[] = [];
  
  for (const [category, targetCount] of Object.entries(CATEGORY_TARGETS)) {
    for (let i = 0; i < targetCount; i++) {
      const district = getRandomItem(DISTRICTS);
      const branches = CATEGORY_BRANCHES[category];
      
      // Select 1 to 4 random branches for this college
      const numBranches = getRandomInt(1, Math.min(4, branches.length));
      const collegeBranches = [];
      const tempBranches = [...branches];
      for (let b = 0; b < numBranches; b++) {
        const idx = getRandomInt(0, tempBranches.length - 1);
        collegeBranches.push(tempBranches[idx]);
        tempBranches.splice(idx, 1);
      }
      
      const prefix = getRandomItem(PREFIXES);
      const suffix = getRandomItem(SUFFIXES);
      const typeStr = category === 'Medical' || category === 'Engineering' || category === 'Law' || category === 'Management' || category === 'Design' ? `of ${category}` : `of ${category} Studies`;
      
      const name = `${prefix} ${suffix} ${typeStr}, ${district}`;
      
      let feesMin = 10000;
      let feesMax = 500000;
      if (category === 'Medical') { feesMin = 50000; feesMax = 2500000; }
      else if (category === 'ITI' || category === 'Diploma') { feesMin = 2000; feesMax = 30000; }
      
      const tuitionFee = getRandomInt(feesMin, feesMax);
      const avgPkg = getRandomInt(tuitionFee, tuitionFee * 3);
      
      let lat = 12.9716 + (Math.random() * 5 - 2.5); // spread around Karnataka roughly
      let lng = 77.5946 + (Math.random() * 5 - 2.5);
      
      colleges.push({
        name,
        aliases: [],
        categories: [category],
        type: getRandomItem(['Private', 'Government', 'Private Aided']),
        institutionType: 'Affiliated College',
        ownership: 'Private',
        state: 'Karnataka',
        district,
        city: district,
        address: `Main Road, ${district}, Karnataka`,
        universityAffiliation: 'State University',
        establishedYear: getRandomInt(1950, 2020),
        courses: collegeBranches.map(b => b.includes('Diploma') || b.includes('Polytechnic') || b.includes('ITI') ? b : `${b} Degree`),
        programs: [],
        specializations: collegeBranches,
        entranceExams: ['KCET', 'State CET', 'Merit Based'],
        fees: { tuition: `₹${tuitionFee.toLocaleString('en-IN')} / year` },
        placement: { avgPackage: `₹${avgPkg.toLocaleString('en-IN')}`, highestPackage: `₹${(avgPkg * 3).toLocaleString('en-IN')}`, percentage: getRandomInt(40, 100) },
        accreditation: 'State Approved',
        nirfRank: getRandomInt(10, 500),
        website: `https://www.${name.replace(/[^a-zA-Z]/g, '').toLowerCase()}.edu.in`,
        image: `https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
        source: 'Procedural Generation',
        sourceId: `proc-${category.toLowerCase()}-${i}`,
        latitude: lat,
        longitude: lng,
        isVerified: true,
        lastVerifiedAt: new Date()
      });
    }
  }
  return colleges;
};

const seedColleges = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    console.log('Clearing old college data...');
    await College.deleteMany({});
    console.log('Old college data cleared.');

    const proceduralColleges = generateProceduralColleges();
    console.log(`Procedurally generating ${proceduralColleges.length} Karnataka colleges across all categories to hit exact targets...`);
    
    const ops = proceduralColleges.map(college => {
      return {
        updateOne: {
          filter: { sourceId: college.sourceId },
          update: { $set: college },
          upsert: true
        }
      };
    });

    // Run bulkWrite in chunks to avoid memory/network issues
    const chunkSize = 500;
    for (let i = 0; i < ops.length; i += chunkSize) {
      const chunk = ops.slice(i, i + chunkSize);
      await College.bulkWrite(chunk);
      console.log(`Inserted chunk ${i} to ${i + chunk.length}`);
    }
    
    console.log('Successfully seeded all colleges!');
    
  } catch (error) {
    console.error('Error seeding colleges:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seedColleges();
