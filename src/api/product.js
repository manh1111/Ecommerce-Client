import axiosInstance from "@api/axiosInstance";
import { getCookie } from "@utils/cookie";

// Get the base API URL from environment variables
const REACT_APP_URL_PRO_API =
  "https://ecommerce-server-0mcc.onrender.com/v1/api/";

export const getProductById = async (id) => {
  try {
    let token = null;
    if (getCookie("user_login")) {
      token = JSON.parse(getCookie("user_login"));
    }
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Fetch product by ID with token in Authorization header
    const response = await axiosInstance.get(
      `${REACT_APP_URL_PRO_API}product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
