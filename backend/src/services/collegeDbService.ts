import axios from 'axios';
import College from '../models/College';

const COLLEGEDB_API_URL = 'https://api.collegedb.in/v1';

const apiClient = axios.create({
  baseURL: COLLEGEDB_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add auth token dynamically
apiClient.interceptors.request.use((config) => {
  if (process.env.COLLEGEDB_API_KEY) {
    config.headers.Authorization = `Bearer ${process.env.COLLEGEDB_API_KEY}`;
  }
  return config;
});

const mapParams = (params: any) => {
  const apiParams: any = {
    state: params.state || 'Karnataka',
  };

  if (params.q) apiParams.search = params.q;
  if (params.district && params.district !== 'Any District' && params.district !== 'Any State') apiParams.district = params.district;
  if (params.city) apiParams.city = params.city;
  if (params.category && params.category !== 'All') apiParams.category = params.category;
  if (params.type && params.type !== 'All') apiParams.type = params.type;
  if (params.page) apiParams.page = params.page;
  if (params.limit) apiParams.limit = params.limit;
  if (params.pageSize) apiParams.pageSize = params.pageSize;

  return apiParams;
};

const normalizeCollege = (apiCollege: any) => {
  return {
    source: 'collegedb',
    sourceId: String(apiCollege.id || apiCollege._id || apiCollege.collegeId || Math.random().toString()),
    name: apiCollege.name,
    aliases: apiCollege.aliases || [],
    categories: apiCollege.categories || [apiCollege.category].filter(Boolean),
    type: apiCollege.type || apiCollege.institutionType || 'Private',
    state: apiCollege.state || 'Karnataka',
    district: apiCollege.district || 'Unknown',
    city: apiCollege.city || 'Unknown',
    address: apiCollege.address,
    pincode: apiCollege.pincode,
    universityAffiliation: apiCollege.university || apiCollege.universityAffiliation,
    establishedYear: apiCollege.establishedYear,
    courses: apiCollege.courses || [],
    specializations: apiCollege.specializations || [],
    fees: apiCollege.fees || {},
    placement: apiCollege.placement || {},
    accreditation: apiCollege.accreditation,
    nirfRank: apiCollege.nirfRank,
    website: apiCollege.website,
    latitude: apiCollege.location?.lat || apiCollege.latitude,
    longitude: apiCollege.location?.lng || apiCollege.longitude,
    image: apiCollege.image,
    sourceUrl: apiCollege.sourceUrl || `https://api.collegedb.in/colleges/${apiCollege.id || apiCollege._id}`,
    lastVerifiedAt: new Date(),
    isVerified: true
  };
};

export const searchCollegesFromAPI = async (params: any) => {
  try {
    const apiParams = mapParams(params);
    const hasSearchQuery = apiParams.search && apiParams.search.length >= 2;
    const endpoint = hasSearchQuery ? '/colleges/search' : '/colleges';
    
    const response = await apiClient.get(endpoint, { params: apiParams });
    const rawData = response.data.results || response.data.data || response.data;
    const total = response.data.total || (Array.isArray(rawData) ? rawData.length : 0);
    
    if (!Array.isArray(rawData)) {
      return { colleges: [], total: 0 };
    }

    const normalizedColleges = rawData.map(normalizeCollege);
    await syncCollegesToDB(normalizedColleges);
    
    return { colleges: normalizedColleges, total };
  } catch (error) {
    console.error('Error fetching from CollegeDB API:', error);
    return { colleges: [], total: 0 };
  }
};

export const syncCollegesToDB = async (colleges: any[]) => {
  if (!colleges || colleges.length === 0) return;
  
  const bulkOps = colleges.map(college => ({
    updateOne: {
      filter: { source: 'collegedb', sourceId: college.sourceId },
      update: { $set: college },
      upsert: true
    }
  }));

  try {
    await College.bulkWrite(bulkOps, { ordered: false });
  } catch (error) {
    console.error('Error syncing colleges to MongoDB:', error);
  }
};
