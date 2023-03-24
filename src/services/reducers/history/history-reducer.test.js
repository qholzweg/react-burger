import {historyReducer as reducer} from './reducers'
import { TWebsocketStatus } from '../../types/types';

describe('Reduser', () => {
  const initialState = {
    status: TWebsocketStatus.OFFLINE,
    connectionError: '',
    orders: [],
    total: 0,
    totalToday: 0
  };
  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
});