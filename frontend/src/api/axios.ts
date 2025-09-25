import axios from 'axios';
import { API_URL } from './constants';
import { refresh } from './auth';

import type { AxiosRequestConfig } from 'axios';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: API_URL || 'http://localhost:4000',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  reject: (err: unknown) => void;
  resolve: (token: boolean | null) => void;
}> = [];

const processQueue = (error: unknown, token: boolean | null = null) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config as AxiosRequestConfigWithRetry;
    const status = err.response?.status;
    const url = originalRequest?.url || '';

    const isAuthRoute =
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/refresh');

    if (status !== 401 || isAuthRoute || originalRequest._retry) {
      return Promise.reject(err);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => api(originalRequest))
        .catch((e) => Promise.reject(e));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await refresh();
      processQueue(null, true);
      return api(originalRequest);
    } catch (e) {
      processQueue(e, null);
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
