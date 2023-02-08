import { combineReducers } from 'redux';
import { ingredients } from './ingredients';
import { details } from './details';
import { burger } from './burger';
import { order } from './order';
import { user } from './user';

export const rootReducer = combineReducers({ ingredients, details, burger, order, user})