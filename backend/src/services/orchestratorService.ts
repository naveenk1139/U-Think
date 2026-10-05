import { ContextService } from './contextService.js';
import { VectorService } from './vectorService.js';
import { generateGeminiResponse } from './geminiService.js';

export class AIOrchestrator {
  /**
   * The Central AI Orchestrator Entrypoint
   * Handles Intent Detection -> Retrieval -> Decision Engine -> Grounded Generation
   */
  static async processStudentQuery(studentId: string, query: string, history: any[] = []) {
    // 1. Gather Student Context
    const context = await ContextService.getStudentContext(studentId);
    const contextPrompt = ContextService.formatContextForPrompt(context);

    // 2. Intent Detection
    const intentPrompt = `
      Analyze the following student query and classify its intent into one of the following exactly:
      CAREER_DISCOVERY, ELIGIBILITY_CHECK, COLLEGE_RECOMMENDATION, SKILL_GAP_ANALYSIS, WHAT_IF_SIMULATION, GENERAL_ADVICE
      
      Query: "${query}"
      
      Respond with ONLY the exact intent string.
    `;
    let intent = (await generateGeminiResponse(intentPrompt)).trim();
    if (!['CAREER_DISCOVERY', 'ELIGIBILITY_CHECK', 'COLLEGE_RECOMMENDATION', 'SKILL_GAP_ANALYSIS', 'WHAT_IF_SIMULATION', 'GENERAL_ADVICE'].includes(intent)) {
      intent = 'GENERAL_ADVICE';
    }

    // 3. Retrieval Augmented Generation (RAG) Setup
    // Use VectorService to fetch verified U-THINK knowledge
    const knowledge = await VectorService.hybridSearch(query, {}, 3);
    const knowledgeContext = knowledge.map(k => `[Verified U-THINK Data - ${k.entityType}]: ${k.content}`).join('\n');

    // 4. Grounded Generation
    const finalPrompt = `
      You are the U-THINK AI Education Agent. You must provide personalized, grounded advice.
      
      STUDENT CONTEXT:
      ${contextPrompt}
      
      VERIFIED U-THINK KNOWLEDGE:
      ${knowledgeContext || 'No specific database records found.'}
      
      DETECTED INTENT: ${intent}
      
      STUDENT QUERY:
      ${query}
      
      RULES:
      1. Base your answer on the Verified U-THINK Knowledge and the Student Context.
      2. If you don't know something, say "I couldn't verify this information from the available U-THINK data."
      3. Be encouraging and empathetic.
      4. Format your response in clean markdown.
    `;

    const response = await generateGeminiResponse(finalPrompt);

    return {
      intent,
      response,
      sources: knowledge.map(k => k.entityId)
    };
  }
}
