import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:4000",
});

API.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    config.headers.Authorization = authToken ? authToken : null;
    return config;
  },
  (error) => Promise.reject(error)
);
