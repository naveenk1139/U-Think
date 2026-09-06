import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface After10thCategoryData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  possibleSubjects?: string[];
  majorDisciplines?: string[];
  combinations?: {
    name: string;
    subjects: string[];
  }[];
  duration?: string;
  eligibility?: string;
}

export interface After10thPathwayData {
  _id: string;
  name: string;
  slug: string;
  type: string;
  description?: string;
  eligibility?: string;
  duration?: string;
  status: string;
  categories: After10thCategoryData[];
}

export const getAfter10thTree = async (): Promise<After10thPathwayData[]> => {
  try {
    const response = await axios.get(`${API_URL}/after-10th/tree`);
    return response.data;
  } catch (error) {
    console.error('Error fetching After 10th tree:', error);
    throw error;
  }
};

export const getAfter10thPathway = async (slug: string): Promise<After10thPathwayData> => {
  try {
    const response = await axios.get(`${API_URL}/after-10th/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pathway ${slug}:`, error);
    throw error;
  }
};

export const searchAfter10th = async (query: string): Promise<any[]> => {
  if (!query) return [];
  try {
    const response = await axios.get(`${API_URL}/after-10th/search`, { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error searching After 10th:', error);
    return [];
  }
};
