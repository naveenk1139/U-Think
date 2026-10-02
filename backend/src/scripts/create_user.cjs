const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/uthink').then(async () => {
  const db = mongoose.connection.db;
  const email = 'naveenk11398@gmail.com';
  const user = await db.collection('users').findOne({email});
  
  if(user) {
    const hashed = await bcrypt.hash('Password123!', 10);
    await db.collection('users').updateOne({_id: user._id}, {$set: {password: hashed}});
    console.log('Updated password for existing user to: Password123!');
  } else {
    const hashed = await bcrypt.hash('Password123!', 10);
    await db.collection('users').insertOne({
      email, 
      password: hashed, 
      name: 'Naveen K', 
      role: 'user', 
      createdAt: new Date(), 
      updatedAt: new Date()
    });
    console.log('Created new user with password: Password123!');
  }
  process.exit(0);
});
