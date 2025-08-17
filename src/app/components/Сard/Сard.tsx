import type {
  Pokemon,
  SetItem,
} from '../../../utils/interfaces/pokemonInterfaces';
import styles from './Card.module.css';
import { ChoiceButton } from '../ChoiceButton/ChoiceButton';

export const Card = ({
  pokemonSpecies,
  isSelected,
  setItem,
  cardClick,
}: {
  pokemonSpecies: Pokemon;
  isSelected: boolean;
  setItem: SetItem;
  cardClick: () => void;
}) => {
  return (
    <div onClick={cardClick}>
      <img
        src={pokemonSpecies.img}
        alt={pokemonSpecies.name}
        className={styles.img}
      />
      <p className={styles.name}>{pokemonSpecies.name}</p>
      <p className={styles.descriptions}>{pokemonSpecies.descriptions}</p>
      <ChoiceButton
        isSelected={isSelected}
        onClick={setItem}
        pokemonSpecies={pokemonSpecies}
      />
    </div>
  );
};
