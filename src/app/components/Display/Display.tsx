// 'use client';
import { Suspense } from 'react';
import { PokemonName } from '../../../utils/interfaces/pokemonInterfaces';
import styles from './Display.module.css';
import { FetchCardContainer } from '../FetchCardContainer/FetchCardContainer';

export const Display = ({ allPokemons }: { allPokemons: PokemonName[] }) => {
  return (
    <ul className={styles.list}>
      {allPokemons.map((element: PokemonName, num: number) => {
        return (
          <div className={styles.listElement} key={num}>
            <Suspense fallback={<div>Loading...</div>}>
              <FetchCardContainer name={element.name} />
            </Suspense>
          </div>
        );
      })}
    </ul>
  );
};
