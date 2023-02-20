import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ingredients } from '../api'

export const getIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await ingredients.get();
    return response.data;
  }
);

const ingredientsInitialState = {
  all: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentTab: 'buns'
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsInitialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload
    },
    increaseIngredientCount: (state, action) => {
      state.all = [...state.all].map(item => item._id === action.payload ? { ...item, __v: item.__v + 1 } : item)
    },
    decreaseIngredientCount: (state, action) => {
      state.all = [...state.all].map(item => item._id === action.payload ? { ...item, __v: item.__v - 1 } : item)
    },
    setIngredientCount: (state, action) => {
      state.all = [...state.all].map(item => item._id === action.payload?.id ? { ...item, __v: action.payload?.count } : item)
    },
    setIngredientCountByType: (state, action) => {
      state.all = [...state.all].map(item => item.type === action.payload?.ingredientType ? { ...item, __v: action.payload?.count } : item)
    },
    //возвращает к начальному значению стейт ингредиентов
    dropIngridientsState: (state) => {
      state.all = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        console.log(1);
        state.ingredientsRequest = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
        state.all = [];
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsRequest = false;
        state.all = action.payload;
      });
  }
});

export const { setCurrentTab, increaseIngredientCount, decreaseIngredientCount, setIngredientCount, setIngredientCountByType, dropIngridientsState } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;