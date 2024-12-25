import axios from "axios"
import { URL_API } from "../config/config";
import { getCookie, setCookie } from "@utils/cookie";

class ApiService {
  axiosInstance = axios.create({
    baseURL: URL_API,
  });
  accessToken = ''
  refreshToken = ''

  constructor() {
    this.accessToken = getCookie('accessToken')
    this.refreshToken = getCookie('refreshToken')
  }

  async refreshToken() {
    // const res = await this.callApi('POST', 'v1/api/refresh-token', { refreshToken: this.refreshToken })
    // console.log(res)
    // setCookie()
    console.log(123)
  }

  async callApi(method, endpoint, data = {}, config, ignoreAuth = false) {
    try {
      const r = await this.axiosInstance({
        method,
        url: endpoint,
        data,
        headers: {
          Authorization: this.auth.accessToken ? `Bearer ${this.auth.accessToken}` : undefined,
        },
        ...config,
      });
      return r.data;
    } catch (e) {
      if (e.response) {
        if (e.response.data) throw e.response.data;
        throw e.response;
      } else {
        throw e;
      }
    }
  }
}

export default new ApiService()