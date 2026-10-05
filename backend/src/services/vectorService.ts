import { ai } from '../config/gemini.js';
import { EmbeddingMetadata } from '../models/EmbeddingMetadata.js';

/**
 * Calculates cosine similarity between two vectors
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export class VectorService {
  /**
   * Generates embeddings using Gemini's text-embedding model
   */
  static async generateEmbedding(text: string): Promise<number[]> {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('[VectorService] GEMINI_API_KEY missing, returning mock embedding for graceful fallback.');
      return new Array(768).fill(0.1);
    }

    try {
      const response = await ai.models.embedContent({
        model: 'text-embedding-004',
        contents: text,
      });
      return response.embeddings?.[0]?.values || [];
    } catch (error) {
      console.error('[VectorService] Failed to generate embedding:', error);
      // Graceful fallback for quota/auth issues
      return new Array(768).fill(0.1); 
    }
  }

  /**
   * Search for similar knowledge chunks. 
   * This implements Hybrid Retrieval (Keyword + Semantic).
   */
  static async hybridSearch(query: string, filters: Record<string, any> = {}, topK: number = 5) {
    const queryEmbedding = await this.generateEmbedding(query);
    
    // 1. Keyword search (BM25 fallback via MongoDB Text Search)
    const keywordMatches = await EmbeddingMetadata.find({
      $text: { $search: query },
      ...filters
    }).limit(topK * 2).lean();

    // 2. Vector Search
    // Since local MongoDB doesn't have Atlas Vector Search, we do an in-memory heuristic calculation
    // on candidate chunks matching the filters. If dataset is huge, this requires an external DB (Pinecone).
    const candidateDocs = await EmbeddingMetadata.find(filters).lean();
    
    const vectorMatches = candidateDocs.map(doc => ({
      ...doc,
      score: cosineSimilarity(queryEmbedding, doc.embedding)
    })).sort((a, b) => b.score - a.score).slice(0, topK);

    // 3. Reciprocal Rank Fusion (Mock combination)
    const combinedMap = new Map<string, any>();
    
    keywordMatches.forEach((doc, idx) => {
      const rankScore = 1 / (idx + 60);
      combinedMap.set(doc._id.toString(), { ...doc, score: rankScore });
    });

    vectorMatches.forEach((doc, idx) => {
      const rankScore = 1 / (idx + 60);
      const existing = combinedMap.get(doc._id.toString());
      if (existing) {
        existing.score += rankScore;
      } else {
        combinedMap.set(doc._id.toString(), { ...doc, score: rankScore });
      }
    });

    const finalResults = Array.from(combinedMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return finalResults.map(res => ({
      entityId: res.entityId,
      entityType: res.entityType,
      content: res.content,
      metadata: res.metadata,
      relevanceScore: res.score
    }));
  }
}
