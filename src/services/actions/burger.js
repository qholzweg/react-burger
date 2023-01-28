import { INCREASE_INGREDIENT_COUNT, DECREASE_INGREDIENT_COUNT, SET_INGREDIENT_COUNT, SET_INGREDIENT_COUNT_BY_TYPE } from "./ingredients";

export const ADD_SELECTED_ITEM = 'ADD_SELECTED_ITEM';
export const DELETE_SELECTED_ITEM = 'DELETE_SELECTED_ITEM';
export const COUNT_TOTAL = 'COUNT_TOTAL';
export const MOVE_SELECTED_ITEM = 'MOVE_SELECTED_ITEM';

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