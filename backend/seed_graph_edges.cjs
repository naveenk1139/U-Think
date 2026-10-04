const mongoose = require('mongoose');

async function seedGraph() {
  await mongoose.connect('mongodb://127.0.0.1:27017/uthink');
  const EducationPathRelation = mongoose.connection.collection('educationpathrelations');
  const Career = mongoose.connection.collection('careers');
  const Degree = mongoose.connection.collection('degrees');
  const Pathway = mongoose.connection.collection('pathways');
  const Stream = mongoose.connection.collection('streams');
  const Course = mongoose.connection.collection('courses');
  const Exam = mongoose.connection.collection('exams');

  // Find Software Engineering Career
  const career = await Career.findOne({ slug: 'software-engineering' });
  if (!career) {
    console.log('Career not found');
    process.exit(1);
  }

  // Find B.Tech CSE Degree
  let btech = await Degree.findOne({ slug: 'btech-computer-science-engineering' });
  if (!btech) {
      console.log('BTech CSE not found');
      // Create it if missing for some reason
  }

  const edges = [];

  if (btech) {
      edges.push({
          sourceType: 'Degree',
          sourceId: btech._id,
          targetType: 'Career',
          targetId: career._id,
          relationType: 'LEADS_TO',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
      });
  }

  // Create a Science Pathway if missing
  let sciencePath = await Pathway.findOne({ slug: 'science' });
  if (!sciencePath) {
      const res = await Pathway.insertOne({ name: 'Science', slug: 'science', createdAt: new Date(), updatedAt: new Date() });
      sciencePath = { _id: res.insertedId };
  }

  // Create a PCMC Stream if missing
  let pcmc = await Stream.findOne({ slug: 'pcmc' });
  if (!pcmc) {
      const res = await Stream.insertOne({ name: 'PCMC (Physics, Chem, Math, Computer)', slug: 'pcmc', createdAt: new Date(), updatedAt: new Date() });
      pcmc = { _id: res.insertedId };
  }

  // Create a JEE Exam if missing
  let jee = await Exam.findOne({ slug: 'jee-mains' });
  if (!jee) {
      const res = await Exam.insertOne({ name: 'JEE Mains', slug: 'jee-mains', examLevel: 'UG', createdAt: new Date(), updatedAt: new Date() });
      jee = { _id: res.insertedId };
  }

  // Create Programming Skills if missing
  let prog = await Course.findOne({ slug: 'programming-skills' });
  if (!prog) {
      const res = await Course.insertOne({ name: 'Programming Skills', slug: 'programming-skills', category: 'Skill', createdAt: new Date(), updatedAt: new Date() });
      prog = { _id: res.insertedId };
  }

  // Add more edges
  edges.push({
      sourceType: 'Stream',
      sourceId: pcmc._id,
      targetType: 'Pathway',
      targetId: sciencePath._id,
      relationType: 'BELONGS_TO',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
  });

  if (btech) {
      edges.push({
          sourceType: 'Pathway',
          sourceId: sciencePath._id,
          targetType: 'Degree',
          targetId: btech._id,
          relationType: 'LEADS_TO',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
      });

      edges.push({
          sourceType: 'Exam',
          sourceId: jee._id,
          targetType: 'Degree',
          targetId: btech._id,
          relationType: 'REQUIRES',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
      });
      
      edges.push({
          sourceType: 'Course',
          sourceId: prog._id,
          targetType: 'Degree',
          targetId: btech._id,
          relationType: 'ENABLES',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
      });
  }

  // Add edges downstream of Career just for show
  let jobRole = await Career.findOne({ slug: 'senior-software-engineer' });
  if (!jobRole) {
      const res = await Career.insertOne({ name: 'Senior Software Engineer', slug: 'senior-software-engineer', industry: 'IT & Technology', createdAt: new Date(), updatedAt: new Date() });
      jobRole = { _id: res.insertedId };
  }

  edges.push({
      sourceType: 'Career',
      sourceId: career._id,
      targetType: 'Career',
      targetId: jobRole._id,
      relationType: 'LEADS_TO',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
  });

  await EducationPathRelation.insertMany(edges);
  console.log(`Inserted ${edges.length} edges successfully!`);
  process.exit(0);
}

seedGraph().catch(console.error);
