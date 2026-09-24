import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import EducationPathRelation from '../models/EducationPathRelation.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Degree from '../models/Degree.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function seedGraphRelations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('📦 Connected to MongoDB for seeding Education Graph Relations...');

    // Clear existing relations to prevent duplicates on re-runs
    await EducationPathRelation.deleteMany({});
    console.log('🧹 Cleared old graph relations.');

    const pathways = await Pathway.find();
    const streams = await Stream.find();
    const combos = await SubjectCombination.find();
    const degrees = await Degree.find();

    const after10th = pathways.find(p => p.slug === 'after-10th-puc-12th');
    const diploma = pathways.find(p => p.slug === 'diploma');
    const iti = pathways.find(p => p.slug === 'iti');

    const scienceStream = streams.find(s => s.slug === 'science');
    const commerceStream = streams.find(s => s.slug === 'commerce');
    const artsStream = streams.find(s => s.slug === 'arts-humanities');

    const pcmb = combos.find(c => c.slug === 'pcmb');
    const pcmc = combos.find(c => c.slug === 'pcmc');

    const btech = degrees.find(d => d.slug === 'b-tech');
    const mbbs = degrees.find(d => d.slug === 'mbbs');
    const bcom = degrees.find(d => d.slug === 'b-com');

    const relations = [];

    // 10th Grade (Root) -> Pathways
    if (after10th) {
        relations.push({
            sourceType: 'Pathway', sourceId: after10th._id, // Ideally there's a 10th node, but treating 12th as root of exploration here for simplicity
            targetType: 'Stream', targetId: scienceStream?._id,
            relationType: 'ENABLES', isVerified: true
        });
        relations.push({
            sourceType: 'Pathway', sourceId: after10th._id,
            targetType: 'Stream', targetId: commerceStream?._id,
            relationType: 'ENABLES', isVerified: true
        });
        relations.push({
            sourceType: 'Pathway', sourceId: after10th._id,
            targetType: 'Stream', targetId: artsStream?._id,
            relationType: 'ENABLES', isVerified: true
        });
    }

    // Streams -> Combos
    if (scienceStream) {
        if (pcmb) {
            relations.push({
                sourceType: 'Stream', sourceId: scienceStream._id,
                targetType: 'SubjectCombination', targetId: pcmb._id,
                relationType: 'ENABLES', isVerified: true
            });
        }
        if (pcmc) {
            relations.push({
                sourceType: 'Stream', sourceId: scienceStream._id,
                targetType: 'SubjectCombination', targetId: pcmc._id,
                relationType: 'ENABLES', isVerified: true
            });
        }
    }

    // Combos -> Degrees
    if (pcmb) {
        if (mbbs) {
            relations.push({
                sourceType: 'SubjectCombination', sourceId: pcmb._id,
                targetType: 'Degree', targetId: mbbs._id,
                relationType: 'ELIGIBLE_FOR', minScoreRequired: 50, isVerified: true
            });
        }
        if (btech) {
            relations.push({
                sourceType: 'SubjectCombination', sourceId: pcmb._id,
                targetType: 'Degree', targetId: btech._id,
                relationType: 'ELIGIBLE_FOR', minScoreRequired: 45, isVerified: true
            });
        }
    }

    if (commerceStream && bcom) {
        relations.push({
            sourceType: 'Stream', sourceId: commerceStream._id,
            targetType: 'Degree', targetId: bcom._id,
            relationType: 'ELIGIBLE_FOR', minScoreRequired: 35, isVerified: true
        });
    }

    // Alternative Switching (Route Switch Engine)
    if (diploma && btech) {
        relations.push({
            sourceType: 'Pathway', sourceId: diploma._id,
            targetType: 'Degree', targetId: btech._id,
            relationType: 'ALTERNATIVE_TO', description: 'Lateral Entry to 2nd Year', isVerified: true
        });
    }

    const validRelations = relations.filter(r => r.sourceId && r.targetId);

    if (validRelations.length > 0) {
        await EducationPathRelation.insertMany(validRelations);
        console.log(`✅ Inserted ${validRelations.length} graph relations.`);
    } else {
        console.log('⚠️ No valid relations created. Missing base entities.');
    }

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding relations:', error);
    process.exit(1);
  }
}

seedGraphRelations();
