import { Component } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent/SearchComponent';
import DisplayComponent from './components/DisplayComponent/DisplayComponent';
import type { Pokemon } from './utils/interfaces/pokemonInterfaces';

interface State {
  inputValue: string;
  pokemons: Pokemon[];
  loading: boolean;
  isFound: boolean;
}

interface PokemonSpecies {
  flavor_text_entries: PokemonSpeciesText[];
}
interface PokemonSpeciesText {
  flavor_text: string;
  language: { name: string };
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
  };

  componentDidMount() {
    const inputValueInStorage = localStorage.getItem('inputValue');
    console.log(inputValueInStorage);

    this.getResults(inputValueInStorage || '');
  }

  getSpecies = async (value: string) => {
    const getSpecies = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${value}`
    );
    if (!getSpecies.ok) {
      throw new Error(`Error: ${getSpecies.status} ${getSpecies.statusText}`);
    }
    const species: PokemonSpecies = await getSpecies.json();
    const speciesEn = species.flavor_text_entries.find(
      (element) => element.language.name === 'en'
    );
    if (speciesEn) {
      return speciesEn;
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
            const speciesEn = await this.getSpecies(pokemon.name);
            return {
              name: pokemon.name,
              descriptions: speciesEn?.flavor_text.replace(/\n|\f/g, ' ') || '',
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
              descriptions: species.flavor_text.replace(/\n|\f/g, ' '),
            },
          ]);
          this.processingResult(descriptions);
        }
      }
    } catch {
      this.setState({ loading: false, isFound: false, pokemons: [] });
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

  render() {
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
      </>
    );
  }
}

export default App;
