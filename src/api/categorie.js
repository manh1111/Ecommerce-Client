import axiosInstance from "@api/axiosInstance";

import { URL_API } from "../../src/config/config";

export const createCategories = async () => {
  try {
    // Use the environment variable for the base API URL
    const response = await axiosInstance.post(`${URL_API}category/create`);
    return response.data;
  } catch (error) {
    console.error("Failed to create categories:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    // Use the environment variable for the base API URL
    const response = await axiosInstance.get(`${URL_API}category`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};


