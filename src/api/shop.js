import axiosInstance from "@api/axiosInstance";
import { getCookie } from "@utils/cookie";

// Get the base API URL from environment variables
const REACT_APP_URL_PRO_API = import.meta.env.VITE_URL_PRO_API;

export const GetOwnShop = async () => {
  try {
    let token = null;
    if (getCookie("user_login")) {
      token = JSON.parse(getCookie("user_login"));
    }
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Use environment variable for the base API URL
    const response = await axiosInstance.get(`${REACT_APP_URL_PRO_API}shop/view-own`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error;
  }
};

export const GetAllShop = async () => {
  try {
    const response = await axiosInstance.get(
      `${REACT_APP_URL_PRO_API}shop/all`
    );

    return response;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error;
  }
};

export const createShop = async (formData) => {

  try {
    let token = null;
    if (getCookie("user_login")) {
      token = JSON.parse(getCookie("user_login"));
    }
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Configure headers to handle formData
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Required for FormData
      },
    };

    // Use environment variable for the base API URL
    const response = await axiosInstance.post(
      `${REACT_APP_URL_PRO_API}shop/create`,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error creating shop:", error);
    throw error;
  }
};

export const getShopById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${REACT_APP_URL_PRO_API}shop/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

