import mongoose, { Document, Schema } from 'mongoose';

export interface IEvidenceSource {
  type: string; // 'DOCUMENT', 'COURSE', 'PROJECT', 'ASSESSMENT', 'MANUAL'
  name: string;
  url?: string;
  dateAdded: Date;
  verified: boolean;
  score?: number;
}

export interface ISkillNode {
  skillName: string;
  category: string;
  level: string; // 'Beginner', 'Intermediate', 'Advanced', 'Expert'
  strengthScore: number; // 0-100
  evidence: IEvidenceSource[];
  relatedSkills: string[];
}

export interface ISkillEvidenceGraph extends Document {
  studentId: string;
  nodes: ISkillNode[];
  lastUpdated: Date;
}

const EvidenceSourceSchema = new Schema<IEvidenceSource>({
  type: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String },
  dateAdded: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  score: { type: Number }
});

const SkillNodeSchema = new Schema<ISkillNode>({
  skillName: { type: String, required: true },
  category: { type: String, default: 'General' },
  level: { type: String, default: 'Beginner' },
  strengthScore: { type: Number, default: 0 },
  evidence: [EvidenceSourceSchema],
  relatedSkills: [{ type: String }]
});

const SkillEvidenceGraphSchema = new Schema<ISkillEvidenceGraph>({
  studentId: { type: String, required: true, index: true },
  nodes: [SkillNodeSchema],
  lastUpdated: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const SkillEvidenceGraph = mongoose.models.SkillEvidenceGraph || mongoose.model<ISkillEvidenceGraph>('SkillEvidenceGraph', SkillEvidenceGraphSchema);
export default SkillEvidenceGraph;
