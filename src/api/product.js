import axiosInstance from "@api/axiosInstance";
import { checkToken } from "@utils/auth";
import { getCookie } from "@utils/cookie";

// Get the base API URL from environment variables
const REACT_APP_URL_PRO_API =
  "https://ecommerce-server-0mcc.onrender.com/v1/api/";

export const GetAllProduct = async () => {
  try {
    const response = await axiosInstance.get(
      `${REACT_APP_URL_PRO_API}product`
    );

    return response;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${REACT_APP_URL_PRO_API}product/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getProductsByCatalogShop = async (shopId, catalogId) => {
  try {
     const config = checkToken("application/json");

    // Fetch product by ID with token in Authorization header
    const response = await axiosInstance.get(
      `${REACT_APP_URL_PRO_API}product/shop/${shopId}/catalog/${catalogId}`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getAllProductsShopId = async (shopId) => {
  try {
    const config = checkToken("application/json");

    // Fetch product by ID with token in Authorization header
    const response = await axiosInstance.get(
      `${REACT_APP_URL_PRO_API}product/shop/${shopId}`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const searchProduct = async (query) => {
  const result = await axiosInstance.post(
    `${REACT_APP_URL_PRO_API}product/search`,
    {
      query,
    }
  );
  return result;
};