import reducer, { addSelectedItem, countTotal, moveSelectedItem, deleteItem, deleteIngredient, addSelectedItemById, burgerInitialState as initialState, dropBurgerState, clearConstructor } from './burger-slice'
import { bunIngredient, bun2Ingredient, mainIngredient, sauceIngredient } from '../../utils/test-data';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

describe('Reduser', () => {
  const someBurgerState = {
    ...initialState,
    selected: {
      bun: bunIngredient,
      filling: [
        sauceIngredient,
        mainIngredient,
        sauceIngredient,
      ]
    }
  }
  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  it('should add bun', () => {
    expect(reducer(initialState, addSelectedItem(bunIngredient))).toEqual({
      ...initialState,
      selected: {
        bun: bunIngredient,
        filling: []
      }
    });
  });
  it('should replace bun', () => {
    expect(reducer(someBurgerState, addSelectedItem(bun2Ingredient))).toEqual({
      ...someBurgerState,
      selected: {
        ...someBurgerState.selected,
        bun: bun2Ingredient,
      }
    });
  });
  it('should add ingredient', () => {
    expect(reducer(initialState, addSelectedItem(mainIngredient))).toEqual({
      ...initialState,
      selected: {
        bun: null,
        filling: [
          mainIngredient
        ]
      }
    });
  });
  it('should delete ingredient', () => {
    expect(reducer(someBurgerState, deleteItem(2))).toEqual({
      ...someBurgerState,
      selected: {
        bun: bunIngredient,
        filling: [
          sauceIngredient,
          mainIngredient,
        ]
      }
    });
  });
  it('should drop state', () => {
    expect(reducer(someBurgerState, dropBurgerState())).toEqual(initialState);
  })
  it('should count total', () => {
    expect(reducer(someBurgerState, countTotal())).toEqual({
      ...someBurgerState,
      total: sauceIngredient.price * 2 + mainIngredient.price + (bunIngredient.price * 2)
    })
  });
  it('should move item', () => {
    expect(reducer(someBurgerState, moveSelectedItem({ from: 1, to: 2 }))).toEqual({
      ...someBurgerState,
      selected: {
        ...someBurgerState.selected,
        filling: [
          sauceIngredient,
          sauceIngredient,
          mainIngredient,
        ]
      }
    })
  })
});

describe('Reducer thunks', () => {
  
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store = mockStore();
  it('dispatches delete action & decrease ingredient count', () => {
    store.dispatch(deleteIngredient({ id: 'id', index: 0 }));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: 'burger/deleteItem',
      payload: 0
    });
    expect(actions[1]).toMatchObject({
      type: 'ingredients/decreaseIngredientCount',
      payload: 'id'
    });
  });

  const storeWithIngredients = {
    ingredients: {
      all: [
        bunIngredient,
        mainIngredient
      ]
    }
  }
  beforeEach(() => {
    store = mockStore(storeWithIngredients);
  })
  it('dispatches actioans to add bun', () => {

    store.dispatch(addSelectedItemById({ id: bunIngredient._id }));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: 'burger/addSelectedItem',
      payload: bunIngredient
    });
    expect(actions[1]).toMatchObject({
      type: 'ingredients/setIngredientCountByType',
      payload: { ingredientType: 'bun', count: 0 }
    });
    expect(actions[2]).toMatchObject({
      type: 'ingredients/setIngredientCount',
      payload: { id: '60d3b41abdacab0026a733c6', count: 2 }
    });
    expect(actions[3]).toMatchObject({
      type: 'burger/countTotal',
      payload: undefined
    });
  })

  it('dispatches actions to add main', () => {
    store.dispatch(addSelectedItemById({ id: mainIngredient._id }));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: 'burger/addSelectedItem',
      payload: mainIngredient
    });
    expect(actions[1]).toMatchObject({
      type: 'ingredients/increaseIngredientCount',
      payload:'60d3b41abdacab0026a733c9' 
    });
    expect(actions[2]).toMatchObject({
      type: 'burger/countTotal',
      payload: undefined
    });
  })

  it('dispatches actions to clear constructor', () => {
    store.dispatch(clearConstructor());
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: 'ingredients/dropIngridientsQty',
      payload: undefined
    })
    expect(actions[1]).toMatchObject({
      type: 'burger/dropBurgerState',
      payload: undefined
    })
  })
});