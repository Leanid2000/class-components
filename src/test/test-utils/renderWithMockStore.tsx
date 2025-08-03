import type { Pokemon } from '../../utils/interfaces/pokemonInterfaces';
import selectedItemsReducer from '../../redux/selectedItemsSlice';
import basicConditionReducer from '../../redux/basicConditionSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

interface PreloadedState {
  selectedItems?: {
    items?: number[];
    itemsInfo?: Pokemon[];
  };
  basicCondition?: {
    basicCondition: {
      loading?: boolean;
      isFound?: boolean;
      pokemons?: Pokemon[];
      isAllPokemons?: boolean;
      inputValue?: string;
      isClickError?: boolean;
    };
  };
}
export const renderWithStore = (
  preloadedState: PreloadedState = {},
  element: ReactNode
) => {
  const mockedStore = configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
      basicCondition: basicConditionReducer,
    },
    preloadedState: {
      selectedItems: {
        items: [],
        itemsInfo: [],
        ...preloadedState.selectedItems,
      },
      basicCondition: {
        basicCondition: {
          loading: false,
          isFound: true,
          pokemons: [],
          isAllPokemons: true,
          inputValue: '',
          isClickError: false,
          ...preloadedState.basicCondition?.basicCondition,
        },
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
