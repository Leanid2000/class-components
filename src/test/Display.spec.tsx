import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Display } from '../components/Display';
import type { StoreForm } from '../interfaces/interfaces';

const mockData: StoreForm = {
  name: 'Alex',
  age: 10,
  email: 'email@mail.ru',
  password: '1122',
  passwordRepeat: 'passwordRepeat',
  gender: 'Male',
  checked: true,
  country: 'Belarus',
  image: 'image',
};
describe('Display component', () => {
  it('renders Display correctly', () => {
    render(<Display data={mockData} formName="formName" />);
    expect(screen.getByText(/Alex/)).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
    expect(screen.getByText(/email@mail.ru/)).toBeInTheDocument();
    expect(screen.getByText(/1122/)).toBeInTheDocument();
    expect(screen.getByText(/Male/)).toBeInTheDocument();
    expect(screen.getByText(/Belarus/)).toBeInTheDocument();
  });

  it('renders Display without data', () => {
    const { container } = render(<Display data={null} formName="formName" />);
    expect(container).toBeEmptyDOMElement();
  });
});
