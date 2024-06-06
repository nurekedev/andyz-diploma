import axios from "axios";
import Cookies from "js-cookie";
import { RefreshAccessToken } from "./Token";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: "http://api.andyz.kz/api/v1",
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
    error => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await RefreshAccessToken();
        console.log(newToken);
        if (newToken) {
          Cookies.set("accessToken", newToken);
          originalRequest.headers.Authorization = `JWT ${newToken}`;
          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
