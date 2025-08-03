import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedItemsSlice';
import basicConditionReducer from './basicConditionSlice';

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    basicCondition: basicConditionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
