import SearchComponent from '../components/Search/Search';
import styles from './App.module.css';
import { Suspense } from 'react';
import { Pagination } from '../components/Pagination/Pagination';
import { Flyout } from '../components/Flyout/Flyout';
import DisplayContainer from '../components/DisplayContainer/DisplayContainer';
import { DetailsContainer } from '../components/DetailsContainer/DetailsContainer';
import { ButtonContainer } from '../components/ButtonContainer/ButtonContainer';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ page: string; locale: string }>;
  searchParams?: Promise<{ query?: string; pokemonId?: string }>;
}) {
  const { page, locale } = await params;
  const query = await searchParams;
  const trueQuery = query?.query || '';
  const clickPokemonId = query?.pokemonId || '';

  return (
    <div className={styles.basicBlock}>
      <div>
        <SearchComponent query={trueQuery} />
        <ButtonContainer locale={locale} page={page} />
        <Suspense fallback={<div>Loading...</div>}>
          <DisplayContainer page={page} query={trueQuery} />
        </Suspense>
        {!trueQuery && <Pagination page={page} />}
      </div>
      <div>
        {clickPokemonId && (
          <Suspense fallback={<div>Loading...</div>}>
            <DetailsContainer page={page} id={clickPokemonId} />
          </Suspense>
        )}
      </div>
      <Flyout />
    </div>
  );
}
