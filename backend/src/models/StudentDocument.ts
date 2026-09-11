import mongoose, { Document, Schema } from 'mongoose';

export interface IStudentDocument extends Document {
  studentId: mongoose.Types.ObjectId;
  fileName: string;
  fileType: string;
  documentType: string;
  storageReference: string;
  status: string;
  uploadedAt: Date;
}

const StudentDocumentSchema = new Schema<IStudentDocument>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    documentType: {
      type: String,
      enum: ['TENTH_MARKSHEET', 'TWELFTH_MARKSHEET', 'DIPLOMA_MARKSHEET', 'EDUCATIONAL_CERTIFICATE', 'UNKNOWN'],
      default: 'UNKNOWN',
    },
    storageReference: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['UPLOADED', 'ANALYZING', 'PROCESSED', 'FAILED'],
      default: 'UPLOADED',
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentDocument = mongoose.models.StudentDocument || mongoose.model<IStudentDocument>('StudentDocument', StudentDocumentSchema);
export default StudentDocument;
