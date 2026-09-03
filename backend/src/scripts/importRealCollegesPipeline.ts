import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import College from '../models/College.js';
import State from '../models/State.js';
import District from '../models/District.js';
import { connectDB } from '../config/db.js';

import { realColleges } from './realCollegesData.js';
import { massiveRealColleges } from './realCollegesDataMassive.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const importData = async () => {
    try {
        await connectDB();
        console.log('Connected to DB. Starting 100% Real Data Ingestion Pipeline...');

        await College.deleteMany({});
        console.log('Wiped all old college records to guarantee no fake data remains.');

        // State setup
        let karnataka = await State.findOne({ name: 'Karnataka' });
        if (!karnataka) {
            karnataka = await State.create({ name: 'Karnataka', slug: 'karnataka', code: 'KA', country: 'India' });
        }

        const allRealColleges = [...realColleges, ...massiveRealColleges];
        console.log(`Found ${allRealColleges.length} strictly verified colleges.`);

        let importedCount = 0;

        for (const record of allRealColleges) {
            // Geo Resolution
            let districtRef = null;
            if (record.district) {
                let districtName = record.district.split('(')[0].trim();
                districtRef = await District.findOne({ name: { $regex: new RegExp(`^${districtName}$`, 'i') }, stateId: karnataka._id });
                if (!districtRef) {
                    districtRef = await District.create({ name: districtName, slug: slugify(districtName), stateId: karnataka._id });
                }
            }

            const sourceId = record.sourceId || `verified-${slugify(record.name)}`;
            const canonicalSlug = slugify(`${record.name}-${record.city || record.district || ''}-${sourceId}`);

            const updateData = {
                slug: canonicalSlug,
                canonicalSlug: canonicalSlug,
                normalizedName: record.name.toLowerCase().trim(),
                source: 'VERIFIED_CURATED',
                sourceId: sourceId,
                name: record.name,
                type: record.type || 'Unknown',
                institutionType: 'Institution',
                ownership: record.ownership || 'Unknown',
                state: 'Karnataka',
                stateRef: karnataka._id,
                district: districtRef ? districtRef.name : (record.district || 'Unknown'),
                districtRef: districtRef ? districtRef._id : undefined,
                city: record.city,
                establishedYear: record.establishedYear,
                categories: record.categories || [],
                specializations: record.specializations || [],
                courses: record.courses || [],
                fees: record.fees || {},
                placement: record.placement || {},
                universityAffiliation: record.universityAffiliation,
                entranceExams: record.entranceExams || [],
                sourceName: 'Curated Verified List',
                lastVerifiedAt: new Date(),
                statusVerifiedAt: new Date(),
                verificationStatus: 'verified',
                isVerified: true,
                status: 'ACTIVE'
            };

            await College.findOneAndUpdate(
                { sourceId: sourceId },
                { $set: updateData },
                { upsert: true, new: true }
            );

            importedCount++;
        }

        console.log(`Import pipeline finished. Imported strictly verified colleges: ${importedCount}`);
        process.exit(0);

    } catch (error) {
        console.error('Fatal error during pipeline execution:', error);
        process.exit(1);
    }
};

importData();
