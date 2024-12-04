import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // Important for sending authentication cookies
});

export const createPublication = async (publicationData) => {
  try {
    const response = await api.post('/publications/create', publicationData);
    return response.data;
  } catch (error) {
    console.error('Error creating publication:', error.response?.data || error.message);
    throw error;
  }
};

export const getAllPublications = async () => {
  try {
    const response = await api.get('/publications');
    return response.data.publications;
  } catch (error) {
    console.error('Error fetching publications:', error.response?.data || error.message);
    throw error;
  }
};

export const getPublicationById = async (publicationId) => {
  try {
    const response = await api.get(`/publications/${publicationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching publication details:', error.response?.data || error.message);
    throw error;
  }
};

export const getUserPublications = async (userId) => {
  try {
    const response = await api.get(`/publications/user/${userId}`);
    return response.data.publications;
  } catch (error) {
    console.error('Error fetching user publications:', error.response?.data || error.message);
    throw error;
  }
};

export const reportPublication = async (publicationId, data) => {
  try {
    const response = await api.post(`/reports/${publicationId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;