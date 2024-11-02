const isProduction = process.env.NODE_ENV === "pro";
console.log("isProduction", isProduction);
const URL_API = isProduction
  ? import.meta.env.VITE_URL_PRO_API
  : import.meta.env.VITE_URL_DEV_API;

export {URL_API};
