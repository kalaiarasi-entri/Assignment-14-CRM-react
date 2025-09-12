import api from './axiosConfig';
export const getCases = () => api.get('/caseDetails');
export const getCase = (id) => api.get(`/caseDetails/${id}`);
export const addCase = (data) => api.post('/caseDetails', data);
export const updateCase = (id, data) => api.put(`/caseDetails/${id}`, data);
export const deleteCase = (id) => api.delete(`/caseDetails/${id}`);
