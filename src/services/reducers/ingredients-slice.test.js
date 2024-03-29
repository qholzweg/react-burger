import reducer, { setCurrentTab, getIngredients, increaseIngredientCount, decreaseIngredientCount, setIngredientCount, setIngredientCountByType, dropIngridientsState, ingredientsInitialState as initialState, dropIngridientsQty } from './ingredients-slice'
import { bunIngredient, mainIngredient, sauceIngredient, XHRHeaders } from '../../utils/test-data';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { INGREDIENTS_URL } from '../../utils/constants';

describe('getIngredients', () => {
  const fakeIngredientsData = { success: true, data: [bunIngredient, mainIngredient] };

  beforeEach(() => {
    jest.resetAllMocks(); 
  });

  it('returns the ingredients data when the API call is successful', async () => {
    const mockFecth = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(fakeIngredientsData),
        ok: true
      });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    await store.dispatch(getIngredients())
    const actions = store.getActions()
    expect(actions[0]).toMatchObject({ 
      type: getIngredients.pending.type, 
      payload: undefined });
    expect(actions[1]).toMatchObject({ 
      type: getIngredients.fulfilled.type, 
      payload: fakeIngredientsData.data });
    expect(mockFecth).toHaveBeenCalledWith(INGREDIENTS_URL, XHRHeaders);
  });
});

describe('Reduser', () => {
  const stateWithIngredient = {
    ...initialState,
    all: [
      bunIngredient
    ]
  }

  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  it('should set current tab', () => {
    expect(reducer(initialState, setCurrentTab('main'))).toEqual({
      ...initialState,
      currentTab: 'main'
    })
  });

  // extra reducers
  it('should set request status to pending', () => {
    expect(reducer(initialState, { type: getIngredients.pending.type })).toEqual({
      ...initialState,
      ingredientsRequest: true
    })
  })
  it('should set request status to rejected', () => {
    expect(reducer(initialState, { type: getIngredients.rejected.type })).toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: true
    })
  })
  it('should set request status to fulfilled', () => {
    expect(reducer(initialState, { type: getIngredients.fulfilled.type, payload: [bunIngredient] })).toEqual(stateWithIngredient)
  })


  const stateCount1 = {
    ...stateWithIngredient,
    all: [
      {
        ...bunIngredient,
        __v: 1
      }
    ]
  }
  const stateCount2 = {
    ...stateWithIngredient,
    all: [
      {
        ...bunIngredient,
        __v: 2
      }
    ]
  }
  it('should increase ingredient count', () => {
    expect(reducer(stateWithIngredient, increaseIngredientCount(bunIngredient._id))).toEqual(stateCount1)
  });
  it('should increase ingredient count to 2', () => {
    expect(reducer(stateCount1, increaseIngredientCount(bunIngredient._id))).toEqual(stateCount2)
  });
  it('should decrease ingredient count', () => {
    expect(reducer(stateCount2, decreaseIngredientCount(bunIngredient._id))).toEqual(stateCount1)
  });
  it('should set ingredient count', () => {
    expect(reducer(stateWithIngredient, setIngredientCount({ id: bunIngredient._id, count: 2 }))).toEqual(stateCount2)
  });

  const stateWithIngredients = {
    ...initialState,
    all: [
      bunIngredient,
      mainIngredient,
      sauceIngredient,
      sauceIngredient
    ]
  }
  const stateWithIncreasedQty = {
    ...stateWithIngredients,
    all: [
      bunIngredient,
      mainIngredient,
      { ...sauceIngredient, __v: 2 },
      { ...sauceIngredient, __v: 2 },
    ]
  }
  it('should set ingredient count by type', () => {
    expect(reducer(stateWithIngredients, setIngredientCountByType({ ingredientType: 'sauce', count: 2 }))).toEqual(stateWithIncreasedQty)
  });
  it('should drop ingredient\'s qty', () => {
    expect(reducer(stateWithIncreasedQty, dropIngridientsQty())).toEqual(stateWithIngredients)
  });
  it('should drop state', () => {
    expect(reducer(stateCount2, dropIngridientsState())).toEqual(initialState)
  });

});