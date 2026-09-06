
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/uthink').then(async () => {
  const db = mongoose.connection.db;
  
  const updates = [
    { old: 'Bellary', new: 'Ballari' },
    { old: 'Tumkur', new: 'Tumakuru' },
    { old: 'Shimoga', new: 'Shivamogga' },
    { old: 'Chikmagalur', new: 'Chikkamagaluru' },
    { old: 'Bangalore Rural', new: 'Bengaluru Rural' },
    { old: 'Chikkaballapura', new: 'Chikkaballapur' },
    { old: 'Bengaluru', new: 'Bengaluru Urban' },
    { old: 'Gulbarga', new: 'Kalaburagi' },
    { old: 'Mysore', new: 'Mysuru' },
    { old: 'Belgaum', new: 'Belagavi' },
    { old: 'Bijapur', new: 'Vijayapura' },
    { old: 'Karwar', new: 'Uttara Kannada' }
  ];

  for (const map of updates) {
    const res = await db.collection('colleges').updateMany(
      { district: map.old },
      { $set: { district: map.new } }
    );
    console.log('Updated ' + res.modifiedCount + ' colleges from ' + map.old + ' to ' + map.new);
  }
  
  process.exit(0);
});
