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
  nirfRank?: number;
  sourceId?: string;
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
    canonical_slug: string;
    exam_name: string;
    short_name?: string;
    status: 'ACTIVE' | 'DISCONTINUED' | 'MERGED';
    education_level: 'AFTER_10TH' | 'AFTER_12TH' | 'UNDERGRADUATE' | 'AFTER_DEGREE' | 'POSTGRADUATE' | 'PROFESSIONAL' | 'RESEARCH' | 'OTHER';
    minimum_education: string;
    streams: string[];
    exam_categories: string[];
    exam_type: string;
    ownership: string;
    conducting_body: string;
    official_website?: string;
    official_application_url?: string;
    official_information_url?: string;
    description?: string;
    eligibility: string;
    age_min?: number;
    age_max?: number;
    attempt_limit?: number;
    nationality_requirement?: string;
    reservation_information?: string;
    exam_mode: string[];
    exam_frequency: string;
    exam_pattern?: string;
    syllabus_url?: string;
    admit_card_url?: string;
    result_url?: string;
    counselling_url?: string;
    target_courses: string[];
    target_degrees: string[];
    target_institutions?: string[];
    source_name?: string;
    source_url?: string;
    last_verified_at?: string;
    verification_status: string;
    
    // Virtual or nested for UI
    recommendation_reason?: string;
    years?: ExamYear[];
}

export interface ExamYear {
    _id: string;
    exam_id: string;
    year: number;
    registration_start?: string;
    registration_end?: string;
    correction_window_start?: string;
    correction_window_end?: string;
    admit_card_date?: string;
    exam_start?: string;
    exam_end?: string;
    answer_key_date?: string;
    result_date?: string;
    counselling_start?: string;
    counselling_end?: string;
    official_notification_date?: string;
    status: 'CONFIRMED' | 'TENTATIVE' | 'EXPECTED' | 'NOT_ANNOUNCED' | 'CLOSED';
    source_name?: string;
    source_url?: string;
}

export interface StructuredDegree {
  _id: string;
  degreeId: string;
  slug: string;
  name: string;
  short_name?: string;
  level: string;
  category: string;
  duration: number;
  duration_unit: string;
  overview: string;
  stream?: string;
  discipline?: string;
  mode?: string[];
  entrance_required?: boolean;
  admissionRoutes?: string[];
  subjects?: string[];
  careers?: string[];
  higherStudies?: string[];
  eligibility?: {
    qualification?: string;
    details?: string;
  };
}
