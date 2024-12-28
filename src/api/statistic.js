import axiosInstance from "../api/axiosInstance";
import { checkToken } from "@utils/auth";
import { URL_API } from "../../src/config/config";

export const getProfitForAdmin = async (
  page = 1,
  limit = 4,
  sortBy = "asc",
  includeStatistics = true,
  year = 2024
) => {
  try {
    const config = checkToken("application/json");

    const response = await axiosInstance.get(
      `${URL_API}shop/?page=${page}&limit=${limit}&sortBy=${sortBy}&includeStatistics=${includeStatistics}&year=${year}`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  }
};

export const getBenegitForShop = async (includeStatistics = true, year = 2024) => {
  try {
   
    const config = checkToken("application/json");
    const response = await axiosInstance.get(
      `${URL_API}shop/view-own?includeStatistics=${includeStatistics}&year=${year}`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching shop's cart data:", error);
    throw error;
  }
};

export const getShopRevenue = async ({ startDate, endDate, groupBy }) => {
  const config = checkToken("application/json");
  try {
    const url = `${URL_API}shop/admin-revenue?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`;
    const response = await axiosInstance.get(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching shop revenue data:", error);
    throw error;
  }
};

export const getRevenueByShop = async ({id, startDate, endDate, groupBy }) => {
  const config = checkToken("application/json");
  try {
    const url = `${URL_API}shop/revenue/${id}?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`;
    const response = await axiosInstance.get(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching shop revenue data:", error);
    throw error;
  }
};

export const getRevenueByShopOwn = async ({ startDate, endDate, groupBy }) => {
  const config = checkToken("application/json");
  try {
    const url = `${URL_API}shop/revenue?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`;
    const response = await axiosInstance.get(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching shop revenue data:", error);
    throw error;
  }
};

