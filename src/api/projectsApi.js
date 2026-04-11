import apiClient from './apiClient';

export const projectsApi = {
  getAll: () => apiClient.get('/projects'),
  getOne: (id) => apiClient.get(`/projects/${id}`),
  create: (data) => apiClient.post('/projects', data),
  update: (id, data) => apiClient.put(`/projects/${id}`, data),
  delete: (id) => apiClient.delete(`/projects/${id}`),
};

export default projectsApi;
