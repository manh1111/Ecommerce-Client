import axiosInstance from "./axiosInstance";

const REACT_APP_URL_PRO_API = import.meta.env.VITE_URL_PRO_API;

export const signInWithGoogle = async () => {
  try {
    const response = await axiosInstance.get(
      `${REACT_APP_URL_PRO_API}auth/google/callback`
    );
    return response;
  } catch (err) {
    throw new Error("Failed to sign in with Google");
  }
};

export const signIn = async (email, password) => {
  try {
    const result = await axiosInstance.post(`${REACT_APP_URL_PRO_API}/signin`, {
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
    const result = await axiosInstance.post(`${REACT_APP_URL_PRO_API}signup`, {
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
