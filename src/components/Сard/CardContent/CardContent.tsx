import { useDispatch, useSelector } from 'react-redux';
import type {
  Pokemon,
  PokemonDescription,
} from '../../../utils/interfaces/pokemonInterfaces';
import styles from './CardContent.module.css';
import { ChoiceButton } from '../../ChoiceButton/ChoiceButton';
import type { AppDispatch, RootState } from '../../../redux/store';
import {
  deleteSelectedItem,
  setSelectedItem,
} from '../../../redux/selectedItemsSlice';

const defaultPokemonValue = {
  id: 1,
  name: '',
  img: '',
};

const defaultSpeciesValue = {
  descriptions: '',
};

export const CardContent = ({
  pokemon = defaultPokemonValue,
  pokemonSpecies = defaultSpeciesValue,
  isFetching,
}: {
  pokemon: Pokemon | undefined;
  pokemonSpecies: PokemonDescription | undefined;
  isFetching: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const information = { ...pokemon, ...pokemonSpecies };
  const isSelected = selectedItems.includes(pokemon.id);
  const pokemonName = pokemon.name.toUpperCase();
  const pokemonDescription =
    pokemonSpecies?.descriptions || 'There is no description';
  const pokemonImg = pokemon.img;

  const setItem = (event: React.MouseEvent<SVGSVGElement>): void => {
    event.stopPropagation();
    if (isSelected) {
      dispatch(deleteSelectedItem(pokemon.id));
    } else {
      dispatch(setSelectedItem({ id: pokemon.id, information }));
    }
  };

  if (isFetching) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.contentContainer}>
      <img src={pokemonImg} alt={pokemonName} className={styles.img} />
      <p className={styles.name}>{pokemonName}</p>
      <p className={styles.descriptions}>{pokemonDescription}</p>
      <ChoiceButton isSelected={isSelected} onClick={setItem} />
    </div>
  );
};
