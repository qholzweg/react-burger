import { INGREDIENTS_URL, LOGIN_URL, LOGOUT_URL, ORDERS_URL, PASSWORD_RESET_URL, PASSWORD_RESTORE_URL, REGISTER_URL, RENEW_TOKEN_URL, USER_URL } from "../utils/constants";
import { TIngredient, TOrder, TResponse, TUser, TXHRMethod } from "./types/types";
import { handleRequest } from "../utils/request";
import { setCookie, deleteCookie, getCookie } from "./utils";

export const ingredients = {
  get: () => handleRequest<null, { data: TIngredient[] }>(INGREDIENTS_URL, TXHRMethod.GET, null)
}

type TOrderResponce = {
  name: string;
  order: TOrder;
}
type TOrdersResponce = TResponse & {
  orders: TOrder[];
}

export const order = {
  post: (ids: (string | null)[]) => handleRequest<{ "ingredients": (string | null)[] }, TOrderResponce>(ORDERS_URL, TXHRMethod.POST, { "ingredients": ids }, true),
  getById: (id:string) => handleRequest<null, TOrdersResponce>(`${ORDERS_URL}/${id}`, TXHRMethod.GET, null)
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
  getToken: () => auth.isLoggedIn() ? getCookie('accessToken') : null,
  login: (form: TLoginForm) => handleRequest<TLoginForm, { user: TUser } & TAccess>(LOGIN_URL, TXHRMethod.POST, form)
    .then(({ accessToken, refreshToken }: TAccess) => {
      auth.addUser(accessToken, refreshToken);
    }),
  logout: () => handleRequest(LOGOUT_URL, TXHRMethod.POST, { 'token': getCookie('refreshToken') })
    .then(() => {
      if (auth.isLoggedIn()) auth.deleteUser();
    }),
  getUser: () => handleRequest<null, { user: TUser }>(USER_URL, TXHRMethod.GET, null, true),
  editUser: (form: TUser) => handleRequest<TUser, void>(USER_URL, TXHRMethod.PATCH, form, true),
  refresh: (): Promise<void> => handleRequest<{ token: string | undefined }, TAccess>(RENEW_TOKEN_URL, TXHRMethod.POST, { token: getCookie('refreshToken') })
    .then(({ accessToken, refreshToken }: TAccess) => {
      auth.deleteUser();
      auth.addUser(accessToken, refreshToken);
    }).catch((err) => {
      auth.logout();
      window.location.reload();
    })
}

type TRestore = { email: string };
type TReset = { password: string, token: string };
export const register = {
  restore: async (form: TRestore) => handleRequest<TRestore, void>(PASSWORD_RESTORE_URL, TXHRMethod.POST, form),
  resetPassword: async (form: TReset) => handleRequest<TReset, void>(PASSWORD_RESET_URL, TXHRMethod.POST, form),
  register: async (form: TUser) => handleRequest<TUser, { user: TUser } & TAccess>(REGISTER_URL, TXHRMethod.POST, form)
    .then(({ accessToken, refreshToken }: TAccess) => {
      auth.addUser(accessToken, refreshToken);
    })
}
