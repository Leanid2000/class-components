'use client';
import { memo, useEffect, useState, type ChangeEvent } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

import styles from './Search.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const SearchComponent = memo(({ query }: { query: string }) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('query');
  const [valueInStorage, setValueInStorage] = useLocalStorage('');
  const [stateInput, setStateInput] = useState('');
  const pathname = usePathname();
  const t = useTranslations('HomePage');
  const router = useRouter();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStateInput(event.target.value);
  };

  const handleClick = () => {
    const value = stateInput.trim();
    const params = new URLSearchParams();
    if (value) {
      params.set('query', value);
    }
    const newUrl = `${pathname}?${params.toString()}`;
    if (search !== value) {
      router.push(newUrl);
    }
  };
  useEffect(() => {
    if (valueInStorage !== stateInput) {
      setStateInput(valueInStorage);
    }
    setStateInput(query);
    setValueInStorage(query);
  }, [valueInStorage, search, query, stateInput, setValueInStorage]);

  return (
    <div className={styles.searchBlock}>
      <input
        type="text"
        className={styles.searchInput}
        value={stateInput}
        onChange={handleChange}
      />
      <button className={styles.searchButton} onClick={handleClick}>
        {t('search')}
      </button>
    </div>
  );
});

export default SearchComponent;
