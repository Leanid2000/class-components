import { useNavigate } from 'react-router-dom';
import styles from './Error.module.css';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/1/');
  };
  return (
    <>
      <p className={styles.errorBlock}>404</p>
      <button onClick={handleClick} className={styles.errorButton}>
        To the main page
      </button>
    </>
  );
};
