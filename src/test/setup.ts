import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;

// Mock requestAnimationFrame
globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
  return setTimeout(cb, 0) as unknown as number;
};

globalThis.cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};

// Mock matchMedia for prefers-reduced-motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});
