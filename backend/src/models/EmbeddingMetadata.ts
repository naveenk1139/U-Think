import mongoose, { Document, Schema } from 'mongoose';

export interface IEmbeddingMetadata {
  entityId: string;
  entityType: 'College' | 'Course' | 'Career' | 'Exam' | 'Scholarship' | 'KnowledgeChunk';
  chunkIndex: number;
  content: string;
  metadata: Record<string, any>;
  embedding: number[];
  createdAt: Date;
  updatedAt: Date;
}

// We store embeddings in MongoDB for persistence, even if we sync them to a Vector DB (like Pinecone)
const EmbeddingMetadataSchema = new Schema<IEmbeddingMetadata & Document>(
  {
    entityId: { type: String, required: true },
    entityType: { type: String, enum: ['College', 'Course', 'Career', 'Exam', 'Scholarship', 'KnowledgeChunk'], required: true },
    chunkIndex: { type: Number, default: 0 },
    content: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
    embedding: { type: [Number], required: true },
  },
  { timestamps: true }
);

EmbeddingMetadataSchema.index({ entityId: 1, entityType: 1 });
// Text index for hybrid search fallback
EmbeddingMetadataSchema.index({ content: 'text' });

export const EmbeddingMetadata = mongoose.model<IEmbeddingMetadata & Document>('EmbeddingMetadata', EmbeddingMetadataSchema);
