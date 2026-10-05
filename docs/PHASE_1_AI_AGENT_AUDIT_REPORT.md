# U-THINK AI AGENT: PHASE 1 REPOSITORY AUDIT

This document maps the existing U-THINK architecture against the new AI Education Agent blueprint.

## 1. Current State vs Target Blueprint

### A. Core Architecture & AI Service Layer
- **Current State:** AI capabilities are localized. `aiService.ts` contains a basic Gemini Tool Calling wrapper (`uThinkTools`, `executeTool`), and `geminiService.ts` contains raw `generateContent` endpoints.
- **Blueprint Target:** A decoupled, multi-stage **AI Orchestrator** requiring `Context Engine`, `Intent Engine`, `Memory Engine`, `Decision Engine`, and `Validation Engine`.
- **Gap:** Missing the central Orchestrator that strictly routes requests based on intent before hitting the LLM. 

### B. Database & Memory
- **Current State:** `Conversation` and `Message` models exist for basic chat history. `User.ts` has an `academicProfile` but lacks deep activity tracking.
- **Blueprint Target:** Persistent Student Memory, tracking `StudentActivity` (courses viewed, colleges saved), `RecommendationSnapshot`, `RecommendationFeedback`, and `RoadmapProgress`. 
- **Gap:** Need to add schema extensions to `User` for activity/feedback tracking and create `RoadmapProgress` tracking schemas to ensure recommendations adapt over time.

### C. Knowledge Layer & RAG
- **Current State:** The database stores `College`, `Course`, `Pathway`, `Stream`. `aiService.ts` can query these via deterministic Mongo `$regex` and `$text` searches.
- **Blueprint Target:** A robust Vector Database for semantic search (RAG pipeline: Metadata Filtering -> Vector Search -> Context Assembly).
- **Gap:** Missing a Vector/Embedding provider setup (e.g., MongoDB Atlas Vector Search or Pinecone) and an `EmbeddingMetadata` schema for semantic retrieval of unstructured text (e.g., eligibility rules, syllabus data).

### D. Recommendation Engine
- **Current State:** `recommendationService.ts` implements a deterministic heuristic (ML Feature Vectors, Skill Gaps, Eligibility Engine). It caches results in the `Recommendation` collection.
- **Blueprint Target:** Needs dynamic triggering via the AI Orchestrator (e.g., "What if I choose PCMC?" -> temporary profile mutation -> `recommendationService` -> LLM reasoning).
- **Gap:** The existing recommendation engine is highly mature but needs to be hooked into the AI Orchestrator's "What-If" and "Next Best Action" sub-engines.

### E. Security & External Services
- **Current State:** JWT Auth exists. `gemini` API is used. 
- **Blueprint Target:** Strict LLM Provider abstraction (`LLMService` -> `GeminiProvider`), Google Maps configuration (if used for college proximity), and proper fallback wrappers.

## 2. Implementation Roadmap (Phases 2-6)

### Phase 2: Data/Context Layer (Immediate Next Step)
1.  **Student Activity & Feedback Tracking:** Create `StudentActivity` and `RecommendationFeedback` models.
2.  **Profile Versioning:** Add `profileVersion` and `recommendationVersion` to the `User` model to trigger intelligent re-calculations on login instead of blocking UI loads.
3.  **Context Construction:** Implement `ContextService.ts` to assemble Student State + Conversation History securely without overloading the prompt.

### Phase 3: Knowledge Layer
1.  Establish the Vector Database configuration (evaluating Mongo Atlas Vector vs Qdrant/Pinecone).
2.  Implement `EmbeddingProvider` and batch indexing for existing Colleges, Courses, and Pathways.

### Phase 4: AI Orchestrator & Intent Engine
1.  Create `orchestratorService.ts`.
2.  Implement Intent Classification (routing to CAREER_DISCOVERY, WHAT_IF_SIMULATION, COLLEGE_RECOMMENDATION, etc.).

### Phase 5 & 6: RAG & Next-Best Action Engine
1.  Build the unified Retrieval-Augmented Generation pipeline.
2.  Implement the `nextBestActionEngine.ts` to proactively prompt the student to take assessments or view roadmaps.

---
**Audit Complete.** The U-THINK repository possesses a strong foundation in its deterministic models (`skillGapEngine`, `eligibilityEngine`). The primary objective is building the routing, memory, and semantic search (RAG) layers on top of this foundation.
