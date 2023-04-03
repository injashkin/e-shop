import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/e-shop/',
  plugins: [react()],
  resolve: {
    alias: {
      '@ui': path.resolve('src', 'ui'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve('index.html'),
        nested: path.resolve('404.html'),
      },
    },
  },
})