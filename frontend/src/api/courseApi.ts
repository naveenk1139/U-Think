import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface CourseDetailData {
  _id: string;
  name: string;
  slug: string;
  categoryId?: string;
  streamId?: string;
  duration?: string;
  eligibility?: string;
  description?: string;
  higherStudyArea?: string[];
  subjects?: string[];
  order?: number;
}

export const getCourseBySlug = async (slug: string): Promise<CourseDetailData> => {
  try {
    const response = await axios.get(`${API_URL}/courses/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

export const getRelatedCourses = async (streamId: string, limit: number = 4): Promise<CourseDetailData[]> => {
  try {
    // A more sophisticated app might use a query param on the courses endpoint
    // For now we assume we can fetch all courses and filter, or a real endpoint would do this
    const response = await axios.get(`${API_URL}/courses`);
    const allCourses: CourseDetailData[] = response.data;
    const related = allCourses
      .filter(c => c.streamId === streamId)
      .slice(0, limit);
    return related;
  } catch (error) {
    console.error('Error fetching related courses:', error);
    return [];
  }
};
