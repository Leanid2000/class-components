import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { DetailsComponent } from '../components/DetailsComponent/DetailsComponent';
import { AboutUsComponent } from '../components/AboutUsCompmnent/AboutUsCompmnent';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [{ index: true, element: <></> }],
  },
  {
    path: ':page/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <></> },
      { path: ':pokemonId', element: <DetailsComponent /> },
    ],
  },
  {
    path: ':page/about',
    element: <AboutUsComponent />,
  },
]);
