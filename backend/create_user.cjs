const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://localhost:27017/uthink';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  isEmailVerified: { type: Boolean, default: true },
}, { timestamps: true });

// Prevent overwrite model error
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'naveenk11398@gmail.com';
    const rawPassword = 'nk113&*R';
    
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists, updating password...');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(rawPassword, salt);
      user.isEmailVerified = true;
      user.failedLoginAttempts = 0;
      user.lockUntil = undefined;
      await user.save();
      console.log('Password updated.');
    } else {
      console.log('User does not exist, creating...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(rawPassword, salt);
      
      user = new User({
        name: 'Naveen K',
        email,
        password: hashedPassword,
        isEmailVerified: true
      });
      await user.save();
      console.log('User created successfully.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

createUser();
