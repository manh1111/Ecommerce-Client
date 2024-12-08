import axiosInstance from "@api/axiosInstance";
import { checkToken } from "@utils/auth";

import { URL_API } from "../../src/config/config";

export const getReviewForShop = async () => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.get(`${URL_API}review`, config);
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
      `${URL_API}review`,
      { productId, rating, comment },
      config
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create review", error);
    throw error;
  }
};
