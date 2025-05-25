// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Type assertion if needed
export const worker = setupWorker(...handlers as any[]);