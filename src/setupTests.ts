/// <reference types="vitest/globals" />

import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { expect } from 'vitest';
import '@testing-library/jest-dom';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
