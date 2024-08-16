import axiosInstance from "./axiosInstance";

export const signInWithGoogle = async () => {
  try {
    const response = await axiosInstance.get("/v1/api/auth/google/callback");
    return response;
  } catch (err) {
    throw new Error("Failed to sign in with Google");
  }
};

export const signIn = async (email, password) => {
  const result = await axiosInstance.post(
    "http://localhost:8080/v1/api/signin",
    {
      email: email,
      password: password,
    }
  );
  return result;
};

export const signUp = async (userName, full_name, phoneNumber, email, password) => {
  const result = await axiosInstance.post(
    "http://localhost:8080/v1/api/signup",
    {
      userName: userName,
      full_name: full_name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    }
  );
  return result;
};
