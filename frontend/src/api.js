// // Simple API file for backend calls
// import axios from "axios";

// const API_BASE_URL = "http://localhost:9000/api/v1";

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // Important for cookie-based auth
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Authentication API calls
// export const authAPI = {
//   register: (userData) => api.post("/auth/register", userData),
//   login: (credentials) => api.post("/auth/login", credentials),
//   logout: () => api.post("/auth/logout"),
//   getProfile: () => api.get("/auth/profile"),
//   refreshToken: () => api.post("/auth/refresh-token"),
// };

// // URL API calls
// export const urlAPI = {
//   createShortUrl: (urlData) => api.post("/url", urlData),
//   getUserUrls: () => api.get("/url/myurls/direct"),
//   getUrlAnalytics: (shortId) => api.get(`/url/${shortId}/analytics`),
//   redirectUrl: (shortId) => api.get(`/url/redirect/${shortId}`),
// };

// export default api;








// // src/api.js
// import axios from "axios";

// // Function to determine the base URL
// const getBaseUrl = () => {
//   // For production (when deployed)
//   if (import.meta.env.MODE === 'production') {
//     // Use the production API URL from environment variables
//     return import.meta.env.VITE_API_URL || window.location.origin;
//   }

//   // For development
//   return import.meta.env.VITE_API_URL || 'http://localhost:9000';
// };

// const API_BASE_URL = `${getBaseUrl()}/api/v1`;

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // Important for cookie-based auth
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Authentication API calls
// export const authAPI = {
//   register: (userData) => api.post("/auth/register", userData),
//   login: (credentials) => api.post("/auth/login", credentials),
//   logout: () => api.post("/auth/logout"),
//   getProfile: () => api.get("/auth/profile"),
//   refreshToken: () => api.post("/auth/refresh-token"),
// };

// // URL API calls
// export const urlAPI = {
//   createShortUrl: (urlData) => api.post("/url", urlData),
//   getUserUrls: () => api.get("/url/myurls/direct"),
//   getUrlAnalytics: (shortId) => api.get(`/url/${shortId}/analytics`),
//   redirectUrl: (shortId) => api.get(`/url/${shortId}`),
// };

// export default api;







// src/api.js
import axios from "axios";

// Create axios instance with base configuration
const createApiInstance = (baseURL) => {
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Determine the base URL based on environment
const normalizeBase = (url) => {
  if (!url) return '';
  const trimmed = url.replace(/\/+$/, '');
  return trimmed.endsWith('/api/v1') ? trimmed : `${trimmed}/api/v1`;
};

// Get the API base URL for axios requests
const getBaseUrl = () => {
  if (import.meta.env.MODE === 'production') {
    // In production, VITE_API_URL is required
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      console.error('VITE_API_URL is not set in production! API calls will fail.');
      // Fallback: try to construct from current origin (won't work for most deployments)
      return '/api/v1';
    }
    return normalizeBase(apiUrl);
  }
  // Dev uses Vite proxy at /api -> rewritten to /api/v1
  return '/api';
};

// Get the public-facing URL for shortened links (frontend URL, not backend)
export const getPublicUrl = (shortId) => {
  if (!shortId) {
    return "";
  }
  // Use the frontend URL (window.location.origin) for short URLs
  // This ensures short URLs point to the frontend, which will handle the redirect
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
  return `${frontendUrl.replace(/\/+$/, '')}/${shortId}`;
};

// Create the API instance
const API_BASE_URL = getBaseUrl();
const api = createApiInstance(API_BASE_URL);

// --- Automatic refresh token handling -------------------------------------------------
let isRefreshing = false;
const refreshQueue = [];

const enqueueRequest = (resolve, reject, config) => {
  refreshQueue.push({ resolve, reject, config });
};

const processQueue = (error = null) => {
  while (refreshQueue.length) {
    const { resolve, reject, config } = refreshQueue.shift();
    if (error) {
      reject(error);
    } else {
      resolve(api(config));
    }
  }
};

const shouldBypassRefresh = (config) => {
  const bypassPaths = ["/auth/login", "/auth/register", "/auth/refresh-token"];
  return bypassPaths.some((path) => config?.url?.includes(path)) || config?.skipAuthRefresh;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, config } = error;

    if (!response || !config || response.status !== 401 || shouldBypassRefresh(config) || config._retry) {
      return Promise.reject(error);
    }

    const originalRequest = { ...config };
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        enqueueRequest(resolve, reject, originalRequest);
      });
    }

    isRefreshing = true;

    return new Promise((resolve, reject) => {
      api
        .post("/auth/refresh-token", {}, { skipAuthRefresh: true })
        .then(() => {
          processQueue();
          resolve(api(originalRequest));
        })
        .catch((refreshError) => {
          processQueue(refreshError);
          reject(refreshError);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  }
);

// Authentication API calls
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  getProfile: () => api.get("/auth/profile"),
  refreshToken: () => api.post("/auth/refresh-token"),
};

// URL API calls
export const urlAPI = {
  createShortUrl: (urlData) => api.post("/url", urlData),
  getUserUrls: () => api.get("/url/myurls/direct"),
  getUrlAnalytics: (shortId) => api.get(`/url/${shortId}/analytics`),
  getOriginalUrl: (shortId) => api.get(`/url/${shortId}/original`),
  redirectUrl: (shortId) => api.get(`/url/${shortId}`),
};

export default api;
