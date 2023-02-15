import { configureStore } from '@reduxjs/toolkit';
import {ingredients, details, burger, order, user} from './reducers';

export const store = configureStore({
  reducer: {
    ingredients, 
    details, 
    burger, 
    order, 
    user,
  }
});
