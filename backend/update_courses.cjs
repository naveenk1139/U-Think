
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/uthink').then(async () => {
  const db = mongoose.connection.db;
  
  // Update Commerce
  await db.collection('courses').updateMany({ stream: 'puc-commerce', duration: null }, { $set: { duration: '2 Years', eligibility: '10th Pass' } });
  
  // Update Arts
  await db.collection('courses').updateMany({ stream: 'puc-arts', duration: null }, { $set: { duration: '2 Years', eligibility: '10th Pass' } });

  console.log('Updated Commerce and Arts combinations!');
  process.exit(0);
});

