import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // If you use path aliases in your CRA project
      '@': path.resolve(__dirname, './src'),
    },
  },

  
})
