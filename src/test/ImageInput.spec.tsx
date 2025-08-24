import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ImageInput } from '../components/ImageInput';
import userEvent from '@testing-library/user-event';

const mockFileChange = vi.fn();

describe('ImageInput component', () => {
  it('renders ImageInput correctly', () => {
    render(
      <ImageInput
        id="image"
        errorMassage={undefined}
        label="image"
        onFileChange={mockFileChange}
      />
    );
    expect(screen.getByLabelText('Select a file')).toHaveAttribute(
      'type',
      'file'
    );
  });

  it('renders ImageInput with Error correctly', () => {
    render(
      <ImageInput
        id="image"
        errorMassage={'Error'}
        label="image"
        onFileChange={mockFileChange}
      />
    );
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });

  it('checking the function execution onFileChange', async () => {
    render(
      <ImageInput
        id="image"
        errorMassage=""
        label="image"
        onFileChange={mockFileChange}
      />
    );

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    await userEvent.upload(screen.getByLabelText('Select a file'), file);
    await waitFor(() => {
      expect(mockFileChange).toHaveBeenCalled();
    });
  });
});
