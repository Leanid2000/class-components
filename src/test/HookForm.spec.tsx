import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HookForm } from '../components/HookForm';
import { UncontrolledForm } from '../components/UncontrolledForm';

const mockSetFormInStore = vi.fn();

describe('HookForm component', () => {
  it('renders HookForm correctly', () => {
    render(
      <HookForm setFormInStore={mockSetFormInStore} countries={['1', '2']} />
    );
    expect(screen.getByLabelText('Name')).toHaveAttribute('id', 'name');
    expect(screen.getByLabelText('Age')).toHaveAttribute('id', 'age');
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText('Password')).toHaveAttribute('id', 'password');
    expect(screen.getByLabelText('Repeat the password')).toHaveAttribute(
      'id',
      'passwordRepeat'
    );
    expect(screen.getByLabelText('Gender')).toHaveAttribute('id', 'gender');
    expect(
      screen.getByLabelText('Accept the terms of the agreement')
    ).toHaveAttribute('id', 'checked');
  });

  it('renders UncontrolledForm correctly', () => {
    render(
      <UncontrolledForm
        setFormInStore={mockSetFormInStore}
        countries={['1', '2']}
      />
    );

    expect(screen.getByLabelText('Name')).toHaveAttribute('id', 'name');
    expect(screen.getByLabelText('Age')).toHaveAttribute('id', 'age');
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText('Password')).toHaveAttribute('id', 'password');
    expect(screen.getByLabelText('Repeat the password')).toHaveAttribute(
      'id',
      'passwordRepeat'
    );
    expect(screen.getByLabelText('Gender')).toHaveAttribute('id', 'gender');
    expect(
      screen.getByLabelText('Accept the terms of the agreement')
    ).toHaveAttribute('id', 'checked');
  });

  it('validation check HookForm', async () => {
    render(
      <HookForm setFormInStore={mockSetFormInStore} countries={['1', '2']} />
    );

    await userEvent.type(screen.getByLabelText('Name'), 'n');
    expect(
      screen.getByText(/The name must begin with a capital letter./)
    ).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Age'), 'n');
    expect(
      screen.getByText(/The value must be a number and > 0/)
    ).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Email'), 'n');
    expect(
      screen.getByText(/Email address must be properly formatted/i)
    ).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Password'), 'nnn');
    expect(
      screen.getByText(/Password must contain at least 1 uppercase letter/)
    ).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Repeat the password'), 'n');
    expect(screen.getByText(/Passwords must match/)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Repeat the password'), 'n');
    expect(screen.getByText(/Passwords must match/)).toBeInTheDocument();
  });
});
