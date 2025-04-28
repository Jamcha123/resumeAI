import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target:"https://reader-xofmanudfa-uc.a.run.app", 
        changeOrigin: true
      }
    }, 
    cors: {
      origin: "https://reader-xofmanudfa-uc.a.run.app", 
      credentials: false, 
      methods: "GET"
    }
  }
})
