import { ordersData } from '../../../utils/test-data'
import * as actions from './actions'

describe('Action creators', () => {
  it('should create an actions with correct types and payloads', () => {

    const connectAction = {
      type: 'HISTORY_CONNECT',
    }
    const disconnectAction = {
      type: 'HISTORY_DISCONNECT',
    }
    const connectingAction = {
      type: 'HISTORY_WS_CONNECTING',
    }
    const openAction = {
      type: 'HISTORY_WS_OPEN',
    }
    const closeAction = {
      type: 'HISTORY_WS_CLOSE',
    }
    const messageAction = {
      type: 'HISTORY_WS_MESSAGE',
      payload: ordersData
    }
    const errorAction = {
      type: 'HISTORY_WS_ERROR',
      payload: 'error'
    }
        
        // Проверяем экшены на равенство
    expect(actions.historyConnect()).toEqual(connectAction)
    expect(actions.historyDisconnect()).toEqual(disconnectAction)
    expect(actions.wsHistoryConnecting()).toEqual(connectingAction)
    expect(actions.wsHistoryOpen()).toEqual(openAction)
    expect(actions.wsHistoryClose()).toEqual(closeAction)
    expect(actions.wsHistoryMessage(ordersData)).toEqual(messageAction)
    expect(actions.wsHistoryError('error')).toEqual(errorAction)
  })
}) 