import axios from 'axios';

// Single axios instance pre-configured for the auth API.
// withCredentials: true ensures the httpOnly JWT cookie is sent on every request.
const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  withCredentials: true,
});

export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);
export const logoutUser = () => api.post('/logout');
export const getMe = () => api.get('/me');
export const forgotPassword = (data) => api.post('/forgot-password', data);
export const resetPassword = (data) => api.post('/reset-password', data);
