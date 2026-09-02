import mongoose, { Schema, Document } from 'mongoose';

export interface IDataImportRun extends Document {
  source: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  recordsFetched: number;
  recordsInserted: number;
  recordsUpdated: number;
  recordsRejected: number;
  duplicatesFound: number;
  importErrors: string[];
}

const DataImportRunSchema: Schema = new Schema({
  source: { type: String, required: true },
  startedAt: { type: Date, default: Date.now, required: true },
  completedAt: { type: Date },
  status: { 
    type: String, 
    enum: ['STARTED', 'IN_PROGRESS', 'COMPLETED', 'FAILED'], 
    default: 'STARTED' 
  },
  recordsFetched: { type: Number, default: 0 },
  recordsInserted: { type: Number, default: 0 },
  recordsUpdated: { type: Number, default: 0 },
  recordsRejected: { type: Number, default: 0 },
  duplicatesFound: { type: Number, default: 0 },
  importErrors: [{ type: String }]
}, { timestamps: true });

export const DataImportRun = mongoose.model<IDataImportRun>('DataImportRun', DataImportRunSchema);
