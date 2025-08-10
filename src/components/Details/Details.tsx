import { useNavigate, useParams } from 'react-router-dom';
import styles from './Details.module.css';
import {
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
} from '../../api/pokemonApi';

export const DetailsComponent = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();

  const {
    data: pokemon,
    isFetching: isFetchingPokemon,
    error: errorPokemon,
  } = useGetPokemonQuery(pokemonId || '');
  const {
    data: pokemonSpecies,
    isFetching: isFetchingSpecies,
    error: errorSpecies,
  } = useGetPokemonSpeciesQuery(pokemonId || '');
  const isFetching = isFetchingPokemon || isFetchingSpecies;
  const pokemonName = pokemon?.name.toUpperCase();
  const pokemonDescription =
    pokemonSpecies?.descriptions || 'There is no description';
  const pokemonImg = pokemon?.img;

  const handleClick = () => {
    navigate(`/${page}/`);
  };

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
    <>
      <div className={styles.background} onClick={handleClick}></div>
      <div className={styles.detailsComponentBlock}>
        {isFetching ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            <img
              src={pokemonImg}
              alt={pokemonName}
              className={styles.imgSelectedPokemon}
            />
            <p className={styles.speciesPokemonName}>{pokemonName}</p>
            <p className={styles.speciesSelectedPokemon}>
              {pokemonDescription}
            </p>
            <button onClick={handleClick} className={styles.closeButton}>
              Close
            </button>
          </>
        )}
      </div>
    </>
  );
};
