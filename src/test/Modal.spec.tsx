import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

let Modal: typeof import('../components/Modal').Modal;

beforeAll(async () => {
  Modal = (await import('../components/Modal')).Modal;
});

const mockClose = vi.fn();

describe('Modal component', () => {
  afterAll(() => {
    const modalRoot = document.getElementById('modal');
    if (modalRoot) modalRoot.remove();
  });

  it('renders Modal correctly', () => {
    render(
      <Modal isOpen={true} close={mockClose}>
        <div>Test</div>
      </Modal>
    );

    expect(screen.getByText(/Test/)).toBeInTheDocument();
  });

  it('renders Modal correctly with isOpen = false', () => {
    const { container } = render(
      <Modal isOpen={false} close={mockClose}>
        <div>Test</div>
      </Modal>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('calls close when Escape key is pressed', async () => {
    render(
      <Modal isOpen={true} close={mockClose}>
        <div>Modal Content</div>
      </Modal>
    );

    await userEvent.keyboard('{Escape}');
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
