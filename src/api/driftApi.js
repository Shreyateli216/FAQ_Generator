import apiClient from './apiClient';

export const driftApi = {
  getData: (projectId) => {
    const query = projectId ? `?projectId=${projectId}` : '';
    return apiClient.get(`/drift${query}`);
  },
  create: (data) => apiClient.post('/drift', data),
};

export default driftApi;
