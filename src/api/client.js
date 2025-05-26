// src/api/client.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://your-api-url.com';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
  withCredentials: false, // Set to true if using cookies
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add any additional headers or request modifications here
    return config;
  },
  (error) => {
    // Handle request errors
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Directly return the response data for cleaner usage
    return response.data;
  },
  (error) => {
    // Enhanced error handling
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Handle unauthorized errors
        localStorage.removeItem('accessToken');
        // Redirect to login or trigger refresh token flow
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      // Return a consistent error format
      return Promise.reject({
        message: data?.message || 'An error occurred',
        status,
        data,
      });
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        message: 'No response from server',
        isNetworkError: true,
      });
    } else {
      // Something happened in setting up the request
      return Promise.reject({
        message: error.message || 'Request setup error',
      });
    }
  }
);

export default axiosClient;