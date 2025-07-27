import { useState } from 'react';

export const useLocalStorage = (): [string, (value: string) => void] => {
  const valueInStorage = localStorage.getItem('inputValue');
  const [value, setValue] = useState(valueInStorage || '');

  const setValueInLocalStorage = (value: string) => {
    localStorage.setItem('inputValue', value);
    setValue(value);
  };

  return [value, setValueInLocalStorage];
};
