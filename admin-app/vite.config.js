import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    allowedHosts: true
  },
  server: {
    allowedHosts: true
  }
});
