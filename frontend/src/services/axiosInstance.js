import axios from "axios";
import Cookies from "js-cookie";
import { RefreshAccessToken } from "./Token";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    headers: {
      "Content-Type": "application/json"
    }
  });

  axiosInstance.interceptors.request.use(
    config => {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.Authorization = `JWT ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        await RefreshAccessToken();
        return axiosInstance(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
