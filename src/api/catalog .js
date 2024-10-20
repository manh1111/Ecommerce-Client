import axiosInstance from "@api/axiosInstance";

// Get the base API URL from environment variables
const REACT_APP_URL_PRO_API =
  "https://ecommerce-server-0mcc.onrender.com/v1/api/";

export const getCatalogByShopId = async (ShopId) => {
  try {

    const response = await axiosInstance.get(
      `${REACT_APP_URL_PRO_API}catalogShop/shop/${ShopId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
