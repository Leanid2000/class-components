import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  type Mock,
  afterAll,
} from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { renderWithStore } from './test/test-utils/renderWithMockStore';
import type { Middleware } from '@reduxjs/toolkit';
import {
  useGetAllPokemonsQuery,
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
} from './api/pokemonApi';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ page: '1' }),
    Outlet: () => <div>Outlet</div>,
  };
});
vi.mock('./api/pokemonApi', () => {
  const middleware: Middleware = () => (next) => (action) => {
    return next(action);
  };

  return {
    useGetPokemonQuery: vi.fn(),
    useGetPokemonSpeciesQuery: vi.fn(),
    useGetAllPokemonsQuery: vi.fn(),
    pokemonApi: {
      reducerPath: 'pokemonApi',
      reducer: (state = {}) => state,
      middleware,
    },
  };
});
const mockedNavigate = vi.fn();

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('Calls the API when mounting with a saved request', async () => {
    localStorage.setItem('inputValue', 'pokemon1');
    const mockPokemon = { img: 'pokemon1.img', name: 'pokemon1', id: 1 };
    const mockSpecies = { descriptions: 'descriptions 1' };
    (useGetAllPokemonsQuery as Mock).mockReturnValue({
      data: [{ name: 'pokemon1' }, { name: 'pokemon2' }],
      isFetching: false,
      error: null,
    });
    (useGetPokemonQuery as Mock).mockReturnValue({
      data: mockPokemon,
      isFetching: false,
      error: null,
    });
    (useGetPokemonSpeciesQuery as Mock).mockReturnValue({
      data: mockSpecies,
      isFetching: false,
      error: null,
    });
    renderWithStore({}, <App />);
    expect(screen.getByText('About us')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Outlet')).toBeInTheDocument();
    expect(useGetAllPokemonsQuery).toHaveBeenCalledWith({
      offset: 0,
      valueInStorage: 'pokemon1',
    });
    expect(useGetPokemonQuery).toHaveBeenCalledWith('pokemon1');
    expect(useGetPokemonSpeciesQuery).toHaveBeenCalledWith('pokemon1');
  });

  it('Manages the download status and errors in case of a failed request', async () => {
    const error = { originalStatus: 404 } as FetchBaseQueryError;
    (useGetAllPokemonsQuery as Mock).mockReturnValue({
      data: [{ name: 'pokemon1' }, { name: 'pokemon2' }],
      isFetching: false,
      error: error,
    });
    (useGetPokemonQuery as Mock).mockReturnValue({
      data: [],
      isFetching: false,
      error: null,
    });
    (useGetPokemonSpeciesQuery as Mock).mockReturnValue({
      data: [],
      isFetching: false,
      error: null,
    });
    renderWithStore({}, <App />);

    await userEvent.type(screen.getByRole('textbox'), 'no');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() =>
      expect(screen.getByText(/Pokemon not found/i)).toBeInTheDocument()
    );
  });

  it('Makes an API call when searching for all the elements', async () => {
    const mockPokemon1 = { img: 'pokemon1.img', name: 'pokemon1', id: 1 };
    const mockSpecies1 = { descriptions: 'descriptions 1' };

    const mockPokemon2 = { img: 'pokemon2.img', name: 'pokemon2', id: 2 };
    const mockSpecies2 = { descriptions: 'descriptions 2' };

    (useGetAllPokemonsQuery as Mock).mockReturnValue({
      data: [{ name: 'pokemon1' }, { name: 'pokemon2' }],
      isFetching: false,
      error: null,
    });

    (useGetPokemonQuery as Mock)
      .mockImplementationOnce(() => ({
        data: mockPokemon1,
        isFetching: false,
        error: null,
      }))
      .mockImplementationOnce(() => ({
        data: mockPokemon2,
        isFetching: false,
        error: null,
      }));

    (useGetPokemonSpeciesQuery as Mock)
      .mockImplementationOnce(() => ({
        data: mockSpecies1,
        isFetching: false,
        error: null,
      }))
      .mockImplementationOnce(() => ({
        data: mockSpecies2,
        isFetching: false,
        error: null,
      }));

    renderWithStore({}, <App />);
    expect(useGetAllPokemonsQuery).toHaveBeenCalledWith({
      offset: 0,
      valueInStorage: '',
    });
    await waitFor(() =>
      expect(screen.getByText(/pokemon1/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText(/pokemon2/i)).toBeInTheDocument()
    );
  });

  it('When you click on the "Error" button, an error occurs and the backup interface is displayed. And when you click on "Try again", the backup interface disappears.', async () => {
    const mockPokemon1 = { img: 'pokemon1.img', name: 'pokemon1', id: 1 };
    const mockSpecies1 = { descriptions: 'descriptions 1' };
    vi.spyOn(console, 'error').mockImplementation(() => {});
    (useGetAllPokemonsQuery as Mock).mockReturnValue({
      data: [{ name: 'pokemon1' }, { name: 'pokemon2' }],
      isFetching: false,
      error: null,
    });
    (useGetPokemonQuery as Mock).mockReturnValue({
      data: mockPokemon1,
      isFetching: false,
      error: null,
    });
    (useGetPokemonSpeciesQuery as Mock).mockReturnValue({
      data: mockSpecies1,
      isFetching: false,
      error: null,
    });
    renderWithStore({}, <App />);

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
    const error = { originalStatus: 402 } as FetchBaseQueryError;
    (useGetAllPokemonsQuery as Mock).mockReturnValue({
      data: [{ name: 'pokemon1' }, { name: 'pokemon2' }],
      isFetching: false,
      error: error,
    });
    (useGetPokemonQuery as Mock).mockReturnValue({
      data: [],
      isFetching: false,
      error: null,
    });
    (useGetPokemonSpeciesQuery as Mock).mockReturnValue({
      data: [],
      isFetching: false,
      error: null,
    });

    renderWithStore({}, <App />);
    await waitFor(() =>
      expect(screen.getByText(/{"originalStatus":402}/i)).toBeInTheDocument()
    );
  });
});
