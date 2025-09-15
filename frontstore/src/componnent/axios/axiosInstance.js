import axios from 'axios';

const apiRequest = axios.create({
  baseURL: "https://store-ljv9.onrender.com/api/v1",
  withCredentials: true, 
});

export default apiRequest;
