import axios from "axios";
import { refreshAccessToken } from "./auth";
import { getCookie, setCookie } from "@utils/cookie";

const axiosInstance = axios.create({
  baseURL: process.env.API_ROOT,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = (getCookie("token")); // Lấy Access Token từ cookie
//     console.log('intercepter')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    console.error(
      "Failed to process API response:",
      response.status,
      response.statusText
    );
    throw new Error(`Failed with status: ${response.status}`);
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true; 
      isRefreshing = true;
    }

    return Promise.reject(error); 
  }
);

export default axiosInstance;
