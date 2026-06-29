import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000
});

export const authStorage = {
  getToken: () => localStorage.getItem('aoi_auth_token'),
  setToken: (token) => localStorage.setItem('aoi_auth_token', token),
  clearToken: () => localStorage.removeItem('aoi_auth_token')
};

API.interceptors.request.use(config => {
  const token = authStorage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      authStorage.clearToken();
      window.dispatchEvent(new Event('aoi-auth-expired'));
    }
    const serverMessage = error.response?.data?.error;
    if (serverMessage) error.message = serverMessage;
    else if (!error.response) error.message = 'Cannot reach the server. Check that the backend is running.';
    return Promise.reject(error);
  }
);

export const apiService = {
  // Auth APIs
  login: (credentials) => API.post('/auth/login', credentials),
  logout: () => API.post('/auth/logout'),
  createUser: (payload) => API.post('/auth/create-user', payload),
  getCurrentUser: () => API.get('/auth/me'),
  getAllUsers: () => API.get('/auth/users'),
  updateUser: (id, payload) => API.put(`/auth/users/${id}`, payload),
  deleteUser: (id) => API.delete(`/auth/users/${id}`),
  getMySessions: () => API.get('/auth/sessions/me'),
  getAllSessionsSummary: () => API.get('/auth/sessions/all'),
  revokeSession: (sessionId) => API.post(`/auth/sessions/${sessionId}/revoke`),
  changePassword: (payload) => API.post('/auth/change-password', payload),

  // Function Checkpoint APIs
  createCheckpoint: (data) => API.post('/checkpoint', data),
  getAllCheckpoints: () => API.get('/checkpoint'),
  getCheckpointById: (id) => API.get(`/checkpoint/${id}`),
  getCheckpointsByDate: (date) => API.get(`/checkpoint/date/${date}`),

  // Technician Checklist APIs
  createChecklist: (data) => API.post('/checklist', data),
  getAllChecklists: () => API.get('/checklist'),
  getChecklistById: (id) => API.get(`/checklist/${id}`),
  getChecklistsByDate: (date) => API.get(`/checklist/date/${date}`),
  getChecklistsByLine: (line) => API.get(`/checklist/line/${line}`)
};

export default apiService;
