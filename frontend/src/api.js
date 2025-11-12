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
    // Use VITE_API_URL and ensure it includes /api/v1 only once
    return normalizeBase(import.meta.env.VITE_API_URL);
  }
  // Dev uses Vite proxy at /api -> rewritten to /api/v1
  return '/api';
};

// Get the public-facing URL for shortened links
export const getPublicUrl = (shortId) => {
  if (!shortId) {
    return "";
  }
  if (import.meta.env.MODE === 'production') {
    // In production, use the backend URL from environment variable
    const backendUrl = import.meta.env.VITE_API_URL || 'https://url-shortener-backend.7u2f.onrender.com';
    return `${backendUrl.replace(/\/+$/, '')}/api/v1/url/${shortId}`;
  }
  // In development, use localhost
  return `http://localhost:9000/api/v1/url/${shortId}`;
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
  redirectUrl: (shortId) => api.get(`/url/${shortId}`),
};

export default api;
