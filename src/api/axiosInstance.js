import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_ROOT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // You can add custom logic here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.error(
        "Failed to save user data to external API:",
        response.status,
        response.statusText
      );
      throw new Error(`Failed with status: ${response.status}`);
    }
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - perhaps redirect to login?");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
