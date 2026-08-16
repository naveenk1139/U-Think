export type StreamType = '12th_intermediate' | 'diploma' | 'paramedical' | 'iti' | 'vocational';

export interface CourseDetail {
  name: string;
  duration: string;
  eligibility: string;
  description: string;
  branches: string[];
  careerProspects: string[];
}

export interface StreamInfo {
  id: StreamType;
  title: string;
  shortDesc: string;
  fullDesc: string;
  durationRange: string;
  pros: string[];
  cons: string[];
  courses: CourseDetail[];
}

export interface AptitudeQuestion {
  id: number;
  question: string;
  category: 'analytical' | 'technical' | 'creative' | 'social' | 'administrative';
  options: {
    text: string;
    scoreWeight: {
      '12th_intermediate'?: number;
      'diploma'?: number;
      'paramedical'?: number;
      'iti'?: number;
      'vocational'?: number;
    };
  }[];
}

export interface College {
  id: string;
  name: string;
  stream: StreamType;
  course: string;
  location: string;
  type: 'Government' | 'Private' | 'Government-Aided';
  duration: string;
  approxFeesPerYear: string;
  rating: number;
  description: string;
}

export interface JobProfile {
  id: string;
  title: string;
  stream: StreamType;
  averageSalary: string; // e.g. "₹3,00,000 - ₹5,00,000 / year"
  growthPotential: 'High' | 'Medium' | 'Steady';
  keySkills: string[];
  description: string;
  entryBarrier: 'Low' | 'Medium' | 'High';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  companyOrHospital: string;
  stream: StreamType;
  bio: string;
  avatarSeed: string; // for Dicebear or customizable profile UI
  expertQueryHint: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor' | 'system';
  text: string;
  timestamp: string;
}
export interface Job {
  jobId: string;
  source: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workMode: string;
  employmentType: string;
  experienceLevel: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: string;
  skills: string[];
  qualifications: string[];
  description: string;
  postedAt: string;
  applicationDeadline?: string;
  applicationUrl?: string;
  sourceUrl: string;
  verified: boolean;
  matchAnalysis?: {
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
    feedback: string;
  }
}
