import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedItemsSlice';
import pokemonStateReducer from './pokemonStateSlice';

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    pokemonState: pokemonStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
