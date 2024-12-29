import axiosInstance from "@api/axiosInstance";
import { checkToken } from "@utils/auth";
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


export const getCategoriesTree = async () => {
  try {
    // Use the environment variable for the base API URL
    const response = await axiosInstance.get(`${URL_API}category/buildTree`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};

export const statisticCategoryForShop = async () => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.get(
      `${URL_API}category/statistical/shop`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch category statistics", error);
    throw error;
  }
};