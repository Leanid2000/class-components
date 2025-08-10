import type { PokemonName } from '../../utils/interfaces/pokemonInterfaces';
import styles from './Display.module.css';
import { Card } from '../Сard/Сard';
import { Pagination } from '../Pagination/Pagination';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

const DisplayComponent = ({
  data = [{ name: '' }],
  error,
  isFetching,
}: {
  data: PokemonName[] | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching: boolean;
}) => {
  const isPagination = data.length > 1;

  if (isFetching) {
    return <p className={styles.listLoading}>loading...</p>;
  }

  if (error && 'originalStatus' in error) {
    if (error.originalStatus === 404) {
      return <p className={styles.listNotFound}>Pokemon not found</p>;
    } else {
      console.error('Request error:', error);
      return <p className={styles.error}>Error: {JSON.stringify(error)}</p>;
    }
  }

  return (
    <>
      <ul className={styles.list}>
        {data?.map((element: PokemonName, num: number) => {
          return <Card key={num} element={element.name} />;
        })}
      </ul>
      {isPagination && <Pagination />}
    </>
  );
};

export default DisplayComponent;
