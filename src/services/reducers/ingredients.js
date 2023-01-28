import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SET_CURRENT_TAB,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
  SET_INGREDIENT_COUNT,
  SET_INGREDIENT_COUNT_BY_TYPE,
  DROP_INGRIDIENTS_STATE,
} from '../actions/ingredients';

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
    //возвращает к начальному значению стейт ингредиентов
    case DROP_INGRIDIENTS_STATE: {
      return {
        ...state,
        all:[]
      }
    }
    default: {
      return state;
    }
  }
}