// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Ensure the output directory is set to 'build'
    rollupOptions: {
      // Removing the external configuration to include 'three' in the bundle
      // If specific control over how 'three' is bundled is needed, adjust here
    },
  },
});
