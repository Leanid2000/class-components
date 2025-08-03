import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../utils/interfaces/pokemonInterfaces';

interface Items {
  items: number[];
  itemsInfo: Pokemon[];
}

const initialState: Items = {
  items: [],
  itemsInfo: [],
};

const selectedItems = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    setSelectedItem: (
      state,
      action: PayloadAction<{ id: number; information: Pokemon }>
    ) => {
      state.items.push(action.payload.id);
      state.itemsInfo.push(action.payload.information);
    },
    deleteSelectedItem: (state, action: PayloadAction<number>) => {
      const element = state.items.indexOf(action.payload);
      state.items.splice(element, 1);
      state.itemsInfo.splice(element, 1);
    },
    deleteAllSelectedItem: (state) => {
      state.items = [];
      state.itemsInfo = [];
    },
  },
});

export const { setSelectedItem, deleteSelectedItem, deleteAllSelectedItem } =
  selectedItems.actions;

export default selectedItems.reducer;
