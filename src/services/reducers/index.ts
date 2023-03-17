import { combineReducers } from "redux";
import ingredients from './ingredients-slice';
import burger from './burger-slice';
import order from './order-slice';
import user from './user-slice';
import { feedReducer } from "./feed/reducers";
import { historyReducer } from "./history/reducers";

const reducer = combineReducers({
  ingredients,
  burger,
  order,
  user,
  feed: feedReducer,
  history: historyReducer,
})

export default reducer;