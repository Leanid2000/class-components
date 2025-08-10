import { useNavigate, useParams } from 'react-router-dom';
import styles from './Pagination.module.css';

export const Pagination = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();

  const handleClick = (newPage: number) => {
    navigate(`/${newPage + 1}/`);
  };

  return (
    <div className={styles.paginationBlock}>
      {new Array(10).fill(0).map((__, num: number) => {
        return (
          <div
            key={num}
            className={styles.paginationElement}
            onClick={() => handleClick(num)}
            style={{
              backgroundColor: Number(page) === num + 1 ? '#4caf50' : '#eee',
            }}
          >
            {num + 1}
          </div>
        );
      })}
    </div>
  );
};
