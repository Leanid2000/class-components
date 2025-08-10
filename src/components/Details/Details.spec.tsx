import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { DetailsComponent } from './Details';
import userEvent from '@testing-library/user-event';
import { renderWithStore } from '../../test/test-utils/renderWithMockStore';
import { useGetPokemonQuery, useGetPokemonSpeciesQuery } from '../../api/api';
import type { Middleware } from '@reduxjs/toolkit';

const mockedNavigate = vi.fn();
const mockGetSpecies = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ pokemonId: '42', page: '2' }),
  };
});

vi.mock('../../api/api', () => {
  const middleware: Middleware = () => (next) => (action) => {
    return next(action);
  };

  return {
    useGetPokemonQuery: vi.fn(),
    useGetPokemonSpeciesQuery: vi.fn(),
    pokemonApi: {
      reducerPath: 'pokemonApi',
      reducer: (state = {}) => state,
      middleware,
    },
  };
});

describe('DetailsComponent', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    mockGetSpecies.mockClear();
  });

  it('shows pokemon info', async () => {
    const mockPokemon = { img: 'pokemon1.img', name: 'pokemon1', id: 1 };
    const mockSpecies = { descriptions: 'descriptions 1' };
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

    renderWithStore({}, <DetailsComponent />);
    await waitFor(() => {
      expect(screen.getByText(/pokemon1/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/descriptions 1/i)).toBeInTheDocument();
    });
  });

  it('calls navigate with correct page when background or button clicked', async () => {
    const mockPokemon = { img: 'pokemon1.img', name: 'pokemon1', id: 1 };
    const mockSpecies = { descriptions: 'descriptions 1' };
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

    renderWithStore({}, <DetailsComponent />);

    await waitFor(() => {
      expect(screen.getByText(/pokemon1/i)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/2/');
    });
  });
});
