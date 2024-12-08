import { jwtDecode } from "jwt-decode";

// Set a cookie with an expiration time
export const setCookie = (name, value, expirationHours) => {
  const date = new Date();
  value = JSON.stringify(value); // Ensure value is stored as a string
  date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000); // Set expiration time
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/;Secure;SameSite=Strict`;
};

// Get a cookie by name
export const getCookie = (name) => {
  if (typeof document === "undefined") {
    return null;
  }

  const dc = document.cookie;
  const prefix = `${name}=`;
  let begin = dc.indexOf("; " + prefix);
  if (begin === -1) {
    begin = dc.indexOf(prefix);
    if (begin !== 0) return null;
  } else {
    begin += 2;
    let end = document.cookie.indexOf(";", begin);
    if (end === -1) {
      end = dc.length;
    }
    return decodeURIComponent(dc.substring(begin + prefix.length, end));
  }
};

// Delete a specific cookie by name
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Clear all cookies
export const clearAllCookies = () => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const name = cookie.split("=")[0].trim();
    deleteCookie(name);
  }
};

// Check if the token cookie exists
export const checkTokenCookie = () => {
  const tokenCookie = getCookie("token");
  if (tokenCookie) {
    return tokenCookie;
  } else {
    console.warn('Không tìm thấy cookie có tên là "token"');
    return null;
  }
};

// Set refresh token
export const setRefreshToken = (value, expirationHours) => {
  setCookie("refresh_token", value, expirationHours);
};

// Get refresh token
export const getRefreshToken = () => {
  return getCookie("refresh_token");
};

export const decodeUserToken = () => {
  const userTokenCookie = getCookie("user_login");
  if (userTokenCookie) {
    try {
      const token = JSON.parse(userTokenCookie); 
      const dataInforUser = jwtDecode(token);
      return dataInforUser;
    } catch (error) {
      console.error("Invalid user login token", error);
    }
  } else {
    console.warn("User login token is missing or invalid.");
  }
  return null;
};

// Decode Refresh Token
export const decodeRefreshToken = () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      const refreshTokenData = jwtDecode(refreshToken); 
      return refreshTokenData;
    } catch (error) {
      console.error("Invalid refresh token", error);
    }
  } else {
    console.warn("Refresh token not found.");
  }
};


const userInfo = decodeUserToken(); 
const refreshTokenInfo = decodeRefreshToken(); 
