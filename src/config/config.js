const dev = {
  URL_API: import.meta.env.VITE_URL_DEV_API,
  WEB_DOMAIN: import.meta.env.VITE_DEV_WEB_DOMAIN
}

const pro = {
  URL_API: import.meta.env.VITE_URL_PRO_API,
  WEB_DOMAIN: import.meta.env.VITE_PRO_WEB_DOMAIN
}

const aws = {
  URL_API: import.meta.env.VITE_URL_AWS_API,
  WEB_DOMAIN: import.meta.env.VITE_PRO_WEB_DOMAIN
}

const config = { dev, pro, aws}
const env = process.env.NODE_ENV || 'dev';

// Xuất các biến URL_API và WEB_DOMAIN tương ứng với môi trường
const { URL_API, WEB_DOMAIN } = config[env] || config.dev;

export { URL_API, WEB_DOMAIN };