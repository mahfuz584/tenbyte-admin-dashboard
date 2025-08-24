import { BASE_URL } from "@/constants/baseUrl";
import axios from "axios";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
