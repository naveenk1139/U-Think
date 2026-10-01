# Permanent + Multilingual Recommendation System Architecture

This document defines the core architecture for U-Think's permanent recommendation engine. All recommendation features across the platform **MUST** follow these rules and integrate with this central service.

## 1. Centralized Core Service
Do **NOT** implement recommendation logic on a per-page or per-module basis. Use a centralized pipeline:
`Student Profile -> Profile Intelligence -> Education Stage -> Verified Data -> Eligibility -> Skills/Interests -> Match Engine -> Ranking -> Explanation -> Multilingual Presentation`

## 2. Database-Backed
Recommendations are persistent database entities, automatically updating based on profile changes. The core model is `Recommendation` (see `backend/src/models/Recommendation.ts`).

## 3. Dynamic Updates
Recommendations must be re-evaluated when the student's profile (education stage, CGPA, skills, goals) changes, eliminating the need for manual regeneration.

## 4. Versioning & Explanations
Recommendations must map to a `profileVersion` to allow students to understand *why* a recommendation changed (e.g. due to a skill update).

## 5. Real-Time/Fresh Data
Recommendations must rely on verified, up-to-date data. Stale data should be clearly indicated, and unverified data should not be presented as fact.

## 6. Language-Independent Logic
Recommendation logic and factual matching must **never** depend on the user's language. A recommendation remains the same entity regardless of whether it's presented in English, Kannada, Hindi, etc.

## 7. Multilingual Presentation
The `preferredLanguage` field on the `User` model determines the presentation layer. Explanatory text should be translated, while official entities (e.g. exam names, college names) should remain untranslated unless official localization exists. AI is permitted to generate localized *explanations*, but NOT to hallucinate facts.

## 8. Personalized & Fact-Based
Generic recommendations ("Learn Python") should only be given if specifically matched to a profile gap. If data is missing, the system must ask the student to provide it rather than guessing.

## 9. Labels & Confidence
Every recommendation must carry a validation label:
`VERIFIED MATCH`, `PARTIAL MATCH`, `REQUIRES ACTION`, `INFORMATION REQUIRED`, `DATA UNVERIFIED`.

---
*Note: Any future agent or developer interacting with U-Think must adhere strictly to these architectural constraints when implementing recommendations.*
