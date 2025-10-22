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

const getBaseUrl = () => {
  if (import.meta.env.MODE === 'production') {
    // Use VITE_API_URL and ensure it includes /api/v1 only once
    return normalizeBase(import.meta.env.VITE_API_URL);
  }
  // Dev uses Vite proxy at /api -> rewritten to /api/v1
  return '/api';
};

// Create the API instance
const API_BASE_URL = getBaseUrl();
const api = createApiInstance(API_BASE_URL);

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
  redirectUrl: (shortId) => api.get(`/url/${shortId}`),
};

export default api;
