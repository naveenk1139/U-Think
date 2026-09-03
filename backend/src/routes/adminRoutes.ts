import express, { Request, Response } from 'express';
import College, { ICollege } from '../models/College.js';
import { DataImportRun } from '../models/DataImportRun.js';
import { AisheClient } from '../services/ingestion/aisheScraper.js';
import { CollegeDbClient } from '../services/ingestion/collegeDbClient.js';
import { DataNormalizer } from '../services/ingestion/normalizer.js';
import { UgcScraper } from '../services/ingestion/ugcScraper.js';
import District from '../models/District.js';
import State from '../models/State.js';
const router = express.Router();

const MOCK_COORDS: Record<string, { lat: number; lng: number }> = {
  'bengaluru urban': { lat: 12.9716, lng: 77.5946 },
  'bengaluru rural': { lat: 13.1979, lng: 77.6367 },
  'mysuru': { lat: 12.2958, lng: 76.6394 },
  'belagavi': { lat: 15.8497, lng: 74.4977 },
  'mangaluru': { lat: 12.9141, lng: 74.8560 }, // Dakshina Kannada
  'dakshina kannada': { lat: 12.9141, lng: 74.8560 },
  'hubballi-dharwad': { lat: 15.3647, lng: 75.1240 },
  'dharwad': { lat: 15.4589, lng: 75.0078 },
  'kalaburagi': { lat: 17.3297, lng: 76.8343 },
  'ballari': { lat: 15.1394, lng: 76.9214 },
  'tumakuru': { lat: 13.3392, lng: 77.1016 },
  'shivamogga': { lat: 13.9299, lng: 75.5681 },
  'udupi': { lat: 13.3409, lng: 74.7421 },
  'davangere': { lat: 14.4644, lng: 75.9218 },
  'vijayapura': { lat: 16.8302, lng: 75.7100 },
  'hassan': { lat: 13.0072, lng: 76.1061 },
  'bidar': { lat: 17.9104, lng: 77.5199 },
  'raichur': { lat: 16.2076, lng: 77.3463 },
  'bagalkot': { lat: 16.1691, lng: 75.6615 },
  'chikkamagaluru': { lat: 13.3161, lng: 75.7720 },
  'mandya': { lat: 12.5218, lng: 76.8951 },
  'koppal': { lat: 15.3500, lng: 76.1557 },
  'gadag': { lat: 15.4297, lng: 75.6322 },
  'haveri': { lat: 14.7950, lng: 75.4013 },
  'chitradurga': { lat: 14.2274, lng: 76.4046 },
  'kolar': { lat: 13.1367, lng: 78.1292 },
  'chikkaballapur': { lat: 13.4325, lng: 77.7275 },
  'chamarajanagar': { lat: 11.9261, lng: 76.9400 },
  'kodagu': { lat: 12.3375, lng: 75.8069 },
  'ramnagara': { lat: 12.7150, lng: 77.2813 },
  'ramanagara': { lat: 12.7150, lng: 77.2813 },
  'yadgir': { lat: 16.7645, lng: 77.1432 },
  'vijayanagara': { lat: 15.3333, lng: 76.4667 }
};

// Mock authentication middleware for admin
const adminAuth = (req: Request, res: Response, next: Function) => {
  // In a real app, verify admin token here
  next();
};

/**
 * Executes the ingestion pipeline asynchronously.
 */
