import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000
});

API.interceptors.response.use(
  response => response,
  error => {
    const serverMessage = error.response?.data?.error;
    if (serverMessage) error.message = serverMessage;
    else if (!error.response) error.message = 'Cannot reach the server. Check that the backend is running.';
    return Promise.reject(error);
  }
);

export const apiService = {
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
