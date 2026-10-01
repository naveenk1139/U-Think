const mongoose = require('mongoose');

const mongoUri = 'mongodb://127.0.0.1:27017/uthink';

const websiteMapping = {
  'neet-ug': 'https://exams.nta.ac.in/NEET/',
  'jee-main': 'https://jeemain.nta.ac.in/',
  'clat': 'https://consortiumofnlus.ac.in/',
  'bitsat': 'https://www.bitsadmission.com/',
  'viteee': 'https://viteee.vit.ac.in/',
  'cuet-ug': 'https://cuet.samarth.ac.in/',
  'nda': 'https://upsc.gov.in/',
  'mht-cet': 'https://cetcell.mahacet.org/'
};

async function updateWebsites() {
  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;
  
  let updatedCount = 0;
  for (const [slug, url] of Object.entries(websiteMapping)) {
    const result = await db.collection('exams').updateOne(
      { canonical_slug: slug },
      { 
        $set: { 
          official_website: url,
          verification_status: 'VERIFIED'
        } 
      }
    );
    if (result.modifiedCount > 0) {
      updatedCount++;
      console.log(`Updated ${slug} with URL: ${url}`);
    }
  }
  
  console.log(`Successfully updated ${updatedCount} exams.`);
  process.exit(0);
}

updateWebsites().catch(console.error);
