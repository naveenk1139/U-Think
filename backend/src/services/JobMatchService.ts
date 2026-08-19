import { IJob } from '../models/Job';
import { IUser } from '../models/User';

export interface MatchResult {
  score: number; // 0 to 100
  matchedSkills: string[];
  missingSkills: string[];
  rationale: string[];
}

class JobMatchService {
  
  public calculateMatch(user: IUser, job: IJob): MatchResult {
    let score = 0;
    const maxScore = 100;

    // Weight allocation
    const skillWeight = 60;
    const locationWeight = 20;
    const roleWeight = 20;

    const rationale: string[] = [];
    
    // 1. Skill Match
    const userSkills: string[] = (user as any).skills || ['Python', 'Java', 'SQL']; // Mock default for now if empty
    const jobSkills = job.skills.map(s => s.toLowerCase());

    const matchedSkills = userSkills.filter(s => jobSkills.includes(s.toLowerCase()));
    const missingSkills = jobSkills.filter(s => !userSkills.map(us => us.toLowerCase()).includes(s));

    let skillScore = 0;
    if (jobSkills.length > 0) {
       skillScore = (matchedSkills.length / jobSkills.length) * skillWeight;
       if (matchedSkills.length > 0) rationale.push(`✓ ${matchedSkills[0]} matches your skills`);
    } else {
       skillScore = skillWeight; 
    }

    // 2. Location Match
    let locationScore = 0;
    const preferredLocation = (user as any).preferredLocation?.toLowerCase() || 'bengaluru';
    if (job.location.toLowerCase().includes(preferredLocation)) {
       locationScore = locationWeight;
       rationale.push(`✓ ${job.location} matches your preference`);
    } else if (job.workMode.toLowerCase() === 'remote') {
       locationScore = locationWeight;
       rationale.push(`✓ Remote work is available`);
    } else {
       locationScore = locationWeight * 0.5;
       rationale.push(`⚠ Location differs from your preference`);
    }

    // 3. Experience Match
    let roleScore = 0;
    const currentExp = (user as any).experienceLevel || 'Fresher';
    if (job.experienceLevel === currentExp || currentExp === 'Not specified') {
       roleScore = roleWeight;
       rationale.push(`✓ Experience requirement matches`);
    } else {
       roleScore = roleWeight * 0.5;
       rationale.push(`⚠ Might require different experience level`);
    }

    score = Math.round(skillScore + locationScore + roleScore);

    return {
      score,
      matchedSkills,
      missingSkills,
      rationale
    };
  }

  public async parseResume(fileBuffer: Buffer, mimetype: string): Promise<string[]> {
    // In a real app, you would send this buffer to Gemini or an OCR service
    // For now, return some mocked extracted skills
    return ['Python', 'SQL', 'Git', 'React', 'TypeScript'];
  }
}

export const jobMatchService = new JobMatchService();
