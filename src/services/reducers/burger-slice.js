import { createSlice } from "@reduxjs/toolkit"
import { decreaseIngredientCount, increaseIngredientCount, setIngredientCount, setIngredientCountByType } from "./ingredients-slice";
import { selectIngredient } from "./selectors";

function countTotalFn(content) {
  let total = 0;
  const { bun, filling } = content;
  if (bun) total = bun.price * 2;
  if (filling && filling.length) total += filling.reduce((acc, current) => acc + current.price, 0);
  return total;
}
function deleteElement(array, id) {
  let arrayCopy = [...array];
  arrayCopy.splice(arrayCopy.findIndex(item => item._id === id), 1);
  return arrayCopy;
}
function moveElement(array, fromIndex, toIndex) {
  const arrayCopy = [...array];
  const element = arrayCopy.splice(fromIndex, 1)[0];
  arrayCopy.splice(toIndex, 0, element);

  return arrayCopy;
}

const burgerInitialState = {
  selected: {
    bun: null,
    filling: []
  },
  total: 0
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState: burgerInitialState,
  reducers: {
    addSelectedItem: (state, action) => {
      const item = action.payload;
      state.selected = item.type === 'bun' ?
        { bun: item, filling: state.selected.filling } :
        { bun: state.selected.bun, filling: [...state.selected.filling, item] };
    },
    countTotal: (state) => {
      state.total = countTotalFn(state.selected)
    },
    moveSelectedItem: (state, action) => {
      state.selected = { bun: state.selected.bun, filling: moveElement(state.selected.filling, action.payload?.from, action.payload?.to) }
    },
    deleteSelectedItem: (state, action) => {
      state.selected = { bun: state.selected.bun, filling: deleteElement(state.selected.filling, action.payload) }
    }
  }
});

export const addSelectedItemById = ({id}) => (dispatch, getState) => {
  const item = selectIngredient(getState(), id);
      dispatch(addSelectedItem(item));
      if (item.type !== 'bun') {
        dispatch(increaseIngredientCount(id));
      } else {
        dispatch(setIngredientCountByType({ingredientType: 'bun', count: 0}));
        dispatch(setIngredientCount({id: id, count:2}));
      }
      dispatch(countTotal());
};

export const deleteIngredient = ({id}) => dispatch => {
  dispatch(deleteSelectedItem(id));
  dispatch(decreaseIngredientCount(id))
}

export const {addSelectedItem, countTotal, moveSelectedItem, deleteSelectedItem} = burgerSlice.actions;

export default burgerSlice.reducer;