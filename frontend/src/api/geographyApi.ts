import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface StateData {
  _id: string;
  name: string;
  slug: string;
  code: string;
  country: string;
}

export interface DistrictData {
  _id: string;
  name: string;
  slug: string;
  division?: string;
  stateId: string;
}

export interface TalukData {
  _id: string;
  name: string;
  slug: string;
  districtId: string;
}

export interface CityData {
  _id: string;
  name: string;
  slug: string;
  districtId: string;
  talukId?: string;
}

export const getStates = async (): Promise<StateData[]> => {
  const response = await axios.get(`${API_URL}/geography/states`);
  return response.data;
};

export const getDistricts = async (stateId?: string): Promise<DistrictData[]> => {
  const response = await axios.get(`${API_URL}/geography/districts`, { params: { stateId } });
  return response.data;
};

export const getTaluks = async (districtId?: string): Promise<TalukData[]> => {
  const response = await axios.get(`${API_URL}/geography/taluks`, { params: { districtId } });
  return response.data;
};

export const getCities = async (districtId?: string, talukId?: string): Promise<CityData[]> => {
  const response = await axios.get(`${API_URL}/geography/cities`, { params: { districtId, talukId } });
  return response.data;
};
