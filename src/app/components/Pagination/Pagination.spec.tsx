import { Pagination } from './Pagination';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithStore } from '../../../test/test-utils/renderWithMockStore';
import userEvent from '@testing-library/user-event';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ page: '1' }),
  };
});

describe('SearchComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('displays all pagination elements', () => {
    renderWithStore({}, <Pagination />);
    const ones = screen.getAllByText('1');
    expect(ones.length).toBe(1);
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
    expect(screen.getByText(/6/i)).toBeInTheDocument();
    expect(screen.getByText(/7/i)).toBeInTheDocument();
    expect(screen.getByText(/8/i)).toBeInTheDocument();
    expect(screen.getByText(/9/i)).toBeInTheDocument();
  });

  it('correct operation of the button "Unselect all"', async () => {
    renderWithStore({}, <Pagination />);
    await userEvent.click(screen.getByText(/2/i));
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/2/');
    });
  });
});
