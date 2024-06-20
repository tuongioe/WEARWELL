import axios from "axios";

export const SERVER_URL = "http://localhost:8888";

// console.log(`SERVER_URL:::${SERVER_URL}`);

const axiosClient = axios.create({
  baseURL: `${SERVER_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axiosClient;
