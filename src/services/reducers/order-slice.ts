import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TOrder } from "../../utils/types";
import { order } from '../api'

export const getOrder = createAsyncThunk(
  'order/fetchOrder',
  async (ids:(string|null)[]) => {
    const response = await order.get(ids);
    return response.order;
  }
);

type TOrderState = {
  order: TOrder;
  orderRequest: boolean;
  orderFailed: boolean;
  isOrderModalOpen: boolean;
}

const orderInitialState:TOrderState = {
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