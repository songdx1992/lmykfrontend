import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/products': {
        target: 'http://192.168.1.2:8009',
        changeOrigin: true
        
      },
      '/fixed_costs': {
        target: 'http://192.168.1.2:8009',
        changeOrigin: true
       
      },
      '/calculate': {
        target: 'http://192.168.1.2:8009',
        changeOrigin: true
        
      },
      '/save_fixed_costs': {
        target: 'http://192.168.1.2:8009',
        changeOrigin: true
        
      },
      '/add_product': {
        target: 'http://192.168.1.2:8009',
        changeOrigin: true

      },
      '/all_products': {
        target: 'http://192.168.1.2:8009',
        changeOrigin: true
       
      }
    }
}
})
