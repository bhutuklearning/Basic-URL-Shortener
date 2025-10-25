// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
// });






import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
  optimizeDeps: {
    exclude: ['@tailwindcss/oxide', 'lightningcss'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      exclude: ['@tailwindcss/oxide', 'lightningcss'],
    },
  },
  resolve: {
    alias: {
      'lightningcss/node/index.js': 'lightningcss/dist/browser.js',
    },
  },
});
