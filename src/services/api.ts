import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      localStorage.removeItem('auth_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (data: any) => api.post('/login', data),
};

export const userApi = {
  getProfile: () => api.get('/user'),
  updateProfile: (data: any) => api.put('/user', data),
};

export const workspaceApi = {
  getWorkspaces: () => api.get('/workspaces'),
};

export const statsApi = {
  getStats: () => api.get('/stats'),
};

export const notificationApi = {
  getNotifications: () => api.get('/notifications'),
};

export default api;
