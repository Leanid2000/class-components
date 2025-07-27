import { useLayoutEffect, useRef, useState } from 'react';
import SearchComponent from './components/SearchComponent/SearchComponent';
import DisplayComponent from './components/DisplayComponent/DisplayComponent';
import type { Pokemon } from './utils/interfaces/pokemonInterfaces';
import ErrorComponent from './components/ErrorBoundary/ErrorComponent/ErrorComponent';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

interface State {
  inputValue: string;
  pokemons: Pokemon[];
  loading: boolean;
  isFound: boolean;
  isClickError: boolean;
  isAllPokemons: boolean;
  //   firstLayout:boolean
}

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
const initialState = {
  inputValue: '',
  pokemons: [],
  loading: false,
  isFound: true,
  isClickError: false,
  isAllPokemons: true,
  // firstLayout: true
};

const App = () => {
  const [state, setState] = useState<State>(initialState);
  const [valueInStorage, setValueInStorage] = useLocalStorage();
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const isFirstLayout = useRef(true);

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
    setState({
      ...state,
      loading: false,
      pokemons: result,
      isFound: true,
      isAllPokemons: isAllPokemons,
    });
    setValueInStorage(localValue || state.inputValue);
  };
  const getResults = async (offset: number, localValue?: string) => {
    setState({ ...state, loading: true, pokemons: [], isFound: true });
    console.log(localValue);
    try {
      const getPokemons = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${localValue || state.inputValue}?limit=20&offset=${offset * 20}`
      );
      if (getPokemons.status === 404) {
        setState({
          ...state,
          pokemons: [],
          isFound: false,
          loading: false,
          isAllPokemons: false,
        });
        setValueInStorage(localValue || state.inputValue);
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
      setState({
        ...state,
        loading: false,
        isFound: false,
        pokemons: [],
        isClickError: true,
      });
    }
  };

  const setInputValue = (value: string) => {
    setState({ ...state, inputValue: value });
  };
  useLayoutEffect(() => {
    if (isFirstLayout.current) {
      if (!page) {
        navigate(`/1/`);
      }

      isFirstLayout.current = false;
      //  console.log(state.firstLayout)
    }

    getResults(Number(page) - 1, valueInStorage);
  }, [page]);
  if (state.isClickError) {
    return <ErrorComponent />;
  }

  return (
    <div className="basicBlock">
      <div className="searchBlockComponent">
        <SearchComponent
          setInputValue={setInputValue}
          getResults={getResults}
        />
        <button
          className="buttonAboutUs"
          onClick={() => navigate(`/${page}/about`)}
        >
          About us
        </button>
        <DisplayComponent
          pokemons={state.pokemons}
          isFound={state.isFound}
          loading={state.loading}
          isAllPokemons={state.isAllPokemons}
        />
        <button
          className="errorButton"
          onClick={() => setState({ ...state, isClickError: true })}
        >
          Error
        </button>
      </div>
      <div>
        <Outlet context={{ getSpecies }} />
      </div>
    </div>
  );
};

export default App;
