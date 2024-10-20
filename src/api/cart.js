import axiosInstance from "@api/axiosInstance";
import { checkToken } from "@utils/auth";
import { getCookie } from "@utils/cookie";

// Access the base URL from the environment variables
const REACT_APP_URL_PRO_API = import.meta.env.VITE_URL_PRO_API;

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

export const addCart = async (id, quantity = 1) => {
  const config = checkToken("application/json");
  try {
    const result = await axiosInstance.post(
      `${REACT_APP_URL_PRO_API}cart`,
      {
        productId: id,
        quantity,
      },
      config
    );

    console.log(config);
    return result; 
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const changeQuantityProduct = async (productId, quantity, old_quantity) => {
  const config = checkToken("application/json");
  try {
    const result = await axiosInstance.post(
      `${REACT_APP_URL_PRO_API}cart/products/quantity`,
      {
        productId,
        quantity,
        old_quantity,
      },
      config
    );

    console.log(config);
    return result;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const deleteProductById = async (productId) => {
  const config = checkToken("application/json");
  try {
    const result = await axiosInstance.delete(
      `${REACT_APP_URL_PRO_API}cart/${productId}`, 
      config 
    );

    console.log(result); 
    return result;
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    throw error;
  }
};



