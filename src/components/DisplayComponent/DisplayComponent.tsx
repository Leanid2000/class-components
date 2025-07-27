import { useEffect, useState } from 'react';
import type { Pokemon } from '../../utils/interfaces/pokemonInterfaces';
import './displayComponent.css';
import { useNavigate, useParams } from 'react-router-dom';

const DisplayComponent = ({
  pokemons,
  isFound,
  loading,
  isAllPokemons,
}: {
  pokemons: Pokemon[];
  isFound: boolean;
  loading: boolean;
  isAllPokemons: boolean;
}) => {
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const [activePage, setActivePage] = useState(Number(page));

  const handleClick = (newPage: number) => {
    setActivePage(newPage + 1);
    navigate(`/${newPage + 1}/`);
  };
  useEffect(() => {
    setActivePage(Number(page));
    if (!Number(page)) {
      setActivePage(1);
    }
    // console.log(activePage)
  }, [page]);
  return (
    <>
      <ul className="list">
        {loading && <p>loading...</p>}
        {!isFound && <p>Pokemon not found</p>}
        {pokemons.map((element: Pokemon) => {
          return (
            <div
              className="listElement"
              key={element.name}
              onClick={() => navigate(`${element.id}`)}
            >
              <img src={element.img} alt={element.name} className="img" />
              <p className="name">{element.name.toUpperCase()}</p>
              <p className="descriptions">
                {element.descriptions || 'There is no description'}
              </p>
            </div>
          );
        })}
      </ul>
      {isAllPokemons && !loading && (
        <div className="paginationBlock">
          {new Array(10).fill(0).map((__, num: number) => {
            return (
              <div
                key={num}
                className="paginationElement"
                onClick={() => handleClick(num)}
                style={{
                  backgroundColor: activePage === num + 1 ? '#4caf50' : '#eee',
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
