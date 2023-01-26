import request from '../../utils/request';
import { INGREDIENTS_URL, ORDERS_URL } from '../../utils/constants';

export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';
export const SET_INGREDIENT_COUNT = 'SET_INGREDIENT_COUNT';
export const SET_INGREDIENT_COUNT_BY_TYPE = 'SET_INGREDIENT_COUNT_BY_TYPE';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';
export const DETAILS_OPEN = 'DETAILS_OPEN';
export const DETAILS_CLOSE = 'DETAILS_CLOSE';

export const ADD_SELECTED_ITEM = 'ADD_SELECTED_ITEM';
export const DELETE_SELECTED_ITEM = 'DELETE_SELECTED_ITEM';
export const COUNT_TOTAL = 'COUNT_TOTAL';
export const MOVE_SELECTED_ITEM = 'MOVE_SELECTED_ITEM';

export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const ORDER_OPEN = 'ORDER_OPEN';
export const ORDER_CLOSE = 'ORDER_CLOSE';

export const DROP_INGRIDIENTS_STATE = 'DROP_INGRIDIENTS_STATE';
export const DROP_ORDER_STATE = 'DROP_ORDER_STATE';
// export const  = '';

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
        dispatch({
          type: DROP_INGRIDIENTS_STATE
        });
      })
  }
}

export function openDetails({ id }) {
  return function (dispatch, getState) {
    const { ingredients: { all } } = getState();
    const item = all.find(item => item._id === id);
    dispatch({ type: SET_CURRENT_INGREDIENT, item: item });
    dispatch({ type: DETAILS_OPEN });
  }
}

export function addSelectedItem({ id }) {
  return function (dispatch, getState) {
    const { ingredients: { all } } = getState();
    const item = all.find(item => item._id === id);
    dispatch({
      type: ADD_SELECTED_ITEM,
      item: item
    });
    if (item.type !== 'bun') {
      dispatch({
        type: INCREASE_INGREDIENT_COUNT,
        id: id
      });
    } else {
      dispatch({
        type: SET_INGREDIENT_COUNT_BY_TYPE,
        ingredientType: 'bun',
        count: 0
      });
      dispatch({
        type: SET_INGREDIENT_COUNT,
        id: id,
        count:2
      });
    }
    dispatch({
      type: COUNT_TOTAL
    });
  }
}
export function deleteSelectedItem(id) {
  return function (dispatch) {
    dispatch({
      type: DELETE_SELECTED_ITEM,
      id: id
    });
    dispatch({
      type: DECREASE_INGREDIENT_COUNT,
      id: id
    });
  }
}

export function getOrder(ids, onSuccess) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    request(ORDERS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "ingredients": ids })
    })
      .then(res => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res
        });
        if (typeof onSuccess === 'function') onSuccess();
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_ORDER_FAILED
        });
        dispatch({
          type: DROP_ORDER_STATE
        });
        dispatch({
          type: ORDER_OPEN
        });
      })
  }
}