// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Set the build output directory to 'build'
    rollupOptions: {
      // To treat 'three' as external (not included in the final bundle)
      external: ['three'],
      output: {
        // Define globals for externalized imports
        globals: {
          three: 'THREE',
        },
      },
    },
  },
});
