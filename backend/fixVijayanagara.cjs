
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/uthink').then(async () => {
  const db = mongoose.connection.db;
  
  const vijayanagaraKeywords = [
    'hosapete', 'hospet', 'kotturu', 'kudligi', 'hagaribommanahalli', 
    'harapanahalli', 'hoovina hadagali', 'hadagali'
  ];
  
  // Find colleges in Ballari or Davanagere that belong to Vijayanagara
  const regex = new RegExp(vijayanagaraKeywords.join('|'), 'i');
  
  const res = await db.collection('colleges').updateMany(
    { 
      district: { $in: ['Ballari', 'Davanagere'] },
      $or: [
        { name: regex },
        { address: regex },
        { city: regex }
      ]
    },
    { $set: { district: 'Vijayanagara' } }
  );
  
  console.log('Updated ' + res.modifiedCount + ' colleges to Vijayanagara');
  process.exit(0);
});
