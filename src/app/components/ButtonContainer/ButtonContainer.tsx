'use client';
import { startTransition, useContext } from 'react';
import { CONSTANTS } from '../../../utils/constants/constants';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import styles from './ButtonContainer.module.css';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export const ButtonContainer = ({
  locale,
  page,
}: {
  locale: string;
  page: string;
}) => {
  //  const t = useTranslations('HomePage');
  const theme = useContext(ThemeContext);
  const router = useRouter();
  //   const router = useRouter();
  const pathname = usePathname();
  const href = `${pathname}/about`;
  //   const fullUrl = query ? `${pathname}?${searchParams}/about` : `${pathname}/about`;
  const changingTheme = () => {
    if (theme?.theme === CONSTANTS.LIGHT_THEME) {
      theme.setTheme(CONSTANTS.DARK_THEME);
    } else {
      theme?.setTheme(CONSTANTS.LIGHT_THEME);
    }
  };

  const handleClickError = () =>
    startTransition(() => {
      throw new Error('Exception');
    });

  const changingLocale = () => {
    if (locale === 'en') {
      router.push(`/ru/${page}/`);
    } else {
      router.push(`/en/${page}/`);
    }
  };

  return (
    <>
      <button className={styles.buttonTheme} onClick={changingTheme}>
        {'theme'}
      </button>
      <Link href={`${href}`} className={styles.buttonAboutUs}>
        {'about'}
      </Link>
      <button className={styles.buttonTheme} onClick={handleClickError}>
        {'error'}
      </button>
      <button className={styles.buttonTheme} onClick={changingLocale}>
        {'language'}
      </button>
    </>
  );
};
