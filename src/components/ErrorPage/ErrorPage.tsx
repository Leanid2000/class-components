import './ErrorPage.css';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/1/');
  };
  return (
    <>
      <p className="errorBlock">404</p>
      <button onClick={handleClick} className="errorButton">
        {' '}
        To the main page
      </button>
    </>
  );
};
