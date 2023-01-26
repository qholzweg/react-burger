import { ORDERS_URL } from '../../utils/constants';
import request from '../../utils/request';

export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const ORDER_OPEN = 'ORDER_OPEN';
export const ORDER_CLOSE = 'ORDER_CLOSE';
export const DROP_ORDER_STATE = 'DROP_ORDER_STATE';

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
        // Приводим хранилище к изначальному состоянию
        dispatch({
          type: DROP_ORDER_STATE
        });
        dispatch({
          type: ORDER_OPEN
        });
      })
  }
}