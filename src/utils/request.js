function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export default async function request(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}