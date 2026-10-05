import { IJob } from '../models/Job';
import { IUser } from '../models/User';

export interface MatchResult {
  score: number; // 0 to 100
  matchedSkills: string[];
  missingSkills: string[];
  rationale: string[];
}

class JobMatchService {
  private normalizeSkills(user: IUser): string[] {
    const directSkills = Array.isArray((user as any).skills) ? (user as any).skills : [];
    const structuredSkills = Array.isArray((user as any).intelligenceProfile?.structuredSkills)
      ? (user as any).intelligenceProfile.structuredSkills.map((s: any) => s?.skillName).filter(Boolean)
      : [];

    const all = [...directSkills, ...structuredSkills]
      .map((s: string) => (s || '').trim())
      .filter(Boolean);

    return Array.from(new Set(all));
  }
  
  public calculateMatch(user: IUser, job: IJob): MatchResult {
    let score = 0;

    // Weight allocation
    const skillWeight = 60;
    const locationWeight = 20;
    const roleWeight = 20;

    const rationale: string[] = [];
    
    // 1. Skill Match
    const userSkills = this.normalizeSkills(user);
    const normalizedUserSkills = userSkills.map(s => s.toLowerCase());
    const jobSkills = (job.skills || []).map(s => s.toLowerCase());

    const matchedSkills = userSkills.filter(s => jobSkills.includes(s.toLowerCase()));
    const missingSkills = jobSkills.filter(s => !normalizedUserSkills.includes(s));

    let skillScore = 0;
    if (userSkills.length === 0) {
       rationale.push('Complete your skills/profile to calculate a personalized match.');
    } else if (jobSkills.length > 0) {
       skillScore = (matchedSkills.length / jobSkills.length) * skillWeight;
       if (matchedSkills.length > 0) rationale.push(`✓ ${matchedSkills[0]} matches your skills`);
       else rationale.push('Add more role-specific skills to improve your match.');
    } else {
       skillScore = skillWeight * 0.5;
       rationale.push('Job listing has limited skill metadata.');
    }

    // 2. Location Match
    let locationScore = 0;
    const preferredLocationRaw = (user as any).preferredLocation;
    const preferredLocations = Array.isArray(preferredLocationRaw)
      ? preferredLocationRaw
      : (preferredLocationRaw ? [preferredLocationRaw] : []);
    const normalizedPreferredLocations = preferredLocations.map((loc: string) => String(loc).toLowerCase()).filter(Boolean);
    const jobLocation = (job.location || '').toLowerCase();
    const isLocationMatch = normalizedPreferredLocations.some((loc: string) => jobLocation.includes(loc));

    if (isLocationMatch) {
       locationScore = locationWeight;
       rationale.push(`✓ ${job.location} matches your location preference`);
    } else if ((job.workMode || '').toLowerCase() === 'remote') {
       locationScore = locationWeight;
       rationale.push(`✓ Remote work is available`);
    } else if (normalizedPreferredLocations.length === 0) {
       locationScore = locationWeight * 0.6;
       rationale.push('Add preferred locations for better location matching.');
    } else {
       locationScore = locationWeight * 0.5;
       rationale.push(`⚠ Location differs from your preference`);
    }

    // 3. Experience Match
    let roleScore = 0;
    const currentExp = String(
      (user as any).experienceLevel ||
      (((user as any).intelligenceProfile?.internshipCount || 0) > 0 ? 'Experienced' : 'Fresher')
    );
    if (!job.experienceLevel || job.experienceLevel === currentExp || currentExp === 'Not specified') {
       roleScore = roleWeight;
       rationale.push(`✓ Experience requirement matches`);
    } else {
       roleScore = roleWeight * 0.5;
       rationale.push(`⚠ Might require different experience level`);
    }

    score = userSkills.length > 0 ? Math.round(skillScore + locationScore + roleScore) : 0;

    return {
      score,
      matchedSkills,
      missingSkills,
      rationale
    };
  }

  public async parseResume(fileBuffer: Buffer, mimetype: string): Promise<string[]> {
    const supportedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!supportedTypes.includes(mimetype)) {
      throw new Error('Unsupported resume format.');
    }

    const text = fileBuffer.toString('utf8').replace(/\0/g, ' ').replace(/\s+/g, ' ').trim();
    if (!text || text.length < 50) {
      throw new Error('Unable to extract readable text from resume.');
    }

    const knownSkills = [
      'python', 'java', 'javascript', 'typescript', 'sql', 'mysql', 'postgresql', 'mongodb',
      'react', 'node.js', 'node', 'express', 'django', 'flask', 'spring', 'git', 'docker',
      'kubernetes', 'aws', 'azure', 'gcp', 'html', 'css', 'c++', 'c#', 'go', 'rust',
      'data analysis', 'machine learning', 'power bi', 'tableau', 'figma', 'excel'
    ];

    const lower = text.toLowerCase();
    const extracted = knownSkills
      .filter((skill) => {
        const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\ /g, '\\s+');
        return new RegExp(`\\b${escaped}\\b`, 'i').test(lower);
      })
      .map((skill) => skill.replace(/\b\w/g, (c) => c.toUpperCase()));

    const uniqueSkills = Array.from(new Set(extracted));
    if (uniqueSkills.length === 0) {
      throw new Error('No verifiable skills detected in resume.');
    }

    return uniqueSkills;
  }
}

export const jobMatchService = new JobMatchService();
