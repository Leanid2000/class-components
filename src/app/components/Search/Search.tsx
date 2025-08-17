'use client';
import {
  memo,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

import styles from './Search.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SearchComponent = memo(({ query }: { query: string }) => {
  // console.log('serch')
  //  const t = useTranslations('HomePage');
  const searchParams = useSearchParams();
  const search = searchParams?.get('query');
  const [valueInStorage, setValueInStorage] = useLocalStorage('');
  const [stateInput, setStateInput] = useState('');
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  // console.log('1',pathname)
  // console.log('2',query)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStateInput(event.target.value);
  };

  const handleClick = useCallback(() => {
    // console.log('555555555555555')
    const value = stateInput.trim();
    // setValueInStorage(value);
    //  setStateInput(value);
    const params = new URLSearchParams();
    if (value) {
      params.set('query', value);
    }
    const newUrl = `${pathname}?${params.toString()}`;
    // console.log('222',query===value)
    if (search !== value) {
      // console.log('1313131131')
      // router.push(`/${pathname}/`);
      router.push(newUrl);
    }
    //   setStateInput(value);
    //  const params = new URLSearchParams(searchParams);
  }, [stateInput, setValueInStorage, replace, pathname, router, search]);
  useEffect(() => {
    if (valueInStorage !== stateInput) {
      setStateInput(valueInStorage);
    }
    setStateInput(query);
  }, [valueInStorage, search, query, stateInput]);

  return (
    <div className={styles.searchBlock}>
      <input
        type="text"
        className={styles.searchInput}
        value={stateInput}
        onChange={handleChange}
      />
      <button className={styles.searchButton} onClick={handleClick}>
        search
      </button>
    </div>
  );
});

export default SearchComponent;
