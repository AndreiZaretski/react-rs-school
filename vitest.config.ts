import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config';

export default defineConfig({
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
        'src/main.tsx',
      ],
    },
  },
});
