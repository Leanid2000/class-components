export interface Pokemon {
  name: string;
  descriptions?: string;
  img: string;
  id: number;
}

export interface PokemonSpecies {
  flavor_text_entries: PokemonSpeciesText[];
}
export interface PokemonSpeciesText {
  flavor_text: string;
  language: { name: string };
}

export interface PokemonInf {
  sprites: { front_default: string };
  id: number;
  name: string;
}

export interface PokemonsResult {
  results: PokemonName[];
  name: string;
  id: number;
}

export interface PokemonName {
  name: string;
}

export interface PokemonDescription {
  descriptions: string;
}
