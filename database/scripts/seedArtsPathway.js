const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../backend/.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

async function seedDatabase() {
  console.log(`\n======================================================`);
  console.log(`🍃 Seeding Arts / Humanities Pathway Data`);
  console.log(`======================================================`);

  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'uthink' });
    console.log(`✅ Connected to MongoDB.`);

    // Access raw collections directly if models aren't loaded in this standalone script
    const db = mongoose.connection.db;

    // 1. Clear existing mocked pathways data
    console.log(`🗑️ Clearing old mock pathways data...`);
    await db.collection('educationlevels').deleteMany({});
    await db.collection('pathways').deleteMany({});
    await db.collection('streams').deleteMany({});
    await db.collection('subjectcombinations').deleteMany({});
    await db.collection('subjects').deleteMany({});
    await db.collection('courses').deleteMany({});
    await db.collection('branches').deleteMany({});
    await db.collection('careers').deleteMany({});

    // 2. Insert Education Levels
    console.log(`🌱 Inserting Education Levels...`);
    const after10thId = new mongoose.Types.ObjectId();
    const after12thId = new mongoose.Types.ObjectId();
    const degreeId = new mongoose.Types.ObjectId();
    const pgId = new mongoose.Types.ObjectId();

    await db.collection('educationlevels').insertMany([
      { _id: after10thId, name: 'After 10th', slug: 'after-10th', active: true, order: 1, createdAt: new Date(), updatedAt: new Date() },
      { _id: after12thId, name: 'After 12th', slug: 'after-12th', active: true, order: 2, createdAt: new Date(), updatedAt: new Date() },
      { _id: degreeId, name: 'Degree', slug: 'degree', active: true, order: 3, createdAt: new Date(), updatedAt: new Date() },
      { _id: pgId, name: 'Postgraduate', slug: 'postgraduate', active: true, order: 4, createdAt: new Date(), updatedAt: new Date() }
    ]);

    // 3. Insert Pathways for After 10th
    const pucId = new mongoose.Types.ObjectId();
    await db.collection('pathways').insertMany([
      { _id: pucId, educationLevelId: after10thId, name: 'PUC / 11th–12th', slug: 'puc', duration: '2 Years', active: true, order: 1, createdAt: new Date(), updatedAt: new Date() },
      { _id: new mongoose.Types.ObjectId(), educationLevelId: after10thId, name: 'Diploma', slug: 'diploma', duration: '3 Years', active: true, order: 2, createdAt: new Date(), updatedAt: new Date() },
      { _id: new mongoose.Types.ObjectId(), educationLevelId: after10thId, name: 'ITI', slug: 'iti', duration: '2 Years', active: true, order: 3, createdAt: new Date(), updatedAt: new Date() },
      { _id: new mongoose.Types.ObjectId(), educationLevelId: after10thId, name: 'Paramedical', slug: 'paramedical', duration: '2 Years', active: true, order: 4, createdAt: new Date(), updatedAt: new Date() },
      { _id: new mongoose.Types.ObjectId(), educationLevelId: after10thId, name: 'Vocational', slug: 'vocational', duration: '2 Years', active: true, order: 5, createdAt: new Date(), updatedAt: new Date() },
      { _id: new mongoose.Types.ObjectId(), educationLevelId: after10thId, name: 'Apprenticeship', slug: 'apprenticeship', duration: 'Varies', active: true, order: 6, createdAt: new Date(), updatedAt: new Date() },
      { _id: new mongoose.Types.ObjectId(), educationLevelId: after10thId, name: 'Other recognised pathways', slug: 'others', duration: 'Varies', active: true, order: 7, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // 4. Insert Arts Stream under PUC
    const artsStreamId = new mongoose.Types.ObjectId();
    await db.collection('streams').insertMany([
      { _id: artsStreamId, pathwayId: pucId, name: 'Arts / Humanities', slug: 'arts', description: 'Explore subject combinations, courses, careers and higher-study opportunities available through Arts and Humanities.', active: true, order: 1, createdAt: new Date(), updatedAt: new Date() }
    ]);

    // 5. Insert Subjects
    const subjectMap = {};
    const subjectNames = ['History', 'Economics', 'Political Science', 'Sociology', 'Languages', 'Mathematics / Statistics', 'Psychology', 'Geography', 'Journalism', 'Mass Communication', 'English / Languages', 'English', 'Kannada', 'Hindi', 'Sanskrit', 'Urdu', 'Other approved languages'];
    const subjectsToInsert = subjectNames.map(name => {
      const id = new mongoose.Types.ObjectId();
      subjectMap[name] = id;
      return { _id: id, name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), active: true, createdAt: new Date(), updatedAt: new Date() };
    });
    await db.collection('subjects').insertMany(subjectsToInsert);

    // 6. Insert Subject Combinations
    const combinations = [
      { name: 'HEPS', slug: 'heps', subs: ['History', 'Economics', 'Political Science', 'Sociology'] },
      { name: 'HESP', slug: 'hesp', subs: ['History', 'Economics', 'Sociology', 'Political Science'] },
      { name: 'HEPS + Language Options', slug: 'heps-language', subs: ['History', 'Economics', 'Political Science', 'Sociology', 'Languages'] },
      { name: 'History-oriented', slug: 'history-oriented', subs: ['History', 'Political Science', 'Sociology', 'Economics', 'Geography'] },
      { name: 'Economics-oriented', slug: 'economics-oriented', subs: ['Economics', 'Mathematics / Statistics', 'Political Science', 'History', 'Sociology'] },
      { name: 'Political Science-oriented', slug: 'political-science-oriented', subs: ['Political Science', 'History', 'Economics', 'Sociology', 'Geography'] },
      { name: 'Sociology-oriented', slug: 'sociology-oriented', subs: ['Sociology', 'History', 'Political Science', 'Psychology', 'Economics'] },
      { name: 'Psychology-oriented', slug: 'psychology-oriented', subs: ['Psychology', 'Sociology', 'Political Science', 'History', 'Economics'] },
      { name: 'Geography-oriented', slug: 'geography-oriented', subs: ['Geography', 'History', 'Economics', 'Political Science', 'Sociology'] },
      { name: 'Journalism / Media-oriented', slug: 'journalism-oriented', subs: ['Journalism', 'Mass Communication', 'English / Languages', 'Political Science', 'Sociology'] },
      { name: 'Languages', slug: 'languages', subs: ['English', 'Kannada', 'Hindi', 'Sanskrit', 'Urdu', 'Other approved languages'] },
      { name: 'Other recognised combinations', slug: 'other-combinations', subs: ['History', 'Economics', 'Political Science', 'Sociology', 'Psychology', 'Geography'] }, // Approximation for 'History + Economics', etc.
    ];

    const comboIdMap = {};
    const combosToInsert = combinations.map((c, idx) => {
      const id = new mongoose.Types.ObjectId();
      comboIdMap[c.slug] = id;
      return {
        _id: id,
        streamId: artsStreamId,
        name: c.name,
        slug: c.slug,
        subjects: c.subs.map(s => subjectMap[s]),
        eligibility: 'Passed 10th / SSLC or equivalent',
        active: true,
        order: idx + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });
    await db.collection('subjectcombinations').insertMany(combosToInsert);

    // 7. Insert UG Courses (e.g., B.A.) and Branches
    const baCourseId = new mongoose.Types.ObjectId();
    await db.collection('courses').insertOne({
      _id: baCourseId,
      name: 'B.A.',
      slug: 'ba',
      courseLevel: 'UG',
      duration: '3 or 4 years depending on the applicable university/program structure.',
      eligibility: 'Passed 10+2 / PUC with relevant Arts subjects.',
      eligibleCombinations: Object.values(comboIdMap), // Eligible from all Arts combos
      active: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const baBranches = [
      { name: 'B.A. History', slug: 'ba-history' },
      { name: 'B.A. Economics', slug: 'ba-economics' },
      { name: 'B.A. Political Science', slug: 'ba-political-science' },
      { name: 'B.A. Sociology', slug: 'ba-sociology' },
      { name: 'B.A. Psychology', slug: 'ba-psychology' },
      { name: 'B.A. Geography', slug: 'ba-geography' },
      { name: 'B.A. Journalism', slug: 'ba-journalism' },
      { name: 'B.A. Mass Communication', slug: 'ba-mass-communication' },
      { name: 'B.A. English', slug: 'ba-english' },
      { name: 'B.A. Kannada', slug: 'ba-kannada' },
      { name: 'B.A. Public Administration', slug: 'ba-public-administration' },
      { name: 'B.A. Social Work', slug: 'ba-social-work' },
      { name: 'B.A. Anthropology', slug: 'ba-anthropology' },
      { name: 'B.A. Archaeology', slug: 'ba-archaeology' },
      { name: 'B.A. Languages', slug: 'ba-languages' }
    ];

    const branchesToInsert = [];
    const careersToInsert = [];
    
    // Some mock careers mapped to these branches
    let careerCounter = 1;
    
    baBranches.forEach((b, idx) => {
      const branchId = new mongoose.Types.ObjectId();
      const careerId1 = new mongoose.Types.ObjectId();
      const careerId2 = new mongoose.Types.ObjectId();
      
      careersToInsert.push({
         _id: careerId1,
         name: `${b.name.replace('B.A. ', '')} Specialist`,
         slug: `career-${careerCounter++}`,
         active: true,
         createdAt: new Date(),
         updatedAt: new Date()
      });
      careersToInsert.push({
         _id: careerId2,
         name: `${b.name.replace('B.A. ', '')} Educator`,
         slug: `career-${careerCounter++}`,
         active: true,
         createdAt: new Date(),
         updatedAt: new Date()
      });

      branchesToInsert.push({
        _id: branchId,
        courseId: baCourseId,
        name: b.name,
        slug: b.slug,
        description: `Undergraduate degree in ${b.name.replace('B.A. ', '')}.`,
        relatedCareers: [careerId1, careerId2],
        higherStudies: [], // would map to M.A.
        active: true,
        order: idx + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    await db.collection('careers').insertMany(careersToInsert);
    await db.collection('branches').insertMany(branchesToInsert);

    console.log(`✅ Successfully seeded Arts / Humanities Pathways!`);
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();
