import { Flyout } from './Flyout';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithStore } from '../../test/test-utils/renderWithMockStore';
import userEvent from '@testing-library/user-event';

describe('SearchComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('Displays 2 action buttons and a text message', () => {
    renderWithStore({}, <Flyout />);
    expect(screen.getByText(/you have selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('correct operation of the button "Unselect all"', async () => {
    renderWithStore(
      {
        selectedItems: {
          items: [2, 5, 12],
          itemsInfo: [],
        },
      },
      <Flyout />
    );
    expect(
      screen.getByText(/you have selected 3 Pokemon/i)
    ).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole('button', { name: /unselect all/i })
    );
    await waitFor(() => {
      expect(
        screen.getByText(/you have selected 0 Pokemon/i)
      ).toBeInTheDocument();
    });
  });
});
