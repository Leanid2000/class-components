import { useContext } from 'react';
import './AboutUs.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext/ThemeContext';

export const AboutUs = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const theme = useContext(ThemeContext);
  const trueTheme = theme?.theme || 'light';

  const handleClick = () => {
    navigate(`/${page}`);
  };
  return (
    <div className={`${trueTheme}AboutUsComponent`}>
      <h2 className="aboutUsText">
        The application is designed to demonstrate the React: Routing and Hooks
        task as part of the RSSchool React 2025 Q3 course.
      </h2>
      <p></p>
      <a href="https://github.com/Leanid2000" className="linkGitHub">
        My GitHub
      </a>
      <a href="https://rs.school/" className="linkRSSchool">
        RS School
      </a>
      <button className="errorButton" onClick={handleClick}>
        Go to pokemon
      </button>
    </div>
  );
};
