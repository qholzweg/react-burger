import { auth } from '../services/api';
import { getCookie } from '../services/utils';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

export default async function request(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}

function isResJson(res) {
  if (res && res.headers) {
    const contentType = res.headers.get("content-type");
    return contentType && contentType.indexOf("application/json") !== -1;
  } else return false;
}

async function handleExpired(args) {
  return await auth.refresh()
  .then(() => {console.log(...args);return handleRequest(...args)})
  .catch(() => auth.logout().then(() => new Error("Пожалуйста, войдите в систему снова")))
}

export async function handleRequest(url, method = 'GET', params, authorized = false) {
  const args = arguments;
  let options = {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }
  if (params) {
    options.body = JSON.stringify(params);
  }
  if (authorized) options.headers.Authorization = 'Bearer ' + getCookie('accessToken');

  return await request(url, options)
    .then(data => {
      if (!data.success) return Promise.reject(data);
      return data;
    })
    .catch(async e => {
      if (isResJson(e)) {
        const data = await e.json();
        if (data && data.message) {
          if (data.message === 'jwt expired') return handleExpired(args);
          return Promise.reject(data.message);
        } else {
          return Promise.reject();
        }
      }
    })
}

