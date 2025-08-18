import axios, { AxiosResponse } from 'axios';
import { CONSTANTS } from '../../utils/constants/constants';
import {
  PokemonInf,
  PokemonSpecies,
  PokemonsResult,
} from '../../utils/interfaces/pokemonInterfaces';
import { unstable_cache } from 'next/cache';

export interface Error {
  response: {
    status: number;
  };
}

const api = axios.create({
  baseURL: CONSTANTS.API_BASE_URL,
});

export const fetchAllPokemon = unstable_cache(
  async (page: number, query: string) => {
    try {
      const allPokemon = await api.get<
        PokemonsResult,
        AxiosResponse<PokemonsResult, unknown>
      >(`/pokemon/${query}?limit=20&offset=${page * 20}`);
      if (allPokemon.data.results) {
        return allPokemon.data.results;
      }
      return [{ name: query }];
    } catch (error) {
      if ((error as Error).response?.status === 404) {
        return 'Not found';
      }
      return 'Request error';
    }
  }
);

export const fetchPokemonSpecies = unstable_cache(async (name: string) => {
  const [pokemonInf, pokemonDescription] = await Promise.all([
    api.get<PokemonInf, AxiosResponse<PokemonInf, unknown>>(`/pokemon/${name}`),
    api.get<PokemonSpecies, AxiosResponse<PokemonSpecies, unknown>>(
      `/pokemon-species/${name}`
    ),
  ]);
  const speciesEn =
    pokemonDescription.data.flavor_text_entries
      .find((element) => element.language.name === 'en')
      ?.flavor_text.replace(/\n|\f/g, ' ') || '';
  return {
    name: pokemonInf.data.name,
    img: pokemonInf.data.sprites.front_default,
    id: pokemonInf.data.id,
    descriptions: speciesEn,
  };
});
