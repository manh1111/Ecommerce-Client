import axiosInstance from "@api/axiosInstance";
import { checkToken } from "@utils/auth";

import { URL_API } from "../../src/config/config";

export const getCart = async () => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.get(`${URL_API}cart`,
      config,
    );


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
      `${URL_API}cart`,
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
      `${URL_API}cart/products/quantity`,
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
      `${URL_API}cart/${productId}`, 
      config 
    );

    console.log(result); 
    return result;
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    throw error;
  }
};



