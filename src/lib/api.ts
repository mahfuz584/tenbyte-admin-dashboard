import { BASE_URL } from "@/constants/baseUrl";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const getData = async <T>(endpoint: string): Promise<T> => {
  const response = await api.get<T>(endpoint);
  return response.data;
};
