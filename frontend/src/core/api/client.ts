/** @format */

import axios from 'axios';

export const BACKEND_BASE_URL = 'http://localhost:65000';

export const httpClient = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = {
  get: <T = unknown>(url: string) => httpClient.get<T>(url),
  post: <T = unknown>(url: string, data: unknown) => httpClient.post<T>(url, data),
  put: <T = unknown>(url: string, data: unknown) => httpClient.put<T>(url, data),
  delete: <T = unknown>(url: string) => httpClient.delete<T>(url),
};
