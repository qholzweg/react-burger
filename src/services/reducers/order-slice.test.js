import { ORDERS_URL } from '../../utils/constants';
import { authHeaders, order, XHRHeaders } from '../../utils/test-data';
import reducer, { orderOpen, orderClose, createOrder, getOrder, orderInitialState as initialState } from './order-slice'
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const stateWithOrder = {
  ...initialState,
  order: order
}

describe('Reduser', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  it('should set modal state to opened', () => {
    expect(reducer(initialState, orderOpen)).toEqual({
      ...initialState,
      isOrderModalOpen: true
    })
  })
  it('should set modal state to closed', () => {
    expect(reducer(initialState, orderClose)).toEqual({
      ...initialState,
      isOrderModalOpen: false
    })
  })
});
describe('Extra reducers for order creation', () => {
  it('should set request status to pending', () => {
    expect(reducer(initialState, { type: createOrder.pending.type })).toEqual({
      ...initialState,
      orderRequest: true,
      isOrderModalOpen: true
    })
  })
  it('should set request status to rejected', () => {
    expect(reducer(initialState, { type: createOrder.rejected.type })).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true
    })
  })
  it('should set request status to fulfilled', () => {
    expect(reducer(initialState, { type: createOrder.fulfilled.type, payload: order })).toEqual(stateWithOrder)
  })
});

describe('Extra reducers for getting order', () => {
  it('should set request status to pending', () => {
    expect(reducer(initialState, { type: getOrder.pending.type })).toEqual({
      ...initialState,
      orderRequest: true,
      isOrderModalOpen: true
    })
  })
  it('should set request status to rejected', () => {
    expect(reducer(initialState, { type: getOrder.rejected.type })).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true
    })
  })
  it('should set request status to fulfilled', () => {
    expect(reducer(initialState, { type: getOrder.fulfilled.type, payload: order })).toEqual(stateWithOrder)
  })
});

describe('getOrder', () => {
  const fakeOrderData = { success: true, orders: [order] };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns the order data when the API call is successful', async () => {
    const mockFecth = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(fakeOrderData),
        ok: true
      });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    await store.dispatch(getOrder(order._id))
    const actions = store.getActions()
    expect(actions[0]).toMatchObject({
      type: getOrder.pending.type,
      payload: undefined
    });
    expect(actions[1]).toMatchObject({
      type: getOrder.fulfilled.type,
      payload: fakeOrderData.orders[0]
    });
    expect(mockFecth).toHaveBeenCalledWith(`${ORDERS_URL}/${order._id}`, XHRHeaders);
  });
});

describe('createOrder', () => {
  const fakeOrderData = { name: order.name, order: { ...order }, success: true };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns the order data when the API call is successful', async () => {
    const mockFecth = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(fakeOrderData),
        ok: true
      });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    await store.dispatch(createOrder(order.ingredients))
    const actions = store.getActions()
    expect(actions[0]).toMatchObject({
      type: createOrder.pending.type,
      payload: undefined
    });
    expect(actions[1]).toMatchObject({
      type: createOrder.fulfilled.type,
      payload: fakeOrderData.order
    });
    expect(mockFecth).toHaveBeenCalledWith(ORDERS_URL, {
      ...XHRHeaders,
      body: "{\"ingredients\":[\"60d3b41abdacab0026a733c6\",\"60d3b41abdacab0026a733c9\",\"60d3b41abdacab0026a733c9\",\"60d3b41abdacab0026a733c6\"]}",
      method: "POST",
      headers: {
        "Authorization": "Bearer undefined",
        "Content-Type": "application/json",
      }
    });
  });
});