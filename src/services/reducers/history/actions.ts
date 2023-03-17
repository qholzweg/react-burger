import { createAction } from '@reduxjs/toolkit';
import { TOrdersData } from '../../types/types';

export const historyConnect = createAction<string, 'HISTORY_CONNECT'>('HISTORY_CONNECT');
export const historyDisconnect = createAction('HISTORY_DISCONNECT');
export const wsHistoryConnecting = createAction('HISTORY_WS_CONNECTING');
export const wsHistoryOpen = createAction('HISTORY_WS_OPEN');
export const wsHistoryClose = createAction('HISTORY_WS_CLOSE');
export const wsHistoryMessage = createAction<TOrdersData, 'HISTORY_WS_MESSAGE'>('HISTORY_WS_MESSAGE');
export const wsHistoryError = createAction<string, 'HISTORY_WS_ERROR'>('HISTORY_WS_ERROR');

export type THistoryActions = ReturnType<typeof historyConnect>
                                | ReturnType<typeof historyDisconnect> 
                                | ReturnType<typeof wsHistoryConnecting> 
                                | ReturnType<typeof wsHistoryOpen> 
                                | ReturnType<typeof wsHistoryClose> 
                                | ReturnType<typeof wsHistoryMessage> 
                                | ReturnType<typeof wsHistoryError>;
