import { checkToken } from "@utils/auth";
import axiosInstance from "./axiosInstance";

// Get the base API URL from environment variables
const REACT_APP_URL_PRO_API = import.meta.env.VITE_URL_PRO_API;

export const getAllAddresses = async () => {
  const config = checkToken("application/json");

  const result = await axiosInstance.get(
    `${REACT_APP_URL_PRO_API}profile/addresses`,
    config
  );
  return result;
};

export const getProfileOwn = async () => {
  const config = checkToken("application/json");

  const result = await axiosInstance.get(
    `${REACT_APP_URL_PRO_API}profile/own`,
    config
  );
  return result.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const config = checkToken("application/json");
  const result = await axiosInstance.post(
    `${REACT_APP_URL_PRO_API}profile/change-password`,
    {
      currentPassword,
      newPassword
    }, config
  );
  return result.data;
};

export const addNewAddress = async (newAddress) => {
  const config = checkToken("application/json");
  const result = await axiosInstance.post(
    `${REACT_APP_URL_PRO_API}profile/address`,
    {
      id: newAddress.id,
      userId: newAddress.userId,
      street: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      zipCode: newAddress.zipCode,
      country: newAddress.country,
    },
    config
  );
  return result.data;
};

export const forgotPassword = async (email) => {
  const config = checkToken("application/json");
  const result = await axiosInstance.post(
    `${REACT_APP_URL_PRO_API}forgot-password`,
    {
      email,
    },
    config
  );
  return result.data;
};

export const resetPassword = async ({password, token}) => {
  const config = checkToken("application/json");
  const result = await axiosInstance.post(
    `${REACT_APP_URL_PRO_API}reset-password?token=${token}`,
    {
      password,
    },
    config
  );
  return result.data;
};




