import axios from 'axios';
import { getAuthToken } from './auth';

const axiosInstance = axios.create({
  baseURL: "http://172.28.0.2:8080",
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Gérer les erreurs d'authentification, par exemple, rediriger vers la page de connexion
      console.error('Non autorisé, redirection vers la page de connexion');
      window.location.href = '/login'; // Rediriger vers la page de connexion
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;