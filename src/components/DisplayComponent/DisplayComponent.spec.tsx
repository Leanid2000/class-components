import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DisplayComponent from './DisplayComponent';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ page: '1' }),
  };
});

const mockedNavigate = vi.fn();

const mockPokemons = [
  {
    name: 'pokemon1',
    descriptions: 'Descriptions pokemon1',
    img: 'pokemon1.png',
    id: 1,
  },
  {
    name: 'pokemon2',
    descriptions: 'Descriptions pokemon2',
    img: 'pokemon2.png',
    id: 2,
  },
  {
    name: 'pokemon3',
    descriptions: 'Descriptions pokemon3',
    img: 'pokemon3.png',
    id: 3,
  },
];

describe('DisplayComponent', () => {
  it('Renders correct number of items when data is provided', () => {
    render(
      <MemoryRouter>
        <DisplayComponent
          pokemons={mockPokemons}
          isFound={true}
          loading={false}
          isAllPokemons={true}
        />
      </MemoryRouter>
    );
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);
    expect(screen.getByText(/pokemon1/)).toBeInTheDocument();
    expect(screen.getByText(/Descriptions pokemon1/)).toBeInTheDocument();
    expect(screen.getByText(/pokemon2/)).toBeInTheDocument();
    expect(screen.getByText(/Descriptions pokemon2/)).toBeInTheDocument();
    expect(screen.getByText(/pokemon3/)).toBeInTheDocument();
    expect(screen.getByText(/Descriptions pokemon3/)).toBeInTheDocument();
  });

  it('Displays "no results" message when data array is empty', () => {
    render(
      <MemoryRouter>
        <DisplayComponent
          pokemons={[]}
          isFound={false}
          loading={false}
          isAllPokemons={true}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/Pokemon not found/)).toBeInTheDocument();
  });

  it('Shows loading state while fetching data', () => {
    render(
      <MemoryRouter>
        <DisplayComponent
          pokemons={[]}
          isFound={false}
          loading={true}
          isAllPokemons={true}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading.../)).toBeInTheDocument();
  });

  it('Handles missing or undefined data gracefully', () => {
    const mockPokemons = [
      {
        name: 'No pokemon',
        descriptions: '',
        img: '',
        id: 1,
      },
    ];
    render(
      <MemoryRouter>
        <DisplayComponent
          pokemons={mockPokemons}
          isFound={true}
          loading={false}
          isAllPokemons={true}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/No pokemon/i)).toBeInTheDocument();
    expect(screen.getByAltText(/No pokemon/i)).toBeInTheDocument();
    expect(screen.getByText(/There is no description/)).toBeInTheDocument();
  });
});
