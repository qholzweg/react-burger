export const DOMAIN = 'norma.nomoreparties.space';

//XHR
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

// WS
export const WS_BASE = 'wss://' + DOMAIN;
export const WS_FEED = WS_BASE + '/orders/all';
export const WS_MY_ORDERS = WS_BASE + '/orders';

//ROUTES
const ROUTE_ID = '/:id';
export const ROUTE_ROOT = "/";
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";
export const ROUTE_FORGOT = "/forgot-password";
export const ROUTE_RESET = "/reset-password";
export const ROUTE_FEED = "/feed";
export const ROUTE_FEED_ID = ROUTE_FEED + ROUTE_ID;
export const ROUTE_PROFILE = "/profile";
export const ROUTE_HISTORY = "/profile/orders";
export const ROUTE_HISTORY_ID = ROUTE_HISTORY + ROUTE_ID;
export const ROUTE_INGREDIENT = "/ingredients" + ROUTE_ID;
export const ROUTE_ANY = "*";

