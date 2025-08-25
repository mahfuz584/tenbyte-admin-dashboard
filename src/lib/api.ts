import { BASE_URL } from "@/constants/baseUrl";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const getData = async <T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<T> => {
  console.log({
    endpoint,
    params,
  });
  const response = await api.get<T>(endpoint, { params });
  console.log("🚀 ~ getData ~ response:", response);
  return response.data;
};
