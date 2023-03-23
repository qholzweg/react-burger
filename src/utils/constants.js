export const DOMAIN = 'norma.nomoreparties.space';

export const BASE_URL = 'https://' + DOMAIN + '/api';
export const INGREDIENTS_URL = BASE_URL +'/ingredients';
export const ORDERS_URL = BASE_URL +'/orders';
export const PASSWORD_RESTORE_URL = BASE_URL + '/password-reset';
export const PASSWORD_RESET_URL = BASE_URL + '/password-reset/reset';
export const REGISTER_URL = BASE_URL + '/auth/register';
export const LOGIN_URL = BASE_URL + '/auth/login';
export const LOGOUT_URL = BASE_URL + '/auth/logout';
export const RENEW_TOKEN_URL = BASE_URL + '/auth/token';
export const USER_URL = BASE_URL + '/auth/user';

export const WS_BASE = 'wss://' + DOMAIN;
export const WS_FEED = WS_BASE + '/orders/all';
export const WS_MY_ORDERS = WS_BASE + '/orders';
