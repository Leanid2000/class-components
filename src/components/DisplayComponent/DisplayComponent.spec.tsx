import DisplayComponent from './DisplayComponent';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

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
      <DisplayComponent
        pokemons={mockPokemons}
        isFound={true}
        loading={false}
        isAllPokemons={true}
      />
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
      <DisplayComponent
        pokemons={[]}
        isFound={false}
        loading={false}
        isAllPokemons={true}
      />
    );
    expect(screen.getByText(/Pokemon not found/)).toBeInTheDocument();
  });

  it('Shows loading state while fetching data', () => {
    render(
      <DisplayComponent
        pokemons={[]}
        isFound={false}
        loading={true}
        isAllPokemons={true}
      />
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
      <DisplayComponent
        pokemons={mockPokemons}
        isFound={true}
        loading={false}
        isAllPokemons={true}
      />
    );
    expect(screen.getByText(/No pokemon/i)).toBeInTheDocument();
    expect(screen.getByAltText(/No pokemon/i)).toBeInTheDocument();
    expect(screen.getByText(/There is no description/)).toBeInTheDocument();
  });
});
