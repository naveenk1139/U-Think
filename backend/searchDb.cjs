const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/u-think').then(async () => {
  const db = mongoose.connection.db;
  const cols = await db.collection('colleges').find({
    $or: [
      {sourceId: {$regex: 'dc2034b4'}},
      {slug: {$regex: 'dc2034b4'}},
      {_id: 'dc2034b4-0e2c-48de-8f90-98951f4ff2a2'}
    ]
  }).toArray();
  console.log(cols);
  
  const allIds = await db.collection('colleges').find({}, { projection: { _id: 1, slug: 1, sourceId: 1 } }).toArray();
  console.log('Total Colleges:', allIds.length);
  // print first 5 UUIDs if they exist in sourceId
  const uuids = allIds.filter(c => c.sourceId && c.sourceId.length > 30);
  console.log('Colleges with UUIDs in sourceId:', uuids);
  
  mongoose.disconnect();
});
