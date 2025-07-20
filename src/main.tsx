import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found');
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
