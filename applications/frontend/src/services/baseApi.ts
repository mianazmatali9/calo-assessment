import axios, { AxiosInstance } from 'axios';

const apiService = (): AxiosInstance => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;

      return config;
    },
    (error) => error
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => error
  );

  return instance;
};

export const baseApi = apiService();
