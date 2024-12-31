import axiosInstance from "./axiosInstance";
import { URL_API } from "../../src/config/config";
import { checkToken } from "@utils/auth";

export const signInWithGoogle = async () => {
  try {
    const response = await axiosInstance.get(
      `${URL_API}auth/google/callback`
    );
    return response;
  } catch (err) {
    throw new Error("Failed to sign in with Google");
  }
};

export const signIn = async (email, password) => {
  try {
    console.log("VITE_URL_API", URL_API);
    const result = await axiosInstance.post(`${URL_API}signin`, {
      email: email,
      password: password,
    });
    return result;
  } catch (err) {
    throw new Error("Failed to sign in");
  }
};

export const signUp = async (
  userName,
  full_name,
  phoneNumber,
  email,
  password
) => {
  try {
    const result = await axiosInstance.post(`${URL_API}signup`, {
      userName: userName,
      full_name: full_name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    });
    return result;
  } catch (err) {
    throw new Error("Failed to sign up");
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post(
      `${URL_API}refresh-token`,
      { refreshToken }
    );
    return response.data;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error; // Rethrow the error to handle it where this function is called
  }
};

