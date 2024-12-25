import { getCookie } from "./cookie";

export function checkAvailableLogin() {
  var token = getCookie("token");
  return token !== null;
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

  console.log("token", token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
    },
  };

  console.log(config)

  return config
}