import { createSlice } from "@reduxjs/toolkit"
import { selectIngredient } from "./selectors";

const detailsInitialState = {
  currentIngredient: {},
  isDetailsModalOpen: false
}

export const detailsSlice = createSlice({
  name: 'details',
  initialState: detailsInitialState,
  reducers: {
    setDetailsModalOpen: (state, action) => {
      state.isDetailsModalOpen = true;
      state.currentIngredient = action.payload
    },
    detailsClose: (state, action) => {
      state.isDetailsModalOpen = false;
      state.currentIngredient = {};
    },
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload
    },
    deleteCurrentIngredient: (state) => {
      state.currentIngredient = {}
    }
  }
});

export const detailsOpen = ({id}) => (dispatch, getState) => {
  const item = selectIngredient(getState(), id);
  dispatch(setDetailsModalOpen(item));
}

export const { setDetailsModalOpen, detailsClose, setCurrentIngredient, deleteCurrentIngredient } = detailsSlice.actions;

export default detailsSlice.reducer;