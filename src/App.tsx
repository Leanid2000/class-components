import { useContext, useEffect, useRef, useState } from 'react';
import SearchComponent from './components/SearchComponent/SearchComponent';
import DisplayComponent from './components/DisplayComponent/DisplayComponent';
import type { Pokemon } from './utils/interfaces/pokemonInterfaces';
import ErrorComponent from './components/ErrorBoundary/ErrorComponent/ErrorComponent';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store';
import { setBasicCondition } from './redux/basicConditionSlice';
import { Flyout } from './components/Flyout/Flyout';
import { ThemeContext } from './components/ThemeContext/ThemeContext';

interface PokemonSpecies {
  flavor_text_entries: PokemonSpeciesText[];
}
interface PokemonSpeciesText {
  flavor_text: string;
  language: { name: string };
}

interface PokemonInf {
  sprites: { front_default: string };
  id: number;
  name: string;
}

interface PokemonsResult {
  results: Pokemon[];
  name: string;
  id: number;
}

const App = () => {
  //   const [state, setState] = useState<State>(initialState);
  const [valueInStorage, setValueInStorage] = useLocalStorage();
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
  const trueTheme = theme?.theme || 'light';
  const getSpecies = async (value: string) => {
    const getSpecies = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${value}`
    );
    const information = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${value}/`
    );
    if (!getSpecies.ok || !information.ok) {
      throw new Error(`Error: ${getSpecies.status} ${getSpecies.statusText}`);
    }
    const species: PokemonSpecies = await getSpecies.json();
    const speciesEn = species.flavor_text_entries.find(
      (element) => element.language.name === 'en'
    );
    const fullInformation: PokemonInf = await information.json();
    const img: string = fullInformation.sprites.front_default;

    if (speciesEn) {
      return {
        name: fullInformation.name,
        speciesEn: speciesEn,
        img: img,
        id: fullInformation.id,
      };
    }
  };
  const processingResult = (
    result: Pokemon[],
    isAllPokemons: boolean,
    localValue?: string
  ) => {
    // setState({
    //   ...state,
    //   loading: false,
    //   pokemons: result,
    //   isFound: true,
    //   isAllPokemons: isAllPokemons,
    // });
    dispatch(
      setBasicCondition({
        ...basicCondition,
        loading: false,
        pokemons: result,
        isFound: true,
        isAllPokemons: isAllPokemons,
      })
    );
    setValueInStorage(localValue || basicCondition.inputValue);
  };
  const getResults = async (offset: number, localValue?: string) => {
    dispatch(
      setBasicCondition({
        ...basicCondition,
        loading: true,
        pokemons: [],
        isFound: true,
      })
    );
    // console.log(localValue);
    try {
      const getPokemons = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${localValue || basicCondition.inputValue}?limit=20&offset=${offset * 20}`
      );
      if (getPokemons.status === 404) {
        dispatch(
          setBasicCondition({
            ...basicCondition,
            pokemons: [],
            isFound: false,
            loading: false,
            isAllPokemons: false,
          })
        );
        setValueInStorage(localValue || basicCondition.inputValue);
        return;
      }
      const pokemonsResult: PokemonsResult = await getPokemons.json();
      if (pokemonsResult.results) {
        const descriptions: Pokemon[] = await Promise.all(
          pokemonsResult.results.map(async (pokemon: Pokemon) => {
            const result = await getSpecies(pokemon.name);
            return {
              name: pokemon.name,
              descriptions:
                result?.speciesEn?.flavor_text.replace(/\n|\f/g, ' ') || '',
              img: result?.img || '',
              id: result?.id || 1,
            };
          })
        );
        processingResult(descriptions, true);
      } else {
        const species = await getSpecies(pokemonsResult.name);
        if (species) {
          const descriptions: Pokemon[] = await Promise.all([
            {
              name: pokemonsResult.name,
              descriptions: species.speciesEn.flavor_text.replace(
                /\n|\f/g,
                ' '
              ),
              img: species?.img || '',
              id: species.id,
            },
          ]);
          processingResult(descriptions, false, localValue);
        }
      }
    } catch {
      dispatch(
        setBasicCondition({
          ...basicCondition,
          loading: false,
          isFound: false,
          pokemons: [],
          isClickError: true,
        })
      );
    }
    // console.log(theme?.theme);
  };

  const setInputValue = (value: string) => {
    dispatch(setBasicCondition({ ...basicCondition, inputValue: value }));
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
        getResults(0, valueInStorage);
      }
      isFirstLayout.current = false;
    }
    if (page) {
      getResults(Number(page) - 1, valueInStorage);
    }
  }, [page]);

  if (isClickError) {
    return <ErrorComponent />;
  }

  return (
    <div
      className={`${trueTheme}BasicBlock`}
      style={basicCondition.pokemons.length === 1 ? { height: '100vh' } : {}}
    >
      <div className="searchBlockComponent">
        <SearchComponent
          setInputValue={setInputValue}
          getResults={getResults}
        />
        <button className={`${trueTheme}ButtonTheme`} onClick={changeTheme}>
          Theme
        </button>
        <button
          className={`${trueTheme}ButtonAboutUs`}
          onClick={() => navigate(`/${page}/about`)}
        >
          About us
        </button>
        <DisplayComponent />
        <button
          className={`${trueTheme}ErrorButton`}
          onClick={() => setIsClickError(true)}
        >
          Error
        </button>
      </div>
      <div>
        <Outlet context={{ getSpecies }} />
      </div>
      {selectedItems.length > 0 && <Flyout />}
    </div>
  );
};

export default App;
