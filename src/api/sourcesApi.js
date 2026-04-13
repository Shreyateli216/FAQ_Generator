import apiClient from './apiClient';

export const sourcesApi = {
  getAll: (projectId) => apiClient.get(`/sources?projectId=${projectId}`),
  create: (data) => apiClient.post('/sources', data),
  upload: (formData) => apiClient.upload('/sources/upload', formData),
  delete: (id) => apiClient.delete(`/sources/${id}`),
};

export default sourcesApi;
