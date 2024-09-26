import axiosInstance from "@api/axiosInstance";
import { getCookie } from "@utils/cookie";

export const createCategories = async () => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:8080/category/create"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:8080/category"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};
