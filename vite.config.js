import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    cssMinify: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
          if (id.includes('node_modules/lucide')) {
            return 'vendor-lucide';
          }
        }
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
