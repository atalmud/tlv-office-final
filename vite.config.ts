import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative so GitHub Pages (/tlv-office-final/) and local preview both resolve assets.
  base: './',
  plugins: [react()],
})
