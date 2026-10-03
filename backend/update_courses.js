
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/uthink').then(async () => {
  const db = mongoose.connection.db;
  const setObj = { duration: '2 Years', eligibility: '10th Pass with Science & Math' };
  await db.collection('courses').updateMany({ stream: 'puc-science', duration: null }, { $set: setObj });
  console.log('Updated science combinations!');
  process.exit(0);
});

