// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

interface ImportMeta {
  env: {
    DEV: boolean;
    VITE_API_URL?: string;
    MODE: 'development' | 'production';
  };
}

async function prepare() {
  if (import.meta.env.DEV) {
    try {
      // MSW provides its own types, no need to declare them
      const { worker } = await import('./mocks/browser');
      return worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      });
    } catch (error) {
      console.error('MSW initialization failed', error);
      return Promise.resolve();
    }
  }
  return Promise.resolve();
}

prepare().then(() => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');
  
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});