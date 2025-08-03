import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { DetailsComponent } from '../components/Details/Details';
import { AboutUsComponent } from '../components/AboutUs/AboutUs';
import { ErrorPage } from '../components/ErrorPage/Error';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    errorElement: <ErrorPage />,
    children: [{ index: true, element: <></> }],
  },
  {
    path: ':page/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
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
