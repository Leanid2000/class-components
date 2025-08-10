import { useContext, useEffect, useRef, useState } from 'react';
import SearchComponent from './components/Search/Search';
import DisplayComponent from './components/Display/Display';
import ErrorComponent from './components/ErrorBoundary/ErrorComponent/ErrorComponent';
import styles from './App.module.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store';
import { setPokemonState } from './redux/pokemonStateSlice';
import { Flyout } from './components/Flyout/Flyout';
import { ThemeContext } from './components/ThemeContext/ThemeContext';
import { pokemonApi, useGetAllPokemonsQuery } from './api/pokemonApi';
import { CONSTANTS } from './utils/constants/constants';

const App = () => {
  const [valueInStorage] = useLocalStorage();
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const isFirstLayout = useRef(true);
  const [isClickError, setIsClickError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useContext(ThemeContext);
  const basicCondition = useSelector(
    (state: RootState) => state.pokemonState.inputValue
  );
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const offset = Number(page) - 1;
  const isItemSelected = selectedItems.length > 0;
  const {
    data: allPokemons,
    isFetching,
    error,
  } = useGetAllPokemonsQuery({
    offset,
    valueInStorage: basicCondition,
  });

  const setInputValue = (value: string) => {
    dispatch(setPokemonState(value));
  };

  const updateСache = () => {
    dispatch(pokemonApi.util.invalidateTags(['Pokemons']));
  };

  const changeTheme = () => {
    if (theme?.theme === CONSTANTS.LIGHT_THEME) {
      theme.setTheme(CONSTANTS.DARK_THEME);
    } else {
      theme?.setTheme(CONSTANTS.LIGHT_THEME);
    }
  };

  const handleNavigateToAboutPage = () => {
    navigate(`/${page}/about`);
  };

  const setError = () => {
    setIsClickError(true);
  };

  useEffect(() => {
    if (isFirstLayout.current) {
      if (!page) {
        navigate(`/1/`);
      }
      dispatch(setPokemonState(valueInStorage));
      isFirstLayout.current = false;
    }
  }, [page]);

  if (isClickError) {
    return <ErrorComponent />;
  }

  return (
    <div className={styles.basicBlock}>
      <div>
        <SearchComponent setInputValue={setInputValue} />
        <button className={styles.buttonTheme} onClick={changeTheme}>
          Theme
        </button>
        <button
          className={styles.buttonAboutUs}
          onClick={handleNavigateToAboutPage}
        >
          About us
        </button>
        <button className={styles.buttonRefetch} onClick={updateСache}>
          Refetch
        </button>
        <DisplayComponent
          data={allPokemons}
          error={error}
          isFetching={isFetching}
        />
        <button className={styles.errorButton} onClick={setError}>
          Error
        </button>
      </div>
      <div>
        <Outlet />
      </div>
      {isItemSelected && <Flyout />}
    </div>
  );
};

export default App;
