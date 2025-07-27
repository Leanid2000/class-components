import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorPage } from './ErrorPage';

// Мокаем useNavigate из react-router-dom
const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('ErrorPage', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('renders 404 text and button', () => {
    render(<ErrorPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /to the main page/i })
    ).toBeInTheDocument();
  });

  it('calls navigate with "/1/" when button is clicked', async () => {
    render(<ErrorPage />);

    await userEvent.click(
      screen.getByRole('button', { name: /to the main page/i })
    );
    expect(mockedNavigate).toHaveBeenCalledWith('/1/');
  });
});
