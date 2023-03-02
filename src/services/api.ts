import { INGREDIENTS_URL, LOGIN_URL, LOGOUT_URL, ORDERS_URL, PASSWORD_RESET_URL, PASSWORD_RESTORE_URL, REGISTER_URL, RENEW_TOKEN_URL, USER_URL } from "../utils/constants";
import { TIngredient, TOrder, TUser } from "../utils/types";
import { handleRequest } from "../utils/request";
import { setCookie, deleteCookie, getCookie } from "./utils";

export const ingredients = {
  get: () => handleRequest<null, TIngredient[]>(INGREDIENTS_URL, 'GET', null)
}

export const order = {
  get: (ids: string) => handleRequest<{ "ingredients": string }, TOrder>(ORDERS_URL, 'POST', { "ingredients": ids })
}

type TLoginForm = {
  email: string;
  password: string;
}
type TAccess = {
  accessToken: string,
  refreshToken: string
}

export const auth = {
  addUser(accessToken: string, refreshToken: string) {
    setCookie('accessToken', accessToken.split(' ')[1]);
    setCookie('refreshToken', refreshToken);
  },
  deleteUser: () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
  },
  isLoggedIn() { return typeof (getCookie('accessToken')) !== 'undefined' },
  login: (form: TLoginForm) => handleRequest<TLoginForm, {user: TUser} & TAccess>(LOGIN_URL, 'POST', form)
    .then(({ accessToken, refreshToken }: TAccess) => {
      auth.addUser(accessToken, refreshToken);
    }),
  logout: () => handleRequest(LOGOUT_URL, 'POST', { 'token': getCookie('refreshToken') })
    .then(() => {
      if (auth.isLoggedIn()) auth.deleteUser();
    }),
  getUser: () => handleRequest<null, { user: TUser }>(USER_URL, 'GET', null, true),
  editUser: (form: TUser) => handleRequest<TUser, void>(USER_URL, 'PATCH', form, true),
  refresh: (): Promise<void> => handleRequest<{ token: string | undefined }, TAccess>(RENEW_TOKEN_URL, 'POST', { token: getCookie('refreshToken') })
    .then(({ accessToken, refreshToken }: TAccess) => {
      auth.addUser(accessToken, refreshToken);
    })
}

type TRestore = { email: string };
type TReset = { password: string, token: string };
export const register = {
  restore: async (form: TRestore) => handleRequest<TRestore, void>(PASSWORD_RESTORE_URL, 'POST', form),
  resetPassword: async (form: TReset) => handleRequest<TReset, void>(PASSWORD_RESET_URL, 'POST', form),
  register: async (form: TUser) => handleRequest<TUser, {user: TUser} & TAccess>(REGISTER_URL, 'POST', form)
    .then(({ accessToken, refreshToken }: TAccess) => {
      auth.addUser(accessToken, refreshToken);
    })
}
