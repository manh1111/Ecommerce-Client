import { getCookie } from "@utils/cookie";
import axiosInstance from "./axiosInstance";

import { URL_API } from "../../src/config/config";

export const VerifyUser = async (email, otp) => {
  const result = await axiosInstance.post(`${URL_API}auth/verifyUser`, {
    email: email,
    otp: otp,
  });
  return result;
};

export const SendOTP = async (email) => {
  const result = await axiosInstance.post(`${URL_API}otp/send-otp`, {
    email: email,
    templateName: "register"
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
    `${URL_API}upload/shopLogo`,
    { file: file },
    config
  );

  return result;
};
