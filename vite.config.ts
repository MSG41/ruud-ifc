// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // To treat 'three' as external (not included in the final bundle)
      external: ['three'],

      // Alternatively, ensure it's included in your bundle if it's not being resolved
      // This might be necessary if there's a specific way you need to handle 'three'
      output: {
        globals: {
          three: 'THREE' // This is generally only necessary if you're treating it as external
        }
      }
    }
  }
});
