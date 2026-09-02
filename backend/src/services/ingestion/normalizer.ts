import College, { ICollege } from '../../models/College.js';
import mongoose from 'mongoose';
import slugify from 'slugify';

export class DataNormalizer {
  
  // Basic geographic normalization mappings
  private districtAliases: { [key: string]: string } = {
    'bangalore urban': 'Bengaluru Urban',
    'bengaluru urban': 'Bengaluru Urban',
    'bangalore': 'Bengaluru Urban',
    'bengaluru': 'Bengaluru Urban',
    'mysore': 'Mysuru',
    'mysuru': 'Mysuru',
    'belgaum': 'Belagavi',
    'belagavi': 'Belagavi',
    'hubli-dharwad': 'Dharwad',
    'dharwad': 'Dharwad',
    'mangalore': 'Dakshina Kannada',
    'dakshina kannada': 'Dakshina Kannada',
    'south canara': 'Dakshina Kannada',
    'bijapur': 'Vijayapura',
    'vijayapura': 'Vijayapura',
    'gulbarga': 'Kalaburagi',
    'kalaburagi': 'Kalaburagi',
  };

  normalizeDistrict(rawDistrict: string): string {
    const lower = rawDistrict.toLowerCase().trim();
    return this.districtAliases[lower] || rawDistrict;
  }

  generateSlug(name: string, district: string): string {
    const baseStr = `${name} ${district}`;
    return slugify(baseStr, { lower: true, strict: true });
  }

  /**
   * Deduplication logic. Attempts to find an existing record based on strong identifiers.
   */
  async findExistingRecord(
    aisheCode?: string, 
    aicteCode?: string, 
    name?: string, 
    district?: string
  ): Promise<ICollege | null> {
    
    // 1. Try AISHE code first (Strongest Match)
    if (aisheCode) {
      const byAishe = await College.findOne({ aisheCode });
      if (byAishe) return byAishe;
    }

    // 2. Fallback to Name + District match (High Confidence)
    if (name && district) {
      const normalizedDistrict = this.normalizeDistrict(district);
      const slug = this.generateSlug(name, normalizedDistrict);
      
      const bySlug = await College.findOne({ slug });
      if (bySlug) return bySlug;

      // Fuzzy text search could be added here for "Needs Review" flagging
    }

    return null;
  }
}
