import { ordersData } from '../../../utils/test-data'
import * as actions from './actions'

describe('Action creators', () => {
  it('should create an actions with correct types and payloads', () => {

    const connectAction = {
      type: 'FEED_CONNECT',
    }
    const disconnectAction = {
      type: 'FEED_DISCONNECT',
    }
    const connectingAction = {
      type: 'FEED_WS_CONNECTING',
    }
    const openAction = {
      type: 'FEED_WS_OPEN',
    }
    const closeAction = {
      type: 'FEED_WS_CLOSE',
    }
    const messageAction = {
      type: 'FEED_WS_MESSAGE',
      payload: ordersData
    }
    const errorAction = {
      type: 'FEED_WS_ERROR',
      payload: 'error'
    }
        
    expect(actions.feedConnect()).toEqual(connectAction)
    expect(actions.feedDisconnect()).toEqual(disconnectAction)
    expect(actions.wsFeedConnecting()).toEqual(connectingAction)
    expect(actions.wsFeedOpen()).toEqual(openAction)
    expect(actions.wsFeedClose()).toEqual(closeAction)
    expect(actions.wsFeedMessage(ordersData)).toEqual(messageAction)
    expect(actions.wsFeedError('error')).toEqual(errorAction)
  })
}) 