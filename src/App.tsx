import { useContext, useEffect, useRef, useState } from 'react';
import SearchComponent from './components/Search/Search';
import DisplayComponent from './components/Display/Display';
import ErrorComponent from './components/ErrorBoundary/ErrorComponent/ErrorComponent';
import styles from './App.module.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store';
import { setBasicCondition } from './redux/basicConditionSlice';
import { Flyout } from './components/Flyout/Flyout';
import { ThemeContext } from './components/ThemeContext/ThemeContext';
import { pokemonApi, useGetAllPokemonsQuery } from './api/api';

const App = () => {
  const [valueInStorage] = useLocalStorage();
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const isFirstLayout = useRef(true);
  const [isClickError, setIsClickError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useContext(ThemeContext);
  const basicCondition = useSelector(
    (state: RootState) => state.basicCondition.basicCondition
  );
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  const offset = Number(page) - 1;

  const {
    data: allPokemons,
    isFetching,
    error,
  } = useGetAllPokemonsQuery({
    offset,
    valueInStorage: basicCondition.inputValue || valueInStorage,
  });

  const setInputValue = (value: string) => {
    dispatch(setBasicCondition({ ...basicCondition, inputValue: value }));
  };

  const updateСache = () => {
    dispatch(pokemonApi.util.invalidateTags(['Pokemons']));
  };

  const changeTheme = () => {
    if (theme?.theme === 'light') {
      theme.setTheme('dark');
    } else {
      theme?.setTheme('light');
    }
  };
  useEffect(() => {
    if (isFirstLayout.current) {
      if (!page) {
        navigate(`/1/`);
      }
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
          onClick={() => navigate(`/${page}/about`)}
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
        <button
          className={styles.errorButton}
          onClick={() => setIsClickError(true)}
        >
          Error
        </button>
      </div>
      <div>
        <Outlet />
      </div>
      {selectedItems.length > 0 && <Flyout />}
    </div>
  );
};

export default App;
