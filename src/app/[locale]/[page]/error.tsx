'use client';
import { useEffect } from 'react';
import styles from './Error.module.css';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const router = useRouter();
  const handleClick = () => {
    router.push('/1/');
    setTimeout(() => reset(), 300);
  };

  return (
    <>
      <p className={styles.errorBlock}>Something went wrong</p>
      <button onClick={handleClick} className={styles.errorButton}>
        To the main page
      </button>
    </>
  );
}
