import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AboutUsComponent } from './AboutUsComponent';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ page: '1' }),
  };
});

const mockedNavigate = vi.fn();

describe('AboutUsComponent', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('renders static text and links', () => {
    render(<AboutUsComponent />);

    expect(
      screen.getByText(/The application is designed to demonstrate/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/My GitHub/i)).toHaveAttribute(
      'href',
      'https://github.com/Leanid2000'
    );
    expect(screen.getByText(/RS School/i)).toHaveAttribute(
      'href',
      'https://rs.school/'
    );
    expect(
      screen.getByRole('button', { name: /Go to pokemon/i })
    ).toBeInTheDocument();
  });

  it('calls navigate with correct page on button click', async () => {
    render(<AboutUsComponent />);

    await userEvent.click(
      screen.getByRole('button', { name: /Go to pokemon/i })
    );
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/1'));
  });
});
