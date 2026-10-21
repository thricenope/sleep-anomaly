import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/sleep-anomaly/',
  plugins: [react()],
  server: { port: 5196, host: true },
})
