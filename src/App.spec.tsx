import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  type Mock,
  afterAll,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { configureStore } from '@reduxjs/toolkit';
import type { Pokemon } from './utils/interfaces/pokemonInterfaces';
import selectedItemsReducer from './redux/selectedItemsSlice';
import basicConditionReducer from './redux/basicConditionSlice';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

globalThis.fetch = vi.fn();

const mockPokemonResponse = {
  name: 'pokemon1',
};

const mockAllPokemonsResponse = {
  results: [{ name: 'pokemon1' }, { name: 'pokemon2' }],
};
const mockSpeciesResponse = {
  flavor_text_entries: [
    { flavor_text: 'descriptions', language: { name: 'en' } },
  ],
};

const mockPokemonInfoResponse = {
  sprites: {
    front_default: 'pokemon1.png',
  },
};
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ page: '1' }),
  };
});

const mockedNavigate = vi.fn();

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

const renderWithStore = (preloadedState: PreloadedState = {}) => {
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
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
  );
};
describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('Calls the API when mounting with a saved request', async () => {
    localStorage.setItem('inputValue', 'pokemon1');

    (fetch as Mock).mockImplementation((url: string) => {
      if (url.includes('pokemon-species')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSpeciesResponse),
        });
      }
      if (url.includes('pokemon/pokemon1/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonInfoResponse),
        });
      } else if (url.includes('pokemon/pokemon1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonResponse),
        });
      }
      return Promise.resolve({ ok: false, status: 404 });
    });
    renderWithStore();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/pokemon1/i)).toBeInTheDocument()
    );
  });

  it('Manages the download status and errors in case of a failed request', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    renderWithStore();

    await userEvent.type(screen.getByRole('textbox'), 'no');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() =>
      expect(screen.getByText(/Pokemon not found/i)).toBeInTheDocument()
    );
  });

  it('Calls the API with the correct parameters and updates the status', async () => {
    (fetch as Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSpeciesResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonInfoResponse),
      });

    renderWithStore();

    await userEvent.type(screen.getByRole('textbox'), 'pokemon1');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() =>
      expect(localStorage.getItem('inputValue')).toBe('pokemon1')
    );
    await waitFor(() =>
      expect(screen.getByText(/pokemon1/i)).toBeInTheDocument()
    );
  });

  it('Makes an API call when searching for all the elements', async () => {
    (fetch as Mock).mockImplementation((url: string) => {
      if (url.includes('pokemon-species')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSpeciesResponse),
        });
      }
      if (
        url.includes('pokemon/pokemon1/') ||
        url.includes('pokemon/pokemon2/')
      ) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonInfoResponse),
        });
      } else if (url.includes('pokemon/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAllPokemonsResponse),
        });
      }
      return Promise.resolve({ ok: false, status: 404 });
    });

    renderWithStore();

    await waitFor(() =>
      expect(screen.getByText(/pokemon1/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText(/pokemon2/i)).toBeInTheDocument()
    );
  });

  it('When you click on the "Error" button, an error occurs and the backup interface is displayed. And when you click on "Try again", the backup interface disappears.', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderWithStore();

    await userEvent.click(screen.getByRole('button', { name: /error/i }));
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText(/this is a test error/i)).toBeInTheDocument()
    );
    await userEvent.click(screen.getByRole('button', { name: /try again/i }));
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument()
    );
  });

  it('Error detection in API requests using ErrorBoundary', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 402,
    });

    renderWithStore();
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });
});
