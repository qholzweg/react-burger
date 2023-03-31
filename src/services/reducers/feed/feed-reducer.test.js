import {feedReducer as reducer, initialState} from './reducers'
import { TWebsocketStatus } from '../../types/types';
import { ordersData } from '../../../utils/test-data';
import * as actions from './actions'

describe('Reduser', () => {
  const error = 'error';
  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  it('should set connecting status', () => {
    expect(reducer(initialState, {
      type: actions.wsFeedConnecting
    })).toEqual({
      ...initialState,
      status: TWebsocketStatus.CONNECTING
    });
  })
  it('should set open status', () => {
    expect(reducer(initialState, {
      type: actions.wsFeedOpen
    })).toEqual({
      ...initialState,
      status: TWebsocketStatus.ONLINE
    });
  })
  it('should set close status', () => {
    expect(reducer(initialState, {
      type: actions.wsFeedClose
    })).toEqual({
      ...initialState,
      status: TWebsocketStatus.OFFLINE
    });
  })
  it('should set error status', () => {
    expect(reducer(initialState, {
      type: actions.wsFeedError,
      payload: error
    })).toEqual({
      ...initialState,
      connectionError: error
    });
  })
  it('should set message', () => {
    expect(reducer(initialState, {
      type: actions.wsFeedMessage,
      payload: ordersData
    })).toEqual({
      ...initialState,
      ...ordersData
    });
  })
});