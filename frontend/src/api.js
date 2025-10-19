// Simple API file for backend calls
import axios from "axios";

const API_BASE_URL = "http://localhost:9000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookie-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

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
  redirectUrl: (shortId) => api.get(`/url/redirect/${shortId}`),
};

export default api;
