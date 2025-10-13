import axios from 'axios';

// Base URL for API
const BASE_URL = 'http://localhost:5003/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens or headers here if needed
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
      // Unauthorized - redirect to login or clear auth state
      console.log('Unauthorized - redirecting to login');
    } else if (error.response?.status === 403) {
      // Forbidden
      console.log('Forbidden - insufficient permissions');
    } else if (error.response?.status >= 500) {
      // Server errors
      console.log('Server error - please try again later');
    }

    return Promise.reject(error);
  }
);

export default api;