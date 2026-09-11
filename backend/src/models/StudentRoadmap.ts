import mongoose, { Document, Schema } from 'mongoose';

export interface IRoadmapStep {
  stepId: string;
  title: string;
  type: string; // e.g., 'Foundation', 'Eligibility', 'Exam', 'Degree', 'Skill', 'Project', 'Career'
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  completedAt?: Date;
  estimatedDuration?: string;
  resources?: string[];
}

export interface ISkillGap {
  skillName: string;
  currentLevel: string; // e.g., 'Beginner', 'Intermediate', 'Advanced', 'None'
  requiredLevel: string;
  gapDescription: string;
}

export interface IStudentRoadmap extends Document {
  studentId: string;
  targetCareerId?: mongoose.Types.ObjectId;
  targetCareerName: string;
  currentPhase: string;
  overallProgress: number;
  skillGaps: ISkillGap[];
  steps: IRoadmapStep[];
  isActive: boolean;
  generatedAt: Date;
  lastUpdated: Date;
}

const RoadmapStepSchema = new Schema<IRoadmapStep>({
  stepId: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
  completedAt: { type: Date },
  estimatedDuration: { type: String },
  resources: [{ type: String }]
});

const SkillGapSchema = new Schema<ISkillGap>({
  skillName: { type: String, required: true },
  currentLevel: { type: String, required: true },
  requiredLevel: { type: String, required: true },
  gapDescription: { type: String, required: true }
});

const StudentRoadmapSchema = new Schema<IStudentRoadmap>({
  studentId: { type: String, required: true, index: true },
  targetCareerId: { type: Schema.Types.ObjectId, ref: 'CareerProfile' },
  targetCareerName: { type: String, required: true },
  currentPhase: { type: String, required: true },
  overallProgress: { type: Number, default: 0 },
  skillGaps: [SkillGapSchema],
  steps: [RoadmapStepSchema],
  isActive: { type: Boolean, default: true },
  generatedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const StudentRoadmap = mongoose.models.StudentRoadmap || mongoose.model<IStudentRoadmap>('StudentRoadmap', StudentRoadmapSchema);
export default StudentRoadmap;
