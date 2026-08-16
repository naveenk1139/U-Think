import { IJob } from '../models/Job';
import { IUser } from '../models/User';

export interface MatchResult {
  score: number; // 0 to 100
  matchedSkills: string[];
  missingSkills: string[];
  feedback: string;
}

class JobMatchService {
  
  public calculateMatch(user: IUser, job: IJob): MatchResult {
    let score = 0;
    const maxScore = 100;

    // Weight allocation
    const skillWeight = 60;
    const locationWeight = 20;
    const roleWeight = 20;

    // 1. Skill Match
    // In a real scenario, we'd have a normalized skills array on the user profile.
    // Assuming user has a `bio` or we extract skills from their profile.
    // For this example, let's say the user object has a `skills` string array (we'll need to add it or derive it).
    // Let's assume we pass user skills explicitly if they aren't on the model yet.
    
    // For now, let's extract user skills from a hypothetical `skills` array on user
    // or just mock it if not present.
    const userSkills: string[] = (user as any).skills || []; 
    const jobSkills = job.skills.map(s => s.toLowerCase());

    const matchedSkills = userSkills.filter(s => jobSkills.includes(s.toLowerCase()));
    const missingSkills = jobSkills.filter(s => !userSkills.map(us => us.toLowerCase()).includes(s));

    let skillScore = 0;
    if (jobSkills.length > 0) {
       skillScore = (matchedSkills.length / jobSkills.length) * skillWeight;
    } else {
       skillScore = skillWeight; // If no skills required, full points
    }

    // 2. Location Match
    let locationScore = 0;
    const preferredLocation = (user as any).preferredLocation?.toLowerCase() || '';
    if (preferredLocation && job.location.toLowerCase().includes(preferredLocation)) {
       locationScore = locationWeight;
    } else if (job.workMode.toLowerCase() === 'remote') {
       locationScore = locationWeight;
    } else if (!preferredLocation) {
       locationScore = locationWeight * 0.5; // neutral
    }

    // 3. Role/Title Match (Basic check)
    let roleScore = 0;
    const currentRole = (user as any).currentRole?.toLowerCase() || '';
    if (currentRole && job.title.toLowerCase().includes(currentRole)) {
       roleScore = roleWeight;
    } else {
       roleScore = roleWeight * 0.5;
    }

    score = Math.round(skillScore + locationScore + roleScore);

    // Feedback generation
    let feedback = '';
    if (score >= 85) {
      feedback = 'You are a strong match.';
    } else if (score >= 60) {
      feedback = 'You are a good match, but could improve your skills.';
    } else {
      feedback = 'This role might require more preparation.';
    }

    if (missingSkills.length > 0) {
      feedback += ` Learning ${missingSkills.slice(0, 2).join(' and ')} could improve your match score.`;
    }

    return {
      score,
      matchedSkills,
      missingSkills,
      feedback
    };
  }

  public async parseResume(fileBuffer: Buffer, mimetype: string): Promise<string[]> {
    // In a real app, you would send this buffer to Gemini or an OCR service
    // For now, return some mocked extracted skills
    return ['Python', 'SQL', 'Git', 'React', 'TypeScript'];
  }
}

export const jobMatchService = new JobMatchService();
