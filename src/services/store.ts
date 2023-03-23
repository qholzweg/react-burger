import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import type {} from 'redux-thunk/extend-redux'
import { FeedMiddleware } from './middleware/feed-middleware';
import { HistoryMiddleware } from './middleware/history-middleware';



export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(FeedMiddleware, HistoryMiddleware)
});

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
