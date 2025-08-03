import { useState, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};
