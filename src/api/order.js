import axiosInstance from "@api/axiosInstance";
import { checkToken } from "@utils/auth";

// Get the base API URL from environment variables
const REACT_APP_URL_PRO_API = import.meta.env.VITE_URL_PRO_API;

export const createOrder = async (
  orders,
  paymentMethod,
  paymentGateway,
  shippingAddress
) => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.post(
      `${REACT_APP_URL_PRO_API}order`,
      {
        orders,
        paymentMethod,
        paymentGateway,
        shippingAddress,
      },
      config
    );
    return response;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    // Use the environment variable for the base API URL
    const response = await axiosInstance.get(`${REACT_APP_URL_PRO_API}category`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};


export const getAllOrder = async (status) => {
  try {
    const config = checkToken("application/json");

    const url = `${REACT_APP_URL_PRO_API}order/user${
      status ? `?status=${status}` : ""
    }`;

    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error); 
    throw error;
  }
};


export const deleteOrderById = async (orderId) => {
  try {
    const config = checkToken("application/json");

    const result = await axiosInstance.put(
      `${REACT_APP_URL_PRO_API}order/cancel/${orderId}`,
      {},
      config
    );

    console.log(result);
    return result.data;
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
};
