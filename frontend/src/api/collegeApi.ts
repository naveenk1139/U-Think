import axios from 'axios';

// Get the backend URL depending on the environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface College {
  _id: string;
  slug: string;
  name: string;
  categories: string[];
  subCategory?: string;
  type: string;
  institutionType?: string;
  institutionCategory?: string;
  ownership?: string;
  ownershipType?: string;
  managementType?: string;
  aisheCode?: string;
  state: string;
  district: string;
  city: string;
  taluk?: string;
  address: string;
  pincode?: string;
  universityAffiliation: string;
  approvalBody?: string;
  establishedYear: number;
  courses: string[];
  programs?: string[];
  specializations: string[];
  description?: string;
  facilities?: string[];
  admissionProcess: string;
  admissionLink?: string;
  entranceExams: string[];
  eligibility: string;
  fees: {
    tuition: string;
    hostel: string;
    other: string;
  };
  hostelAvailable: boolean;
  scholarshipsAvailable: boolean;
  placement: {
    percentage: number;
    highestPackage: string;
    avgPackage: string;
    topRecruiters: string[];
  };
  accreditation: string;
  website: string;
  officialWebsiteUrl?: string;
  websiteVerified?: boolean;
  websiteSource?: string;
  websiteVerifiedAt?: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  image: string;
  logo: string;
  sourceName?: string;
  sourceUrl?: string;
  verifiedAt?: string;
  isVerified?: boolean;
  verificationStatus?: string;
  nirfRank?: number;
  sourceId?: string;
}

export interface CollegeCourse {
  _id: string;
  collegeId: string;
  courseId?: any;
  branchId?: any;
  entranceExamIds?: any[];
  entranceExamId?: any;
  courseName?: string;
  degreeName?: string;
  branchName?: string;
  duration?: string;
  mode?: string;
  fees?: string;
  academicYear: string;
  intake?: number;
  eligibility?: string;
  programType?: string;
  admissionMethod?: string;
  sourceUrl?: string;
}

export interface FeeRecord {
  _id: string;
  institution_id: string;
  degree_id?: any;
  academic_year: string;
  fee_type: string;
  tuition_fee?: number;
  admission_fee?: number;
  total_fee: number;
  frequency: string;
  quota?: string;
  seat_type?: string;
  source_name?: string;
}

export const fetchColleges = async (params?: Record<string, string | number>) => {
  const response = await api.get('/api/colleges', { params });
  return response.data; // Now returns { data: College[], pagination: {...} }
};

export const fetchCollegeByIdOrSlug = async (idOrSlug: string): Promise<College> => {
  const response = await api.get(`/api/colleges/${idOrSlug}`);
  return response.data;
};

export const fetchCollegeCourses = async (idOrSlug: string): Promise<CollegeCourse[]> => {
  const response = await api.get(`/api/colleges/${idOrSlug}/courses`);
  return response.data;
};

export const fetchCollegeFees = async (idOrSlug: string): Promise<FeeRecord[]> => {
  const response = await api.get(`/api/colleges/${idOrSlug}/fees`);
  return response.data;
};

export const fetchCollegeStats = async (params?: Record<string, string | number>) => {
  const response = await api.get('/api/colleges/stats', { params });
  return response.data;
};

export const fetchDistrictStats = async () => {
  const response = await api.get('/api/colleges/district-stats');
  return response.data;
};

export const fetchFilterOptions = async () => {
  const response = await api.get('/api/colleges/filter-options');
  return response.data;
};

export const fetchDistricts = async () => {
  const response = await api.get('/api/colleges/districts');
  return response.data;
};

export const fetchTaluks = async (districtId?: string) => {
  const response = await api.get('/api/colleges/taluks', { params: { districtId } });
  return response.data;
};

export const fetchCoursesList = async () => {
  const response = await api.get('/api/colleges/courses-list');
  return response.data;
};

export const fetchAiRecommendations = async (userProfile: any, colleges: College[]) => {
  const response = await api.post('/api/colleges/recommend', { userProfile, colleges });
  return response.data.scores;
};
