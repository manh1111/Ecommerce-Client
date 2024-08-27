import { getCookie } from "./cookie";

export function checkAvailableLogin() {
  var token = getCookie("token");
  if (token == null) {
    return false;
  } else {
    return true;
  }
}
