import { appConfig } from "@/config/app-config";
import axios from "axios";

const straiveUrl = appConfig.straiveUrl;
const baseUrl = appConfig.localURL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});
