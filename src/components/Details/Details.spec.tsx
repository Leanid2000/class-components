import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { DetailsComponent } from './Details';
import userEvent from '@testing-library/user-event';

const mockedNavigate = vi.fn();
const mockGetSpecies = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ pokemonId: '42', page: '2' }),
    useOutletContext: () => ({ getSpecies: mockGetSpecies }),
  };
});

describe('DetailsComponent', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    mockGetSpecies.mockClear();
  });

  it('renders loading initially and then shows pokemon info', async () => {
    mockGetSpecies.mockResolvedValue({
      speciesEn: { flavor_text: 'Some description' },
      img: 'test-img.png',
      id: 42,
      name: 'pikachu',
    });

    render(<DetailsComponent />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByAltText('pokemonInf.img')).toBeInTheDocument();
    });

    expect(screen.getByText('PIKACHU')).toBeInTheDocument();
    expect(screen.getByText(/Some description/)).toBeInTheDocument();
  });

  it('calls navigate with correct page when background or button clicked', async () => {
    mockGetSpecies.mockResolvedValue({
      speciesEn: { flavor_text: 'desc' },
      img: 'img.png',
      id: 42,
      name: 'pikachu',
    });

    render(<DetailsComponent />);

    await waitFor(() => {
      expect(screen.getByText('PIKACHU')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/2/');
    });
  });
});
