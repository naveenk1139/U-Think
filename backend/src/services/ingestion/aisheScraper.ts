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
    console.log('[AISHE Client] Initiating fetch for Karnataka colleges...');
    try {
      const dataPath = path.join(process.cwd(), 'aisheData.json');
      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(fileContent) as AisheCollege[];
      } else {
        console.warn('[AISHE Client] aisheData.json not found, returning empty array.');
        return [];
      }
    } catch (error) {
      console.error('[AISHE Client] Error fetching data:', error);
      throw error;
    }
  }
}
