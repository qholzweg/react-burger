import { createSlice } from "@reduxjs/toolkit";

type TUserState = {
  resetRequested: boolean;
}

export const initialState: TUserState = {
  resetRequested: false
}
export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    resetRequested: (state) => {
      state.resetRequested = true
    },
    resetDrop: (state) => {
      state.resetRequested = false
    }
  }
});

export const {resetRequested, resetDrop} = userSlice.actions;

export default userSlice.reducer;