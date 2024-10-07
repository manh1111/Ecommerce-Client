import axiosInstance from "@api/axiosInstance";
import { getCookie } from "@utils/cookie";

// Get the base API URL from environment variables
const REACT_APP_URL_PRO_API = "https://ecommerce-server-0mcc.onrender.com/v1/api/";

export const createCategories = async () => {
  try {
    // Use the environment variable for the base API URL
    const response = await axiosInstance.post(`${REACT_APP_URL_PRO_API}category/create`);
    return response.data;
  } catch (error) {
    console.error("Failed to create categories:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    // Use the environment variable for the base API URL
    const response = await axiosInstance.get(`${REACT_APP_URL_PRO_API}category`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};
