import axios from 'axios';

const apiRequest = axios.create({
  baseURL: "https://store-ljv9.onrender.com/api/v1",
  withCredentials: false, // Désactivé pour éviter les problèmes CORS
});

export default apiRequest;
