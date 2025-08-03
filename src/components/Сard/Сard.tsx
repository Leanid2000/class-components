import { useNavigate } from 'react-router-dom';
import type { Pokemon } from '../../utils/interfaces/pokemonInterfaces';
import { HeartSVG } from '../HeartSVG/HeartSVG';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext/ThemeContext';

export const Card = ({ element }: { element: Pokemon }) => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const trueTheme = theme?.theme || 'light';

  return (
    <div
      className={`${trueTheme}ListElement`}
      onClick={() => navigate(`${element.id}`)}
    >
      <img src={element.img} alt={element.name} className="img" />
      <p className="name">{element.name.toUpperCase()}</p>
      <p className="descriptions">
        {element.descriptions || 'There is no description'}
      </p>
      <HeartSVG element={element} />
    </div>
  );
};
