import { socketMiddleware } from './socket-middleware';

import { 
  feedConnect as FeedWsConnect, 
  feedDisconnect as FeedWsDisconnect,
  wsFeedConnecting as FeedWsConnecting,
  wsFeedOpen as FeedWsOpen,
  wsFeedClose as FeedWsClose,
  wsFeedMessage as FeedWsNessage,
  wsFeedError as FeedWsError 
} from "../reducers/feed/actions";

const wsActions = {
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsNessage,
};

export const FeedMiddleware = socketMiddleware(wsActions);