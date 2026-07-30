import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: 5174,
    allowedHosts: true
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    allowedHosts: true
  }
});
