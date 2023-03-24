import reducer, {orderOpen, orderClose} from './order-slice'

describe('Reduser', () => {
  const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    isOrderModalOpen: false
  };
  it('should return initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual(initialState);
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