import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import autoprefixer from 'autoprefixer'; // Importamos autoprefixer correctamente

export default defineConfig({
  plugins: [react(), createHtmlPlugin()],
  optimizeDeps: {
    exclude: ['mock-aws-s3', 'aws-sdk', 'nock', '@mapbox/node-pre-gyp'],
  },
  build: {
    target: 'es2015', // Garantizamos compatibilidad con ES2015 (Chrome 49+)
    rollupOptions: {
      external: ['mock-aws-s3', 'aws-sdk', 'nock', '@mapbox/node-pre-gyp'],
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['last 2 versions', 'Chrome >= 49'], // Compatibilidad con Chrome
        }),
      ],
    },
  },
});
