import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './routers/AppRouter.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { ContextProvider } from './components/ThemeContext/ContextProvider.tsx';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found');
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ContextProvider>
          <RouterProvider router={AppRouter} />
        </ContextProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
