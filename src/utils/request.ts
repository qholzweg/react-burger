import { auth } from '../services/api';
import { getCookie } from '../services/utils';
import { TResponse } from './types';

function checkResponse<T>(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

export default async function request(url: string, options: RequestInit) {
  const res: Response = await fetch(url, options);
  return checkResponse(res);
}

function isResJson(res: Response): boolean {
  const contentType = res?.headers?.get("content-type");
  if (typeof contentType !== 'undefined' && contentType) {
    return contentType.indexOf("application/json") !== -1;
  } else return false;
}
  

async function handleExpired<TRequest>(url: string, method: string, params: TRequest, authorized: boolean = false): Promise<void> {
  return await auth.refresh()
    .then(():any => handleRequest(url, method, params, authorized))
    .catch(() => auth.logout().then(() => new Error("Пожалуйста, войдите в систему снова")))
}

export async function handleRequest<TRequest, TData>(url: string, method: string = 'GET', params: TRequest, authorized: boolean = false):Promise<TResponse<TData>> {
  let options: RequestInit = {
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
  if (authorized) options.headers = { 'Authorization': 'Bearer ' + getCookie('accessToken') };

  return await request(url, options)
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      return data;
    })
    .catch(async e => {
      if (isResJson(e)) {
        const data = await e.json();
        if (data && data.message) {
          if (data.message === 'jwt expired') return handleExpired<TRequest>(url, method, params, authorized);
          return Promise.reject(data.message);
        } else {
          return Promise.reject();
        }
      }
    })
}

