// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
// });






import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Determine if we're in production mode
  const isProduction = mode === 'production';

  return {
    plugins: [
      tailwindcss(),
      react(),
      EnvironmentPlugin('VITE_'), // Load all variables prefixed with VITE_
    ],
    server: {
      port: 5173, // Default port for Vite
      // Proxy configuration only for development
      ...(!isProduction && {
        proxy: {
          '/api': {
            target: 'http://localhost:9000',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
          },
        }
      })
    },
    // Production-specific build settings
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      // Enable source maps for debugging in production
      sourcemap: isProduction ? false : 'inline',
    }
  };
});
