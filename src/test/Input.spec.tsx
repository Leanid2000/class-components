import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '../components/Input';

const mockRegister = vi.fn();

describe('Input component', () => {
  it('renders label and input correctly', () => {
    render(<Input id="name" label="Name" errorMassage={undefined} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'name');
  });

  it('renders error message when passed', () => {
    render(<Input id="email" label="Email" errorMassage="Invalid email" />);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('calls register function when provided', () => {
    render(
      <Input
        id="name"
        label="Username"
        errorMassage=""
        register={mockRegister}
      />
    );
    expect(mockRegister).toHaveBeenCalledWith('name');
  });

  it('sets input type to file when type prop is "file"', () => {
    render(
      <Input
        id="image"
        label="image"
        errorMassage="Invalid Password"
        type="file"
      />
    );
    expect(screen.getByLabelText('image')).toHaveAttribute('type', 'file');
  });

  it('sets autofocus attribute when focus prop is true', () => {
    render(<Input id="name" label="Focus test" errorMassage="" focus={true} />);
    expect(document.activeElement).toBe(screen.getByLabelText('Focus test'));
  });
});
