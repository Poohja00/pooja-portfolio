import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // project page served from https://poohja00.github.io/pooja-portfolio/
  base: '/pooja-portfolio/',
  plugins: [react(), tailwindcss()],
})
