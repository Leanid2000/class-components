'use client';
import { useEffect, useState } from 'react';

export const useLocalStorage = (value: string) => {
  const [storedValue, setStoredValue] = useState(value);
  // () => {
  //     const item = localStorage?.getItem(key);
  //     return item !== null ? item : initialValue;
  //   }
  const setValue = (value: string) => {
    setStoredValue(value);
    localStorage.setItem('inputValue', value);
  };
  useEffect(() => {
    const item = localStorage.getItem('inputValue');
    if (item) {
      setStoredValue(item);
    }
  }, [storedValue]);

  return [storedValue, setValue] as const;
};
