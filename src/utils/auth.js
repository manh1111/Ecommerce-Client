import { getCookie } from "./cookie";

export function checkAvailableLogin() {
  var token = getCookie("token");
  if (token == null) {
    return false;
  } else {
    return true;
  }
}

export function checkToken(contentType = "application/json") {
  let token = null;

  // Get the token from cookies if it exists
  const userLoginCookie = getCookie("user_login");
  if (userLoginCookie) {
    token = JSON.parse(userLoginCookie);
  }

  // If token is not found, throw an error
  if (!token) {
    throw new Error("No authentication token found");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
    },
  };

  return config
}