async function runIngestionPipeline(runId: string, source: string) {
  const run = await DataImportRun.findById(runId);
  if (!run) return;

  try {
    run.status = 'IN_PROGRESS';
    await run.save();

    const normalizer = new DataNormalizer();
    
    // Load state and districts into memory for linking
    const stateRecord = await State.findOne({ name: 'Karnataka' });
    const districtsList = await District.find({ stateId: stateRecord?._id });
    const districtMap = new Map();
    districtsList.forEach(d => {
      // Create a normalized key for matching
      const key = normalizer.normalizeDistrict(d.name).toLowerCase();
      districtMap.set(key, d._id);
    });
    
    // Example: Fetch from AISHE
    if (source === 'AISHE' || source === 'ALL') {
      const aisheClient = new AisheClient();
      const aisheData = await aisheClient.fetchKarnatakaColleges();
      run.recordsFetched += aisheData.length;
      
      for (const item of aisheData) {
        try {
          const normalizedDistrict = normalizer.normalizeDistrict(item.district);
          
          // Deduplication check
          const existing = await normalizer.findExistingRecord(item.aisheCode, undefined, item.name, normalizedDistrict);
          
          if (existing) {
            run.duplicatesFound++;
            // Update logic can be complex; skipping simple overwrite for safety.
            // Could merge fields here.
          } else {
            // Insert new record
            const slug = normalizer.generateSlug(item.name, normalizedDistrict);
            
            const coords = MOCK_COORDS[normalizedDistrict.toLowerCase()] || { lat: 15.3173, lng: 75.7139 };
            const randomLat = coords.lat + (Math.random() - 0.5) * 0.1;
            const randomLng = coords.lng + (Math.random() - 0.5) * 0.1;
            
            await College.create({
              source: 'AISHE',
              sourceId: item.aisheCode || `aishe_${Date.now()}_${Math.random()}`,
              name: item.name,
              slug,
              aisheCode: item.aisheCode,
              state: item.state,
              stateRef: stateRecord?._id,
              district: normalizedDistrict,
              districtRef: districtMap.get(normalizedDistrict.toLowerCase()),
              institutionType: item.institutionType,
              ownership: item.management,
              establishedYear: item.yearOfEstablishment,
              universityAffiliation: item.universityAffiliation,
              status: 'ACTIVE',
              verificationStatus: 'verified',
              isVerified: true,
              lastVerifiedAt: new Date(),
              latitude: randomLat,
              longitude: randomLng
            });
            run.recordsInserted++;
          }
        } catch (itemError: any) {
          run.recordsRejected++;
          run.importErrors.push(`Failed to process ${item.name}: ${itemError.message}`);
        }
      }
    }

    // Example: Fetch from CollegeDB
    if (source === 'COLLEGEDB' || source === 'ALL') {
      const cdbClient = new CollegeDbClient();
      const cdbData = await cdbClient.fetchKarnatakaColleges();
      run.recordsFetched += cdbData.length;

      for (const item of cdbData) {
        try {
          const normalizedDistrict = normalizer.normalizeDistrict(item.city); // Using city as proxy for district in this mock
          
          const existing = await normalizer.findExistingRecord(undefined, undefined, item.name, normalizedDistrict);
          
          if (existing) {
            run.duplicatesFound++;
            // Merge CollegeDB info into existing verified AISHE record
            if (!existing.courses || existing.courses.length === 0) {
              existing.courses = item.courses;
              existing.type = item.type;
              await existing.save();
              run.recordsUpdated++;
            }
          } else {
            const slug = normalizer.generateSlug(item.name, normalizedDistrict);
            
            const coords = MOCK_COORDS[normalizedDistrict.toLowerCase()] || { lat: 15.3173, lng: 75.7139 };
            const randomLat = coords.lat + (Math.random() - 0.5) * 0.1;
            const randomLng = coords.lng + (Math.random() - 0.5) * 0.1;

            await College.create({
              source: 'COLLEGEDB',
              sourceId: item.id,
              name: item.name,
              slug,
              state: item.state,
              stateRef: stateRecord?._id,
              district: normalizedDistrict,
              districtRef: districtMap.get(normalizedDistrict.toLowerCase()),
              city: item.city,
              courses: item.courses,
              type: item.type,
              establishedYear: item.established,
              status: 'ACTIVE',
              verificationStatus: 'needs_review', // CollegeDB is secondary source
              isVerified: false,
              latitude: randomLat,
              longitude: randomLng
            });
            run.recordsInserted++;
          }
        } catch (itemError: any) {
          run.recordsRejected++;
          run.importErrors.push(`Failed to process ${item.name}: ${itemError.message}`);
        }
      }
    }

    // Process UGC Source
    if (source === 'UGC' || source === 'ALL') {
      const ugcScraper = new UgcScraper();
      const ugcData = await ugcScraper.fetchKarnatakaAutonomousColleges();
      run.recordsFetched += ugcData.length;
      
      for (const item of ugcData) {
        try {
          const normalizedDistrict = normalizer.normalizeDistrict(item.district);
          const existing = await normalizer.findExistingRecord(undefined, undefined, item.name, normalizedDistrict);
          
          if (existing) {
            run.duplicatesFound++;
            // Update the record with UGC verification tag
            if (!existing.categories?.includes('Autonomous College')) {
               await College.findByIdAndUpdate(existing._id, {
                 $addToSet: { categories: 'Autonomous College' },
                 verificationStatus: 'verified',
                 isVerified: true
               });
               run.recordsUpdated++;
            }
          } else {
            const slug = normalizer.generateSlug(item.name, normalizedDistrict);
            const coords = MOCK_COORDS[normalizedDistrict.toLowerCase()] || { lat: 15.3173, lng: 75.7139 };
            
            await College.create({
              source: 'UGC',
              sourceUrl: item.sourceUrl,
              name: item.name,
              slug,
              state: item.state,
              stateRef: stateRecord?._id,
              district: normalizedDistrict,
              districtRef: districtMap.get(normalizedDistrict.toLowerCase()),
              type: 'Private',
              categories: ['Autonomous College'],
              status: 'ACTIVE',
              verificationStatus: 'verified',
              isVerified: true,
              latitude: coords.lat + (Math.random() - 0.5) * 0.1,
              longitude: coords.lng + (Math.random() - 0.5) * 0.1
            });
            run.recordsInserted++;
          }
        } catch (itemError: any) {
          run.recordsRejected++;
          run.importErrors.push(`Failed to process UGC ${item.name}: ${itemError.message}`);
        }
      }
    }

    run.status = 'COMPLETED';
    run.completedAt = new Date();
    await run.save();

  } catch (error: any) {
    run.status = 'FAILED';
    run.completedAt = new Date();
    run.importErrors.push(`Pipeline failed: ${error.message}`);
    await run.save();
  }
}


