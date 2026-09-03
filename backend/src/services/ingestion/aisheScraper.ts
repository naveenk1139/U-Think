import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Interfaces for AISHE Data
export interface AisheCollege {
  aisheCode: string;
  name: string;
  state: string;
  district: string;
  universityAffiliation?: string;
  institutionType?: string;
  management?: string;
  yearOfEstablishment?: number;
}

export class AisheClient {
  private baseUrl = 'https://dashboard.aishe.gov.in/hedirectory';

  async fetchKarnatakaColleges(): Promise<AisheCollege[]> {
    console.log('[AISHE Client] Initiating fetch for Karnataka colleges from npm package "indian-colleges"...');
    try {
      // Use the indian-colleges package as a reliable offline dataset
      const { createRequire } = await import('module');
      const require = createRequire(import.meta.url);
      const collegeData = require('indian-colleges');
      const rawColleges = collegeData.getCollegesByState('Karnataka');

      return rawColleges.map((c: any) => {
        // Extract AISHE code if present in the string e.g. "College Name (Id: C-12345)"
        const nameMatch = c.college.match(/(.*?)\s*\(Id:\s*(C-\d+)\)/);
        let name = c.college;
        let aisheCode = '';
        if (nameMatch) {
          name = nameMatch[1].trim();
          aisheCode = nameMatch[2];
        } else {
          // generate fallback id just in case
          aisheCode = `C-${Math.floor(Math.random() * 90000) + 10000}`;
        }

        return {
          aisheCode: aisheCode,
          name: name,
          state: c.state,
          district: c.district,
          universityAffiliation: c.university,
          institutionType: c.college_type,
          management: 'Private/Govt' // Fallback
        };
      });
    } catch (error: any) {
      console.warn(`[AISHE Client] Fetch failed (${error.message}). Returning empty array.`);
      return [];
    }
  }
}
