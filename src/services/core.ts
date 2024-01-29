import axios from "axios";
import AuthService from "../utils/authService";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});

axiosInstance.interceptors.request.use((config) => {
  const [token] = AuthService.getTokenAndId();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default axiosInstance;
