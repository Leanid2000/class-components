import { useContext } from 'react';
import type { Pokemon } from '../../utils/interfaces/pokemonInterfaces';
import './displayComponent.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import {
  deleteSelectedItem,
  setSelectedItem,
} from '../../redux/selectedItemsSlice';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const DisplayComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const theme = useContext(ThemeContext);
  const trueTheme = theme?.theme || 'light';
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const basicCondition = useSelector(
    (state: RootState) => state.basicCondition.basicCondition
  );

  const handleClick = (newPage: number) => {
    navigate(`/${newPage + 1}/`);
  };

  const setItem = (
    event: React.MouseEvent<SVGSVGElement>,
    id: number,
    information: Pokemon
  ): void => {
    event.stopPropagation();
    if (selectedItems.includes(id)) {
      dispatch(deleteSelectedItem(id));
    } else {
      dispatch(setSelectedItem({ id, information }));
    }
  };

  return (
    <>
      <ul className="list">
        {basicCondition.loading && (
          <p className={`${trueTheme}ListLoading`}>loading...</p>
        )}
        {!basicCondition.isFound && (
          <p className={`${trueTheme}ListNotFound`}>Pokemon not found</p>
        )}
        {basicCondition.pokemons.map((element: Pokemon) => {
          return (
            <div
              className={`${trueTheme}ListElement`}
              key={element.name}
              onClick={() => navigate(`${element.id}`)}
            >
              <img src={element.img} alt={element.name} className="img" />
              <p className="name">{element.name.toUpperCase()}</p>
              <p className="descriptions">
                {element.descriptions || 'There is no description'}
              </p>
              <svg
                className="svgHeart"
                width="30px"
                height="30px"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(event) => setItem(event, element.id, element)}
              >
                <path
                  d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"
                  fill={
                    selectedItems.includes(element.id)
                      ? 'red'
                      : trueTheme === 'dark'
                        ? 'green'
                        : 'black'
                  }
                />
              </svg>
            </div>
          );
        })}
      </ul>
      {basicCondition.isAllPokemons && !basicCondition.loading && (
        <div className="paginationBlock">
          {new Array(10).fill(0).map((__, num: number) => {
            return (
              <div
                key={num}
                className="paginationElement"
                onClick={() => handleClick(num)}
                style={{
                  backgroundColor:
                    Number(page) === num + 1 ? '#4caf50' : '#eee',
                }}
              >
                {num + 1}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DisplayComponent;
