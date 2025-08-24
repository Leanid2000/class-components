import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import App from '../App';
import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import userEvent from '@testing-library/user-event';

vi.mock('../components/Modal', () => ({
  Modal: ({
    children,
    isOpen,
    close,
  }: {
    children: ReactNode;
    isOpen: boolean;
    close: () => void;
  }) => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
    const container = document.getElementById('modal');

    if (!container) {
      throw new Error('Root modal container not found');
    }
    useEffect(() => {
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          close();
        }
      }
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, [close]);

    if (!isOpen) return null;

    return createPortal(
      <>
        <div
          className="absolute left-0 bottom-0 right-0 top-0 bg-amber-600 opacity-50"
          onClick={close}
        ></div>
        {children}
      </>,
      container
    );
  },
}));

describe('App component', () => {
  it('renders App correctly', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Uncontrolled Form/)).toBeInTheDocument();
    expect(screen.getByText(/React Hook Form/)).toBeInTheDocument();
  });

  it('renders Uncontrolled Form correctly', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await userEvent.click(screen.getByText(/Uncontrolled Form/));
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders React Hook Form correctly', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await userEvent.click(screen.getByText(/React Hook Form/));
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders Display after Form submit', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await userEvent.click(screen.getByText(/React Hook Form/));
    await userEvent.type(screen.getByLabelText('Name'), 'Name');
    await userEvent.type(screen.getByLabelText('Age'), '9');
    await userEvent.type(screen.getByLabelText('Email'), 'nmai@asffas.ru');
    await userEvent.type(screen.getByLabelText('Password'), 'Ff3#');
    await userEvent.type(screen.getByLabelText('Repeat the password'), 'Ff3#');
    await userEvent.selectOptions(screen.getByLabelText(/Gender/i), 'Male');
    await userEvent.click(
      screen.getByLabelText(/Accept the terms of the agreement/i)
    );
    await userEvent.type(screen.getByLabelText(/Country/i), 'Russia');
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    await userEvent.upload(screen.getByLabelText('Select a file'), file);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText(/Name/)).toBeInTheDocument();
  });
});
