import { appConfig } from "@/config/app-config";
import axios from "axios";

const straiveUrl = appConfig.straiveUrl;

export const axiosInstance = axios.create({
  baseURL: straiveUrl,
  timeout: 10000,
});
