/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

const unauthApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls for unauthenticated routes
unauthApi.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      "Content-Type": "application/json",
    };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls for unauthenticated routes
unauthApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export { unauthApi };
