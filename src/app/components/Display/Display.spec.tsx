import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import DisplayComponent from '../Display/DisplayContainer';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { renderWithStore } from '../../../test/test-utils/renderWithMockStore';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ page: '1' }),
  };
});

vi.mock('../Сard/Сard', () => ({
  Card: ({ element }: { element: string }) => (
    <div data-testid="card">{element}</div>
  ),
}));

vi.mock('../Pagination/Pagination', () => ({
  Pagination: () => <div data-testid="pagination" />,
}));
const mockedNavigate = vi.fn();

const mockPokemons = [
  {
    name: 'pokemon1',
  },
  {
    name: 'pokemon2',
  },
  {
    name: 'pokemon3',
  },
];

describe('DisplayComponent', () => {
  it('Renders correct number of items when data is provided', () => {
    renderWithStore(
      {},
      <DisplayComponent
        data={mockPokemons}
        error={undefined}
        isFetching={false}
      />
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockPokemons.length);
    expect(cards[0].textContent).toBe('pokemon1');
    expect(cards[1].textContent).toBe('pokemon2');
    expect(cards[2].textContent).toBe('pokemon3');
  });

  it('Displays "no results" message when data array is empty', () => {
    const error = { originalStatus: 404 } as FetchBaseQueryError;
    renderWithStore(
      {},
      <DisplayComponent data={[]} error={error} isFetching={false} />
    );
    expect(screen.getByText(/Pokemon not found/i)).toBeInTheDocument();
  });

  it('Shows loading state while fetching data', () => {
    renderWithStore(
      {},
      <DisplayComponent
        data={mockPokemons}
        error={undefined}
        isFetching={true}
      />
    );
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
