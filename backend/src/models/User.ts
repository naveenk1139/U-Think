import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAcademicSubject {
  subjectName: string;
  marksObtained: number | null;
  maximumMarks: number | null;
  grade: string | null;
}

export interface IAcademicProfile {
  tenthPercentage?: number;
  twelfthPercentage?: number;
  diplomaPercentage?: number;
  subjects?: IAcademicSubject[];
  lastUpdated?: Date;
  source?: string;
}

export interface IStructuredSkill {
  skillName: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface IStudentIntelligence {
  // Education Stage
  educationStage?: string; // 10th, 11th, 12th, Diploma, ITI, UG, PG, Working
  boardOrUniversity?: string;
  courseOrDegree?: string;
  branchOrSpecialization?: string;
  currentYear?: number;
  currentSemester?: number;

  // Academic Performance
  cgpa?: number;
  backlogs?: number;
  subjectStrengths?: string[];
  subjectWeaknesses?: string[];

  // Extracurricular
  structuredSkills?: IStructuredSkill[];
  projectCount?: number;
  internshipCount?: number;
  certificationCount?: number;
  hackathonsAttended?: number;
  
  // Preferences
  higherStudyGoal?: string;
  budgetRange?: string;
  institutionPreference?: 'Government' | 'Private' | 'Any';
  entranceExamInterest?: string[];
  learningPreferences?: string[];
  
  // Computed (from AI/Rule Engine)
  careerReadinessScore?: number;
  academicRiskLevel?: 'Low' | 'Medium' | 'High';
  opportunityReadiness?: number;
}

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
  profileVersion: number;
  recommendationVersion: number;
  
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
  profileUpdatedAt?: Date;
  academicProfile?: IAcademicProfile;
  intelligenceProfile?: IStudentIntelligence;
  preferredLanguage?: string;
  
  settings?: {
    notifications?: {
      examReminders?: boolean;
      scholarshipAlerts?: boolean;
      careerUpdates?: boolean;
      aiRecommendations?: boolean;
      channels?: {
        email?: boolean;
        sms?: boolean;
        inApp?: boolean;
      };
    };
    aiCounselor?: {
      enableGuidance?: boolean;
      personalization?: boolean;
      implicitLikes?: string[];
      implicitDislikes?: string[];
    };
    privacy?: {
      publicProfile?: boolean;
      showActiveStatus?: boolean;
    };
    careerDNA?: {
      coreStrengths?: string[];
      learningStyle?: string;
      recommendedSectors?: string[];
      personalityArchetype?: string;
      summary?: string;
    };
  };

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
    profileUpdatedAt: { type: Date, default: Date.now },
    profileVersion: { type: Number, default: 1 },
    recommendationVersion: { type: Number, default: 0 },
    academicProfile: {
      tenthPercentage: { type: Number },
      twelfthPercentage: { type: Number },
      diplomaPercentage: { type: Number },
      subjects: [{
        subjectName: { type: String },
        marksObtained: { type: Number },
        maximumMarks: { type: Number },
        grade: { type: String }
      }],
      lastUpdated: { type: Date },
      source: { type: String, default: 'MANUAL' }
    },
    intelligenceProfile: {
      educationStage: { type: String },
      boardOrUniversity: { type: String },
      courseOrDegree: { type: String },
      branchOrSpecialization: { type: String },
      currentYear: { type: Number },
      currentSemester: { type: Number },
      
      cgpa: { type: Number },
      backlogs: { type: Number, default: 0 },
      subjectStrengths: [{ type: String }],
      subjectWeaknesses: [{ type: String }],
      
      structuredSkills: [{
        skillName: { type: String },
        skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] }
      }],
      projectCount: { type: Number, default: 0 },
      internshipCount: { type: Number, default: 0 },
      certificationCount: { type: Number, default: 0 },
      hackathonsAttended: { type: Number, default: 0 },
      
      higherStudyGoal: { type: String },
      budgetRange: { type: String },
      institutionPreference: { type: String, enum: ['Government', 'Private', 'Any'], default: 'Any' },
      entranceExamInterest: [{ type: String }],
      learningPreferences: [{ type: String }],
      
      careerReadinessScore: { type: Number, min: 0, max: 100 },
      academicRiskLevel: { type: String, enum: ['Low', 'Medium', 'High'] },
      opportunityReadiness: { type: Number, min: 0, max: 100 }
    },
    preferredLanguage: { type: String, default: 'en' },
    settings: {
      notifications: {
        examReminders: { type: Boolean, default: true },
        scholarshipAlerts: { type: Boolean, default: true },
        careerUpdates: { type: Boolean, default: true },
        aiRecommendations: { type: Boolean, default: true },
        channels: {
          email: { type: Boolean, default: true },
          sms: { type: Boolean, default: false },
          inApp: { type: Boolean, default: true }
        }
      },
      aiCounselor: {
        enableGuidance: { type: Boolean, default: true },
        personalization: { type: Boolean, default: true },
        implicitLikes: [{ type: String }],
        implicitDislikes: [{ type: String }]
      },
      privacy: {
        publicProfile: { type: Boolean, default: false },
        showActiveStatus: { type: Boolean, default: true },
      },
      careerDNA: {
        coreStrengths: [{ type: String }],
        learningStyle: { type: String },
        recommendedSectors: [{ type: String }],
        personalityArchetype: { type: String },
        summary: { type: String }
      }
    }
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') && this.password) {
    // Prevent double hashing if password is already a bcrypt hash
    if (!this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  // Check if profile-affecting fields were modified
  if (
    this.isModified('stream') ||
    this.isModified('educationLevel') ||
    this.isModified('interests') ||
    this.isModified('skills') ||
    this.isModified('academicProfile') ||
    this.isModified('intelligenceProfile') ||
    this.isModified('preferredCareer') ||
    this.isModified('preferredLocation') ||
    this.isModified('careerGoal') ||
    this.isModified('careerAspiration') ||
    this.isModified('targetExam')
  ) {
    this.profileUpdatedAt = new Date();
    this.profileVersion = (this.profileVersion || 1) + 1;
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

// Add performance indexes for frequently queried fields
UserSchema.index({ role: 1 });
UserSchema.index({ stream: 1 });
UserSchema.index({ city: 1 });
UserSchema.index({ 'intelligenceProfile.educationStage': 1 });
UserSchema.index({ 'intelligenceProfile.careerReadinessScore': -1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
