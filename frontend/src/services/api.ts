import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },
  register: async (name: string, email: string, password: string) => {
    return api.post('/users/register', { name, email, password });
  },
  getCurrentUser: async () => {
    return api.get('/auth');
  },
};

export default api;