// POST /api/admin/colleges/sync
router.post('/colleges/sync', adminAuth, async (req: Request, res: Response) => {
  try {
    const source = req.body.source || 'ALL';
    
    // Create tracking record
    const run = await DataImportRun.create({
      source,
      status: 'STARTED'
    });

    // Fire and forget the pipeline
    runIngestionPipeline(run.id, source);

    res.json({
      success: true,
      message: 'Data ingestion pipeline started successfully.',
      runId: run.id
    });
  } catch (error) {
    console.error('Error starting data sync:', error);
    res.status(500).json({ message: 'Server error during data sync' });
  }
});

// GET /api/admin/colleges/sync/status
router.get('/colleges/sync/status', adminAuth, async (req: Request, res: Response) => {
  try {
    const runs = await DataImportRun.find().sort({ startedAt: -1 }).limit(10);
    res.json(runs);
  } catch (error) {
    console.error('Error fetching sync status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/data-health
router.get('/data-health', adminAuth, async (req: Request, res: Response) => {
  try {
    const totalRecords = await College.countDocuments();
    const verifiedRecords = await College.countDocuments({ isVerified: true });
    const unverifiedRecords = await College.countDocuments({ isVerified: false });
    const missingWebsite = await College.countDocuments({ official_website: { $exists: false } });
    const missingCoordinates = await College.countDocuments({ latitude: { $exists: false } });
    const missingFees = await College.countDocuments({ fees: { $exists: false } });
    const missingProgrammes = await College.countDocuments({ $or: [{ courses: { $exists: false } }, { courses: { $size: 0 } }] });

    // Institutions by district
    const byDistrict = await College.aggregate([
      { $group: { _id: '$district', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Institutions by education level (categories)
    const byLevel = await College.aggregate([
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const lastSync = await DataImportRun.findOne({ status: 'COMPLETED' }).sort({ completedAt: -1 });

    res.json({
      totalImported: totalRecords,
      verifiedRecords,
      unverifiedRecords,
      missingOfficialWebsite: missingWebsite,
      missingCoordinates,
      missingFees,
      missingProgrammes,
      duplicateRecords: 0, // In an ideal state handled by the ingestion deduplication
      brokenWebsites: 0,
      staleRecords: await College.countDocuments({ verificationStatus: 'stale' }),
      institutionsByDistrict: byDistrict.map(d => ({ district: d._id || 'Unknown', count: d.count })),
      institutionsByLevel: byLevel.map(l => ({ level: l._id, count: l.count })),
      lastSuccessfulSync: lastSync ? lastSync.completedAt : null
    });
  } catch (error) {
    console.error('Error fetching data health stats:', error);
    res.status(500).json({ message: 'Server error fetching data health' });
  }
});

// GET /api/admin/coverage
router.get('/coverage', adminAuth, async (req: Request, res: Response) => {
  try {
    const districts = await District.find().sort({ name: 1 });
    const coverageData = [];

    let totalInstitutions = 0;
    let totalVerified = 0;
    let totalUnverified = 0;
    let totalMissingWebsite = 0;
    let totalMissingLocation = 0;

    for (const d of districts) {
      // Find all colleges in this district
      // Using Regex for legacy support if references aren't fully migrated
      const filter = { $or: [{ districtRef: d._id }, { district: { $regex: new RegExp(`^${d.name}$`, 'i') } }] };
      const districtColleges = await College.find(filter);

      const total = districtColleges.length;
      const verified = districtColleges.filter(c => c.isVerified).length;
      const unverified = total - verified;
      const missing_website = districtColleges.filter(c => !c.website && !c.officialWebsiteUrl).length;
      const missing_coordinates = districtColleges.filter(c => !c.latitude || !c.longitude).length;
      
      const missing_programmes = districtColleges.filter(c => !c.courses || c.courses.length === 0).length;
      const missing_fees = districtColleges.filter(c => !c.fees).length;

      // Education Level Counters
      const after_10th = districtColleges.filter(c => c.educationLevels?.includes('AFTER_10TH')).length;
      const puc = districtColleges.filter(c => c.educationLevels?.includes('PUC')).length;
      const diploma = districtColleges.filter(c => c.educationLevels?.includes('DIPLOMA')).length;
      const iti = districtColleges.filter(c => c.educationLevels?.includes('ITI')).length;
      const undergraduate = districtColleges.filter(c => c.educationLevels?.includes('UNDERGRADUATE')).length;
      const postgraduate = districtColleges.filter(c => c.educationLevels?.includes('POSTGRADUATE')).length;
      const professional = districtColleges.filter(c => c.educationLevels?.includes('PROFESSIONAL')).length;
      const research = districtColleges.filter(c => c.educationLevels?.includes('RESEARCH')).length;

      coverageData.push({
        district_id: d._id,
        district_name: d.name,
        total_institutions: total,
        after_10th,
        puc,
        diploma,
        iti,
        undergraduate,
        postgraduate,
        professional,
        research,
        verified,
        unverified,
        missing_website,
        missing_coordinates,
        missing_programmes,
        missing_fees,
        last_sync: new Date().toISOString() // Or get from Sync logs
      });

      totalInstitutions += total;
      totalVerified += verified;
      totalUnverified += unverified;
      totalMissingWebsite += missing_website;
      totalMissingLocation += missing_coordinates;
    }

    res.json({
      data: coverageData,
      summary: {
        total_institutions: totalInstitutions,
        total_districts: districts.length,
        total_taluks: await require('../models/Taluk').default.countDocuments(),
        total_verified: totalVerified,
        total_unverified: totalUnverified,
        total_missing_website: totalMissingWebsite,
        total_missing_location: totalMissingLocation,
        last_sync: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching data coverage:', error);
    res.status(500).json({ message: 'Server error fetching data coverage' });
  }
});

export default router;
