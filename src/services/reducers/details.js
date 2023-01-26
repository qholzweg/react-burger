import {
  DELETE_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
  DETAILS_OPEN,
  DETAILS_CLOSE,
} from '../actions/details';

const detailsInitialState = {
  currentIngredient: {},
  isDetailsModalOpen: false
}

export const details = (state = detailsInitialState, action) => {
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