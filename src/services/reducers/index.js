import { combineReducers } from 'redux';
import { ingredients, details, burger, order } from './burger';

export const rootReducer = combineReducers({ ingredients, details, burger, order})