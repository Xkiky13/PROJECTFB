import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor untuk JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Register
export const register = async (nama, username, email, password, passwordConfirm) => {
  try {
    const response = await api.post('/auth/register', {
      nama,
      username,
      email,
      password,
      passwordConfirm
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error saat register' };
  }
};

// Login
export const login = async (emailOrUsername, password) => {
  try {
    const response = await api.post('/auth/login', {
      emailOrUsername,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error saat login' };
  }
};

// Get Profile
export const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error saat mengambil profile' };
  }
};

export default api;
