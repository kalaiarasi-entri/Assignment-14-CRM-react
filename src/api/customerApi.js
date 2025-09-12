import api from './axiosConfig';
export const getCustomers = () => api.get('/customerDetails');
export const getCustomer = (id) => api.get(`/customerDetails/${id}`);
export const addCustomer = (data) => api.post('/customerDetails', data);
export const updateCustomer = (id, data) => api.put(`/customerDetails/${id}`, data);
export const deleteCustomer = (id) => api.delete(`/customerDetails/${id}`);
