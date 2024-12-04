import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1/'; 

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // Important for sending authentication cookies
});

// User Management
export const getAllUsers = async () => {
  try {
    const response = await adminApi.get('admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await adminApi.delete(`admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response?.data || error.message);
    throw error;
  }
};

// Publication Management
export const getReportedPublications = async () => {
  try {
    const response = await adminApi.get('admin/reported-publications');
    return response.data;
  } catch (error) {
    console.error('Error fetching reported publications:', error.response?.data || error.message);
    throw error;
  }
};

export const changePublicationStatus = async (publicationId, status) => {
  try {
    const response = await adminApi.patch(`admin/publications/${publicationId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error changing publication status:', error.response?.data || error.message);
    throw error;
  }
};

export const deletePublication = async (publicationId) => {
  try {
    const response = await adminApi.delete(`/publications/${publicationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting publication:', error.response?.data || error.message);
    throw error;
  }
};

export default adminApi;