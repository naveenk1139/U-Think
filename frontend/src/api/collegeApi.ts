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
  name: string;
  categories: string[];
  subCategory?: string;
  type: string;
  institutionType?: string;
  ownership?: string;
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
  nirfRank?: number;
  website: string;
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
}

export const fetchColleges = async (params?: Record<string, string | number>) => {
  const response = await api.get('/api/colleges', { params });
  return response.data; // Now returns { data: College[], pagination: {...} }
};

export const fetchCollegeById = async (id: string): Promise<College> => {
  const response = await api.get(`/api/colleges/${id}`);
  return response.data;
};

export const fetchCollegeStats = async (params?: Record<string, string | number>) => {
  const response = await api.get('/api/colleges/stats', { params });
  return response.data;
};

export const fetchAiRecommendations = async (userProfile: any, colleges: College[]) => {
  const response = await api.post('/api/colleges/recommend', { userProfile, colleges });
  return response.data.scores;
};
