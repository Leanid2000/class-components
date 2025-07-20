import { Component } from 'react';
import SearchComponent from './components/SearchComponent/SearchComponent';
import DisplayComponent from './components/DisplayComponent/DisplayComponent';
import type { Pokemon } from './utils/interfaces/pokemonInterfaces';
import ErrorComponent from './components/ErrorBoundary/ErrorComponent/ErrorComponent';
import './App.css';

interface State {
  inputValue: string;
  pokemons: Pokemon[];
  loading: boolean;
  isFound: boolean;
  isClickError: boolean;
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
}

interface PokemonsResult {
  results: Pokemon[];
  name: string;
}
class App extends Component<Record<string, never>, State> {
  state = {
    inputValue: '',
    pokemons: [],
    loading: false,
    isFound: true,
    isClickError: false,
  };

  componentDidMount() {
    const inputValueInStorage = localStorage.getItem('inputValue');
    this.getResults(inputValueInStorage || '');
  }

  getSpecies = async (value: string) => {
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
      return { speciesEn: speciesEn, img: img };
    }
  };

  getResults = async (localValue?: string) => {
    this.setState({ loading: true, pokemons: [], isFound: true });
    try {
      const getPokemons = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${localValue || this.state.inputValue}`
      );
      if (getPokemons.status === 404) {
        this.setState({ isFound: false, loading: false });
        localStorage.setItem(
          'inputValue',
          !localValue ? this.state.inputValue : localValue
        );
        return;
      }
      const pokemonsResult: PokemonsResult = await getPokemons.json();
      if (pokemonsResult.results) {
        const descriptions: Pokemon[] = await Promise.all(
          pokemonsResult.results.map(async (pokemon: Pokemon) => {
            const result = await this.getSpecies(pokemon.name);
            return {
              name: pokemon.name,
              descriptions:
                result?.speciesEn?.flavor_text.replace(/\n|\f/g, ' ') || '',
              img: result?.img || '',
            };
          })
        );
        this.processingResult(descriptions);
      } else {
        const species = await this.getSpecies(pokemonsResult.name);
        if (species) {
          const descriptions: Pokemon[] = await Promise.all([
            {
              name: pokemonsResult.name,
              descriptions: species.speciesEn.flavor_text.replace(
                /\n|\f/g,
                ' '
              ),
              img: species?.img || '',
            },
          ]);
          this.processingResult(descriptions, localValue);
        }
      }
    } catch {
      console.log('sdfsdf');
      this.setState({
        loading: false,
        isFound: false,
        pokemons: [],
        isClickError: true,
      });
    }
  };

  processingResult = async (result: Pokemon[], localValue?: string) => {
    this.setState({ loading: false, pokemons: result, isFound: true });
    localStorage.setItem(
      'inputValue',
      !localValue ? this.state.inputValue : localValue
    );
  };

  setInputValue = (value: string) => {
    this.setState({ inputValue: value });
  };

  triggerError = () => {
    this.setState({ isClickError: true });
  };

  render() {
    if (this.state.isClickError) {
      return <ErrorComponent />;
    }
    return (
      <>
        <SearchComponent
          setInputValue={this.setInputValue}
          getResults={this.getResults}
          inputValue={this.state.inputValue}
        />

        <DisplayComponent
          pokemons={this.state.pokemons}
          isFound={this.state.isFound}
          loading={this.state.loading}
        />
        <button className="errorButton" onClick={this.triggerError}>
          Error
        </button>
      </>
    );
  }
}

export default App;
