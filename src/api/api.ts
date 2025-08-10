import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Pokemon,
  PokemonDescription,
  PokemonInf,
  PokemonName,
  PokemonSpecies,
  PokemonsResult,
} from '../utils/interfaces/pokemonInterfaces';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemons'],
  endpoints: (build) => ({
    getAllPokemons: build.query<
      PokemonName[],
      { offset: number; valueInStorage: string }
    >({
      query: ({ offset, valueInStorage }) => ({
        url: `pokemon/${valueInStorage}?limit=20&offset=${offset * 20}`,
      }),
      transformResponse: (response: PokemonsResult, __, { valueInStorage }) => {
        if (valueInStorage) {
          return [{ name: valueInStorage }];
        }
        return response.results;
      },
      providesTags: ['Pokemons'],
    }),
    getPokemon: build.query<Pokemon, string>({
      query: (pokemon) => ({
        url: `pokemon/${pokemon}/`,
      }),
      transformResponse: (response: PokemonInf) => {
        return {
          img: response.sprites.front_default || '',
          name: response.name || '',
          id: response.id || 1,
        };
      },
      providesTags: ['Pokemons'],
    }),
    getPokemonSpecies: build.query<PokemonDescription, string>({
      query: (pokemon) => ({
        url: `pokemon-species/${pokemon}`,
      }),
      transformResponse: (response: PokemonSpecies) => {
        const speciesEn =
          response.flavor_text_entries
            .find((element) => element.language.name === 'en')
            ?.flavor_text.replace(/\n|\f/g, ' ') || '';
        return { descriptions: speciesEn };
      },
      providesTags: ['Pokemons'],
    }),
  }),
});

export const {
  useGetAllPokemonsQuery,
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
} = pokemonApi;
