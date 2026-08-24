import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html')
      }
    }
  },
  server: {
    port: 5173,
    open: false,
    watch: {
      ignored: ['**/*.crdownload', '**/*.tmp', '**/node_modules/**']
    }
  }
});
