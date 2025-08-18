'use client';

import React from 'react';
import styles from './Pagination.module.css';
import { PaginationElement } from './PaginationElement/PaginationElement';
import { useRouter } from 'next/navigation';

export const Pagination = React.memo(({ page }: { page: string }) => {
  const router = useRouter();
  const paginationElements = new Array(10).fill(0);
  const handleClick = (newPage: number) => {
    if (page === (newPage + 1).toString()) {
      return;
    }
    router.push(`/${newPage + 1}/`);
  };

  return (
    <div className={styles.paginationBlock}>
      {paginationElements.map((__, num: number) => {
        return (
          <PaginationElement
            key={num}
            page={num}
            handleClick={handleClick}
            urlPage={page}
          />
        );
      })}
    </div>
  );
});
