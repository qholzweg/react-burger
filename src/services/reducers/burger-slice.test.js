import reducer, { addSelectedItem, countTotal, moveSelectedItem, deleteItem } from './burger-slice'
import { bunIngredient, bun2Ingredient, mainIngredient, sauceIngredient } from '../../utils/test-data';

describe('Reduser', () => {
  const initialState = {
    selected: {
      bun: null,
      filling: []
    },
    total: 0
  };
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
  it('should count total', () => {
    expect(reducer(someBurgerState, countTotal())).toEqual({
      ...someBurgerState,
      total: sauceIngredient.price * 2 + mainIngredient.price + (bunIngredient.price * 2)
    })
  });
  it('should move item', () => {
    expect(reducer(someBurgerState, moveSelectedItem({from:1,to:2}))).toEqual({
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