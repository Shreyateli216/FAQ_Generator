import apiClient from './apiClient';

export const seoApi = {
  getData: (projectId) => {
    const query = projectId ? `?projectId=${projectId}` : '';
    return apiClient.get(`/seo${query}`);
  },
  create: (data) => apiClient.post('/seo', data),
};

export default seoApi;
