import axios from 'axios';

const apiRequest = axios.create({
  baseURL: "https://store-ljv9.onrender.com/api/v1",
  withCredentials: false, // Désactivé pour éviter les problèmes CORS
});

// Intercepteur pour ajouter le token à toutes les requêtes
apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Axios interceptor - Token found:", !!token);
    console.log("Axios interceptor - Request URL:", config.url);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Axios interceptor - Authorization header added");
    } else {
      console.log("Axios interceptor - No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiRequest;
