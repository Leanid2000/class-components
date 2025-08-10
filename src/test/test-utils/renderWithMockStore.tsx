import type { Pokemon } from '../../utils/interfaces/pokemonInterfaces';
import selectedItemsReducer from '../../redux/selectedItemsSlice';
import pokemonStateReducer from '../../redux/pokemonStateSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { pokemonApi } from '../../api/pokemonApi';

interface PreloadedState {
  selectedItems?: {
    items?: number[];
    itemsInfo?: Pokemon[];
  };
  pokemonState?: {
    inputValue?: string;
  };
}
export const renderWithStore = (
  preloadedState: PreloadedState = {},
  element: ReactNode
) => {
  const mockedStore = configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      selectedItems: selectedItemsReducer,
      pokemonState: pokemonStateReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState: {
      selectedItems: {
        items: [],
        itemsInfo: [],
        ...preloadedState.selectedItems,
      },
      pokemonState: {
        inputValue: '',
        ...preloadedState.pokemonState,
      },
    },
  });
  return render(
    <Provider store={mockedStore}>
      <MemoryRouter>
        <ErrorBoundary>{element}</ErrorBoundary>
      </MemoryRouter>
    </Provider>
  );
};
