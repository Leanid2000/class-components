import { useContext } from 'react';
import type { Pokemon } from '../../utils/interfaces/pokemonInterfaces';
import './display.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { Card } from '../Сard/Сard';
import { Pagination } from '../Pagination/Pagination';

const DisplayComponent = () => {
  const theme = useContext(ThemeContext);
  const trueTheme = theme?.theme || 'light';
  const basicCondition = useSelector(
    (state: RootState) => state.basicCondition.basicCondition
  );
  const isPagination = basicCondition.isAllPokemons && !basicCondition.loading;

  if (basicCondition.loading) {
    return <p className={`${trueTheme}ListLoading`}>loading...</p>;
  }

  if (!basicCondition.isFound) {
    return <p className={`${trueTheme}ListNotFound`}>Pokemon not found</p>;
  }

  return (
    <>
      <ul className="list">
        {basicCondition.pokemons.map((element: Pokemon) => {
          return <Card key={element.name} element={element} />;
        })}
      </ul>
      {isPagination && <Pagination />}
    </>
  );
};

export default DisplayComponent;
