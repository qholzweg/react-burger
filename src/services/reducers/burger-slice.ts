import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TBurgerContent, TIngredient } from "../types/types";
import { decreaseIngredientCount, increaseIngredientCount, setIngredientCount, setIngredientCountByType } from "./ingredients-slice";
import { selectIngredient } from "./selectors";
import type { RootState, AppDispatch } from '../store'

function countTotalFn(content: TBurgerContent) {
  let total = 0;
  const { bun, filling } = content;
  if (bun) total = bun.price * 2;
  if (filling && filling.length) total += filling.reduce((acc, current) => acc + current.price, 0);
  return total;
}
function deleteElement(array: TIngredient[], index: number) {
  let arrayCopy = [...array];
  arrayCopy.splice(index, 1);
  return arrayCopy;
}
function moveElement(array: TIngredient[], fromIndex: number, toIndex: number) {
  const arrayCopy = [...array];
  const element = arrayCopy.splice(fromIndex, 1)[0];
  arrayCopy.splice(toIndex, 0, element);

  return arrayCopy;
}

type TburegerState = {
  selected: TBurgerContent;
  total: number;
}

const burgerInitialState: TburegerState = {
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
    addSelectedItem: (state, action: PayloadAction<TIngredient>) => {
      const item = action.payload;
      state.selected = item.type === 'bun' ?
        { bun: item, filling: state.selected.filling } :
        { bun: state.selected.bun, filling: [...state.selected.filling, item] };
    },
    countTotal: (state) => {
      state.total = countTotalFn(state.selected)
    },
    moveSelectedItem: (state, action: PayloadAction<{ from: number, to: number }>) => {
      state.selected = { bun: state.selected.bun, filling: moveElement(state.selected.filling, action.payload?.from, action.payload?.to) }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.selected = { bun: state.selected.bun, filling: deleteElement(state.selected.filling, action.payload) }
    }
  }
});

export const addSelectedItemById = ({ id }: { id: string }) => (dispatch: AppDispatch, getState: () => RootState) => {
  const item = selectIngredient(getState(), id);
  if (!item) return;
  dispatch(addSelectedItem(item));
  if (item && item.type !== 'bun') {
    dispatch(increaseIngredientCount(id));
  } else {
    dispatch(setIngredientCountByType({ ingredientType: 'bun', count: 0 }));
    dispatch(setIngredientCount({ id: id, count: 2 }));
  }
  dispatch(countTotal());
};

export const deleteIngredient = ({ id, index }: { id: string, index: number }) => (dispatch: AppDispatch) => {
  dispatch(deleteItem(index));
  dispatch(decreaseIngredientCount(id))
}

export const { addSelectedItem, countTotal, moveSelectedItem, deleteItem } = burgerSlice.actions;

export default burgerSlice.reducer;