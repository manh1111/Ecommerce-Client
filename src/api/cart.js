import axiosInstance from "@api/axiosInstance";
import { getCookie } from "@utils/cookie";

// Access the base URL from the environment variables
const REACT_APP_URL_PRO_API = "https://ecommerce-server-0mcc.onrender.com/v1/api/";

export const getCart = async () => {
  try {
    let token = null;

    // Get the token from cookies if it exists
    const userLoginCookie = getCookie("user_login");
    if (userLoginCookie) {
      token = JSON.parse(userLoginCookie);
    }

    // If token is not found, throw an error
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Perform the API call using the base URL from the .env file
    const response = await axiosInstance.get(`${REACT_APP_URL_PRO_API}cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the cart data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  }
};
