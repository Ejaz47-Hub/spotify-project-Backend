import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://spotify-project-backend-kpmr.onrender.com',
        changeOrigin: true,
        proxyTimeout: 600000,
        timeout: 600000,
      },
    },
  },
})
