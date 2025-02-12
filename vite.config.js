import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      tinymce: '/node_modules/tinymce',
    },
  },
  plugins: [react()],
  base: '/',
})
