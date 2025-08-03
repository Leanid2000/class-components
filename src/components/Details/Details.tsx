import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import './Details.css';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../ThemeContext/ThemeContext';

interface Species {
  speciesEn: { flavor_text: string };
  img: string;
  id: number;
  name: string;
}

export const DetailsComponent = () => {
  const [pokemonInf, setPokemonInf] = useState<Species>({
    speciesEn: { flavor_text: '' },
    img: '1',
    id: 1,
    name: '',
  });
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const { page } = useParams<{ page: string }>();
  const theme = useContext(ThemeContext);
  const trueTheme = theme?.theme || 'light';
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getSpecies } = useOutletContext<{
    getSpecies: (value: string) => Promise<Species>;
  }>();

  const handleClick = () => {
    navigate(`/${page}/`);
  };
  useEffect(() => {
    const getPokemonInf = async () => {
      setLoading(true);
      const information = await getSpecies(pokemonId || '1');
      setPokemonInf({ ...information });
      setLoading(false);
    };
    getPokemonInf();
  }, [pokemonId, getSpecies]);

  return (
    <>
      <div className="background" onClick={handleClick}></div>
      <div className={`${trueTheme}DetailsComponentBlock`}>
        {!loading ? (
          <>
            <img
              src={pokemonInf.img}
              alt={'pokemonInf.img'}
              className="imgSelectedPokemon"
            />
            <p className="speciesPokemonName">
              {pokemonInf.name.toUpperCase()}
            </p>
            <p className="speciesSelectedPokemon">
              {pokemonInf.speciesEn?.flavor_text.replace(/\n|\f/g, ' ') ||
                'There is no description'}
            </p>
            <button onClick={handleClick} className="closeButton">
              Close
            </button>
          </>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </>
  );
};
