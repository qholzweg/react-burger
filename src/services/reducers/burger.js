import {
  ADD_SELECTED_ITEM,
  MOVE_SELECTED_ITEM,
  DELETE_SELECTED_ITEM,
  COUNT_TOTAL,
} from '../actions/burger';

function countTotal(content) {
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

export const burger = (state = burgerInitialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_ITEM: {
      const item = action.item;
      const selected = item.type === 'bun' ?
        { bun: item, filling: state.selected.filling } :
        { bun: state.selected.bun, filling: [...state.selected.filling, item] };
      return {
        selected: selected
      }
    }
    case COUNT_TOTAL: {
      return {
        ...state,
        total: countTotal(state.selected)
      }
    }
    case MOVE_SELECTED_ITEM: {
      return {
        ...state,
        selected: { bun: state.selected.bun, filling: moveElement(state.selected.filling, action.from, action.to) }
      }
    }
    case DELETE_SELECTED_ITEM: {
      return {
        ...state,
        selected: { bun: state.selected.bun, filling: deleteElement(state.selected.filling, action.id) }
      }
    }
    default: {
      return state;
    }
  }
}