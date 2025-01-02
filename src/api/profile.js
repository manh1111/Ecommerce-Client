import { checkToken } from "@utils/auth";
import axiosInstance from "./axiosInstance";
import { URL_API } from "../../src/config/config";

export const getAllAddresses = async () => {
  const config = checkToken("application/json");

  const result = await axiosInstance.get(
    `${URL_API}profile/addresses`,
    config
  );
  return result;
};

export const getProfileOwn = async () => {
  const config = checkToken("application/json");

  const result = await axiosInstance.get(
    `${URL_API}profile/own`,
    config
  );
  return result.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const config = checkToken("application/json");
  const result = await axiosInstance.post(
    `${URL_API}profile/change-password`,
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
    `${URL_API}profile/address`,
    {
      recipient_name: newAddress.recipient_name,
      recipient_phone: newAddress.recipient_phone,
      address: newAddress.address,
      specific_address: newAddress.specific_address,
      isDefault: newAddress.isDefault,
    },
    config
  );

  return result.data;
};

export const forgotPassword = async (email) => {
  const result = await axiosInstance.post(
    `${URL_API}forgot-password`,
    {
      email,
    },
  );
  return result.data;
};

export const resetPassword = async ({ password, token }) => {
  const result = await axiosInstance.post(
    `${URL_API}reset-password?token=${token}`,
    {
      password,
    }
  );
  return result.data;
};

export const updateProfileAvatar = async (file) => {
  const config = checkToken("multipart/form-data");
  const formData = new FormData();
  formData.append("file", file);

  const result = await axiosInstance.post(
    `${URL_API}profile/avatar-own`,
    formData,
    config
  );
  return result.data;
};

export const updateAddress = async (addressId, updatedAddress) => {
  const config = checkToken("application/json");
  const result = await axiosInstance.put(
    `${URL_API}profile/address/${addressId}`,
    {
      id: updatedAddress.id,
      userId: updatedAddress.userId,
      recipient_name: updatedAddress.recipient_name,
      recipient_phone: updatedAddress.recipient_phone,
      specific_address: updatedAddress.specific_address,
      address: updatedAddress.address,
      isDefault: updatedAddress.isDefault,
      zipCode: updatedAddress.zipCode,
      country: updatedAddress.country,
    },
    config
  );
  return result.data;
};

export const deleteAddress = async (addressId) => {
  const config = checkToken("application/json");
  const result = await axiosInstance.delete(
    `${URL_API}profile/address/${addressId}`,
    config
  );
  return result.data;
};

export const updateProfile = async (data) => {
  console.log('datata', data)
  const config = checkToken("application/json");

  const result = await axiosInstance.post(
    `${URL_API}profile/own`,
    data,
    config
  );
  return result.data;
}