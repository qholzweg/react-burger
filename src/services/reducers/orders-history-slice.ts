import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../types/types";
import { RootState } from "../store";

type TOrdersAll = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}
const initialState: TOrdersAll = {
  "success": true,
  "orders": [
    {
      "ingredients": [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733d4"
      ],
      "name": "Death Star Starship Main бургер",
      "_id": "",
      "status": "done",
      "number": 103344,
      "createdAt": "2021-06-23T14:43:22.587Z",
      "updatedAt": "2021-06-23T14:43:22.603Z"
    }, {
      "ingredients": [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733d1"
      ],
      "name": "Death Star ",
      "_id": "",
      "status": "done",
      "number": 103345,
      "createdAt": "2021-06-23T14:43:22.587Z",
      "updatedAt": "2021-06-23T14:43:22.603Z"
    }, {
      "ingredients": [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733d1"
      ],
      "name": "Death Star ",
      "_id": "",
      "status": "done",
      "number": 103346,
      "createdAt": "2021-06-23T14:43:22.587Z",
      "updatedAt": "2021-06-23T14:43:22.603Z"
    }, {
      "ingredients": [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733d1"
      ],
      "name": "Death Star ",
      "_id": "",
      "status": "cancelled",
      "number": 103347,
      "createdAt": "2021-06-23T14:43:22.587Z",
      "updatedAt": "2021-06-23T14:43:22.603Z"
    }, {
      "ingredients": [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733d1"
      ],
      "name": "Death Star ",
      "_id": "",
      "status": "pending",
      "number": 103348,
      "createdAt": "2021-06-23T14:43:22.587Z",
      "updatedAt": "2021-06-23T14:43:22.603Z"
    }
  ],
  "total": 28700,
  "totalToday": 123
}


export const ordersHistorySlice = createSlice({
  name: 'history',
  initialState: initialState,
  reducers: {

  }
});

// export const {resetRequested, resetDrop} = feedSlice.actions;

export const selectHistoryOrders = (state: RootState) => state.history

export default ordersHistorySlice.reducer;