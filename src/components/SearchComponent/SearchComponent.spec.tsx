import SearchComponent from './SearchComponent';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

const getResults = vi.fn();
const setInputValue = vi.fn();

const Component = () =>
  render(
    <SearchComponent setInputValue={setInputValue} getResults={getResults} />
  );

describe('SearchComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('Displays the search field and the search button', () => {
    Component();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Displays a previously saved search query from localStorage when mounted', () => {
    localStorage.setItem('inputValue', 'saved term');
    Component();
    expect(screen.getByRole('textbox')).toHaveValue('saved term');
  });

  it('Displays an empty input if the saved term is missing.', () => {
    Component();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('Updates input value when user types', async () => {
    Component();
    await userEvent.type(screen.getByRole('textbox'), 'new text');
    expect(screen.getByRole('textbox')).toHaveValue('new text');
  });

  it('Saves search term to localStorage when search button is clicked', async () => {
    const getResults = vi.fn((page: number, value: string) => {
      localStorage.setItem('inputValue', value);
    });
    render(
      <SearchComponent setInputValue={setInputValue} getResults={getResults} />
    );
    await userEvent.type(screen.getByRole('textbox'), 'new text');
    await userEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('inputValue')).toBe('new text');
  });

  it('Trims whitespace from search input before saving', async () => {
    const getResults = vi.fn((page: number, value: string) => {
      localStorage.setItem('inputValue', value);
    });
    render(
      <SearchComponent setInputValue={setInputValue} getResults={getResults} />
    );
    await userEvent.type(screen.getByRole('textbox'), '    new text    ');
    await userEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('inputValue')).toBe('new text');
  });

  it('Triggers search callback with correct parameters', async () => {
    Component();
    await userEvent.click(screen.getByRole('button'));
    expect(getResults).toHaveBeenCalled();
  });
});
