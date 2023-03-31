export const DOMAIN: string = 'norma.nomoreparties.space';

export const BASE_URL: string = 'https://' + DOMAIN + '/api';
export const INGREDIENTS_URL: string = BASE_URL + '/ingredients';
export const ORDERS_URL: string = BASE_URL + '/orders';
export const PASSWORD_RESTORE_URL: string = BASE_URL + '/password-reset';
export const PASSWORD_RESET_URL: string = BASE_URL + '/password-reset/reset';
export const REGISTER_URL: string = BASE_URL + '/auth/register';
export const LOGIN_URL: string = BASE_URL + '/auth/login';
export const LOGOUT_URL: string = BASE_URL + '/auth/logout';
export const RENEW_TOKEN_URL: string = BASE_URL + '/auth/token';
export const USER_URL: string = BASE_URL + '/auth/user';

export const WS_BASE: string = 'wss://' + DOMAIN;
export const WS_FEED: string = WS_BASE + '/orders/all';
export const WS_MY_ORDERS: string = WS_BASE + '/orders';
