import request from '../../utils/request';
import { INGREDIENTS_URL } from '../../utils/constants';

export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';
export const SET_INGREDIENT_COUNT = 'SET_INGREDIENT_COUNT';
export const SET_INGREDIENT_COUNT_BY_TYPE = 'SET_INGREDIENT_COUNT_BY_TYPE';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';
export const DROP_INGRIDIENTS_STATE = 'DROP_INGRIDIENTS_STATE';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    request(INGREDIENTS_URL)
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
        // Приводим хранилище к изначальному состоянию
        dispatch({
          type: DROP_INGRIDIENTS_STATE
        });
      })
  }
}