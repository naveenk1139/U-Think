import axios from 'axios';

// Base Axios instance — all API calls go through here.
// In development, Vite proxies /api/* to http://localhost:5000
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach MongoDB JWT token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('uthink_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Attach current language for backend AI translation layer
    const lang = localStorage.getItem('i18nextLng') || 'en';
    config.headers['x-language'] = lang;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — surface backend error messages cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || 'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

const cache = new Map<string, { timestamp: number; data: any; promise?: Promise<any> }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const originalGet = api.get;

api.get = async <T = any, R = any, D = any>(url: string, config?: any): Promise<any> => {
  if (config?.headers?.['x-no-cache']) {
    return originalGet.call(api, url, config);
  }

  const token = localStorage.getItem('uthink_token') || '';
  const cacheKey = url + (config?.params ? JSON.stringify(config.params) : '') + token;
  const cached = cache.get(cacheKey);
  const now = Date.now();

  if (cached && (now - cached.timestamp < CACHE_TTL) && !cached.promise) {
    return Promise.resolve({ data: cached.data, status: 200, statusText: 'OK', headers: {}, config: config || {} });
  }

  if (cached && cached.promise) {
    const res = await cached.promise;
    return { data: res, status: 200, statusText: 'OK', headers: {}, config: config || {} };
  }

  const requestPromise = originalGet.call(api, url, config).then((response: any) => {
    cache.set(cacheKey, { timestamp: Date.now(), data: response.data });
    return response.data;
  }).catch((error: any) => {
    cache.delete(cacheKey);
    throw error;
  });

  cache.set(cacheKey, { timestamp: now, data: null, promise: requestPromise });

  const data = await requestPromise;
  return { data, status: 200, statusText: 'OK', headers: {}, config: config || {} };
};

export default api;
