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
    const isLoginRequest = error.config?.url?.includes('/auth/login');

    // A 401 on the login endpoint means wrong credentials — not an expired session.
    // Only fire the global session-expiry event for all other authenticated routes.
    if (error.response?.status === 401 && !isLoginRequest) {
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
  getActivityLogs: () => API.get('/activity-logs'),
  getRecentSubmissions: () => API.get('/activity-logs/recent-submissions'),
  getDashboardStats: (date) => API.get('/auth/dashboard-stats', { params: { date } }),

  // Function Checkpoint APIs
  createCheckpoint: (data) => API.post('/checkpoint', data),
  getAllCheckpoints: () => API.get('/checkpoint'),
  getCheckpointById: (id) => API.get(`/checkpoint/${id}`),
  getCheckpointsByDate: (date) => API.get(`/checkpoint/date/${date}`),
  updateCheckpoint: (id, data) => API.put(`/checkpoint/${id}`, data),
  deleteCheckpoint: (id) => API.delete(`/checkpoint/${id}`),
  getPendingCheckpoints: () => API.get('/checkpoint/pending'),

  // Changeover Checksheet APIs
  createChangeoverChecksheet: (data) => API.post('/changeover', data),
  getAllChangeoverChecksheets: () => API.get('/changeover'),
  getChangeoverChecksheetById: (id) => API.get(`/changeover/${id}`),
  getChangeoverChecksheetsByDate: (date) => API.get(`/changeover/date/${date}`),
  updateChangeoverChecksheet: (id, data) => API.put(`/changeover/${id}`, data),
  deleteChangeoverChecksheet: (id) => API.delete(`/changeover/${id}`),
  getPendingChangeoverChecksheets: () => API.get('/changeover/pending'),

  // Technician Checklist APIs
  createChecklist: (data) => API.post('/checklist', data),
  getAllChecklists: () => API.get('/checklist'),
  getChecklistById: (id) => API.get(`/checklist/${id}`),
  getChecklistsByDate: (date) => API.get(`/checklist/date/${date}`),
  getChecklistsByLine: (line) => API.get(`/checklist/line/${line}`),
  deleteChecklist: (id) => API.delete(`/checklist/${id}`),
  getPendingChecklists: () => API.get('/checklist/pending'),
  updateChecklist: (id, payload) => API.put(`/checklist/${id}`, payload),

  // Engineers API
  getEngineers: () => API.get('/auth/engineers'),

  // Line Status APIs
  getAllLines: () => API.get('/lines'),
  getInstalledLines: () => API.get('/lines/installed'),
  updateLineStatus: (line, data) => API.patch(`/lines/${line}`, data)
};

export default apiService;
