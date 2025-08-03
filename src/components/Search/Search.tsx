import { useContext, useState, type ChangeEvent } from 'react';
import './search.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ThemeContext } from '../ThemeContext/ThemeContext';

interface SearchProps {
  setInputValue: (value: string) => void;
  getResults: (page: number, value: string) => void;
}

const SearchComponent = ({ setInputValue, getResults }: SearchProps) => {
  const [valueInStorage, setValueInStorage] = useLocalStorage();
  const [stateInput, setStateInput] = useState(valueInStorage);
  const theme = useContext(ThemeContext);
  const trueTheme = theme?.theme || 'light';

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
      <button className={`${trueTheme}Button`} onClick={handleClick}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
