'use client';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  deleteSelectedItem,
  setSelectedItem,
} from '../../../../redux/selectedItemsSlice';
import { Pokemon } from '../../../../utils/interfaces/pokemonInterfaces';
import { Card } from '../../../components/Сard/Сard';
import { AppDispatch, RootState } from '../../../../redux/store';

export const CardsContainer = ({
  pokemonSpecies,
}: {
  pokemonSpecies: Pokemon;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const isSelected = useSelector((state: RootState) =>
    state.selectedItems.items.includes(pokemonSpecies.id)
  );
  const setItem = (
    event: React.MouseEvent<SVGSVGElement>,
    isSelected: boolean,
    id: number,
    information: Pokemon
  ): void => {
    event.stopPropagation();
    if (isSelected) {
      dispatch(deleteSelectedItem(id));
    } else {
      dispatch(setSelectedItem({ id: id, information }));
    }
  };

  const cardClick = () => {
    const params = new URLSearchParams(searchParams || '');
    params.set('pokemonId', pokemonSpecies.name);
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <Card
      pokemonSpecies={pokemonSpecies}
      isSelected={isSelected}
      setItem={setItem}
      cardClick={cardClick}
    />
  );
};
