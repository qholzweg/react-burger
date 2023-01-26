import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ORDER_OPEN,
  ORDER_CLOSE,
  DROP_ORDER_STATE
} from '../actions/order';

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
    //возвращает к начальному значению стейт заказа
    case DROP_ORDER_STATE: {
      return {
        ...state,
        order:{}
      }
    }
    default: {
      return state;
    }
  }
}