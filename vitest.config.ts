import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      all: true,
      exclude: [
        ...configDefaults.exclude,
        'src/types/*',
        'src/constants/*',
        '**/*.d.ts ',
        'src/mock/*',
        'src/pages/_app.tsx',
        'src/pages/_document.tsx',
        '.next/*',
        'next.config.js',
      ],
    },
  },
});
