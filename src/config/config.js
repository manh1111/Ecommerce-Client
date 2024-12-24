const isProduction = process.env.NODE_ENV === "pro";
console.log("isProduction", isProduction);
const URL_API = isProduction
  ? import.meta.env.VITE_URL_PRO_API
  : import.meta.env.VITE_URL_DEV_API;

const WEB_DOMAIN = isProduction
  ? import.meta.env.VITE_PRO_WEB_DOMAIN
  : import.meta.env.VITE_DEV_WEB_DOMAIN;

export { URL_API, WEB_DOMAIN };
