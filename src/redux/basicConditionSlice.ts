import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../utils/interfaces/pokemonInterfaces';

interface State {
  inputValue: string;
  pokemons: Pokemon[];
  loading: boolean;
  isFound: boolean;
  isClickError: boolean;
  isAllPokemons: boolean;
}

interface BasicCondition {
  basicCondition: State;
}
const initialState: BasicCondition = {
  basicCondition: {
    inputValue: '',
    pokemons: [],
    loading: false,
    isFound: true,
    isClickError: false,
    isAllPokemons: true,
  },
};

const basicCondition = createSlice({
  name: 'basicCondition',
  initialState,
  reducers: {
    setBasicCondition: (state, action: PayloadAction<State>) => {
      state.basicCondition = action.payload;
    },
  },
});

export const { setBasicCondition } = basicCondition.actions;

export default basicCondition.reducer;
