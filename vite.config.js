import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 添加这一行
    port: 3000,       // 可选：显式声明端口
    proxy: {
      '/api': {
        target: 'http://192.168.1.2:8009',
        changeOrigin: true,
      }
    }
  }
})
