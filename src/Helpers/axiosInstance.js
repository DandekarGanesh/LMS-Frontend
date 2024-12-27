import axios from 'axios';

const BASE_URL = "https://lms-backend-production-6be6.up.railway.app/"; 

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.proxy = true;

export default axiosInstance;