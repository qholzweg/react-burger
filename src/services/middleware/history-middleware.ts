import { socketMiddleware } from './socket-middleware';

import { 
  historyConnect as HistoryWsConnect, 
  historyDisconnect as HistoryWsDisconnect,
  wsHistoryConnecting as HistoryWsConnecting,
  wsHistoryOpen as HistoryWsOpen,
  wsHistoryClose as HistoryWsClose,
  wsHistoryMessage as HistoryWsNessage,
  wsHistoryError as HistoryWsError 
} from "../reducers/history/actions";

const wsActions = {
  wsConnect: HistoryWsConnect,
  wsDisconnect: HistoryWsDisconnect,
  wsConnecting: HistoryWsConnecting,
  onOpen: HistoryWsOpen,
  onClose: HistoryWsClose,
  onError: HistoryWsError,
  onMessage: HistoryWsNessage,
};

export const HistoryMiddleware = socketMiddleware(wsActions);