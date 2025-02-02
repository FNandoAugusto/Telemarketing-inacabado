import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }
    throw error;
  }
);
