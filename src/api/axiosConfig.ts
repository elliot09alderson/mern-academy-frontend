import axios from 'axios';

// Base URL for API - use environment variable or default
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5003/api';

// Create centralized axios instance with cookie credentials
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // Essential for sending/receiving cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Cookies are automatically sent with withCredentials: true
    // No need to manually add Authorization header
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - session expired or not authenticated
      console.error('Unauthorized - session expired');
      // Redirect to login page
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden - insufficient permissions
      console.error('Forbidden - insufficient permissions');
    } else if (error.response?.status >= 500) {
      // Server errors
      console.error('Server error - please try again later');
    }

    return Promise.reject(error);
  }
);

export default api;