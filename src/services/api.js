import { LOGIN_URL, LOGOUT_URL, PASSWORD_RESET_URL, PASSWORD_RESTORE_URL, REGISTER_URL, RENEW_TOKEN_URL, USER_URL } from "../utils/constants";
import { handleRequest } from "../utils/request";
import { setCookie, deleteCookie, getCookie } from "./utils";

export const auth = {
  addUser(accessToken, refreshToken) {
    setCookie('accessToken', accessToken.split(' ')[1]);
    setCookie('refreshToken', refreshToken);
  },
  deleteUser: () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
  },
  isLoggedIn() { return typeof (getCookie('accessToken')) !== 'undefined' },
  login: (form) => handleRequest(LOGIN_URL, 'POST', form)
    .then(({ accessToken, refreshToken }) => {
      auth.addUser(accessToken, refreshToken);
    }),
  logout: () => handleRequest(LOGOUT_URL, 'POST', { 'token': getCookie('refreshToken') })
    .then(() => {
      console.log(auth.isLoggedIn());
      if (auth.isLoggedIn()) auth.deleteUser();
    }),
  getUser: () => handleRequest(USER_URL, 'GET', null, true),
  editUser: (form) => handleRequest(USER_URL, 'PATCH', form, true),
  refresh: () => handleRequest(RENEW_TOKEN_URL, 'POST', { 'token': getCookie('refreshToken') })
    .then(({ accessToken, refreshToken }) => {
      auth.addUser(accessToken, refreshToken);
    })
}

export const register = {
  restore: async (form) => handleRequest(PASSWORD_RESTORE_URL, 'POST', form),
  resetPassword: async (form) => handleRequest(PASSWORD_RESET_URL, 'POST', form),
  register: async (form) => handleRequest(REGISTER_URL, 'POST', form)
    .then(({ accessToken, refreshToken }) => {
      auth.addUser(accessToken, refreshToken);
    })
}
