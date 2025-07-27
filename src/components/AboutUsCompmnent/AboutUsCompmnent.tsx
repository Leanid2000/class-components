import './AboutUsCompmnent.css';
import { useNavigate, useParams } from 'react-router-dom';

export const AboutUsComponent = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const handleClick = () => {
    navigate(`/${page}`);
  };
  return (
    <div className="aboutUsCompmnent">
      <h2 className="aboutUsText">
        The application is designed to demonstrate the React: Routing and Hooks
        task as part of the RSSchool React 2025 Q3 course.
      </h2>
      <p></p>
      <a href="https://github.com/Leanid2000" className="link">
        {' '}
        My GitHub
      </a>
      <a href="https://rs.school/" className="link">
        {' '}
        RS School
      </a>
      <button className="errorButton" onClick={handleClick}>
        Go to pokemon
      </button>
    </div>
  );
};
