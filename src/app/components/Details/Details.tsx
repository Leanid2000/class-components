'use client';
import styles from './Details.module.css';
import { Pokemon } from '../../../utils/interfaces/pokemonInterfaces';
import { useRouter } from 'next/navigation';
export const Details = ({
  details,
  page,
}: {
  details: Pokemon;
  page: string;
}) => {
  const router = useRouter();
  //  const pathname = usePathname();

  const pokemonName = details.name.toUpperCase();
  const pokemonDescription = details.descriptions || 'There is no description';
  const pokemonImg = details.img;
  // console.log('pathname',pathname)
  const handleClick = () => {
    router.push(`/${page}/`);
  };

  return (
    <>
      <img
        src={pokemonImg}
        alt={pokemonName}
        className={styles.imgSelectedPokemon}
      />
      <p className={styles.speciesPokemonName}>{pokemonName}</p>
      <p className={styles.speciesSelectedPokemon}>{pokemonDescription}</p>
      <button onClick={handleClick} className={styles.closeButton}>
        Close
      </button>
    </>
  );
};
