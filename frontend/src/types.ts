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
    rationale: string[];
  }
}

export interface AssessmentOption {
  _id: string;
  text: string;
  dimensionWeights: Record<string, number>;
}

// Ensure the old AptitudeQuestion doesn't clash if it's there. The old one is in types.ts
// I'll name this one AICareerQuestion to be safe if AptitudeQuestion already exists.
export interface AICareerQuestion {
  _id: string;
  questionText: string;
  category: string;
  targetEducationLevels: string[];
  options: AssessmentOption[];
}

export interface CareerProfile {
  _id: string;
  careerName: string;
  description: string;
  targetEducationLevels: string[];
  requiredDimensions: Record<string, number>;
  recommendedCourses: string[];
  entranceExams: string[];
  roadmap: string[];
}

export interface AssessmentResult {
  _id: string;
  userId: string;
  attemptId: string;
  educationLevel: string;
  finalScores: Record<string, number>;
  topMatches: {
    careerId: CareerProfile;
    careerName: string;
    matchScore: number;
    matchRationale: string;
  }[];
  recommendedStreams: string[];
  recommendedCourses: string[];
  aiAnalysisText: string;
  strengths: string[];
  areasToImprove: string[];
}

export interface StructuredMentor {
  _id: string;
  mentorId: string;
  name: string;
  profilePhoto?: string;
  jobTitle: string;
  company: string;
  industry: string;
  education: string;
  specialization: string;
  experience: string;
  location: string;
  educationLevels: string[];
  streams: string[];
  courses: string[];
  branches: string[];
  skills: string[];
  careerAreas: string[];
  bio: string;
  availability: 'Available' | 'Busy' | 'Offline';
  verified: boolean;
  mentorType: 'REAL' | 'AI';
}

export interface StructuredExam {
  _id: string;
  examId: string;
  name: string;
  level: string;
  educationLevel: string[];
  category: string;
  type: string;
  ugPg: string;
  streams: string[];
  courses: string[];
  subjects: string[];
  eligibility: {
    qualification: string;
    ageCriteria: string;
    details: string;
  };
  importantDates: {
    applicationStart: string;
    applicationEnd: string;
    examDate: string;
    resultDate: string;
  };
  officialWebsite: string;
  lastUpdated: string;
  conductingBody: string;
  examMode: string;
  applicationProcess: string;
  acceptedFor: string;
  status: 'Active' | 'Discontinued' | 'TBA';
}

export interface StructuredDegree {
  _id: string;
  degreeId: string;
  name: string;
  level: string;
  category: string;
  duration: string;
  eligibility: {
    qualification: string;
    details: string;
  };
  admissionRoutes: string[];
  subjects: string[];
  specializations: string[];
  careers: string[];
  higherStudies: string[];
  overview: string;
}
