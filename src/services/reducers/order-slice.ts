import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { TOrder } from "../types/types";
import { order } from '../api'

export const getOrder = createAsyncThunk(
  'order/fetchOrder',
  async (id:string) => {
    const response = await order.getById(id);
    return response.orders[0];
  }
);
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ids:(string|null)[]) => {
    const response = await order.post(ids);
    return response.order;
  }
);

const pendingReducer = (state:TOrderState) => {
  state.orderRequest = true;
  state.isOrderModalOpen = true;
};
const rejectedReducer = (state:TOrderState) => {
  state.orderRequest = false;
  state.orderFailed = true;
};
const fulfilledReducer = (state:TOrderState, action: PayloadAction<TOrder>) => {
  state.orderRequest = false;
  state.order = action.payload;
};

type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
  isOrderModalOpen: boolean;
}

const orderInitialState:TOrderState = {
  order: null,
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
      state.order = null;
      state.isOrderModalOpen = false;
    },
    //возвращает к начальному значению стейт заказа
    dropOrderState: (state) => {
      state.order = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(getOrder, createOrder),
        pendingReducer
      )
      .addMatcher(
        isRejected(getOrder, createOrder),
        rejectedReducer
      )
      .addMatcher(
        isFulfilled(getOrder, createOrder),
        fulfilledReducer
      )
  }

});

export const { orderOpen, orderClose, dropOrderState } = orderSlice.actions;
export default orderSlice.reducer;