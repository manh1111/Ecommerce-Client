import { getCookie } from "@utils/cookie";
import axiosInstance from "./axiosInstance";

export const VerifyUser = async (email, otp) => {
  const result = await axiosInstance.post(
    "http://localhost:8080/v1/api/auth/verifyUser",
    {
      email: email,
      otp: otp,
    }
  );
  return result;
};

export const SendOTP = async (email) => {
  const result = await axiosInstance.post(
    "http://localhost:8080/v1/api/otp/send-otp",
    {
      email: email,
    }
  );
  return result;
};

export const UpLoadLogo = async (file) => {
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
       "Content-Type": "application/json",
     },
   };
  const result = await axiosInstance.post(
    "http://localhost:8080/v1/api/upload/shopLogo",
    {
      file: file,
    },
    config
  );
  return result;
};
