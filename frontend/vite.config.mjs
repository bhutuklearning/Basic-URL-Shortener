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
      jsxRuntime: 'classic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'classic' }]
        ],
      },
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
    // Prevent Vite from trying to bundle native modules (.node)
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
      // Optional fallback for lightningcss
      'lightningcss/node/index.js': 'lightningcss/dist/browser.js',
    },
  },
});
