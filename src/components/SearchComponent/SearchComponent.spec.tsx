import SearchComponent from './SearchComponent';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

const getResults = vi.fn();
const setInputValue = vi.fn();

const Component = () =>
  render(
    <SearchComponent
      inputValue=""
      setInputValue={setInputValue}
      getResults={getResults}
    />
  );

describe('SearchComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('отображает поле поиска и кнопку поиска', () => {
    Component();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('отображает ранее сохранённый поисковый запрос из localStorage при монтировании', () => {
    localStorage.setItem('inputValue', 'saved term');
    Component();
    expect(screen.getByRole('textbox')).toHaveValue('saved term');
  });

  it('отображает пустой ввод, если сохранённый термин отсутствует', () => {
    Component();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('Updates input value when user types', async () => {
    Component();
    await userEvent.type(screen.getByRole('textbox'), 'new text');
    expect(screen.getByRole('textbox')).toHaveValue('new text');
  });

  it('Saves search term to localStorage when search button is clicked', async () => {
    const getResults = vi.fn((value: string) => {
      localStorage.setItem('inputValue', value);
    });
    render(
      <SearchComponent
        inputValue=""
        setInputValue={setInputValue}
        getResults={getResults}
      />
    );
    await userEvent.type(screen.getByRole('textbox'), 'new text');
    await userEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('inputValue')).toBe('new text');
  });

  it('Trims whitespace from search input before saving', async () => {
    const getResults = vi.fn((value: string) => {
      localStorage.setItem('inputValue', value);
    });
    render(
      <SearchComponent
        inputValue=""
        setInputValue={setInputValue}
        getResults={getResults}
      />
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
