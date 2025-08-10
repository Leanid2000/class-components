import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import DisplayComponent from './Display';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { renderWithStore } from '../../test/test-utils/renderWithMockStore';

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

// vi.mock('../path/to/pokemonApi', () => ({
//   pokemonApi: {
//     useGetPokemonsQuery: () => ({
//       data: [
//         { name: 'pokemon1' },
//         { name: 'pokemon2' },
//         { name: 'pokemon3' },
//       ],
//       error: undefined,
//       isFetching: false,
//     }),
//     reducerPath: 'pokemonApi',
//     reducer: () => (state = {}) => state,
//     middleware: () => (next: any) => (action: any) => next(action),
//   },
// }));
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
  // it('renders list of cards when data is present', () => {
  //     const data = [{ name: 'Pikachu' }, { name: 'Bulbasaur' }];
  //     render(<DisplayComponent data={data} error={undefined} isFetching={false} />);
  //     const cards = screen.getAllByTestId('card');
  //     expect(cards.length).toBe(data.length);
  //     expect(cards[0].textContent).toBe('Pikachu');
  //     expect(cards[1].textContent).toBe('Bulbasaur');
  //   });

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

  //   it('Handles missing or undefined data gracefully', () => {
  //     const mockPokemons = [
  //       {
  //         name: 'No pokemon',
  //         descriptions: '',
  //         img: '',
  //         id: 1,
  //       },
  //     ];
  //     renderWithStore(
  //       {
  //         basicCondition: {
  //           basicCondition: {
  //             pokemons: mockPokemons,
  //           },
  //         },
  //       },
  //       <DisplayComponent />
  //     );
  //     expect(screen.getByText(/No pokemon/i)).toBeInTheDocument();
  //     expect(screen.getByAltText(/No pokemon/i)).toBeInTheDocument();
  //     expect(screen.getByText(/There is no description/)).toBeInTheDocument();
  //   });
});
