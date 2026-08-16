import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  photoURL?: string;
  bio?: string;
  streamPreference?: string;
  role: 'student' | 'employer' | 'admin' | 'college';
  lastLogin: Date;
  isEmailVerified: boolean;
  failedLoginAttempts: number;
  lockUntil?: Date;
  
  // New profile fields
  mobile?: string;
  dateOfBirth?: Date;
  gender?: string;
  location?: string;
  state?: string;
  city?: string;
  educationLevel?: string;
  classOrYear?: string;
  stream?: string;
  collegeOrSchool?: string;
  careerGoal?: string;
  careerAspiration?: string;
  targetExam?: string;
  interests?: string[];
  skills?: string[];
  preferredCareer?: string[];
  preferredCourse?: string[];
  preferredLocation?: string[];
  profileCompletion?: number;

  matchPassword(enteredPassword: string): Promise<boolean>;
  isLocked(): boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    photoURL: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    streamPreference: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['student', 'employer', 'admin', 'college'],
      default: 'student',
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
    // New Profile Fields
    mobile: { type: String, default: '' },
    dateOfBirth: { type: Date },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    state: { type: String, default: '' },
    city: { type: String, default: '' },
    educationLevel: { type: String, default: '' },
    classOrYear: { type: String, default: '' },
    stream: { type: String, default: '' },
    collegeOrSchool: { type: String, default: '' },
    careerGoal: { type: String, default: '' },
    careerAspiration: { type: String, default: '' },
    targetExam: { type: String, default: '' },
    interests: [{ type: String }],
    skills: [{ type: String }],
    preferredCareer: [{ type: String }],
    preferredCourse: [{ type: String }],
    preferredLocation: [{ type: String }],
    profileCompletion: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Calculate Profile Completion
  let completedFields = 0;
  const totalFields = 14;

  if (this.name && this.name.trim() !== '') completedFields++;
  if (this.photoURL && this.photoURL.trim() !== '') completedFields++;
  if (this.isEmailVerified) completedFields++;
  if (this.mobile && this.mobile.trim() !== '') completedFields++;
  if (this.dateOfBirth) completedFields++;
  if (this.gender && this.gender.trim() !== '') completedFields++;
  if ((this.location && this.location.trim() !== '') || (this.city && this.city.trim() !== '')) completedFields++;
  if (this.educationLevel && this.educationLevel.trim() !== '') completedFields++;
  if (this.stream && this.stream.trim() !== '') completedFields++;
  if (this.collegeOrSchool && this.collegeOrSchool.trim() !== '') completedFields++;
  if (this.careerGoal && this.careerGoal.trim() !== '') completedFields++;
  if (this.targetExam && this.targetExam.trim() !== '') completedFields++;
  if (this.interests && this.interests.length > 0) completedFields++;
  if (this.skills && this.skills.length > 0) completedFields++;

  // Assign calculated completion
  this.profileCompletion = Math.round((completedFields / totalFields) * 100);

  next();
});

// Match entered user password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if account is locked
UserSchema.methods.isLocked = function (): boolean {
  return !!(this.lockUntil && this.lockUntil.getTime() > Date.now());
};

// Omit password from JSON serialization
UserSchema.set('toJSON', {
  transform: (_doc, ret: Record<string, any>) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
