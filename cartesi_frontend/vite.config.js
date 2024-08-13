import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['chunk-6VWAHX6D.js'],
  },

  preview: {
    port: 80,
    strictPort: true,
  },
  server: {
    port: 80,
    strictPort: true,
    host: true,
  },
});
