import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { order } from '../api'

export const getOrder = createAsyncThunk(
  'order/fetchOrder',
  async (ids) => {
    const response = await order.get(ids);
    return response;
  }
);

const orderInitialState = {
  order: {},
  orderRequest: false,
  orderFailed: false,
  isOrderModalOpen: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    orderOpen: (state) => {
      state.isOrderModalOpen = true;
    },
    orderClose: (state) => {
      state.order = {};
      state.isOrderModalOpen = false;
    },
    //возвращает к начальному значению стейт заказа
    dropOrderState: (state) => {
      state.order = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderFailed = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.isOrderModalOpen = true;
        state.order = action.payload;
      });
  }

});

export const { orderOpen, orderClose, dropOrderState } = orderSlice.actions;
export default orderSlice.reducer;