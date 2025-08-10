import { useNavigate } from 'react-router-dom';
import styles from './Pagination.module.css';
import { PaginationElement } from './PaginationElement/PaginationElement';

export const Pagination = () => {
  const navigate = useNavigate();
  const paginationElements = new Array(10).fill(0);
  const handleClick = (newPage: number) => {
    navigate(`/${newPage + 1}/`);
  };

  return (
    <div className={styles.paginationBlock}>
      {paginationElements.map((__, num: number) => {
        return (
          <PaginationElement key={num} page={num} handleClick={handleClick} />
        );
      })}
    </div>
  );
};
