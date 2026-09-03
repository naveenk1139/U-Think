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
  description?: string;
  duration?: string;
  eligibility?: string;
  minimumQualification?: string;
  admissionMethod?: string;
  apprenticeshipOpportunities?: boolean;
  careerOpportunities?: string[];
  averageStartingSalary?: string;
}

export interface SubjectData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  syllabusWeightage?: string;
  practicalComponent?: string;
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
  city?: string;
  district?: string;
  ownership?: string;
}

export interface BranchData {
  _id: string;
  courseId: string;
  name: string;
  slug: string;
  description?: string;
  duration?: string;
  eligibility?: string;
  averageFees?: string;
  careerOpportunities?: string[];
  specializations?: string[];
  exampleInstitutions?: string[];
  requiredSkills?: string[];
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
  eligibility?: string;
  higherStudyArea?: string;
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
  branches?: BranchData[];
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
  const response = await api.get(`/api/education-catalog?streamSlug=${streamId}`);
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

export interface ExamScheduleData {
  _id: string;
  streamId?: string;
  examType: string;
  subjectName: string;
  date: string;
  time: string;
}

export const getExamSchedule = async (streamId?: string): Promise<ExamScheduleData[]> => {
  let url = '/api/exams/schedule';
  if (streamId) { url += '?streamId=' + streamId; }
  const response = await api.get(url);
  return response.data;
};
