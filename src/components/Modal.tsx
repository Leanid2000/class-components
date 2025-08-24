import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { EVENT } from '../constants/constants';

const container = document.getElementById('modal');

if (!container) {
  throw new Error('Root modal container not found');
}

export const Modal = ({
  children,
  isOpen,
  close,
}: {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}) => {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === EVENT.KEY_Escape) {
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
};
