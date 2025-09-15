import axios from 'axios';

const API = axios.create({
  baseURL: 'https://course-selling-app-4-pscj.onrender.com', // ← HARDCODE IT
});

// Add token to requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ✅ CORRECTED EXPORTS - Use named exports
// ✅ CORRECT - send credentials in request body
export const adminLogin = (credentials) => API.post('/admin/login', credentials);
export const userLogin = (credentials) => API.post('/users/login', credentials);
export const adminSignup = (userData) => API.post('/admin/signup', userData);
export const userSignup = (userData) => API.post('/users/signup', userData);

// Course APIs
export const getCourses = () => API.get('/users/courses');
export const getAdminCourses = () => API.get('/admin/courses');
export const createCourse = (courseData) => API.post('/admin/courses', courseData);
export const purchaseCourse = (courseId) => API.post(`/users/courses/${courseId}`);
export const getPurchasedCourses = () => API.get('/users/purchasedCourses');
export const updateCourse = (courseId, courseData) => API.put(`/admin/courses/${courseId}`, courseData);
export const deleteCourse = (courseId) => API.delete(`/admin/courses/${courseId}`);

// Health check
export const healthCheck = () => API.get('/health');

export default API;