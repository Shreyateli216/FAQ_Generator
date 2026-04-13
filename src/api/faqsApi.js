import apiClient from './apiClient';

export const faqsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/faqs${query ? `?${query}` : ''}`);
  },
  getOne: (id) => apiClient.get(`/faqs/${id}`),
  create: (data) => apiClient.post('/faqs', data),
  bulkCreate: (data) => apiClient.post('/faqs/bulk', data),
  update: (id, data) => apiClient.put(`/faqs/${id}`, data),
  delete: (id) => apiClient.delete(`/faqs/${id}`),
};

export default faqsApi;
