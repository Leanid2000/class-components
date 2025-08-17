import styles from './DisplayContainer.module.css';

import { fetchAllPokemon } from '../../api/pokemonApi';

import { Display } from '../Display/Display';

const DisplayContainer = async ({
  page,
  query,
}: {
  page: string;
  query: string;
}) => {
  const truePage = Number(page) - 1;
  const allPokemons = await fetchAllPokemon(truePage, query);
  if (allPokemons === 'Not found') {
    return <p className={styles.listNotFound}>Pokemon not found</p>;
  }
  if (allPokemons === 'Request error') {
    return <p className={styles.listNotFound}>Request error</p>;
  }
  return <Display allPokemons={allPokemons} />;
};

export default DisplayContainer;
