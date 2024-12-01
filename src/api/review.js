import axiosInstance from "@api/axiosInstance";
import { checkToken } from "@utils/auth";

import { URL_API } from "../../src/config/config";

// Fetch reviews for the shop
export const getReviewForShop = async () => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.get(`${URL_API}/reviews`, config);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reviews", error);
    throw error;
  }
};

export const createReview = async (productId, rating, comment) => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.post(
      `${URL_API}/review/`,
      { productId, rating, comment },
      config
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create review", error);
    throw error;
  }
};
