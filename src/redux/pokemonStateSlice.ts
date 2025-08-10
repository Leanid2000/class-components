import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface State {
  inputValue: string;
}

const initialState: State = {
  inputValue: '',
};

const pokemonState = createSlice({
  name: 'pokemonState',
  initialState,
  reducers: {
    setPokemonState: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setPokemonState } = pokemonState.actions;

export default pokemonState.reducer;
