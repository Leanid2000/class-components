import { useState, type ChangeEvent } from 'react';
import './searchComponent.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface SearchProps {
  setInputValue: (value: string) => void;
  getResults: (page: number, value: string) => void;
}

const SearchComponent = ({ setInputValue, getResults }: SearchProps) => {
  const [valueInStorage, setValueInStorage] = useLocalStorage();
  const [stateInput, setStateInput] = useState(valueInStorage);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStateInput(event.target.value);
  };

  const handleClick = () => {
    const value = stateInput.trim();
    setInputValue(value);
    setValueInStorage(value);
    getResults(0, value);
  };

  return (
    <div className="searchBlock">
      <input
        type="text"
        className="searchInput"
        value={stateInput}
        onChange={handleChange}
      />
      <button className="button" onClick={handleClick}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
