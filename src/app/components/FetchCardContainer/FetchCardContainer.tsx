import { fetchPokemonSpecies } from '../../api/pokemonApi';
import { CardsContainer } from '../CardsContainer/CardsContainer';

export const FetchCardContainer = async ({ name }: { name: string }) => {
  const pokemonSpecies = await fetchPokemonSpecies(name);
  return <CardsContainer pokemonSpecies={pokemonSpecies} />;
};
