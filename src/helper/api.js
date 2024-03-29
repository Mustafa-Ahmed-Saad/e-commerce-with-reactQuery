import axios from "axios";

// BaseUrl
export const BaseUrl = "https://ecommerce.routemisr.com";

const config = { baseURL: BaseUrl };
export const axiosInstance = axios.create(config);
