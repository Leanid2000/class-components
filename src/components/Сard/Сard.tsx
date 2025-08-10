import { useNavigate } from 'react-router-dom';
import { useGetPokemonQuery, useGetPokemonSpeciesQuery } from '../../api/api';
import { CardContent } from './CardContent/CardContent';
import styles from './Card.module.css';

export const Card = ({ element }: { element: string }) => {
  const navigate = useNavigate();

  const {
    data: pokemon,
    isFetching: isFetchingPokemon,
    error: errorPokemon,
  } = useGetPokemonQuery(element);
  const {
    data: pokemonSpecies,
    isFetching: isFetchingSpecies,
    error: errorSpecies,
  } = useGetPokemonSpeciesQuery(element);

  const isFetching = isFetchingPokemon || isFetchingSpecies;

  if (errorPokemon || errorSpecies) {
    if (errorPokemon) {
      console.error('Request error:', errorPokemon);
    }
    if (errorSpecies) {
      console.error('Request error:', errorSpecies);
    }
    return <p className="error">Error</p>;
  }

  return (
    <div
      className={styles.listElement}
      onClick={() => navigate(`${pokemon?.id}`)}
    >
      <CardContent
        pokemon={pokemon}
        pokemonSpecies={pokemonSpecies}
        isFetching={isFetching}
      />
    </div>
  );
};
