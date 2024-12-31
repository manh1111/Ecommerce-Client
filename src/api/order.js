import axiosInstance from "@api/axiosInstance";
import { checkToken } from "@utils/auth";

import { URL_API } from "../../src/config/config";

export const createOrder = async (
  orders,
  paymentMethod,
  paymentGateway,
  shippingAddress
) => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.post(
      `${URL_API}order`,
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
    const response = await axiosInstance.get(`${URL_API}category`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};

export const getAllOrder = async (status) => {
  try {
    const config = checkToken("application/json");

    const url = `${URL_API}order/user${status ? `?status=${status}` : ""}`;

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
      `${URL_API}order/cancel/${orderId}`,
      {},
      config
    );

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
};

export const getOrdersForShop = async (status) => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.get(
      `${URL_API}order/shop-owners${status ? `?status=${status}` : ""}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const config = checkToken("application/json");
    console.log("Config for headers:", config);
    const response = await axiosInstance.put(
      `${URL_API}order/${orderId}?status=${newStatus}`,
      {},
      config 
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update order status", error);
    throw error;
  }
};


