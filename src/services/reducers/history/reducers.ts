import { createReducer } from '@reduxjs/toolkit'
import { wsHistoryConnecting, wsHistoryOpen, wsHistoryClose, wsHistoryMessage, wsHistoryError } from "./actions";
import { TOrdersData, TWebsocketStatus } from '../../types/types';

export type HistoryStore = TOrdersData & {
  status: TWebsocketStatus,
  connectionError: string,
}

export const initialState: HistoryStore = {
  status: TWebsocketStatus.OFFLINE,
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0
};

export const historyReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsHistoryConnecting, (state) => {
      state.status = TWebsocketStatus.CONNECTING;
    })
    .addCase(wsHistoryOpen, (state) => {
      state.status = TWebsocketStatus.ONLINE;
      state.connectionError = '';
    })
    .addCase(wsHistoryClose, (state) => {
      state.status = TWebsocketStatus.OFFLINE;
    })
    .addCase(wsHistoryError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsHistoryMessage, (state, action) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    })
})