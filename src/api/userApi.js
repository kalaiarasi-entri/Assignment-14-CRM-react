import api from './axiosConfig';
export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);
export const me = () => api.get('/me');
