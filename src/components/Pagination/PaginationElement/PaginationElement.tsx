import { useParams } from 'react-router-dom';
import styles from './PaginationElement.module.css';

export const PaginationElement = ({
  page,
  handleClick,
}: {
  page: number;
  handleClick: (page: number) => void;
}) => {
  const { page: currentPage } = useParams<{ page: string }>();
  const truePage = page + 1;
  const color = Number(currentPage) === truePage ? '#4caf50' : '#eee';
  return (
    <div
      className={styles.paginationElement}
      onClick={() => handleClick(page)}
      style={{
        backgroundColor: color,
      }}
    >
      {truePage}
    </div>
  );
};
