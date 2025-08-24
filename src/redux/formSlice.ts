import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Form } from '../schemes/form';

type StoreForm = Omit<Form, 'image'> & {
  image: string;
};

interface Items {
  countries: string[];
  uncontrolled: StoreForm | null;
  hookform: StoreForm | null;
}

const initialState: Items = {
  countries: [
    'Russia',
    'Belarus',
    'Germany',
    'France',
    'China',
    'Belgium',
    'USA',
  ],
  uncontrolled: null,
  hookform: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledData(state, action: PayloadAction<StoreForm>) {
      state.uncontrolled = action.payload;
    },
    setHookformData(state, action: PayloadAction<StoreForm>) {
      state.hookform = action.payload;
    },
  },
});

export const { setUncontrolledData, setHookformData } = formSlice.actions;

export default formSlice.reducer;
