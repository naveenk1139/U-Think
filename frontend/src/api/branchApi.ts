import api from './axios';

export interface CareerData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  industry?: string;
  salaryRange?: string;
  skills: string[];
}

export interface CollegeData {
  _id: string;
  name: string;
  slug: string;
  location?: { city?: string; state?: string };
  type?: string;
  rating?: number;
}

export interface BranchDetailData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  duration?: string;
  eligibility?: string;
  requiredSubjects?: string[];
  averageFees?: string;
  requiredSkills?: string[];
  courseId: {
    _id: string;
    name: string;
    slug: string;
  };
  relatedCareers: CareerData[];
  colleges?: CollegeData[];
}

export const getBranchBySlug = (slug: string): Promise<BranchDetailData> =>
  api.get<BranchDetailData>(`/api/branches/${slug}`).then((r) => r.data);
