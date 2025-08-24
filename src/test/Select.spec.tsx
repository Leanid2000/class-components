import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Select } from '../components/Select';

const mockRegister = vi.fn();

describe('Select component', () => {
  it('renders label and select correctly', () => {
    render(<Select id="gender" label="gender" options={['1', '2', '3']} />);

    expect(screen.getByLabelText('gender')).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();

    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'gender');
  });

  it('calls register function when provided', () => {
    render(
      <Select
        id="gender"
        label="gender"
        options={['1', '2', '3']}
        register={mockRegister}
      />
    );
    expect(mockRegister).toHaveBeenCalledWith('gender');
  });
});
