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
    render(<App />);
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

    render(<App />);

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

    render(<App />);

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

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText(/pokemon1/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText(/pokemon2/i)).toBeInTheDocument()
    );
  });
});
