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
