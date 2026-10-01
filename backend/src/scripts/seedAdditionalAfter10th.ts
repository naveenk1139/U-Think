import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Pathway from '../models/Pathway.js';
import EducationLevel from '../models/EducationLevel.js';
import Stream from '../models/Stream.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

const newPathways = [
  { name: 'Agriculture', slug: 'agriculture', description: 'Farming, Horticulture, and related agricultural sciences.', duration: '2 - 4 Years' },
  { name: 'Design', slug: 'design', description: 'Fashion, Graphic, Interior, and UI/UX Design programs.', duration: '1 - 4 Years' },
  { name: 'Architecture', slug: 'architecture', description: 'Building design, planning, and structural studies.', duration: '3 - 5 Years' },
  { name: 'Law', slug: 'law', description: 'Legal studies and foundational law programs.', duration: '3 - 5 Years' },
  { name: 'Hotel Management / Hospitality', slug: 'hotel-management', description: 'Hospitality, culinary arts, and event management.', duration: '1 - 3 Years' },
  { name: 'Tourism', slug: 'tourism', description: 'Travel, tourism management, and ticketing.', duration: '6 Months - 3 Years' },
  { name: 'Media', slug: 'media', description: 'Mass communication, journalism, and broadcasting.', duration: '1 - 3 Years' },
  { name: 'Journalism', slug: 'journalism', description: 'News reporting, editing, and content creation.', duration: '1 - 3 Years' },
  { name: 'Animation', slug: 'animation', description: '2D/3D animation and digital art.', duration: '1 - 3 Years' },
  { name: 'VFX', slug: 'vfx', description: 'Visual effects and post-production for film and media.', duration: '1 - 3 Years' },
  { name: 'Film', slug: 'film', description: 'Directing, cinematography, acting, and film production.', duration: '1 - 3 Years' },
  { name: 'Fine Arts', slug: 'fine-arts', description: 'Painting, sculpture, and visual arts.', duration: '2 - 4 Years' },
  { name: 'Performing Arts', slug: 'performing-arts', description: 'Dance, theatre, and music programs.', duration: '1 - 4 Years' },
  { name: 'Sports / Physical Education', slug: 'sports-pe', description: 'Physical training, coaching, and sports management.', duration: '1 - 3 Years' },
  { name: 'Aviation', slug: 'aviation', description: 'Cabin crew, airport operations, and aviation management.', duration: '6 Months - 2 Years' },
  { name: 'Merchant Navy / Maritime', slug: 'merchant-navy', description: 'Marine engineering, nautical science, and maritime studies.', duration: '1 - 4 Years' },
  { name: 'Beauty & Wellness', slug: 'beauty-wellness', description: 'Cosmetology, salon management, and wellness therapies.', duration: '3 Months - 2 Years' },
  { name: 'Retail', slug: 'retail', description: 'Retail management, merchandising, and store operations.', duration: '6 Months - 1 Year' },
  { name: 'Banking & Finance (Vocational)', slug: 'banking-finance-vocational', description: 'Accounting, banking ops, and finance skill programs.', duration: '6 Months - 1 Year' },
  { name: 'Computer / IT Skill Pathways', slug: 'computer-it-skills', description: 'Short-term IT certifications and computer training.', duration: '3 Months - 1 Year' },
  { name: 'Defence-oriented Education', slug: 'defence-education', description: 'Preparation and foundation for defence services.', duration: 'Varies' },
  { name: 'Entrepreneurship', slug: 'entrepreneurship', description: 'Business creation, startup management, and enterprise skills.', duration: '6 Months - 2 Years' },
  { name: 'Paramedical / Allied Health', slug: 'paramedical-allied-health', description: 'Healthcare support and allied medical services.', duration: '1 - 3 Years' },
  { name: 'Vocational Education', slug: 'vocational-education', description: 'Job-specific vocational training and certifications.', duration: '1 - 2 Years' },
  { name: 'Apprenticeship / Skill Training', slug: 'apprenticeship-skill-training', description: 'On-the-job training with stipends in specific trades.', duration: '1 - 2 Years' },
  { name: 'IT / Polytechnic', slug: 'it-polytechnic', description: 'Industrial training and polytechnic diploma routes.', duration: '2 - 3 Years' },
  { name: 'PUC / 11th-12th', slug: 'puc-11th-12th', description: 'Pre-University Course and standard 11th-12th grade.', duration: '2 Years' }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    let after10thLevel = await EducationLevel.findOne({ slug: 'after-10th' });
    if (!after10thLevel) {
      after10thLevel = await EducationLevel.create({
        name: 'After 10th',
        slug: 'after-10th',
        order: 1,
        active: true
      });
    }

    const levelId = after10thLevel._id;

    for (let i = 0; i < newPathways.length; i++) {
      const p = newPathways[i];
      let existing = await Pathway.findOne({ slug: p.slug, educationLevelId: levelId });
      
      if (!existing) {
        existing = await Pathway.create({
          educationLevelId: levelId,
          name: p.name,
          slug: p.slug,
          description: p.description,
          duration: p.duration,
          order: 10 + i, // ordered after the main ones
          active: true
        });
        console.log(`Created Pathway: ${p.name}`);

        // Add at least one dummy stream so it shows features
        await Stream.create({
          pathwayId: existing._id,
          name: `Core ${p.name}`,
          slug: `core-${p.slug}`,
          description: `General curriculum for ${p.name}`,
          duration: p.duration,
          active: true
        });
      } else {
        console.log(`Pathway already exists: ${p.name}`);
      }
    }

    console.log('Done seeding additional pathways.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
