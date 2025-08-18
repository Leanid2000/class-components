'use client';
import { startTransition, useContext } from 'react';
import { CONSTANTS } from '../../../utils/constants/constants';
import styles from './ButtonContainer.module.css';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { useTranslations } from 'next-intl';

export const ButtonContainer = ({
  locale,
  page,
}: {
  locale: string;
  page: string;
}) => {
  const t = useTranslations('HomePage');
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const pathname = usePathname();
  const href = `${pathname}/about`;
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
        {t('theme')}
      </button>
      <Link href={`${href}`} className={styles.buttonAboutUs}>
        {t('about')}
      </Link>
      <button className={styles.buttonTheme} onClick={handleClickError}>
        {t('error')}
      </button>
      <button className={styles.buttonTheme} onClick={changingLocale}>
        {t('language')}
      </button>
    </>
  );
};
