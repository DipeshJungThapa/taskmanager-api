// frontend/vite.config.js
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This creates the @/ alias pointing to the src folder
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Dev server proxy: forward /api requests to Django backend to avoid CORS in dev
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000'
    }
  }
})