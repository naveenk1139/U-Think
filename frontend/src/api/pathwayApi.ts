import api from './axios';

export interface SavedPathway {
  _id: string;
  userId: string;
  specId: string;
  specName: string;
  notes?: string;
  createdAt: string;
}

export interface TradeData {
  _id: string;
  name: string;
  slug: string;
  duration?: string;
  eligibility?: string;
  minimumQualification?: string;
  admissionMethod?: string;
  apprenticeshipOpportunities?: boolean;
}

export interface SubjectData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface SubjectCombinationData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  duration?: string;
  eligibility?: string;
  subjects: SubjectData[];
  ugCourses?: UGCourseData[];
}

export interface SpecializationData {
  _id: string;
  name: string;
  slug: string;
}

export interface CollegeData {
  _id: string;
  name: string;
  slug: string;
  type?: string;
}

export interface BranchData {
  _id: string;
  courseId: string;
  name: string;
  slug: string;
  description?: string;
  relatedCareers: { _id: string; name: string; slug: string }[];
  relatedExams: { _id: string; name: string; slug: string }[];
  higherStudies: { _id: string; name: string; slug: string }[];
  furtherStudies?: { _id: string; name: string; slug: string }[];
  specializations?: SpecializationData[];
  colleges?: CollegeData[];
}

export interface UGCourseData {
  _id: string;
  name: string;
  slug: string;
  higherStudyArea?: string;
  branches: BranchData[];
}

export interface CourseData {
  _id: string;
  streamId: string;
  name: string;
  slug: string;
  courseLevel?: string;
  entranceRequired?: boolean;
  sourceName?: string;
  description?: string;
  branches?: BranchData[];
  duration?: string;
  subjects?: string[];
  ugCourses?: UGCourseData[];
}

export interface StreamData {
  _id: string;
  pathwayId: string;
  name: string;
  slug: string;
  description?: string;
  duration?: string;
  typicalStructure?: string[];
  courseCount?: number;
  comboCount?: number;
  tradeCount?: number;
  subjectCombinations?: SubjectCombinationData[];
  courses?: CourseData[];
  trades?: TradeData[];
}

export interface PathwayData {
  _id: string;
  educationLevelId: string;
  name: string;
  slug: string;
  description?: string;
  duration?: string;
  streams: StreamData[];
}

export interface EducationLevelData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  pathways: PathwayData[];
}

export interface PathwayStats {
  pathways: number;
  streams: number;
  subjectCombinations: number;
  subjects: number;
  courses: number;
  branches: number;
  careers: number;
  colleges: number;
  exams: number;
  jobs: number;
}

export const getPathwayTree = (levelSlug?: string): Promise<EducationLevelData[]> =>
  api.get<EducationLevelData[]>('/api/education-catalog', { params: { levelSlug } }).then((r) => r.data);

export const getStreamDetails = async (streamId: string): Promise<StreamData> => {
  const response = await api.get(`/api/pathways/tree?streamSlug=${streamId}`);
  return response.data;
};

export const searchPathways = async (query: string): Promise<any[]> => {
  if (!query) return [];
  const response = await api.get(`/api/pathways/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

export const getFilteredPathways = (search?: string, streamId?: string, courseId?: string): Promise<BranchData[]> =>
  api.get<BranchData[]>('/api/education-catalog/search', { params: { search, streamId, courseId } }).then((r) => r.data);

export const getPathwayStats = (levelSlug?: string): Promise<PathwayStats> =>
  api.get<PathwayStats>('/api/education-catalog/stats', { params: { levelSlug } }).then((r) => r.data);

export const getSavedPathways = (): Promise<SavedPathway[]> =>
  api.get<SavedPathway[]>('/api/pathways').then((r) => r.data);

export const savePathway = (pathway: Omit<SavedPathway, '_id' | 'userId' | 'createdAt'>): Promise<SavedPathway> =>
  api.post<SavedPathway>('/api/pathways', pathway).then((r) => r.data);

export const deletePathway = (id: string): Promise<void> =>
  api.delete(`/api/pathways/${id}`).then(() => undefined);
