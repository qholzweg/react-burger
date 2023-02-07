export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';
export const DETAILS_OPEN = 'DETAILS_OPEN';
export const DETAILS_CLOSE = 'DETAILS_CLOSE';

export function openDetails({ id }) {
  return function (dispatch, getState) {
    const { ingredients: { all } } = getState();
    const item = all.find(item => item._id === id);
    dispatch({ type: SET_CURRENT_INGREDIENT, item: item });
    dispatch({ type: DETAILS_OPEN });
  }
}
export function closeDetails() {
  return function (dispatch) {
    dispatch({ type: DELETE_CURRENT_INGREDIENT });
    dispatch({ type: DETAILS_CLOSE });
  }
}