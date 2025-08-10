import { useState, type ChangeEvent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import styles from './Search.module.css';

interface SearchProps {
  setInputValue: (value: string) => void;
}

const SearchComponent = ({ setInputValue }: SearchProps) => {
  const [valueInStorage, setValueInStorage] = useLocalStorage();
  const [stateInput, setStateInput] = useState(valueInStorage);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStateInput(event.target.value);
  };

  const handleClick = () => {
    const value = stateInput.trim();
    setInputValue(value);
    setValueInStorage(value);
    // getResults(0, value);
  };

  return (
    <div className={styles.searchBlock}>
      <input
        type="text"
        className={styles.searchInput}
        value={stateInput}
        onChange={handleChange}
      />
      <button className={styles.searchButton} onClick={handleClick}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
