import { createReducer } from '@reduxjs/toolkit'
import { wsFeedConnecting, wsFeedOpen, wsFeedClose, wsFeedMessage, wsFeedError } from "./actions";
import { TOrdersData, TWebsocketStatus } from '../../types/types';

export type FeedStore = TOrdersData & {
  status: TWebsocketStatus,
  connectionError: string,
}

const initialState: FeedStore = {
  status: TWebsocketStatus.OFFLINE,
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsFeedConnecting, (state) => {
      state.status = TWebsocketStatus.CONNECTING;
    })
    .addCase(wsFeedOpen, (state) => {
      state.status = TWebsocketStatus.ONLINE;
      state.connectionError = '';
    })
    .addCase(wsFeedClose, (state) => {
      state.status = TWebsocketStatus.OFFLINE;
    })
    .addCase(wsFeedError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsFeedMessage, (state, action) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    })
})