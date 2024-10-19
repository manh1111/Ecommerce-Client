import { getCookie } from "@utils/cookie";
import axiosInstance from "./axiosInstance";

// Get the base API URL from environment variables
const REACT_APP_URL_PRO_API = import.meta.env.VITE_URL_PRO_API;

export const VerifyUser = async (email, otp) => {
  const result = await axiosInstance.post(`${REACT_APP_URL_PRO_API}auth/verifyUser`, {
    email: email,
    otp: otp,
  });
  return result;
};

export const SendOTP = async (email) => {
  const result = await axiosInstance.post(`${REACT_APP_URL_PRO_API}otp/send-otp`, {
    email: email,
  });
  return result;
};

export const UpLoadLogo = async (file) => {
  let token = null;

  // Check if the token is available in cookies
  if (getCookie("user_login")) {
    token = JSON.parse(getCookie("user_login"));
  }

  if (!token) {
    throw new Error("No authentication token found");
  }

  // Configure the request headers with the token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Perform the API call to upload the logo
  const result = await axiosInstance.post(
    `${REACT_APP_URL_PRO_API}upload/shopLogo`,
    { file: file },
    config
  );

  return result;
};
