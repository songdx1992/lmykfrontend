// src/utils/api.js
import axios from "axios";
import { useUserStore } from '/src/stores/user';
import { storeToRefs } from 'pinia';

const api = axios.create({
  baseURL: "/api",  // 后端地址
  timeout: 200000
});

// 请求拦截器：每次请求自动带上 token
api.interceptors.request.use(config => {
  const auth = useUserStore(); 
  const { token } = storeToRefs(auth);  // 响应式解构
    // 判断是不是登录接口
  const isLogin = config.url.includes('/login');
  if (!isLogin&&token.value) {
    config.headers.Authorization = `Bearer ${token.value}`;
    console.log("发送请求 URL:", config.url);
    console.log("请求 headers:", config.headers.Authorization);
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
