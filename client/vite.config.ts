import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // In development, forward /api requests to the server (see server/index.ts)
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
