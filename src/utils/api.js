// src/utils/api.js
import axios from "axios";
import { useUserStore } from '/src/stores/user';

const api = axios.create({
  baseURL: "http://192.168.1.53:8009",  // 后端地址
  timeout: 5000
});

// 请求拦截器：每次请求自动带上 token
api.interceptors.request.use(config => {
  const auth = useUserStore(); 
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
