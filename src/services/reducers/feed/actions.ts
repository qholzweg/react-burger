import { createAction } from '@reduxjs/toolkit';
import { TOrdersData } from '../../types/types';

export const feedConnect = createAction<string, 'FEED_CONNECT'>('FEED_CONNECT');
export const feedDisconnect = createAction('FEED_DISCONNECT');
export const wsFeedConnecting = createAction('FEED_WS_CONNECTING');
export const wsFeedOpen = createAction('FEED_WS_OPEN');
export const wsFeedClose = createAction('FEED_WS_CLOSE');
export const wsFeedMessage = createAction<TOrdersData, 'FEED_WS_MESSAGE'>('FEED_WS_MESSAGE');
export const wsFeedError = createAction<string, 'FEED_WS_ERROR'>('FEED_WS_ERROR');

export type TFeedActions = ReturnType<typeof feedConnect>
                                | ReturnType<typeof feedDisconnect> 
                                | ReturnType<typeof wsFeedConnecting> 
                                | ReturnType<typeof wsFeedOpen> 
                                | ReturnType<typeof wsFeedClose> 
                                | ReturnType<typeof wsFeedMessage> 
                                | ReturnType<typeof wsFeedError>;
