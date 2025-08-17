import { Suspense } from 'react';
import { fetchPokemonSpecies } from '../../api/pokemonApi';
import { Details } from '../Details/Details';
import styles from './Details.module.css';

export const DetailsContainer = async ({
  id,
  page,
}: {
  id: string;
  page: string;
}) => {
  const details = await fetchPokemonSpecies(id);
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.detailsComponentBlock}>
        <Suspense fallback={<div>Loading...</div>}>
          <Details details={details} page={page} />
        </Suspense>
      </div>
    </>
  );
};
