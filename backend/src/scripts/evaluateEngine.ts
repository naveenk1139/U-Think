import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { detectEducationStage } from '../services/educationStageService.js';
import { extractMLFeatures } from '../services/featureEngineeringService.js';
import { generateAllRecommendations } from '../services/recommendationService.js';
import { generateNextBestActions } from '../services/nextBestActionEngine.js';

dotenv.config();

async function runEvaluation() {
  console.log("==========================================");
  console.log(" PHASE 16: PIPELINE EVALUATION & TESTING");
  console.log("==========================================");

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/uthink';
    await mongoose.connect(mongoUri);
    console.log("✅ DB Connected");

    // Get any user with some data, or the first user
    const user = await User.findOne({ 'careerDNA.recommendedSectors': { $exists: true } }) || await User.findOne();
    
    if (!user) {
      console.log("❌ No user found to evaluate. Seed the DB first.");
      process.exit(1);
    }

    console.log(`\n👨‍🎓 Evaluating User: ${user.name} (${user.email})`);
    console.log(`- Education: ${user.educationLevel}`);
    console.log(`- Stream: ${user.streamPreference}`);
    console.log(`- Interests: ${user.interests?.join(', ')}`);
    console.log(`- Implicit Likes: ${user.settings?.aiCounselor?.implicitLikes?.join(', ') || 'None'}`);

    // Test 1: Education Stage
    console.log("\n🧪 Test 1: Education Stage Detection");
    const stage = detectEducationStage(user);
    console.log(`✅ Stage Detected: ${stage.stageId} (Confidence: ${stage.confidence})`);

    // Test 2: Feature Engineering
    console.log("\n🧪 Test 2: ML Feature Extraction");
    const features = extractMLFeatures(user, stage.stageId);
    console.log(`✅ Features Extracted:`);
    console.log(`   - Academic Score: ${features.academic_score}`);
    console.log(`   - Interests Count: ${features.interest_vector.length}`);
    console.log(`   - Skill Vector Keys: ${Object.keys(features.skill_vector).length}`);

    // Test 3: Recommendation Engine
    console.log("\n🧪 Test 3: Generate Recommendations");
    const recommendations = await generateAllRecommendations(user._id.toString());
    console.log(`✅ Recommendations Generated: ${recommendations.length}`);
    
    if (recommendations.length > 0) {
      const topRec = recommendations[0];
      console.log(`   - Top Match: ${topRec.matchScore}%`);
      console.log(`   - Entity Type: ${topRec.entityType}`);
      console.log(`   - Label: ${topRec.recommendationLabel}`);
    }

    // Test 4: Next Best Action Engine
    console.log("\n🧪 Test 4: Next-Best-Action Engine");
    const nba = await generateNextBestActions(user._id.toString());
    console.log(`✅ Next Best Actions Generated: ${nba.length}`);
    nba.slice(0, 2).forEach((action: any, i: number) => {
      console.log(`   ${i + 1}. [${action.priority}] ${action.title} - ${action.type}`);
    });

    console.log("\n✨ EVALUATION SUCCESSFUL ✨");
    console.log("All intelligence layers (Phase 2 -> Phase 15) successfully executed in sequence.");
    
  } catch (err) {
    console.error("\n❌ EVALUATION FAILED:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runEvaluation();
