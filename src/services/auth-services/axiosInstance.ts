/**
 * Axios instances for authenticated API calls
 *
 * @authApi - For JSON API calls with authentication
 * @formAuthApi - For multipart/form-data uploads with authentication
 */

import { status401, status403 } from "@/lib/domain";
import { getToken } from "@/lib/token";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls for authenticated routes
authApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls for authenticated routes
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error: AxiosError) {
    if (error.response?.status === 403) {
      status403();
    } else if (error.response?.status === 401) {
      status401();
    }
    return Promise.reject(error);
  }
);

const formAuthApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Request interceptor for API calls for authenticated routes using form-data content type
formAuthApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls for authenticated routes using form-data content type
formAuthApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error: AxiosError) {
    if (error.response?.status === 403) {
      status403();
    } else if (error.response?.status === 401) {
      status401();
    }
    return Promise.reject(error);
  }
);

export { authApi, formAuthApi };
