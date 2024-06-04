import axios from "axios";
import Cookies from "js-cookie";
import { refreshAccessToken } from "../requests/Token";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    headers: {
      "Content-Type": "application/json"
    }
  });

  // Добавление интерсептора для установки токена в заголовки
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
        originalRequest._retry = true;

        try {
          const response = await refreshAccessToken();
          if (response.status === 200) {
            return axiosInstance(originalRequest);
          }
        } catch (err) {
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
