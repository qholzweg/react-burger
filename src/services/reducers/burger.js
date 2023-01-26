import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SET_CURRENT_TAB,
  ADD_SELECTED_ITEM,
  MOVE_SELECTED_ITEM,
  DELETE_SELECTED_ITEM,
  COUNT_TOTAL,
  DELETE_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ORDER_OPEN,
  ORDER_CLOSE,
  DETAILS_OPEN,
  DETAILS_CLOSE,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
  SET_INGREDIENT_COUNT,
  SET_INGREDIENT_COUNT_BY_TYPE,
  DROP_INGRIDIENTS_STATE,
  DROP_ORDER_STATE
} from '../actions/burger';

const ingredientsInitialState = {
  all: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentTab: 'buns'
};

export const ingredients = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        all: action.ingredients
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    }

    case SET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.tab
      }
    }
    case INCREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        all: [...state.all].map(item => item._id === action.id ? { ...item, __v: item.__v + 1 } : item)
      }
    }
    case DECREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        all: [...state.all].map(item => item._id === action.id ? { ...item, __v: item.__v - 1 } : item)
      }
    }
    case SET_INGREDIENT_COUNT: {
      return {
        ...state,
        all: [...state.all].map(item => item._id === action.id ? { ...item, __v: action.count } : item)
      }
    }
    case SET_INGREDIENT_COUNT_BY_TYPE: {
      return {
        ...state,
        all: [...state.all].map(item => item.type === action.ingredientType ? { ...item, __v: action.count } : item)
      }
    }
    case DROP_INGRIDIENTS_STATE: {
      return {
        ...state,
        all: []
      }
    }
    // case : {return{...state}}
    default: {
      return state;
    }
  }
}

const initialDetailsState = {
  currentIngredient: {},
  isDetailsModalOpen: false
}

export const details = (state = initialDetailsState, action) => {
  switch (action.type) {
    case DETAILS_OPEN: {
      return {
        ...state,
        isDetailsModalOpen: true
      }
    }
    case DETAILS_CLOSE: {
      return {
        ...state,
        isDetailsModalOpen: false
      }
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.item
      }
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {}
      }
    }
    default: { return state; }
  }

}

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
    // case : {return{...state}}
    default: {
      return state;
    }
  }
}

const orderInitialState = {
  order: {},
  orderRequest: false,
  orderFailed: false,
  isOrderModalOpen: false
};

export const order = (state = orderInitialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case ORDER_OPEN: {
      return {
        ...state,
        isOrderModalOpen: true
      }
    }
    case ORDER_CLOSE: {
      return {
        ...state,
        isOrderModalOpen: false
      }
    }
    case DROP_ORDER_STATE: {
      return {
        ...state,
        order: {}
      }
    }
    // case : {return{...state}}
    default: {
      return state;
    }
  }
}