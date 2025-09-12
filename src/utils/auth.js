import jwtDecode from 'jwt-decode';

export const getToken = () => localStorage.getItem('token');
export const isLogged = () => !!getToken();
export const logout = () => { localStorage.removeItem('token'); window.location.href = '/login'; };
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  try { return jwtDecode(token); } catch { return null; }
};
