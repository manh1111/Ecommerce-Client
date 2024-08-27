import axiosInstance from "@api/axiosInstance";
import { getCookie } from "@utils/cookie";

export const GetOwnShop = async () => {
  try {
    let token = null;
    if (getCookie("user_login")) {
      token = JSON.parse(getCookie("user_login"));
    }
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.get(
      "http://localhost:8080/v1/api/shop/view-own",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error;
  }
};

export const createShop = async (formData) => {
  console.log("FormData in createShop:", formData);

  try {
    let token = null;
    if (getCookie("user_login")) {
      token = JSON.parse(getCookie("user_login"));
    }
    if (!token) {
      throw new Error("No authentication token found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Use multipart/form-data for FormData
      },
    };

    const response = await axiosInstance.post(
      "http://localhost:8080/v1/api/shop/create",
      formData,
      config
    );

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error creating shop:", error);
    throw error;
  }
};
