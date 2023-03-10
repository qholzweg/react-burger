import { configureStore } from '@reduxjs/toolkit';
import {ingredients, burger, order, user} from './reducers';

export const store = configureStore({
  reducer: {
    ingredients, 
    burger, 
    order, 
    user,
  }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
